/*
 * Practice trainer: endless random drills built from the dictionary
 * (window.WOERTERBUCH) plus a "grammar mix" that borrows questions from
 * the exercises in every topic.
 */
(function () {
  "use strict";

  var root = document.getElementById("trainer");
  var words = window.WOERTERBUCH || [];
  if (!root || !words.length) return;

  var promptEl = document.getElementById("trPrompt");
  var hintEl = document.getElementById("trHint");
  var answerEl = document.getElementById("trAnswer");
  var feedbackEl = document.getElementById("trFeedback");
  var checkBtn = document.getElementById("trCheck");
  var nextBtn = document.getElementById("trNext");
  var scoreEl = document.getElementById("trScore");
  var modesEl = document.getElementById("trModes");

  function clean(s) {
    return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?,;]+$/, "");
  }
  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var nouns = words.filter(function (w) { return w.type === "noun" && w.gender !== "p"; });
  var plurals = nouns.filter(function (w) { return /^die /.test(w.forms); });
  var verbs = words.filter(function (w) { return w.type === "verb"; });
  var translatable = words.filter(function (w) {
    return w.theme !== "Phrases" && w.theme !== "Small words" && w.theme !== "Time words";
  });

  // Questions from the topic exercises (minus the solution spans app.js adds).
  var grammar = [];
  document.querySelectorAll(".topic .quiz li").forEach(function (li) {
    if (!li.querySelector("input[data-answer]")) return;
    var topic = li.closest(".topic");
    if (topic.id === "practice") return;
    var copy = li.cloneNode(true);
    copy.querySelectorAll(".sol").forEach(function (s) { s.remove(); });
    var quiz = li.closest(".quiz");
    var intro = quiz.querySelector(":scope > .hint");
    grammar.push({
      node: copy,
      topic: topic,
      title: quiz.querySelector("h3").textContent.replace(/^Practice( \d)?:?\s*/, ""),
      intro: intro ? intro.textContent : ""
    });
  });

  // ---------- Article tables for the case drills ----------
  var ARTICLES = {
    der:  { N: ["der", "die", "das", "die"], A: ["den", "die", "das", "die"], D: ["dem", "der", "dem", "den"], G: ["des", "der", "des", "der"] },
    ein:  { N: ["ein", "eine", "ein", null], A: ["einen", "eine", "ein", null], D: ["einem", "einer", "einem", null], G: ["eines", "einer", "eines", null] },
    kein: { N: ["kein", "keine", "kein", "keine"], A: ["keinen", "keine", "kein", "keine"], D: ["keinem", "keiner", "keinem", "keinen"], G: ["keines", "keiner", "keines", "keiner"] },
    mein: { N: ["mein", "meine", "mein", "meine"], A: ["meinen", "meine", "mein", "meine"], D: ["meinem", "meiner", "meinem", "meinen"], G: ["meines", "meiner", "meines", "meiner"] }
  };
  var CASE_NAMES = { N: "Nominativ", A: "Akkusativ", D: "Dativ", G: "Genitiv" };
  var GENDER_INDEX = { m: 0, f: 1, n: 2, p: 3 };
  var PREPS = [
    ["durch", "A"], ["für", "A"], ["gegen", "A"], ["ohne", "A"], ["um", "A"],
    ["aus", "D"], ["bei", "D"], ["mit", "D"], ["nach", "D"], ["seit", "D"], ["von", "D"], ["zu", "D"], ["gegenüber", "D"],
    ["wegen", "G"], ["trotz", "G"], ["während", "G"], ["statt", "G"],
    ["in", "A", "Wohin?"], ["in", "D", "Wo?"], ["auf", "A", "Wohin?"], ["auf", "D", "Wo?"],
    ["an", "A", "Wohin?"], ["an", "D", "Wo?"], ["unter", "D", "Wo?"], ["neben", "A", "Wohin?"], ["hinter", "D", "Wo?"]
  ];
  var withPlural = nouns.filter(function (w) { return /^die /.test(w.forms); });

  // Weak masculine nouns (n-declension) in the word list: ending in Akk./Dat./Gen. singular.
  var WEAK = { Mensch: "en", Junge: "n", Nachbar: "n", Kollege: "n", Herr: "n", Student: "en", Name: "n" };

  // The noun as it appears in the phrase: dative plural -n, genitive -(e)s, weak nouns -(e)n.
  function nounFor(w, plural, kase) {
    if (plural) {
      var pl = (w.gender === "p" ? w.word : w.forms.replace(/^die /, ""));
      if (kase === "D" && !/[ns]$/.test(pl)) pl += "n";
      return pl;
    }
    var n = w.word;
    if (w.gender === "m" && WEAK[n] && kase !== "N") return n + WEAK[n] + (n === "Name" && kase === "G" ? "s" : "");
    if (kase === "G" && w.gender !== "f") return /(s|ß|x|z|sch)$/.test(n) ? n + "es" : n + "s";
    return n;
  }

  // Nouns that make sense with in / auf / an / unter … (places and things you can put things on or in).
  var placeNouns = nouns.filter(function (w) { return w.theme === "Home" || w.theme === "Town & Travel"; });

  // Sentences for the sentence builder: every German example on the site.
  var sentences = [];
  document.querySelectorAll(".topic .ex li").forEach(function (li) {
    var topic = li.closest(".topic");
    if (!topic || topic.id === "practice" || topic.id === "notes") return;
    var de = li.querySelector(".de");
    if (!de) return;
    var text = de.textContent.replace(/\s+/g, " ").trim();
    if (/[\/→=…()—–„“”"\[\]:;]/.test(text)) return;
    if (!/^[A-ZÄÖÜ]/.test(text) || !/[.!?]$/.test(text)) return; // complete sentences only
    var end = text.slice(-1);
    var body = text.replace(/[.!?]$/, "");
    if (/[.!?]/.test(body)) return; // more than one sentence
    var words = body.split(" ");
    if (words.length < 4 || words.length > 9) return;
    var en = li.querySelector(".en");
    sentences.push({ words: words, end: end, en: en ? en.textContent.trim() : "", topic: topic });
  });

  // ---------- Modes ----------
  // Each mode returns a question: {prompt, hint, build(container) -> check() -> {ok, solution}}
  var MODES = {
    gender: {
      label: "der, die, das",
      make: function () {
        var w = pick(nouns);
        return {
          prompt: w.word,
          hint: w.en,
          buttons: ["der", "die", "das"],
          answers: [w.article],
          solution: w.article + " " + w.word + (w.forms ? " — " + w.forms : ""),
          speak: w.de
        };
      }
    },
    plural: {
      label: "Plurals",
      make: function () {
        var w = pick(plurals);
        var pl = w.forms;
        return {
          prompt: w.de + " → die …",
          hint: "Plural of “" + w.en + "”",
          answers: [pl, pl.replace(/^die /, "")],
          solution: pl,
          speak: pl
        };
      }
    },
    verbs: {
      label: "Verb forms",
      make: function () {
        var w = pick(verbs);
        var forms = w.forms.split(" · ");
        var i = Math.floor(Math.random() * 3);
        var names = ["Präsens: er/sie/es …", "Präteritum: er/sie/es …", "Perfekt: er/sie/es …"];
        var ans = forms[i];
        return {
          prompt: w.word,
          hint: names[i] + "  (" + w.en + ")",
          answers: [ans, "er " + ans, "sie " + ans, "es " + ans],
          solution: "er " + ans,
          speak: "er " + ans
        };
      }
    },
    translate: {
      label: "English → German",
      make: function () {
        var w = pick(translatable);
        var answers = [w.de];
        if (w.article) answers.push(w.word);
        return {
          prompt: w.en,
          hint: w.article ? "Noun — include the article (der/die/das)" : w.type === "verb" ? "Verb — give the infinitive" : "",
          answers: answers,
          strict: w.article ? w.de : null,
          solution: w.de,
          speak: w.de
        };
      }
    },
    cases: {
      label: "Articles & cases",
      make: function () {
        var types = ["der", "ein", "kein", "mein"];
        var type = pick(types);
        var kase = pick(["N", "A", "D", "G"]);
        var w, plural;
        if (Math.random() < 0.25 && withPlural.length) { w = pick(withPlural); plural = true; }
        else { w = pick(nouns); plural = false; }
        var g = plural ? 3 : GENDER_INDEX[w.gender];
        if (type === "ein" && plural) type = "kein";
        var art = ARTICLES[type][kase][g];
        var noun = nounFor(w, plural, kase);
        return {
          prompt: CASE_NAMES[kase] + ":  ___ " + noun,
          hint: type + " … · " + (plural ? "plural of " + w.de : w.de) + " (" + w.en + ")",
          answers: [art],
          solution: art + " " + noun,
          speak: art + " " + noun
        };
      }
    },
    preps: {
      label: "Prepositions",
      make: function () {
        var p = pick(PREPS);
        var w = pick(p[2] ? placeNouns : nouns.filter(function (x) { return x.theme !== "Time"; }));
        var art = ARTICLES.der[p[1]][GENDER_INDEX[w.gender]];
        var noun = nounFor(w, false, p[1]);
        var contraction = { "zu dem": "zum", "zu der": "zur", "in dem": "im", "in das": "ins", "an dem": "am", "an das": "ans", "bei dem": "beim", "von dem": "vom" }[p[0] + " " + art];
        return {
          prompt: p[0] + " ___ " + noun,
          hint: "Type the article · " + w.de + " (" + w.en + ")" + (p[2] ? " · " + p[2] : ""),
          answers: [art].concat(contraction ? [contraction] : []),
          solution: p[0] + " " + art + " " + noun + " — " + CASE_NAMES[p[1]] +
            (contraction ? " (= " + contraction + " " + noun + ")" : ""),
          speak: p[0] + " " + art + " " + noun
        };
      }
    },
    builder: {
      label: "Sentence builder",
      make: function () {
        var s = pick(sentences);
        return { builder: s };
      }
    },
    grammar: {
      label: "Grammar mix",
      make: function () {
        var g = pick(grammar);
        return { grammar: g };
      }
    }
  };

  var mode = "gender";
  var q = null;
  var answered = false;
  var stats = { right: 0, total: 0, streak: 0 };

  Object.keys(MODES).forEach(function (key) {
    var b = el("button", "chip filter" + (key === mode ? " on" : ""), MODES[key].label);
    b.type = "button";
    b.addEventListener("click", function () {
      mode = key;
      modesEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c === b); });
      next();
    });
    modesEl.appendChild(b);
  });

  function speak(text) {
    if (!("speechSynthesis" in window) || !text) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function next() {
    q = MODES[mode].make();
    answered = false;
    promptEl.textContent = "";
    hintEl.textContent = "";
    answerEl.textContent = "";
    feedbackEl.textContent = "";
    feedbackEl.className = "tr-feedback";
    checkBtn.hidden = false;

    if (q.grammar) {
      var li = q.grammar.node.cloneNode(true);
      var sentence = el("div", "tr-sentence");
      while (li.firstChild) sentence.appendChild(li.firstChild);
      answerEl.appendChild(sentence);
      var link = el("a", null, q.grammar.topic.getAttribute("data-title"));
      link.href = "#" + q.grammar.topic.id;
      hintEl.appendChild(document.createTextNode("From: "));
      hintEl.appendChild(link);
      if (q.grammar.title) hintEl.appendChild(document.createTextNode(" — " + q.grammar.title));
      if (q.grammar.intro) promptEl.appendChild(el("div", "tr-instruction", q.grammar.intro));
      q.inputs = sentence.querySelectorAll("input[data-answer]");
      q.inputs.forEach(function (i) {
        i.addEventListener("keydown", onEnter);
      });
      q.inputs[0].focus();
      return;
    }

    if (q.builder) {
      var src = q.builder;
      q.built = [];
      promptEl.appendChild(el("div", "tr-instruction", src.en ? "“" + src.en + "”" : "Put the words in order."));
      var link2 = el("a", null, src.topic.getAttribute("data-title"));
      link2.href = "#" + src.topic.id;
      hintEl.appendChild(document.createTextNode("Click the words in the right order · from: "));
      hintEl.appendChild(link2);
      var line = el("div", "builder-line");
      var bank = el("div", "builder-bank");
      var order = src.words.map(function (w, i) { return i; });
      do {
        for (var k = order.length - 1; k > 0; k--) {
          var j = Math.floor(Math.random() * (k + 1));
          var tmp = order[k]; order[k] = order[j]; order[j] = tmp;
        }
      } while (order.every(function (v, i) { return v === i; }) && order.length > 1);
      function draw() {
        line.textContent = "";
        q.built.forEach(function (i) {
          var chip = el("button", "chip word-chip placed", src.words[i]);
          chip.type = "button";
          chip.addEventListener("click", function () {
            if (answered) return;
            q.built.splice(q.built.indexOf(i), 1);
            draw();
          });
          line.appendChild(chip);
        });
        line.appendChild(el("span", "builder-end", q.built.length ? src.end : "…"));
        bank.textContent = "";
        order.forEach(function (i) {
          if (q.built.indexOf(i) !== -1) return;
          var chip = el("button", "chip word-chip", src.words[i]);
          chip.type = "button";
          chip.addEventListener("click", function () {
            if (answered) return;
            q.built.push(i);
            draw();
            if (q.built.length === src.words.length) checkBtn.focus();
          });
          bank.appendChild(chip);
        });
      }
      q.redraw = draw;
      answerEl.appendChild(line);
      answerEl.appendChild(bank);
      draw();
      return;
    }

    promptEl.textContent = q.prompt;
    hintEl.textContent = q.hint || "";
    if (q.buttons) {
      checkBtn.hidden = true;
      var row = el("div", "tr-buttons");
      q.buttons.forEach(function (label) {
        var b = el("button", "btn gender-btn " + { der: "m", die: "f", das: "n" }[label], label);
        b.type = "button";
        b.addEventListener("click", function () { if (!answered) grade(label); });
        row.appendChild(b);
      });
      answerEl.appendChild(row);
    } else {
      var input = el("input", "tr-input");
      input.type = "text";
      input.setAttribute("autocomplete", "off");
      input.setAttribute("autocapitalize", "off");
      input.setAttribute("spellcheck", "false");
      input.setAttribute("aria-label", "Your answer");
      input.addEventListener("keydown", onEnter);
      answerEl.appendChild(input);
      input.focus();
    }
  }

  function onEnter(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (answered) next(); else grade();
  }

  function grade(choice) {
    var ok;
    var note = "";
    if (q.builder) {
      var target = q.builder.words.join(" ");
      var built = q.built.map(function (i) { return q.builder.words[i]; }).join(" ");
      ok = built === target;
      q.solution = target + q.builder.end;
      q.speak = q.solution;
      answerEl.querySelector(".builder-line").classList.add(ok ? "correct" : "wrong");
    } else if (q.grammar) {
      ok = true;
      var sols = [];
      q.inputs.forEach(function (i) {
        var answers = i.getAttribute("data-answer").split("|").map(clean);
        var good = answers.indexOf(clean(i.value)) !== -1;
        i.classList.toggle("correct", good);
        i.classList.toggle("wrong", !good);
        if (!good) ok = false;
        sols.push(i.getAttribute("data-answer").split("|")[0]);
      });
      q.solution = sols.join(" … ");
    } else {
      var given = clean(choice || answerEl.querySelector("input").value);
      ok = q.answers.map(clean).indexOf(given) !== -1;
      if (ok && q.strict && given !== clean(q.strict)) {
        note = " Don't forget the article: " + q.strict;
      }
      var input = answerEl.querySelector("input");
      if (input) {
        input.classList.toggle("correct", ok);
        input.classList.toggle("wrong", !ok);
      }
    }

    answered = true;
    stats.total++;
    if (ok) { stats.right++; stats.streak++; } else { stats.streak = 0; }
    feedbackEl.className = "tr-feedback " + (ok ? "good" : "bad");
    feedbackEl.textContent = (ok ? "✓ Richtig! " : "✗ Correct answer: ") + q.solution + (ok ? note : "");
    if (q.speak) {
      var s = el("button", "speak", "🔊");
      s.type = "button";
      s.setAttribute("aria-label", "Listen");
      s.addEventListener("click", function () { speak(q.speak); });
      feedbackEl.appendChild(s);
    }
    checkBtn.hidden = true;
    scoreEl.textContent = stats.right + " / " + stats.total + " correct" +
      (stats.streak >= 3 ? " · 🔥 " + stats.streak + " in a row" : "");
    nextBtn.focus();
  }

  checkBtn.addEventListener("click", function () { if (!answered) grade(); });
  nextBtn.addEventListener("click", next);
  document.getElementById("trReset").addEventListener("click", function () {
    stats = { right: 0, total: 0, streak: 0 };
    scoreEl.textContent = "";
    next();
  });

  next();
})();
