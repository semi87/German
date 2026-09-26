/*
 * Study features built on progress.js:
 * - "Mark as learned" on every grammar topic, with the best exercise scores
 * - topic exercises save scores and add wrong answers to "My mistakes"
 * - ✓ marks in the sidebar, a summary on the home page
 * - the "My Progress" page
 */
(function () {
  "use strict";

  var P = window.Progress;
  if (!P) return;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var topics = Array.prototype.slice.call(document.querySelectorAll(".topic[data-level]"));
  var LEVELS = ["A1", "A2", "B1", "B2"];
  function levelOf(t) { return t.getAttribute("data-level").slice(0, 2); }

  // ---------- exercise scores per topic ----------
  function topicScores(t) {
    var quizzes = t.querySelectorAll(".quiz");
    var done = 0, perfect = 0, parts = [];
    Array.prototype.forEach.call(quizzes, function (q) {
      var r = P.quizBest(P.quizKey(q));
      if (r) {
        done++;
        if (r.best === r.total) perfect++;
        parts.push(r.best + "/" + r.total);
      } else {
        parts.push("–");
      }
    });
    return { count: quizzes.length, done: done, perfect: perfect, parts: parts };
  }
  function scoreText(s) {
    if (!s.count) return "";
    if (!s.done) return s.count === 1 ? "Exercise not done yet" : "Exercises not done yet";
    return "Best scores: " + s.parts.join(" · ") + (s.perfect === s.count ? " ✓ all perfect" : "");
  }

  // ---------- "Mark as learned" bars on each topic ----------
  var bars = {};

  function makeToggle(t) {
    var b = el("button", "btn secondary learn-btn");
    b.type = "button";
    b.addEventListener("click", function () {
      P.setLearned(t.id, !P.isLearned(t.id));
    });
    return b;
  }

  topics.forEach(function (t) {
    var top = el("div", "study-bar");
    var topBtn = makeToggle(t);
    var info = el("span", "study-info hint");
    top.appendChild(topBtn);
    top.appendChild(info);
    var sub = t.querySelector(":scope > .subtitle") || t.querySelector(":scope > h1");
    sub.insertAdjacentElement("afterend", top);

    var bottom = el("div", "study-bar study-bar-bottom");
    bottom.appendChild(el("span", "study-q", "Finished this topic?"));
    var bottomBtn = makeToggle(t);
    bottom.appendChild(bottomBtn);
    var anchor = t.querySelector(":scope > .notes-panel") || t.querySelector(":scope > .pager");
    t.insertBefore(bottom, anchor);

    bars[t.id] = { buttons: [topBtn, bottomBtn], info: info, bottom: bottom };
  });

  function refreshTopic(t) {
    var b = bars[t.id];
    if (!b) return;
    var learned = P.isLearned(t.id);
    var s = topicScores(t);
    b.buttons.forEach(function (btn) {
      btn.textContent = learned ? "✓ Learned" : "☐ Mark as learned";
      btn.classList.toggle("is-learned", learned);
      btn.setAttribute("aria-pressed", String(learned));
    });
    b.info.textContent = scoreText(s);
    b.bottom.classList.toggle("suggest", !learned && s.count > 0 && s.perfect === s.count);
  }

  function refreshNav() {
    topics.forEach(function (t) {
      var link = document.querySelector('#nav a[href="#' + t.id + '"]');
      if (link) link.classList.toggle("learned", P.isLearned(t.id));
    });
  }

  // ---------- topic exercises report their results ----------
  document.addEventListener("quiz:checked", function (e) {
    var quiz = e.target;
    var t = quiz.closest(".topic");
    if (!t || t.id === "practice") return;
    P.recordQuiz(P.quizKey(quiz), e.detail.right, e.detail.total);
    var title = t.getAttribute("data-title");
    e.detail.items.forEach(function (it) {
      if (!it.hasGaps) return;
      var spec = { g: P.itemKey(it.li) };
      if (it.ok) P.resolveMistake("grammar", spec);
      else P.addMistake("grammar", spec, title);
    });
    // Tell the learner where the wrong ones went.
    var actions = quiz.querySelector(".quiz-actions");
    var hint = actions && actions.querySelector(".mistake-hint");
    var wrong = e.detail.items.filter(function (it) { return it.hasGaps && !it.ok; }).length;
    if (actions && !hint) { hint = el("a", "mistake-hint hint"); hint.href = "#practice?mode=review"; actions.appendChild(hint); }
    if (hint) hint.textContent = wrong ? "🔁 " + wrong + " saved to My mistakes" : "";
  });

  // ---------- home page summary ----------
  var home = document.getElementById("homeProgress");

  function nextTopic() {
    for (var i = 0; i < topics.length; i++) if (!P.isLearned(topics[i].id)) return topics[i];
    return null;
  }
  function dueCards() {
    var words = window.WOERTERBUCH || [];
    var now = Date.now(), n = 0;
    words.forEach(function (w) { if (P.isDue(w.de, now)) n++; });
    return n;
  }

  function actionLink(text, href, onclick) {
    var a = el("a", "btn secondary small", text);
    a.href = href;
    if (onclick) a.addEventListener("click", onclick);
    return a;
  }
  function startCards(e) {
    e.preventDefault();
    location.hash = "#dictionary";
    setTimeout(function () { if (window.startFlashcards) window.startFlashcards(); }, 50);
  }

  function refreshHome() {
    if (!home) return;
    home.textContent = "";
    var learned = topics.filter(function (t) { return P.isLearned(t.id); }).length;
    var mistakes = P.mistakes().length;
    var streak = P.dayStreak();
    var box = el("div", "card home-progress");
    var line = el("div", "home-progress-line");
    line.appendChild(el("b", null, "Your progress: "));
    line.appendChild(document.createTextNode(learned + " of " + topics.length + " topics learned" +
      (streak ? " · 🔥 " + streak + (streak === 1 ? " day" : " days") + " in a row" : "")));
    box.appendChild(line);
    var bar = el("div", "pg-bar");
    var fill = el("div", "pg-fill");
    fill.style.width = Math.round(100 * learned / topics.length) + "%";
    bar.appendChild(fill);
    box.appendChild(bar);
    var acts = el("div", "home-progress-actions");
    var n = nextTopic();
    if (n) acts.appendChild(actionLink("▶ Continue: " + n.getAttribute("data-title"), "#" + n.id));
    if (mistakes) acts.appendChild(actionLink("🔁 Review " + mistakes + " mistake" + (mistakes === 1 ? "" : "s"), "#practice?mode=review"));
    var due = dueCards();
    acts.appendChild(actionLink(due ? "📚 " + due + " flashcard" + (due === 1 ? "" : "s") + " due" : "📚 Flashcards", "#dictionary", startCards));
    acts.appendChild(actionLink("📈 My progress", "#progress"));
    box.appendChild(acts);
    home.appendChild(box);
  }

  // ---------- the "My Progress" page ----------
  var page = document.getElementById("progress");

  function tile(value, label, href, onclick) {
    var t = el(href ? "a" : "div", "card pg-tile");
    if (href) { t.href = href; if (onclick) t.addEventListener("click", onclick); }
    t.appendChild(el("div", "pg-value", value));
    t.appendChild(el("div", "pg-label", label));
    return t;
  }

  function refreshPage() {
    if (!page) return;
    var learned = topics.filter(function (t) { return P.isLearned(t.id); });
    var pr = P.practice();
    var srs = P.srsSummary();
    var mistakes = P.mistakes().length;
    var due = dueCards();
    var streak = P.dayStreak();

    var tiles = document.getElementById("pgTiles");
    tiles.textContent = "";
    tiles.appendChild(tile(learned.length + " / " + topics.length, "topics learned"));
    tiles.appendChild(tile("🔥 " + streak, streak === 1 ? "day in a row" : "days in a row"));
    tiles.appendChild(tile(pr.answered ? Math.round(100 * pr.right / pr.answered) + "%" : "–",
      pr.answered + " practice answers · best streak " + pr.bestStreak, "#practice"));
    tiles.appendChild(tile(String(mistakes), mistakes === 1 ? "mistake to review" : "mistakes to review", "#practice?mode=review"));
    tiles.appendChild(tile(String(srs.known), "words known · " + srs.learning + " learning", "#dictionary"));
    tiles.appendChild(tile(String(due), due === 1 ? "flashcard due" : "flashcards due", "#dictionary", startCards));

    var nextBox = document.getElementById("pgNext");
    nextBox.textContent = "";
    var n = nextTopic();
    if (n) {
      nextBox.appendChild(el("span", null, "▶ Next up: "));
      var a = el("a", null, n.getAttribute("data-title"));
      a.href = "#" + n.id;
      nextBox.appendChild(a);
      nextBox.appendChild(el("span", "lvl", n.getAttribute("data-level")));
    } else {
      nextBox.textContent = "🏆 You've marked every topic as learned. Keep them fresh with the Practice Trainer and flashcards!";
    }

    var levels = document.getElementById("pgLevels");
    levels.textContent = "";
    LEVELS.forEach(function (lv) {
      var inLevel = topics.filter(function (t) { return levelOf(t) === lv; });
      if (!inLevel.length) return;
      var done = inLevel.filter(function (t) { return P.isLearned(t.id); }).length;
      var row = el("div", "pg-level");
      row.appendChild(el("span", "pg-level-name", lv));
      var bar = el("div", "pg-bar");
      var fill = el("div", "pg-fill");
      fill.style.width = Math.round(100 * done / inLevel.length) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      row.appendChild(el("span", "pg-level-count", done + " / " + inLevel.length));
      levels.appendChild(row);
    });

    var list = document.getElementById("pgTopics");
    list.textContent = "";
    var group = null, ul = null;
    topics.forEach(function (t) {
      var g = t.getAttribute("data-group");
      if (g !== group) {
        group = g;
        list.appendChild(el("h3", "pg-group", g));
        ul = el("ul", "pg-list");
        list.appendChild(ul);
      }
      var li = el("li", "pg-item" + (P.isLearned(t.id) ? " done" : ""));
      var label = el("label", "pg-check");
      var box = el("input");
      box.type = "checkbox";
      box.checked = P.isLearned(t.id);
      box.setAttribute("aria-label", "Learned: " + t.getAttribute("data-title"));
      box.addEventListener("change", function () { P.setLearned(t.id, box.checked); });
      label.appendChild(box);
      li.appendChild(label);
      var link = el("a", "pg-title", t.getAttribute("data-title"));
      link.href = "#" + t.id;
      li.appendChild(link);
      li.appendChild(el("span", "lvl", t.getAttribute("data-level")));
      var s = topicScores(t);
      li.appendChild(el("span", "pg-scores hint", s.done ? s.parts.join(" · ") : ""));
      ul.appendChild(li);
    });
  }

  document.getElementById("pgClearMistakes").addEventListener("click", function () {
    if (!P.mistakes().length) return;
    if (window.confirm("Clear your list of mistakes to review?")) P.clearMistakes();
  });
  document.getElementById("pgReset").addEventListener("click", function () {
    if (window.confirm("Reset ALL progress (learned topics, scores, mistakes and flashcard schedule)? Your notes are not affected.")) P.reset();
  });

  // ---------- keep everything in sync ----------
  function refreshAll() {
    topics.forEach(refreshTopic);
    refreshNav();
    refreshHome();
    refreshPage();
  }
  var pending = false;
  P.onChange(function () {
    if (pending) return;
    pending = true;
    setTimeout(function () { pending = false; refreshAll(); }, 0);
  });
  window.addEventListener("hashchange", function () {
    var id = location.hash.slice(1).split("?")[0];
    if (id === "progress" || id === "home" || id === "") { refreshHome(); refreshPage(); }
  });
  refreshAll();
})();
