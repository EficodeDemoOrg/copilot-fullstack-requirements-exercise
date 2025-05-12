# Projekti: GeeniKutoja – Häikäisevä DNA-seikkailu!

**Tehtävä:** Karkottaa tylsät biologian tunnit ja vaihtaa kuivat kaaviot häikäiseviin digitaalisiin esityksiin, jotka näyttävät koululaisille, miten genetiikka *oikeasti* toimii (spoileri: se on aika mahtavaa).

## 1. Johdanto: Pörröisyyden salaisen suunnitelman selvittäminen

Opetusministeriö tietää, että genetiikka voi vaikuttaa oudolta taikuudelta, johon liittyy kummallisia kirjaimia (Bb? mitä?). Punnett-neliöiden tuijottaminen ei varsinaisesti ole "hauskaa tiedettä". Tarvitsemme työkalun, joka tekee perinnöllisyyden oppimisesta yhtä mukaansatempaavaa kuin kissanpennun valitsemisesta!

Tässä kohtaa kuvaan astuu "GeeniKutoja"-projekti. Ministeriö tarvitsee interaktiivisen sovelluksen, jossa lapset voivat leikkiä geneettistä parinmuodostusta (aluksi yksinkertaistetuilla ominaisuuksilla, kuten eläinten turkin värillä) ja nähdä heti todennäköiset tulokset. Kuvittele klikkaavasi 'Musta kissa' + 'Valkoinen kissa' ja *näkeväsi* heti, millä todennäköisyydellä saat suloisia mustia, valkoisia tai ehkä jopa kirjavia kissanpentuja!

Tiiminne tehtävä: Rakentaa GeeniKutojan Minimum Viable Product (MVP), joka tekee genetiikasta visuaalista ja eläväistä.

## 2. Liiketoimintavaatimukset

GeeniKutoja-sovelluksen MVP:n tulee täyttää seuraavat ydinkriteerit:

1. **Vanhempien ominaisuuksien syöttö:**
    * Käyttäjällä (ajattele uteliasta lasta) tulee olla erittäin helppo tapa asettaa kahden vanhemman geneettiset ominaisuudet.
    * MVP:ssä sallitaan yhden geenin **genotyypin** valinta (esim. 'BB', 'Bb', 'bb'). Jos valitsette fenotyypin syötön (kuten 'Musta turkki'), varmistakaa, että logiikkanne oikein yhdistää fenotyypit genotyyppeihin alla olevan mallin mukaisesti. Pitäkää se intuitiivisena!

2. **Geneettisen mallin toteutus:**
    * Sovelluksen tulee tarkasti laskea perinnöllisyyden todennäköisyydet käyttäen yksinkertaista mendelististä genetiikkaa (katso Ydinmalli). Tämä on se "tieteellinen osuus".

3. **Jälkeläisten visualisointi (esityksen tähti!):**
    * Tässä tapahtuu taika! Tulosten täytyy olla visuaalisesti mukaansatempaavia ja välittömästi ymmärrettäviä lapsille. Tavoitteena on **maksimaalinen selkeys, minimaalinen tylsyys**.
    * Unohda tylsät taulukot. Ajattele **värikkäitä grafiikoita**, selkeitä merkintöjä, ehkä jopa **söpöjä kuvakkeita** (pörröisiä kissanpentuja? pilkullisia koiranpentuja? ruukkukasveja? Taiteellinen luovuutenne on tervetullutta!). Visualisoinnin TÄYTYY selkeästi näyttää:
        * Ennustetut jälkeläisten **genotyyppien** suhteet/todennäköisyydet (esim. "25% BB", "50% Bb", "25% bb").
        * Ennustetut jälkeläisten **fenotyyppien** suhteet/todennäköisyydet (esim. "Näyttää siltä, että 75% mahdollisuus mustiin kissanpentuihin!", "25% mahdollisuus valkoisiin kissanpentuihin!").
    * **Tärkeää:** Tee siitä näyttävä! Tämä ei ole väitöskirjan puolustus; tarkoitus on herättää uteliaisuutta ja saada lapset sanomaan "Siistiä!", ei aiheuttaa hiljaista pohdiskelua (tai päiväunia).

4. **Interaktiivinen kokeilu:**
    * Käyttäjien tulee voida helposti klikkailla, vaihtaa äidin ja isän ominaisuuksia ja nähdä tulosten muuttuvan välittömästi. Klikkaa, näe, opi!

5. **MVP:n rajaus:**
    * Keskity visualisoimaan **yksi geeni**, jossa on **yksinkertainen dominanssi**. Tee tämä hyvin ennen monimutkaisuuden lisäämistä.

6. **Teknologianeutraalius:**
    * Käyttäkää mitä tahansa teknologiaa, joka sopii tiimillenne parhaiten (tai jolla saatte aikaan parhaan visualisoinnin!).
    * Web-sovellus (vain frontend? frontend + backend?), työpöytäsovellus – kaikki ovat sallittuja vaihtoehtoja.
    * Pitäkää MVP saavutettavana. Tietokantoja ei tarvita, ellei toteuteta lisätavoitteita.

## 3. Ydinmalli (MVP)

Toteuta yhden geenin periytyminen, kaksi alleelia, yksinkertainen mendelistinen dominanssi.

**Esimerkkiskenaario (yksinkertaistettu kissan turkin väri):**

* **Geeni:** Määrittää perus turkin värin.
* **Alleelit:** `B` (dominoiva, musta turkki), `b` (resessiivinen, valkoinen turkki).
* **Genotyypit -> Fenotyypit:** `BB` -> Musta turkki, `Bb` -> Musta turkki, `bb` -> Valkoinen turkki.
* **Käyttäjän syöte:** Valitse genotyypit Vanhemmalle 1 (`BB`, `Bb`, `bb`) ja Vanhemmalle 2 (`BB`, `Bb`, `bb`).
* **Laskentalogiikka:** Toteuta Punnett-neliön logiikka. (esim. `Bb` x `Bb` -> 25% `BB`, 50% `Bb`, 25% `bb`).
* **Tulosten visualisointi:** Näytä fenotyyppien todennäköisyydet laskennan perusteella (esim. 75% Musta turkki, 25% Valkoinen turkki).

## 4. Odotettu lopputulos ja toimitettavat asiat

Jokaisen tiimin tulee:

1. Toimittaa toimiva GeeniKutoja MVP-sovellus, joka täyttää vaatimukset.
2. Esittää lyhyt (5-10 min) demo:
    * Esittele käyttöliittymä ja sen helppokäyttöisyys.
    * Käy läpi muutamia erilaisia vanhempien yhdistelmiä.
    * **Korosta visualisointia:** Näytä, kuinka selkeästi ja mukaansatempaavasti se esittää geneettiset tulokset kohderyhmälle.
    * Mainitse lyhyesti valittu teknologia.

## 5. Lisätavoitteet (valinnaiset – toteuta, jos aikaa riittää!)

* **Vaativampi genetiikka:** Toteuta yhteisdominanssi/epätäydellinen dominanssi (vaaleanpunaiset kukat punaisesta + valkoisesta?). Käsittele kahta geeniä (dihybridiristeytys – hallitse 9:3:3:1-suhde!).
* **Todella upea visualisointi:** Käytä oikeita kuvakkeita (kissat, koirat, kukat, herneet...). Ehkä yksinkertaisia animaatioita? Tee siitä ihastuttava!
* **Tallenna luomuksesi:** Anna käyttäjien tallentaa luomiaan skenaarioita.
* **Selitä kuin viisivuotiaalle:** Lisää yksinkertainen teksti, joka selittää, *miksi* tulokset näyttävät siltä kuin näyttävät.