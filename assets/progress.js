/*
 * Learning progress, kept in this browser (localStorage):
 *   learned    topics marked as learned              { "<topic id>": <ms> }
 *   quiz       best score per topic exercise         { "<topic>:<quiz #>": { best, total, updated } }
 *   practice   Practice Trainer totals               { answered, right, bestStreak }
 *   days       answers per calendar day (streaks)    { "YYYY-MM-DD": <count> }
 *   mistakes   questions to review until correct     { "<id>": { mode, spec, label, added, misses } }
 *   srs        flashcard schedule per word           { "<German word>": { box, due, reviews } }
 *   newCards   new flashcards started today          { date, count }
 */
window.Progress = (function () {
  "use strict";

  var KEY = "deutsche-grammatik-progress-v1";
  var DAY = 24 * 60 * 60 * 1000;
  // Days until the next review for each Leitner box (box 0 = not known yet).
  var INTERVALS = [0, 1, 3, 7, 14, 30, 60];
  var NEW_PER_DAY = 15;

  var data;
  var ok = true;
  var listeners = [];

  function empty() {
    return { learned: {}, quiz: {}, practice: { answered: 0, right: 0, bestStreak: 0 }, days: {}, mistakes: {}, srs: {}, newCards: { date: "", count: 0 }, daily: {}, meta: {} };
  }
  function read() {
    data = empty();
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        Object.keys(data).forEach(function (k) { if (parsed && parsed[k]) data[k] = parsed[k]; });
      }
      ok = true;
    } catch (e) {
      ok = false;
    }
  }
  function write(what) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      ok = true;
    } catch (e) {
      ok = false;
    }
    listeners.forEach(function (fn) {
      try { fn(what); } catch (e) { /* keep going */ }
    });
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function mistakeId(mode, spec) {
    return mode + "|" + JSON.stringify(spec);
  }
  function markDay(what) {
    var t = today();
    data.days[t] = (data.days[t] || 0) + 1;
    if (what) {
      var d = data.daily[t] || (data.daily[t] = {});
      d[what] = (d[what] || 0) + 1;
    }
    // keep only the last 60 days of daily counters
    var keys = Object.keys(data.daily).sort();
    while (keys.length > 60) delete data.daily[keys.shift()];
  }

  read();
  window.addEventListener("storage", function (e) {
    if (e.key !== KEY) return;
    read();
    listeners.forEach(function (fn) { try { fn("all"); } catch (err) { /* ignore */ } });
  });

  return {
    ok: function () { return ok; },
    onChange: function (fn) { listeners.push(fn); },

    // ----- topics -----
    isLearned: function (id) { return !!data.learned[id]; },
    setLearned: function (id, on) {
      if (on) data.learned[id] = Date.now(); else delete data.learned[id];
      write("learned");
    },
    learnedToday: function () {
      var start = new Date(); start.setHours(0, 0, 0, 0);
      return Object.keys(data.learned).filter(function (k) { return k.indexOf("read:") !== 0 && data.learned[k] >= start.getTime(); }).length;
    },
    learnedIds: function () { return Object.keys(data.learned).filter(function (k) { return k.indexOf("read:") !== 0; }); },

    // ----- topic exercises -----
    recordQuiz: function (key, right, total) {
      var q = data.quiz[key];
      if (!q || right > q.best || total !== q.total) data.quiz[key] = { best: right, total: total, updated: Date.now() };
      else q.updated = Date.now();
      markDay("exercises");
      write("quiz");
    },
    quizBest: function (key) { return data.quiz[key] || null; },

    // ----- practice trainer -----
    recordAnswer: function (correct, streak, fromReview) {
      var p = data.practice;
      p.answered++;
      if (correct) p.right++;
      if (streak > p.bestStreak) p.bestStreak = streak;
      markDay(fromReview ? "review" : "practice");
      write("practice");
    },
    practice: function () { return data.practice; },

    // Days in a row with at least one answer or review (today or yesterday counts as current).
    dayStreak: function () {
      var n = 0;
      var d = new Date();
      var key = function (x) { return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
      if (!data.days[key(d)]) d.setDate(d.getDate() - 1);
      while (data.days[key(d)]) { n++; d.setDate(d.getDate() - 1); }
      return n;
    },

    // ----- mistakes -----
    addMistake: function (mode, spec, label) {
      var id = mistakeId(mode, spec);
      var m = data.mistakes[id];
      if (m) { m.misses++; m.added = Date.now(); }
      else data.mistakes[id] = { mode: mode, spec: spec, label: label || "", added: Date.now(), misses: 1 };
      write("mistakes");
      return id;
    },
    resolveMistake: function (mode, spec) {
      var id = mistakeId(mode, spec);
      if (!data.mistakes[id]) return false;
      delete data.mistakes[id];
      write("mistakes");
      return true;
    },
    hasMistake: function (mode, spec) { return !!data.mistakes[mistakeId(mode, spec)]; },
    mistakes: function () {
      return Object.keys(data.mistakes).map(function (id) {
        var m = data.mistakes[id];
        return { id: id, mode: m.mode, spec: m.spec, label: m.label, added: m.added, misses: m.misses };
      }).sort(function (a, b) { return a.added - b.added; });
    },
    clearMistakes: function () { data.mistakes = {}; write("mistakes"); },

    // ----- flashcards (Leitner spaced repetition) -----
    card: function (word) { return data.srs[word] || null; },
    isDue: function (word, now) {
      var c = data.srs[word];
      return !!c && c.due <= (now || Date.now());
    },
    review: function (word, knew) {
      var c = data.srs[word];
      var isNew = !c;
      if (!c) c = data.srs[word] = { box: 0, due: 0, reviews: 0 };
      if (isNew) {
        var t = today();
        if (data.newCards.date !== t) data.newCards = { date: t, count: 0 };
        data.newCards.count++;
      }
      c.reviews++;
      if (knew) {
        c.box = Math.min(c.box + 1, INTERVALS.length - 1);
        c.due = Date.now() + INTERVALS[c.box] * DAY;
      } else {
        c.box = 0;
        c.due = Date.now(); // comes back in this session
      }
      markDay("cards");
      write("srs");
      return c;
    },
    newLeftToday: function () {
      return data.newCards.date === today() ? Math.max(0, NEW_PER_DAY - data.newCards.count) : NEW_PER_DAY;
    },
    srsSummary: function () {
      var now = Date.now(), s = { started: 0, due: 0, learning: 0, known: 0 };
      Object.keys(data.srs).forEach(function (w) {
        var c = data.srs[w];
        s.started++;
        if (c.due <= now) s.due++;
        if (c.box >= 3) s.known++; else s.learning++;
      });
      return s;
    },
    intervalDays: function (box) { return INTERVALS[box] || 0; },

    // ----- stable ids for topic exercises -----
    // "<topic id>:<n-th exercise in the topic>" and "<…>:<n-th question>"
    quizKey: function (quizEl) {
      var topic = quizEl.closest(".topic");
      return topic.id + ":" + Array.prototype.indexOf.call(topic.querySelectorAll(".quiz"), quizEl);
    },
    itemKey: function (li) {
      var quiz = li.closest(".quiz");
      return this.quizKey(quiz) + ":" + Array.prototype.indexOf.call(quiz.querySelectorAll("li"), li);
    },

    // ----- reading texts -----
    isRead: function (id) { return !!data.learned["read:" + id]; },
    setRead: function (id, on) {
      if (on && !data.learned["read:" + id]) markDay("read");
      if (on) data.learned["read:" + id] = Date.now(); else delete data.learned["read:" + id];
      write("learned");
    },
    readCount: function () { return Object.keys(data.learned).filter(function (k) { return k.indexOf("read:") === 0; }).length; },

    // ----- today's activity (for the daily plan) -----
    todayCounts: function () { return data.daily[today()] || {}; },

    // ----- small settings / results (e.g. the level test) -----
    getMeta: function (key) { return data.meta[key]; },
    setMeta: function (key, value) { data.meta[key] = value; write("meta"); },

    // ----- all -----
    exportData: function () { return JSON.parse(JSON.stringify(data)); },
    importData: function (incoming) {
      if (!incoming || typeof incoming !== "object") return false;
      var base = empty();
      Object.keys(base).forEach(function (k) {
        if (!incoming[k]) return;
        if (k === "practice") {
          ["answered", "right", "bestStreak"].forEach(function (f) {
            data.practice[f] = Math.max(data.practice[f] || 0, incoming.practice[f] || 0);
          });
        } else if (k === "newCards") {
          return;
        } else {
          Object.keys(incoming[k]).forEach(function (id) {
            if (!(id in data[k])) data[k][id] = incoming[k][id];
          });
        }
      });
      write("all");
      return true;
    },
    reset: function () { data = empty(); write("all"); }
  };
})();
