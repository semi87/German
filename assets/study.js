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
    if (t.hasAttribute("data-no-mix")) return;
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

  // Next topic to study: from the level-test level upwards first, then anything left.
  function nextTopic() {
    var test = P.getMeta("levelTest");
    var from = test && test.level ? Math.min(LEVELS.indexOf(test.level) + 1, LEVELS.length - 1) : 0;
    var open = topics.filter(function (t) { return !P.isLearned(t.id); });
    var preferred = open.filter(function (t) { return LEVELS.indexOf(levelOf(t)) >= from; });
    return preferred[0] || open[0] || null;
  }
  function nextText() {
    var texts = window.READING_TEXTS || [];
    var test = P.getMeta("levelTest");
    var lv = test && test.level ? test.level : "A1";
    var unread = texts.filter(function (x) { return !P.isRead(x.id); });
    return unread.filter(function (x) { return x.level >= lv; })[0] || unread[0] || null;
  }

  // ---------- today's plan ----------
  function planItems() {
    var c = P.todayCounts();
    var items = [];
    var n = nextTopic();
    var learnedToday = P.learnedToday();
    if (n || learnedToday) items.push({
      icon: "📖", label: learnedToday ? "Learn a new topic" : "Learn a topic: " + n.getAttribute("data-title"),
      done: learnedToday > 0, progress: learnedToday ? "done" : "read it, do the exercises, mark it as learned",
      href: n ? "#" + n.id : "#progress"
    });
    var due = dueCards();
    var cardsGoal = Math.min(10, due + P.newLeftToday());
    if (cardsGoal > 0 || c.cards) items.push({
      icon: "📚", label: "Flashcards" + (due ? " (" + due + " due)" : ""),
      done: (c.cards || 0) >= Math.max(cardsGoal, 1) || (!due && !P.newLeftToday()),
      progress: Math.min(c.cards || 0, 10) + " / " + Math.max(cardsGoal, 1) + " cards",
      href: "#dictionary", onclick: startCards
    });
    var mistakes = P.mistakes().length;
    if (mistakes || c.review) items.push({
      icon: "🔁", label: "Review your mistakes",
      done: (c.review || 0) >= Math.min(5, (c.review || 0) + mistakes),
      progress: Math.min(c.review || 0, 5) + " / " + Math.min(5, (c.review || 0) + mistakes) + " answers",
      href: "#practice?mode=review"
    });
    items.push({
      icon: "🏋", label: "Practice 10 questions",
      done: (c.practice || 0) >= 10, progress: Math.min(c.practice || 0, 10) + " / 10",
      href: "#practice"
    });
    var text = nextText();
    if (text || c.read) items.push({
      icon: "📰", label: c.read ? "Read a text" : "Read: " + text.title + " (" + text.level + ")",
      done: (c.read || 0) >= 1, progress: c.read ? "done" : "mark it as read when you finish",
      href: text ? "#reading?text=" + text.id : "#reading"
    });
    return items;
  }

  function renderPlan(host) {
    if (!host) return;
    host.textContent = "";
    var items = planItems();
    var doneCount = items.filter(function (i) { return i.done; }).length;
    var box = el("div", "card plan" + (doneCount === items.length ? " complete" : ""));
    var head = el("div", "plan-head");
    head.appendChild(el("b", null, "📅 Today's plan"));
    head.appendChild(el("span", "hint", doneCount + " of " + items.length + " done"));
    box.appendChild(head);
    var ul = el("ul", "plan-list");
    items.forEach(function (it) {
      var li = el("li", "plan-item" + (it.done ? " done" : ""));
      li.appendChild(el("span", "plan-check", it.done ? "✓" : ""));
      var a = el("a", "plan-link", it.icon + " " + it.label);
      a.href = it.href;
      if (it.onclick) a.addEventListener("click", it.onclick);
      li.appendChild(a);
      li.appendChild(el("span", "plan-progress hint", it.progress));
      ul.appendChild(li);
    });
    box.appendChild(ul);
    if (doneCount === items.length) box.appendChild(el("p", "plan-complete", "🎉 Today's plan is complete — see you tomorrow!"));
    host.appendChild(box);
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
    if (!P.getMeta("levelTest")) acts.appendChild(actionLink("🎯 Take the level test", "#leveltest"));
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
    tiles.appendChild(tile(String(srs.known), "words known · " + srs.learning + " learning", "#vocab"));
    tiles.appendChild(tile(String(due), due === 1 ? "flashcard due" : "flashcards due", "#dictionary", startCards));
    var test = P.getMeta("levelTest");
    tiles.appendChild(tile(test ? (test.level || "A1") : "🎯", test ? "level test result" : "take the level test", "#leveltest"));
    var texts = window.READING_TEXTS || [];
    tiles.appendChild(tile(P.readCount() + " / " + texts.length, "texts read", "#reading"));

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
    renderPlan(document.getElementById("homePlan"));
    renderPlan(document.getElementById("pgPlan"));
  }
  var pending = false;
  P.onChange(function () {
    if (pending) return;
    pending = true;
    setTimeout(function () { pending = false; refreshAll(); }, 0);
  });
  window.addEventListener("hashchange", function () {
    var id = location.hash.slice(1).split("?")[0];
    if (id === "progress" || id === "home" || id === "") refreshAll();
  });
  refreshAll();
})();
