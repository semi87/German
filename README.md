# Deutsche Grammatik

A free, compact German grammar reference, published with GitHub Pages.

**Live site:** https://semi87.github.io/German/

## Topics

- **Basics** — alphabet & pronunciation, nouns & gender, articles, the four cases, Akkusativ / Dativ / Genitiv in depth, pronouns
- **Verbs** — present tense, modal verbs, separable verbs, imperative, reflexive verbs, verbs with prepositions, *lassen*, modal verbs in the past
- **Tenses** — Perfekt, Präteritum & Plusquamperfekt, Futur I & II, tense overview, irregular verbs by pattern
- **Sentences** — word order, negation, questions, conjunctions, relative clauses, two-part conjunctions, the word *es*, more subordinate clauses (indem, sodass, als ob …), yes/no/doch & short answers
- **Words** — prepositions, adjective endings, comparison, numbers/time/dates, indefinite pronouns, modal particles, *hin*/*her*, time expressions, word formation, countries & languages
- **Advanced** — Konjunktiv II, passive voice, infinitive with *zu*, adjectives as nouns, participles as adjectives, indirect speech (Konjunktiv I), modal verbs for assumptions, passive alternatives, nominal style
- **Level Test** — 32 multiple-choice questions (8 per level) that estimate your level (A1–B2) and recommend topics
- **Reading Texts** — 8 original texts (2 per level, A1–B2): tap any word for its meaning, grammar highlights linked to the topics, English translation, read-aloud and comprehension questions
- **My Progress** — a daily plan (topic, flashcards, mistakes, practice, reading — ticked off automatically), mark topics as learned (✓ in the menu), best score per exercise, progress per level (A1–B2), study streak, and a “continue with” suggestion; also summarised on the home page
- **Practice Trainer** — 🔁 *My mistakes* review (wrong answers from the trainer and from every topic exercise come back until answered correctly), plus endless random drills: der/die/das, plurals, verb forms, English → German, articles & cases, prepositions, a sentence builder (click the words into order) and a grammar mix drawn from every topic's exercises
- **My Notes** — personal notes on every topic (select text → “+ Add to notes”), 💬 comments on any section heading or dictionary word, a general notebook, search, export as .txt, backup/restore as .json; saved in the browser (localStorage)
- **Wörterbuch** — a searchable German–English dictionary (~590 everyday words) with gender, plurals, verb forms, pronunciation and spaced-repetition flashcards (Leitner boxes: 1, 3, 7, 14, 30, 60 days; 15 new words a day)

Each topic has tables, a “Common mistakes” block (✗ wrong → ✓ right, with the reason), a “More examples” block and interactive exercises (81 sets in total, including the reading texts); the hardest topics also have an “In detail” step-by-step explanation. The site has search (press `/`), dark mode and works on mobile.

## Structure

Plain static HTML — no build step.

```
index.html          all content (one <section class="topic"> per topic)
assets/style.css    styles, light/dark theme
assets/app.js       navigation, search, quizzes
assets/dictionary.js  dictionary word list and UI (add words to the DATA block)
assets/practice.js  practice trainer (uses the dictionary and the topic exercises)
assets/store.js     shared storage for notes and comments (localStorage)
assets/progress.js  learning progress store: learned topics, scores, mistakes, flashcard schedule
assets/study.js     progress UI: learned buttons, daily plan, home summary, My Progress page
assets/reading.js   reading texts, word pop-ups and their questions
assets/leveltest.js the level test
assets/notes.js     topic notes, section comments and the My Notes page
```

To add a topic, add a `<section class="topic" id="…" data-title="…" data-level="…" data-group="…" data-desc="…">` to `index.html`; navigation, the home page card and prev/next links are generated automatically. Exercises use `<input data-answer="answer|alternative">` inside a `<div class="quiz">`.

Preview locally with `python3 -m http.server` and open http://localhost:8000.

## Deployment

GitHub Pages serves the site straight from the `master` branch (**Settings → Pages → Deploy from a branch → master / root**). Every push to `master` is live within a minute or two. `.nojekyll` makes Pages serve the files as they are.
