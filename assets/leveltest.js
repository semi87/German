/*
 * Level test: 32 multiple-choice questions (8 per level, A1–B2).
 * Estimates the level and recommends topics; the result is saved via progress.js.
 */
(function () {
  "use strict";

  // [level, sentence with ___, options, index of the right option, topic id]
  var Q = [
    ["A1", "Ich ___ aus Spanien.", ["komme", "kommst", "kommt"], 0, "present"],
    ["A1", "Ich habe ___ Bruder und eine Schwester.", ["ein", "einen", "einem"], 1, "articles"],
    ["A1", "Wir ___ heute Abend ins Kino.", ["gehen", "geht", "gehst"], 0, "present"],
    ["A1", "___ wohnst du? — In Berlin.", ["Wo", "Wohin", "Woher"], 0, "questions"],
    ["A1", "Tut mir leid, ich habe heute ___ Zeit.", ["nicht", "kein", "keine"], 2, "negation"],
    ["A1", "Heute ___ lange.", ["ich arbeite", "arbeite ich", "arbeiten ich"], 1, "wordorder"],
    ["A1", "Kannst du mir bitte ___?", ["helfen", "hilfst", "zu helfen"], 0, "modals"],
    ["A1", "Das ist ___ Mädchen.", ["der", "die", "das"], 2, "nouns"],

    ["A2", "Ich helfe ___ Mutter.", ["meine", "meiner", "meinen"], 1, "dativ"],
    ["A2", "Gestern ___ ich ins Kino gegangen.", ["habe", "bin", "war"], 1, "perfekt"],
    ["A2", "Ich bleibe zu Hause, weil ich krank ___.", ["bin", "sein", "ist"], 0, "conjunctions"],
    ["A2", "Das Buch liegt auf ___ Tisch.", ["den", "dem", "der"], 1, "prepositions"],
    ["A2", "Ich wasche ___ die Hände.", ["mich", "mir", "mein"], 1, "reflexive"],
    ["A2", "Mein Bruder ist zwei Jahre ___ als ich.", ["alt", "älter", "am ältesten"], 1, "comparison"],
    ["A2", "Wir kaufen einen ___ Tisch.", ["neue", "neuen", "neuer"], 1, "adjectives"],
    ["A2", "Als Kind ___ ich in Wien.", ["wohne", "wohnte", "gewohnt"], 1, "praeteritum"],

    ["B1", "Das ist der Mann, ___ ich gestern geholfen habe.", ["der", "den", "dem"], 2, "relative"],
    ["B1", "Wenn ich mehr Zeit ___, würde ich öfter reisen.", ["habe", "hätte", "hatte"], 1, "konjunktiv2"],
    ["B1", "Das Haus ___ im Jahr 1900 gebaut.", ["wurde", "wird", "hat"], 0, "passive"],
    ["B1", "Nächste Woche sind Ferien. Ich freue mich ___!", ["darüber", "darauf", "dafür"], 1, "verbprep"],
    ["B1", "Ich lerne Deutsch, ___ in Deutschland zu arbeiten.", ["damit", "um", "für"], 1, "infinitive"],
    ["B1", "Trotz ___ Regens gehen wir spazieren.", ["dem", "des", "den"], 1, "genitiv"],
    ["B1", "Ich habe gestern lange arbeiten ___.", ["gemusst", "müssen", "musste"], 1, "modalpast"],
    ["B1", "Je mehr du übst, ___ besser sprichst du.", ["so", "desto", "als"], 1, "twopart"],

    ["B2", "Der Minister sagte, die Lage ___ stabil.", ["ist gewesen", "sei", "seien"], 1, "konjunktiv1"],
    ["B2", "Das Problem lässt sich leicht ___.", ["lösen", "gelöst", "zu lösen"], 0, "passivealt"],
    ["B2", "Die im letzten Jahr ___ Brücke ist schon kaputt.", ["gebaute", "bauende", "gebaut"], 0, "participles"],
    ["B2", "Er ist nicht da. Er muss den Zug verpasst ___.", ["haben", "sein", "hat"], 0, "subjmodal"],
    ["B2", "___ des schlechten Wetters fand das Konzert statt.", ["Wegen", "Trotz", "Während"], 1, "nominal"],
    ["B2", "Er tut so, als ob er alles ___.", ["weiß", "wüsste", "wisse"], 1, "subclauses"],
    ["B2", "Die Rechnung ist bis Freitag ___.", ["zu bezahlen", "bezahlen", "bezahlt zu"], 0, "passivealt"],
    ["B2", "Er spart Geld, ___ er mit dem Fahrrad fährt.", ["indem", "sodass", "damit"], 0, "subclauses"]
  ];
  var LEVELS = ["A1", "A2", "B1", "B2"];
  var PASS = 6; // of 8 per level

  var root = document.getElementById("leveltestApp");
  if (!root) return;
  var P = window.Progress || null;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function topicTitle(id) {
    var t = document.getElementById(id);
    return t ? t.getAttribute("data-title") : id;
  }

  var answers = [];
  var index = 0;

  function start() {
    answers = [];
    index = 0;
    question();
  }

  function question() {
    root.textContent = "";
    var q = Q[index];
    var head = el("div", "lt-head");
    head.appendChild(el("span", "hint", "Question " + (index + 1) + " of " + Q.length));
    head.appendChild(el("span", "lvl", q[0]));
    root.appendChild(head);
    var bar = el("div", "pg-bar");
    var fill = el("div", "pg-fill");
    fill.style.width = Math.round(100 * index / Q.length) + "%";
    bar.appendChild(fill);
    root.appendChild(bar);

    var sentence = el("div", "lt-sentence");
    var parts = q[1].split("___");
    sentence.appendChild(document.createTextNode(parts[0]));
    sentence.appendChild(el("span", "lt-gap", "___"));
    sentence.appendChild(document.createTextNode(parts[1] || ""));
    root.appendChild(sentence);

    var opts = el("div", "lt-options");
    q[2].forEach(function (o, i) {
      var b = el("button", "btn secondary lt-option", o);
      b.type = "button";
      b.addEventListener("click", function () { choose(i); });
      opts.appendChild(b);
    });
    var skip = el("button", "btn secondary lt-option lt-skip", "I don't know");
    skip.type = "button";
    skip.addEventListener("click", function () { choose(-1); });
    opts.appendChild(skip);
    root.appendChild(opts);
    root.appendChild(el("p", "hint", "Choose the right option. Don't guess — “I don't know” gives a more accurate result."));
    var first = opts.querySelector("button");
    if (first && document.activeElement && root.contains(document.activeElement)) first.focus();
  }

  function choose(i) {
    answers[index] = i;
    index++;
    if (index < Q.length) question(); else result();
  }

  function evaluate() {
    var per = {};
    LEVELS.forEach(function (lv) { per[lv] = 0; });
    var wrongTopics = [];
    Q.forEach(function (q, i) {
      if (answers[i] === q[3]) per[q[0]]++;
      else if (wrongTopics.indexOf(q[4]) === -1) wrongTopics.push(q[4]);
    });
    // Level = highest level passed, with all lower levels passed too.
    var level = null;
    for (var k = 0; k < LEVELS.length; k++) {
      if (per[LEVELS[k]] >= PASS) level = LEVELS[k]; else break;
    }
    return { per: per, level: level, wrong: wrongTopics, date: Date.now() };
  }

  function levelName(r) {
    if (!r.level) return r.per.A1 >= 3 ? "A1 (in progress)" : "Beginner — start with A1";
    if (r.level === "B2") return "B2 or higher";
    return r.level;
  }

  function result() {
    var r = evaluate();
    if (P) P.setMeta("levelTest", r);
    showResult(r, true);
  }

  function showResult(r, fresh) {
    root.textContent = "";
    var box = el("div", "lt-result");
    box.appendChild(el("div", "hint", fresh ? "Your estimated level" : "Your last result (" + new Date(r.date).toLocaleDateString() + ")"));
    box.appendChild(el("div", "lt-level", levelName(r)));
    root.appendChild(box);

    var levels = el("div", "pg-levels");
    LEVELS.forEach(function (lv) {
      var row = el("div", "pg-level");
      row.appendChild(el("span", "pg-level-name", lv));
      var bar = el("div", "pg-bar");
      var fill = el("div", "pg-fill" + (r.per[lv] >= PASS ? "" : " low"));
      fill.style.width = Math.round(100 * r.per[lv] / 8) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      row.appendChild(el("span", "pg-level-count", r.per[lv] + " / 8"));
      levels.appendChild(row);
    });
    root.appendChild(levels);

    if (r.wrong.length) {
      root.appendChild(el("h3", null, "Recommended topics"));
      root.appendChild(el("p", "hint", "Based on the questions you missed, in order of level:"));
      var ul = el("ul", "pg-list");
      r.wrong.forEach(function (id) {
        var t = document.getElementById(id);
        if (!t) return;
        var li = el("li", "pg-item");
        var a = el("a", "pg-title", topicTitle(id));
        a.href = "#" + id;
        li.appendChild(a);
        li.appendChild(el("span", "lvl", t.getAttribute("data-level")));
        ul.appendChild(li);
      });
      root.appendChild(ul);
    } else {
      root.appendChild(el("p", null, "🏆 Perfect score! Keep your German fresh with the reading texts and the Practice Trainer."));
    }

    var acts = el("div", "quiz-actions");
    var again = el("button", "btn", fresh ? "Take the test again" : "Retake the test");
    again.type = "button";
    again.addEventListener("click", start);
    acts.appendChild(again);
    var prog = el("a", "btn secondary", "📈 My progress");
    prog.href = "#progress";
    acts.appendChild(prog);
    root.appendChild(acts);
  }

  function intro() {
    root.textContent = "";
    var last = P && P.getMeta("levelTest");
    if (last) { showResult(last, false); return; }
    root.appendChild(el("p", null, "32 short questions — 8 for each level from A1 to B2. It takes about 5–10 minutes. At the end you get your estimated level and a list of topics to study."));
    var b = el("button", "btn", "Start the test");
    b.type = "button";
    b.addEventListener("click", start);
    root.appendChild(b);
  }

  window.LEVEL_TEST = { questions: Q, levels: LEVELS, pass: PASS };
  intro();
})();
