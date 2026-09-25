/*
 * Wörterbuch data + UI.
 *
 * Line formats (fields separated by "|"):
 *   noun:  article + noun | plural ("—" = no plural, "Pl." = plural only) | English
 *   verb:  infinitive | er/sie/es form | Präteritum | Perfekt | English
 *   other: word | English
 */
(function () {
  "use strict";

  var DATA = [
    { theme: "People & Family", type: "noun", words: `
der Mensch|die Menschen|person, human being
die Person|die Personen|person
der Mann|die Männer|man; husband
die Frau|die Frauen|woman; wife; Mrs
das Kind|die Kinder|child
der Junge|die Jungen|boy
das Mädchen|die Mädchen|girl
das Baby|die Babys|baby
die Familie|die Familien|family
die Eltern|Pl.|parents
der Vater|die Väter|father
die Mutter|die Mütter|mother
der Sohn|die Söhne|son
die Tochter|die Töchter|daughter
der Bruder|die Brüder|brother
die Schwester|die Schwestern|sister
die Geschwister|Pl.|siblings
der Großvater|die Großväter|grandfather
die Großmutter|die Großmütter|grandmother
die Großeltern|Pl.|grandparents
der Onkel|die Onkel|uncle
die Tante|die Tanten|aunt
der Cousin|die Cousins|cousin (male)
die Cousine|die Cousinen|cousin (female)
der Freund|die Freunde|friend; boyfriend
die Freundin|die Freundinnen|friend; girlfriend
der Nachbar|die Nachbarn|neighbour
der Kollege|die Kollegen|colleague
der Chef|die Chefs|boss
der Gast|die Gäste|guest
der Herr|die Herren|gentleman; Mr
der Name|die Namen|name
das Alter|—|age
der Geburtstag|die Geburtstage|birthday
die Hochzeit|die Hochzeiten|wedding` },

    { theme: "Body & Health", type: "noun", words: `
der Körper|die Körper|body
der Kopf|die Köpfe|head
das Gesicht|die Gesichter|face
das Auge|die Augen|eye
das Ohr|die Ohren|ear
die Nase|die Nasen|nose
der Mund|die Münder|mouth
der Zahn|die Zähne|tooth
das Haar|die Haare|hair
der Hals|die Hälse|neck; throat
die Schulter|die Schultern|shoulder
der Arm|die Arme|arm
die Hand|die Hände|hand
der Finger|die Finger|finger
der Bauch|die Bäuche|belly, stomach
der Rücken|die Rücken|back
das Bein|die Beine|leg
das Knie|die Knie|knee
der Fuß|die Füße|foot
das Herz|die Herzen|heart
die Gesundheit|—|health
die Krankheit|die Krankheiten|illness
der Schmerz|die Schmerzen|pain
das Fieber|—|fever
die Erkältung|die Erkältungen|cold (illness)
der Arzt|die Ärzte|doctor
die Ärztin|die Ärztinnen|doctor (female)
das Krankenhaus|die Krankenhäuser|hospital
die Apotheke|die Apotheken|pharmacy
das Medikament|die Medikamente|medicine
der Termin|die Termine|appointment` },

    { theme: "Food & Drink", type: "noun", words: `
das Essen|—|food; meal
das Getränk|die Getränke|drink
das Frühstück|die Frühstücke|breakfast
das Mittagessen|die Mittagessen|lunch
das Abendessen|die Abendessen|dinner
das Brot|die Brote|bread
das Brötchen|die Brötchen|bread roll
die Butter|—|butter
der Käse|die Käse|cheese
die Wurst|die Würste|sausage
das Fleisch|—|meat
das Hähnchen|die Hähnchen|chicken
der Fisch|die Fische|fish
das Ei|die Eier|egg
die Milch|—|milk
der Kaffee|die Kaffees|coffee
der Tee|die Tees|tea
das Wasser|—|water
der Saft|die Säfte|juice
das Bier|die Biere|beer
der Wein|die Weine|wine
der Zucker|—|sugar
das Salz|—|salt
der Pfeffer|—|pepper
der Reis|—|rice
die Nudel|die Nudeln|noodle; (pl.) pasta
die Kartoffel|die Kartoffeln|potato
das Gemüse|—|vegetables
das Obst|—|fruit
der Apfel|die Äpfel|apple
die Banane|die Bananen|banana
die Orange|die Orangen|orange
die Tomate|die Tomaten|tomato
die Zwiebel|die Zwiebeln|onion
der Salat|die Salate|salad; lettuce
die Suppe|die Suppen|soup
der Kuchen|die Kuchen|cake
die Schokolade|die Schokoladen|chocolate
das Restaurant|die Restaurants|restaurant
die Speisekarte|die Speisekarten|menu
die Rechnung|die Rechnungen|bill; invoice
der Hunger|—|hunger
der Durst|—|thirst` },

    { theme: "Home", type: "noun", words: `
das Haus|die Häuser|house
die Wohnung|die Wohnungen|flat, apartment
das Zimmer|die Zimmer|room
die Küche|die Küchen|kitchen
das Bad|die Bäder|bathroom; bath
das Schlafzimmer|die Schlafzimmer|bedroom
das Wohnzimmer|die Wohnzimmer|living room
der Flur|die Flure|hallway
der Balkon|die Balkone|balcony
der Garten|die Gärten|garden
die Tür|die Türen|door
das Fenster|die Fenster|window
die Treppe|die Treppen|stairs
der Tisch|die Tische|table
der Stuhl|die Stühle|chair
das Sofa|die Sofas|sofa
das Bett|die Betten|bed
der Schrank|die Schränke|cupboard, wardrobe
das Regal|die Regale|shelf
die Lampe|die Lampen|lamp
der Kühlschrank|die Kühlschränke|fridge
der Herd|die Herde|stove, cooker
die Waschmaschine|die Waschmaschinen|washing machine
der Schlüssel|die Schlüssel|key
die Miete|die Mieten|rent
der Teller|die Teller|plate
die Tasse|die Tassen|cup
das Glas|die Gläser|glass
die Gabel|die Gabeln|fork
das Messer|die Messer|knife
der Löffel|die Löffel|spoon` },

    { theme: "Time", type: "noun", words: `
die Zeit|die Zeiten|time
die Sekunde|die Sekunden|second
die Minute|die Minuten|minute
die Stunde|die Stunden|hour
die Uhr|die Uhren|clock, watch; o'clock
der Tag|die Tage|day
die Woche|die Wochen|week
der Monat|die Monate|month
das Jahr|die Jahre|year
der Morgen|die Morgen|morning
der Vormittag|die Vormittage|late morning
der Mittag|die Mittage|noon, midday
der Nachmittag|die Nachmittage|afternoon
der Abend|die Abende|evening
die Nacht|die Nächte|night
das Wochenende|die Wochenenden|weekend
der Montag|die Montage|Monday
der Dienstag|die Dienstage|Tuesday
der Mittwoch|die Mittwoche|Wednesday
der Donnerstag|die Donnerstage|Thursday
der Freitag|die Freitage|Friday
der Samstag|die Samstage|Saturday
der Sonntag|die Sonntage|Sunday
der Januar|—|January
der Februar|—|February
der März|—|March
der April|—|April
der Mai|—|May
der Juni|—|June
der Juli|—|July
der August|—|August
der September|—|September
der Oktober|—|October
der November|—|November
der Dezember|—|December
der Frühling|—|spring
der Sommer|—|summer
der Herbst|—|autumn, fall
der Winter|—|winter
der Urlaub|die Urlaube|holiday, vacation
die Ferien|Pl.|(school) holidays
der Feiertag|die Feiertage|public holiday` },

    { theme: "Time words", type: "word", words: `
heute|today
morgen|tomorrow
gestern|yesterday
übermorgen|the day after tomorrow
vorgestern|the day before yesterday
jetzt|now
bald|soon
später|later
früher|earlier; formerly
immer|always
oft|often
manchmal|sometimes
selten|rarely
nie|never
schon|already
noch|still; yet
gleich|in a moment; same
sofort|immediately
danach|afterwards
vorher|before(hand)
täglich|daily
morgens|in the morning(s)
abends|in the evening(s)` },

    { theme: "Town & Travel", type: "noun", words: `
die Stadt|die Städte|city, town
das Dorf|die Dörfer|village
das Land|die Länder|country; countryside
die Straße|die Straßen|street, road
der Platz|die Plätze|square; place; seat
die Brücke|die Brücken|bridge
der Park|die Parks|park
die Kirche|die Kirchen|church
das Museum|die Museen|museum
das Kino|die Kinos|cinema
das Theater|die Theater|theatre
das Geschäft|die Geschäfte|shop; business
der Supermarkt|die Supermärkte|supermarket
der Markt|die Märkte|market
die Bank|die Banken|bank
die Post|—|post office; mail
das Hotel|die Hotels|hotel
der Bahnhof|die Bahnhöfe|train station
der Flughafen|die Flughäfen|airport
die Haltestelle|die Haltestellen|(bus/tram) stop
der Zug|die Züge|train
der Bus|die Busse|bus
die U-Bahn|die U-Bahnen|underground, subway
die Straßenbahn|die Straßenbahnen|tram
das Auto|die Autos|car
das Fahrrad|die Fahrräder|bicycle
das Flugzeug|die Flugzeuge|aeroplane
das Schiff|die Schiffe|ship
das Taxi|die Taxis|taxi
die Fahrkarte|die Fahrkarten|ticket (transport)
der Koffer|die Koffer|suitcase
der Pass|die Pässe|passport
die Reise|die Reisen|journey, trip
der Weg|die Wege|way, path
die Ampel|die Ampeln|traffic light
die Polizei|—|police` },

    { theme: "Work & School", type: "noun", words: `
die Arbeit|die Arbeiten|work; job
der Beruf|die Berufe|profession, job
die Firma|die Firmen|company
das Büro|die Büros|office
der Computer|die Computer|computer
das Handy|die Handys|mobile phone
die E-Mail|die E-Mails|email
der Brief|die Briefe|letter
das Geld|—|money
das Gehalt|die Gehälter|salary
die Besprechung|die Besprechungen|meeting
die Schule|die Schulen|school
die Universität|die Universitäten|university
der Lehrer|die Lehrer|teacher
die Lehrerin|die Lehrerinnen|teacher (female)
der Schüler|die Schüler|pupil
der Student|die Studenten|student
die Klasse|die Klassen|class
der Kurs|die Kurse|course
die Prüfung|die Prüfungen|exam
die Hausaufgabe|die Hausaufgaben|homework
die Frage|die Fragen|question
die Antwort|die Antworten|answer
das Buch|die Bücher|book
das Heft|die Hefte|exercise book
der Stift|die Stifte|pen, pencil
das Papier|die Papiere|paper
die Sprache|die Sprachen|language
das Wort|die Wörter|word
der Satz|die Sätze|sentence
der Fehler|die Fehler|mistake
die Zeitung|die Zeitungen|newspaper` },

    { theme: "Nature & Weather", type: "noun", words: `
die Natur|—|nature
das Wetter|—|weather
die Sonne|—|sun
der Regen|—|rain
der Schnee|—|snow
der Wind|die Winde|wind
die Wolke|die Wolken|cloud
der Himmel|die Himmel|sky; heaven
die Temperatur|die Temperaturen|temperature
der Baum|die Bäume|tree
die Blume|die Blumen|flower
das Gras|die Gräser|grass
der Wald|die Wälder|forest
der Berg|die Berge|mountain
der See|die Seen|lake
das Meer|die Meere|sea
der Fluss|die Flüsse|river
der Strand|die Strände|beach
die Welt|die Welten|world
das Tier|die Tiere|animal
der Hund|die Hunde|dog
die Katze|die Katzen|cat
das Pferd|die Pferde|horse
die Kuh|die Kühe|cow
der Vogel|die Vögel|bird
die Maus|die Mäuse|mouse` },

    { theme: "Clothes", type: "noun", words: `
die Kleidung|—|clothing
das Kleid|die Kleider|dress
die Hose|die Hosen|trousers
der Rock|die Röcke|skirt
das Hemd|die Hemden|shirt
die Bluse|die Blusen|blouse
das T-Shirt|die T-Shirts|T-shirt
der Pullover|die Pullover|jumper, sweater
die Jacke|die Jacken|jacket
der Mantel|die Mäntel|coat
der Schuh|die Schuhe|shoe
die Socke|die Socken|sock
der Hut|die Hüte|hat
die Mütze|die Mützen|cap, woolly hat
der Schal|die Schals|scarf
die Tasche|die Taschen|bag; pocket
die Brille|die Brillen|glasses` },

    { theme: "Verbs", type: "verb", words: `
sein|ist|war|ist gewesen|to be
haben|hat|hatte|hat gehabt|to have
werden|wird|wurde|ist geworden|to become
können|kann|konnte|hat gekonnt|can, to be able to
müssen|muss|musste|hat gemusst|must, to have to
wollen|will|wollte|hat gewollt|to want
dürfen|darf|durfte|hat gedurft|may, to be allowed to
sollen|soll|sollte|hat gesollt|should, to be supposed to
mögen|mag|mochte|hat gemocht|to like
machen|macht|machte|hat gemacht|to make, to do
tun|tut|tat|hat getan|to do
gehen|geht|ging|ist gegangen|to go, to walk
kommen|kommt|kam|ist gekommen|to come
fahren|fährt|fuhr|ist gefahren|to drive, to go (by vehicle)
fliegen|fliegt|flog|ist geflogen|to fly
laufen|läuft|lief|ist gelaufen|to run; to walk
bleiben|bleibt|blieb|ist geblieben|to stay
reisen|reist|reiste|ist gereist|to travel
schwimmen|schwimmt|schwamm|ist geschwommen|to swim
sehen|sieht|sah|hat gesehen|to see
hören|hört|hörte|hat gehört|to hear
sagen|sagt|sagte|hat gesagt|to say
sprechen|spricht|sprach|hat gesprochen|to speak
erzählen|erzählt|erzählte|hat erzählt|to tell (a story)
fragen|fragt|fragte|hat gefragt|to ask
antworten|antwortet|antwortete|hat geantwortet|to answer
erklären|erklärt|erklärte|hat erklärt|to explain
rufen|ruft|rief|hat gerufen|to call, to shout
geben|gibt|gab|hat gegeben|to give
nehmen|nimmt|nahm|hat genommen|to take
bringen|bringt|brachte|hat gebracht|to bring
bekommen|bekommt|bekam|hat bekommen|to get, to receive
zeigen|zeigt|zeigte|hat gezeigt|to show
essen|isst|aß|hat gegessen|to eat
trinken|trinkt|trank|hat getrunken|to drink
kochen|kocht|kochte|hat gekocht|to cook
schlafen|schläft|schlief|hat geschlafen|to sleep
wohnen|wohnt|wohnte|hat gewohnt|to live, to reside
leben|lebt|lebte|hat gelebt|to live, to be alive
arbeiten|arbeitet|arbeitete|hat gearbeitet|to work
lernen|lernt|lernte|hat gelernt|to learn, to study
studieren|studiert|studierte|hat studiert|to study (at university)
lesen|liest|las|hat gelesen|to read
schreiben|schreibt|schrieb|hat geschrieben|to write
spielen|spielt|spielte|hat gespielt|to play
kaufen|kauft|kaufte|hat gekauft|to buy
verkaufen|verkauft|verkaufte|hat verkauft|to sell
bezahlen|bezahlt|bezahlte|hat bezahlt|to pay
kosten|kostet|kostete|hat gekostet|to cost
brauchen|braucht|brauchte|hat gebraucht|to need
benutzen|benutzt|benutzte|hat benutzt|to use
finden|findet|fand|hat gefunden|to find; to think (opinion)
suchen|sucht|suchte|hat gesucht|to look for
verlieren|verliert|verlor|hat verloren|to lose
gewinnen|gewinnt|gewann|hat gewonnen|to win
denken|denkt|dachte|hat gedacht|to think
wissen|weiß|wusste|hat gewusst|to know (a fact)
kennen|kennt|kannte|hat gekannt|to know (be familiar with)
verstehen|versteht|verstand|hat verstanden|to understand
glauben|glaubt|glaubte|hat geglaubt|to believe
vergessen|vergisst|vergaß|hat vergessen|to forget
versuchen|versucht|versuchte|hat versucht|to try
helfen|hilft|half|hat geholfen|to help
lieben|liebt|liebte|hat geliebt|to love
warten|wartet|wartete|hat gewartet|to wait
öffnen|öffnet|öffnete|hat geöffnet|to open
schließen|schließt|schloss|hat geschlossen|to close
beginnen|beginnt|begann|hat begonnen|to begin
treffen|trifft|traf|hat getroffen|to meet
besuchen|besucht|besuchte|hat besucht|to visit
tragen|trägt|trug|hat getragen|to carry; to wear
waschen|wäscht|wusch|hat gewaschen|to wash
sitzen|sitzt|saß|hat gesessen|to sit
stehen|steht|stand|hat gestanden|to stand
liegen|liegt|lag|hat gelegen|to lie (be lying)
legen|legt|legte|hat gelegt|to lay, to put (flat)
stellen|stellt|stellte|hat gestellt|to put (upright)
setzen|setzt|setzte|hat gesetzt|to set, to put
lassen|lässt|ließ|hat gelassen|to let; to leave
heißen|heißt|hieß|hat geheißen|to be called
gefallen|gefällt|gefiel|hat gefallen|to please (be liked by)
gehören|gehört|gehörte|hat gehört|to belong to
tanzen|tanzt|tanzte|hat getanzt|to dance
singen|singt|sang|hat gesungen|to sing
lachen|lacht|lachte|hat gelacht|to laugh
weinen|weint|weinte|hat geweint|to cry
passieren|passiert|passierte|ist passiert|to happen
sterben|stirbt|starb|ist gestorben|to die
anfangen|fängt an|fing an|hat angefangen|to start
aufhören|hört auf|hörte auf|hat aufgehört|to stop
aufstehen|steht auf|stand auf|ist aufgestanden|to get up
einkaufen|kauft ein|kaufte ein|hat eingekauft|to go shopping
anrufen|ruft an|rief an|hat angerufen|to call (on the phone)
mitkommen|kommt mit|kam mit|ist mitgekommen|to come along
fernsehen|sieht fern|sah fern|hat ferngesehen|to watch TV
ankommen|kommt an|kam an|ist angekommen|to arrive
abfahren|fährt ab|fuhr ab|ist abgefahren|to depart
einsteigen|steigt ein|stieg ein|ist eingestiegen|to get on/in
aussteigen|steigt aus|stieg aus|ist ausgestiegen|to get off/out
umsteigen|steigt um|stieg um|ist umgestiegen|to change (trains etc.)
sich freuen|freut sich|freute sich|hat sich gefreut|to be happy/glad
sich fühlen|fühlt sich|fühlte sich|hat sich gefühlt|to feel
sich erinnern|erinnert sich|erinnerte sich|hat sich erinnert|to remember` },

    { theme: "Adjectives", type: "word", words: `
gut|good
schlecht|bad
groß|big; tall
klein|small; short
alt|old
jung|young
neu|new
lang|long
kurz|short
hoch|high
tief|deep
schnell|fast
langsam|slow
teuer|expensive
billig|cheap
günstig|good value, inexpensive
schön|beautiful, nice
hässlich|ugly
warm|warm
kalt|cold
heiß|hot
kühl|cool
hell|bright, light
dunkel|dark
leicht|easy; light (weight)
schwer|difficult; heavy
einfach|simple, easy
schwierig|difficult
richtig|right, correct
falsch|wrong
voll|full
leer|empty
offen|open
geschlossen|closed
laut|loud
leise|quiet (sound)
ruhig|calm, quiet
früh|early
spät|late
nah|near
weit|far; wide
wichtig|important
interessant|interesting
langweilig|boring
lustig|funny
ernst|serious
nett|nice, kind
freundlich|friendly
glücklich|happy
traurig|sad
müde|tired
krank|ill, sick
gesund|healthy
reich|rich
arm|poor
stark|strong
schwach|weak
dick|fat; thick
dünn|thin
sauber|clean
schmutzig|dirty
fertig|finished, ready
frei|free; vacant
besetzt|occupied, taken
möglich|possible
sicher|safe; sure
gefährlich|dangerous
lecker|tasty, delicious
süß|sweet
sauer|sour; annoyed (colloq.)
salzig|salty
scharf|spicy; sharp` },

    { theme: "Colours", type: "word", words: `
rot|red
blau|blue
grün|green
gelb|yellow
schwarz|black
weiß|white
grau|grey
braun|brown
orange|orange
rosa|pink
lila|purple
bunt|colourful` },

    { theme: "Small words", type: "word", words: `
und|and
oder|or
aber|but
denn|because (main clause)
weil|because (verb at end)
dass|that
wenn|if; when(ever)
als|when (past); than
ob|whether, if
auch|also, too
nur|only
sehr|very
viel|much, a lot
wenig|little, few
mehr|more
alle|all, everyone
etwas|something; a bit
nichts|nothing
jemand|somebody
niemand|nobody
hier|here
dort|there
oben|up, above; upstairs
unten|down, below; downstairs
links|(on the) left
rechts|(on the) right
geradeaus|straight ahead
ja|yes
nein|no
nicht|not
vielleicht|maybe, perhaps
natürlich|of course; natural
wirklich|really
genau|exactly
zusammen|together
allein|alone
wieder|again
zu|too; to; closed
ganz|quite; whole
fast|almost
ungefähr|about, approximately
gern|gladly (with verb: to like doing)
leider|unfortunately
zum Beispiel|for example` },

    { theme: "Phrases", type: "word", words: `
Hallo!|Hello!
Guten Morgen!|Good morning!
Guten Tag!|Hello! / Good day!
Guten Abend!|Good evening!
Gute Nacht!|Good night!
Tschüss!|Bye!
Auf Wiedersehen!|Goodbye! (formal)
Bis bald!|See you soon!
Bis morgen!|See you tomorrow!
Wie geht's?|How are you?
Wie geht es Ihnen?|How are you? (formal)
Mir geht es gut.|I'm fine.
Danke!|Thanks!
Vielen Dank!|Thank you very much!
Bitte!|Please! / You're welcome!
Bitte schön!|Here you are! / You're welcome!
Entschuldigung!|Excuse me! / Sorry!
Es tut mir leid.|I'm sorry.
Kein Problem.|No problem.
Das macht nichts.|It doesn't matter.
Wie bitte?|Pardon?
Ich verstehe das nicht.|I don't understand.
Können Sie das bitte wiederholen?|Could you repeat that, please?
Sprechen Sie Englisch?|Do you speak English?
Wie sagt man das auf Deutsch?|How do you say that in German?
Ich heiße …|My name is …
Woher kommen Sie?|Where are you from? (formal)
Ich komme aus …|I come from …
Wie spät ist es?|What time is it?
Was kostet das?|How much is that?
Ich hätte gern …|I would like …
Die Rechnung, bitte.|The bill, please.
Wo ist die Toilette?|Where is the toilet?
Guten Appetit!|Enjoy your meal!
Prost!|Cheers!
Viel Glück!|Good luck!
Alles Gute!|All the best!
Herzlichen Glückwunsch!|Congratulations!
Gute Besserung!|Get well soon!
Schönes Wochenende!|Have a nice weekend!
Keine Ahnung.|No idea.
Na klar!|Sure! / Of course!` }
  ];

  // ---------- Parse ----------
  var GENDER = { der: "m", die: "f", das: "n" };
  var entries = [];
  DATA.forEach(function (group) {
    group.words.split("\n").forEach(function (line) {
      line = line.trim();
      if (!line) return;
      var f = line.split("|");
      var e = { theme: group.theme, type: group.type };
      if (group.type === "noun") {
        var sp = f[0].indexOf(" ");
        e.article = f[0].slice(0, sp);
        e.word = f[0].slice(sp + 1);
        e.gender = f[1] === "Pl." ? "p" : GENDER[e.article];
        e.forms = f[1] === "Pl." ? "plural only" : f[1] === "—" ? "no plural" : f[1];
        e.en = f[2];
        e.de = f[0];
      } else if (group.type === "verb") {
        e.word = e.de = f[0];
        e.forms = f[1] + " · " + f[2] + " · " + f[3];
        e.en = f[4];
      } else {
        e.word = e.de = f[0];
        e.en = f[1];
      }
      e.key = norm(e.de + " " + (e.forms || "") + " " + e.en);
      entries.push(e);
    });
  });

  function norm(s) {
    return s.toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  // Shared with the practice trainer.
  window.WOERTERBUCH = entries;

  // ---------- UI ----------
  var root = document.getElementById("dict");
  if (!root) return;

  var input = document.getElementById("dictSearch");
  var chipsEl = document.getElementById("dictThemes");
  var tbody = document.getElementById("dictBody");
  var countEl = document.getElementById("dictCount");
  var canSpeak = "speechSynthesis" in window;
  var theme = "All";
  var visible = entries;

  document.getElementById("dictTotal").textContent = entries.length;

  ["All"].concat(DATA.map(function (g) { return g.theme; })).forEach(function (t) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip filter" + (t === "All" ? " on" : "");
    b.textContent = t;
    b.addEventListener("click", function () {
      theme = t;
      chipsEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c === b); });
      render();
    });
    chipsEl.appendChild(b);
  });

  function speak(text) {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/…/g, ""));
    u.lang = "de-DE";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function germanCell(e) {
    var td = document.createElement("td");
    if (e.article) {
      var a = document.createElement("span");
      a.className = e.gender;
      a.textContent = e.article + " ";
      td.appendChild(a);
    }
    td.appendChild(document.createTextNode(e.word));
    if (canSpeak) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "speak";
      btn.title = "Listen";
      btn.setAttribute("aria-label", "Listen to " + e.de);
      btn.textContent = "🔊";
      btn.addEventListener("click", function () { speak(e.de); });
      td.appendChild(btn);
    }
    if (store) {
      var cb = document.createElement("button");
      cb.type = "button";
      cb.className = "speak word-comment-btn" + (store.has(commentKey(e)) ? " has-comment" : "");
      cb.title = "My comment on this word";
      cb.setAttribute("aria-label", "Comment on " + e.de);
      cb.textContent = "💬";
      cb.addEventListener("click", function () { toggleEditor(e, td.parentNode); });
      td.appendChild(cb);
    }
    if (e.forms) {
      var inline = document.createElement("small");
      inline.className = "forms-inline";
      inline.textContent = e.forms;
      td.appendChild(inline);
    }
    return td;
  }

  // ---------- Personal comments on words (stored via store.js) ----------
  var store = window.NotesStore || null;
  var COMMENTED = "💬 My comments";
  var openWord = null;

  function commentKey(e) { return "word:" + e.de; }
  function cssEscape(v) { return window.CSS && CSS.escape ? CSS.escape(v) : v.replace(/["\\]/g, "\\$&"); }

  if (store) {
    var cChip = document.createElement("button");
    cChip.type = "button";
    cChip.className = "chip filter commented-chip";
    cChip.textContent = COMMENTED;
    cChip.addEventListener("click", function () {
      theme = COMMENTED;
      chipsEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c === cChip); });
      render();
    });
    chipsEl.insertBefore(cChip, chipsEl.children[1] || null);
  }

  function toggleEditor(e, tr, focus) {
    var next = tr.nextElementSibling;
    if (next && next.classList.contains("comment-row")) {
      next.remove();
      render();
      return;
    }
    var key = commentKey(e);
    var row = document.createElement("tr");
    row.className = "comment-row";
    var td = document.createElement("td");
    td.colSpan = 3;
    var label = document.createElement("div");
    label.className = "sec-comment-label";
    label.textContent = "💬 My comment on “" + e.de + "”";
    var ta = document.createElement("textarea");
    ta.className = "note-text compact";
    ta.placeholder = "A memory trick, an example sentence, where you heard it…";
    ta.value = store.get(key);
    ta.setAttribute("aria-label", "Comment on " + e.de);
    var meta = document.createElement("div");
    meta.className = "note-meta";
    meta.textContent = store.ok() ? "Saved automatically in this browser." : "⚠ Comments can't be saved in this browser.";
    var timer;
    ta.addEventListener("input", function () {
      meta.textContent = "Saving…";
      clearTimeout(timer);
      timer = setTimeout(function () {
        store.set(key, ta.value);
        meta.textContent = store.ok() ? "Saved ✓" : "⚠ Comments can't be saved in this browser.";
        var btn = tr.querySelector(".word-comment-btn");
        if (btn) btn.classList.toggle("has-comment", store.has(key));
      }, 400);
    });
    var done = document.createElement("button");
    done.type = "button";
    done.className = "btn secondary small";
    done.textContent = "Done";
    done.addEventListener("click", function () {
      clearTimeout(timer);
      store.set(key, ta.value);
      row.remove();
      render();
    });
    var actions = document.createElement("div");
    actions.className = "comment-actions";
    actions.appendChild(meta);
    actions.appendChild(done);
    td.appendChild(label);
    td.appendChild(ta);
    td.appendChild(actions);
    row.appendChild(td);
    tr.insertAdjacentElement("afterend", row);
    ta.focus();
    if (focus) row.scrollIntoView({ block: "center" });
  }

  // Used by the My Notes page to jump to a commented word.
  window.showDictWord = function (de) {
    theme = "All";
    chipsEl.querySelectorAll(".filter").forEach(function (c) { c.classList.toggle("on", c.textContent === "All"); });
    input.value = de.replace(/[.!?…]+$/, "");
    openWord = de;
    render();
  };

  function render() {
    var q = norm(input.value.trim());
    visible = entries.filter(function (e) {
      var inTheme = theme === "All" || e.theme === theme ||
        (theme === COMMENTED && store && store.has(commentKey(e)));
      var hit = !q || e.key.indexOf(q) !== -1 ||
        (store && store.has(commentKey(e)) && norm(store.get(commentKey(e))).indexOf(q) !== -1);
      return inTheme && hit;
    });
    if (q) {
      // Words that start with the query come first.
      var starts = function (e) {
        return norm(e.word).indexOf(q) === 0 || norm(e.en).indexOf(q) === 0 ? 0 : 1;
      };
      visible = visible.slice().sort(function (a, b) { return starts(a) - starts(b); });
    }
    var frag = document.createDocumentFragment();
    visible.forEach(function (e) {
      var tr = document.createElement("tr");
      tr.setAttribute("data-word", e.de);
      tr.appendChild(germanCell(e));
      var forms = document.createElement("td");
      forms.className = "forms";
      forms.textContent = e.forms || "";
      tr.appendChild(forms);
      var en = document.createElement("td");
      en.textContent = e.en;
      if (theme === "All") {
        var t = document.createElement("span");
        t.className = "theme-tag";
        t.textContent = e.theme;
        en.appendChild(t);
      }
      if (store && store.has(commentKey(e))) {
        var pv = document.createElement("div");
        pv.className = "word-comment-preview";
        pv.textContent = "💬 " + store.get(commentKey(e));
        en.appendChild(pv);
      }
      tr.appendChild(en);
      frag.appendChild(tr);
    });
    tbody.textContent = "";
    tbody.appendChild(frag);
    countEl.textContent = visible.length === entries.length
      ? entries.length + " words"
      : visible.length + " of " + entries.length + " words";
    document.getElementById("dictEmpty").hidden = visible.length > 0;
    if (openWord) {
      var row = tbody.querySelector('tr[data-word="' + cssEscape(openWord) + '"]');
      var entry = visible.filter(function (x) { return x.de === openWord; })[0];
      openWord = null;
      if (row && entry) toggleEditor(entry, row, true);
    }
  }

  input.addEventListener("input", render);
  render();

  // ---------- Flashcards ----------
  var card = document.getElementById("flashcard");
  var front = document.getElementById("fcFront");
  var back = document.getElementById("fcBack");
  var current = null;

  function nextCard() {
    var pool = visible.length ? visible : entries;
    current = pool[Math.floor(Math.random() * pool.length)];
    front.textContent = "";
    if (current.article) {
      var a = document.createElement("span");
      a.className = current.gender;
      a.textContent = current.article + " ";
      front.appendChild(a);
    }
    front.appendChild(document.createTextNode(current.word));
    back.textContent = current.en + (current.forms ? "  —  " + current.forms : "");
    back.hidden = true;
    card.hidden = false;
  }

  document.getElementById("fcStart").addEventListener("click", nextCard);
  document.getElementById("fcNext").addEventListener("click", nextCard);
  document.getElementById("fcShow").addEventListener("click", function () { back.hidden = false; });
  document.getElementById("fcSpeak").hidden = !canSpeak;
  document.getElementById("fcSpeak").addEventListener("click", function () { if (current) speak(current.de); });
  document.getElementById("fcClose").addEventListener("click", function () { card.hidden = true; });
})();
