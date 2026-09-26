/*
 * Site tests: node tests/run.js  (or npm test)
 * Starts a small static server, opens the site in Chromium (Playwright)
 * and checks every page, exercise, drill and data file.
 */
"use strict";
var http = require("http");
var fs = require("fs");
var path = require("path");

function loadPlaywright() {
  try { return require("playwright"); } catch (e) {
    var root = require("child_process").execSync("npm root -g").toString().trim();
    return require(path.join(root, "playwright"));
  }
}
var chromium = loadPlaywright().chromium;

var ROOT = path.join(__dirname, "..");
var TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png",
  ".webmanifest": "application/manifest+json", ".json": "application/json" };

function serve() {
  return new Promise(function (resolve) {
    var server = http.createServer(function (req, res) {
      var file = decodeURIComponent(req.url.split("?")[0]);
      if (file === "/") file = "/index.html";
      var full = path.join(ROOT, path.normalize(file));
      if (full.indexOf(ROOT) !== 0 || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
        res.writeHead(404); res.end("not found"); return;
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(full)] || "application/octet-stream" });
      fs.createReadStream(full).pipe(res);
    });
    server.listen(0, "127.0.0.1", function () { resolve(server); });
  });
}

var failures = 0, passes = 0;
function check(name, ok, detail) {
  if (ok) { passes++; console.log("  ✓ " + name); }
  else { failures++; console.log("  ✗ " + name + (detail ? "\n      " + String(detail).split("\n").join("\n      ") : "")); }
}

(async function main() {
  var server = await serve();
  var base = "http://127.0.0.1:" + server.address().port + "/";
  var browser = await chromium.launch();
  var errors = [];
  function watch(page) {
    page.on("pageerror", function (e) { errors.push(e.message); });
    page.on("console", function (m) { if (m.type() === "error") errors.push(m.text()); });
  }

  try {
    var page = await browser.newPage();
    watch(page);
    await page.goto(base);
    await page.waitForTimeout(300);

    console.log("Pages");
    var ids = await page.evaluate(function () {
      return Array.prototype.map.call(document.querySelectorAll(".topic"), function (t) { return t.id; });
    });
    check(ids.length + " topics found", ids.length > 40);

    await page.setViewportSize({ width: 360, height: 800 });
    var wide = [];
    for (var i = 0; i < ids.length; i++) {
      await page.goto(base + "#" + ids[i]);
      var w = await page.evaluate(function () { return document.documentElement.scrollWidth; });
      if (w > 360) wide.push(ids[i] + " (" + w + "px)");
    }
    check("no horizontal scrolling at 360px on any page", !wide.length, wide.join(", "));
    await page.setViewportSize({ width: 1200, height: 900 });

    var broken = await page.evaluate(function () {
      return Array.prototype.filter.call(document.querySelectorAll('a[href^="#"]'), function (a) {
        var id = decodeURIComponent(a.getAttribute("href").slice(1)).split("?")[0];
        return id && !document.getElementById(id);
      }).map(function (a) { return a.getAttribute("href"); });
    });
    check("all internal #links point to an existing id", !broken.length, broken.join(", "));

    console.log("Exercises");
    var quiz = await page.evaluate(function () {
      var bad = [], n = 0;
      document.querySelectorAll(".quiz").forEach(function (q) {
        var inputs = q.querySelectorAll("input[data-answer]");
        if (!inputs.length) return;
        n++;
        inputs.forEach(function (i) { i.value = i.getAttribute("data-answer").split("|")[0]; });
        var btn = Array.prototype.filter.call(q.querySelectorAll("button"), function (b) { return b.textContent === "Check answers"; })[0];
        btn.click();
        var wrong = q.querySelectorAll("input.wrong").length;
        if (wrong) {
          var topic = q.closest(".topic");
          bad.push((topic ? topic.id : "?") + ": " + wrong + " gap(s) reject their own answer");
        }
        q.querySelector(".quiz-actions .secondary").click();
      });
      return { n: n, bad: bad };
    });
    check(quiz.n + " exercise sets accept their answers", quiz.n > 80 && !quiz.bad.length, quiz.bad.join("\n"));
    // Checking the exercises records progress; start the next checks from a clean slate.
    await page.evaluate(function () { localStorage.clear(); });

    console.log("Dictionary");
    var dict = await page.evaluate(function () {
      var W = window.WOERTERBUCH, seen = {}, dup = [];
      W.forEach(function (e) { var k = e.type + ":" + e.de; if (seen[k]) dup.push(k); seen[k] = 1; });
      return {
        n: W.length,
        noLevel: W.filter(function (e) { return !/^(A1|A2|B1|B2)$/.test(e.level); }).map(function (e) { return e.de; }),
        noExample: W.filter(function (e) { return e.theme !== "Phrases" && (!e.exDe || !e.exEn); }).map(function (e) { return e.de; }),
        noEn: W.filter(function (e) { return !e.en; }).map(function (e) { return e.de; }),
        badNoun: W.filter(function (e) { return e.type === "noun" && !/^(m|f|n|p)$/.test(e.gender); }).map(function (e) { return e.de; }),
        dup: dup
      };
    });
    check(dict.n + " dictionary words", dict.n >= 900);
    check("every word has a level (A1–B2)", !dict.noLevel.length, dict.noLevel.join(", "));
    check("every word (except phrases) has an example and its translation", !dict.noExample.length, dict.noExample.join(", "));
    check("every word has an English meaning", !dict.noEn.length, dict.noEn.join(", "));
    check("every noun has der / die / das", !dict.badNoun.length, dict.badNoun.join(", "));
    check("no duplicate words", !dict.dup.length, dict.dup.join(", "));

    console.log("Conjugation");
    var conj = await page.evaluate(function () {
      var W = window.WOERTERBUCH;
      function v(de) { return W.filter(function (e) { return e.type === "verb" && e.de === de; })[0]; }
      var cases = [
        ["arbeiten", 0, "arbeite,arbeitest,arbeitet,arbeiten,arbeitet,arbeiten"],
        ["halten", 0, "halte,hältst,hält,halten,haltet,halten"],
        ["fahren", 0, "fahre,fährst,fährt,fahren,fahrt,fahren"],
        ["lesen", 0, "lese,liest,liest,lesen,lest,lesen"],
        ["öffnen", 0, "öffne,öffnest,öffnet,öffnen,öffnet,öffnen"],
        ["entwickeln", 0, "entwickle,entwickelst,entwickelt,entwickeln,entwickelt,entwickeln"],
        ["anfangen", 0, "fange an,fängst an,fängt an,fangen an,fangt an,fangen an"],
        ["einladen", 0, "lade ein,lädst ein,lädt ein,laden ein,ladet ein,laden ein"],
        ["sein", 0, "bin,bist,ist,sind,seid,sind"],
        ["finden", 1, "fand,fandest,fand,fanden,fandet,fanden"],
        ["machen", 1, "machte,machtest,machte,machten,machtet,machten"],
        ["gehen", 2, "bin gegangen,bist gegangen,ist gegangen,sind gegangen,seid gegangen,sind gegangen"]
      ];
      return cases.map(function (c) {
        var w = v(c[0]);
        var got = w ? (window.__conjugate(w, c[1]) || []).join(",") : "missing verb";
        return { name: c[0] + " (" + ["Präsens", "Präteritum", "Perfekt"][c[1]] + ")", ok: got === c[2], got: got, want: c[2] };
      });
    });
    conj.forEach(function (c) { check(c.name, c.ok, "got " + c.got + "\nwant " + c.want); });

    console.log("Practice trainer");
    await page.goto(base + "#practice");
    var chips = await page.$$eval("#trModes .filter", function (b) { return b.map(function (x) { return x.textContent; }); });
    var empty = [];
    for (var k = 0; k < chips.length; k++) {
      await page.click("#trModes .filter >> nth=" + k);
      var has = await page.evaluate(function () {
        return (document.getElementById("trPrompt").textContent + document.getElementById("trAnswer").textContent).trim().length > 0 ||
          document.querySelectorAll("#trAnswer input, #trAnswer button").length > 0;
      });
      if (!has) empty.push(chips[k]);
    }
    check(chips.length + " trainer modes render a question", chips.length >= 10 && !empty.length, empty.join(", "));

    console.log("Writing");
    var writing = await page.evaluate(function () {
      return window.WRITING_TASKS.map(function (t) {
        var r = window.__writingCheck(t.id, t.model);
        return {
          id: t.id,
          ok: r.points.every(Boolean) && r.checks.every(Boolean) && r.words >= t.words[0] && r.words <= t.words[1],
          detail: "points " + r.points + " · checks " + r.checks + " · " + r.words + " words (" + t.words + ")"
        };
      });
    });
    writing.forEach(function (w) { check("model answer “" + w.id + "” passes its own checks", w.ok, w.detail); });
    var emptyTicks = await page.evaluate(function () {
      return window.WRITING_TASKS.filter(function (t) {
        var r = window.__writingCheck(t.id, "");
        return r.points.some(Boolean) || r.words !== 0;
      }).map(function (t) { return t.id; });
    });
    check("an empty text ticks no content points", !emptyTicks.length, emptyTicks.join(", "));

    console.log("Speaking");
    var sp = await page.evaluate(function () {
      return [
        window.__compareSpoken("Ich gehe heute ins Kino.", "ich gehe heute ins kino").pct,
        window.__compareSpoken("Ich gehe heute ins Kino.", "ich gehe morgen").pct
      ];
    });
    check("word matching: exact = 100%, partial < 80%", sp[0] === 100 && sp[1] < 80, sp.join(", "));
    var sPage = await browser.newPage();
    watch(sPage);
    await sPage.addInitScript(function () {
      window.SpeechRecognition = function () {
        var self = this;
        this.start = function () {
          setTimeout(function () {
            self.onresult({ results: [[{ transcript: document.querySelector(".sp-target").textContent }]] });
            if (self.onend) self.onend();
          }, 30);
        };
        this.stop = function () {};
      };
    });
    await sPage.goto(base + "#practice?mode=speaking");
    await sPage.waitForTimeout(200);
    await sPage.click(".sp-mic");
    await sPage.waitForTimeout(200);
    var fb = await sPage.textContent("#trFeedback");
    check("speaking mode grades a (mocked) recognised sentence", /100%/.test(fb), fb);
    await sPage.close();

    console.log("Console");
    check("no JavaScript errors", !errors.length, errors.join("\n"));
  } catch (e) {
    check("test run finished", false, e.stack || e);
  } finally {
    await browser.close();
    server.close();
  }
  console.log("\n" + passes + " passed, " + failures + " failed");
  process.exit(failures ? 1 : 0);
})();
