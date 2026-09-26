/*
 * "My Vocabulary": statistics per word from progress.js (flashcards and the
 * word drills of the Practice Trainer), with filters, sorting and a button
 * to train the words in the current view.
 */
(function () {
  "use strict";

  var P = window.Progress;
  var page = document.getElementById("vocab");
  if (!P || !page) return;

  var DAY = 24 * 60 * 60 * 1000;
  var words = window.WOERTERBUCH || [];
  var byDe = {};
  words.forEach(function (e) { byDe[e.de] = e; });

  var tilesEl = document.getElementById("vcTiles");
  var chartEl = document.getElementById("vcChart");
  var boxesEl = document.getElementById("vcBoxes");
  var filtersEl = document.getElementById("vcFilters");
  var searchEl = document.getElementById("vcSearch");
  var sortEl = document.getElementById("vcSort");
  var bodyEl = document.getElementById("vcBody");
  var countEl = document.getElementById("vcCount");
  var emptyEl = document.getElementById("vcEmpty");
  var trainBtn = document.getElementById("vcTrain");

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function norm(s) { return s.toLowerCase().replace(/ß/g, "ss"); }
  function startOfDay(t) { var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function ago(t) {
    if (!t) return "—";
    var days = Math.round((startOfDay(Date.now()) - startOfDay(t)) / DAY);
    return days <= 0 ? "today" : days === 1 ? "yesterday" : days + " days ago";
  }
  function nextReview(c, now) {
    if (!c) return "not in flashcards";
    if (c.due <= now) return "now";
    var days = Math.round((startOfDay(c.due) - startOfDay(now)) / DAY);
    return days <= 0 ? "later today" : days === 1 ? "tomorrow" : new Date(c.due).toLocaleDateString(undefined, { day: "numeric", month: "short" });
  }

  // One row per word you've answered or started as a flashcard.
  function rows() {
    var stats = P.allWordStats(), now = Date.now(), seen = {}, out = [];
    function add(de) {
      if (seen[de] || !byDe[de]) return;
      seen[de] = true;
      var st = stats[de] || { seen: 0, right: 0, wrong: 0, last: 0 };
      var c = P.card(de);
      out.push({
        e: byDe[de], st: st, card: c,
        acc: st.seen ? st.right / st.seen : null,
        box: c ? c.box : -1,
        due: !!c && c.due <= now,
        hard: P.isDifficult(de),
        last: Math.max(st.last || 0, 0)
      });
    }
    Object.keys(stats).forEach(add);
    words.forEach(function (e) { if (P.card(e.de)) add(e.de); });
    return out;
  }

  var FILTERS = [
    ["all", "All"],
    ["hard", "🎯 Difficult"],
    ["due", "⏰ Due now"],
    ["learning", "🔁 Learning"],
    ["known", "✅ Known"]
  ];
  var filter = "all";
  var chips = {};
  FILTERS.forEach(function (f) {
    var b = el("button", "chip filter" + (f[0] === filter ? " on" : ""), f[1]);
    b.type = "button";
    b.addEventListener("click", function () { setFilter(f[0]); });
    filtersEl.appendChild(b);
    chips[f[0]] = b;
  });
  function setFilter(f) {
    filter = f;
    Object.keys(chips).forEach(function (k) { chips[k].classList.toggle("on", k === f); });
    renderTable();
  }
  function passes(r) {
    switch (filter) {
      case "hard": return r.hard;
      case "due": return r.due;
      case "learning": return r.box < 3;
      case "known": return r.box >= 3;
      default: return true;
    }
  }

  var SORTS = {
    hard: function (a, b) { return (a.acc === null ? 2 : a.acc) - (b.acc === null ? 2 : b.acc) || b.st.wrong - a.st.wrong; },
    wrong: function (a, b) { return b.st.wrong - a.st.wrong || (a.acc || 0) - (b.acc || 0); },
    due: function (a, b) { return (a.card ? a.card.due : Infinity) - (b.card ? b.card.due : Infinity); },
    recent: function (a, b) { return b.last - a.last; },
    seen: function (a, b) { return b.st.seen - a.st.seen; },
    box: function (a, b) { return a.box - b.box; },
    az: function (a, b) { return a.e.word.localeCompare(b.e.word, "de"); }
  };

  var visible = [];

  function tile(value, label, onclick) {
    var t = el(onclick ? "button" : "div", "card pg-tile");
    if (onclick) { t.type = "button"; t.addEventListener("click", onclick); }
    t.appendChild(el("div", "pg-value", value));
    t.appendChild(el("div", "pg-label", label));
    return t;
  }

  function renderSummary(all) {
    var known = 0, learning = 0, due = 0, hard = 0, right = 0, seen = 0;
    all.forEach(function (r) {
      if (r.box >= 3) known++; else learning++;
      if (r.due) due++;
      if (r.hard) hard++;
      right += r.st.right;
      seen += r.st.seen;
    });
    var days = P.vocabDays(14);
    var week = days.slice(7).reduce(function (n, d) { return n + d.right + d.wrong; }, 0);
    tilesEl.textContent = "";
    tilesEl.appendChild(tile(String(all.length), "words trained · of " + words.length));
    tilesEl.appendChild(tile(String(known), "known (box 3+)", function () { setFilter("known"); scrollToTable(); }));
    tilesEl.appendChild(tile(String(learning), "still learning", function () { setFilter("learning"); scrollToTable(); }));
    tilesEl.appendChild(tile(String(due), due === 1 ? "flashcard due now" : "flashcards due now", function () {
      if (window.startFlashcards) { location.hash = "#dictionary"; setTimeout(window.startFlashcards, 50); }
    }));
    tilesEl.appendChild(tile("🎯 " + hard, hard === 1 ? "difficult word" : "difficult words", function () { setFilter("hard"); scrollToTable(); }));
    tilesEl.appendChild(tile(seen ? Math.round(100 * right / seen) + "%" : "–", "right · " + seen + " answers in total"));
    tilesEl.appendChild(tile(String(week), "answers in the last 7 days"));

    // bar chart
    chartEl.textContent = "";
    var max = Math.max.apply(null, days.map(function (d) { return d.right + d.wrong; }).concat([1]));
    days.forEach(function (d, i) {
      var col = el("div", "vc-day");
      var bar = el("div", "vc-bar");
      var total = d.right + d.wrong;
      bar.style.height = Math.round(100 * total / max) + "%";
      if (total) {
        var w = el("div", "vc-wrong");
        w.style.height = Math.round(100 * d.wrong / total) + "%";
        bar.appendChild(w);
      }
      var date = new Date(d.date + "T12:00:00");
      col.title = date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }) + ": " + d.right + " right, " + d.wrong + " wrong";
      col.appendChild(el("div", "vc-num", total ? String(total) : ""));
      var wrap = el("div", "vc-bar-wrap");
      wrap.appendChild(bar);
      col.appendChild(wrap);
      col.appendChild(el("div", "vc-date", i === days.length - 1 ? "today" : date.toLocaleDateString(undefined, { weekday: "narrow" })));
      chartEl.appendChild(col);
    });
    chartEl.setAttribute("aria-label", "Vocabulary answers per day for the last 14 days: " +
      days.map(function (d) { return d.right + d.wrong; }).join(", "));

    // flashcard boxes
    var boxes = [0, 0, 0, 0, 0, 0, 0];
    all.forEach(function (r) { if (r.box >= 0) boxes[r.box]++; });
    var bmax = Math.max.apply(null, boxes.concat([1]));
    boxesEl.textContent = "";
    boxes.forEach(function (n, b) {
      var row = el("div", "vc-box-row");
      row.appendChild(el("span", "vc-box-label", "Box " + b + (b ? " · " + P.intervalDays(b) + (P.intervalDays(b) === 1 ? " day" : " days") : " · again")));
      var track = el("div", "pg-bar");
      var fill = el("div", "pg-fill vc-fill-" + (b >= 3 ? "known" : "learning"));
      fill.style.width = Math.round(100 * n / bmax) + "%";
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el("span", "vc-box-count", String(n)));
      boxesEl.appendChild(row);
    });
  }

  function scrollToTable() { filtersEl.scrollIntoView({ block: "start", behavior: "smooth" }); }

  var cache = [];
  function renderTable() {
    var q = norm(searchEl.value.trim());
    var now = Date.now();
    visible = cache.filter(function (r) {
      return passes(r) && (!q || norm(r.e.de + " " + r.e.en).indexOf(q) !== -1);
    }).sort(SORTS[sortEl.value] || SORTS.hard);
    var frag = document.createDocumentFragment();
    visible.forEach(function (r) {
      var tr = el("tr");
      var td = el("td");
      if (r.e.article) td.appendChild(el("span", r.e.gender, r.e.article + " "));
      td.appendChild(document.createTextNode(r.e.word));
      if (r.e.level) td.appendChild(el("span", "lvl word-lvl vc-lvl", r.e.level));
      td.appendChild(el("small", "vc-en", r.e.en));
      tr.appendChild(td);
      var box = el("td", "vc-box");
      box.textContent = r.box >= 0 ? "▮".repeat(r.box) + "▯".repeat(6 - r.box) : "–";
      box.title = r.box >= 0 ? "Box " + r.box + " of 6" : "Not in flashcards yet";
      tr.appendChild(box);
      tr.appendChild(el("td", "vc-rw", r.st.seen ? r.st.right + " / " + r.st.wrong : "–"));
      var acc = el("td", "vc-acc");
      if (r.acc !== null) {
        var pct = Math.round(100 * r.acc);
        var track = el("div", "pg-bar vc-acc-bar");
        var fill = el("div", "pg-fill " + (r.hard ? "vc-fill-hard" : pct >= 80 ? "vc-fill-known" : "vc-fill-learning"));
        fill.style.width = pct + "%";
        track.appendChild(fill);
        acc.appendChild(track);
        acc.appendChild(el("span", r.hard ? "vc-pct hard" : "vc-pct", pct + "%"));
      } else acc.textContent = "–";
      tr.appendChild(acc);
      tr.appendChild(el("td", "vc-col-date", ago(r.last)));
      tr.appendChild(el("td", "vc-col-date" + (r.due ? " vc-due" : ""), nextReview(r.card, now)));
      frag.appendChild(tr);
    });
    bodyEl.textContent = "";
    bodyEl.appendChild(frag);
    countEl.textContent = visible.length + (visible.length === 1 ? " word" : " words");
    trainBtn.disabled = !visible.length;
    emptyEl.hidden = visible.length > 0;
    emptyEl.textContent = !cache.length
      ? "No statistics yet. Train with the 📚 Flashcards in the Wörterbuch or the word drills in the Practice Trainer (der/die/das, plurals, verb forms, English → German, conjugation) — every answer is counted here."
      : filter === "hard" && !q ? "🎉 No difficult words — every word you've practised at least twice is 60% right or better."
      : "No words match.";
  }

  function refresh() {
    cache = rows();
    renderSummary(cache);
    renderTable();
  }

  searchEl.addEventListener("input", renderTable);
  sortEl.addEventListener("change", renderTable);
  trainBtn.addEventListener("click", function () {
    if (window.trainWords && visible.length) window.trainWords(visible.map(function (r) { return r.e.de; }));
  });

  function active() { return page.classList.contains("active"); }
  var dirty = true;
  P.onChange(function () { if (active()) refresh(); else dirty = true; });
  function onRoute() { if (active() && dirty) { dirty = false; refresh(); } }
  window.addEventListener("hashchange", function () { setTimeout(onRoute, 0); });
  onRoute();
})();
