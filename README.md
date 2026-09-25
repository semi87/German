# Deutsche Grammatik

A free, compact German grammar reference, published with GitHub Pages.

**Live site:** https://semi87.github.io/German/

## Topics

- **Basics** — alphabet & pronunciation, nouns & gender, articles, the four cases, pronouns
- **Verbs** — present tense, modal verbs, separable verbs, imperative, reflexive verbs, verbs with prepositions, *lassen*, modal verbs in the past
- **Tenses** — Perfekt, Präteritum & Plusquamperfekt, Futur I & II, tense overview
- **Sentences** — word order, negation, questions, conjunctions, relative clauses, two-part conjunctions, the word *es*
- **Words** — prepositions, adjective endings, comparison, numbers/time/dates, indefinite pronouns, modal particles, *hin*/*her*, time expressions, word formation
- **Advanced** — Konjunktiv II, passive voice, infinitive with *zu*, adjectives as nouns, participles as adjectives, indirect speech (Konjunktiv I), modal verbs for assumptions
- **Practice Trainer** — endless random drills: der/die/das, plurals, verb forms, English → German, and a grammar mix drawn from every topic's exercises
- **Wörterbuch** — a searchable German–English dictionary (~590 everyday words) with gender, plurals, verb forms, pronunciation and flashcards

Each topic has tables, a “Common mistakes” block (✗ wrong → ✓ right, with the reason), a “More examples” block and interactive exercises (59 sets in total); the hardest topics also have an “In detail” step-by-step explanation. The site has search (press `/`), dark mode and works on mobile.

## Structure

Plain static HTML — no build step.

```
index.html          all content (one <section class="topic"> per topic)
assets/style.css    styles, light/dark theme
assets/app.js       navigation, search, quizzes
assets/dictionary.js  dictionary word list and UI (add words to the DATA block)
assets/practice.js  practice trainer (uses the dictionary and the topic exercises)
```

To add a topic, add a `<section class="topic" id="…" data-title="…" data-level="…" data-group="…" data-desc="…">` to `index.html`; navigation, the home page card and prev/next links are generated automatically. Exercises use `<input data-answer="answer|alternative">` inside a `<div class="quiz">`.

Preview locally with `python3 -m http.server` and open http://localhost:8000.

## Deployment

GitHub Pages serves the site straight from the `master` branch (**Settings → Pages → Deploy from a branch → master / root**). Every push to `master` is live within a minute or two. `.nojekyll` makes Pages serve the files as they are.
