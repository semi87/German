/*
 * Personal notes and comments, stored in this browser via NotesStore (store.js).
 *
 * - A "My notes" panel at the end of every topic (autosaves while typing).
 * - A 💬 button on every section heading of a topic for a comment on that section.
 * - Select text in a topic → "+ Add to notes" quotes it into that topic's notes.
 * - The "My Notes" page lists topic notes, section comments and dictionary word
 *   comments, with a general notebook, search, export (.txt), backup/restore
 *   (.json) and delete.
 */
(function () {
  "use strict";

  var store = window.NotesStore;
  if (!store) return;

  var GENERAL = "_general";
  var SKIP = { home: true, notes: true, progress: true, vocab: true };

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
  function debounce(fn, ms) {
    var timer;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(null, args); }, ms);
    };
  }
  function slug(s) {
    return s.toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "section";
  }
  function norm(s) {
    return s.toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/[̀-ͯ]/g, "");
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

  // ---------- Key kinds ----------
  var topics = Array.prototype.slice.call(document.querySelectorAll(".topic"));
  var topicOrder = topics.map(function (t) { return t.id; });
  var sections = {}; // "sec:topic:slug" -> { topic, heading, anchor }

  function kind(id) {
    if (id === GENERAL) return "general";
    if (id.indexOf("sec:") === 0) return "section";
    if (id.indexOf("word:") === 0) return "word";
    if (id.indexOf("write:") === 0) return "write";
    return "topic";
  }
  function topicTitle(tid) {
    var t = document.getElementById(tid);
    return t ? t.getAttribute("data-title") : tid;
  }
  function titleOf(id) {
    switch (kind(id)) {
      case "general": return "General notebook";
      case "section":
        var s = sections[id];
        return s ? topicTitle(s.topic) + " › " + s.heading : id.split(":").slice(1).join(" › ");
      case "word": return id.slice(5);
      case "write":
        var wt = (window.WRITING_TASKS || []).filter(function (x) { return "write:" + x.id === id; })[0];
        return "Writing › " + (wt ? wt.de : id.slice(6));
      default: return topicTitle(id);
    }
  }

  // ---------- Editor ----------
  var editors = {};

  function makeEditor(id, placeholder, rows) {
    var wrap = el("div", "note-editor");
    var ta = el("textarea", "note-text");
    ta.placeholder = placeholder;
    ta.value = store.get(id);
    ta.setAttribute("aria-label", "Notes: " + titleOf(id));
    if (rows) ta.classList.add("compact");
    var meta = el("div", "note-meta");
    var min = rows ? 64 : 110;
    function showMeta(saved) {
      if (!store.ok()) {
        meta.textContent = "⚠ Notes can't be saved in this browser (private mode or storage blocked).";
        meta.classList.add("warn-text");
        return;
      }
      meta.classList.remove("warn-text");
      var upd = store.updated(id);
      meta.textContent = saved ? "Saved ✓" : upd ? "Last edited " + when(upd) : "Saved automatically in this browser.";
    }
    function autoGrow() {
      if (!ta.offsetParent) return;
      ta.style.height = "auto";
      ta.style.height = Math.min(Math.max(ta.scrollHeight, min), 600) + "px";
    }
    var persist = debounce(function () {
      store.set(id, ta.value);
      showMeta(true);
    }, 400);
    ta.addEventListener("input", function () { meta.textContent = "Saving…"; persist(); autoGrow(); });
    ta.addEventListener("blur", function () {
      if (ta.value !== store.get(id)) store.set(id, ta.value);
      showMeta(false);
    });
    wrap.appendChild(ta);
    wrap.appendChild(meta);
    showMeta(false);
    editors[id] = {
      textarea: ta,
      reload: function () { if (document.activeElement !== ta) ta.value = store.get(id); showMeta(false); autoGrow(); },
      grow: autoGrow
    };
    return wrap;
  }

  // ---------- "My notes" panel on every topic ----------
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
      "”.\nTip: select any text on this page and click “+ Add to notes”, or use 💬 next to a heading to comment on one section."));
    panel.addEventListener("toggle", function () { if (panel.open) editors[t.id].grow(); });
    if (store.has(t.id)) panel.open = true;
    t.insertBefore(panel, t.querySelector(":scope > .pager"));
    panels[t.id] = { panel: panel, count: count };
  });

  // ---------- 💬 comments on each section heading ----------
  var sectionUi = {};

  topics.forEach(function (t) {
    if (SKIP[t.id]) return;
    var used = {};
    t.querySelectorAll(":scope > h2").forEach(function (h2) {
      var heading = h2.textContent.trim();
      var s = slug(heading);
      if (used[s]) s += "-" + (++used[s]); else used[s] = 1;
      var id = "sec:" + t.id + ":" + s;
      h2.id = h2.id || "sec-" + t.id + "-" + s;
      sections[id] = { topic: t.id, heading: heading, anchor: h2.id };

      var btn = el("button", "sec-comment-btn", "💬");
      btn.type = "button";
      btn.title = "Comment on this section";
      btn.setAttribute("aria-label", "Comment on “" + heading + "”");
      btn.setAttribute("aria-expanded", "false");
      h2.appendChild(btn);

      var box = el("div", "sec-comment");
      box.hidden = true;
      var label = el("div", "sec-comment-label", "💬 My comment on “" + heading + "”");
      box.appendChild(label);
      box.appendChild(makeEditor(id, "Your comment on this section — a question, a memory trick, your own example…", 2));
      h2.insertAdjacentElement("afterend", box);

      function open(show, focus) {
        box.hidden = !show;
        btn.setAttribute("aria-expanded", String(show));
        if (show) { editors[id].grow(); if (focus) editors[id].textarea.focus(); }
      }
      btn.addEventListener("click", function () {
        var show = box.hidden;
        if (!show && !store.has(id)) { open(false); return; }
        if (!show) { editors[id].textarea.focus(); return; }
        open(true, true);
      });
      sectionUi[id] = { button: btn, box: box, open: open };
      if (store.has(id)) open(true, false);
    });
  });

  // Grow the visible textareas when a topic is shown (they can't measure while hidden).
  window.addEventListener("hashchange", function () {
    setTimeout(function () { Object.keys(editors).forEach(function (id) { editors[id].grow(); }); }, 0);
  });
  setTimeout(function () { Object.keys(editors).forEach(function (id) { editors[id].grow(); }); }, 0);

  // ---------- Badges ----------
  var topCount = document.getElementById("notesCount");
  function refreshBadges() {
    var ids = store.ids();
    var perTopic = {};
    ids.forEach(function (id) {
      var k = kind(id);
      if (k === "topic") perTopic[id] = true;
      else if (k === "section" && sections[id]) perTopic[sections[id].topic] = true;
    });
    topics.forEach(function (t) {
      var link = document.querySelector('#nav a[href="#' + t.id + '"]');
      if (link) link.classList.toggle("has-note", !!perTopic[t.id]);
      var p = panels[t.id];
      if (p) {
        var words = store.get(t.id).trim().split(/\s+/).filter(Boolean).length;
        p.count.textContent = words ? words + (words === 1 ? " word" : " words") : "";
      }
    });
    Object.keys(sectionUi).forEach(function (id) {
      sectionUi[id].button.classList.toggle("has-comment", store.has(id));
    });
    if (topCount) topCount.textContent = ids.length ? String(ids.length) : "";
  }
  store.onChange(refreshBadges);
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
    if (!topic || SKIP[topic.id] || node.closest("textarea, input, button, .notes-panel, .sec-comment, .quiz-actions")) return null;
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
    var current = store.get(id).replace(/\s+$/, "");
    store.set(id, (current ? current + "\n\n" : "") + "“" + pending.text + "”\n");
    if (panels[id]) {
      panels[id].panel.open = true;
      editors[id].reload();
    }
    window.getSelection().removeAllRanges();
    addBtn.hidden = true;
    toast(store.ok() ? "Added to your notes ✓" : "⚠ Couldn't save — storage is blocked in this browser");
  });

  // ---------- The "My Notes" page ----------
  var page = document.getElementById("notes");
  if (!page) return;

  document.getElementById("notesGeneral").appendChild(
    makeEditor(GENERAL, "Your general notebook: vocabulary, questions for your teacher, phrases you like…"));

  var list = document.getElementById("notesList");
  var empty = document.getElementById("notesEmpty");
  var filter = document.getElementById("notesSearch");
  var summaryEl = document.getElementById("notesSummary");

  var GROUPS = [
    { kind: "topic", title: "Topic notes" },
    { kind: "section", title: "Section comments" },
    { kind: "word", title: "Dictionary comments" },
    { kind: "write", title: "Writing practice" }
  ];

  function sortKey(id) {
    var k = kind(id);
    if (k === "topic") return [topicOrder.indexOf(id), ""];
    if (k === "section") {
      var s = sections[id];
      return [s ? topicOrder.indexOf(s.topic) : 999, s ? String(1000 + Array.prototype.indexOf.call(document.getElementById(s.topic).querySelectorAll(":scope > h2"), document.getElementById(s.anchor))) : id];
    }
    return [0, norm(id)];
  }
  function sortedIds(k) {
    return store.ids().filter(function (id) { return kind(id) === k; }).sort(function (a, b) {
      var x = sortKey(a), y = sortKey(b);
      return x[0] - y[0] || (x[1] < y[1] ? -1 : x[1] > y[1] ? 1 : 0);
    });
  }

  function openTarget(id) {
    var k = kind(id);
    if (k === "topic") {
      location.hash = "#notes-" + id;
      setTimeout(function () {
        if (panels[id]) { panels[id].panel.open = true; editors[id].reload(); editors[id].textarea.focus(); }
      }, 50);
    } else if (k === "section") {
      var s = sections[id];
      if (!s) return;
      location.hash = "#" + s.anchor;
      setTimeout(function () { sectionUi[id].open(true, true); }, 50);
    } else if (k === "word") {
      location.hash = "#dictionary";
      setTimeout(function () { if (window.showDictWord) window.showDictWord(id.slice(5)); }, 50);
    } else if (k === "write") {
      location.hash = "#writing?t=" + id.slice(6);
    }
  }

  function card(id) {
    var c = el("article", "card note-card");
    var head = el("div", "note-card-head");
    var link = el("a", "note-card-title", titleOf(id));
    link.href = "#";
    link.addEventListener("click", function (e) { e.preventDefault(); openTarget(id); });
    head.appendChild(link);
    var tid = kind(id) === "topic" ? id : kind(id) === "section" && sections[id] ? sections[id].topic : null;
    var t = tid && document.getElementById(tid);
    if (t && t.getAttribute("data-level")) head.appendChild(el("span", "lvl", t.getAttribute("data-level")));
    c.appendChild(head);
    c.appendChild(el("div", "note-card-text", store.get(id)));
    var foot = el("div", "note-card-foot");
    foot.appendChild(el("span", "hint", "Edited " + when(store.updated(id))));
    var del = el("button", "btn secondary small", "Delete");
    del.type = "button";
    del.addEventListener("click", function () {
      if (!window.confirm("Delete this note: “" + titleOf(id) + "”?")) return;
      store.set(id, "");
      if (editors[id]) editors[id].reload();
      if (sectionUi[id]) sectionUi[id].open(false);
      renderList();
      toast("Note deleted");
    });
    foot.appendChild(del);
    c.appendChild(foot);
    return c;
  }

  function renderList() {
    var q = norm(filter.value.trim());
    list.textContent = "";
    var total = 0, shown = 0;
    GROUPS.forEach(function (g) {
      var ids = sortedIds(g.kind);
      total += ids.length;
      var match = ids.filter(function (id) { return !q || norm(titleOf(id) + " " + store.get(id)).indexOf(q) !== -1; });
      if (!match.length) return;
      shown += match.length;
      list.appendChild(el("h3", "notes-group-title", g.title + " (" + match.length + ")"));
      match.forEach(function (id) { list.appendChild(card(id)); });
    });
    empty.hidden = total > 0;
    summaryEl.textContent = total ? (q ? shown + " of " + total : total) + (total === 1 ? " note" : " notes") : "";
    if (!store.ok()) summaryEl.textContent = "⚠ Your browser is blocking storage, so notes can't be saved here.";
  }

  filter.addEventListener("input", renderList);

  function refreshPage() {
    Object.keys(editors).forEach(function (id) { editors[id].reload(); });
    Object.keys(sectionUi).forEach(function (id) { if (store.has(id)) sectionUi[id].open(true, false); });
    renderList();
  }
  window.addEventListener("hashchange", function () { if (location.hash === "#notes") refreshPage(); });
  store.onChange(function (id) { if (id === null) refreshPage(); });

  // ---------- Export / backup / restore ----------
  document.getElementById("notesExport").addEventListener("click", function () {
    if (!store.ids().length) { toast("You have no notes yet"); return; }
    var out = "Deutsche Grammatik — my notes\nExported " + when(Date.now()) + "\n";
    function section(title, ids) {
      if (!ids.length) return;
      out += "\n\n##### " + title + " #####\n";
      ids.forEach(function (id) {
        var t = titleOf(id);
        out += "\n" + t + "\n" + new Array(Math.min(t.length, 60) + 1).join("-") + "\n" + store.get(id).trim() + "\n";
      });
    }
    section("General notebook", store.has(GENERAL) ? [GENERAL] : []);
    GROUPS.forEach(function (g) { section(g.title, sortedIds(g.kind)); });
    download("german-notes.txt", "text/plain;charset=utf-8", out);
  });

  document.getElementById("notesBackup").addEventListener("click", function () {
    download("german-notes-backup.json", "application/json",
      JSON.stringify({ app: "deutsche-grammatik", version: 1, exported: Date.now(), notes: store.all(),
        progress: window.Progress ? window.Progress.exportData() : undefined }, null, 2));
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
        if (!data || !data.notes || typeof data.notes !== "object") throw new Error("bad file");
        var changed = store.merge(data.notes);
        if (data.progress && window.Progress) window.Progress.importData(data.progress);
        Object.keys(panels).forEach(function (id) { if (store.has(id)) panels[id].panel.open = true; });
        toast(changed ? "Restored " + changed + " note" + (changed === 1 ? "" : "s") + " ✓" : "Nothing new to restore");
      } catch (e) {
        toast("⚠ That file isn't a notes backup");
      }
      fileInput.value = "";
    };
    reader.readAsText(file);
  });

  document.getElementById("notesClear").addEventListener("click", function () {
    if (!store.ids().length) { toast("You have no notes yet"); return; }
    if (!window.confirm("Delete ALL your notes and comments in this browser? This can't be undone. (Tip: make a backup first.)")) return;
    store.clear();
    Object.keys(sectionUi).forEach(function (id) { sectionUi[id].open(false); });
    toast("All notes deleted");
  });

  renderList();
})();
