/*
 * Shared storage for personal notes and comments, kept in this browser
 * (localStorage). Used by notes.js (topic notes, section comments, the
 * My Notes page) and dictionary.js (comments on words).
 *
 * Keys:  "<topic id>"               notes for a whole topic
 *        "_general"                 the general notebook
 *        "sec:<topic id>:<slug>"    comment on one section (h2) of a topic
 *        "word:<German word>"       comment on a dictionary word
 * Value: { text: "...", updated: <ms> }
 */
window.NotesStore = (function () {
  "use strict";

  var KEY = "deutsche-grammatik-notes-v1";
  var data = {};
  var ok = true;
  var listeners = [];

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      data = parsed && typeof parsed === "object" ? parsed : {};
      ok = true;
    } catch (e) {
      data = {};
      ok = false;
    }
  }
  function write() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      ok = true;
    } catch (e) {
      ok = false;
    }
    return ok;
  }
  function notify(id) {
    listeners.forEach(function (fn) {
      try { fn(id); } catch (e) { /* keep other listeners running */ }
    });
  }

  read();

  // Another tab changed the notes.
  window.addEventListener("storage", function (e) {
    if (e.key !== KEY) return;
    read();
    notify(null);
  });

  return {
    KEY: KEY,
    ok: function () { return ok; },
    get: function (id) { return data[id] && typeof data[id].text === "string" ? data[id].text : ""; },
    updated: function (id) { return data[id] ? data[id].updated || 0 : 0; },
    has: function (id) { return !!(data[id] && data[id].text && data[id].text.trim()); },
    set: function (id, text) {
      if (text && text.trim()) data[id] = { text: text, updated: Date.now() };
      else delete data[id];
      var saved = write();
      notify(id);
      return saved;
    },
    ids: function () {
      return Object.keys(data).filter(function (id) { return data[id] && data[id].text && data[id].text.trim(); });
    },
    all: function () { return JSON.parse(JSON.stringify(data)); },
    // Merge restored notes in; never deletes. Returns how many entries changed.
    merge: function (incoming) {
      var changed = 0;
      Object.keys(incoming).forEach(function (id) {
        var n = incoming[id];
        if (!n || typeof n.text !== "string" || !n.text.trim()) return;
        var mine = data[id] && data[id].text ? data[id].text.trim() : "";
        if (mine === n.text.trim()) return;
        data[id] = {
          text: mine ? mine + "\n\n— restored —\n" + n.text.trim() : n.text,
          updated: Math.max(Number(n.updated) || 0, data[id] ? data[id].updated || 0 : 0) || Date.now()
        };
        changed++;
      });
      write();
      notify(null);
      return changed;
    },
    clear: function () {
      data = {};
      write();
      notify(null);
    },
    onChange: function (fn) { listeners.push(fn); }
  };
})();
