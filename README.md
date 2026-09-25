# Deutsche Grammatik

A free, compact German grammar reference, published with GitHub Pages.

**Live site:** https://semi87.github.io/German/

## Topics

- **Basics** — alphabet & pronunciation, nouns & gender, articles, the four cases, pronouns
- **Verbs** — present tense, modal verbs, separable verbs, imperative
- **Tenses** — Perfekt, Präteritum & Plusquamperfekt, Futur I & II
- **Sentences** — word order, negation, questions, conjunctions, relative clauses
- **Words** — prepositions, adjective endings, comparison, numbers/time/dates
- **Advanced** — Konjunktiv II, passive voice, infinitive with *zu*
- **Wörterbuch** — a searchable German–English dictionary (~590 everyday words) with gender, plurals, verb forms, pronunciation and flashcards

Each topic has tables, examples and an interactive exercise. The site has search (press `/`), dark mode and works on mobile.

## Structure

Plain static HTML — no build step.

```
index.html          all content (one <section class="topic"> per topic)
assets/style.css    styles, light/dark theme
assets/app.js       navigation, search, quizzes
assets/dictionary.js  dictionary word list and UI (add words to the DATA block)
.github/workflows/pages.yml   deploys to GitHub Pages on push
```

To add a topic, add a `<section class="topic" id="…" data-title="…" data-level="…" data-group="…" data-desc="…">` to `index.html`; navigation, the home page card and prev/next links are generated automatically. Exercises use `<input data-answer="answer|alternative">` inside a `<div class="quiz">`.

Preview locally with `python3 -m http.server` and open http://localhost:8000.

## Deployment

The workflow in `.github/workflows/pages.yml` publishes the site. If the first run fails at *Configure Pages*, enable Pages once in **Settings → Pages → Build and deployment → Source: GitHub Actions**, then re-run the workflow.
