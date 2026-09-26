/*
 * Wörterbuch word list, used by dictionary.js, the practice trainer and
 * the reading pop-ups.
 *
 * One word per line: LEVEL (A1/A2/B1/B2), a space, then fields separated by "|":
 *   noun:  article + noun | plural ("—" = none, "Pl." = plural only) | English | example | example (English)
 *   verb:  infinitive | er/sie/es form | Präteritum | Perfekt | English | example | example (English)
 *   other: word | English | example | example (English)
 * The example fields are optional.
 */
window.DICT_DATA = [];

DICT_DATA.push({ theme: "People & Family", type: "noun", words: `
A1 der Mensch|die Menschen|person, human being|Er ist ein netter Mensch.|He is a nice person.
A1 die Person|die Personen|person|Der Tisch ist für vier Personen.|The table is for four people.
A1 der Mann|die Männer|man; husband|Der Mann dort ist mein Nachbar.|The man over there is my neighbour.
A1 die Frau|die Frauen|woman; wife; Mrs|Meine Frau arbeitet als Ärztin.|My wife works as a doctor.
A1 das Kind|die Kinder|child|Wir haben zwei Kinder.|We have two children.
A1 der Junge|die Jungen|boy|Der Junge spielt Fußball.|The boy is playing football.
A1 das Mädchen|die Mädchen|girl|Das Mädchen liest ein Buch.|The girl is reading a book.
A1 das Baby|die Babys|baby|Das Baby schläft.|The baby is sleeping.
A1 die Familie|die Familien|family|Meine Familie wohnt in Wien.|My family lives in Vienna.
A1 die Eltern|Pl.|parents|Meine Eltern sind im Urlaub.|My parents are on holiday.
A1 der Vater|die Väter|father|Mein Vater kocht gern.|My father likes cooking.
A1 die Mutter|die Mütter|mother|Meine Mutter ist Lehrerin.|My mother is a teacher.
A1 der Sohn|die Söhne|son|Ihr Sohn ist fünf Jahre alt.|Her son is five years old.
A1 die Tochter|die Töchter|daughter|Unsere Tochter studiert in Berlin.|Our daughter studies in Berlin.
A1 der Bruder|die Brüder|brother|Ich habe einen Bruder.|I have a brother.
A1 die Schwester|die Schwestern|sister|Meine Schwester ist älter als ich.|My sister is older than me.
A1 die Geschwister|Pl.|siblings|Hast du Geschwister?|Do you have any brothers or sisters?
A1 der Großvater|die Großväter|grandfather|Mein Großvater ist 80 Jahre alt.|My grandfather is 80 years old.
A1 die Großmutter|die Großmütter|grandmother|Die Großmutter erzählt eine Geschichte.|Grandmother is telling a story.
A1 die Großeltern|Pl.|grandparents|Am Sonntag besuchen wir die Großeltern.|On Sunday we visit our grandparents.
A2 der Onkel|die Onkel|uncle|Mein Onkel wohnt in Amerika.|My uncle lives in America.
A2 die Tante|die Tanten|aunt|Meine Tante hat drei Katzen.|My aunt has three cats.
A2 der Cousin|die Cousins|cousin (male)|Mein Cousin kommt heute zu Besuch.|My cousin is visiting today.
A2 die Cousine|die Cousinen|cousin (female)|Meine Cousine heiratet im Mai.|My cousin is getting married in May.
A1 der Freund|die Freunde|friend; boyfriend|Das ist mein bester Freund.|That's my best friend.
A1 die Freundin|die Freundinnen|friend; girlfriend|Sie trifft ihre Freundin im Café.|She meets her friend in the café.
A2 der Nachbar|die Nachbarn|neighbour|Unser Nachbar ist sehr freundlich.|Our neighbour is very friendly.
A2 der Kollege|die Kollegen|colleague|Mein Kollege hilft mir oft.|My colleague often helps me.
A2 der Chef|die Chefs|boss|Der Chef ist heute nicht da.|The boss isn't in today.
A2 der Gast|die Gäste|guest|Wir haben heute Abend Gäste.|We have guests tonight.
A1 der Herr|die Herren|gentleman; Mr|Guten Tag, Herr Müller!|Hello, Mr Müller!
A1 der Name|die Namen|name|Wie ist Ihr Name?|What is your name?
A1 das Alter|—|age|Im Alter von zehn Jahren zog sie nach Berlin.|At the age of ten she moved to Berlin.
A1 der Geburtstag|die Geburtstage|birthday|Wann hast du Geburtstag?|When is your birthday?
A2 die Hochzeit|die Hochzeiten|wedding|Die Hochzeit war wunderschön.|The wedding was beautiful.
A2 der Ehemann|die Ehemänner|husband|Ihr Ehemann ist Koch.|Her husband is a cook.
A2 die Ehefrau|die Ehefrauen|wife|Seine Ehefrau kommt aus Italien.|His wife is from Italy.
A2 der Enkel|die Enkel|grandson; (pl.) grandchildren|Die Oma spielt mit ihren Enkeln.|Grandma plays with her grandchildren.
A2 die Enkelin|die Enkelinnen|granddaughter|Ihre Enkelin ist zwei Jahre alt.|Her granddaughter is two years old.
A2 der Partner|die Partner|partner|Mein Partner und ich wohnen zusammen.|My partner and I live together.
A2 die Leute|Pl.|people|Viele Leute warten auf den Bus.|Many people are waiting for the bus.
A2 das Paar|die Paare|couple; pair|Sie sind seit zehn Jahren ein Paar.|They have been a couple for ten years.
B1 die Beziehung|die Beziehungen|relationship|Sie hat eine gute Beziehung zu ihrer Mutter.|She has a good relationship with her mother.
B1 die Kindheit|—|childhood|In meiner Kindheit habe ich auf dem Land gewohnt.|In my childhood I lived in the country.
B1 die Jugend|—|youth|In ihrer Jugend hat sie viel Sport gemacht.|In her youth she did a lot of sport.
B1 die Generation|die Generationen|generation|Drei Generationen leben in diesem Haus.|Three generations live in this house.
B1 die Verwandtschaft|—|relatives, family|Zu Weihnachten kommt die ganze Verwandtschaft.|The whole family comes at Christmas.` });

DICT_DATA.push({ theme: "Body & Health", type: "noun", words: `
A1 der Körper|die Körper|body|Sport ist gut für den Körper.|Sport is good for the body.
A1 der Kopf|die Köpfe|head|Mein Kopf tut weh.|My head hurts.
A1 das Gesicht|die Gesichter|face|Sie hat ein freundliches Gesicht.|She has a friendly face.
A1 das Auge|die Augen|eye|Er hat blaue Augen.|He has blue eyes.
A1 das Ohr|die Ohren|ear|Das Kind hat Ohrenschmerzen.|The child has earache.
A1 die Nase|die Nasen|nose|Meine Nase läuft.|My nose is running.
A1 der Mund|die Münder|mouth|Mach bitte den Mund auf.|Please open your mouth.
A1 der Zahn|die Zähne|tooth|Ich putze zweimal am Tag die Zähne.|I brush my teeth twice a day.
A1 das Haar|die Haare|hair|Sie hat lange Haare.|She has long hair.
A2 der Hals|die Hälse|neck; throat|Mein Hals tut weh.|My throat hurts.
A2 die Schulter|die Schultern|shoulder|Meine Schulter tut weh.|My shoulder hurts.
A1 der Arm|die Arme|arm|Er hat sich den Arm gebrochen.|He broke his arm.
A1 die Hand|die Hände|hand|Wasch dir die Hände!|Wash your hands!
A1 der Finger|die Finger|finger|Ich habe mich in den Finger geschnitten.|I cut my finger.
A1 der Bauch|die Bäuche|belly, stomach|Ich habe Bauchschmerzen.|I have a stomach ache.
A2 der Rücken|die Rücken|back|Nach der Arbeit tut mir der Rücken weh.|My back hurts after work.
A1 das Bein|die Beine|leg|Er hat lange Beine.|He has long legs.
A2 das Knie|die Knie|knee|Beim Joggen tut mein Knie weh.|My knee hurts when I jog.
A1 der Fuß|die Füße|foot|Wir gehen zu Fuß.|We're going on foot.
A2 das Herz|die Herzen|heart|Sein Herz schlägt schnell.|His heart is beating fast.
A2 das Blut|—|blood|Er hat Angst vor Blut.|He's afraid of blood.
A2 die Gesundheit|—|health|Gesundheit ist das Wichtigste.|Health is the most important thing.
A2 die Krankheit|die Krankheiten|illness|Die Krankheit ist nicht gefährlich.|The illness isn't dangerous.
A2 der Schmerz|die Schmerzen|pain|Haben Sie Schmerzen?|Are you in pain?
A2 das Fieber|—|fever|Das Kind hat hohes Fieber.|The child has a high fever.
A2 die Erkältung|die Erkältungen|cold (illness)|Ich habe eine Erkältung.|I have a cold.
A2 der Husten|—|cough|Seit Tagen habe ich Husten.|I've had a cough for days.
A2 der Schnupfen|—|runny nose, cold|Im Winter habe ich oft Schnupfen.|I often have a runny nose in winter.
A1 der Arzt|die Ärzte|doctor|Ich muss zum Arzt gehen.|I have to go to the doctor.
A1 die Ärztin|die Ärztinnen|doctor (female)|Die Ärztin untersucht den Patienten.|The doctor examines the patient.
A2 der Zahnarzt|die Zahnärzte|dentist|Ich gehe zweimal im Jahr zum Zahnarzt.|I go to the dentist twice a year.
A2 der Patient|die Patienten|patient|Der Patient wartet im Wartezimmer.|The patient is waiting in the waiting room.
A1 das Krankenhaus|die Krankenhäuser|hospital|Er liegt im Krankenhaus.|He is in hospital.
A1 die Apotheke|die Apotheken|pharmacy|Die Apotheke ist bis 20 Uhr geöffnet.|The pharmacy is open until 8 p.m.
A2 das Medikament|die Medikamente|medicine|Nehmen Sie das Medikament dreimal täglich.|Take the medicine three times a day.
A2 die Tablette|die Tabletten|tablet, pill|Nimm eine Tablette gegen die Schmerzen.|Take a pill for the pain.
A2 das Rezept|die Rezepte|prescription; recipe|Für dieses Medikament brauchen Sie ein Rezept.|You need a prescription for this medicine.
A1 der Termin|die Termine|appointment|Ich habe morgen einen Termin beim Arzt.|I have a doctor's appointment tomorrow.
A2 der Unfall|die Unfälle|accident|Auf der Autobahn gab es einen Unfall.|There was an accident on the motorway.
B1 die Versicherung|die Versicherungen|insurance|Die Versicherung bezahlt die Behandlung.|The insurance pays for the treatment.
B1 die Behandlung|die Behandlungen|treatment|Die Behandlung dauert zwei Wochen.|The treatment takes two weeks.
B1 die Verletzung|die Verletzungen|injury|Die Verletzung ist nicht schlimm.|The injury isn't serious.
B1 die Allergie|die Allergien|allergy|Ich habe eine Allergie gegen Nüsse.|I'm allergic to nuts.
B1 der Blutdruck|—|blood pressure|Der Arzt misst den Blutdruck.|The doctor measures the blood pressure.
B1 die Ernährung|—|diet, nutrition|Eine gesunde Ernährung ist wichtig.|A healthy diet is important.
B2 die Vorsorge|—|preventive care|Regelmäßige Vorsorge kann Krankheiten verhindern.|Regular check-ups can prevent illnesses.
B2 die Nebenwirkung|die Nebenwirkungen|side effect|Das Medikament hat kaum Nebenwirkungen.|The medicine has hardly any side effects.` });

DICT_DATA.push({ theme: "Food & Drink", type: "noun", words: `
A1 das Essen|—|food; meal|Das Essen ist fertig!|The food is ready!
A1 das Getränk|die Getränke|drink|Möchten Sie ein Getränk?|Would you like a drink?
A1 das Frühstück|die Frühstücke|breakfast|Zum Frühstück esse ich Müsli.|I eat muesli for breakfast.
A1 das Mittagessen|die Mittagessen|lunch|Das Mittagessen gibt es um zwölf.|Lunch is at twelve.
A1 das Abendessen|die Abendessen|dinner|Was gibt es zum Abendessen?|What's for dinner?
A1 das Brot|die Brote|bread|Ich kaufe ein Brot beim Bäcker.|I buy a loaf of bread at the bakery.
A1 das Brötchen|die Brötchen|bread roll|Am Sonntag gibt es frische Brötchen.|On Sundays there are fresh rolls.
A1 die Butter|—|butter|Ich esse Brot mit Butter.|I eat bread with butter.
A1 der Käse|die Käse|cheese|Der Käse kommt aus der Schweiz.|The cheese comes from Switzerland.
A1 die Wurst|die Würste|sausage|In Berlin isst man gern Currywurst.|In Berlin people like eating currywurst.
A1 das Fleisch|—|meat|Ich esse kein Fleisch.|I don't eat meat.
A1 das Hähnchen|die Hähnchen|chicken|Heute gibt es Hähnchen mit Reis.|Today there's chicken with rice.
A1 der Fisch|die Fische|fish|Freitags essen wir Fisch.|On Fridays we eat fish.
A1 das Ei|die Eier|egg|Ich brauche sechs Eier für den Kuchen.|I need six eggs for the cake.
A1 die Milch|—|milk|Trinkst du Kaffee mit Milch?|Do you drink coffee with milk?
A1 der Kaffee|die Kaffees|coffee|Ich trinke morgens einen Kaffee.|I drink a coffee in the morning.
A1 der Tee|die Tees|tea|Möchtest du einen Tee?|Would you like some tea?
A1 das Wasser|—|water|Ein Glas Wasser, bitte.|A glass of water, please.
A1 der Saft|die Säfte|juice|Die Kinder trinken Apfelsaft.|The children drink apple juice.
A1 das Bier|die Biere|beer|Zwei Bier, bitte!|Two beers, please!
A1 der Wein|die Weine|wine|Dieser Wein kommt aus Österreich.|This wine comes from Austria.
A1 der Zucker|—|sugar|Ich trinke Tee ohne Zucker.|I drink tea without sugar.
A1 das Salz|—|salt|Kannst du mir bitte das Salz geben?|Can you pass me the salt, please?
A2 der Pfeffer|—|pepper|Die Suppe braucht noch Pfeffer.|The soup needs some more pepper.
A1 der Reis|—|rice|Zum Fisch gibt es Reis.|The fish comes with rice.
A1 die Nudel|die Nudeln|noodle; (pl.) pasta|Die Kinder essen gern Nudeln.|The children like eating pasta.
A1 die Kartoffel|die Kartoffeln|potato|Wir essen Kartoffeln mit Gemüse.|We eat potatoes with vegetables.
A1 das Gemüse|—|vegetables|Gemüse ist gesund.|Vegetables are healthy.
A1 das Obst|—|fruit|Ich kaufe Obst auf dem Markt.|I buy fruit at the market.
A1 der Apfel|die Äpfel|apple|Ein Apfel am Tag ist gesund.|An apple a day is healthy.
A1 die Banane|die Bananen|banana|Die Bananen sind noch grün.|The bananas are still green.
A1 die Orange|die Orangen|orange|Ich presse frische Orangen.|I'm squeezing fresh oranges.
A1 die Tomate|die Tomaten|tomato|Ein Kilo Tomaten, bitte.|A kilo of tomatoes, please.
A2 die Zwiebel|die Zwiebeln|onion|Schneide die Zwiebel klein.|Chop the onion finely.
A2 die Karotte|die Karotten|carrot|Kaninchen fressen gern Karotten.|Rabbits like eating carrots.
A2 die Gurke|die Gurken|cucumber|Ich mache einen Gurkensalat.|I'm making a cucumber salad.
A2 die Erdbeere|die Erdbeeren|strawberry|Im Juni gibt es frische Erdbeeren.|In June there are fresh strawberries.
A2 der Knoblauch|—|garlic|In der Soße ist viel Knoblauch.|There's a lot of garlic in the sauce.
A1 der Salat|die Salate|salad; lettuce|Ich nehme einen gemischten Salat.|I'll have a mixed salad.
A1 die Suppe|die Suppen|soup|Die Suppe ist zu heiß.|The soup is too hot.
A2 die Soße|die Soßen|sauce|Die Soße schmeckt sehr gut.|The sauce tastes very good.
A1 der Kuchen|die Kuchen|cake|Oma backt einen Kuchen.|Grandma is baking a cake.
A1 die Schokolade|die Schokoladen|chocolate|Kinder lieben Schokolade.|Children love chocolate.
A1 das Eis|—|ice cream; ice|Im Sommer essen wir viel Eis.|In summer we eat a lot of ice cream.
A2 die Sahne|—|cream|Möchten Sie den Kuchen mit Sahne?|Would you like the cake with cream?
A2 das Öl|die Öle|oil|Brate das Fleisch in etwas Öl.|Fry the meat in a little oil.
A2 das Mehl|—|flour|Für den Teig brauchst du Mehl.|You need flour for the dough.
A2 die Flasche|die Flaschen|bottle|Eine Flasche Wasser kostet zwei Euro.|A bottle of water costs two euros.
A2 die Dose|die Dosen|can, tin|Ich öffne eine Dose Tomaten.|I open a tin of tomatoes.
A1 das Restaurant|die Restaurants|restaurant|Wir gehen heute ins Restaurant.|We're going to a restaurant today.
A2 die Speisekarte|die Speisekarten|menu|Kann ich bitte die Speisekarte haben?|Can I have the menu, please?
A2 das Gericht|die Gerichte|dish; court|Das ist ein typisches Gericht aus Bayern.|That's a typical dish from Bavaria.
A2 die Nachspeise|die Nachspeisen|dessert|Als Nachspeise gibt es Eis.|There's ice cream for dessert.
A1 die Rechnung|die Rechnungen|bill; invoice|Die Rechnung, bitte!|The bill, please!
A1 der Hunger|—|hunger|Ich habe großen Hunger.|I'm very hungry.
A1 der Durst|—|thirst|Hast du Durst?|Are you thirsty?
A2 der Bäcker|die Bäcker|baker; bakery|Ich hole Brötchen beim Bäcker.|I'm getting rolls from the bakery.
A2 der Metzger|die Metzger|butcher|Beim Metzger gibt es gute Wurst.|The butcher has good sausages.
B1 die Zutat|die Zutaten|ingredient|Alle Zutaten kommen aus der Region.|All the ingredients are local.
B1 die Mahlzeit|die Mahlzeiten|meal|Das Frühstück ist die wichtigste Mahlzeit.|Breakfast is the most important meal.
B1 der Geschmack|die Geschmäcker|taste, flavour|Der Wein hat einen fruchtigen Geschmack.|The wine has a fruity taste.
B1 die Portion|die Portionen|portion|Die Portionen sind hier sehr groß.|The portions here are very big.
B1 das Trinkgeld|die Trinkgelder|tip (money)|In Deutschland gibt man etwa zehn Prozent Trinkgeld.|In Germany people tip about ten per cent.` });

DICT_DATA.push({ theme: "Home", type: "noun", words: `
A1 das Haus|die Häuser|house|Das Haus hat einen großen Garten.|The house has a big garden.
A1 die Wohnung|die Wohnungen|flat, apartment|Wir suchen eine neue Wohnung.|We're looking for a new flat.
A1 das Zimmer|die Zimmer|room|Die Wohnung hat drei Zimmer.|The flat has three rooms.
A1 die Küche|die Küchen|kitchen|Wir essen in der Küche.|We eat in the kitchen.
A1 das Bad|die Bäder|bathroom; bath|Das Bad ist neben dem Schlafzimmer.|The bathroom is next to the bedroom.
A1 das Schlafzimmer|die Schlafzimmer|bedroom|Das Schlafzimmer ist sehr ruhig.|The bedroom is very quiet.
A1 das Wohnzimmer|die Wohnzimmer|living room|Im Wohnzimmer steht ein großes Sofa.|There's a big sofa in the living room.
A2 der Flur|die Flure|hallway|Die Schuhe stehen im Flur.|The shoes are in the hallway.
A1 der Balkon|die Balkone|balcony|Im Sommer frühstücken wir auf dem Balkon.|In summer we have breakfast on the balcony.
A1 der Garten|die Gärten|garden|Die Kinder spielen im Garten.|The children are playing in the garden.
A2 der Keller|die Keller|cellar, basement|Die Fahrräder stehen im Keller.|The bikes are in the cellar.
A2 der Aufzug|die Aufzüge|lift, elevator|Der Aufzug ist leider kaputt.|Unfortunately the lift is broken.
A2 das Stockwerk|die Stockwerke|floor, storey|Das Haus hat vier Stockwerke.|The building has four floors.
A2 das Dach|die Dächer|roof|Das Dach muss repariert werden.|The roof needs to be repaired.
A2 die Wand|die Wände|wall|Das Bild hängt an der Wand.|The picture is hanging on the wall.
A2 der Boden|die Böden|floor; ground|Der Ball liegt auf dem Boden.|The ball is on the floor.
A1 die Tür|die Türen|door|Mach bitte die Tür zu!|Please close the door!
A1 das Fenster|die Fenster|window|Kann ich das Fenster öffnen?|Can I open the window?
A2 die Treppe|die Treppen|stairs|Die Treppe ist sehr steil.|The stairs are very steep.
A2 die Heizung|die Heizungen|heating|Die Heizung funktioniert nicht.|The heating isn't working.
A2 die Möbel|Pl.|furniture|Wir kaufen neue Möbel.|We're buying new furniture.
A1 der Tisch|die Tische|table|Der Tisch ist aus Holz.|The table is made of wood.
A1 der Stuhl|die Stühle|chair|Wir brauchen noch zwei Stühle.|We need two more chairs.
A1 das Sofa|die Sofas|sofa|Die Katze schläft auf dem Sofa.|The cat is sleeping on the sofa.
A1 das Bett|die Betten|bed|Ich gehe um elf Uhr ins Bett.|I go to bed at eleven.
A1 der Schrank|die Schränke|cupboard, wardrobe|Die Teller sind im Schrank.|The plates are in the cupboard.
A2 das Regal|die Regale|shelf|Die Bücher stehen im Regal.|The books are on the shelf.
A1 die Lampe|die Lampen|lamp|Die Lampe ist kaputt.|The lamp is broken.
A2 der Teppich|die Teppiche|carpet, rug|Der Teppich ist aus der Türkei.|The rug is from Turkey.
A2 der Spiegel|die Spiegel|mirror|Der Spiegel hängt im Bad.|The mirror hangs in the bathroom.
A2 die Dusche|die Duschen|shower|Ich nehme morgens eine Dusche.|I take a shower in the morning.
A1 der Kühlschrank|die Kühlschränke|fridge|Die Milch ist im Kühlschrank.|The milk is in the fridge.
A2 der Herd|die Herde|stove, cooker|Der Topf steht auf dem Herd.|The pot is on the stove.
A2 der Topf|die Töpfe|pot, pan|Das Wasser im Topf kocht.|The water in the pot is boiling.
A2 die Waschmaschine|die Waschmaschinen|washing machine|Die Waschmaschine ist im Keller.|The washing machine is in the cellar.
A1 der Schlüssel|die Schlüssel|key|Ich finde meinen Schlüssel nicht.|I can't find my key.
A1 der Teller|die Teller|plate|Stell die Teller auf den Tisch.|Put the plates on the table.
A1 die Tasse|die Tassen|cup|Eine Tasse Kaffee, bitte.|A cup of coffee, please.
A1 das Glas|die Gläser|glass|Das Glas ist leer.|The glass is empty.
A1 die Gabel|die Gabeln|fork|Die Gabel liegt links vom Teller.|The fork goes to the left of the plate.
A1 das Messer|die Messer|knife|Das Messer ist sehr scharf.|The knife is very sharp.
A1 der Löffel|die Löffel|spoon|Ich brauche einen Löffel für die Suppe.|I need a spoon for the soup.
A2 der Müll|—|rubbish, garbage|Bringst du bitte den Müll raus?|Can you take the rubbish out, please?
A2 die Miete|die Mieten|rent|Die Miete ist sehr hoch.|The rent is very high.
A2 der Vermieter|die Vermieter|landlord|Der Vermieter wohnt im Erdgeschoss.|The landlord lives on the ground floor.
B1 der Mieter|die Mieter|tenant|Alle Mieter müssen die Treppe putzen.|All tenants have to clean the stairs.
B1 die Nebenkosten|Pl.|additional costs (utilities)|Die Nebenkosten sind im Winter höher.|The additional costs are higher in winter.
B1 die Kaution|die Kautionen|deposit|Die Kaution beträgt zwei Monatsmieten.|The deposit is two months' rent.
B1 der Umzug|die Umzüge|move (house)|Freunde helfen uns beim Umzug.|Friends are helping us with the move.
B1 der Haushalt|die Haushalte|household; housework|Wir teilen uns die Arbeit im Haushalt.|We share the housework.
B2 die Eigentumswohnung|die Eigentumswohnungen|owner-occupied flat|Sie haben sich eine Eigentumswohnung gekauft.|They have bought a flat.` });

DICT_DATA.push({ theme: "Time", type: "noun", words: `
A1 die Zeit|die Zeiten|time|Ich habe heute keine Zeit.|I don't have time today.
A1 die Sekunde|die Sekunden|second|Warte eine Sekunde!|Wait a second!
A1 die Minute|die Minuten|minute|Der Bus kommt in fünf Minuten.|The bus comes in five minutes.
A1 die Stunde|die Stunden|hour|Der Film dauert zwei Stunden.|The film lasts two hours.
A1 die Uhr|die Uhren|clock, watch; o'clock|Es ist drei Uhr.|It's three o'clock.
A1 der Tag|die Tage|day|Einen schönen Tag noch!|Have a nice day!
A1 die Woche|die Wochen|week|Nächste Woche habe ich Urlaub.|Next week I'm on holiday.
A1 der Monat|die Monate|month|Ich lerne seit einem Monat Deutsch.|I've been learning German for a month.
A1 das Jahr|die Jahre|year|Wir wohnen seit drei Jahren hier.|We've lived here for three years.
A1 der Morgen|die Morgen|morning|Guten Morgen!|Good morning!
A1 der Vormittag|die Vormittage|late morning|Am Vormittag arbeite ich.|I work in the mornings.
A1 der Mittag|die Mittage|noon, midday|Zu Mittag essen wir um zwölf.|We have lunch at twelve.
A1 der Nachmittag|die Nachmittage|afternoon|Am Nachmittag gehen wir spazieren.|In the afternoon we go for a walk.
A1 der Abend|die Abende|evening|Guten Abend!|Good evening!
A1 die Nacht|die Nächte|night|Gute Nacht!|Good night!
A1 das Wochenende|die Wochenenden|weekend|Was machst du am Wochenende?|What are you doing at the weekend?
A1 der Montag|die Montage|Monday|Am Montag beginnt der Kurs.|The course starts on Monday.
A1 der Dienstag|die Dienstage|Tuesday|Dienstags gehe ich schwimmen.|I go swimming on Tuesdays.
A1 der Mittwoch|die Mittwoche|Wednesday|Am Mittwoch habe ich einen Termin.|I have an appointment on Wednesday.
A1 der Donnerstag|die Donnerstage|Thursday|Am Donnerstag ist das Geschäft lange offen.|On Thursday the shop is open late.
A1 der Freitag|die Freitage|Friday|Am Freitag gehen wir aus.|We go out on Friday.
A1 der Samstag|die Samstage|Saturday|Am Samstag gehe ich einkaufen.|I go shopping on Saturday.
A1 der Sonntag|die Sonntage|Sunday|Am Sonntag sind die Geschäfte zu.|The shops are closed on Sunday.
A1 der Januar|—|January|Im Januar ist es sehr kalt.|It's very cold in January.
A1 der Februar|—|February|Im Februar feiern viele Leute Karneval.|Many people celebrate carnival in February.
A1 der März|—|March|Im März kommt der Frühling.|Spring comes in March.
A1 der April|—|April|Im April regnet es oft.|It often rains in April.
A1 der Mai|—|May|Im Mai blühen die Bäume.|The trees blossom in May.
A1 der Juni|—|June|Mein Geburtstag ist im Juni.|My birthday is in June.
A1 der Juli|—|July|Im Juli fahren wir ans Meer.|In July we go to the seaside.
A1 der August|—|August|Im August ist es sehr heiß.|It's very hot in August.
A1 der September|—|September|Im September beginnt die Schule.|School starts in September.
A1 der Oktober|—|October|Im Oktober ist das Oktoberfest.|The Oktoberfest is in October. (it actually starts in September)
A1 der November|—|November|Im November ist es oft grau.|It's often grey in November.
A1 der Dezember|—|December|Im Dezember gibt es Weihnachtsmärkte.|There are Christmas markets in December.
A1 der Frühling|—|spring|Im Frühling wird es wärmer.|It gets warmer in spring.
A1 der Sommer|—|summer|Im Sommer gehen wir oft schwimmen.|In summer we often go swimming.
A1 der Herbst|—|autumn, fall|Im Herbst fallen die Blätter.|The leaves fall in autumn.
A1 der Winter|—|winter|Im Winter fahren wir Ski.|We go skiing in winter.
A1 der Urlaub|die Urlaube|holiday, vacation|Wir machen Urlaub in Italien.|We're going on holiday in Italy.
A1 die Ferien|Pl.|(school) holidays|In den Ferien besuchen wir die Oma.|In the holidays we visit grandma.
A2 der Feiertag|die Feiertage|public holiday|Am Feiertag sind alle Geschäfte zu.|All the shops are closed on the public holiday.
A2 das Datum|die Daten|date|Welches Datum ist heute?|What's the date today?
A2 das Jahrhundert|die Jahrhunderte|century|Die Kirche ist aus dem 12. Jahrhundert.|The church dates from the 12th century.
B1 der Zeitraum|die Zeiträume|period of time|In diesem Zeitraum bin ich nicht erreichbar.|I can't be reached during this period.` });

DICT_DATA.push({ theme: "Time words", type: "word", words: `
A1 heute|today|Heute ist Montag.|Today is Monday.
A1 morgen|tomorrow|Morgen habe ich frei.|Tomorrow I have the day off.
A1 gestern|yesterday|Gestern war ich im Kino.|Yesterday I was at the cinema.
A2 übermorgen|the day after tomorrow|Übermorgen fliegen wir nach Rom.|The day after tomorrow we fly to Rome.
A2 vorgestern|the day before yesterday|Vorgestern hat es geregnet.|It rained the day before yesterday.
A1 jetzt|now|Ich habe jetzt keine Zeit.|I don't have time now.
A1 bald|soon|Bis bald!|See you soon!
A1 später|later|Ich rufe dich später an.|I'll call you later.
A2 früher|earlier; formerly|Früher habe ich in Paris gewohnt.|I used to live in Paris.
A1 immer|always|Er kommt immer zu spät.|He's always late.
A1 oft|often|Wir gehen oft ins Kino.|We often go to the cinema.
A1 manchmal|sometimes|Manchmal koche ich für Freunde.|Sometimes I cook for friends.
A2 selten|rarely|Ich sehe selten fern.|I rarely watch TV.
A1 nie|never|Ich trinke nie Alkohol.|I never drink alcohol.
A1 schon|already|Bist du schon fertig?|Are you finished already?
A1 noch|still; yet|Ich bin noch müde.|I'm still tired.
A1 gleich|in a moment; same|Ich komme gleich!|I'm coming in a moment!
A2 sofort|immediately|Komm sofort nach Hause!|Come home immediately!
A2 zuerst|first|Zuerst waschen wir das Gemüse.|First we wash the vegetables.
A1 dann|then|Dann schneiden wir es klein.|Then we chop it up.
A2 danach|afterwards|Wir essen und danach gehen wir spazieren.|We'll eat and afterwards go for a walk.
A2 zuletzt|last, finally|Zuletzt kommt das Salz dazu.|Finally the salt goes in.
A2 vorher|before(hand)|Ruf bitte vorher an.|Please call beforehand.
A2 nachher|afterwards, later|Bis nachher!|See you later!
A2 täglich|daily|Die Zeitung erscheint täglich.|The newspaper comes out daily.
A1 morgens|in the morning(s)|Morgens trinke ich Kaffee.|I drink coffee in the mornings.
A1 abends|in the evening(s)|Abends lese ich gern.|I like reading in the evenings.
B1 inzwischen|meanwhile; by now|Inzwischen spricht sie gut Deutsch.|By now she speaks good German.
B1 damals|back then|Damals gab es noch keine Handys.|Back then there were no mobile phones.
B1 neulich|recently, the other day|Neulich habe ich deinen Bruder getroffen.|I met your brother the other day.
B1 bisher|so far|Bisher hat alles gut geklappt.|So far everything has gone well.
B1 rechtzeitig|in time|Wir sind rechtzeitig angekommen.|We arrived in time.
B1 regelmäßig|regularly|Er macht regelmäßig Sport.|He does sport regularly.
B2 künftig|in future|Künftig beginnt der Kurs um neun Uhr.|In future the course will start at nine.
B2 allmählich|gradually|Allmählich wird es dunkel.|It's gradually getting dark.
B2 vorübergehend|temporarily|Das Geschäft ist vorübergehend geschlossen.|The shop is temporarily closed.` });

DICT_DATA.push({ theme: "Town & Travel", type: "noun", words: `
A1 die Stadt|die Städte|city, town|Hamburg ist eine schöne Stadt.|Hamburg is a beautiful city.
A1 das Dorf|die Dörfer|village|Meine Eltern wohnen in einem Dorf.|My parents live in a village.
A1 das Land|die Länder|country; countryside|Wir wohnen auf dem Land.|We live in the countryside.
A1 die Straße|die Straßen|street, road|In welcher Straße wohnst du?|Which street do you live in?
A1 der Platz|die Plätze|square; place; seat|Ist dieser Platz noch frei?|Is this seat free?
A2 die Brücke|die Brücken|bridge|Gehen Sie über die Brücke.|Go over the bridge.
A1 der Park|die Parks|park|Wir gehen im Park spazieren.|We go for a walk in the park.
A1 die Kirche|die Kirchen|church|Die Kirche ist sehr alt.|The church is very old.
A1 das Museum|die Museen|museum|Das Museum ist montags geschlossen.|The museum is closed on Mondays.
A1 das Kino|die Kinos|cinema|Gehen wir heute ins Kino?|Shall we go to the cinema today?
A1 das Theater|die Theater|theatre|Wir haben Karten fürs Theater.|We have tickets for the theatre.
A1 das Geschäft|die Geschäfte|shop; business|Das Geschäft öffnet um neun Uhr.|The shop opens at nine.
A1 der Supermarkt|die Supermärkte|supermarket|Ich gehe in den Supermarkt.|I'm going to the supermarket.
A1 der Markt|die Märkte|market|Samstags gehe ich auf den Markt.|On Saturdays I go to the market.
A1 die Bank|die Banken|bank; bench|Ich muss Geld von der Bank holen.|I have to get money from the bank.
A1 die Post|—|post office; mail|Ich bringe das Paket zur Post.|I'm taking the parcel to the post office.
A1 das Hotel|die Hotels|hotel|Das Hotel liegt direkt am Strand.|The hotel is right on the beach.
A2 das Rathaus|die Rathäuser|town hall|Das Rathaus ist am Marktplatz.|The town hall is on the market square.
A2 die Bibliothek|die Bibliotheken|library|Ich lerne oft in der Bibliothek.|I often study in the library.
A2 die Innenstadt|die Innenstädte|city centre|In der Innenstadt gibt es viele Geschäfte.|There are lots of shops in the city centre.
A2 die Kreuzung|die Kreuzungen|crossroads|An der Kreuzung biegen Sie links ab.|Turn left at the crossroads.
A2 die Ecke|die Ecken|corner|Die Bäckerei ist gleich um die Ecke.|The bakery is just around the corner.
A2 der Eingang|die Eingänge|entrance|Wir treffen uns am Eingang.|We'll meet at the entrance.
A2 der Ausgang|die Ausgänge|exit|Wo ist der Ausgang?|Where is the exit?
A1 der Bahnhof|die Bahnhöfe|train station|Der Bahnhof ist nicht weit.|The station isn't far.
A2 der Bahnsteig|die Bahnsteige|platform|Der Zug fährt von Bahnsteig 3 ab.|The train leaves from platform 3.
A2 das Gleis|die Gleise|track, platform|Der ICE nach Berlin fährt auf Gleis 7.|The ICE to Berlin leaves from track 7.
A1 der Flughafen|die Flughäfen|airport|Wir fahren mit dem Taxi zum Flughafen.|We're taking a taxi to the airport.
A1 die Haltestelle|die Haltestellen|(bus/tram) stop|Die Haltestelle ist vor dem Supermarkt.|The stop is in front of the supermarket.
A1 der Zug|die Züge|train|Der Zug hat Verspätung.|The train is delayed.
A1 der Bus|die Busse|bus|Ich fahre mit dem Bus zur Arbeit.|I go to work by bus.
A1 die U-Bahn|die U-Bahnen|underground, subway|Die U-Bahn fährt alle fünf Minuten.|The underground runs every five minutes.
A1 die Straßenbahn|die Straßenbahnen|tram|Nehmen Sie die Straßenbahn Linie 4.|Take tram number 4.
A1 das Auto|die Autos|car|Wir fahren mit dem Auto nach Italien.|We're driving to Italy.
A1 das Fahrrad|die Fahrräder|bicycle|Ich fahre jeden Tag Fahrrad.|I cycle every day.
A1 das Flugzeug|die Flugzeuge|aeroplane|Das Flugzeug landet um 14 Uhr.|The plane lands at 2 p.m.
A2 das Schiff|die Schiffe|ship|Wir fahren mit dem Schiff über den See.|We take the boat across the lake.
A1 das Taxi|die Taxis|taxi|Können Sie mir ein Taxi rufen?|Can you call me a taxi?
A1 die Fahrkarte|die Fahrkarten|ticket (transport)|Ich kaufe eine Fahrkarte am Automaten.|I buy a ticket at the machine.
A2 der Fahrplan|die Fahrpläne|timetable|Laut Fahrplan kommt der Bus um acht.|According to the timetable the bus comes at eight.
A2 die Abfahrt|die Abfahrten|departure|Die Abfahrt ist um 9.15 Uhr.|Departure is at 9.15.
A2 die Ankunft|die Ankünfte|arrival|Die Ankunft in München ist um 13 Uhr.|Arrival in Munich is at 1 p.m.
A2 die Verspätung|die Verspätungen|delay|Der Zug hat zehn Minuten Verspätung.|The train is ten minutes late.
B1 der Anschluss|die Anschlüsse|connection|Ich habe meinen Anschluss verpasst.|I missed my connection.
A2 die Autobahn|die Autobahnen|motorway|Auf der Autobahn ist viel Verkehr.|There's a lot of traffic on the motorway.
A2 der Stau|die Staus|traffic jam|Wir stehen seit einer Stunde im Stau.|We've been stuck in traffic for an hour.
A2 die Tankstelle|die Tankstellen|petrol station|Wir müssen noch zur Tankstelle.|We still need to go to the petrol station.
A1 der Koffer|die Koffer|suitcase|Mein Koffer ist zu schwer.|My suitcase is too heavy.
A2 das Gepäck|—|luggage|Haben Sie noch mehr Gepäck?|Do you have any more luggage?
A1 der Pass|die Pässe|passport|Vergiss deinen Pass nicht!|Don't forget your passport!
A2 der Ausweis|die Ausweise|ID card|Kann ich bitte Ihren Ausweis sehen?|Can I see your ID, please?
A2 die Grenze|die Grenzen|border|An der Grenze gab es keine Kontrolle.|There was no check at the border.
A1 die Reise|die Reisen|journey, trip|Gute Reise!|Have a good trip!
A1 der Weg|die Wege|way, path|Können Sie mir den Weg zeigen?|Can you show me the way?
A2 der Stadtplan|die Stadtpläne|city map|Hast du einen Stadtplan?|Do you have a map of the city?
A1 die Ampel|die Ampeln|traffic light|Die Ampel ist rot.|The light is red.
A1 die Polizei|—|police|Ruf sofort die Polizei!|Call the police immediately!
B1 die Unterkunft|die Unterkünfte|accommodation|Wir suchen eine günstige Unterkunft.|We're looking for cheap accommodation.
B1 die Sehenswürdigkeit|die Sehenswürdigkeiten|sight, attraction|Das Schloss ist die wichtigste Sehenswürdigkeit.|The castle is the main sight.
B1 das Viertel|die Viertel|district, quarter|Wir wohnen in einem ruhigen Viertel.|We live in a quiet neighbourhood.` });

DICT_DATA.push({ theme: "Work & School", type: "noun", words: `
A1 die Arbeit|die Arbeiten|work; job|Ich fahre mit dem Rad zur Arbeit.|I cycle to work.
A1 der Beruf|die Berufe|profession, job|Was sind Sie von Beruf?|What do you do for a living?
A1 die Firma|die Firmen|company|Sie arbeitet bei einer großen Firma.|She works for a big company.
A1 das Büro|die Büros|office|Das Büro ist im dritten Stock.|The office is on the third floor.
A1 der Computer|die Computer|computer|Mein Computer ist zu langsam.|My computer is too slow.
A1 das Handy|die Handys|mobile phone|Mein Handy ist leer.|My phone battery is dead.
A1 die E-Mail|die E-Mails|email|Ich schreibe dir eine E-Mail.|I'll write you an email.
A1 der Brief|die Briefe|letter|Heute ist ein Brief für dich gekommen.|A letter came for you today.
A1 das Geld|—|money|Ich habe kein Geld dabei.|I don't have any money on me.
A2 das Gehalt|die Gehälter|salary|Das Gehalt kommt am Ende des Monats.|The salary is paid at the end of the month.
A2 der Lohn|die Löhne|wage|Die Löhne sind gestiegen.|Wages have risen.
A2 die Besprechung|die Besprechungen|meeting|Die Besprechung beginnt um zehn.|The meeting starts at ten.
A2 die Pause|die Pausen|break|Wir machen eine kurze Pause.|Let's take a short break.
A2 die Aufgabe|die Aufgaben|task, exercise|Das ist eine schwierige Aufgabe.|That's a difficult task.
A2 das Team|die Teams|team|Unser Team ist sehr international.|Our team is very international.
A2 das Projekt|die Projekte|project|Das Projekt ist fast fertig.|The project is almost finished.
A2 die Stelle|die Stellen|job, position; place|Ich suche eine neue Stelle.|I'm looking for a new job.
A2 die Bewerbung|die Bewerbungen|application|Ich schicke meine Bewerbung per E-Mail.|I'm sending my application by email.
A2 der Lebenslauf|die Lebensläufe|CV, résumé|Im Anhang finden Sie meinen Lebenslauf.|Please find my CV attached.
A2 die Ausbildung|die Ausbildungen|training, apprenticeship|Er macht eine Ausbildung zum Koch.|He's training to be a chef.
A2 das Praktikum|die Praktika|internship|Ich mache ein Praktikum bei einer Bank.|I'm doing an internship at a bank.
A2 der Vertrag|die Verträge|contract|Bitte unterschreiben Sie den Vertrag.|Please sign the contract.
B1 das Vorstellungsgespräch|die Vorstellungsgespräche|job interview|Morgen habe ich ein Vorstellungsgespräch.|I have a job interview tomorrow.
B1 die Erfahrung|die Erfahrungen|experience|Haben Sie Erfahrung in diesem Bereich?|Do you have experience in this field?
B1 die Kündigung|die Kündigungen|notice, dismissal|Er hat seine Kündigung bekommen.|He has been given notice.
B1 die Überstunde|die Überstunden|overtime (hour)|Diese Woche habe ich viele Überstunden gemacht.|I did a lot of overtime this week.
B1 der Arbeitgeber|die Arbeitgeber|employer|Mein Arbeitgeber zahlt die Fortbildung.|My employer pays for the training course.
B1 der Arbeitnehmer|die Arbeitnehmer|employee|Die Arbeitnehmer bekommen mehr Urlaub.|The employees get more holiday.
B1 das Ergebnis|die Ergebnisse|result|Das Ergebnis ist sehr gut.|The result is very good.
B1 der Erfolg|die Erfolge|success|Viel Erfolg bei der Prüfung!|Good luck with the exam!
B1 der Abschluss|die Abschlüsse|degree, qualification|Sie hat einen Abschluss in Biologie.|She has a degree in biology.
B1 die Kenntnisse|Pl.|knowledge, skills|Gute Deutschkenntnisse sind erforderlich.|Good German is required.
B2 die Fähigkeit|die Fähigkeiten|ability|Er hat die Fähigkeit, andere zu motivieren.|He has the ability to motivate others.
B2 die Leistung|die Leistungen|performance, achievement|Ihre Leistungen in der Schule sind sehr gut.|Her results at school are very good.
A1 die Schule|die Schulen|school|Die Kinder gehen um acht in die Schule.|The children go to school at eight.
A1 die Universität|die Universitäten|university|Sie studiert an der Universität Wien.|She studies at the University of Vienna.
A1 der Lehrer|die Lehrer|teacher|Der Lehrer erklärt die Grammatik.|The teacher explains the grammar.
A1 die Lehrerin|die Lehrerinnen|teacher (female)|Unsere Lehrerin ist sehr nett.|Our teacher is very nice.
A1 der Schüler|die Schüler|pupil|Die Schüler schreiben einen Test.|The pupils are writing a test.
A1 der Student|die Studenten|student|Viele Studenten wohnen in einer WG.|Many students live in a flat share.
A1 die Klasse|die Klassen|class|In meiner Klasse sind 25 Schüler.|There are 25 pupils in my class.
A1 der Kurs|die Kurse|course|Der Deutschkurs beginnt im Mai.|The German course starts in May.
A2 die Prüfung|die Prüfungen|exam|Die Prüfung war leichter als gedacht.|The exam was easier than expected.
A2 die Note|die Noten|mark, grade|Sie hat eine gute Note bekommen.|She got a good mark.
A2 das Zeugnis|die Zeugnisse|school report; certificate|Morgen gibt es Zeugnisse.|Tomorrow we get our reports.
A2 das Fach|die Fächer|subject|Mathe ist mein Lieblingsfach.|Maths is my favourite subject.
A2 das Studium|die Studien|studies (at university)|Das Studium dauert drei Jahre.|The degree takes three years.
A1 die Hausaufgabe|die Hausaufgaben|homework|Hast du deine Hausaufgaben gemacht?|Have you done your homework?
A1 die Frage|die Fragen|question|Darf ich eine Frage stellen?|May I ask a question?
A1 die Antwort|die Antworten|answer|Die Antwort ist richtig.|The answer is correct.
A1 das Buch|die Bücher|book|Ich lese ein spannendes Buch.|I'm reading an exciting book.
A1 das Heft|die Hefte|exercise book|Schreibt die Wörter in euer Heft.|Write the words in your exercise books.
A1 der Stift|die Stifte|pen, pencil|Hast du einen Stift für mich?|Do you have a pen for me?
A1 das Papier|die Papiere|paper|Ich brauche ein Blatt Papier.|I need a sheet of paper.
A1 die Sprache|die Sprachen|language|Welche Sprachen sprichst du?|Which languages do you speak?
A1 das Wort|die Wörter|word|Dieses Wort kenne ich nicht.|I don't know this word.
A1 der Satz|die Sätze|sentence|Bilden Sie einen Satz.|Make a sentence.
A1 der Fehler|die Fehler|mistake|Jeder macht Fehler.|Everyone makes mistakes.
A1 die Zeitung|die Zeitungen|newspaper|Mein Vater liest jeden Morgen die Zeitung.|My father reads the paper every morning.` });

DICT_DATA.push({ theme: "Nature & Weather", type: "noun", words: `
A2 die Natur|—|nature|Am Wochenende sind wir gern in der Natur.|At the weekend we like being out in nature.
A1 das Wetter|—|weather|Wie ist das Wetter heute?|What's the weather like today?
A1 die Sonne|—|sun|Die Sonne scheint.|The sun is shining.
A1 der Regen|—|rain|Morgen gibt es Regen.|There will be rain tomorrow.
A1 der Schnee|—|snow|Die Kinder spielen im Schnee.|The children are playing in the snow.
A1 der Wind|die Winde|wind|Heute ist viel Wind.|It's very windy today.
A2 die Wolke|die Wolken|cloud|Am Himmel sind viele Wolken.|There are lots of clouds in the sky.
A2 das Gewitter|die Gewitter|thunderstorm|Heute Abend gibt es ein Gewitter.|There'll be a thunderstorm tonight.
A2 der Nebel|—|fog|Im Herbst gibt es oft Nebel.|There's often fog in autumn.
A2 der Sturm|die Stürme|storm|Der Sturm hat viele Bäume umgeworfen.|The storm knocked down many trees.
A2 die Hitze|—|heat|Bei dieser Hitze bleibe ich zu Hause.|I'm staying at home in this heat.
A2 die Kälte|—|cold|Die Kälte kommt aus dem Osten.|The cold is coming from the east.
A2 der Himmel|die Himmel|sky; heaven|Der Himmel ist blau.|The sky is blue.
A2 die Temperatur|die Temperaturen|temperature|Die Temperaturen steigen auf 30 Grad.|Temperatures are rising to 30 degrees.
A2 der Mond|die Monde|moon|Heute ist Vollmond.|There's a full moon tonight.
A2 der Stern|die Sterne|star|Auf dem Land sieht man viele Sterne.|In the countryside you can see lots of stars.
A1 der Baum|die Bäume|tree|Vor dem Haus steht ein großer Baum.|There's a big tree in front of the house.
A1 die Blume|die Blumen|flower|Ich schenke dir Blumen.|I'm giving you flowers.
A2 die Pflanze|die Pflanzen|plant|Vergiss nicht, die Pflanzen zu gießen.|Don't forget to water the plants.
A2 das Gras|die Gräser|grass|Wir sitzen im Gras.|We're sitting in the grass.
A1 der Wald|die Wälder|forest|Wir gehen im Wald spazieren.|We go for a walk in the forest.
A1 der Berg|die Berge|mountain|Die Zugspitze ist der höchste Berg Deutschlands.|The Zugspitze is Germany's highest mountain.
A2 das Tal|die Täler|valley|Das Dorf liegt in einem Tal.|The village lies in a valley.
A1 der See|die Seen|lake|Im Sommer schwimmen wir im See.|In summer we swim in the lake.
A1 das Meer|die Meere|sea|Wir fahren ans Meer.|We're going to the seaside.
A1 der Fluss|die Flüsse|river|Der Rhein ist ein langer Fluss.|The Rhine is a long river.
A1 der Strand|die Strände|beach|Wir liegen den ganzen Tag am Strand.|We lie on the beach all day.
A2 die Insel|die Inseln|island|Rügen ist die größte Insel Deutschlands.|Rügen is Germany's largest island.
A2 das Feld|die Felder|field|Auf dem Feld wächst Weizen.|Wheat is growing in the field.
B1 die Landschaft|die Landschaften|landscape|Die Landschaft in den Alpen ist wunderschön.|The landscape in the Alps is beautiful.
B1 die Küste|die Küsten|coast|Wir machen Urlaub an der Küste.|We're holidaying on the coast.
A1 die Welt|die Welten|world|Sie möchte die ganze Welt sehen.|She wants to see the whole world.
A1 das Tier|die Tiere|animal|Hast du ein Tier zu Hause?|Do you have a pet at home?
A1 der Hund|die Hunde|dog|Der Hund bellt.|The dog is barking.
A1 die Katze|die Katzen|cat|Die Katze schläft auf dem Sofa.|The cat is sleeping on the sofa.
A1 das Pferd|die Pferde|horse|Sie reitet gern Pferde.|She likes riding horses.
A1 die Kuh|die Kühe|cow|Auf der Wiese stehen Kühe.|There are cows in the meadow.
A2 das Schwein|die Schweine|pig|Der Bauer hat zwanzig Schweine.|The farmer has twenty pigs.
A2 das Huhn|die Hühner|chicken, hen|Die Hühner legen jeden Tag Eier.|The hens lay eggs every day.
A1 der Vogel|die Vögel|bird|Die Vögel singen am Morgen.|The birds sing in the morning.
A2 die Maus|die Mäuse|mouse|Die Katze fängt eine Maus.|The cat catches a mouse.` });

DICT_DATA.push({ theme: "Clothes", type: "noun", words: `
A1 die Kleidung|—|clothing|Warme Kleidung ist im Winter wichtig.|Warm clothes are important in winter.
A1 das Kleid|die Kleider|dress|Das Kleid steht dir gut.|The dress suits you.
A1 die Hose|die Hosen|trousers|Die Hose ist zu lang.|The trousers are too long.
A1 der Rock|die Röcke|skirt|Sie trägt einen roten Rock.|She's wearing a red skirt.
A1 das Hemd|die Hemden|shirt|Er trägt ein weißes Hemd.|He's wearing a white shirt.
A1 die Bluse|die Blusen|blouse|Die Bluse ist aus Seide.|The blouse is made of silk.
A1 das T-Shirt|die T-Shirts|T-shirt|Im Sommer trage ich T-Shirts.|In summer I wear T-shirts.
A1 der Pullover|die Pullover|jumper, sweater|Nimm einen Pullover mit!|Take a jumper with you!
A1 die Jacke|die Jacken|jacket|Zieh deine Jacke an, es ist kalt.|Put your jacket on, it's cold.
A1 der Mantel|die Mäntel|coat|Ich brauche einen neuen Wintermantel.|I need a new winter coat.
A2 der Anzug|die Anzüge|suit|Zur Hochzeit trägt er einen Anzug.|He's wearing a suit to the wedding.
A2 die Krawatte|die Krawatten|tie|Muss ich eine Krawatte tragen?|Do I have to wear a tie?
A1 der Schuh|die Schuhe|shoe|Diese Schuhe sind sehr bequem.|These shoes are very comfortable.
A2 der Stiefel|die Stiefel|boot|Im Winter trage ich Stiefel.|I wear boots in winter.
A1 die Socke|die Socken|sock|Ich finde meine Socken nicht.|I can't find my socks.
A1 der Hut|die Hüte|hat|Der Hut ist altmodisch.|The hat is old-fashioned.
A2 die Mütze|die Mützen|cap, woolly hat|Setz deine Mütze auf!|Put your hat on!
A2 der Schal|die Schals|scarf|Der Schal ist schön warm.|The scarf is nice and warm.
A2 der Handschuh|die Handschuhe|glove|Ich habe einen Handschuh verloren.|I've lost a glove.
A2 der Gürtel|die Gürtel|belt|Der Gürtel ist aus Leder.|The belt is made of leather.
A1 die Tasche|die Taschen|bag; pocket|Das Handy ist in meiner Tasche.|The phone is in my bag.
A2 die Brille|die Brillen|glasses|Ohne Brille sehe ich nichts.|I can't see anything without my glasses.
A2 der Regenschirm|die Regenschirme|umbrella|Vergiss deinen Regenschirm nicht!|Don't forget your umbrella!
A2 die Größe|die Größen|size|Welche Größe haben Sie?|What size are you?
B1 der Schmuck|—|jewellery|Sie trägt nur wenig Schmuck.|She wears very little jewellery.` });

DICT_DATA.push({ theme: "Verbs", type: "verb", words: `
A1 sein|ist|war|ist gewesen|to be|Ich bin müde.|I'm tired.
A1 haben|hat|hatte|hat gehabt|to have|Wir haben einen Hund.|We have a dog.
A1 werden|wird|wurde|ist geworden|to become|Sie wird Ärztin.|She's going to be a doctor.
A1 können|kann|konnte|hat gekonnt|can, to be able to|Kannst du schwimmen?|Can you swim?
A1 müssen|muss|musste|hat gemusst|must, to have to|Ich muss jetzt gehen.|I have to go now.
A1 wollen|will|wollte|hat gewollt|to want|Wir wollen ein Haus kaufen.|We want to buy a house.
A1 dürfen|darf|durfte|hat gedurft|may, to be allowed to|Darf ich hier rauchen?|May I smoke here?
A2 sollen|soll|sollte|hat gesollt|should, to be supposed to|Du sollst mehr schlafen.|You're supposed to sleep more.
A1 mögen|mag|mochte|hat gemocht|to like|Ich mag Katzen.|I like cats.
A1 machen|macht|machte|hat gemacht|to make, to do|Was machst du heute?|What are you doing today?
A2 tun|tut|tat|hat getan|to do|Was kann ich für Sie tun?|What can I do for you?
A1 gehen|geht|ging|ist gegangen|to go, to walk|Wir gehen ins Kino.|We're going to the cinema.
A1 kommen|kommt|kam|ist gekommen|to come|Woher kommst du?|Where are you from?
A1 fahren|fährt|fuhr|ist gefahren|to drive, to go (by vehicle)|Wir fahren mit dem Zug.|We're going by train.
A1 fliegen|fliegt|flog|ist geflogen|to fly|Morgen fliege ich nach London.|Tomorrow I'm flying to London.
A2 laufen|läuft|lief|ist gelaufen|to run; to walk|Er läuft jeden Morgen fünf Kilometer.|He runs five kilometres every morning.
A1 bleiben|bleibt|blieb|ist geblieben|to stay|Heute bleibe ich zu Hause.|I'm staying at home today.
A2 reisen|reist|reiste|ist gereist|to travel|Sie reist gern allein.|She likes travelling alone.
A1 schwimmen|schwimmt|schwamm|ist geschwommen|to swim|Im Sommer schwimmen wir im See.|In summer we swim in the lake.
A1 sehen|sieht|sah|hat gesehen|to see|Ich sehe dich morgen.|I'll see you tomorrow.
A1 hören|hört|hörte|hat gehört|to hear|Hörst du die Musik?|Can you hear the music?
A1 sagen|sagt|sagte|hat gesagt|to say|Was hast du gesagt?|What did you say?
A1 sprechen|spricht|sprach|hat gesprochen|to speak|Sprechen Sie Deutsch?|Do you speak German?
A2 erzählen|erzählt|erzählte|hat erzählt|to tell (a story)|Erzähl mal, wie war der Urlaub?|Tell me, how was the holiday?
A1 fragen|fragt|fragte|hat gefragt|to ask|Darf ich Sie etwas fragen?|May I ask you something?
A1 antworten|antwortet|antwortete|hat geantwortet|to answer|Bitte antworten Sie schnell.|Please answer quickly.
A2 erklären|erklärt|erklärte|hat erklärt|to explain|Kannst du mir das erklären?|Can you explain that to me?
A2 rufen|ruft|rief|hat gerufen|to call, to shout|Ruf bitte ein Taxi!|Please call a taxi!
A1 geben|gibt|gab|hat gegeben|to give|Gib mir bitte das Salz.|Please pass me the salt.
A1 nehmen|nimmt|nahm|hat genommen|to take|Ich nehme den Bus.|I'll take the bus.
A2 bringen|bringt|brachte|hat gebracht|to bring|Bringst du Getränke mit?|Are you bringing drinks?
A1 bekommen|bekommt|bekam|hat bekommen|to get, to receive|Ich habe einen Brief bekommen.|I got a letter.
A2 zeigen|zeigt|zeigte|hat gezeigt|to show|Ich zeige dir die Stadt.|I'll show you the city.
A1 essen|isst|aß|hat gegessen|to eat|Was isst du gern?|What do you like to eat?
A1 trinken|trinkt|trank|hat getrunken|to drink|Ich trinke keinen Alkohol.|I don't drink alcohol.
A1 kochen|kocht|kochte|hat gekocht|to cook|Heute koche ich Spaghetti.|Today I'm cooking spaghetti.
A1 schlafen|schläft|schlief|hat geschlafen|to sleep|Hast du gut geschlafen?|Did you sleep well?
A1 wohnen|wohnt|wohnte|hat gewohnt|to live, to reside|Ich wohne in Köln.|I live in Cologne.
A2 leben|lebt|lebte|hat gelebt|to live, to be alive|Sie lebt seit zehn Jahren in Deutschland.|She has lived in Germany for ten years.
A1 arbeiten|arbeitet|arbeitete|hat gearbeitet|to work|Er arbeitet als Ingenieur.|He works as an engineer.
A1 lernen|lernt|lernte|hat gelernt|to learn, to study|Ich lerne jeden Tag Deutsch.|I learn German every day.
A1 studieren|studiert|studierte|hat studiert|to study (at university)|Sie studiert Medizin.|She's studying medicine.
A1 lesen|liest|las|hat gelesen|to read|Er liest gern Krimis.|He likes reading crime novels.
A1 schreiben|schreibt|schrieb|hat geschrieben|to write|Ich schreibe eine E-Mail.|I'm writing an email.
A1 spielen|spielt|spielte|hat gespielt|to play|Die Kinder spielen im Park.|The children are playing in the park.
A1 kaufen|kauft|kaufte|hat gekauft|to buy|Ich kaufe ein neues Handy.|I'm buying a new phone.
A2 verkaufen|verkauft|verkaufte|hat verkauft|to sell|Wir verkaufen unser Auto.|We're selling our car.
A1 bezahlen|bezahlt|bezahlte|hat bezahlt|to pay|Ich möchte bitte bezahlen.|I'd like to pay, please.
A1 kosten|kostet|kostete|hat gekostet|to cost|Was kostet das?|How much is that?
A1 brauchen|braucht|brauchte|hat gebraucht|to need|Ich brauche deine Hilfe.|I need your help.
A2 benutzen|benutzt|benutzte|hat benutzt|to use|Darf ich dein Handy benutzen?|May I use your phone?
A1 finden|findet|fand|hat gefunden|to find; to think (opinion)|Ich finde den Film gut.|I think the film is good.
A1 suchen|sucht|suchte|hat gesucht|to look for|Ich suche meine Brille.|I'm looking for my glasses.
A2 verlieren|verliert|verlor|hat verloren|to lose|Ich habe meinen Schlüssel verloren.|I've lost my key.
A2 gewinnen|gewinnt|gewann|hat gewonnen|to win|Wer hat das Spiel gewonnen?|Who won the game?
A2 denken|denkt|dachte|hat gedacht|to think|Ich denke oft an dich.|I often think of you.
A1 wissen|weiß|wusste|hat gewusst|to know (a fact)|Ich weiß es nicht.|I don't know.
A1 kennen|kennt|kannte|hat gekannt|to know (be familiar with)|Kennst du diesen Mann?|Do you know this man?
A1 verstehen|versteht|verstand|hat verstanden|to understand|Ich verstehe dich nicht.|I don't understand you.
A2 glauben|glaubt|glaubte|hat geglaubt|to believe|Ich glaube, er hat recht.|I think he's right.
A2 vergessen|vergisst|vergaß|hat vergessen|to forget|Vergiss nicht, mich anzurufen!|Don't forget to call me!
A2 versuchen|versucht|versuchte|hat versucht|to try|Ich versuche es noch einmal.|I'll try again.
A1 helfen|hilft|half|hat geholfen|to help|Kann ich Ihnen helfen?|Can I help you?
A1 lieben|liebt|liebte|hat geliebt|to love|Ich liebe dich.|I love you.
A1 warten|wartet|wartete|hat gewartet|to wait|Ich warte auf den Bus.|I'm waiting for the bus.
A1 öffnen|öffnet|öffnete|hat geöffnet|to open|Die Bank öffnet um neun.|The bank opens at nine.
A2 schließen|schließt|schloss|hat geschlossen|to close|Bitte schließen Sie die Tür.|Please close the door.
A2 beginnen|beginnt|begann|hat begonnen|to begin|Der Film beginnt um acht.|The film starts at eight.
A2 treffen|trifft|traf|hat getroffen|to meet|Ich treffe meine Freunde im Café.|I'm meeting my friends in the café.
A1 besuchen|besucht|besuchte|hat besucht|to visit|Wir besuchen unsere Großeltern.|We're visiting our grandparents.
A2 tragen|trägt|trug|hat getragen|to carry; to wear|Sie trägt eine Brille.|She wears glasses.
A2 waschen|wäscht|wusch|hat gewaschen|to wash|Ich wasche das Auto.|I'm washing the car.
A1 sitzen|sitzt|saß|hat gesessen|to sit|Wir sitzen im Garten.|We're sitting in the garden.
A1 stehen|steht|stand|hat gestanden|to stand|Die Vase steht auf dem Tisch.|The vase is on the table.
A2 liegen|liegt|lag|hat gelegen|to lie (be lying)|Das Buch liegt auf dem Bett.|The book is lying on the bed.
A2 legen|legt|legte|hat gelegt|to lay, to put (flat)|Leg das Buch auf den Tisch.|Put the book on the table.
A2 stellen|stellt|stellte|hat gestellt|to put (upright)|Stell die Flasche in den Kühlschrank.|Put the bottle in the fridge.
A2 setzen|setzt|setzte|hat gesetzt|to set, to put|Er setzt das Kind auf den Stuhl.|He sets the child on the chair.
B1 lassen|lässt|ließ|hat gelassen|to let; to leave|Lass mich in Ruhe!|Leave me alone!
A1 heißen|heißt|hieß|hat geheißen|to be called|Wie heißt du?|What's your name?
A2 gefallen|gefällt|gefiel|hat gefallen|to please (be liked by)|Die Stadt gefällt mir.|I like the city.
A2 gehören|gehört|gehörte|hat gehört|to belong to|Wem gehört das Fahrrad?|Whose bike is this?
A1 tanzen|tanzt|tanzte|hat getanzt|to dance|Wir tanzen die ganze Nacht.|We dance all night.
A1 singen|singt|sang|hat gesungen|to sing|Sie singt im Chor.|She sings in a choir.
A2 lachen|lacht|lachte|hat gelacht|to laugh|Wir haben viel gelacht.|We laughed a lot.
A2 weinen|weint|weinte|hat geweint|to cry|Warum weint das Baby?|Why is the baby crying?
A2 passieren|passiert|passierte|ist passiert|to happen|Was ist passiert?|What happened?
B1 sterben|stirbt|starb|ist gestorben|to die|Sein Großvater ist letztes Jahr gestorben.|His grandfather died last year.
A1 anfangen|fängt an|fing an|hat angefangen|to start|Wann fängt der Kurs an?|When does the course start?
A2 aufhören|hört auf|hörte auf|hat aufgehört|to stop|Hör auf zu lachen!|Stop laughing!
A1 aufstehen|steht auf|stand auf|ist aufgestanden|to get up|Ich stehe um sieben Uhr auf.|I get up at seven.
A1 einkaufen|kauft ein|kaufte ein|hat eingekauft|to go shopping|Ich kaufe am Samstag ein.|I go shopping on Saturday.
A1 anrufen|ruft an|rief an|hat angerufen|to call (on the phone)|Ich rufe dich heute Abend an.|I'll call you tonight.
A1 mitkommen|kommt mit|kam mit|ist mitgekommen|to come along|Kommst du mit ins Kino?|Are you coming to the cinema with us?
A1 fernsehen|sieht fern|sah fern|hat ferngesehen|to watch TV|Abends sehen wir fern.|We watch TV in the evening.
A2 ankommen|kommt an|kam an|ist angekommen|to arrive|Wann kommt der Zug an?|When does the train arrive?
A2 abfahren|fährt ab|fuhr ab|ist abgefahren|to depart|Der Bus fährt um acht ab.|The bus leaves at eight.
A2 einsteigen|steigt ein|stieg ein|ist eingestiegen|to get on/in|Bitte einsteigen!|All aboard, please!
A2 aussteigen|steigt aus|stieg aus|ist ausgestiegen|to get off/out|Wir müssen hier aussteigen.|We have to get off here.
A2 umsteigen|steigt um|stieg um|ist umgestiegen|to change (trains etc.)|In Frankfurt müssen Sie umsteigen.|You have to change in Frankfurt.
A2 sich freuen|freut sich|freute sich|hat sich gefreut|to be happy/glad|Ich freue mich auf das Wochenende.|I'm looking forward to the weekend.
A2 sich fühlen|fühlt sich|fühlte sich|hat sich gefühlt|to feel|Ich fühle mich nicht gut.|I don't feel well.
B1 sich erinnern|erinnert sich|erinnerte sich|hat sich erinnert|to remember|Ich erinnere mich gut an den Urlaub.|I remember the holiday well.
A2 bestellen|bestellt|bestellte|hat bestellt|to order|Ich bestelle eine Pizza.|I'm ordering a pizza.
A2 buchen|bucht|buchte|hat gebucht|to book|Wir haben ein Hotel gebucht.|We've booked a hotel.
A2 einladen|lädt ein|lud ein|hat eingeladen|to invite|Ich lade dich zum Essen ein.|I'm inviting you for a meal.
A2 feiern|feiert|feierte|hat gefeiert|to celebrate|Wir feiern heute meinen Geburtstag.|Today we're celebrating my birthday.
A2 packen|packt|packte|hat gepackt|to pack|Hast du deinen Koffer schon gepackt?|Have you packed your suitcase yet?
A2 putzen|putzt|putzte|hat geputzt|to clean|Am Samstag putzen wir die Wohnung.|On Saturday we clean the flat.
A2 schicken|schickt|schickte|hat geschickt|to send|Ich schicke dir eine Nachricht.|I'll send you a message.
A2 verdienen|verdient|verdiente|hat verdient|to earn|Sie verdient gut.|She earns well.
A2 wiederholen|wiederholt|wiederholte|hat wiederholt|to repeat|Können Sie das bitte wiederholen?|Could you repeat that, please?
A2 ausfüllen|füllt aus|füllte aus|hat ausgefüllt|to fill in|Bitte füllen Sie das Formular aus.|Please fill in the form.
A2 aufmachen|macht auf|machte auf|hat aufgemacht|to open|Mach bitte das Fenster auf!|Please open the window!
A2 zuhören|hört zu|hörte zu|hat zugehört|to listen|Hör mir bitte zu!|Please listen to me!
A2 umziehen|zieht um|zog um|ist umgezogen|to move (house)|Wir ziehen nächsten Monat um.|We're moving next month.
A2 vorbereiten|bereitet vor|bereitete vor|hat vorbereitet|to prepare|Ich bereite das Essen vor.|I'm preparing the food.
A2 teilnehmen|nimmt teil|nahm teil|hat teilgenommen|to take part|Nimmst du am Kurs teil?|Are you taking part in the course?
A2 kennenlernen|lernt kennen|lernte kennen|hat kennengelernt|to get to know, to meet|Wo habt ihr euch kennengelernt?|Where did you meet?
B1 vergleichen|vergleicht|verglich|hat verglichen|to compare|Vergleichen Sie die Preise!|Compare the prices!
B1 entscheiden|entscheidet|entschied|hat entschieden|to decide|Wir entscheiden morgen.|We'll decide tomorrow.
B1 erreichen|erreicht|erreichte|hat erreicht|to reach|Wir haben den Zug gerade noch erreicht.|We only just caught the train.
B1 erfahren|erfährt|erfuhr|hat erfahren|to find out|Wann erfahre ich das Ergebnis?|When will I find out the result?
B1 empfehlen|empfiehlt|empfahl|hat empfohlen|to recommend|Können Sie mir ein Restaurant empfehlen?|Can you recommend a restaurant?
B1 verbessern|verbessert|verbesserte|hat verbessert|to improve|Ich möchte mein Deutsch verbessern.|I'd like to improve my German.
B1 beschreiben|beschreibt|beschrieb|hat beschrieben|to describe|Beschreiben Sie das Bild.|Describe the picture.
B1 bestehen|besteht|bestand|hat bestanden|to pass (an exam); to consist|Sie hat die Prüfung bestanden.|She passed the exam.
B1 sich bewerben|bewirbt sich|bewarb sich|hat sich beworben|to apply (for a job)|Er bewirbt sich um eine neue Stelle.|He's applying for a new job.
B1 sich beschweren|beschwert sich|beschwerte sich|hat sich beschwert|to complain|Der Gast beschwert sich über das Essen.|The guest is complaining about the food.
B1 sich kümmern|kümmert sich|kümmerte sich|hat sich gekümmert|to take care of|Wer kümmert sich um den Hund?|Who's looking after the dog?
B1 sich gewöhnen|gewöhnt sich|gewöhnte sich|hat sich gewöhnt|to get used to|Ich gewöhne mich langsam an das Wetter.|I'm slowly getting used to the weather.
B1 unterstützen|unterstützt|unterstützte|hat unterstützt|to support|Meine Eltern unterstützen mich.|My parents support me.
B1 verlassen|verlässt|verließ|hat verlassen|to leave|Er verlässt das Haus um acht.|He leaves the house at eight.
B1 vermeiden|vermeidet|vermied|hat vermieden|to avoid|Versuch, Stress zu vermeiden.|Try to avoid stress.
B1 verschieben|verschiebt|verschob|hat verschoben|to postpone|Wir müssen den Termin verschieben.|We have to postpone the appointment.
B1 wachsen|wächst|wuchs|ist gewachsen|to grow|Die Stadt wächst schnell.|The city is growing fast.
B1 fallen|fällt|fiel|ist gefallen|to fall|Die Preise sind gefallen.|Prices have fallen.
B1 steigen|steigt|stieg|ist gestiegen|to rise; to climb|Die Mieten steigen jedes Jahr.|Rents rise every year.
B1 halten|hält|hielt|hat gehalten|to hold; to stop|Der Bus hält vor dem Bahnhof.|The bus stops in front of the station.
B1 anbieten|bietet an|bot an|hat angeboten|to offer|Darf ich Ihnen etwas zu trinken anbieten?|May I offer you something to drink?
B1 beantragen|beantragt|beantragte|hat beantragt|to apply for (officially)|Ich muss ein Visum beantragen.|I have to apply for a visa.
B1 kündigen|kündigt|kündigte|hat gekündigt|to quit; to cancel|Er hat seine Stelle gekündigt.|He has quit his job.
B1 leihen|leiht|lieh|hat geliehen|to lend; to borrow|Kannst du mir dein Fahrrad leihen?|Can you lend me your bike?
B1 schneiden|schneidet|schnitt|hat geschnitten|to cut|Schneide das Brot in Scheiben.|Cut the bread into slices.
B1 sparen|spart|sparte|hat gespart|to save|Wir sparen für den Urlaub.|We're saving for our holiday.
B1 überweisen|überweist|überwies|hat überwiesen|to transfer (money)|Ich überweise dir das Geld morgen.|I'll transfer the money to you tomorrow.
A2 zahlen|zahlt|zahlte|hat gezahlt|to pay|Kann ich mit Karte zahlen?|Can I pay by card?
B1 streiten|streitet|stritt|hat gestritten|to argue|Die Kinder streiten oft.|The children often argue.
B1 lügen|lügt|log|hat gelogen|to lie (tell lies)|Er hat noch nie gelogen.|He has never lied.
B1 verbieten|verbietet|verbot|hat verboten|to forbid|Meine Eltern verbieten mir das.|My parents don't allow me to do that.
B1 erlauben|erlaubt|erlaubte|hat erlaubt|to allow|Ist das Rauchen hier erlaubt?|Is smoking allowed here?
B1 behaupten|behauptet|behauptete|hat behauptet|to claim|Er behauptet, dass er krank ist.|He claims that he's ill.
B1 diskutieren|diskutiert|diskutierte|hat diskutiert|to discuss|Wir diskutieren über Politik.|We're discussing politics.
B1 entwickeln|entwickelt|entwickelte|hat entwickelt|to develop|Die Firma entwickelt neue Software.|The company develops new software.
B1 erwarten|erwartet|erwartete|hat erwartet|to expect|Wir erwarten viele Gäste.|We're expecting a lot of guests.
B2 berücksichtigen|berücksichtigt|berücksichtigte|hat berücksichtigt|to take into account|Wir berücksichtigen Ihre Wünsche.|We take your wishes into account.
B2 verhindern|verhindert|verhinderte|hat verhindert|to prevent|Das konnte niemand verhindern.|Nobody could prevent that.
B2 überzeugen|überzeugt|überzeugte|hat überzeugt|to convince|Seine Argumente haben mich überzeugt.|His arguments convinced me.
B2 beeinflussen|beeinflusst|beeinflusste|hat beeinflusst|to influence|Das Wetter beeinflusst unsere Stimmung.|The weather influences our mood.
B2 fordern|fordert|forderte|hat gefordert|to demand|Die Gewerkschaft fordert mehr Lohn.|The union is demanding higher wages.
B2 verzichten|verzichtet|verzichtete|hat verzichtet|to do without|Ich verzichte auf Zucker.|I'm giving up sugar.
B2 zunehmen|nimmt zu|nahm zu|hat zugenommen|to increase; to gain weight|Der Verkehr nimmt ständig zu.|Traffic is constantly increasing.
B2 abnehmen|nimmt ab|nahm ab|hat abgenommen|to decrease; to lose weight|Er hat fünf Kilo abgenommen.|He has lost five kilos.
B2 durchführen|führt durch|führte durch|hat durchgeführt|to carry out|Die Studie wurde in Berlin durchgeführt.|The study was carried out in Berlin.
B2 betreffen|betrifft|betraf|hat betroffen|to concern, to affect|Das betrifft uns alle.|That concerns all of us.` });

DICT_DATA.push({ theme: "Adjectives", type: "word", words: `
A1 gut|good|Das Essen ist sehr gut.|The food is very good.
A1 schlecht|bad|Das Wetter ist schlecht.|The weather is bad.
A1 groß|big; tall|Er ist sehr groß.|He is very tall.
A1 klein|small; short|Wir wohnen in einer kleinen Wohnung.|We live in a small flat.
A1 alt|old|Das Haus ist sehr alt.|The house is very old.
A1 jung|young|Sie ist noch jung.|She's still young.
A1 neu|new|Ich habe ein neues Fahrrad.|I have a new bike.
A1 lang|long|Der Film ist zu lang.|The film is too long.
A1 kurz|short|Sie hat kurze Haare.|She has short hair.
A2 hoch|high|Der Berg ist sehr hoch.|The mountain is very high.
A2 tief|deep|Der See ist sehr tief.|The lake is very deep.
A1 schnell|fast|Das Auto ist sehr schnell.|The car is very fast.
A1 langsam|slow|Bitte sprechen Sie langsam.|Please speak slowly.
A1 teuer|expensive|Das Hotel ist zu teuer.|The hotel is too expensive.
A1 billig|cheap|Die Schuhe waren billig.|The shoes were cheap.
A2 günstig|good value, inexpensive|Die Wohnung ist sehr günstig.|The flat is very reasonably priced.
A1 schön|beautiful, nice|Was für ein schöner Tag!|What a lovely day!
A2 hässlich|ugly|Die Farbe finde ich hässlich.|I think the colour is ugly.
A1 warm|warm|Heute ist es warm.|It's warm today.
A1 kalt|cold|Das Wasser ist kalt.|The water is cold.
A1 heiß|hot|Vorsicht, der Tee ist heiß!|Careful, the tea is hot!
A2 kühl|cool|Am Abend wird es kühl.|It gets cool in the evening.
A2 hell|bright, light|Das Zimmer ist schön hell.|The room is nice and bright.
A2 dunkel|dark|Im Winter wird es früh dunkel.|It gets dark early in winter.
A2 leicht|easy; light (weight)|Die Prüfung war leicht.|The exam was easy.
A2 schwer|difficult; heavy|Der Koffer ist schwer.|The suitcase is heavy.
A1 einfach|simple, easy|Das ist ganz einfach.|That's very simple.
A2 schwierig|difficult|Deutsch ist nicht so schwierig.|German isn't that difficult.
A1 richtig|right, correct|Die Antwort ist richtig.|The answer is correct.
A1 falsch|wrong|Das ist leider falsch.|Unfortunately that's wrong.
A2 voll|full|Der Bus ist ganz voll.|The bus is completely full.
A2 leer|empty|Der Kühlschrank ist leer.|The fridge is empty.
A1 offen|open|Die Tür ist offen.|The door is open.
A2 geschlossen|closed|Das Museum ist montags geschlossen.|The museum is closed on Mondays.
A1 laut|loud|Die Musik ist zu laut.|The music is too loud.
A1 leise|quiet (sound)|Sprich bitte leise.|Please speak quietly.
A2 ruhig|calm, quiet|Wir wohnen in einer ruhigen Straße.|We live in a quiet street.
A1 früh|early|Ich stehe früh auf.|I get up early.
A1 spät|late|Es ist schon spät.|It's already late.
A2 nah|near|Der Bahnhof ist ganz nah.|The station is very close.
A1 weit|far; wide|Ist es weit bis zum Zentrum?|Is it far to the centre?
A1 wichtig|important|Das ist sehr wichtig.|That's very important.
A1 interessant|interesting|Das Buch ist sehr interessant.|The book is very interesting.
A2 langweilig|boring|Der Film war langweilig.|The film was boring.
A2 lustig|funny|Mein Onkel ist sehr lustig.|My uncle is very funny.
B1 ernst|serious|Das ist ein ernstes Problem.|That's a serious problem.
A1 nett|nice, kind|Die Nachbarn sind sehr nett.|The neighbours are very nice.
A1 freundlich|friendly|Die Verkäuferin ist sehr freundlich.|The sales assistant is very friendly.
A2 glücklich|happy|Sie ist sehr glücklich.|She's very happy.
A2 traurig|sad|Warum bist du so traurig?|Why are you so sad?
A1 müde|tired|Ich bin sehr müde.|I'm very tired.
A1 krank|ill, sick|Ich bin krank und bleibe zu Hause.|I'm ill and staying at home.
A2 gesund|healthy|Obst ist gesund.|Fruit is healthy.
A2 reich|rich|Er ist sehr reich.|He's very rich.
A2 arm|poor|Die Familie ist arm.|The family is poor.
A2 stark|strong|Der Kaffee ist sehr stark.|The coffee is very strong.
A2 schwach|weak|Nach der Krankheit fühle ich mich schwach.|I feel weak after the illness.
A2 dick|fat; thick|Das Buch ist sehr dick.|The book is very thick.
A2 dünn|thin|Die Wände sind sehr dünn.|The walls are very thin.
A2 sauber|clean|Die Küche ist sauber.|The kitchen is clean.
A2 schmutzig|dirty|Deine Schuhe sind schmutzig.|Your shoes are dirty.
A1 fertig|finished, ready|Bist du fertig?|Are you ready?
A1 frei|free; vacant|Ist dieser Platz frei?|Is this seat free?
A2 besetzt|occupied, taken|Die Toilette ist besetzt.|The toilet is occupied.
A2 möglich|possible|Ist das möglich?|Is that possible?
A2 sicher|safe; sure|Bist du sicher?|Are you sure?
A2 gefährlich|dangerous|Die Straße ist gefährlich.|The road is dangerous.
A1 lecker|tasty, delicious|Der Kuchen ist lecker!|The cake is delicious!
A2 süß|sweet|Die Kirschen sind süß.|The cherries are sweet.
A2 sauer|sour; annoyed (colloq.)|Die Zitrone ist sauer.|The lemon is sour.
A2 salzig|salty|Die Suppe ist zu salzig.|The soup is too salty.
A2 scharf|spicy; sharp|Das Curry ist sehr scharf.|The curry is very spicy.
A2 bequem|comfortable|Das Sofa ist sehr bequem.|The sofa is very comfortable.
A2 gemütlich|cosy|Das Café ist sehr gemütlich.|The café is very cosy.
A2 praktisch|practical|Die Tasche ist sehr praktisch.|The bag is very practical.
A2 kaputt|broken|Mein Handy ist kaputt.|My phone is broken.
A2 pünktlich|punctual, on time|Der Zug ist pünktlich.|The train is on time.
A2 zufrieden|satisfied|Ich bin mit dem Ergebnis zufrieden.|I'm satisfied with the result.
A2 ehrlich|honest|Sei bitte ehrlich!|Please be honest!
A2 höflich|polite|Er ist immer sehr höflich.|He's always very polite.
A2 fleißig|hard-working|Sie ist eine fleißige Schülerin.|She's a hard-working pupil.
A2 faul|lazy|Heute bin ich richtig faul.|I'm really lazy today.
A2 neugierig|curious|Kinder sind sehr neugierig.|Children are very curious.
A2 bekannt|well-known|Die Stadt ist für ihr Bier bekannt.|The city is known for its beer.
A2 berühmt|famous|Er ist ein berühmter Schauspieler.|He's a famous actor.
A2 fremd|foreign; strange|Ich bin fremd hier.|I'm not from around here.
A2 wunderbar|wonderful|Das ist eine wunderbare Idee!|That's a wonderful idea!
A2 schrecklich|terrible|Das Wetter war schrecklich.|The weather was terrible.
A2 hungrig|hungry|Nach dem Sport bin ich immer hungrig.|I'm always hungry after sport.
B1 zuverlässig|reliable|Sie ist eine zuverlässige Kollegin.|She's a reliable colleague.
B1 selbstständig|independent; self-employed|Er arbeitet sehr selbstständig.|He works very independently.
B1 geduldig|patient|Die Lehrerin ist sehr geduldig.|The teacher is very patient.
B1 vorsichtig|careful|Sei vorsichtig auf der Straße!|Be careful on the road!
B1 verantwortlich|responsible|Wer ist dafür verantwortlich?|Who's responsible for this?
B1 notwendig|necessary|Ist das wirklich notwendig?|Is that really necessary?
B1 ähnlich|similar|Die beiden Schwestern sind sich sehr ähnlich.|The two sisters are very alike.
B1 sinnvoll|sensible, useful|Das ist eine sinnvolle Lösung.|That's a sensible solution.
B1 kostenlos|free of charge|Der Eintritt ist kostenlos.|Admission is free.
B1 erfolgreich|successful|Die Firma ist sehr erfolgreich.|The company is very successful.
B1 aktuell|current|Das ist ein aktuelles Thema.|That's a current topic.
B1 wahrscheinlich|probable; probably|Er kommt wahrscheinlich später.|He's probably coming later.
B1 persönlich|personal; in person|Ich möchte ihn persönlich kennenlernen.|I'd like to meet him in person.
B1 öffentlich|public|Wir fahren mit öffentlichen Verkehrsmitteln.|We use public transport.
B1 privat|private|Das ist meine private Nummer.|That's my private number.
B1 vegetarisch|vegetarian|Haben Sie auch vegetarische Gerichte?|Do you also have vegetarian dishes?
B1 umweltfreundlich|environmentally friendly|Das Fahrrad ist umweltfreundlich.|The bicycle is environmentally friendly.
B2 nachhaltig|sustainable|Wir müssen nachhaltiger leben.|We need to live more sustainably.
B2 erheblich|considerable|Die Kosten sind erheblich gestiegen.|Costs have risen considerably.
B2 umstritten|controversial|Das neue Gesetz ist umstritten.|The new law is controversial.
B2 zuständig|responsible (in charge)|Wer ist für die Anmeldung zuständig?|Who's in charge of registration?
B2 anspruchsvoll|demanding|Die Arbeit ist sehr anspruchsvoll.|The work is very demanding.
B2 vielfältig|diverse|Das Angebot ist sehr vielfältig.|There's a very wide range on offer.
B2 überzeugend|convincing|Seine Argumente waren überzeugend.|His arguments were convincing.` });

DICT_DATA.push({ theme: "Colours", type: "word", words: `
A1 rot|red|Die Ampel ist rot.|The light is red.
A1 blau|blue|Der Himmel ist blau.|The sky is blue.
A1 grün|green|Im Frühling ist alles grün.|In spring everything is green.
A1 gelb|yellow|Die Bananen sind gelb.|The bananas are yellow.
A1 schwarz|black|Ich trinke den Kaffee schwarz.|I drink my coffee black.
A1 weiß|white|Der Schnee ist weiß.|The snow is white.
A1 grau|grey|Der Himmel ist grau.|The sky is grey.
A1 braun|brown|Er hat braune Augen.|He has brown eyes.
A1 orange|orange|Die Blumen sind orange.|The flowers are orange.
A1 rosa|pink|Das Kleid ist rosa.|The dress is pink.
A1 lila|purple|Sie hat eine lila Tasche.|She has a purple bag.
A2 bunt|colourful|Die Häuser sind bunt.|The houses are colourful.` });

DICT_DATA.push({ theme: "Small words", type: "word", words: `
A1 und|and|Ich trinke Kaffee und esse ein Brötchen.|I drink coffee and eat a roll.
A1 oder|or|Möchtest du Tee oder Kaffee?|Would you like tea or coffee?
A1 aber|but|Das Auto ist alt, aber gut.|The car is old but good.
A2 denn|because (main clause)|Ich bleibe zu Hause, denn ich bin krank.|I'm staying at home because I'm ill.
A2 weil|because (verb at end)|Ich lerne Deutsch, weil ich in Berlin arbeite.|I'm learning German because I work in Berlin.
A2 dass|that|Ich glaube, dass er recht hat.|I think that he's right.
A2 wenn|if; when(ever)|Wenn es regnet, bleiben wir zu Hause.|If it rains, we'll stay at home.
A2 als|when (past); than|Als ich klein war, wohnten wir in Hamburg.|When I was little, we lived in Hamburg.
B1 ob|whether, if|Weißt du, ob er kommt?|Do you know whether he's coming?
A1 auch|also, too|Ich komme auch mit.|I'm coming too.
A1 nur|only|Ich habe nur zehn Euro.|I only have ten euros.
A1 sehr|very|Das ist sehr schön.|That's very nice.
A1 viel|much, a lot|Er arbeitet viel.|He works a lot.
A1 wenig|little, few|Ich habe wenig Zeit.|I have little time.
A1 mehr|more|Ich möchte mehr Wasser.|I'd like more water.
A1 alle|all, everyone|Alle sind da.|Everyone is here.
A1 etwas|something; a bit|Möchtest du etwas essen?|Would you like something to eat?
A1 nichts|nothing|Ich habe nichts gehört.|I didn't hear anything.
A2 jemand|somebody|Hat jemand angerufen?|Did anybody call?
A2 niemand|nobody|Niemand war zu Hause.|Nobody was at home.
A1 hier|here|Ich wohne hier.|I live here.
A1 dort|there|Dort ist der Bahnhof.|The station is over there.
A2 oben|up, above; upstairs|Das Bad ist oben.|The bathroom is upstairs.
A2 unten|down, below; downstairs|Die Küche ist unten.|The kitchen is downstairs.
A1 links|(on the) left|Gehen Sie hier links.|Turn left here.
A1 rechts|(on the) right|Die Apotheke ist rechts.|The chemist's is on the right.
A1 geradeaus|straight ahead|Gehen Sie immer geradeaus.|Keep going straight ahead.
A1 ja|yes|Ja, gern!|Yes, please!
A1 nein|no|Nein, danke.|No, thank you.
A1 nicht|not|Das weiß ich nicht.|I don't know that.
A1 vielleicht|maybe, perhaps|Vielleicht komme ich morgen.|Maybe I'll come tomorrow.
A2 natürlich|of course; natural|Natürlich helfe ich dir.|Of course I'll help you.
A2 wirklich|really|Das ist wirklich gut.|That's really good.
A2 genau|exactly|Genau, das meine ich!|Exactly, that's what I mean!
A1 zusammen|together|Wir kochen zusammen.|We cook together.
A2 allein|alone|Sie wohnt allein.|She lives alone.
A1 wieder|again|Ich bin wieder da.|I'm back again.
A1 zu|too; to; closed|Der Kaffee ist zu heiß.|The coffee is too hot.
A2 ganz|quite; whole|Das ist ganz einfach.|That's quite simple.
A2 fast|almost|Ich bin fast fertig.|I'm almost done.
A2 ungefähr|about, approximately|Das dauert ungefähr eine Stunde.|That takes about an hour.
A1 gern|gladly (with verb: to like doing)|Ich schwimme gern.|I like swimming.
A2 leider|unfortunately|Leider habe ich keine Zeit.|Unfortunately I don't have time.
A2 zum Beispiel|for example|Ich mag Obst, zum Beispiel Äpfel.|I like fruit, for example apples.
A2 sondern|but (rather)|Nicht heute, sondern morgen.|Not today but tomorrow.
B1 obwohl|although|Obwohl es regnet, gehen wir spazieren.|Although it's raining, we're going for a walk.
A2 deshalb|therefore, that's why|Ich bin müde, deshalb gehe ich ins Bett.|I'm tired, so I'm going to bed.
B1 trotzdem|nevertheless, still|Es war kalt, trotzdem sind wir geschwommen.|It was cold, but we swam anyway.
A2 außerdem|besides, also|Außerdem brauche ich noch Milch.|I also need milk.
A2 eigentlich|actually|Eigentlich wollte ich zu Hause bleiben.|Actually I wanted to stay at home.
B1 sogar|even|Er spricht sogar Chinesisch.|He even speaks Chinese.
B1 ziemlich|fairly, quite|Der Test war ziemlich schwer.|The test was quite hard.
B1 damit|so that|Ich spreche langsam, damit alle mich verstehen.|I speak slowly so that everyone understands me.
B1 während|while; during|Während ich koche, hört er Musik.|While I cook, he listens to music.
B1 bevor|before|Wasch dir die Hände, bevor du isst.|Wash your hands before you eat.
B1 nachdem|after|Nachdem wir gegessen hatten, gingen wir spazieren.|After we had eaten, we went for a walk.
B1 seitdem|since (then)|Seitdem er in Berlin wohnt, ist er glücklicher.|Since he's been living in Berlin, he's happier.
B1 sonst|otherwise|Beeil dich, sonst verpassen wir den Zug.|Hurry up, otherwise we'll miss the train.
B1 jedoch|however|Das Hotel war schön, jedoch sehr teuer.|The hotel was nice, but very expensive.
B2 allerdings|however; admittedly|Das stimmt, allerdings ist es teuer.|That's true, though it's expensive.
B1 dagegen|on the other hand; against it|Ich mag Tee, mein Bruder dagegen Kaffee.|I like tea; my brother, on the other hand, likes coffee.
B2 stattdessen|instead|Wir fahren nicht weg, stattdessen bleiben wir zu Hause.|We're not going away; we're staying at home instead.
B1 einerseits|on the one hand|Einerseits ist die Stadt laut …|On the one hand the city is noisy …
B1 andererseits|on the other hand|… andererseits ist sie sehr lebendig.|… on the other hand it's very lively.
B2 zumindest|at least|Zumindest hat er sich entschuldigt.|At least he apologised.
B2 hingegen|whereas, however|Er ist ruhig, sie hingegen redet viel.|He is quiet, whereas she talks a lot.
B2 folglich|consequently|Er war krank, folglich fehlte er.|He was ill, so he was absent.
B2 dennoch|nevertheless|Die Aufgabe war schwer, dennoch hat sie es geschafft.|The task was hard, yet she managed it.
B2 infolgedessen|as a result|Es gab einen Unfall, infolgedessen staute sich der Verkehr.|There was an accident; as a result, traffic backed up.` });

DICT_DATA.push({ theme: "Phrases", type: "word", words: `
A1 Hallo!|Hello!
A1 Guten Morgen!|Good morning!
A1 Guten Tag!|Hello! / Good day!
A1 Guten Abend!|Good evening!
A1 Gute Nacht!|Good night!
A1 Tschüss!|Bye!
A1 Auf Wiedersehen!|Goodbye! (formal)
A1 Bis bald!|See you soon!
A1 Bis morgen!|See you tomorrow!
A1 Wie geht's?|How are you?
A1 Wie geht es Ihnen?|How are you? (formal)
A1 Mir geht es gut.|I'm fine.
A1 Danke!|Thanks!
A1 Vielen Dank!|Thank you very much!
A1 Bitte!|Please! / You're welcome!
A1 Bitte schön!|Here you are! / You're welcome!
A1 Entschuldigung!|Excuse me! / Sorry!
A1 Es tut mir leid.|I'm sorry.
A1 Kein Problem.|No problem.
A2 Das macht nichts.|It doesn't matter.
A1 Wie bitte?|Pardon?
A1 Ich verstehe das nicht.|I don't understand.
A1 Können Sie das bitte wiederholen?|Could you repeat that, please?
A1 Sprechen Sie Englisch?|Do you speak English?
A1 Wie sagt man das auf Deutsch?|How do you say that in German?
A1 Ich heiße …|My name is …
A1 Woher kommen Sie?|Where are you from? (formal)
A1 Ich komme aus …|I come from …
A1 Wie spät ist es?|What time is it?
A1 Was kostet das?|How much is that?
A1 Ich hätte gern …|I would like …
A1 Die Rechnung, bitte.|The bill, please.
A1 Wo ist die Toilette?|Where is the toilet?
A1 Guten Appetit!|Enjoy your meal!
A1 Prost!|Cheers!
A2 Viel Glück!|Good luck!
A2 Alles Gute!|All the best!
A2 Herzlichen Glückwunsch!|Congratulations!
A2 Gute Besserung!|Get well soon!
A1 Schönes Wochenende!|Have a nice weekend!
A2 Keine Ahnung.|No idea.
A2 Na klar!|Sure! / Of course!
A2 Viel Spaß!|Have fun!
A2 Das ist mir egal.|I don't mind. / I don't care.
A2 Ich bin dafür.|I'm in favour.
A2 Ich bin dagegen.|I'm against it.
B1 Meiner Meinung nach …|In my opinion …
B1 Da hast du recht.|You're right there.
B1 Da bin ich anderer Meinung.|I disagree with that.
B1 Das kommt darauf an.|It depends.
B1 Ich melde mich.|I'll be in touch.
B1 Mit freundlichen Grüßen|Kind regards (letters)
B1 Sehr geehrte Damen und Herren,|Dear Sir or Madam,
B2 Es lässt sich nicht leugnen, dass …|It can't be denied that …
B2 Im Großen und Ganzen …|By and large …
B2 Unter diesen Umständen …|Under these circumstances …` });

DICT_DATA.push({ theme: "Feelings", type: "noun", words: `
A2 die Angst|die Ängste|fear|Ich habe Angst vor Hunden.|I'm afraid of dogs.
A2 die Freude|die Freuden|joy|Das Geschenk hat mir viel Freude gemacht.|The present gave me a lot of joy.
A2 die Liebe|—|love|Liebe auf den ersten Blick.|Love at first sight.
A2 das Glück|—|luck; happiness|Wir hatten Glück mit dem Wetter.|We were lucky with the weather.
A2 der Spaß|die Späße|fun|Das Spiel macht Spaß.|The game is fun.
B1 die Sorge|die Sorgen|worry|Mach dir keine Sorgen!|Don't worry!
B1 der Ärger|—|anger; trouble|Er hat Ärger mit seinem Chef.|He's in trouble with his boss.
B1 die Wut|—|rage|Sie war voller Wut.|She was full of rage.
B1 die Hoffnung|die Hoffnungen|hope|Wir haben noch Hoffnung.|We still have hope.
B1 die Enttäuschung|die Enttäuschungen|disappointment|Das Ergebnis war eine Enttäuschung.|The result was a disappointment.
B1 die Überraschung|die Überraschungen|surprise|Was für eine Überraschung!|What a surprise!
B1 die Laune|die Launen|mood|Heute hat er gute Laune.|He's in a good mood today.
B1 das Gefühl|die Gefühle|feeling|Ich habe ein gutes Gefühl.|I have a good feeling.
B1 die Stimmung|die Stimmungen|mood, atmosphere|Die Stimmung auf der Party war toll.|The atmosphere at the party was great.
B1 der Stress|—|stress|Im Moment habe ich viel Stress.|I'm under a lot of stress right now.
B1 die Geduld|—|patience|Hab ein bisschen Geduld!|Be a bit patient!
B1 das Vertrauen|—|trust|Ich habe Vertrauen zu ihr.|I trust her.
B1 die Eifersucht|—|jealousy|Eifersucht macht alles kaputt.|Jealousy ruins everything.
B1 der Mut|—|courage|Dazu braucht man Mut.|That takes courage.
B1 die Scham|—|shame|Er wurde rot vor Scham.|He blushed with shame.
B2 die Zufriedenheit|—|satisfaction|Die Zufriedenheit der Kunden ist uns wichtig.|Customer satisfaction is important to us.
B2 die Einsamkeit|—|loneliness|Viele alte Menschen leiden unter Einsamkeit.|Many old people suffer from loneliness.
B2 die Erleichterung|die Erleichterungen|relief|Das war eine große Erleichterung.|That was a great relief.
B2 die Begeisterung|—|enthusiasm|Die Kinder spielen mit Begeisterung.|The children play enthusiastically.` });

DICT_DATA.push({ theme: "Media & Technology", type: "noun", words: `
A1 das Internet|—|internet|Ich suche das im Internet.|I'll look it up on the internet.
A2 die Nachricht|die Nachrichten|message; (pl.) the news|Hast du meine Nachricht bekommen?|Did you get my message?
A2 der Fernseher|die Fernseher|television set|Der Fernseher ist zu laut.|The TV is too loud.
A2 das Programm|die Programme|programme; channel|Was kommt heute im Programm?|What's on today?
A2 die Zeitschrift|die Zeitschriften|magazine|Sie kauft eine Zeitschrift.|She's buying a magazine.
A2 das Radio|die Radios|radio|Im Auto höre ich Radio.|I listen to the radio in the car.
A2 der Laptop|die Laptops|laptop|Ich nehme meinen Laptop mit.|I'm taking my laptop.
A2 der Drucker|die Drucker|printer|Der Drucker hat kein Papier.|The printer is out of paper.
A2 das Passwort|die Passwörter|password|Ich habe mein Passwort vergessen.|I've forgotten my password.
A2 die Webseite|die Webseiten|website|Die Informationen stehen auf der Webseite.|The information is on the website.
A2 die App|die Apps|app|Ich habe eine neue App heruntergeladen.|I've downloaded a new app.
A2 das Foto|die Fotos|photo|Kannst du ein Foto von uns machen?|Can you take a photo of us?
B1 der Bildschirm|die Bildschirme|screen|Der Bildschirm ist zu dunkel.|The screen is too dark.
B1 die Tastatur|die Tastaturen|keyboard|Die Tastatur ist neu.|The keyboard is new.
B1 das Gerät|die Geräte|device|Schalte alle Geräte aus!|Switch off all devices!
B1 die Datei|die Dateien|file|Ich schicke dir die Datei.|I'll send you the file.
B1 der Akku|die Akkus|battery (rechargeable)|Mein Akku ist fast leer.|My battery is almost dead.
B1 die Sendung|die Sendungen|broadcast, programme|Die Sendung beginnt um acht.|The show starts at eight.
B1 die Werbung|—|advertising|Im Fernsehen gibt es zu viel Werbung.|There are too many adverts on TV.
B1 die Anzeige|die Anzeigen|advert; display|Ich habe die Wohnung über eine Anzeige gefunden.|I found the flat through an advert.
B2 der Datenschutz|—|data protection|Datenschutz ist heute sehr wichtig.|Data protection is very important today.
B2 die Digitalisierung|—|digitalisation|Die Digitalisierung verändert die Arbeitswelt.|Digitalisation is changing the world of work.
B1 die Software|die Softwares|software|Die Software muss aktualisiert werden.|The software needs to be updated.` });

DICT_DATA.push({ theme: "Money & Shopping", type: "noun", words: `
A1 der Euro|die Euro|euro|Das kostet zehn Euro.|That costs ten euros.
A1 der Preis|die Preise|price|Der Preis ist zu hoch.|The price is too high.
A1 die Kasse|die Kassen|till, checkout|Bitte zahlen Sie an der Kasse.|Please pay at the till.
A2 die Karte|die Karten|card; ticket; map|Kann ich mit Karte zahlen?|Can I pay by card?
A2 das Bargeld|—|cash|Ich habe kein Bargeld.|I have no cash.
A2 die Quittung|die Quittungen|receipt|Brauchen Sie eine Quittung?|Do you need a receipt?
A2 das Angebot|die Angebote|offer|Heute sind Äpfel im Angebot.|Apples are on offer today.
A2 die Tüte|die Tüten|(carrier) bag|Brauchen Sie eine Tüte?|Do you need a bag?
A2 der Kunde|die Kunden|customer (m)|Der Kunde möchte bezahlen.|The customer would like to pay.
A2 das Konto|die Konten|bank account|Ich möchte ein Konto eröffnen.|I'd like to open an account.
B1 der Rabatt|die Rabatte|discount|Studenten bekommen zehn Prozent Rabatt.|Students get a ten percent discount.
B1 die Garantie|die Garantien|guarantee|Das Gerät hat zwei Jahre Garantie.|The device has a two-year guarantee.
B1 der Umtausch|—|exchange (of goods)|Umtausch nur mit Kassenbon.|Exchange only with a receipt.
B1 die Überweisung|die Überweisungen|bank transfer|Die Überweisung dauert einen Tag.|The transfer takes a day.
B1 die Gebühr|die Gebühren|fee|Die Gebühr beträgt fünf Euro.|The fee is five euros.
B2 die Steuer|die Steuern|tax|Wir zahlen viele Steuern.|We pay a lot of taxes.
B2 der Kredit|die Kredite|loan|Wir haben einen Kredit aufgenommen.|We've taken out a loan.` });

DICT_DATA.push({ theme: "Leisure & Sport", type: "noun", words: `
A1 das Hobby|die Hobbys|hobby|Mein Hobby ist Fotografieren.|My hobby is photography.
A1 der Sport|—|sport|Ich mache jeden Tag Sport.|I do sport every day.
A1 der Fußball|die Fußbälle|football|Er spielt Fußball im Verein.|He plays football in a club.
A1 der Film|die Filme|film|Der Film war spannend.|The film was exciting.
A1 die Musik|—|music|Ich höre gern Musik.|I like listening to music.
A1 die Party|die Partys|party|Kommst du zu meiner Party?|Are you coming to my party?
A1 das Spiel|die Spiele|game; match|Das Spiel beginnt um drei.|The match starts at three.
A2 das Konzert|die Konzerte|concert|Wir haben Karten für das Konzert.|We've got tickets for the concert.
A2 der Ausflug|die Ausflüge|trip, outing|Am Sonntag machen wir einen Ausflug.|On Sunday we're going on a trip.
A2 die Freizeit|—|free time|Was machst du in deiner Freizeit?|What do you do in your free time?
A2 das Schwimmbad|die Schwimmbäder|swimming pool|Das Schwimmbad ist im Sommer voll.|The pool is full in summer.
A2 der Verein|die Vereine|club|Sie ist Mitglied in einem Tennisverein.|She's a member of a tennis club.
A2 die Mannschaft|die Mannschaften|team|Unsere Mannschaft hat gewonnen.|Our team won.
B1 das Training|die Trainings|training|Das Training ist zweimal pro Woche.|Training is twice a week.
B1 der Wettkampf|die Wettkämpfe|competition|Er hat den Wettkampf gewonnen.|He won the competition.
B1 die Ausstellung|die Ausstellungen|exhibition|Die Ausstellung ist sehr interessant.|The exhibition is very interesting.
B1 die Veranstaltung|die Veranstaltungen|event|Die Veranstaltung fällt leider aus.|Unfortunately the event is cancelled.
B1 die Eintrittskarte|die Eintrittskarten|admission ticket|Die Eintrittskarte kostet zwölf Euro.|The ticket costs twelve euros.
B1 das Ehrenamt|die Ehrenämter|volunteer work|Sie arbeitet im Ehrenamt für ein Tierheim.|She volunteers at an animal shelter.` });

DICT_DATA.push({ theme: "Society & Environment", type: "noun", words: `
A2 die Umwelt|—|environment|Wir müssen die Umwelt schützen.|We must protect the environment.
A2 die Politik|—|politics|Interessierst du dich für Politik?|Are you interested in politics?
A2 die Regierung|die Regierungen|government|Die Regierung plant ein neues Gesetz.|The government is planning a new law.
A2 die Gesellschaft|die Gesellschaften|society; company|Wir leben in einer modernen Gesellschaft.|We live in a modern society.
B1 das Klima|—|climate|Das Klima ändert sich.|The climate is changing.
B1 der Klimawandel|—|climate change|Der Klimawandel ist ein großes Problem.|Climate change is a big problem.
B1 die Energie|die Energien|energy|Wir sollten Energie sparen.|We should save energy.
B1 der Verkehr|—|traffic|Der Verkehr in der Stadt ist schlimm.|The traffic in the city is terrible.
B1 die Wahl|die Wahlen|election; choice|Die nächste Wahl ist im Herbst.|The next election is in autumn.
B1 das Gesetz|die Gesetze|law|Das Gesetz gilt ab Januar.|The law applies from January.
B1 die Meinung|die Meinungen|opinion|Was ist deine Meinung?|What's your opinion?
B1 die Zukunft|—|future|Was planst du für die Zukunft?|What are your plans for the future?
B1 die Arbeitslosigkeit|—|unemployment|Die Arbeitslosigkeit ist gesunken.|Unemployment has fallen.
B1 der Bürger|die Bürger|citizen (m)|Die Bürger dürfen mitentscheiden.|The citizens get a say.
B1 die Integration|—|integration|Sprache ist wichtig für die Integration.|Language is important for integration.
B1 die Gleichberechtigung|—|equality (of rights)|Gleichberechtigung ist ein Grundrecht.|Equal rights are a fundamental right.
B2 die Nachhaltigkeit|—|sustainability|Nachhaltigkeit spielt eine große Rolle.|Sustainability plays a big role.
B2 die Umweltverschmutzung|—|pollution|Die Umweltverschmutzung nimmt zu.|Pollution is increasing.
B2 der Rohstoff|die Rohstoffe|raw material|Rohstoffe werden immer teurer.|Raw materials are getting more and more expensive.
B2 die Bevölkerung|—|population|Die Bevölkerung wird älter.|The population is getting older.
B2 die Armut|—|poverty|Armut ist ein weltweites Problem.|Poverty is a global problem.
B2 die Demokratie|die Demokratien|democracy|Wahlen sind die Basis der Demokratie.|Elections are the basis of democracy.
B2 die Verantwortung|—|responsibility|Wir tragen Verantwortung für unsere Kinder.|We bear responsibility for our children.
B2 die Herausforderung|die Herausforderungen|challenge|Der Klimawandel ist eine große Herausforderung.|Climate change is a huge challenge.` });
