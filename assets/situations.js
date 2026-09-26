/*
 * Everyday situations: key phrases, a model dialogue and a short exercise
 * for real-life tasks. Rendered before app.js so the exercises are wired
 * like every other quiz. Exercise gaps use {answer|alternative}.
 */
(function () {
  "use strict";

  var S = [
    {
      id: "arzt", icon: "🩺", level: "A2", title: "At the doctor", de: "Beim Arzt",
      phrases: [
        ["Ich möchte einen Termin vereinbaren.", "I'd like to make an appointment."],
        ["Ich bin gesetzlich / privat versichert.", "I have public / private health insurance."],
        ["Hier ist meine Versichertenkarte.", "Here is my health insurance card."],
        ["Was fehlt Ihnen?", "What's the matter? (doctor)"],
        ["Ich habe Kopfschmerzen / Bauchschmerzen / Halsschmerzen.", "I have a headache / stomach ache / sore throat."],
        ["Mir ist schlecht.", "I feel sick."],
        ["Ich habe seit drei Tagen Fieber.", "I've had a fever for three days."],
        ["Mein Rücken tut weh.", "My back hurts."],
        ["Ich bin allergisch gegen Penicillin.", "I'm allergic to penicillin."],
        ["Wie oft muss ich die Tabletten nehmen?", "How often do I have to take the tablets?"],
        ["Dreimal täglich nach dem Essen.", "Three times a day after meals."],
        ["Können Sie mich krankschreiben?", "Can you give me a sick note?"],
        ["Gute Besserung!", "Get well soon!"]
      ],
      dialogue: [
        ["Ärztin", "Guten Tag, Herr Kaya. Was fehlt Ihnen denn?", "Hello, Mr Kaya. What's the matter?"],
        ["Herr Kaya", "Ich habe seit gestern starke Halsschmerzen und Fieber.", "I've had a bad sore throat and a fever since yesterday."],
        ["Ärztin", "Haben Sie auch Husten?", "Do you have a cough too?"],
        ["Herr Kaya", "Ja, ein bisschen. Und mir tut der Kopf weh.", "Yes, a little. And my head hurts."],
        ["Ärztin", "Machen Sie bitte mal den Mund auf … Ihr Hals ist sehr rot. Das ist eine Erkältung. Ich verschreibe Ihnen ein Medikament.", "Please open your mouth … Your throat is very red. It's a cold. I'll prescribe you some medicine."],
        ["Herr Kaya", "Wie oft muss ich es nehmen?", "How often do I have to take it?"],
        ["Ärztin", "Dreimal täglich nach dem Essen. Und trinken Sie viel Tee!", "Three times a day after meals. And drink lots of tea!"],
        ["Herr Kaya", "Können Sie mich für diese Woche krankschreiben?", "Can you sign me off sick for this week?"],
        ["Ärztin", "Ja, bis Freitag. Gute Besserung!", "Yes, until Friday. Get well soon!"]
      ],
      exercise: ["Ich habe {Kopfschmerzen}. <span class=\"hint\">(a headache)</span>", "Mir {ist} schlecht.", "Mein Rücken tut {weh}.",
        "Ich habe {seit} drei Tagen Fieber.", "Gute {Besserung}!"]
    },
    {
      id: "einkaufen", icon: "🛒", level: "A1", title: "Shopping", de: "Einkaufen",
      phrases: [
        ["Was kostet das?", "How much is that?"],
        ["Ich hätte gern ein Kilo Tomaten.", "I'd like a kilo of tomatoes."],
        ["Haben Sie das auch in Größe M / in Blau?", "Do you have it in size M / in blue?"],
        ["Kann ich das anprobieren?", "Can I try it on?"],
        ["Wo sind die Umkleidekabinen?", "Where are the changing rooms?"],
        ["Das ist mir zu teuer / zu groß.", "That's too expensive / too big for me."],
        ["Ich nehme es.", "I'll take it."],
        ["Kann ich mit Karte zahlen?", "Can I pay by card?"],
        ["Brauchen Sie eine Tüte?", "Do you need a bag?"],
        ["Kann ich das umtauschen?", "Can I exchange this?"],
        ["Hier ist Ihr Kassenbon.", "Here's your receipt."],
        ["Sonst noch etwas?", "Anything else?"],
        ["Nein, danke, das ist alles.", "No thanks, that's all."]
      ],
      dialogue: [
        ["Verkäuferin", "Guten Morgen! Was darf es sein?", "Good morning! What can I get you?"],
        ["Kunde", "Ich hätte gern 500 Gramm Käse und sechs Brötchen.", "I'd like 500 grams of cheese and six bread rolls."],
        ["Verkäuferin", "Gern. Sonst noch etwas?", "Sure. Anything else?"],
        ["Kunde", "Ja, haben Sie auch Vollkornbrot?", "Yes, do you also have wholemeal bread?"],
        ["Verkäuferin", "Leider nicht mehr, das ist schon ausverkauft.", "Unfortunately not any more, it's already sold out."],
        ["Kunde", "Schade. Dann ist das alles. Kann ich mit Karte zahlen?", "Pity. Then that's all. Can I pay by card?"],
        ["Verkäuferin", "Natürlich. Das macht zusammen 9 Euro 40.", "Of course. That's 9 euros 40 altogether."]
      ],
      exercise: ["Was {kostet} das?", "Kann ich das {anprobieren}? <span class=\"hint\">(try on)</span>", "Das ist mir zu {teuer}. <span class=\"hint\">(expensive)</span>",
        "Kann ich mit {Karte} zahlen?", "Nein, danke, das ist {alles}."]
    },
    {
      id: "weg", icon: "🧭", level: "A1", title: "Asking the way", de: "Nach dem Weg fragen",
      phrases: [
        ["Entschuldigung, wie komme ich zum Bahnhof?", "Excuse me, how do I get to the station?"],
        ["Wo ist hier die nächste Apotheke?", "Where's the nearest pharmacy?"],
        ["Ist das weit von hier?", "Is it far from here?"],
        ["Gehen Sie geradeaus.", "Go straight ahead."],
        ["Biegen Sie an der Ampel links ab.", "Turn left at the traffic lights."],
        ["Nehmen Sie die zweite Straße rechts.", "Take the second street on the right."],
        ["Gehen Sie über die Brücke.", "Go over the bridge."],
        ["Es ist gegenüber vom Rathaus.", "It's opposite the town hall."],
        ["Es ist zwischen der Bank und dem Café.", "It's between the bank and the café."],
        ["Das sind ungefähr fünf Minuten zu Fuß.", "That's about five minutes on foot."],
        ["Welche Linie fährt zum Hauptbahnhof?", "Which line goes to the main station?"],
        ["Wo muss ich umsteigen?", "Where do I have to change?"]
      ],
      dialogue: [
        ["Touristin", "Entschuldigung, wie komme ich zum Kunstmuseum?", "Excuse me, how do I get to the art museum?"],
        ["Passant", "Gehen Sie hier geradeaus bis zur Ampel. Dann biegen Sie links ab.", "Go straight ahead to the traffic lights. Then turn left."],
        ["Touristin", "An der Ampel links. Und dann?", "Left at the lights. And then?"],
        ["Passant", "Dann gehen Sie über die Brücke. Das Museum ist direkt gegenüber vom Rathaus.", "Then go over the bridge. The museum is right opposite the town hall."],
        ["Touristin", "Ist das weit?", "Is it far?"],
        ["Passant", "Nein, das sind ungefähr zehn Minuten zu Fuß.", "No, it's about ten minutes on foot."],
        ["Touristin", "Vielen Dank!", "Thank you very much!"],
        ["Passant", "Gern geschehen!", "You're welcome!"]
      ],
      exercise: ["Wie komme ich {zum} Bahnhof? <span class=\"hint\">(zu + dem)</span>", "Gehen Sie {geradeaus}. <span class=\"hint\">(straight ahead)</span>",
        "Biegen Sie an der Ampel {links} ab. <span class=\"hint\">(left)</span>", "Es ist {gegenüber} vom Rathaus. <span class=\"hint\">(opposite)</span>",
        "Das sind fünf Minuten zu {Fuß}."]
    },
    {
      id: "telefon", icon: "📞", level: "A2", title: "On the phone", de: "Am Telefon",
      phrases: [
        ["Müller, guten Tag.", "Answering the phone: your surname + greeting."],
        ["Hier spricht … / Hier ist …", "This is … speaking."],
        ["Kann ich bitte mit Herrn Schulz sprechen?", "Can I speak to Mr Schulz, please?"],
        ["Einen Moment, bitte. Ich verbinde.", "One moment, please. I'll put you through."],
        ["Er ist gerade nicht da.", "He isn't here at the moment."],
        ["Kann ich etwas ausrichten?", "Can I take a message?"],
        ["Könnten Sie bitte zurückrufen?", "Could you call back, please?"],
        ["Wie ist Ihre Telefonnummer?", "What's your phone number?"],
        ["Könnten Sie das bitte buchstabieren?", "Could you spell that, please?"],
        ["Entschuldigung, ich habe Sie nicht verstanden.", "Sorry, I didn't understand you."],
        ["Könnten Sie bitte etwas langsamer sprechen?", "Could you speak a bit more slowly, please?"],
        ["Auf Wiederhören!", "Goodbye! (on the phone)"]
      ],
      dialogue: [
        ["Frau Weber", "Firma Schmidt, Sie sprechen mit Frau Weber. Was kann ich für Sie tun?", "Schmidt company, you're speaking to Ms Weber. What can I do for you?"],
        ["Herr Adeyemi", "Guten Tag, hier ist Adeyemi. Kann ich bitte mit Herrn Schulz sprechen?", "Hello, this is Adeyemi. Can I speak to Mr Schulz, please?"],
        ["Frau Weber", "Herr Schulz ist leider gerade in einer Besprechung. Kann ich etwas ausrichten?", "Unfortunately Mr Schulz is in a meeting right now. Can I take a message?"],
        ["Herr Adeyemi", "Ja, könnte er mich bitte zurückrufen? Es geht um meine Bestellung.", "Yes, could he call me back, please? It's about my order."],
        ["Frau Weber", "Natürlich. Könnten Sie Ihren Namen bitte buchstabieren?", "Of course. Could you spell your name, please?"],
        ["Herr Adeyemi", "A – D – E – Y – E – M – I.", "A – D – E – Y – E – M – I."],
        ["Frau Weber", "Danke. Und Ihre Telefonnummer?", "Thank you. And your phone number?"],
        ["Herr Adeyemi", "0176 23 45 67 89.", "0176 23 45 67 89."],
        ["Frau Weber", "Gut, ich sage ihm Bescheid. Auf Wiederhören!", "Fine, I'll let him know. Goodbye!"],
        ["Herr Adeyemi", "Vielen Dank, auf Wiederhören!", "Thanks a lot, goodbye!"]
      ],
      exercise: ["Kann ich bitte {mit} Herrn Schulz sprechen?", "Kann ich etwas {ausrichten}? <span class=\"hint\">(take a message)</span>",
        "Könnten Sie bitte {zurückrufen}? <span class=\"hint\">(call back)</span>", "Auf {Wiederhören}! <span class=\"hint\">(on the phone)</span>"]
    },
    {
      id: "wohnung", icon: "🏠", level: "A2–B1", title: "Looking for a flat", de: "Wohnung suchen",
      phrases: [
        ["Ist die Wohnung noch frei?", "Is the flat still available?"],
        ["Wie hoch ist die Miete?", "How high is the rent?"],
        ["Ist das die Kaltmiete oder die Warmmiete?", "Is that the rent without or with heating and bills?"],
        ["Wie hoch sind die Nebenkosten?", "How much are the additional costs (utilities)?"],
        ["Muss ich eine Kaution zahlen?", "Do I have to pay a deposit?"],
        ["Ab wann ist die Wohnung frei?", "From when is the flat available?"],
        ["Kann ich die Wohnung besichtigen?", "Can I view the flat?"],
        ["Gibt es einen Balkon / einen Aufzug?", "Is there a balcony / a lift?"],
        ["Sind Haustiere erlaubt?", "Are pets allowed?"],
        ["die Zweizimmerwohnung", "two-room flat (living room + bedroom)"],
        ["die WG (Wohngemeinschaft)", "flat share"],
        ["der Mietvertrag", "tenancy agreement"]
      ],
      dialogue: [
        ["Frau Brandt", "Brandt, guten Tag.", "Brandt, hello."],
        ["Ana", "Guten Tag, hier ist Ana Silva. Ich rufe wegen der Wohnung in der Lindenstraße an. Ist sie noch frei?", "Hello, this is Ana Silva. I'm calling about the flat in Lindenstraße. Is it still available?"],
        ["Frau Brandt", "Ja, die ist noch frei.", "Yes, it's still available."],
        ["Ana", "Wie hoch ist die Miete?", "How high is the rent?"],
        ["Frau Brandt", "750 Euro warm, also mit Nebenkosten. Die Kaution beträgt zwei Monatsmieten.", "750 euros including heating and bills. The deposit is two months' rent."],
        ["Ana", "Gibt es einen Balkon?", "Is there a balcony?"],
        ["Frau Brandt", "Ja, einen kleinen Balkon zum Hof.", "Yes, a small balcony facing the courtyard."],
        ["Ana", "Wunderbar. Kann ich die Wohnung besichtigen?", "Wonderful. Can I view the flat?"],
        ["Frau Brandt", "Gern. Passt es Ihnen am Donnerstag um 18 Uhr?", "Sure. Does Thursday at 6 p.m. suit you?"],
        ["Ana", "Ja, das passt gut. Vielen Dank!", "Yes, that suits me fine. Thank you very much!"]
      ],
      exercise: ["Ist die Wohnung noch {frei}?", "Wie hoch ist die {Miete}?", "Kann ich die Wohnung {besichtigen}? <span class=\"hint\">(view)</span>",
        "Muss ich eine {Kaution} zahlen? <span class=\"hint\">(deposit)</span>", "Sind {Haustiere} erlaubt? <span class=\"hint\">(pets)</span>"]
    },
    {
      id: "amt", icon: "🏛", level: "A2–B1", title: "At the authorities", de: "Auf dem Amt",
      phrases: [
        ["Ich möchte mich anmelden.", "I'd like to register my address."],
        ["Ich habe einen Termin um 10 Uhr.", "I have an appointment at 10."],
        ["Welche Unterlagen brauche ich?", "Which documents do I need?"],
        ["Hier sind mein Pass und die Wohnungsgeberbestätigung.", "Here are my passport and the landlord's confirmation."],
        ["Füllen Sie bitte dieses Formular aus.", "Please fill in this form."],
        ["Wo muss ich unterschreiben?", "Where do I have to sign?"],
        ["Ziehen Sie bitte eine Nummer.", "Please take a number."],
        ["Ich möchte ein Konto eröffnen.", "I'd like to open an account."],
        ["die Meldebescheinigung", "certificate of registration"],
        ["die Aufenthaltserlaubnis", "residence permit"],
        ["die Steuer-ID", "tax ID number"]
      ],
      dialogue: [
        ["Sachbearbeiter", "Guten Tag. Was kann ich für Sie tun?", "Hello. What can I do for you?"],
        ["Frau Ivanova", "Guten Tag, ich möchte mich anmelden. Ich bin letzte Woche nach Köln gezogen.", "Hello, I'd like to register. I moved to Cologne last week."],
        ["Sachbearbeiter", "Haben Sie Ihren Pass und die Wohnungsgeberbestätigung dabei?", "Do you have your passport and the landlord's confirmation with you?"],
        ["Frau Ivanova", "Ja, hier bitte.", "Yes, here you are."],
        ["Sachbearbeiter", "Danke. Füllen Sie bitte noch dieses Formular aus und unterschreiben Sie hier unten.", "Thank you. Please fill in this form as well and sign down here."],
        ["Frau Ivanova", "Bekomme ich eine Bestätigung?", "Do I get a confirmation?"],
        ["Sachbearbeiter", "Ja, hier ist Ihre Meldebescheinigung. Die Steuer-ID bekommen Sie in ein paar Wochen per Post.", "Yes, here's your certificate of registration. You'll get your tax ID by post in a few weeks."],
        ["Frau Ivanova", "Vielen Dank für Ihre Hilfe!", "Thank you for your help!"]
      ],
      exercise: ["Ich möchte mich {anmelden}. <span class=\"hint\">(register)</span>", "Welche {Unterlagen} brauche ich? <span class=\"hint\">(documents)</span>",
        "Füllen Sie bitte dieses Formular {aus}.", "Wo muss ich {unterschreiben}? <span class=\"hint\">(sign)</span>"]
    },
    {
      id: "job", icon: "💼", level: "B1", title: "Job interview", de: "Das Vorstellungsgespräch",
      phrases: [
        ["Vielen Dank für die Einladung.", "Thank you for the invitation."],
        ["Erzählen Sie etwas über sich.", "Tell us something about yourself."],
        ["Ich habe Informatik studiert.", "I studied computer science."],
        ["Ich habe drei Jahre Berufserfahrung als …", "I have three years of professional experience as …"],
        ["Meine Stärken sind …", "My strengths are …"],
        ["Ich arbeite gern im Team.", "I like working in a team."],
        ["Warum möchten Sie bei uns arbeiten?", "Why would you like to work for us?"],
        ["Mich interessiert besonders …", "I'm particularly interested in …"],
        ["Wann könnten Sie anfangen?", "When could you start?"],
        ["Ich hätte noch eine Frage: …", "I have one more question: …"],
        ["Wie sieht ein typischer Arbeitstag aus?", "What does a typical working day look like?"],
        ["Ich freue mich auf Ihre Rückmeldung.", "I look forward to hearing from you."]
      ],
      dialogue: [
        ["Frau Lang", "Herzlich willkommen, Herr Nowak! Bitte erzählen Sie uns etwas über sich.", "Welcome, Mr Nowak! Please tell us something about yourself."],
        ["Herr Nowak", "Gern. Ich habe in Krakau Informatik studiert und arbeite seit drei Jahren als Softwareentwickler.", "Of course. I studied computer science in Kraków and have been working as a software developer for three years."],
        ["Frau Lang", "Warum möchten Sie bei uns arbeiten?", "Why would you like to work for us?"],
        ["Herr Nowak", "Mich interessieren besonders Ihre Projekte im Bereich Energie. Außerdem möchte ich mein Deutsch verbessern.", "I'm particularly interested in your energy projects. Also, I'd like to improve my German."],
        ["Frau Lang", "Was sind Ihre Stärken?", "What are your strengths?"],
        ["Herr Nowak", "Ich bin zuverlässig, lerne schnell und arbeite gern im Team.", "I'm reliable, I learn quickly and I like working in a team."],
        ["Frau Lang", "Wann könnten Sie anfangen?", "When could you start?"],
        ["Herr Nowak", "Ab dem ersten März. Ich hätte noch eine Frage: Kann man auch im Homeoffice arbeiten?", "From the first of March. I have one more question: is it possible to work from home?"],
        ["Frau Lang", "Ja, zwei Tage pro Woche. Wir melden uns nächste Woche bei Ihnen.", "Yes, two days a week. We'll get back to you next week."]
      ],
      exercise: ["Vielen Dank für die {Einladung}.", "Ich arbeite gern im {Team}.", "Wann {könnten} Sie anfangen? <span class=\"hint\">(could)</span>",
        "Ich habe drei Jahre {Berufserfahrung}. <span class=\"hint\">(work experience)</span>", "Ich freue mich {auf} Ihre Rückmeldung."]
    },
    {
      id: "emails", icon: "✉️", level: "A2–B1", title: "Emails & letters", de: "E-Mails und Briefe",
      phrases: [
        ["Sehr geehrte Frau Weber, / Sehr geehrter Herr Weber,", "Dear Ms / Mr Weber, (formal)"],
        ["Sehr geehrte Damen und Herren,", "Dear Sir or Madam, (formal, name unknown)"],
        ["Liebe Anna, / Lieber Tom,", "Dear Anna, / Dear Tom, (informal)"],
        ["Hallo Anna,", "Hi Anna,"],
        ["vielen Dank für Ihre E-Mail.", "thank you for your email. (lower case after the comma!)"],
        ["ich schreibe Ihnen, weil …", "I'm writing to you because …"],
        ["Ich möchte mich über … beschweren.", "I'd like to complain about …"],
        ["Ich interessiere mich für die Stelle als …", "I'm interested in the position as …"],
        ["Könnten Sie mir bitte mitteilen, ob …", "Could you please let me know whether …"],
        ["Im Anhang finden Sie …", "Please find attached …"],
        ["Ich freue mich auf Ihre Antwort.", "I look forward to your reply."],
        ["Mit freundlichen Grüßen", "Kind regards (formal)"],
        ["Viele Grüße / Liebe Grüße", "Best wishes / Love (informal)"]
      ],
      model: "A formal complaint",
      dialogue: [
        ["", "Sehr geehrte Damen und Herren,", "Dear Sir or Madam,"],
        ["", "am 3. Mai habe ich bei Ihnen einen Wasserkocher bestellt (Bestellnummer 48213). Leider ist das Gerät defekt angekommen.", "On 3 May I ordered a kettle from you (order number 48213). Unfortunately the appliance arrived faulty."],
        ["", "Ich möchte Sie bitten, mir ein neues Gerät zu schicken oder den Kaufpreis zu erstatten. Im Anhang finden Sie ein Foto des Schadens.", "I would like to ask you to send me a new appliance or refund the purchase price. Please find attached a photo of the damage."],
        ["", "Ich freue mich auf Ihre Antwort.", "I look forward to your reply."],
        ["", "Mit freundlichen Grüßen", "Kind regards"],
        ["", "Maria Costa", "Maria Costa"]
      ],
      exercise: ["Sehr {geehrte} Damen und Herren,", "{Im} Anhang finden Sie meinen Lebenslauf.", "Ich freue mich auf Ihre {Antwort}.",
        "Mit freundlichen {Grüßen}", "Informal: Viele {Grüße}"]
    }
  ];

  var section = document.getElementById("situations");
  if (!section) return;
  var listEl = document.getElementById("sitList");
  var panelsEl = document.getElementById("sitPanels");
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
  function speak(text, onend) {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/…/g, ""));
    u.lang = "de-DE";
    u.rate = 0.9;
    if (onend) u.onend = onend;
    window.speechSynthesis.speak(u);
  }
  function speakBtn(text) {
    var b = el("button", "speak", "🔊");
    b.type = "button";
    b.title = "Listen";
    b.setAttribute("aria-label", "Listen: " + text);
    b.addEventListener("click", function () { speak(text); });
    return b;
  }
  function blank(m, body) {
    var first = body.split("|")[0];
    return '<input' + (first.length <= 3 ? ' class="short"' : "") + ' data-answer="' + esc(body) + '">';
  }

  var panels = {};
  S.forEach(function (s) {
    // card in the overview
    var card = el("a", "card sit-card");
    card.href = "#situations?s=" + s.id;
    card.appendChild(el("div", "sit-icon", s.icon));
    var h = el("h4");
    h.appendChild(el("span", null, s.title));
    h.appendChild(el("span", "lvl", s.level));
    card.appendChild(h);
    card.appendChild(el("p", null, s.de));
    listEl.appendChild(card);

    // the panel
    var p = el("article", "sit-panel");
    p.id = "sit-" + s.id;
    p.hidden = true;
    var back = el("a", "reader-back", "← All situations");
    back.href = "#situations";
    p.appendChild(back);
    var head = el("div", "reader-head");
    head.appendChild(el("h2", "reader-title", s.icon + " " + s.de));
    head.appendChild(el("span", "lvl", s.level));
    p.appendChild(head);
    p.appendChild(el("p", "subtitle sit-sub", s.title));

    p.appendChild(el("h3", null, "Key phrases"));
    var wrap = el("div", "table-wrap");
    var table = el("table");
    var tb = el("tbody");
    s.phrases.forEach(function (ph) {
      var tr = el("tr");
      var td1 = el("td", "sit-de", ph[0]);
      if (canSpeak) td1.appendChild(speakBtn(ph[0]));
      tr.appendChild(td1);
      tr.appendChild(el("td", null, ph[1]));
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    wrap.appendChild(table);
    p.appendChild(wrap);

    var dh = el("div", "sit-dialogue-head");
    dh.appendChild(el("h3", null, s.model ? "Model text: " + s.model : "Dialogue"));
    var tBtn = el("button", "chip filter", "🇬🇧 Show translation");
    tBtn.type = "button";
    dh.appendChild(tBtn);
    var playBtn = null;
    if (canSpeak) {
      playBtn = el("button", "chip filter", "▶ Play all");
      playBtn.type = "button";
      dh.appendChild(playBtn);
    }
    p.appendChild(dh);
    var dlg = el("div", "sit-dialogue" + (s.model ? " is-letter" : ""));
    s.dialogue.forEach(function (line) {
      var row = el("div", "sit-line");
      if (line[0]) row.appendChild(el("span", "sit-speaker", line[0] + ":"));
      var txt = el("span", "sit-text", line[1]);
      row.appendChild(txt);
      if (canSpeak) row.appendChild(speakBtn(line[1]));
      var en = el("span", "sit-en", line[2]);
      en.hidden = true;
      row.appendChild(en);
      dlg.appendChild(row);
    });
    p.appendChild(dlg);
    tBtn.addEventListener("click", function () {
      var show = !tBtn.classList.contains("on");
      tBtn.classList.toggle("on", show);
      dlg.querySelectorAll(".sit-en").forEach(function (e) { e.hidden = !show; });
    });
    if (playBtn) playBtn.addEventListener("click", function () {
      if (playBtn.classList.contains("on")) { window.speechSynthesis.cancel(); playBtn.classList.remove("on"); return; }
      var i = 0;
      playBtn.classList.add("on");
      var rows = dlg.querySelectorAll(".sit-line");
      (function nextLine() {
        rows.forEach(function (r) { r.classList.remove("playing"); });
        if (i >= s.dialogue.length || !playBtn.classList.contains("on")) { playBtn.classList.remove("on"); return; }
        rows[i].classList.add("playing");
        speak(s.dialogue[i][1], function () { i++; setTimeout(nextLine, 350); });
      })();
    });

    var q = el("div", "quiz");
    q.innerHTML = "<h3>Practice</h3><ol>" + s.exercise.map(function (item) {
      return "<li>" + item.replace(/\{([^}]*)\}/g, blank) + "</li>";
    }).join("") + "</ol>";
    p.appendChild(q);

    panelsEl.appendChild(p);
    panels[s.id] = p;
  });

  function route() {
    var m = /^#situations\?s=([\w-]+)/.exec(location.hash);
    var id = m && panels[m[1]] ? m[1] : null;
    listEl.hidden = !!id;
    document.getElementById("sitIntro").hidden = !!id;
    Object.keys(panels).forEach(function (k) { panels[k].hidden = k !== id; });
    if (canSpeak && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  }
  window.addEventListener("hashchange", route);
  route();
})();
