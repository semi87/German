/*
 * Wörterbuch UI. The word list lives in words.js (window.DICT_DATA).
 */
(function () {
  "use strict";

  var DATA = window.DICT_DATA || [];
  var LEVELS = ["A1", "A2", "B1", "B2"];

  // ---------- Parse ----------
  var GENDER = { der: "m", die: "f", das: "n" };
  var entries = [];
  DATA.forEach(function (group) {
    group.words.split("\n").forEach(function (line) {
      line = line.trim();
      if (!line) return;
      var e = { theme: group.theme, type: group.type, level: "" };
      var lv = line.match(/^(A1|A2|B1|B2) /);
      if (lv) { e.level = lv[1]; line = line.slice(3); }
      var f = line.split("|");
      var ex = group.type === "noun" ? 3 : group.type === "verb" ? 5 : 2;
      if (f[ex]) { e.exDe = f[ex]; e.exEn = f[ex + 1] || ""; }
      if (group.type === "noun") {
        var sp = f[0].indexOf(" ");
        e.article = f[0].slice(0, sp);
        e.word = f[0].slice(sp + 1);
        e.gender = f[1] === "Pl." ? "p" : GENDER[e.article];
        e.forms = f[1] === "Pl." ? "plural only" : f[1] === "—" ? "no plural" : f[1];
        e.en = f[2];
        e.de = f[0];
      } else if (group.type === "verb") {
        e.word = e.de = f[0];
        e.forms = f[1] + " · " + f[2] + " · " + f[3];
        e.en = f[4];
      } else {
        e.word = e.de = f[0];
        e.en = f[1];
      }
      e.key = norm(e.de + " " + (e.forms || "") + " " + e.en);
      entries.push(e);
    });
  });

  function norm(s) {
    return s.toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  // Shared with the practice trainer.
  window.WOERTERBUCH = entries;

  // ---------- UI ----------
  var root = document.getElementById("dict");
  if (!root) return;

  var input = document.getElementById("dictSearch");
  var chipsEl = document.getElementById("dictThemes");
  var tbody = document.getElementById("dictBody");
  var countEl = document.getElementById("dictCount");
  var canSpeak = "speechSynthesis" in window;
  var theme = "All";
  var level = "";
  var visible = entries;

  // Level filter (A1–B2), shown as a second chip row.
  var levelsEl = document.createElement("div");
  levelsEl.className = "chips level-chips";
  levelsEl.setAttribute("aria-label", "Filter by level");
  ["All levels"].concat(LEVELS).forEach(function (l) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip level-filter" + (l === "All levels" ? " on" : "");
    b.textContent = l;
    b.setAttribute("data-level", l === "All levels" ? "" : l);
    b.addEventListener("click", function () {
      level = b.getAttribute("data-level");
      levelsEl.querySelectorAll(".level-filter").forEach(function (c) { c.classList.toggle("on", c === b); });
      render();
    });
    levelsEl.appendChild(b);
  });
  chipsEl.insertAdjacentElement("afterend", levelsEl);

  document.getElementById("dictTotal").textContent = entries.length;

  ["All"].concat(DATA.map(function (g) { return g.theme; })).forEach(function (t) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip filter" + (t === "All" ? " on" : "");
    b.textContent = t;
    b.addEventListener("click", function () {
      theme = t;
      chipsEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c === b); });
      render();
    });
    chipsEl.appendChild(b);
  });

  function speak(text) {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/…/g, ""));
    u.lang = "de-DE";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function germanCell(e) {
    var td = document.createElement("td");
    if (e.article) {
      var a = document.createElement("span");
      a.className = e.gender;
      a.textContent = e.article + " ";
      td.appendChild(a);
    }
    td.appendChild(document.createTextNode(e.word));
    if (canSpeak) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "speak";
      btn.title = "Listen";
      btn.setAttribute("aria-label", "Listen to " + e.de);
      btn.textContent = "🔊";
      btn.addEventListener("click", function () { speak(e.de); });
      td.appendChild(btn);
    }
    if (store) {
      var cb = document.createElement("button");
      cb.type = "button";
      cb.className = "speak word-comment-btn" + (store.has(commentKey(e)) ? " has-comment" : "");
      cb.title = "My comment on this word";
      cb.setAttribute("aria-label", "Comment on " + e.de);
      cb.textContent = "💬";
      cb.addEventListener("click", function () { toggleEditor(e, td.parentNode); });
      td.appendChild(cb);
    }
    if (e.forms) {
      var inline = document.createElement("small");
      inline.className = "forms-inline";
      inline.textContent = e.forms;
      td.appendChild(inline);
    }
    return td;
  }

  // ---------- Personal comments on words (stored via store.js) ----------
  var store = window.NotesStore || null;
  var COMMENTED = "💬 My comments";
  var openWord = null;

  function commentKey(e) { return "word:" + e.de; }
  function cssEscape(v) { return window.CSS && CSS.escape ? CSS.escape(v) : v.replace(/["\\]/g, "\\$&"); }

  if (store) {
    var cChip = document.createElement("button");
    cChip.type = "button";
    cChip.className = "chip filter commented-chip";
    cChip.textContent = COMMENTED;
    cChip.addEventListener("click", function () {
      theme = COMMENTED;
      chipsEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c === cChip); });
      render();
    });
    chipsEl.insertBefore(cChip, chipsEl.children[1] || null);
  }
  var DIFFICULT = "🎯 Difficult words";
  if (window.Progress) {
    var dChip = document.createElement("button");
    dChip.type = "button";
    dChip.className = "chip filter difficult-chip";
    dChip.textContent = DIFFICULT;
    dChip.title = "Words you answered right less than 60% of the time";
    dChip.addEventListener("click", function () {
      theme = DIFFICULT;
      chipsEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c === dChip); });
      render();
    });
    chipsEl.insertBefore(dChip, chipsEl.children[1] || null);
  }

  function toggleEditor(e, tr, focus) {
    var next = tr.nextElementSibling;
    if (next && next.classList.contains("comment-row")) {
      next.remove();
      render();
      return;
    }
    var key = commentKey(e);
    var row = document.createElement("tr");
    row.className = "comment-row";
    var td = document.createElement("td");
    td.colSpan = 3;
    var label = document.createElement("div");
    label.className = "sec-comment-label";
    label.textContent = "💬 My comment on “" + e.de + "”";
    var ta = document.createElement("textarea");
    ta.className = "note-text compact";
    ta.placeholder = "A memory trick, an example sentence, where you heard it…";
    ta.value = store.get(key);
    ta.setAttribute("aria-label", "Comment on " + e.de);
    var meta = document.createElement("div");
    meta.className = "note-meta";
    meta.textContent = store.ok() ? "Saved automatically in this browser." : "⚠ Comments can't be saved in this browser.";
    var timer;
    ta.addEventListener("input", function () {
      meta.textContent = "Saving…";
      clearTimeout(timer);
      timer = setTimeout(function () {
        store.set(key, ta.value);
        meta.textContent = store.ok() ? "Saved ✓" : "⚠ Comments can't be saved in this browser.";
        var btn = tr.querySelector(".word-comment-btn");
        if (btn) btn.classList.toggle("has-comment", store.has(key));
      }, 400);
    });
    var done = document.createElement("button");
    done.type = "button";
    done.className = "btn secondary small";
    done.textContent = "Done";
    done.addEventListener("click", function () {
      clearTimeout(timer);
      store.set(key, ta.value);
      row.remove();
      render();
    });
    var actions = document.createElement("div");
    actions.className = "comment-actions";
    actions.appendChild(meta);
    actions.appendChild(done);
    td.appendChild(label);
    td.appendChild(ta);
    td.appendChild(actions);
    row.appendChild(td);
    tr.insertAdjacentElement("afterend", row);
    ta.focus();
    if (focus) row.scrollIntoView({ block: "center" });
  }

  // Used by the My Notes page to jump to a commented word.
  window.showDictWord = function (de) {
    theme = "All";
    level = "";
    chipsEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c.textContent === "All"); });
    levelsEl.querySelectorAll(".level-filter").forEach(function (c) { c.classList.toggle("on", !c.getAttribute("data-level")); });
    input.value = de.replace(/[.!?…]+$/, "");
    openWord = de;
    render();
  };

  // Small badge: flashcard box and share of right answers for words you've trained.
  function statBadge(e) {
    var P0 = window.Progress;
    if (!P0) return null;
    var st = P0.wordStats(e.de), c = P0.card(e.de);
    if (!st && !c) return null;
    var pct = st && st.seen ? Math.round(100 * st.right / st.seen) : null;
    var b = document.createElement("span");
    b.className = "wstat " + (c && c.box >= 3 ? "known" : P0.isDifficult(e.de) ? "hard" : "learning");
    b.textContent = (c ? "▮".repeat(c.box) + "▯".repeat(6 - c.box) + " " : "") + (pct !== null ? pct + "%" : "");
    b.title = (c ? "Flashcard box " + c.box + " of 6" + (c.box ? " · next review " + new Date(c.due).toLocaleDateString() : "") : "Not in flashcards yet") +
      (st ? " · " + st.right + " right, " + st.wrong + " wrong" : "");
    return b;
  }

  function exampleEl(e) {
    var d = document.createElement("div");
    d.className = "word-example";
    var de = document.createElement("span");
    de.lang = "de";
    de.textContent = e.exDe;
    d.appendChild(de);
    if (canSpeak) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "speak";
      b.title = "Listen to the example";
      b.setAttribute("aria-label", "Listen to the example");
      b.textContent = "🔊";
      b.addEventListener("click", function () { speak(e.exDe); });
      d.appendChild(b);
    }
    if (e.exEn) {
      var t = document.createElement("small");
      t.textContent = e.exEn;
      d.appendChild(t);
    }
    return d;
  }

  function render() {
    var q = norm(input.value.trim());
    visible = entries.filter(function (e) {
      var inTheme = theme === "All" || e.theme === theme ||
        (theme === COMMENTED && store && store.has(commentKey(e))) ||
        (theme === DIFFICULT && window.Progress && window.Progress.isDifficult(e.de));
      var hit = !q || e.key.indexOf(q) !== -1 ||
        (store && store.has(commentKey(e)) && norm(store.get(commentKey(e))).indexOf(q) !== -1);
      return inTheme && hit && (!level || e.level === level);
    });
    if (q) {
      // Words that start with the query come first.
      var starts = function (e) {
        return norm(e.word).indexOf(q) === 0 || norm(e.en).indexOf(q) === 0 ? 0 : 1;
      };
      visible = visible.slice().sort(function (a, b) { return starts(a) - starts(b); });
    }
    var frag = document.createDocumentFragment();
    visible.forEach(function (e) {
      var tr = document.createElement("tr");
      tr.setAttribute("data-word", e.de);
      tr.appendChild(germanCell(e));
      var forms = document.createElement("td");
      forms.className = "forms";
      forms.textContent = e.forms || "";
      tr.appendChild(forms);
      var en = document.createElement("td");
      if (e.level) {
        var lv = document.createElement("span");
        lv.className = "lvl word-lvl";
        lv.textContent = e.level;
        en.appendChild(lv);
      }
      en.appendChild(document.createTextNode(e.en));
      if (theme === "All") {
        var t = document.createElement("span");
        t.className = "theme-tag";
        t.textContent = e.theme;
        en.appendChild(t);
      }
      var badge = statBadge(e);
      if (badge) en.insertBefore(badge, en.firstChild);
      if (e.exDe) en.appendChild(exampleEl(e));
      if (store && store.has(commentKey(e))) {
        var pv = document.createElement("div");
        pv.className = "word-comment-preview";
        pv.textContent = "💬 " + store.get(commentKey(e));
        en.appendChild(pv);
      }
      tr.appendChild(en);
      frag.appendChild(tr);
    });
    tbody.textContent = "";
    tbody.appendChild(frag);
    countEl.textContent = visible.length === entries.length
      ? entries.length + " words"
      : visible.length + " of " + entries.length + " words";
    document.getElementById("dictEmpty").hidden = visible.length > 0;
    if (openWord) {
      var row = tbody.querySelector('tr[data-word="' + cssEscape(openWord) + '"]');
      var entry = visible.filter(function (x) { return x.de === openWord; })[0];
      openWord = null;
      if (row && entry) toggleEditor(entry, row, true);
    }
  }

  input.addEventListener("input", render);
  render();
  // Refresh the badges after training — at once if the dictionary is open, otherwise when it's next shown.
  var statsDirty = false;
  if (window.Progress) window.Progress.onChange(function (what) {
    if (what !== "all" && what !== "srs" && what !== "words") return;
    if (root.closest(".topic").classList.contains("active") && card.hidden) render(); else statsDirty = true;
  });
  window.addEventListener("hashchange", function () {
    if (statsDirty && /^#dictionary/.test(location.hash)) { statsDirty = false; render(); }
  });

  // ---------- Flashcards (spaced repetition via progress.js) ----------
  var P = window.Progress || null;
  var card = document.getElementById("flashcard");
  var front = document.getElementById("fcFront");
  var back = document.getElementById("fcBack");
  var status = document.getElementById("fcStatus");
  var showBtn = document.getElementById("fcShow");
  var againBtn = document.getElementById("fcAgain");
  var goodBtn = document.getElementById("fcGood");
  var current = null;
  var queue = [];
  var session = { done: 0, knew: 0 };
  var extra = false;      // practising words that aren't due (e.g. difficult words)
  var customPool = null;  // a list of words chosen on the My Vocabulary page

  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = list[i]; list[i] = list[j]; list[j] = t;
    }
    return list;
  }

  function buildQueue() {
    var pool = customPool || (visible.length ? visible : entries);
    extra = !!customPool || theme === DIFFICULT;
    if (!P || extra) return shuffle(pool.slice());
    var now = Date.now();
    var due = pool.filter(function (e) { return P.isDue(e.de, now); })
      .sort(function (a, b) { return P.card(a.de).due - P.card(b.de).due; });
    var fresh = shuffle(pool.filter(function (e) { return !P.card(e.de); })).slice(0, P.newLeftToday());
    return due.concat(fresh);
  }

  function describe(e) {
    if (!P) return "";
    var c = P.card(e.de);
    if (!c) return "🆕 New word";
    if (c.box === 0) return "🔁 Learning";
    return "Review · box " + c.box + " of 6";
  }

  function updateStatus() {
    if (!P) { status.textContent = ""; return; }
    var s = P.srsSummary();
    status.textContent = queue.length + " card" + (queue.length === 1 ? "" : "s") + " left in this session · " +
      "session: " + session.knew + "/" + session.done + " known · " +
      "overall: " + s.known + " known, " + s.learning + " learning";
  }

  function showCard() {
    if (!queue.length) { finished(); return; }
    current = queue[0];
    front.textContent = "";
    if (current.article) {
      var a = document.createElement("span");
      a.className = current.gender;
      a.textContent = current.article + " ";
      front.appendChild(a);
    }
    front.appendChild(document.createTextNode(current.word));
    var tag = document.createElement("div");
    tag.className = "fc-tag";
    tag.textContent = describe(current) + (current.level ? " · " + current.level : "");
    front.appendChild(tag);
    back.textContent = current.en + (current.forms ? "  —  " + current.forms : "");
    if (current.exDe) {
      var ex = document.createElement("div");
      ex.className = "fc-example";
      ex.textContent = current.exDe + (current.exEn ? " — " + current.exEn : "");
      back.appendChild(ex);
    }
    back.hidden = true;
    showBtn.hidden = false;
    againBtn.hidden = goodBtn.hidden = true;
    card.hidden = false;
    updateStatus();
    showBtn.focus();
  }

  function finished() {
    current = null;
    front.textContent = session.done ? "Fertig! 🎉" : "Nothing to study right now 🎉";
    var next = null;
    if (P) {
      (visible.length ? visible : entries).forEach(function (e) {
        var c = P.card(e.de);
        if (c && (next === null || c.due < next)) next = c.due;
      });
    }
    back.hidden = false;
    back.textContent = (session.done ? "You reviewed " + session.done + " card" + (session.done === 1 ? "" : "s") + " (" + session.knew + " known). " : "") +
      (P && P.newLeftToday() === 0 ? "You've started all 15 new words for today. " : "") +
      (next ? "Next review: " + new Date(next).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" }) + "." : "");
    showBtn.hidden = againBtn.hidden = goodBtn.hidden = true;
    updateStatus();
  }

  function answer(knew) {
    if (!current) return;
    session.done++;
    if (knew) session.knew++;
    if (P) {
      // Words that aren't due (extra practice) only move back when you don't know them.
      if (extra && knew && P.card(current.de) && !P.isDue(current.de)) P.recordWord(current.de, true);
      else P.review(current.de, knew);
    }
    queue.shift();
    if (!knew) queue.push(current); // try again later in this session
    showCard();
  }

  function start() {
    queue = buildQueue();
    session = { done: 0, knew: 0 };
    card.hidden = false;
    showCard();
    card.scrollIntoView({ block: "nearest" });
  }

  document.getElementById("fcStart").addEventListener("click", function () { customPool = null; start(); });
  showBtn.addEventListener("click", function () {
    back.hidden = false;
    showBtn.hidden = true;
    againBtn.hidden = goodBtn.hidden = !P;
    if (!P) { queue.shift(); queue.push(current); showBtn.hidden = false; }
    (P ? goodBtn : showBtn).focus();
  });
  againBtn.addEventListener("click", function () { answer(false); });
  goodBtn.addEventListener("click", function () { answer(true); });
  document.getElementById("fcSpeak").hidden = !canSpeak;
  document.getElementById("fcSpeak").addEventListener("click", function () { if (current) speak(current.de); });
  document.getElementById("fcClose").addEventListener("click", function () {
    card.hidden = true;
    customPool = null;
    if (statsDirty) { statsDirty = false; render(); }
  });
  card.addEventListener("keydown", function (e) {
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
    if (e.key === " " && !showBtn.hidden) { e.preventDefault(); showBtn.click(); }
    else if ((e.key === "1" || e.key === "ArrowLeft") && !againBtn.hidden) againBtn.click();
    else if ((e.key === "2" || e.key === "ArrowRight") && !goodBtn.hidden) goodBtn.click();
  });

  // Used by the My Vocabulary page: practise a chosen list of words (not only the due ones).
  window.trainWords = function (list) {
    var set = {};
    list.forEach(function (de) { set[de] = true; });
    customPool = entries.filter(function (e) { return set[e.de]; });
    if (!customPool.length) { customPool = null; return; }
    location.hash = "#dictionary";
    setTimeout(start, 50);
  };

  // Used by the progress page: start a flashcard session.
  window.startFlashcards = function () {
    customPool = null;
    input.value = "";
    var all = chipsEl.querySelector(".filter");
    if (all && theme !== "All") all.click(); else render();
    start();
  };
})();
