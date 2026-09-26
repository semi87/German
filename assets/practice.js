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

  var P = window.Progress || null;
  var byDe = {};
  words.forEach(function (w) { if (!byDe[w.de]) byDe[w.de] = w; });
  function word(spec, list) {
    if (!spec) return pick(list);
    var w = byDe[spec.w];
    return w && list.indexOf(w) !== -1 ? w : null;
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
    if (topic.id === "practice" || topic.hasAttribute("data-no-mix")) return;
    var copy = li.cloneNode(true);
    copy.querySelectorAll(".sol").forEach(function (s) { s.remove(); });
    var quiz = li.closest(".quiz");
    var intro = quiz.querySelector(":scope > .hint");
    grammar.push({
      key: P ? P.itemKey(li) : topic.id + ":" + grammar.length,
      node: copy,
      topic: topic,
      title: quiz.querySelector("h3").textContent.replace(/^Practice( \d)?:?\s*/, ""),
      intro: intro ? intro.textContent : ""
    });
  });

  var grammarByKey = {};
  grammar.forEach(function (g) { grammarByKey[g.key] = g; });

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
    sentences.push({ key: body + end, words: words, end: end, en: en ? en.textContent.trim() : "", topic: topic });
  });
  var sentenceByKey = {};
  sentences.forEach(function (x) { sentenceByKey[x.key] = x; });

  // ---------- Conjugation tables ----------
  var PERSONS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
  var TENSES = ["Präsens", "Präteritum", "Perfekt"];
  var IRREGULAR_PRESENT = {
    sein: ["bin", "bist", "ist", "sind", "seid", "sind"],
    haben: ["habe", "hast", "hat", "haben", "habt", "haben"],
    werden: ["werde", "wirst", "wird", "werden", "werdet", "werden"],
    wissen: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
    tun: ["tue", "tust", "tut", "tun", "tut", "tun"],
    "können": ["kann", "kannst", "kann", "können", "könnt", "können"],
    "müssen": ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    "dürfen": ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    sollen: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    wollen: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    "mögen": ["mag", "magst", "mag", "mögen", "mögt", "mögen"]
  };
  var AUX = {
    hat: ["habe", "hast", "hat", "haben", "habt", "haben"],
    ist: ["bin", "bist", "ist", "sind", "seid", "sind"]
  };
  // "e" before -st / -t when the stem ends in t, d or consonant + m/n (arbeiten, finden, öffnen)
  function needsE(stem) { return /[td]$/.test(stem) || /[^aeiouäöülrhmn][mn]$/.test(stem); }
  function sibilant(stem) { return /(s|ß|z|x)$/.test(stem); }

  function conjugate(w, tense) {
    if (w.type !== "verb" || /^sich /.test(w.de)) return null;
    var f = w.forms.split(" · ");
    var erParts = f[0].split(" ");               // "kommt an" → ["kommt", "an"]
    var particle = erParts.length > 1 ? " " + erParts.slice(1).join(" ") : "";
    var inf = particle ? w.de.slice(particle.trim().length) : w.de;
    if (tense === 0) {
      var irr = IRREGULAR_PRESENT[inf];
      if (irr) return irr.map(function (x) { return x + particle; });
      var stem = inf.replace(/e?n$/, "");
      var er = erParts[0];
      var erStem = er.replace(/t$/, "");
      var du = sibilant(erStem) ? er
        : needsE(stem) && er === stem + "et" ? stem + "est"
        : /t$/.test(stem) && er !== stem + "et" ? er + "st" // hält → hältst, tritt → trittst
        : erStem + "st";
      var ihr = needsE(stem) ? stem + "et" : stem + "t";
      var ich = /el$/.test(stem) ? stem.slice(0, -2) + "le" : stem + "e"; // entwickeln → entwickle
      return [ich, du, er, inf, ihr, inf].map(function (x) { return x + particle; });
    }
    if (tense === 1) {
      var pParts = f[1].split(" ");
      var p = pParts[0];
      var part = pParts.length > 1 ? " " + pParts.slice(1).join(" ") : "";
      var weak = /te$/.test(p);
      var duP = weak ? p + "st" : (/[td]$/.test(p) || /(s|ß|z|x|sch)$/.test(p) ? p + "est" : p + "st");
      var ihrP = weak ? p + "t" : (/[td]$/.test(p) ? p + "et" : p + "t");
      var wirP = /e$/.test(p) ? p + "n" : p + "en";
      return [p, duP, p, wirP, ihrP, wirP].map(function (x) { return x + part; });
    }
    var perf = f[2].split(" ");
    var aux = AUX[perf[0]];
    if (!aux) return null;
    var rest = " " + perf.slice(1).join(" ");
    return aux.map(function (a) { return a + rest; });
  }
  var conjVerbs = verbs.filter(function (w) { return conjugate(w, 0); });
  window.__conjugate = conjugate; // for testing

  var WORD_MODES = { gender: true, plural: true, verbs: true, translate: true, conj: true };
  var canSpeakHere = "speechSynthesis" in window;
  function normSentence(x) {
    return x.toLowerCase().replace(/[.,!?;:„“"”–—-]/g, " ").replace(/\s+/g, " ").trim();
  }

  // ---------- Modes ----------
  // Each mode returns a question: {prompt, hint, build(container) -> check() -> {ok, solution}}
  var MODES = {
    gender: {
      label: "der, die, das",
      make: function (spec) {
        var w = word(spec, nouns);
        if (!w) return null;
        return {
          spec: { w: w.de },
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
      make: function (spec) {
        var w = word(spec, plurals);
        if (!w) return null;
        var pl = w.forms;
        return {
          spec: { w: w.de },
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
      make: function (spec) {
        var w = word(spec, verbs);
        if (!w) return null;
        var forms = w.forms.split(" · ");
        var i = spec ? spec.i : Math.floor(Math.random() * 3);
        var names = ["Präsens: er/sie/es …", "Präteritum: er/sie/es …", "Perfekt: er/sie/es …"];
        var ans = forms[i];
        return {
          spec: { w: w.de, i: i },
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
      make: function (spec) {
        var w = word(spec, translatable);
        if (!w) return null;
        var answers = [w.de];
        if (w.article) answers.push(w.word);
        return {
          spec: { w: w.de },
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
      make: function (spec) {
        var type = spec ? spec.type : pick(["der", "ein", "kein", "mein"]);
        var kase = spec ? spec.kase : pick(["N", "A", "D", "G"]);
        var w, plural;
        if (spec) { plural = spec.plural; w = word(spec, plural ? withPlural : nouns); if (!w) return null; }
        else if (Math.random() < 0.25 && withPlural.length) { w = pick(withPlural); plural = true; }
        else { w = pick(nouns); plural = false; }
        var g = plural ? 3 : GENDER_INDEX[w.gender];
        if (type === "ein" && plural) type = "kein";
        var art = ARTICLES[type][kase][g];
        var noun = nounFor(w, plural, kase);
        return {
          spec: { w: w.de, plural: plural, type: type, kase: kase },
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
      make: function (spec) {
        var pi = spec ? spec.p : Math.floor(Math.random() * PREPS.length);
        var p = PREPS[pi];
        if (!p) return null;
        var w = word(spec, p[2] ? placeNouns : nouns.filter(function (x) { return x.theme !== "Time"; }));
        if (!w) return null;
        var art = ARTICLES.der[p[1]][GENDER_INDEX[w.gender]];
        var noun = nounFor(w, false, p[1]);
        var contraction = { "zu dem": "zum", "zu der": "zur", "in dem": "im", "in das": "ins", "an dem": "am", "an das": "ans", "bei dem": "beim", "von dem": "vom" }[p[0] + " " + art];
        return {
          spec: { p: pi, w: w.de },
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
      make: function (spec) {
        var s = spec ? sentenceByKey[spec.s] : pick(sentences);
        return s ? { builder: s, spec: { s: s.key } } : null;
      }
    },
    conj: {
      label: "Conjugation",
      make: function (spec) {
        var w = word(spec, conjVerbs);
        if (!w) return null;
        var t = spec ? spec.t : Math.floor(Math.random() * 3);
        var forms = conjugate(w, t);
        if (!forms) return null;
        return {
          spec: { w: w.de, t: t },
          conj: { forms: forms, verb: w },
          prompt: w.de,
          hint: TENSES[t] + " · " + w.en,
          solution: PERSONS.map(function (pp, i) { return pp.replace("/sie/es", "") + " " + forms[i]; }).join(" · ")
        };
      }
    },
    listen: {
      label: "🎧 Listening",
      make: function (spec) {
        var s2 = spec ? sentenceByKey[spec.s] : pick(sentences);
        return s2 ? { listen: s2, spec: { s: s2.key }, prompt: "🎧 " + (s2.en || s2.key) } : null;
      }
    },
    speaking: {
      label: "🎤 Speaking",
      make: function (spec) {
        var s3 = spec ? sentenceByKey[spec.s] : pick(sentences);
        return s3 ? { speakSent: s3, spec: { s: s3.key }, prompt: s3.key } : null;
      }
    },
    challenge: {
      label: "⏱ 60-second challenge",
      make: function () {
        if (!challenge.running) return { challengeScreen: true };
        var kind = pick(["gender", "gender", "cases", "preps", "plural"]);
        var made = MODES[kind].make();
        if (made) made.mode = kind;
        return made;
      }
    },
    grammar: {
      label: "Grammar mix",
      make: function (spec) {
        var g = spec ? grammarByKey[spec.g] : pick(grammar);
        return g ? { grammar: g, spec: { g: g.key } } : null;
      }
    }
  };

  if (!canSpeakHere) delete MODES.listen;
  var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) delete MODES.speaking;

  // Word-level comparison of a target sentence with what the speech recognition heard.
  function compareSpoken(target, heard) {
    var want = normSentence(target).split(" ");
    var got = normSentence(heard).split(" ").filter(Boolean);
    var hits = want.map(function (w) {
      var i = got.indexOf(w);
      if (i === -1) return false;
      got.splice(i, 1);
      return true;
    });
    var n = hits.filter(Boolean).length;
    return { hits: hits, pct: Math.round(100 * n / want.length) };
  }
  window.__compareSpoken = compareSpoken; // for testing
  var challenge = { running: false, score: 0, answered: 0, end: 0, timer: null, last: null };

  // Review mode: questions you got wrong (here or in the topic exercises) until you get them right.
  if (P) {
    MODES.review = {
      label: "🔁 My mistakes",
      make: function () {
        var list = P.mistakes();
        for (var i = 0; i < list.length; i++) {
          var m = list[i];
          var made = MODES[m.mode] && m.mode !== "review" ? MODES[m.mode].make(m.spec) : null;
          if (made) {
            made.mode = m.mode;
            made.fromReview = true;
            made.left = list.length;
            return made;
          }
          P.resolveMistake(m.mode, m.spec); // content changed; drop it
        }
        return { empty: true };
      }
    };
  }

  var mode = "gender";
  var q = null;
  var answered = false;
  var stats = { right: 0, total: 0, streak: 0 };

  var reviewChip = null;
  Object.keys(MODES).forEach(function (key) {
    var b = el("button", "chip filter" + (key === mode ? " on" : "") + (key === "review" ? " review-chip" : ""), MODES[key].label);
    if (key === "review") reviewChip = b;
    b.type = "button";
    b.addEventListener("click", function () {
      if (challenge.running && key !== "challenge") { clearInterval(challenge.timer); challenge.running = false; }
      mode = key;
      modesEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c === b); });
      next();
    });
    modesEl.appendChild(b);
  });
  function updateReviewChip() {
    if (!reviewChip) return;
    var n = P.mistakes().length;
    reviewChip.textContent = MODES.review.label + (n ? " (" + n + ")" : "");
  }
  if (P) { P.onChange(function (what) { if (what === "mistakes" || what === "all") updateReviewChip(); }); updateReviewChip(); }

  // Open a specific drill from a link like #practice?mode=review
  function modeFromHash() {
    var m = /[?&]mode=(\w+)/.exec(location.hash);
    if (m && MODES[m[1]] && m[1] !== mode) {
      mode = m[1];
      modesEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c.textContent.indexOf(MODES[mode].label) === 0); });
      next();
    }
  }
  window.addEventListener("hashchange", modeFromHash);

  function speakRate(text, rate) {
    if (!canSpeakHere) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }

  function speak(text) {
    if (!("speechSynthesis" in window) || !text) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function next() {
    render();
    if (q.fromReview) {
      var tag = el("span", "review-tag", "🔁 Mistake review · " + q.left + " left");
      hintEl.insertBefore(tag, hintEl.firstChild);
    }
  }

  function render() {
    q = MODES[mode].make() || MODES[mode].make() || MODES[mode].make();
    if (!q.mode) q.mode = mode;
    answered = false;
    promptEl.textContent = "";
    hintEl.textContent = "";
    answerEl.textContent = "";
    feedbackEl.textContent = "";
    feedbackEl.className = "tr-feedback";
    checkBtn.hidden = false;

    if (q.challengeScreen) {
      checkBtn.hidden = true;
      var best = P ? P.getMeta("challengeBest") || 0 : 0;
      promptEl.textContent = challenge.last ? "⏱ Time's up!" : "⏱ 60-second challenge";
      hintEl.textContent = challenge.last
        ? "You got " + challenge.last.score + " right out of " + challenge.last.answered + "." + (challenge.last.record ? " 🏆 New record!" : " Your best: " + best + ".")
        : "Answer as many questions as you can in 60 seconds: der/die/das, plurals, articles and prepositions." + (best ? " Your best: " + best + "." : "");
      var go = el("button", "btn", challenge.last ? "Play again" : "Start");
      go.type = "button";
      go.addEventListener("click", startChallenge);
      answerEl.appendChild(go);
      go.focus();
      return;
    }

    if (q.conj) {
      promptEl.textContent = q.prompt;
      hintEl.textContent = q.hint;
      var grid = el("div", "conj-grid");
      q.inputs = [];
      PERSONS.forEach(function (pp, i) {
        var lab = el("label", "conj-row");
        lab.appendChild(el("span", "conj-person", pp));
        var inp = el("input", "tr-input conj-input");
        inp.type = "text";
        inp.setAttribute("autocomplete", "off");
        inp.setAttribute("autocapitalize", "off");
        inp.setAttribute("spellcheck", "false");
        inp.addEventListener("keydown", function (e) {
          if (e.key !== "Enter") return;
          e.preventDefault();
          if (answered) { next(); return; }
          if (i < PERSONS.length - 1 && !q.inputs[i + 1].value) q.inputs[i + 1].focus(); else grade();
        });
        lab.appendChild(inp);
        grid.appendChild(lab);
        q.inputs.push(inp);
      });
      answerEl.appendChild(grid);
      q.inputs[0].focus();
      return;
    }

    if (q.listen) {
      promptEl.textContent = "🎧 Listen and type what you hear";
      hintEl.textContent = "Punctuation and capital letters don't matter.";
      var ctl = el("div", "tr-buttons");
      var play = el("button", "btn", "🔊 Play");
      play.type = "button";
      play.addEventListener("click", function () { speakRate(q.listen.words.join(" ") + q.listen.end, 0.9); input2.focus(); });
      var slow = el("button", "btn secondary", "🐢 Slowly");
      slow.type = "button";
      slow.addEventListener("click", function () { speakRate(q.listen.words.join(" ") + q.listen.end, 0.6); input2.focus(); });
      ctl.appendChild(play);
      ctl.appendChild(slow);
      answerEl.appendChild(ctl);
      var input2 = el("input", "tr-input tr-wide");
      input2.type = "text";
      input2.setAttribute("autocomplete", "off");
      input2.setAttribute("spellcheck", "false");
      input2.setAttribute("aria-label", "What you heard");
      input2.addEventListener("keydown", onEnter);
      answerEl.appendChild(input2);
      setTimeout(function () { if (mode === "listen" && !answered) speakRate(q.listen.words.join(" ") + q.listen.end, 0.9); }, 250);
      input2.focus();
      return;
    }

    if (q.speakSent) {
      checkBtn.hidden = true;
      var target = q.speakSent.words.join(" ") + q.speakSent.end;
      promptEl.textContent = "🎤 Read this sentence aloud";
      hintEl.textContent = (q.speakSent.en ? "“" + q.speakSent.en + "” · " : "") + "Press the microphone and speak clearly. 80% of the words = passed.";
      var sentEl = el("div", "sp-target");
      sentEl.lang = "de";
      q.speakSent.words.forEach(function (w, i) {
        if (i) sentEl.appendChild(document.createTextNode(" "));
        sentEl.appendChild(el("span", "sp-word", w));
      });
      sentEl.appendChild(document.createTextNode(q.speakSent.end));
      answerEl.appendChild(sentEl);
      var ctl2 = el("div", "tr-buttons");
      var mic = el("button", "btn sp-mic", "🎤 Speak");
      mic.type = "button";
      ctl2.appendChild(mic);
      if (canSpeakHere) {
        var first = el("button", "btn secondary", "🔊 Listen first");
        first.type = "button";
        first.addEventListener("click", function () { speakRate(target, 0.85); });
        ctl2.appendChild(first);
      }
      answerEl.appendChild(ctl2);
      var heardEl = el("div", "sp-heard hint");
      heardEl.setAttribute("aria-live", "polite");
      answerEl.appendChild(heardEl);
      var rec = null;
      mic.addEventListener("click", function () {
        if (rec) { rec.stop(); return; }
        if (canSpeakHere) window.speechSynthesis.cancel();
        rec = new Recognition();
        rec.lang = "de-DE";
        rec.interimResults = false;
        rec.maxAlternatives = 3;
        var got = false;
        rec.onresult = function (ev) {
          got = true;
          var alts = ev.results[0], best = null;
          for (var a = 0; a < alts.length; a++) {
            var c = compareSpoken(target, alts[a].transcript);
            if (!best || c.pct > best.pct) best = { pct: c.pct, hits: c.hits, text: alts[a].transcript };
          }
          sentEl.querySelectorAll(".sp-word").forEach(function (w, i) {
            w.classList.toggle("hit", best.hits[i]);
            w.classList.toggle("miss", !best.hits[i]);
          });
          heardEl.textContent = "I heard: “" + best.text + "”";
          q.spoken = best;
          grade();
        };
        rec.onerror = function (ev) {
          heardEl.textContent = ev.error === "not-allowed" || ev.error === "service-not-allowed"
            ? "⚠ Microphone access was blocked. Allow it in your browser's site settings."
            : ev.error === "no-speech" ? "I didn't hear anything — try again." : "⚠ Speech recognition error: " + ev.error;
        };
        rec.onend = function () {
          rec = null;
          mic.classList.remove("on");
          mic.textContent = answered ? "🎤 Try again" : "🎤 Speak";
          if (!got && !heardEl.textContent) heardEl.textContent = "I didn't hear anything — try again.";
        };
        heardEl.textContent = "";
        mic.classList.add("on");
        mic.textContent = "⏹ Listening… (tap to stop)";
        try { rec.start(); } catch (e) { rec = null; mic.classList.remove("on"); mic.textContent = "🎤 Speak"; }
      });
      return;
    }

    if (q.empty) {
      checkBtn.hidden = true;
      promptEl.textContent = "🎉 No mistakes to review";
      hintEl.textContent = "Questions you get wrong — here or in any topic exercise — are collected here until you answer them correctly.";
      return;
    }

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
    if (q.conj) {
      ok = true;
      q.inputs.forEach(function (inp, i) {
        var good = clean(inp.value) === clean(q.conj.forms[i]);
        inp.classList.toggle("correct", good);
        inp.classList.toggle("wrong", !good);
        if (!good) { ok = false; inp.title = q.conj.forms[i]; }
      });
      q.speak = q.conj.forms.map(function (f, i) { return ["ich", "du", "er", "wir", "ihr", "sie"][i] + " " + f; }).join(", ");
    } else if (q.speakSent) {
      ok = q.spoken.pct >= 80;
      q.solution = q.spoken.pct + "% of the words recognised";
      q.speak = q.speakSent.words.join(" ") + q.speakSent.end;
      if (answered) { // a retry: update the feedback only
        feedbackEl.className = "tr-feedback " + (ok ? "good" : "bad");
        feedbackEl.textContent = (ok ? "✓ Sehr gut! " : "✗ ") + q.solution + (ok ? "" : " — listen and try again.");
        return;
      }
    } else if (q.listen) {
      var heard = q.listen.words.join(" ") + q.listen.end;
      var typed = answerEl.querySelector("input");
      ok = normSentence(typed.value) === normSentence(heard);
      typed.classList.toggle("correct", ok);
      typed.classList.toggle("wrong", !ok);
      q.solution = heard + (q.listen.en ? " — “" + q.listen.en + "”" : "");
      q.speak = heard;
    } else if (q.builder) {
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
    if (P) {
      P.recordAnswer(ok, stats.streak, !!q.fromReview);
      // Word drills also count in the statistics per dictionary word.
      if (WORD_MODES[q.mode] && q.spec && byDe[q.spec.w]) P.recordWord(q.spec.w, ok);
      if (q.speakSent) {
        // Speech recognition is not reliable enough to count as a mistake.
      } else if (!ok) {
        var label = q.grammar ? q.grammar.topic.getAttribute("data-title") : q.builder ? q.builder.en : q.prompt;
        P.addMistake(q.mode, q.spec, label);
      } else if (P.resolveMistake(q.mode, q.spec)) {
        note += " · removed from your mistakes";
      }
    }
    feedbackEl.className = "tr-feedback " + (ok ? "good" : "bad");
    feedbackEl.textContent = q.speakSent
      ? (ok ? "✓ Sehr gut! " : "✗ ") + q.solution + (ok ? "" : " — listen and try again.")
      : (ok ? "✓ Richtig! " : "✗ Correct answer: ") + q.solution + (ok ? note : "") +
        (!ok && P ? " · saved to 🔁 My mistakes" : "");
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
    if (mode === "challenge" && challenge.running) {
      challenge.answered++;
      if (ok) challenge.score++;
      updateChallengeClock();
      setTimeout(function () { if (challenge.running && answered) next(); }, ok ? 450 : 1300);
    }
  }

  // ---------- 60-second challenge ----------
  function updateChallengeClock() {
    var left = Math.max(0, Math.ceil((challenge.end - Date.now()) / 1000));
    scoreEl.textContent = "⏱ " + left + "s · " + challenge.score + " correct";
    if (left <= 0) stopChallenge();
  }
  function startChallenge() {
    challenge = { running: true, score: 0, answered: 0, end: Date.now() + 60000, timer: null, last: null };
    challenge.timer = setInterval(updateChallengeClock, 250);
    next();
    updateChallengeClock();
  }
  function stopChallenge() {
    if (!challenge.running) return;
    clearInterval(challenge.timer);
    challenge.running = false;
    var best = P ? P.getMeta("challengeBest") || 0 : 0;
    var record = challenge.score > best;
    if (record && P) P.setMeta("challengeBest", challenge.score);
    challenge.last = { score: challenge.score, answered: challenge.answered, record: record };
    if (mode === "challenge") next();
  }

  checkBtn.addEventListener("click", function () { if (!answered) grade(); });
  nextBtn.addEventListener("click", next);
  document.getElementById("trReset").addEventListener("click", function () {
    stats = { right: 0, total: 0, streak: 0 };
    scoreEl.textContent = "";
    next();
  });

  next();
  modeFromHash();
})();
