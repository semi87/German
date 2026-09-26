/*
 * Reading texts (Lesetexte) for A1–B2.
 *
 * Text markup: paragraphs are separated by blank lines; [[words|topic-id]]
 * marks a grammar point and links it to that topic. The glossary gives
 * translations for inflected forms; other words are looked up in the
 * Wörterbuch (window.WOERTERBUCH).
 *
 * Runs before app.js so the exercises are wired like every other quiz.
 */
(function () {
  "use strict";

  var TEXTS = [
    {
      id: "mein-tag", level: "A1", title: "Mein Tag",
      text: `Ich heiße Lena und ich [[wohne|present]] in Hamburg. Ich bin 28 Jahre alt und arbeite in einem Büro.

Jeden Morgen [[stehe|separable]] ich um sieben Uhr [[auf|separable]]. Dann trinke ich [[einen Kaffee|articles]] und esse ein Brötchen mit Käse. Um acht Uhr fahre ich [[mit dem Fahrrad|prepositions]] zur Arbeit.

Mittags esse ich mit [[meiner Kollegin|dativ]] Sarah. Wir gehen oft in ein kleines Restaurant. Am Abend koche ich oder ich treffe Freunde. Ich habe [[keine Katze|negation]], aber ich [[möchte|modals]] gern eine haben. Um elf Uhr gehe ich ins Bett.`,
      en: `My name is Lena and I live in Hamburg. I'm 28 years old and work in an office.

Every morning I get up at seven o'clock. Then I drink a coffee and eat a bread roll with cheese. At eight o'clock I cycle to work.

At lunchtime I eat with my colleague Sarah. We often go to a small restaurant. In the evening I cook or I meet friends. I don't have a cat, but I would like to have one. At eleven o'clock I go to bed.`,
      glossary: { heiße: "am called (heißen)", wohne: "live (wohnen)", arbeite: "work (arbeiten)", stehe: "stehe … auf = get up (aufstehen)", auf: "(part of aufstehen)", trinke: "drink (trinken)", esse: "eat (essen)", fahre: "go, ride (fahren)", zur: "to the (zu + der)", mittags: "at lunchtime", kollegin: "colleague (female)", gehen: "go", kleines: "small", koche: "cook (kochen)", treffe: "meet (treffen)", möchte: "would like", gern: "gladly", ins: "into the (in + das)", jeden: "every" },
      questions: [["Lena wohnt in Berlin.", "falsch"], ["Sie steht um sieben Uhr auf.", "richtig"], ["Sie fährt mit dem Bus zur Arbeit.", "falsch"], ["Lena hat eine Katze.", "falsch"]],
      open: [["Mittags isst Lena mit {Sarah}."]]
    },
    {
      id: "im-cafe", level: "A1", title: "Im Café",
      text: `Kellner: Guten Tag! Was [[möchten Sie|modals]]?

Frau Weber: Ich [[hätte gern|konjunktiv2]] einen Tee, bitte.

Kellner: Mit Milch oder Zucker?

Frau Weber: [[Ohne Zucker|prepositions]], aber mit Milch. Und [[haben Sie|questions]] Kuchen?

Kellner: Ja, wir haben Apfelkuchen und Schokoladenkuchen.

Frau Weber: Ich nehme [[den Apfelkuchen|articles]]. Was kostet das?

Kellner: Der Tee kostet zwei Euro fünfzig, der Kuchen drei Euro. Zusammen fünf Euro fünfzig.

Frau Weber: Hier, bitte. Stimmt so!

Kellner: Vielen Dank! Guten Appetit!`,
      en: `Waiter: Hello! What would you like?

Mrs Weber: I'd like a tea, please.

Waiter: With milk or sugar?

Mrs Weber: Without sugar, but with milk. And do you have cake?

Waiter: Yes, we have apple cake and chocolate cake.

Mrs Weber: I'll take the apple cake. How much is that?

Waiter: The tea is two euros fifty, the cake three euros. Five euros fifty altogether.

Mrs Weber: Here you are. Keep the change!

Waiter: Thank you very much! Enjoy your meal!`,
      glossary: { kellner: "waiter", möchten: "would like", hätte: "hätte gern = would like", ohne: "without", apfelkuchen: "apple cake", schokoladenkuchen: "chocolate cake", nehme: "take (nehmen)", kostet: "costs (kosten)", zusammen: "together, altogether", stimmt: "Stimmt so! = keep the change", fünfzig: "fifty", zwei: "two", drei: "three", fünf: "five" },
      questions: [["Frau Weber trinkt einen Kaffee.", "falsch"], ["Sie möchte Zucker im Tee.", "falsch"], ["Sie isst Apfelkuchen.", "richtig"]],
      open: [["Der Kuchen kostet {drei|3} Euro."]]
    },
    {
      id: "wochenende", level: "A2", title: "Ein Wochenende in München",
      text: `Letztes Wochenende [[bin ich|wordorder]] mit meinem Freund Tom nach München [[gefahren|perfekt]]. Wir haben ein kleines Hotel in der Altstadt [[gebucht|perfekt]].

Am Samstag hat es leider den ganzen Tag geregnet. [[Deshalb sind wir|conjunctions]] ins Deutsche Museum gegangen. Das Museum war riesig und sehr interessant. Tom hat [[sich|reflexive]] besonders für die Flugzeuge interessiert.

Am Sonntag hat die Sonne [[geschienen|strongverbs]]. Wir sind durch den Englischen Garten spaziert und haben in einem Biergarten zu Mittag gegessen. Am Abend sind wir müde, aber glücklich [[nach Hause|prepositions]] gefahren. Nächstes Jahr [[wollen|modals]] wir wieder hinfahren.`,
      en: `Last weekend I went to Munich with my friend Tom. We booked a small hotel in the old town.

On Saturday it unfortunately rained all day. So we went to the Deutsches Museum. The museum was huge and very interesting. Tom was especially interested in the aeroplanes.

On Sunday the sun shone. We walked through the English Garden and had lunch in a beer garden. In the evening we drove home, tired but happy. Next year we want to go there again.`,
      glossary: { letztes: "last", gefahren: "gone, driven (fahren)", gebucht: "booked (buchen)", altstadt: "old town", geregnet: "rained (regnen)", deshalb: "therefore, so", gegangen: "gone (gehen)", riesig: "huge", besonders: "especially", interessiert: "sich interessieren für = be interested in", geschienen: "shone (scheinen)", spaziert: "walked (spazieren)", biergarten: "beer garden", gegessen: "eaten (essen)", mittag: "zu Mittag essen = have lunch", hinfahren: "go there", nächstes: "next", englischen: "English" },
      questions: [["Am Samstag war das Wetter schön.", "falsch"], ["Tom und die Erzählerin waren im Deutschen Museum.", "richtig"], ["Tom interessiert sich für Autos.", "falsch"]],
      open: [["Am Sonntag haben sie in einem {Biergarten} gegessen."], ["Nächstes Jahr wollen sie wieder nach {München} fahren."]]
    },
    {
      id: "email-vermieterin", level: "A2", title: "Eine E-Mail an die Vermieterin",
      text: `Liebe Frau Schneider,

ich schreibe Ihnen, [[weil die Heizung in meiner Wohnung nicht funktioniert|conjunctions]]. Seit Montag ist es in allen Zimmern kalt, und ich [[muss|modals]] abends mit einer Jacke auf dem Sofa sitzen.

[[Könnten Sie|konjunktiv2]] bitte einen Techniker schicken? Ich bin diese Woche jeden Tag ab 16 Uhr zu Hause. Am Donnerstag [[kann|modals]] ich auch schon um 14 Uhr da sein.

Außerdem tropft der Wasserhahn in der Küche. [[Es wäre schön|konjunktiv2]], wenn der Techniker [[ihn|pronouns]] auch reparieren könnte.

Vielen Dank im Voraus!

[[Mit freundlichen Grüßen|adjectives]]
Jonas Weber`,
      en: `Dear Mrs Schneider,

I'm writing to you because the heating in my flat isn't working. Since Monday it has been cold in all the rooms, and in the evenings I have to sit on the sofa wearing a jacket.

Could you please send a technician? This week I'm at home every day from 4 p.m. On Thursday I can be there as early as 2 p.m.

Also, the tap in the kitchen is dripping. It would be nice if the technician could repair it as well.

Thank you in advance!

Kind regards
Jonas Weber`,
      glossary: { liebe: "dear", vermieterin: "landlady", schreibe: "write (schreiben)", heizung: "heating", funktioniert: "works (funktionieren)", seit: "since", allen: "all", muss: "must, have to", abends: "in the evening", könnten: "could (polite)", techniker: "technician", schicken: "send", ab: "from", außerdem: "besides, also", tropft: "drips (tropfen)", wasserhahn: "tap, faucet", wäre: "would be", reparieren: "repair", könnte: "could", voraus: "im Voraus = in advance", freundlichen: "kind, friendly", grüßen: "regards, greetings" },
      questions: [["Die Heizung funktioniert nicht.", "richtig"], ["Das Problem gibt es seit Freitag.", "falsch"], ["Am Donnerstag ist Jonas schon ab 14 Uhr zu Hause.", "richtig"]],
      open: [["Der {Wasserhahn} in der Küche tropft."]]
    },
    {
      id: "erster-job", level: "B1", title: "Mein erster Job in Deutschland",
      text: `[[Als|conjunctions]] ich vor fünf Jahren nach Deutschland [[kam|praeteritum]], [[sprach|praeteritum]] ich kaum Deutsch. Ich hatte einen Studienplatz in Leipzig, aber kein Geld für die Miete. Deshalb suchte ich einen Job, [[den|relative]] ich neben dem Studium machen konnte.

Schließlich fand ich eine Stelle in einer Bäckerei, [[die|relative]] nur zehn Minuten von meiner Wohnung entfernt war. Die Arbeit begann jeden Morgen um fünf Uhr. Für mich war das eine echte Herausforderung, denn ich bin eigentlich kein Frühaufsteher!

Mein Chef, Herr Müller, war streng, aber fair. Wenn ich etwas nicht verstand, erklärte er es mir geduldig noch einmal. Die Kunden, [[mit denen|relative]] ich jeden Tag sprach, waren meistens freundlich. Durch die vielen Gespräche lernte ich schneller Deutsch als im Sprachkurs.

Heute arbeite ich als Ingenieur, aber ich denke oft an die Zeit in der Bäckerei zurück. Ohne diesen Job [[hätte ich nie so gut Deutsch gelernt|konjunktiv2]].`,
      en: `When I came to Germany five years ago, I hardly spoke any German. I had a place at university in Leipzig, but no money for the rent. So I looked for a job that I could do alongside my studies.

Finally I found a job in a bakery that was only ten minutes from my flat. Work started every morning at five o'clock. For me that was a real challenge, because I'm not really an early riser!

My boss, Mr Müller, was strict but fair. When I didn't understand something, he patiently explained it to me again. The customers I spoke to every day were mostly friendly. Through all those conversations I learned German faster than on the language course.

Today I work as an engineer, but I often think back to my time at the bakery. Without this job I would never have learned German so well.`,
      glossary: { als: "when (single past event)", kam: "came (kommen)", sprach: "spoke (sprechen)", kaum: "hardly", hatte: "had (haben)", studienplatz: "university place", miete: "rent", suchte: "looked for (suchen)", neben: "alongside", studium: "studies", konnte: "could (können)", schließlich: "finally", fand: "found (finden)", stelle: "job, position", bäckerei: "bakery", entfernt: "away", begann: "began (beginnen)", herausforderung: "challenge", eigentlich: "actually, really", frühaufsteher: "early riser", streng: "strict", verstand: "understood (verstehen)", erklärte: "explained (erklären)", geduldig: "patiently", kunden: "customers", denen: "whom (dative plural)", gespräche: "conversations", lernte: "learned (lernen)", sprachkurs: "language course", ingenieur: "engineer", denke: "denke … zurück = think back", hätte: "hätte … gelernt = would have learned", gelernt: "learned (lernen)" },
      questions: [["Am Anfang sprach der Erzähler gut Deutsch.", "falsch"], ["Die Bäckerei war in der Nähe seiner Wohnung.", "richtig"], ["Die Arbeit begann um sechs Uhr.", "falsch"], ["In der Bäckerei lernte er schneller Deutsch als im Sprachkurs.", "richtig"]],
      open: [["Heute arbeitet er als {Ingenieur}."]]
    },
    {
      id: "soziale-medien", level: "B1", title: "Soziale Medien – Fluch oder Segen?",
      text: `Fast alle Jugendlichen in Deutschland nutzen soziale Medien. [[Einerseits|twopart]] kann man so leicht mit Freunden in Kontakt bleiben, Neuigkeiten erfahren und kreative Ideen teilen. [[Andererseits|twopart]] verbringen viele junge Leute mehrere Stunden am Tag vor dem Bildschirm.

Experten warnen, [[dass|conjunctions]] zu viel Zeit online schlecht für die Konzentration sein kann. [[Je mehr|twopart]] Zeit man in sozialen Netzwerken verbringt, [[desto|twopart]] weniger schläft man oft. Außerdem vergleichen sich viele Nutzer ständig mit anderen, [[was|relative]] unglücklich machen kann.

Die Plattformen sind [[zwar|twopart]] praktisch, [[aber|twopart]] man sollte bewusst mit ihnen umgehen. Manche Schulen bieten deshalb Kurse an, [[in denen|relative]] Schüler lernen, Informationen kritisch [[zu prüfen|infinitive]].

Meiner Meinung nach sollten wir soziale Medien [[weder|twopart]] verbieten [[noch|twopart]] ohne Regeln nutzen. Wichtig ist, dass jeder selbst Grenzen setzt.`,
      en: `Almost all young people in Germany use social media. On the one hand, it makes it easy to stay in touch with friends, find out the latest news and share creative ideas. On the other hand, many young people spend several hours a day in front of a screen.

Experts warn that too much time online can be bad for concentration. The more time you spend on social networks, the less you often sleep. In addition, many users constantly compare themselves with others, which can make them unhappy.

The platforms are practical, admittedly, but you should use them consciously. That's why some schools offer courses in which pupils learn to check information critically.

In my opinion, we should neither ban social media nor use it without rules. What matters is that everyone sets their own limits.`,
      glossary: { jugendlichen: "young people", nutzen: "use", einerseits: "on the one hand", kontakt: "contact", neuigkeiten: "news", erfahren: "find out", teilen: "share", andererseits: "on the other hand", verbringen: "spend (time)", verbringt: "spends (verbringen)", bildschirm: "screen", experten: "experts", warnen: "warn", konzentration: "concentration", netzwerken: "networks", weniger: "less", vergleichen: "compare", nutzer: "users", ständig: "constantly", zwar: "zwar … aber = admittedly … but", praktisch: "practical", sollte: "should", bewusst: "consciously", umgehen: "umgehen mit = deal with", bieten: "bieten … an = offer", prüfen: "check", meinung: "opinion", verbieten: "ban", regeln: "rules", grenzen: "limits", setzt: "sets (setzen)", fluch: "curse", segen: "blessing", weder: "weder … noch = neither … nor", schläft: "sleeps (schlafen)" },
      questions: [["Nur wenige Jugendliche nutzen soziale Medien.", "falsch"], ["Zu viel Zeit online kann schlecht für die Konzentration sein.", "richtig"], ["Der Autor möchte soziale Medien verbieten.", "falsch"]],
      open: [["Manche Schulen bieten {Kurse} an."]]
    },
    {
      id: "neue-bruecke", level: "B2", title: "Nachricht: Neue Rheinbrücke eröffnet",
      text: `[[Nach fast dreijähriger Bauzeit|nominal]] ist die neue Rheinbrücke in Mannheim am Freitag [[eröffnet worden|passive]]. Die Oberbürgermeisterin sagte bei der Eröffnung, die Brücke [[sei|konjunktiv1]] ein wichtiges Zeichen für die ganze Region. Sie [[werde|konjunktiv1]] den Verkehr in der Innenstadt deutlich entlasten.

Die [[im Jahr 2023 begonnenen|participles]] Bauarbeiten hatten immer wieder für lange Staus gesorgt. [[Wegen unerwarteter Probleme|nominal]] mit dem Untergrund mussten die Arbeiten mehrmals [[unterbrochen werden|passive]]. Die Kosten stiegen dadurch von 80 auf 95 Millionen Euro.

Kritiker bemängeln, dass die Radwege zu schmal [[seien|konjunktiv1]]. Die Stadt [[lässt|lassen]] derzeit [[prüfen|lassen]], ob sie nachträglich verbreitert werden können. Ab Montag [[ist|passivealt]] die Brücke für Autos, Busse und Fahrräder ohne Einschränkungen [[zu nutzen|passivealt]].`,
      en: `After almost three years of construction, the new Rhine bridge in Mannheim was opened on Friday. At the opening, the mayor said the bridge was an important sign for the whole region. She said it would significantly relieve traffic in the city centre.

The construction work, which began in 2023, had repeatedly caused long traffic jams. Because of unexpected problems with the ground, the work had to be interrupted several times. As a result, the costs rose from 80 to 95 million euros.

Critics complain that the cycle paths are too narrow. The city is currently having it checked whether they can be widened afterwards. From Monday the bridge can be used without restrictions by cars, buses and bicycles.`,
      glossary: { dreijähriger: "three-year", bauzeit: "construction period", eröffnet: "opened (eröffnen)", worden: "(passive Perfekt)", oberbürgermeisterin: "mayor (female)", eröffnung: "opening", sei: "is (Konjunktiv I of sein)", zeichen: "sign", region: "region", werde: "will (Konjunktiv I of werden)", verkehr: "traffic", innenstadt: "city centre", deutlich: "significantly", entlasten: "relieve", begonnenen: "begun (beginnen)", bauarbeiten: "construction work", staus: "traffic jams", gesorgt: "sorgen für = cause", unerwarteter: "unexpected", untergrund: "ground, subsoil", mussten: "had to (müssen)", mehrmals: "several times", unterbrochen: "interrupted (unterbrechen)", kosten: "costs", stiegen: "rose (steigen)", dadurch: "as a result", millionen: "millions", kritiker: "critics", bemängeln: "criticise", radwege: "cycle paths", schmal: "narrow", seien: "are (Konjunktiv I)", lässt: "lässt prüfen = has it checked", derzeit: "currently", nachträglich: "afterwards", verbreitert: "widened (verbreitern)", einschränkungen: "restrictions", nutzen: "use" },
      questions: [["Die Brücke wurde nach fast drei Jahren Bauzeit eröffnet.", "richtig"], ["Die Kosten sind am Ende gesunken.", "falsch"], ["Kritiker finden die Radwege zu breit.", "falsch"]],
      open: [["Die Kosten betragen jetzt {95} Millionen Euro."]]
    },
    {
      id: "leserbrief-homeoffice", level: "B2", title: "Leserbrief: Homeoffice",
      text: `Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihren Artikel über das Homeoffice gelesen. Sie schreiben, die meisten Beschäftigten [[wollten|konjunktiv1]] nie wieder ins Büro zurück. Diese Behauptung [[dürfte|subjmodal]] jedoch nicht für alle gelten.

Ich arbeite seit drei Jahren von zu Hause aus. [[Zwar|twopart]] spare ich täglich eine Stunde Fahrzeit, [[aber|twopart]] mir fehlt der persönliche Austausch mit meinen Kolleginnen und Kollegen. [[Wäre|konjunktiv2]] ich jünger, [[würde|konjunktiv2]] ich vermutlich anders darüber denken.

[[Indem|subclauses]] Unternehmen flexible Modelle anbieten, [[ließe sich|passivealt]] für beide Seiten eine gute Lösung finden: zwei oder drei Tage im Büro, den Rest zu Hause. [[Bei der Planung|nominal]] sollten die Wünsche der Mitarbeitenden jedoch stärker [[berücksichtigt werden|passive]].

Mit freundlichen Grüßen
Dr. Petra Hoffmann`,
      en: `Dear Sir or Madam,

I read your article about working from home with great interest. You write that most employees would never want to go back to the office. However, this claim is unlikely to apply to everyone.

I have been working from home for three years. Admittedly, I save an hour of travel time every day, but I miss the personal exchange with my colleagues. If I were younger, I would probably think differently about it.

If companies offered flexible models, a good solution could be found for both sides: two or three days in the office, the rest at home. When planning, however, the wishes of the employees should be taken into account more.

Kind regards
Dr Petra Hoffmann`,
      glossary: { geehrte: "Sehr geehrte … = Dear … (formal)", interesse: "interest", artikel: "article", homeoffice: "working from home", gelesen: "read (lesen)", beschäftigten: "employees", wollten: "would want (reported speech)", behauptung: "claim", dürfte: "is likely to", jedoch: "however", gelten: "apply", spare: "save (sparen)", täglich: "daily", fahrzeit: "travel time", fehlt: "mir fehlt = I miss", persönliche: "personal", austausch: "exchange", wäre: "wäre ich = if I were", jünger: "younger", würde: "would", vermutlich: "probably", indem: "by (… offering)", unternehmen: "companies", anbieten: "offer", ließe: "ließe sich finden = could be found", seiten: "sides", lösung: "solution", rest: "rest", planung: "planning", wünsche: "wishes", mitarbeitenden: "employees", stärker: "more strongly", berücksichtigt: "taken into account (berücksichtigen)" },
      questions: [["Frau Hoffmann arbeitet seit drei Jahren im Homeoffice.", "richtig"], ["Sie vermisst den Kontakt zu ihren Kollegen.", "richtig"], ["Sie ist gegen jede Form von Homeoffice.", "falsch"]],
      open: [["Durch das Homeoffice spart sie täglich eine {Stunde} Fahrzeit."]]
    }
  ];

  var section = document.getElementById("reading");
  if (!section) return;
  var listEl = document.getElementById("readingList");
  var textsEl = document.getElementById("readingTexts");
  var filterEl = document.getElementById("readingLevels");
  var P = window.Progress || null;
  var canSpeak = "speechSynthesis" in window;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function topicTitle(id) {
    var t = document.getElementById(id);
    return t ? t.getAttribute("data-title") : id;
  }

  // ---------- dictionary lookup ----------
  var dict = {};
  (window.WOERTERBUCH || []).forEach(function (e) {
    var add = function (form, entry) {
      form = form.toLowerCase();
      if (form && !dict[form]) dict[form] = entry;
    };
    add(e.word, e);
    if (e.forms && e.type === "noun" && /^die /.test(e.forms)) add(e.forms.slice(4), e);
    if (e.type === "verb" && e.forms) {
      e.forms.split(" · ").forEach(function (f) {
        f.split(" ").forEach(function (part) { if (part.length > 2 && ["hat", "ist", "sich"].indexOf(part) === -1) add(part, e); });
      });
    }
  });
  // Small words and names that aren't in the Wörterbuch.
  var COMMON = {
    ich: "I", du: "you", er: "he, it", sie: "she, it; they; Sie = you (formal)", es: "it", wir: "we", ihr: "you (plural); her, to her",
    man: "one, you, people", mich: "me", mir: "(to) me", dich: "you", dir: "(to) you", ihn: "him, it", ihm: "(to) him",
    ihnen: "(to) them; Ihnen = (to) you (formal)", ihren: "their; Ihren = your (formal)", sich: "himself, herself, themselves (reflexive)", uns: "us",
    der: "the (masc.); who, which", die: "the (fem./plural); who, which", das: "the (neuter); that, which", dem: "the (dative)",
    den: "the (masc. accusative / dative plural)", des: "of the", denen: "(to) whom, which (dative plural)",
    ein: "a, an", eine: "a, an", einen: "a, an (accusative)", einem: "a, an (dative)", einer: "a, an (dative / genitive)", eines: "of a",
    kein: "no, not a", keine: "no, not a", mein: "my", meine: "my", meinen: "my", meinem: "my", meiner: "my", seine: "his", ihre: "her, their",
    diese: "this, these", diesen: "this", dieser: "this", jeden: "every", jeder: "everyone, every",
    bin: "am (sein)", bist: "are (sein)", ist: "is (sein)", sind: "are (sein)", war: "was (sein)", waren: "were (sein)",
    habe: "have (haben)", hat: "has (haben)", hatten: "had (haben)", wird: "will; becomes (werden)",
    und: "and", oder: "or", aber: "but", denn: "because", dass: "that", wenn: "if, when", weil: "because", ob: "whether",
    in: "in, into", im: "in the (in + dem)", ins: "into the (in + das)", am: "at the, on the (an + dem)", an: "at, on",
    auf: "on, onto", bei: "at, with (at someone's place)", mit: "with", nach: "to, after", von: "from, of", vor: "before, ago, in front of",
    zu: "to; too", zur: "to the (zu + der)", zum: "to the (zu + dem)", über: "about, over", für: "for", ohne: "without",
    um: "at (time); around", seit: "since, for", durch: "through, by", wegen: "because of", ab: "from (time)",
    dann: "then", so: "so, like this", da: "there; here", zurück: "back", noch: "still, yet; another", nicht: "not", auch: "also, too",
    sehr: "very", was: "what; which", wie: "how, like", je: "je … desto = the … the", desto: "je … desto = the … the",
    zwar: "zwar … aber = admittedly … but", deshalb: "therefore, so", außerdem: "besides, also", darüber: "about it",
    einmal: "once; noch einmal = once more", selbst: "oneself; even", viele: "many", vielen: "many; vielen Dank = thank you",
    mehrere: "several", manche: "some", meisten: "most", meistens: "mostly", anderen: "others", anders: "differently", beide: "both",
    bitte: "please", dank: "thanks", appetit: "appetite; Guten Appetit! = enjoy your meal", damen: "ladies; Damen und Herren = ladies and gentlemen",
    hause: "zu Hause = at home; nach Hause = home", ganze: "whole", ganzen: "whole", lange: "long", leute: "people",
    deutsch: "German (language)", deutsche: "German", deutschland: "Germany", euro: "euro(s)", fair: "fair", job: "job",
    online: "online", medien: "media", soziale: "social", sozialen: "social", ideen: "ideas", informationen: "information",
    kreative: "creative", kritisch: "critically", plattformen: "platforms", modelle: "models", flexible: "flexible",
    probleme: "problems", echte: "real", großem: "great", unglücklich: "unhappy", wichtiges: "important", sollten: "should",
    eins: "one", zwei: "two", drei: "three", vier: "four", fünf: "five", sechs: "six", sieben: "seven", acht: "eight",
    neun: "nine", zehn: "ten", elf: "eleven", zwölf: "twelve", dr: "Dr (title)",
    hamburg: "Hamburg (city)", leipzig: "Leipzig (city)", münchen: "Munich", mannheim: "Mannheim (city)",
    lena: "(name)", sarah: "(name)", tom: "(name)", jonas: "(name)", weber: "(surname)", schneider: "(surname)",
    müller: "(surname)", petra: "(name)", hoffmann: "(surname)",
    grüßen: "greetings; Mit freundlichen Grüßen = Kind regards", kolleginnen: "colleagues (female)",
    prüfen: "check", rheinbrücke: "Rhine bridge"
  };

  function fromDict(e) {
    return { de: e.de, en: e.en + (e.forms ? " · " + e.forms : ""), dictWord: e.de };
  }
  function lookup(word, text) {
    var w = word.toLowerCase();
    if (text.glossary[w]) return { de: word, en: text.glossary[w] };
    if (COMMON[w]) return { de: word, en: COMMON[w] };
    if (dict[w]) return fromDict(dict[w]);
    // Inflected forms: adjective/noun endings, then verb endings.
    var endings = ["en", "er", "es", "em", "e", "n", "s"];
    for (var i = 0; i < endings.length; i++) {
      var suf = endings[i];
      if (w.length > suf.length + 2 && w.slice(-suf.length) === suf) {
        var base = dict[w.slice(0, -suf.length)];
        if (base && base.type !== "verb") return fromDict(base);
      }
    }
    var verbGuesses = [w + "n", w.replace(/e?t$/, "en"), w.replace(/e?st$/, "en"), w.replace(/e$/, "en")];
    for (var j = 0; j < verbGuesses.length; j++) {
      var v = dict[verbGuesses[j]];
      if (v && v.type === "verb") return fromDict(v);
    }
    return null;
  }

  // ---------- build each text ----------
  function renderBody(text) {
    var html = text.text.split(/\n\n+/).map(function (para) {
      var p = esc(para).replace(/\[\[([^|\]]+)\|([a-z0-9]+)\]\]/g, function (m, words, topic) {
        return '<span class="gr" data-topic="' + topic + '" title="Grammar: ' + esc(topicTitle(topic)) + '">' + words + "</span>";
      }).replace(/\n/g, "<br>");
      return "<p>" + p + "</p>";
    }).join("");
    var box = el("div", "reading-text");
    box.innerHTML = html;
    wrapWords(box);
    return box;
  }
  // Wrap every word in a tappable span.
  function wrapWords(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var parts = node.nodeValue.split(/([A-Za-zÄÖÜäöüß]+(?:-[A-Za-zÄÖÜäöüß]+)*)/);
      if (parts.length < 2) return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (part, i) {
        if (i % 2 === 1) {
          var w = el("span", "w", part);
          frag.appendChild(w);
        } else if (part) {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  function quizHtml(text) {
    var items = text.questions.map(function (q) {
      return '<li>' + esc(q[0]) + ' <input class="short tf" data-answer="' + q[1] + "|" + q[1][0] + '"> <span class="hint">(richtig / falsch)</span></li>';
    });
    (text.open || []).forEach(function (o) {
      items.push("<li>" + esc(o[0]).replace(/\{([^}]*)\}/g, function (m, a) { return '<input data-answer="' + a + '">'; }) + "</li>");
    });
    return '<div class="quiz"><h3>Did you understand?</h3><p class="hint">Type <b>richtig</b> (true) or <b>falsch</b> (false) — or r / f — and fill in the gaps.</p><ol>' + items.join("") + "</ol></div>";
  }

  var readers = {};
  TEXTS.forEach(function (text) {
    var r = el("article", "reader");
    r.id = "read-" + text.id;
    r.hidden = true;

    var back = el("a", "reader-back", "← All texts");
    back.href = "#reading";
    r.appendChild(back);
    var head = el("div", "reader-head");
    head.appendChild(el("h2", "reader-title", text.title));
    head.appendChild(el("span", "lvl", text.level));
    r.appendChild(head);

    var tools = el("div", "reader-tools");
    var gBtn = el("button", "chip filter", "🎨 Show grammar");
    gBtn.type = "button";
    var tBtn = el("button", "chip filter", "🇬🇧 Show translation");
    tBtn.type = "button";
    tools.appendChild(gBtn);
    tools.appendChild(tBtn);
    var sBtn = null;
    if (canSpeak) {
      sBtn = el("button", "chip filter", "🔊 Read aloud");
      sBtn.type = "button";
      tools.appendChild(sBtn);
    }
    r.appendChild(tools);
    r.appendChild(el("p", "hint reader-help", "Tap any word for its meaning. Highlighted grammar links to the topic that explains it."));

    var body = renderBody(text);
    r.appendChild(body);
    var trans = el("div", "reading-translation");
    trans.hidden = true;
    text.en.split(/\n\n+/).forEach(function (p) { trans.appendChild(el("p", null, p)); });
    r.appendChild(trans);

    // grammar used in this text
    var used = [];
    body.querySelectorAll(".gr").forEach(function (g) { if (used.indexOf(g.dataset.topic) === -1) used.push(g.dataset.topic); });
    var gl = el("div", "reader-grammar");
    gl.appendChild(el("b", null, "Grammar in this text: "));
    used.forEach(function (id, i) {
      var a = el("a", null, topicTitle(id));
      a.href = "#" + id;
      gl.appendChild(a);
      if (i < used.length - 1) gl.appendChild(document.createTextNode(" · "));
    });
    r.appendChild(gl);

    var qwrap = el("div");
    qwrap.innerHTML = quizHtml(text);
    r.appendChild(qwrap.firstChild);

    var done = el("div", "study-bar study-bar-bottom");
    done.appendChild(el("span", "study-q", "Finished reading?"));
    var readBtn = el("button", "btn secondary learn-btn");
    readBtn.type = "button";
    done.appendChild(readBtn);
    r.appendChild(done);

    gBtn.addEventListener("click", function () {
      var on = !body.classList.contains("show-grammar");
      body.classList.toggle("show-grammar", on);
      gBtn.classList.toggle("on", on);
    });
    tBtn.addEventListener("click", function () {
      trans.hidden = !trans.hidden;
      tBtn.classList.toggle("on", !trans.hidden);
    });
    if (sBtn) sBtn.addEventListener("click", function () {
      if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); sBtn.classList.remove("on"); return; }
      var u = new SpeechSynthesisUtterance(body.textContent);
      u.lang = "de-DE";
      u.rate = 0.9;
      u.onend = function () { sBtn.classList.remove("on"); };
      sBtn.classList.add("on");
      window.speechSynthesis.speak(u);
    });
    readBtn.addEventListener("click", function () {
      if (P) P.setRead(text.id, !P.isRead(text.id));
      refresh();
    });

    textsEl.appendChild(r);
    readers[text.id] = { el: r, text: text, readBtn: readBtn, words: body.textContent.split(/\s+/).filter(Boolean).length, used: used };
  });

  // ---------- list of texts ----------
  var level = "All";
  ["All", "A1", "A2", "B1", "B2"].forEach(function (lv) {
    var b = el("button", "chip filter" + (lv === "All" ? " on" : ""), lv);
    b.type = "button";
    b.addEventListener("click", function () {
      level = lv;
      filterEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c === b); });
      renderList();
    });
    filterEl.appendChild(b);
  });

  function renderList() {
    listEl.textContent = "";
    TEXTS.forEach(function (text) {
      if (level !== "All" && text.level !== level) return;
      var info = readers[text.id];
      var a = el("a", "card reading-card");
      a.href = "#reading?text=" + text.id;
      var h = el("h4");
      h.appendChild(el("span", null, (P && P.isRead(text.id) ? "✓ " : "") + text.title));
      h.appendChild(el("span", "lvl", text.level));
      a.appendChild(h);
      a.appendChild(el("p", null, text.text.replace(/\[\[([^|\]]+)\|[a-z0-9]+\]\]/g, "$1").split(/[.!?]\s/)[0] + " …"));
      a.appendChild(el("p", "hint", info.words + " words · grammar: " + info.used.slice(0, 3).map(topicTitle).join(", ") + (info.used.length > 3 ? " …" : "")));
      if (P && P.isRead(text.id)) a.classList.add("done");
      listEl.appendChild(a);
    });
  }

  function refresh() {
    Object.keys(readers).forEach(function (id) {
      var read = P && P.isRead(id);
      var b = readers[id].readBtn;
      b.textContent = read ? "✓ Read" : "☐ Mark as read";
      b.classList.toggle("is-learned", !!read);
    });
    renderList();
  }

  // ---------- word pop-up ----------
  var pop = el("div", "word-pop");
  pop.hidden = true;
  document.body.appendChild(pop);
  var popWord = null;

  function speak(t) {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(t);
    u.lang = "de-DE";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function showPop(span, text) {
    var word = span.textContent;
    var hit = lookup(word, text);
    pop.textContent = "";
    var top = el("div", "word-pop-head");
    top.appendChild(el("b", null, hit && hit.dictWord ? hit.de : word));
    if (canSpeak) {
      var s = el("button", "speak", "🔊");
      s.type = "button";
      s.setAttribute("aria-label", "Listen");
      s.addEventListener("click", function (e) { e.stopPropagation(); speak(hit && hit.dictWord ? hit.de : word); });
      top.appendChild(s);
    }
    pop.appendChild(top);
    pop.appendChild(el("div", "word-pop-en", hit ? hit.en : "Not in the word list — see “Show translation”."));
    var gr = span.closest(".gr");
    if (gr) {
      var g = el("a", "word-pop-gr", "📘 Grammar: " + topicTitle(gr.dataset.topic) + " →");
      g.href = "#" + gr.dataset.topic;
      pop.appendChild(g);
    }
    if (hit && hit.dictWord && window.showDictWord) {
      var d = el("a", "word-pop-dict", "Open in Wörterbuch →");
      d.href = "#dictionary";
      d.addEventListener("click", function (e) {
        e.preventDefault();
        location.hash = "#dictionary";
        setTimeout(function () { window.showDictWord(hit.dictWord); }, 50);
      });
      pop.appendChild(d);
    }
    pop.hidden = false;
    var r = span.getBoundingClientRect();
    var left = window.scrollX + r.left;
    left = Math.max(window.scrollX + 8, Math.min(left, window.scrollX + document.documentElement.clientWidth - pop.offsetWidth - 8));
    pop.style.left = left + "px";
    pop.style.top = (window.scrollY + r.bottom + 6) + "px";
    if (popWord) popWord.classList.remove("active");
    popWord = span;
    span.classList.add("active");
  }
  function hidePop() {
    pop.hidden = true;
    if (popWord) popWord.classList.remove("active");
    popWord = null;
  }

  textsEl.addEventListener("click", function (e) {
    var w = e.target.closest(".reading-text .w");
    if (!w) return;
    var r = w.closest(".reader");
    var id = r.id.slice(5);
    if (popWord === w) { hidePop(); return; }
    showPop(w, readers[id].text);
    e.stopPropagation();
  });
  document.addEventListener("click", function (e) { if (!pop.hidden && !pop.contains(e.target)) hidePop(); });
  window.addEventListener("hashchange", hidePop);

  // ---------- routing inside the section ----------
  function route() {
    var m = /^#reading\?text=([\w-]+)/.exec(location.hash);
    var id = m && readers[m[1]] ? m[1] : null;
    listEl.parentElement.hidden = !!id;
    Object.keys(readers).forEach(function (k) { readers[k].el.hidden = k !== id; });
    if (canSpeak && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  }
  window.addEventListener("hashchange", route);
  if (P) P.onChange(function (what) { if (what === "learned" || what === "all") refresh(); });

  window.READING_TEXTS = TEXTS;
  refresh();
  route();
})();
