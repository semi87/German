(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var topics = Array.prototype.slice.call(document.querySelectorAll(".topic"));
  var nav = document.getElementById("nav");
  var search = document.getElementById("search");
  var links = {};

  // ---------- Theme ----------
  var themeBtn = document.getElementById("themeBtn");
  function storedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  applyTheme(storedTheme());
  themeBtn.addEventListener("click", function () {
    var dark = document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    var next = dark ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });

  // ---------- Navigation ----------
  var currentGroup = null;
  topics.forEach(function (t) {
    var group = t.getAttribute("data-group");
    if (group && group !== currentGroup) {
      currentGroup = group;
      var g = document.createElement("div");
      g.className = "nav-group";
      g.textContent = group;
      g.setAttribute("data-group-label", group);
      nav.appendChild(g);
    }
    var a = document.createElement("a");
    a.href = "#" + t.id;
    a.setAttribute("data-group", group || "");
    var title = document.createElement("span");
    title.textContent = t.getAttribute("data-title");
    a.appendChild(title);
    var level = t.getAttribute("data-level");
    if (level) {
      var l = document.createElement("span");
      l.className = "lvl";
      l.textContent = level;
      a.appendChild(l);
    }
    nav.appendChild(a);
    links[t.id] = a;
  });

  // ---------- Home topic cards ----------
  var cards = document.getElementById("topicCards");
  if (cards) {
    topics.forEach(function (t) {
      var desc = t.getAttribute("data-desc");
      if (!desc) return;
      var a = document.createElement("a");
      a.className = "card";
      a.href = "#" + t.id;
      var h = document.createElement("h4");
      var title = document.createElement("span");
      title.textContent = t.getAttribute("data-title");
      h.appendChild(title);
      if (t.getAttribute("data-level")) {
        var l = document.createElement("span");
        l.className = "lvl";
        l.textContent = t.getAttribute("data-level");
        h.appendChild(l);
      }
      var p = document.createElement("p");
      p.textContent = desc;
      a.appendChild(h);
      a.appendChild(p);
      cards.appendChild(a);
    });
  }

  // ---------- Pager ----------
  topics.forEach(function (t, i) {
    var pager = document.createElement("nav");
    pager.className = "pager";
    if (i > 0) pager.appendChild(pagerLink(topics[i - 1], "← Previous", "prev"));
    if (i < topics.length - 1) pager.appendChild(pagerLink(topics[i + 1], "Next →", "next"));
    t.appendChild(pager);
  });

  function pagerLink(t, label, cls) {
    var a = document.createElement("a");
    a.href = "#" + t.id;
    a.className = cls;
    var s = document.createElement("small");
    s.textContent = label;
    a.appendChild(s);
    a.appendChild(document.createTextNode(t.getAttribute("data-title")));
    return a;
  }

  // ---------- Routing ----------
  function show() {
    var id = decodeURIComponent(location.hash.slice(1)) || topics[0].id;
    var target = document.getElementById(id);
    var topic = target && target.closest(".topic");
    if (!topic) topic = topics[0];
    topics.forEach(function (t) { t.classList.toggle("active", t === topic); });
    Object.keys(links).forEach(function (k) { links[k].classList.toggle("active", k === topic.id); });
    document.title = topic.getAttribute("data-title") + " · Deutsche Grammatik";
    document.body.classList.remove("nav-open");
    if (target && target !== topic) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("hashchange", show);
  // The browser's own fragment scroll can fire after this script runs; redo ours once loaded.
  window.addEventListener("load", function () { setTimeout(show, 0); });
  show();

  // ---------- Mobile menu ----------
  document.getElementById("menuBtn").addEventListener("click", function () {
    document.body.classList.toggle("nav-open");
  });

  // ---------- Search ----------
  function norm(s) {
    return s.toLowerCase().replace(/ß/g, "ss");
  }
  var index = topics.map(function (t) {
    return { id: t.id, text: norm(t.getAttribute("data-title") + " " + t.textContent) };
  });
  search.addEventListener("input", function () {
    var q = norm(search.value.trim());
    var visibleGroups = {};
    index.forEach(function (item) {
      var match = !q || item.text.indexOf(q) !== -1;
      links[item.id].style.display = match ? "" : "none";
      if (match) visibleGroups[links[item.id].getAttribute("data-group")] = true;
    });
    nav.querySelectorAll(".nav-group").forEach(function (g) {
      g.style.display = visibleGroups[g.getAttribute("data-group-label")] ? "" : "none";
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
      e.preventDefault();
      search.focus();
    }
  });

  // ---------- Quizzes ----------
  function clean(s) {
    return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?]$/, "");
  }
  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var inputs = quiz.querySelectorAll("input[data-answer]");
    inputs.forEach(function (input) {
      input.setAttribute("autocomplete", "off");
      input.setAttribute("autocapitalize", "off");
      input.setAttribute("spellcheck", "false");
      var sol = document.createElement("span");
      sol.className = "sol";
      sol.textContent = "→ " + input.getAttribute("data-answer").split("|")[0];
      input.insertAdjacentElement("afterend", sol);
      input.addEventListener("keydown", function (e) { if (e.key === "Enter") check(); });
    });

    var actions = document.createElement("div");
    actions.className = "quiz-actions";
    var checkBtn = document.createElement("button");
    checkBtn.className = "btn";
    checkBtn.type = "button";
    checkBtn.textContent = "Check answers";
    var resetBtn = document.createElement("button");
    resetBtn.className = "btn secondary";
    resetBtn.type = "button";
    resetBtn.textContent = "Reset";
    var score = document.createElement("span");
    score.className = "score";
    actions.appendChild(checkBtn);
    actions.appendChild(resetBtn);
    actions.appendChild(score);
    quiz.appendChild(actions);

    function check() {
      var right = 0;
      inputs.forEach(function (input) {
        var answers = input.getAttribute("data-answer").split("|").map(clean);
        var ok = answers.indexOf(clean(input.value)) !== -1;
        input.classList.toggle("correct", ok);
        input.classList.toggle("wrong", !ok);
        input.nextElementSibling.classList.toggle("show", !ok);
        if (ok) right++;
      });
      score.textContent = right + " / " + inputs.length + (right === inputs.length ? " — Sehr gut! 🎉" : "");
    }
    checkBtn.addEventListener("click", check);
    resetBtn.addEventListener("click", function () {
      inputs.forEach(function (input) {
        input.value = "";
        input.classList.remove("correct", "wrong");
        input.nextElementSibling.classList.remove("show");
      });
      score.textContent = "";
    });
  });
})();
