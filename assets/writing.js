/*
 * Writing practice: tasks from A1 to B2 with a content checklist, useful
 * phrases, a live word count, simple automatic checks and a model answer.
 * Drafts are saved with the notes (NotesStore key "write:<task id>").
 * The checks look for typical words and patterns — they are a guide, not a
 * grammar check.
 */
(function () {
  "use strict";

  var DAYS = "(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|wochenende)";

  var TASKS = [
    {
      id: "einladung", icon: "🎉", level: "A1", title: "Invite a friend", de: "Eine Einladung",
      task: "Sie haben Geburtstag und machen eine Party. Schreiben Sie Ihrer Freundin Anna eine kurze Nachricht.",
      taskEn: "It's your birthday and you're having a party. Write a short message to your friend Anna.",
      words: [30, 50],
      points: [
        ["Wann ist die Party? (Tag, Uhrzeit)", "When is the party? (day, time)", new RegExp(DAYS + "|\\buhr\\b|\\bam \\d", "i")],
        ["Wo ist die Party?", "Where is the party?", /\b(bei mir|zu hause|wohnung|restaurant|café|cafe|garten|straße|in der|im)\b/i],
        ["Was soll Anna mitbringen?", "What should Anna bring?", /mitbring|bring/i],
        ["Bitten Sie um eine Antwort.", "Ask for a reply.", /(kommst du|kannst du|antworte|bescheid|schreib mir|sag mir)/i]
      ],
      phrases: [
        ["Liebe Anna, / Lieber Tom,", "Dear Anna, / Dear Tom, (friends)"],
        ["Am Samstag habe ich Geburtstag.", "It's my birthday on Saturday."],
        ["Ich mache eine Party.", "I'm having a party."],
        ["Die Party beginnt um 19 Uhr.", "The party starts at 7 pm."],
        ["Kannst du … mitbringen?", "Can you bring …?"],
        ["Kommst du? Bitte antworte bis …", "Are you coming? Please reply by …"],
        ["Viele Grüße / Liebe Grüße", "Best wishes / Love"]
      ],
      checks: [
        ["Greeting (Liebe … / Hallo …)", /^\s*(liebe|lieber|hallo|hi)\b/i],
        ["Closing (Viele Grüße …)", /(viele grüße|liebe grüße|bis bald|bis dann|bis samstag)/i],
        ["At least one question (?)", /\?/]
      ],
      model: "Liebe Anna,\nam Samstag habe ich Geburtstag und ich mache eine Party. Die Party beginnt um 19 Uhr bei mir zu Hause in der Gartenstraße 12. Es gibt Pizza und Musik. Kannst du bitte einen Salat mitbringen? Kommst du? Bitte antworte bis Donnerstag.\nViele Grüße\nTom",
      modelEn: "Dear Anna,\nit's my birthday on Saturday and I'm having a party. The party starts at 7 pm at my place, Gartenstraße 12. There will be pizza and music. Could you bring a salad? Are you coming? Please reply by Thursday.\nBest wishes\nTom"
    },
    {
      id: "vorstellen", icon: "👋", level: "A1", title: "Introduce yourself", de: "Sich vorstellen",
      task: "Sie suchen einen Tandempartner. Schreiben Sie einen kurzen Text über sich für ein Forum.",
      taskEn: "You're looking for a language-exchange partner. Write a short text about yourself for a forum.",
      words: [40, 60],
      points: [
        ["Name und Alter", "Name and age", /(ich heiße|mein name ist|ich bin \d+|jahre alt)/i],
        ["Woher kommen Sie?", "Where are you from?", /(ich komme aus|komme ursprünglich)/i],
        ["Wo wohnen Sie?", "Where do you live?", /(ich wohne|wohne\b|ich lebe|lebe (\w+ )?(in|seit))/i],
        ["Beruf oder Studium", "Job or studies", /(ich arbeite|arbeite als|ich studiere|von beruf|ich bin (lehrer|ärzt|student|schüler|ingenieur|krankenpfleger|verkäufer)|ich gehe (zur|in die) schule)/i],
        ["Hobbys", "Hobbies", /(hobby|hobbys|in meiner freizeit|ich \w+ gern|ich mag)/i],
        ["Welche Sprachen sprechen Sie?", "Which languages do you speak?", /(spreche|sprachen|deutsch lernen|lerne deutsch)/i]
      ],
      phrases: [
        ["Hallo, ich heiße … und bin … Jahre alt.", "Hello, my name is … and I'm … years old."],
        ["Ich komme aus … und wohne jetzt in …", "I'm from … and I live in … now."],
        ["Ich arbeite als … / Ich studiere …", "I work as a … / I study …"],
        ["In meiner Freizeit lese ich gern.", "In my free time I like reading."],
        ["Ich spreche … und lerne seit … Deutsch.", "I speak … and have been learning German for …"],
        ["Ich suche einen Tandempartner.", "I'm looking for a language-exchange partner."],
        ["Schreib mir!", "Write to me!"]
      ],
      checks: [
        ["Greeting (Hallo …)", /^\s*(hallo|hi|guten tag|liebe)/i],
        ["At least five sentences", function (t) { return (t.match(/[.!?](\s|$)/g) || []).length >= 5; }],
        ["Verb in second position: “In meiner Freizeit lese ich …”", /\b(in meiner freizeit|am wochenende|seit \w+ \w+|jetzt|abends) (lese|spiele|koche|gehe|fahre|höre|mache|wohne|lerne|arbeite|treffe|schwimme|sehe|tanze|singe) ich\b/i]
      ],
      model: "Hallo, ich heiße Lucas und bin 28 Jahre alt. Ich komme aus Brasilien und wohne jetzt in München. Ich arbeite als Ingenieur bei einer Autofirma. In meiner Freizeit spiele ich Fußball und koche gern. Ich spreche Portugiesisch und Englisch und lerne seit einem Jahr Deutsch. Ich suche einen Tandempartner. Schreib mir!",
      modelEn: "Hello, my name is Lucas and I'm 28. I'm from Brazil and live in Munich now. I work as an engineer at a car company. In my free time I play football and like cooking. I speak Portuguese and English and have been learning German for a year. I'm looking for a language-exchange partner. Write to me!"
    },
    {
      id: "krankmeldung", icon: "🤒", level: "A2", title: "Calling in sick", de: "Eine Krankmeldung",
      task: "Sie sind krank und können nicht zum Deutschkurs kommen. Schreiben Sie Ihrer Lehrerin, Frau Weber, eine E-Mail.",
      taskEn: "You're ill and can't come to your German course. Write an email to your teacher, Frau Weber.",
      words: [40, 70],
      points: [
        ["Sagen Sie, dass Sie krank sind (Was haben Sie?).", "Say that you're ill (what's wrong?).", /(krank|erkältet|erkältung|fieber|schmerzen|grippe|husten)/i],
        ["Wie lange fehlen Sie?", "How long will you be away?", /(bis|heute|morgen|diese woche|nächste woche|tage|montag|dienstag|mittwoch|donnerstag|freitag)/i],
        ["Entschuldigen Sie sich.", "Apologise.", /(tut mir (sehr |wirklich )?leid|entschuldig)/i],
        ["Fragen Sie nach den Hausaufgaben.", "Ask about the homework.", /(hausaufgabe|aufgaben|material|was (wir|ich)|verpasse)/i]
      ],
      phrases: [
        ["Liebe Frau Weber, / Sehr geehrte Frau Weber,", "Dear Frau Weber, (friendly / formal)"],
        ["Leider kann ich heute nicht zum Kurs kommen.", "Unfortunately I can't come to the course today."],
        ["Ich bin krank und habe Fieber.", "I'm ill and have a temperature."],
        ["Der Arzt hat mich bis Freitag krankgeschrieben.", "The doctor has signed me off until Friday."],
        ["Es tut mir leid.", "I'm sorry."],
        ["Können Sie mir bitte die Hausaufgaben schicken?", "Could you please send me the homework?"],
        ["Viele Grüße / Mit freundlichen Grüßen", "Best wishes / Kind regards"]
      ],
      checks: [
        ["Greeting (Liebe Frau … / Sehr geehrte …)", /^\s*(liebe|lieber|sehr geehrte|hallo (frau|herr)|guten tag)/i],
        ["Closing (Viele Grüße / Mit freundlichen Grüßen)", /(grüße|grüßen)/i],
        ["A reason with weil or denn", /\b(weil|denn)\b/i],
        ["Polite Sie-form (Sie / Ihnen)", /\b(Sie|Ihnen)\b/]
      ],
      model: "Liebe Frau Weber,\nleider kann ich diese Woche nicht zum Kurs kommen, weil ich krank bin. Ich habe eine starke Erkältung und Fieber. Der Arzt hat mich bis Freitag krankgeschrieben. Es tut mir sehr leid. Können Sie mir bitte die Hausaufgaben per E-Mail schicken? Dann kann ich zu Hause lernen.\nViele Grüße\nAyşe Demir",
      modelEn: "Dear Frau Weber,\nunfortunately I can't come to the course this week because I'm ill. I have a bad cold and a temperature. The doctor has signed me off until Friday. I'm very sorry. Could you please send me the homework by email? Then I can study at home.\nBest wishes\nAyşe Demir"
    },
    {
      id: "wochenende", icon: "📅", level: "A2", title: "Last weekend", de: "Mein Wochenende",
      task: "Schreiben Sie einer Freundin / einem Freund, was Sie letztes Wochenende gemacht haben.",
      taskEn: "Write to a friend about what you did last weekend.",
      words: [50, 80],
      points: [
        ["Was haben Sie am Samstag gemacht?", "What did you do on Saturday?", /samstag/i],
        ["Was haben Sie am Sonntag gemacht?", "What did you do on Sunday?", /sonntag/i],
        ["Mit wem waren Sie zusammen?", "Who were you with?", /\b(mit (meine[mnr]?|dem|der|den|freund|freundin)|zusammen|allein)\b/i],
        ["Wie war es? (Ihre Meinung)", "How was it? (your opinion)", /(war (sehr |total |echt )?(schön|toll|super|langweilig|lustig|anstrengend|interessant)|hat (mir|uns) (sehr |gut )?gefallen|hat spaß gemacht)/i]
      ],
      phrases: [
        ["Am Samstag bin ich … gefahren / gegangen.", "On Saturday I went (by vehicle / on foot) …"],
        ["Am Vormittag habe ich … gemacht.", "In the morning I did …"],
        ["Zuerst … dann … danach …", "First … then … after that …"],
        ["Am Abend haben wir zusammen gekocht.", "In the evening we cooked together."],
        ["Das war wirklich schön!", "That was really nice!"],
        ["Der Film hat mir gut gefallen.", "I really liked the film."],
        ["Und was hast du gemacht?", "And what did you do?"]
      ],
      checks: [
        ["Perfekt at least three times (habe … gemacht, bin … gefahren)", function (t) {
          return (t.match(/\b(habe|hast|hat|haben|habt|bin|bist|ist|sind|seid)\b[^.!?]*?\b(ge\w{2,}(t|en)|\w+(ge|ver|be|er|ent)\w*(t|en)|\w+iert)\b/gi) || []).length >= 3;
        }],
        ["Time words (zuerst, dann, danach, am Abend …)", /\b(zuerst|dann|danach|später|am abend|am vormittag|am nachmittag|am ende|schließlich)\b/i],
        ["A question to your friend (?)", /\?/]
      ],
      model: "Hallo Jonas,\nwie geht's? Mein Wochenende war super! Am Samstag bin ich mit meiner Schwester nach Heidelberg gefahren. Zuerst haben wir das Schloss besichtigt, dann haben wir in der Altstadt Kaffee getrunken. Am Abend sind wir ins Kino gegangen. Der Film hat mir gut gefallen. Am Sonntag habe ich lange geschlafen und danach habe ich für den Deutschkurs gelernt. Und was hast du am Wochenende gemacht?\nLiebe Grüße\nMaria",
      modelEn: "Hi Jonas,\nhow are you? My weekend was great! On Saturday I went to Heidelberg with my sister. First we visited the castle, then we had coffee in the old town. In the evening we went to the cinema. I really liked the film. On Sunday I slept in and afterwards I studied for my German course. And what did you do at the weekend?\nLove\nMaria"
    },
    {
      id: "homeoffice", icon: "💻", level: "B1", title: "Opinion: working from home", de: "Forumsbeitrag: Homeoffice",
      task: "In einem Forum wird diskutiert: „Sollten alle Menschen im Homeoffice arbeiten dürfen?“ Schreiben Sie Ihre Meinung.",
      taskEn: "A forum is discussing: “Should everyone be allowed to work from home?” Write your opinion.",
      words: [80, 120],
      points: [
        ["Ihre Meinung", "Your opinion", /(meiner meinung nach|ich finde|ich denke|ich glaube|ich bin der meinung|meines erachtens)/i],
        ["Ein Vorteil", "An advantage", /(vorteil|positiv|praktisch|spart|flexibel|ruhig)/i],
        ["Ein Nachteil", "A disadvantage", /(nachteil|negativ|problem|schwierig|einsam|fehlt|allein)/i],
        ["Ihre eigene Erfahrung", "Your own experience", /(ich arbeite|ich habe|bei mir|in meiner firma|meine erfahrung|ich selbst|mein chef|meine kollegen)/i],
        ["Ein Fazit", "A conclusion", /(insgesamt|zusammenfassend|alles in allem|deshalb|zum schluss|abschließend)/i]
      ],
      phrases: [
        ["Meiner Meinung nach …", "In my opinion …"],
        ["Ein großer Vorteil ist, dass …", "A big advantage is that …"],
        ["Ein Nachteil ist allerdings, dass …", "One disadvantage, however, is that …"],
        ["Ich habe selbst die Erfahrung gemacht, dass …", "I've found myself that …"],
        ["Einerseits …, andererseits …", "On the one hand …, on the other hand …"],
        ["Außerdem / Trotzdem / Deshalb …", "Besides / Nevertheless / That's why …"],
        ["Alles in allem finde ich …", "All in all, I think …"]
      ],
      checks: [
        ["Subordinate clauses with weil / dass / obwohl / wenn (at least 2)", function (t) { return (t.match(/\b(weil|dass|obwohl|wenn|da)\b/gi) || []).length >= 2; }],
        ["Connectors (außerdem, trotzdem, deshalb, einerseits …) — at least 2", function (t) { return (t.match(/\b(außerdem|trotzdem|deshalb|deswegen|einerseits|andererseits|allerdings|jedoch|zum beispiel|darum|dagegen)\b/gi) || []).length >= 2; }],
        ["Paragraphs (at least two blank-line breaks or three lines)", function (t) { return t.trim().split(/\n+/).length >= 3; }]
      ],
      model: "Meiner Meinung nach sollten alle Menschen im Homeoffice arbeiten dürfen, wenn ihr Beruf das möglich macht.\nEin großer Vorteil ist, dass man keine Zeit im Verkehr verliert. Außerdem kann man zu Hause oft ruhiger arbeiten. Ein Nachteil ist allerdings, dass man die Kollegen seltener sieht und sich manchmal einsam fühlt.\nIch arbeite selbst zwei Tage pro Woche zu Hause. Ich habe die Erfahrung gemacht, dass ich dort konzentrierter bin. Trotzdem freue ich mich auf die Tage im Büro, weil ich dort mit meinem Team sprechen kann.\nAlles in allem finde ich eine Mischung aus Büro und Homeoffice ideal.",
      modelEn: "In my opinion everyone should be allowed to work from home if their job makes it possible.\nOne big advantage is that you don't lose time in traffic. Besides, you can often work more quietly at home. One disadvantage, however, is that you see your colleagues less often and sometimes feel lonely.\nI work from home two days a week myself. I've found that I'm more focused there. Nevertheless I look forward to the days in the office, because I can talk to my team there.\nAll in all I think a mix of office and home office is ideal."
    },
    {
      id: "beschwerde", icon: "🏨", level: "B1", title: "Complaint to a hotel", de: "Beschwerde an ein Hotel",
      task: "Sie waren drei Nächte im Hotel Seeblick. Vieles war nicht in Ordnung. Schreiben Sie eine Beschwerde an das Hotel.",
      taskEn: "You stayed three nights at the Hotel Seeblick. Many things weren't right. Write a complaint to the hotel.",
      words: [80, 120],
      points: [
        ["Wann waren Sie im Hotel?", "When did you stay?", /(vom|bis zum|\d+\.|nächte|nacht|aufenthalt|übernachtet)/i],
        ["Problem 1", "Problem 1", /(schmutzig|laut|kaputt|funktioniert(e)? nicht|kalt|kein warmes wasser|klein|unfreundlich|nicht sauber)/i],
        ["Problem 2 (another one)", "Problem 2 (another one)", function (t) { return (t.match(/(schmutzig|laut|kaputt|funktioniert(e)? nicht|kalt|kein warmes wasser|zu klein|unfreundlich|nicht sauber|lärm|defekt)/gi) || []).length >= 2; }],
        ["Was erwarten Sie? (Geld zurück, Gutschein …)", "What do you expect? (refund, voucher …)", /(erwarte|erstatt|zurück|entschädig|gutschein|preisnachlass|rabatt)/i]
      ],
      phrases: [
        ["Sehr geehrte Damen und Herren,", "Dear Sir or Madam,"],
        ["vom 3. bis zum 6. Mai habe ich in Ihrem Hotel übernachtet.", "From 3 to 6 May I stayed at your hotel."],
        ["Leider war ich mit … gar nicht zufrieden.", "Unfortunately I wasn't at all satisfied with …"],
        ["Das Zimmer war schmutzig / sehr laut.", "The room was dirty / very noisy."],
        ["Die Heizung hat nicht funktioniert.", "The heating didn't work."],
        ["Ich erwarte, dass Sie mir einen Teil des Preises erstatten.", "I expect you to refund part of the price."],
        ["Mit freundlichen Grüßen", "Kind regards"]
      ],
      checks: [
        ["Formal greeting (Sehr geehrte …)", /^\s*sehr geehrte/i],
        ["Formal closing (Mit freundlichen Grüßen)", /mit freundlichen grüßen/i],
        ["Sie-form (Sie / Ihnen / Ihr)", /\b(Sie|Ihnen|Ihr|Ihrem|Ihre[mns]?)\b/],
        ["No “du” in a formal letter", function (t) { return !!t.trim() && !/\b(du|dich|dir|dein\w*)\b/i.test(t); }],
        ["Perfekt or Präteritum for what happened", /\b(war|waren|hatte|hatten|habe|hat|haben|funktionierte)\b/i]
      ],
      model: "Sehr geehrte Damen und Herren,\nvom 3. bis zum 6. Mai habe ich in Ihrem Hotel übernachtet. Leider war ich mit meinem Aufenthalt gar nicht zufrieden.\nDas Zimmer war bei meiner Ankunft schmutzig, und im Bad gab es kein warmes Wasser. Außerdem war es nachts sehr laut, weil direkt unter meinem Fenster die Küche war. Ich habe mich an der Rezeption beschwert, aber niemand hat mir geholfen.\nFür ein Zimmer mit diesem Preis finde ich das nicht akzeptabel. Ich erwarte deshalb, dass Sie mir mindestens 30 Prozent des Preises erstatten.\nMit freundlichen Grüßen\nPetra Lang",
      modelEn: "Dear Sir or Madam,\nfrom 3 to 6 May I stayed at your hotel. Unfortunately I was not at all satisfied with my stay.\nThe room was dirty when I arrived and there was no hot water in the bathroom. In addition it was very noisy at night because the kitchen was right below my window. I complained at reception, but nobody helped me.\nFor a room at this price I don't find that acceptable. I therefore expect you to refund at least 30 percent of the price.\nKind regards\nPetra Lang"
    },
    {
      id: "innenstadt", icon: "🚲", level: "B2", title: "Statement: car-free city centres", de: "Stellungnahme: Autofreie Innenstadt",
      task: "Ihre Stadt plant, die Innenstadt für Autos zu sperren. Schreiben Sie eine Stellungnahme: Nennen Sie Argumente dafür und dagegen und begründen Sie Ihre Meinung.",
      taskEn: "Your city plans to close the centre to cars. Write a statement: give arguments for and against and justify your opinion.",
      words: [120, 180],
      points: [
        ["Einleitung: das Thema vorstellen", "Introduction: present the topic", /(immer mehr|in letzter zeit|wird (zurzeit|derzeit|oft|viel) diskutiert|debatte|die frage, ob|thema)/i],
        ["Argumente dafür", "Arguments for", /(dafür spricht|ein (großer |wichtiger )?vorteil|zum einen|einerseits|für eine autofreie)/i],
        ["Argumente dagegen", "Arguments against", /(dagegen spricht|andererseits|zum anderen|ein nachteil|kritiker|allerdings|gegen eine autofreie)/i],
        ["Ihre Meinung mit Begründung", "Your opinion with reasons", /(meiner meinung nach|ich bin der (ansicht|meinung|überzeugung)|meines erachtens|ich halte)/i],
        ["Schluss / Fazit", "Conclusion", /(zusammenfassend|abschließend|alles in allem|insgesamt|aus diesen gründen)/i]
      ],
      phrases: [
        ["In letzter Zeit wird viel darüber diskutiert, ob …", "Recently there has been a lot of discussion about whether …"],
        ["Für eine autofreie Innenstadt spricht vor allem, dass …", "The main argument for a car-free centre is that …"],
        ["Dagegen lässt sich einwenden, dass …", "Against this, one could object that …"],
        ["Kritiker befürchten, dass …", "Critics fear that …"],
        ["Ich bin der Überzeugung, dass …, da …", "I'm convinced that …, since …"],
        ["Es wäre sinnvoll, wenn …", "It would make sense if …"],
        ["Zusammenfassend lässt sich sagen, dass …", "In summary, one can say that …"]
      ],
      checks: [
        ["Konjunktiv II (wäre, würde, könnte, sollte …)", /\b(wäre[n]?|würde[n]?|könnte[n]?|sollte[n]?|müsste[n]?|hätte[n]?)\b/i],
        ["Passive or lassen-construction (wird … gebaut, lässt sich …)", /\b((wird|werden|wurde|wurden)\b[^.!?]{0,60}\b(ge\w+(t|en)|\w+iert)|lässt sich|lassen sich)\b/i],
        ["Connectors — at least 4 (zum einen, außerdem, allerdings, folglich …)", function (t) { return (t.match(/\b(zum einen|zum anderen|außerdem|allerdings|jedoch|dennoch|folglich|daher|deshalb|einerseits|andererseits|darüber hinaus|nicht nur|sondern auch|trotzdem|hingegen|zudem)\b/gi) || []).length >= 4; }],
        ["Paragraphs (at least four)", function (t) { return t.trim().split(/\n+/).length >= 4; }]
      ],
      model: "In letzter Zeit wird in unserer Stadt viel darüber diskutiert, ob die Innenstadt für Autos gesperrt werden soll. Das Thema betrifft uns alle, denn fast jeder nutzt das Zentrum täglich.\nFür eine autofreie Innenstadt spricht zum einen, dass die Luft sauberer und der Lärm deutlich geringer wäre. Zum anderen hätten Fußgänger und Radfahrer mehr Platz, und Cafés könnten ihre Tische auf die Straße stellen. Das würde das Zentrum lebendiger machen.\nDagegen lässt sich allerdings einwenden, dass ältere oder behinderte Menschen auf das Auto angewiesen sind. Außerdem befürchten viele Geschäftsleute, dass weniger Kunden kommen, wenn es keine Parkplätze mehr gibt.\nIch bin der Überzeugung, dass die Vorteile überwiegen. Allerdings müsste der öffentliche Nahverkehr zuerst deutlich ausgebaut werden, und für Menschen mit Behinderung sollte es Ausnahmen geben.\nZusammenfassend lässt sich sagen, dass eine autofreie Innenstadt sinnvoll ist, wenn sie gut vorbereitet wird.",
      modelEn: "Recently there has been a lot of discussion in our city about whether the centre should be closed to cars. The topic affects all of us, because almost everyone uses the centre every day.\nOne argument for a car-free centre is that the air would be cleaner and the noise much lower. Another is that pedestrians and cyclists would have more space, and cafés could put their tables out on the street. That would make the centre livelier.\nAgainst this, however, one could object that older or disabled people depend on their cars. In addition, many shopkeepers fear that fewer customers will come if there are no more parking spaces.\nI'm convinced that the advantages outweigh the disadvantages. However, public transport would first have to be expanded considerably, and there should be exceptions for people with disabilities.\nIn summary, a car-free city centre makes sense if it is well prepared."
    },
    {
      id: "bewerbung", icon: "💼", level: "B2", title: "Job application letter", de: "Bewerbungsschreiben",
      task: "Sie haben eine Stellenanzeige gelesen: „Wir suchen eine/n Mitarbeiter/in im Kundenservice (Vollzeit).“ Schreiben Sie ein Bewerbungsschreiben.",
      taskEn: "You've read a job advert: “We're looking for a customer-service employee (full-time).” Write a letter of application.",
      words: [120, 180],
      points: [
        ["Welche Stelle? Wo haben Sie die Anzeige gesehen?", "Which job? Where did you see the advert?", /(stelle|anzeige|stellenangebot|ausschreibung)/i],
        ["Ihre Ausbildung / Ihr Studium", "Your training / studies", /(ausbildung|studium|abschluss|studiert)/i],
        ["Ihre Berufserfahrung und Kenntnisse", "Your work experience and skills", /(erfahrung|kenntnisse|gearbeitet|tätig|sprachen)/i],
        ["Warum diese Firma?", "Why this company?", /(ihr unternehmen|ihre firma|bei ihnen|ihrem team|reizt mich|interessiert mich)/i],
        ["Ab wann können Sie anfangen?", "When can you start?", /(ab dem|ab sofort|frühestens|zur verfügung|eintrittstermin|ab \w+ \d{4}|ab (januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember))/i],
        ["Bitte um ein Vorstellungsgespräch", "Ask for an interview", /(vorstellungsgespräch|persönliches gespräch|persönlich vorstellen)/i]
      ],
      phrases: [
        ["Sehr geehrte Frau … / Sehr geehrter Herr …,", "Dear Ms … / Dear Mr …,"],
        ["mit großem Interesse habe ich Ihre Anzeige auf … gelesen.", "I read your advert on … with great interest."],
        ["Nach meiner Ausbildung als … habe ich … Jahre bei … gearbeitet.", "After training as a … I worked at … for … years."],
        ["Zu meinen Aufgaben gehörte …", "My duties included …"],
        ["Besonders reizt mich an Ihrem Unternehmen, dass …", "What particularly appeals to me about your company is that …"],
        ["Ich stehe Ihnen ab dem 1. März zur Verfügung.", "I'm available from 1 March."],
        ["Über eine Einladung zu einem Vorstellungsgespräch würde ich mich sehr freuen.", "I would be very pleased to be invited to an interview."],
        ["Mit freundlichen Grüßen … Anlagen: Lebenslauf, Zeugnisse", "Kind regards … Enclosures: CV, references"]
      ],
      checks: [
        ["Formal greeting (Sehr geehrte …)", /^\s*sehr geehrte/i],
        ["Formal closing (Mit freundlichen Grüßen)", /mit freundlichen grüßen/i],
        ["Polite Konjunktiv II (würde mich freuen …)", /\b(würde|wäre|könnte|hätte)\b/i],
        ["Enclosures mentioned (Anlage / Anhang)", /\b(anlage|anlagen|anhang)\b/i],
        ["No “du” in a formal letter", function (t) { return !!t.trim() && !/\b(du|dich|dir|dein\w*)\b/i.test(t); }]
      ],
      model: "Sehr geehrte Frau Schneider,\nmit großem Interesse habe ich Ihre Anzeige auf Ihrer Webseite gelesen und bewerbe mich hiermit um die Stelle als Mitarbeiterin im Kundenservice.\nNach meiner Ausbildung zur Kauffrau für Büromanagement habe ich drei Jahre bei einem Online-Händler in Leipzig gearbeitet. Zu meinen Aufgaben gehörte es, Kundenanfragen am Telefon und per E-Mail zu beantworten und Beschwerden zu bearbeiten. Dabei habe ich gelernt, auch in stressigen Situationen freundlich und lösungsorientiert zu bleiben. Neben Deutsch spreche ich fließend Englisch und Spanisch.\nBesonders reizt mich an Ihrem Unternehmen, dass Sie Kunden in ganz Europa betreuen und großen Wert auf Qualität legen.\nIch stehe Ihnen ab dem 1. März zur Verfügung. Über eine Einladung zu einem persönlichen Vorstellungsgespräch würde ich mich sehr freuen.\nMit freundlichen Grüßen\nElena García\nAnlagen: Lebenslauf, Zeugnisse",
      modelEn: "Dear Ms Schneider,\nI read your advert on your website with great interest and would like to apply for the position of customer-service employee.\nAfter training as an office management clerk, I worked for an online retailer in Leipzig for three years. My duties included answering customer enquiries by phone and email and handling complaints. In doing so I learned to stay friendly and solution-oriented even in stressful situations. In addition to German, I speak fluent English and Spanish.\nWhat particularly appeals to me about your company is that you serve customers throughout Europe and place great value on quality.\nI am available from 1 March. I would be very pleased to be invited to a personal interview.\nKind regards\nElena García\nEnclosures: CV, references"
    }
  ];
  window.WRITING_TASKS = TASKS;

  var section = document.getElementById("writing");
  if (!section) return;
  var listEl = document.getElementById("writeList");
  var panelsEl = document.getElementById("writePanels");
  var store = window.NotesStore || null;
  var canSpeak = "speechSynthesis" in window;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function speak(text) {
    if (!canSpeak || !text.trim()) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/…/g, ""));
    u.lang = "de-DE";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
  function test(rule, text) {
    return typeof rule === "function" ? rule(text) : rule.test(text);
  }
  function countWords(text) {
    return (text.match(/[A-Za-zÄÖÜäöüß0-9]+(?:[-'][A-Za-zÄÖÜäöüß0-9]+)*/g) || []).length;
  }
  // Exposed for the tests.
  window.__writingCheck = function (id, text) {
    var t = TASKS.filter(function (x) { return x.id === id; })[0];
    return {
      points: t.points.map(function (p) { return test(p[2], text); }),
      checks: t.checks.map(function (c) { return test(c[1], text); }),
      words: countWords(text)
    };
  };

  var panels = {};
  TASKS.forEach(function (t) {
    var key = "write:" + t.id;

    var card = el("a", "card sit-card write-card");
    card.href = "#writing?t=" + t.id;
    card.appendChild(el("div", "sit-icon", t.icon));
    var h = el("h4");
    h.appendChild(el("span", null, t.title));
    h.appendChild(el("span", "lvl", t.level));
    card.appendChild(h);
    card.appendChild(el("p", null, t.de));
    var st = el("div", "write-status hint");
    card.appendChild(st);
    listEl.appendChild(card);

    var p = el("article", "sit-panel write-panel");
    p.id = "write-" + t.id;
    p.hidden = true;
    var back = el("a", "reader-back", "← All writing tasks");
    back.href = "#writing";
    p.appendChild(back);
    var head = el("div", "reader-head");
    head.appendChild(el("h2", "reader-title", t.icon + " " + t.de));
    head.appendChild(el("span", "lvl", t.level));
    p.appendChild(head);

    var box = el("div", "tip write-task");
    box.appendChild(el("p", "write-task-de", t.task));
    box.appendChild(el("p", "hint", t.taskEn));
    box.appendChild(el("p", "hint", "Length: " + t.words[0] + "–" + t.words[1] + " words."));
    p.appendChild(box);

    var grid = el("div", "write-grid");
    var left = el("div", "write-col");
    left.appendChild(el("h3", null, "Your text should include"));
    var pointsEl = el("ul", "write-checklist");
    var pointItems = t.points.map(function (pt) {
      var li = el("li");
      li.appendChild(el("span", "write-mark", "○"));
      var tx = el("span");
      tx.appendChild(el("span", null, pt[0]));
      tx.appendChild(el("small", "hint", " — " + pt[1]));
      li.appendChild(tx);
      pointsEl.appendChild(li);
      return li;
    });
    left.appendChild(pointsEl);
    left.appendChild(el("h3", null, "Language checks"));
    var checksEl = el("ul", "write-checklist");
    var checkItems = t.checks.map(function (c) {
      var li = el("li");
      li.appendChild(el("span", "write-mark", "○"));
      li.appendChild(el("span", null, c[0]));
      checksEl.appendChild(li);
      return li;
    });
    left.appendChild(checksEl);
    left.appendChild(el("p", "hint", "The ticks look for typical words and patterns — they're a guide, not a full grammar check. Compare with the model answer at the end."));

    var right = el("div", "write-col");
    right.appendChild(el("h3", null, "Useful phrases"));
    var ul = el("ul", "write-phrases");
    t.phrases.forEach(function (ph) {
      var li = el("li");
      var de = el("span", "sit-de", ph[0]);
      li.appendChild(de);
      li.appendChild(el("small", "hint", ph[1]));
      ul.appendChild(li);
    });
    right.appendChild(ul);
    grid.appendChild(left);
    grid.appendChild(right);
    p.appendChild(grid);

    p.appendChild(el("h3", null, "Your text"));
    var ta = el("textarea", "note-text write-text");
    ta.setAttribute("aria-label", "Your text: " + t.de);
    ta.setAttribute("lang", "de");
    ta.spellcheck = true;
    ta.placeholder = "Schreiben Sie hier …";
    ta.value = store ? store.get(key) : "";
    p.appendChild(ta);
    var bar = el("div", "write-bar");
    var wc = el("span", "write-count");
    var saved = el("span", "hint");
    bar.appendChild(wc);
    bar.appendChild(saved);
    p.appendChild(bar);

    var actions = el("div", "quiz-actions");
    if (canSpeak) {
      var readBtn = el("button", "btn secondary", "🔊 Read my text aloud");
      readBtn.type = "button";
      readBtn.addEventListener("click", function () { speak(ta.value); });
      actions.appendChild(readBtn);
    }
    var modelBtn = el("button", "btn", "Show model answer");
    modelBtn.type = "button";
    actions.appendChild(modelBtn);
    var clearBtn = el("button", "btn secondary", "Clear");
    clearBtn.type = "button";
    actions.appendChild(clearBtn);
    p.appendChild(actions);

    var model = el("div", "write-model");
    model.hidden = true;
    model.appendChild(el("h3", null, "Model answer"));
    var mDe = el("div", "write-model-text", t.model);
    mDe.lang = "de";
    model.appendChild(mDe);
    var mActions = el("div", "quiz-actions");
    var tBtn = el("button", "chip filter", "🇬🇧 Show translation");
    tBtn.type = "button";
    mActions.appendChild(tBtn);
    if (canSpeak) {
      var mSpeak = el("button", "chip filter", "🔊 Listen");
      mSpeak.type = "button";
      mSpeak.addEventListener("click", function () { speak(t.model); });
      mActions.appendChild(mSpeak);
    }
    model.appendChild(mActions);
    var mEn = el("div", "write-model-text write-model-en", t.modelEn);
    mEn.hidden = true;
    model.appendChild(mEn);
    p.appendChild(model);
    modelBtn.addEventListener("click", function () {
      model.hidden = !model.hidden;
      modelBtn.textContent = model.hidden ? "Show model answer" : "Hide model answer";
      if (!model.hidden) model.scrollIntoView({ block: "nearest" });
    });
    tBtn.addEventListener("click", function () {
      mEn.hidden = !mEn.hidden;
      tBtn.classList.toggle("on", !mEn.hidden);
    });

    function update() {
      var text = ta.value;
      var n = countWords(text);
      var done = 0;
      t.points.forEach(function (pt, i) {
        var ok = !!text.trim() && test(pt[2], text);
        pointItems[i].classList.toggle("ok", ok);
        pointItems[i].firstChild.textContent = ok ? "✓" : "○";
        if (ok) done++;
      });
      var cDone = 0;
      t.checks.forEach(function (c, i) {
        var ok = !!text.trim() && test(c[1], text);
        checkItems[i].classList.toggle("ok", ok);
        checkItems[i].firstChild.textContent = ok ? "✓" : "○";
        if (ok) cDone++;
      });
      var inRange = n >= t.words[0] && n <= t.words[1];
      wc.textContent = n + " word" + (n === 1 ? "" : "s") + " · target " + t.words[0] + "–" + t.words[1] +
        (n && n < t.words[0] ? " (a bit short)" : n > t.words[1] ? " (a bit long)" : inRange ? " ✓" : "");
      wc.className = "write-count" + (inRange ? " ok" : n ? " off" : "");
      st.textContent = n ? "Draft: " + n + " words · " + done + "/" + t.points.length + " points" : "";
      if (n && inRange && done === t.points.length && cDone === t.checks.length) {
        st.textContent = "✓ Complete · " + n + " words";
      }
    }
    var timer;
    ta.addEventListener("input", function () {
      update();
      if (!store) return;
      saved.textContent = "Saving…";
      clearTimeout(timer);
      timer = setTimeout(function () {
        store.set(key, ta.value);
        saved.textContent = store.ok() ? "Saved with your notes ✓" : "⚠ Can't save in this browser";
      }, 400);
    });
    clearBtn.addEventListener("click", function () {
      if (ta.value.trim() && !window.confirm("Delete your text for this task?")) return;
      ta.value = "";
      if (store) store.set(key, "");
      saved.textContent = "";
      update();
    });
    if (store) store.onChange(function (id) {
      if ((id === null || id === key) && document.activeElement !== ta) { ta.value = store.get(key); update(); }
    });
    update();

    panelsEl.appendChild(p);
    panels[t.id] = p;
  });

  function route() {
    var m = /^#writing\?t=([\w-]+)/.exec(location.hash);
    var id = m && panels[m[1]] ? m[1] : null;
    listEl.hidden = !!id;
    document.getElementById("writeIntro").hidden = !!id;
    Object.keys(panels).forEach(function (k) { panels[k].hidden = k !== id; });
  }
  window.addEventListener("hashchange", route);
  route();
})();
