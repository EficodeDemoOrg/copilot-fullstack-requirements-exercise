# Projekti: Geenikutoja – Häikäisevä DNA-seikkailu!

**Tehtävä:** Karkottaa tylsät biologian tunnit ja vaihtaa kuivat kaaviot häikäiseviin digitaalisiin esityksiin, jotka näyttävät koululaisille, miten genetiikka *oikeasti* toimii (spoileri: se on aika mahtavaa, yksinkertaisista ominaisuuksista monimutkaisiin sukupuihin!).

## 1. Johdanto: Pörröisyyden salaisen suunnitelman selvittäminen

Opetusministeriö tietää, että genetiikka voi vaikuttaa oudolta taikuudelta, jossa pyörii kummallisia kirjaimia (Bb? mitä?). Punnett-neliöiden tuijottaminen ei varsinaisesti huuda "hauskaa tiedettä". Tarvitsemme työkalun, joka tekee perinnöllisyyden oppimisesta yhtä mukaansatempaavaa kuin kissanpennun valitsemisesta!

Tässä kohtaa "Geenikutoja"-projekti astuu kuvaan. Ministeriö tarvitsee interaktiivisen sovelluksen, jossa lapset voivat leikkiä geneettistä matchmakeria (aluksi yksinkertaistetuilla ominaisuuksilla, kuten eläinten turkin värillä) ja nähdä heti todennäköiset tulokset. Kuvittele klikkaavasi 'Musta kissa' + 'Valkoinen kissa' ja *näkeväsi* heti mahdollisuudet saada suloisia mustia, valkoisia tai ehkä jopa kirjavia kissanpentuja!

Tiimisi tehtävä: Rakentaa Geenikutojan Minimum Viable Product (MVP), tehdä genetiikasta visuaalista ja eloisaa sekä luoda pohja vielä kiehtovampien geneettisten skenaarioiden tutkimiselle.

## 2. Liiketoimintavaatimukset

Geenikutoja-sovelluksen MVP:n tulee täyttää seuraavat ydinkriteerit:

1. **Vanhempien ominaisuuksien syöttö:**
    * Käyttäjällä (ajattele uteliasta lasta) tulee olla erittäin yksinkertainen tapa asettaa kahden vanhemman geneettiset ominaisuudet.
    * MVP:ssä sallitaan yhden geenin **genotyypin** valinta (esim. 'BB', 'Bb', 'bb'). Jos valitset fenotyypin syötön (kuten 'Musta turkki'), varmista, että logiikkasi vastaa oikein alla olevaa mallia. Pidä se intuitiivisena!

2. **Geneettisen mallin toteutus:**
    * Sovelluksen tulee tarkasti laskea todennäköisyydet käyttäen perus-Mendelin genetiikkaa (katso Ydinmalli) selvittääkseen jälkeläisten todennäköiset geneettiset ominaisuudet. Tämä on se "tieteellinen osuus".

3. **Jälkeläisten visualisointi (esityksen tähti!):**
    * Tässä tapahtuu taika! Tulosten on oltava visuaalisesti mukaansatempaavia ja heti ymmärrettäviä lapsille. Tavoitteena on **maksimaalinen selkeys, minimaalinen tylsyys**.
    * Unohda tylsät taulukot. Ajattele **värikkäitä grafiikoita**, selkeitä merkintöjä, ehkä jopa **söpöjä kuvakkeita** (pörröisiä kissanpentuja? pilkullisia koiranpentuja? ruukkukasveja? Taiteellinen luovuutesi on tervetullutta!). Visualisoinnin TÄYTYY selkeästi näyttää:
        * Ennustetut jälkeläisten **genotyyppien** suhteet/todennäköisyydet (esim. "25% BB", "50% Bb", "25% bb").
        * Tuloksena olevat jälkeläisten **fenotyyppien** suhteet/todennäköisyydet (esim. "Näyttää siltä, että 75% mahdollisuus mustiin kissanpentuihin!", "25% mahdollisuus valkoisiin kissanpentuihin!").
    * **Tärkeää:** Tee siitä näyttävä! Tämä ei ole väitöskirjan puolustus; tarkoitus on herättää uteliaisuutta ja saada lapset sanomaan "Siistiä!", ei aiheuttaa hiljaista pohdiskelua (tai päiväunia).

4. **Interaktiivinen kokeilu:**
    * Käyttäjien tulee voida helposti klikkailla, vaihtaa äidin ja isän ominaisuuksia ja nähdä tulosten muuttuvan välittömästi. Klikkaa, näe, opi!

5. **MVP:n laajuus:**
    * Keskity visualisoimaan **yksi geeni**, jossa on **yksinkertainen dominanssi**. Tämä perusmalli on avain ennen monimutkaisemman genetiikan tutkimista.

6. **Teknologianeutraalius:**
    * Käytä mitä tahansa teknologiaa, joka sopii tiimillesi parhaiten (tai jolla rakennat parhaan visualisoinnin!).
    * Web-sovellus (vain frontend? frontend + backend?), työpöytäsovellus – kaikki ovat sallittuja vaihtoehtoja.
    * Pidä MVP saavutettavana. Tietokantoja ei tarvita, ellei toteuteta lisätavoitteita.

## 3. Ydinmalli (MVP) – ja nopea kertaus!

Jotta "tieteellinen osuus" olisi kaikille selkeä, kerrataan nopeasti, miten tämän projektin yksinkertaistettu genetiikka toimii, ennen kuin tarkennetaan kissan turkin värin malliin. Tätä sovelluksesi visualisoi!

* **Mikä on geeni? Mikä on alleeli?** Jokaiselle ominaisuudelle (kuten turkin väri) on sitä ohjaava **geeni**. **Alleelit** ovat geenin eri versioita. Tässä projektissa keskitymme yhteen geeniin, jolla on kaksi alleelia – esimerkiksi mustan ja valkoisen turkin alleelit. Jälkeläinen perii yhden alleelin kummaltakin vanhemmaltaan.

* **Genotyyppi (kirjaimet, esim. BB, Bb, bb):** Yksilön tietty alleelipari kyseiselleGeenille. Esimerkiksi, jos mustan turkin alleeli on 'B' ja valkoisen turkin alleeli on 'b', yksilön genotyyppi voi olla yksi kolmesta vaihtoehdosta: `BB`, `Bb` tai `bb`.

* **Fenotyyppi (ulkonäkö, esim. musta turkki):** Havaittava ominaisuus, joka johtuu genotyypistä.

* **Dominanssi (miksi Bb on musta, ei harmaa):** Yksi alleeli on **dominoiva** toiseen (**resessiiviseen**) nähden.
    * Dominoiva alleeli (esim. 'B' mustalle turkille) näkyy fenotyypissä, vaikka sitä olisi vain yksi kappale. Genotyypit `BB` ja `Bb` ovat molemmat mustia.
    * Resessiivinen alleeli (esim. 'b' valkoiselle turkille) näkyy fenotyypissä vain, jos molemmat alleelit ovat resessiivisiä (`bb`). Dominoiva 'B'-alleeli peittää 'b'-alleelin vaikutuksen `Bb`-kissalla.

* **Jälkeläisten ennustaminen (sovelluksen tehtävä!):** Geenikutoja laskee vanhempien genotyypeistä jälkeläisten genotyyppien ja fenotyyppien todennäköisyydet.

Nyt, tässä on erityinen malli MVP:lle:

**Esimerkkitapaus (Yksinkertaistettu kissan turkin väri):**

* **Geeni:** Ohjaa perus turkin väriä.
* **Alleelit:** `B` (dominoiva alleeli, tuloksena musta turkki), `b` (resessiivinen alleeli, tuloksena valkoinen turkki, jos `B` ei ole läsnä).
* **Genotyypit -> Fenotyypit:**
    * `BB` -> Musta turkki
    * `Bb` -> Musta turkki
    * `bb` -> Valkoinen turkki
* **Käyttäjän syöte:** Käyttäjä valitsee Vanhempi 1:n genotyypin (`BB`, `Bb` tai `bb`) ja Vanhempi 2:n genotyypin (`BB`, `Bb` tai `bb`).
* **Laskentalogikka:** Toteuta Punnett-neliön logiikka. Esimerkiksi, jos Vanhempi 1 on `Bb` ja Vanhempi 2 on `Bb`:
    * Jälkeläisten genotyypin todennäköisyydet: 25% `BB`, 50% `Bb`, 25% `bb`.
* **Tuloksen visualisointi:** Näytä fenotyypin todennäköisyydet laskennan perusteella. Esimerkiksi `Bb` x `Bb` -yhdistelmässä:
    * Jälkeläisten fenotyypin todennäköisyydet: 75% musta turkki, 25% valkoinen turkki.

## 4. Odotettu lopputulos ja toimitettavat asiat

Jokaisen tiimin tulee:

1. Toimittaa toimiva Geenikutoja-MVP-sovellus, joka täyttää vaatimukset.
2. Esittää lyhyt (5-10 min) demo:
    * Näytä käyttöliittymä ja sen helppokäyttöisyys.
    * Käy läpi muutama eri vanhempien yhdistelmä.
    * **Korosta visualisointia:** Näytä, miten selkeästi ja mukaansatempaavasti se esittää geneettiset tulokset kohderyhmälle.
    * Mainitse lyhyesti valittu teknologia.

## 5. Lisätavoitteet (valinnainen – jos sisäinen Mendelisi kutsuu!)

Jos olet hallinnut MVP:n ja sinulla on ylimääräistä aikaa, tässä on tapoja laajentaa Geenikutoja -sovelluksen ominaisuuksia ja tutkia monimutkaisempia geneettisiä periaatteita:

* **Lisää värejä ja monimutkaisempia ominaisuuksia:**
    * **Useita alleeleja:** Lisää kolmas alleeli olemassaolevalle turkin värigeenille (esim. alleeli 'ruskea' tai 'keltainen' turkki) ja määrittele sen dominanssihierarkia 'B':n ja 'b':n kanssa (esim. Musta > Ruskea > Valkoinen).
    * **Eri dominanssikuvioita:** Toteuta ko-dominanssia tai epätäydellistä dominanssia olemassaolevilla kahdella alleelilla, jotta saadaan aikaan välimuotoisia tai yhdistettyjä fenotyyppejä (esim. jos 'B' ja 'W' alleelit kukkien värille olisivat ko-dominantteja, BW-genotyyppi saattaisi johtaa kukkiin, joissa on sekä mustia että valkoisia laikkuja, tai jos epätäydellisesti dominoivia, harmaita kukkia).
* **Monigeeninen sekasorto (dihybridiset ristikkäin):**
    * Mallinna kahta *itsenäistä* geeniä (esim. yksi turkin värille, toinen häntäpituisuudelle tai silmien värille). Visualisoi, miten niiden alleelit yhdistyvät jälkeläisissä. Voitko saavuttaa klassisen 9:3:3:1 fenotyypin suhteen kahden heterotsygoottisen vanhemman dihybridisessä ristissä?
* **Sukupolvien nerous (sukupuu seuranta):**
    * Salli käyttäjien valita jälkeläisiä yhdestä sukupolvesta (F1) tulemaan vanhemmiksi seuraavassa sukupolvessa (F2) ja niin edelleen.
    * Toteuta tapa visualisoida tätä sukulinjaa, ehkä yksinkertaisena perhepuuna tai sukupuu-kaaviona, joka seuraa, miten ominaisuudet siirtyvät useiden sukupolvien ajan.
* **Visuaalisesti upea tiede:**
    * Mene yli perusväriblokkien tai yksinkertaisten kuvakkeiden. Luo yksityiskohtaisempia, kiinnostavampia tai jopa animoituja visuaaleja vanhempi- ja jälkeläisfenotyypeille. Tee siitä visuaalinen elämys, joka todella vangitsee huomion!
* **Tallenna geneettiset kokeesi:**
    * Toteuta toiminto, jolla voidaan tallentaa tiettyjä vanhempien yhdistelmiä ja niiden tuloksena olevia jälkeläisten todennäköisyyksiä, tai jopa koko monisukupolvisten kokeiden tallentaminen myöhempää tarkastelua varten.
* **"Selitä-o-matic" -toiminto:**
    * Lisää vaihtoehto näyttää yksinkertaisia, lapsiystävällisiä selityksiä tulosten rinnalla, jotka selventävät *miksi* tietyt tulokset ovat todennäköisempiä (esim. "Äidillä ja isällä on molemmilla piilotettu ohje valkoiselle turkille, joten on mahdollista, että niiden pennut voisivat olla valkoisia!").

## 6. Kuinka aloittaa (työpajaohjeet)

1.  Clone this repository.
2.  Create your project files (code, UI designs, etc.) within your cloned repository.
3.  Collaborate with your team using standard Git practices (push, pull, merge like pros!).
4.  Build the Gene Weaver application, focusing on nailing that core logic and visual output for the MVP.
5.  Commit your code regularly and prepare for your dazzling presentation!