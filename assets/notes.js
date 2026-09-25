/*
 * Personal notes, stored in this browser (localStorage).
 *
 * - A "My notes" panel at the end of every topic (autosaves while typing).
 * - Select text in a topic → "+ Add to notes" quotes it into that topic's notes.
 * - The "My Notes" page lists every note, has a general notebook, search,
 *   export (.txt), backup/restore (.json) and delete.
 *
 * Storage format: { "<topic id>": { "text": "...", "updated": <ms> }, ... }
 * The general notebook uses the key "_general".
 */
(function () {
  "use strict";

  var KEY = "deutsche-grammatik-notes-v1";
  var GENERAL = "_general";
  var SKIP = { home: true, notes: true };

  // ---------- Storage ----------
  var storageOk = true;
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      var data = raw ? JSON.parse(raw) : {};
      return data && typeof data === "object" ? data : {};
    } catch (e) {
      storageOk = false;
      return {};
    }
  }
  var notes = load();

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(notes));
      storageOk = true;
      return true;
    } catch (e) {
      storageOk = false;
      return false;
    }
  }
  function getText(id) {
    return notes[id] && notes[id].text ? notes[id].text : "";
  }
  function setText(id, text) {
    if (text.trim()) notes[id] = { text: text, updated: Date.now() };
    else delete notes[id];
    var ok = save();
    refreshBadges();
    return ok;
  }
  function noteIds() {
    return Object.keys(notes).filter(function (id) { return getText(id).trim(); });
  }

  // ---------- Helpers ----------
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function when(ms) {
    if (!ms) return "";
    var d = new Date(ms);
    return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) +
      ", " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  function titleOf(id) {
    if (id === GENERAL) return "General notebook";
    var t = document.getElementById(id);
    return t ? t.getAttribute("data-title") : id;
  }
  function debounce(fn, ms) {
    var timer;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(null, args); }, ms);
    };
  }
  function download(name, type, content) {
    var blob = new Blob([content], { type: type });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  var toastEl = el("div", "toast");
  toastEl.setAttribute("role", "status");
  document.body.appendChild(toastEl);
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  // ---------- Editor (used by topic panels and the general notebook) ----------
  var editors = {};

  function makeEditor(id, placeholder) {
    var wrap = el("div", "note-editor");
    var ta = el("textarea", "note-text");
    ta.placeholder = placeholder;
    ta.value = getText(id);
    ta.setAttribute("aria-label", "Notes: " + titleOf(id));
    var meta = el("div", "note-meta");
    function showMeta(saved) {
      if (!storageOk) {
        meta.textContent = "⚠ Notes can't be saved in this browser (private mode or storage blocked).";
        meta.classList.add("warn-text");
        return;
      }
      meta.classList.remove("warn-text");
      var n = notes[id];
      meta.textContent = saved ? "Saved ✓" : n ? "Last edited " + when(n.updated) : "Saved automatically in this browser.";
    }
    var persist = debounce(function () {
      setText(id, ta.value);
      showMeta(true);
      autoGrow();
    }, 400);
    function autoGrow() {
      ta.style.height = "auto";
      ta.style.height = Math.min(Math.max(ta.scrollHeight, 110), 600) + "px";
    }
    ta.addEventListener("input", function () { meta.textContent = "Saving…"; persist(); autoGrow(); });
    ta.addEventListener("blur", function () { setText(id, ta.value); showMeta(false); });
    wrap.appendChild(ta);
    wrap.appendChild(meta);
    showMeta(false);
    editors[id] = {
      textarea: ta,
      reload: function () { if (document.activeElement !== ta) ta.value = getText(id); showMeta(false); autoGrow(); },
      grow: autoGrow
    };
    return wrap;
  }

  // ---------- Panels on every topic ----------
  var topics = Array.prototype.slice.call(document.querySelectorAll(".topic"));
  var panels = {};

  topics.forEach(function (t) {
    if (SKIP[t.id]) return;
    var panel = el("details", "notes-panel");
    panel.id = "notes-" + t.id;
    var summary = el("summary", null);
    summary.appendChild(el("span", null, "📝 My notes"));
    var count = el("span", "notes-count");
    summary.appendChild(count);
    panel.appendChild(summary);
    panel.appendChild(makeEditor(t.id, "Write your own notes, examples or questions about “" + t.getAttribute("data-title") +
      "”.\nTip: select any text on this page and click “+ Add to notes”."));
    panel.addEventListener("toggle", function () { if (panel.open) editors[t.id].grow(); });
    if (getText(t.id)) panel.open = true;
    var pager = t.querySelector(":scope > .pager");
    t.insertBefore(panel, pager);
    panels[t.id] = { panel: panel, count: count };
  });

  // ---------- Badges (sidebar + top bar) ----------
  var topCount = document.getElementById("notesCount");
  function refreshBadges() {
    var ids = noteIds();
    topics.forEach(function (t) {
      var link = document.querySelector('#nav a[href="#' + t.id + '"]');
      if (link) link.classList.toggle("has-note", ids.indexOf(t.id) !== -1);
      var p = panels[t.id];
      if (p) {
        var words = getText(t.id).trim().split(/\s+/).filter(Boolean).length;
        p.count.textContent = words ? words + (words === 1 ? " word" : " words") : "";
      }
    });
    if (topCount) topCount.textContent = ids.length ? String(ids.length) : "";
  }
  refreshBadges();

  // ---------- Select text → add to notes ----------
  var addBtn = el("button", "add-note-btn", "+ Add to notes");
  addBtn.type = "button";
  addBtn.hidden = true;
  document.body.appendChild(addBtn);
  var pending = null;

  function selectionInfo() {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
    var text = sel.toString().replace(/\s+/g, " ").trim();
    if (text.length < 2 || text.length > 600) return null;
    var range = sel.getRangeAt(0);
    var node = range.commonAncestorContainer;
    if (node.nodeType !== 1) node = node.parentElement;
    var topic = node && node.closest(".topic.active");
    if (!topic || SKIP[topic.id] || node.closest("textarea, input, .notes-panel, .quiz-actions")) return null;
    return { text: text, topic: topic.id, rect: range.getBoundingClientRect() };
  }

  function placeButton() {
    pending = selectionInfo();
    if (!pending) { addBtn.hidden = true; return; }
    var r = pending.rect;
    addBtn.hidden = false;
    var top = window.scrollY + r.bottom + 8;
    var left = window.scrollX + r.left + r.width / 2 - addBtn.offsetWidth / 2;
    left = Math.max(window.scrollX + 8, Math.min(left, window.scrollX + document.documentElement.clientWidth - addBtn.offsetWidth - 8));
    addBtn.style.top = top + "px";
    addBtn.style.left = left + "px";
  }

  document.addEventListener("mouseup", function (e) {
    if (e.target === addBtn) return;
    setTimeout(placeButton, 0);
  });
  document.addEventListener("keyup", function (e) {
    if (e.key === "Shift" || e.key.indexOf("Arrow") === 0) setTimeout(placeButton, 0);
  });
  document.addEventListener("selectionchange", debounce(function () {
    // Touch devices: show the button once the selection settles.
    if (!window.getSelection().isCollapsed) placeButton(); else addBtn.hidden = true;
  }, 350));
  window.addEventListener("hashchange", function () { addBtn.hidden = true; });

  addBtn.addEventListener("mousedown", function (e) { e.preventDefault(); }); // keep the selection
  addBtn.addEventListener("click", function () {
    if (!pending) return;
    var id = pending.topic;
    var current = getText(id).replace(/\s+$/, "");
    var quote = "“" + pending.text + "”";
    setText(id, (current ? current + "\n\n" : "") + quote + "\n");
    var p = panels[id];
    if (p) {
      p.panel.open = true;
      editors[id].reload();
    }
    window.getSelection().removeAllRanges();
    addBtn.hidden = true;
    toast(storageOk ? "Added to your notes ✓" : "⚠ Couldn't save — storage is blocked in this browser");
  });

  // ---------- The "My Notes" page ----------
  var page = document.getElementById("notes");
  if (!page) return;

  var generalHost = document.getElementById("notesGeneral");
  generalHost.appendChild(makeEditor(GENERAL, "Your general notebook: vocabulary, questions for your teacher, phrases you like…"));

  var list = document.getElementById("notesList");
  var empty = document.getElementById("notesEmpty");
  var filter = document.getElementById("notesSearch");
  var summaryEl = document.getElementById("notesSummary");

  function norm(s) {
    return s.toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function orderedTopicIds() {
    var order = topics.map(function (t) { return t.id; });
    return noteIds().filter(function (id) { return id !== GENERAL; }).sort(function (a, b) {
      return order.indexOf(a) - order.indexOf(b);
    });
  }

  function renderList() {
    var q = norm(filter.value.trim());
    var ids = orderedTopicIds();
    list.textContent = "";
    var shown = 0;
    ids.forEach(function (id) {
      var text = getText(id);
      if (q && norm(titleOf(id) + " " + text).indexOf(q) === -1) return;
      shown++;
      var card = el("article", "card note-card");
      var head = el("div", "note-card-head");
      var link = el("a", "note-card-title", titleOf(id));
      link.href = "#notes-" + id;
      link.addEventListener("click", function () {
        setTimeout(function () {
          if (panels[id]) { panels[id].panel.open = true; editors[id].reload(); editors[id].textarea.focus(); }
        }, 50);
      });
      head.appendChild(link);
      var t = document.getElementById(id);
      if (t && t.getAttribute("data-level")) head.appendChild(el("span", "lvl", t.getAttribute("data-level")));
      card.appendChild(head);
      card.appendChild(el("div", "note-card-text", text));
      var foot = el("div", "note-card-foot");
      foot.appendChild(el("span", "hint", "Edited " + when(notes[id].updated)));
      var del = el("button", "btn secondary small", "Delete");
      del.type = "button";
      del.addEventListener("click", function () {
        if (!window.confirm("Delete your notes for “" + titleOf(id) + "”?")) return;
        setText(id, "");
        if (editors[id]) editors[id].reload();
        renderList();
        toast("Note deleted");
      });
      foot.appendChild(del);
      card.appendChild(foot);
      list.appendChild(card);
    });
    var total = ids.length;
    empty.hidden = total > 0;
    summaryEl.textContent = total
      ? (q ? shown + " of " + total : total) + " topic note" + (total === 1 ? "" : "s")
      : "";
    if (!storageOk) summaryEl.textContent = "⚠ Your browser is blocking storage, so notes can't be saved here.";
  }

  filter.addEventListener("input", renderList);

  function refreshPage() {
    Object.keys(editors).forEach(function (id) { editors[id].reload(); });
    renderList();
  }
  window.addEventListener("hashchange", function () {
    if (location.hash === "#notes") refreshPage();
  });
  window.addEventListener("storage", function (e) {
    // Another tab changed the notes.
    if (e.key !== KEY) return;
    notes = load();
    refreshBadges();
    refreshPage();
  });

  // ---------- Export / backup / restore ----------
  document.getElementById("notesExport").addEventListener("click", function () {
    var ids = noteIds();
    if (!ids.length) { toast("You have no notes yet"); return; }
    var order = [GENERAL].concat(orderedTopicIds());
    var out = "Deutsche Grammatik — my notes\nExported " + when(Date.now()) + "\n";
    order.forEach(function (id) {
      if (!getText(id).trim()) return;
      var title = titleOf(id);
      out += "\n\n" + title + "\n" + new Array(title.length + 1).join("=") + "\n" + getText(id).trim() + "\n";
    });
    download("german-notes.txt", "text/plain;charset=utf-8", out);
  });

  document.getElementById("notesBackup").addEventListener("click", function () {
    download("german-notes-backup.json", "application/json",
      JSON.stringify({ app: "deutsche-grammatik", version: 1, exported: Date.now(), notes: notes }, null, 2));
  });

  var fileInput = document.getElementById("notesFile");
  document.getElementById("notesRestore").addEventListener("click", function () { fileInput.click(); });
  fileInput.addEventListener("change", function () {
    var file = fileInput.files && fileInput.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        var incoming = data && data.notes && typeof data.notes === "object" ? data.notes : null;
        if (!incoming) throw new Error("bad file");
        var added = 0;
        Object.keys(incoming).forEach(function (id) {
          var n = incoming[id];
          if (!n || typeof n.text !== "string" || !n.text.trim()) return;
          var mine = getText(id).trim();
          if (mine === n.text.trim()) return;
          // Merge: keep both texts when they differ.
          notes[id] = {
            text: mine ? mine + "\n\n— restored —\n" + n.text.trim() : n.text,
            updated: Math.max(Number(n.updated) || 0, notes[id] ? notes[id].updated : 0) || Date.now()
          };
          added++;
        });
        save();
        refreshBadges();
        Object.keys(panels).forEach(function (id) { if (getText(id)) panels[id].panel.open = true; });
        refreshPage();
        toast(added ? "Restored " + added + " note" + (added === 1 ? "" : "s") + " ✓" : "Nothing new to restore");
      } catch (e) {
        toast("⚠ That file isn't a notes backup");
      }
      fileInput.value = "";
    };
    reader.readAsText(file);
  });

  document.getElementById("notesClear").addEventListener("click", function () {
    if (!noteIds().length) { toast("You have no notes yet"); return; }
    if (!window.confirm("Delete ALL your notes in this browser? This can't be undone. (Tip: make a backup first.)")) return;
    notes = {};
    save();
    refreshBadges();
    refreshPage();
    toast("All notes deleted");
  });

  renderList();
})();
