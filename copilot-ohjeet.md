# GitHub Copilotin työpajaohje

## 1. Johdanto (Noin 5 minuuttia)

Tämä opas kuvaa, kuinka GitHub Copilotia käytetään tehokkaasti "Gene Weaver - Dazzling DNA Destiny!" -projektissa (tai vastaavassa mallipohjaisessa opetussovellusprojektissa). Tavoitteena on käyttää Copilotia suunnitteluun, dokumentaatiovetoiseen kehitykseen ja toteutukseen aikarajoitetussa työpajassa (esim. 2 tuntia). Painopiste on strukturoidussa yhteistyössä tekoälyn kanssa.

## 2. Vaihe 1: Ideointi ja suunnittelu Copilotin kanssa (Noin 30-40 minuuttia)

Tämä vaihe on ratkaisevan tärkeä selkeän suunnan asettamisessa. Tehokas suunnittelu ja dokumentointi tässä vaiheessa virtaviivaistavat merkittävästi toteutusvaihetta Copilotin kanssa.

### 2.1. Tutustu projektin vaatimuksiin
Tutustu projektin pääkuvausdokumenttiin (esim. `README.md`) "Gene Weaver - Dazzling DNA Destiny!" -projektia varten ymmärtääksesi projektin tavoitteet ja liiketoiminnalliset vaatimukset. Varmista, että jokainen tiimin jäsen ymmärtää MVP:n (Minimum Viable Product - Pienin Toimiva Tuote) selkeästi.

### 2.2. Suunnittelutapa Copilotin kanssa
Käytä Copilot Chatia tässä vaiheessa ideoidaksesi ja hioaksesi projektisi suuntaa.
* **Vaihtoehto A (Tekoälyavusteinen ideointi):** Jos tiimisi on epävarma, mistä aloittaa.
    * **Esimerkkikehote (Copilot Chat):**
        ```
        Review the main project description document (e.g., `README.md`) for the 'Gene Weaver - Dazzling DNA Destiny!' project. This project involves implementing a genetic inheritance model and visualizing results for an educational app.
        1. Propose 2 distinct application architectures (e.g., a frontend-only web application, a web application with a simple backend, a standalone desktop application).
        2. For each architecture, suggest suitable primary programming languages and relevant key frameworks/libraries, focusing on UI development, logic implementation, and engaging visualizations.
        3. Outline main components for each (e.g., UI for parent input, genetics calculation engine, offspring visualization display).
        Focus on an MVP achievable in 2 hours that prioritizes the core genetic model and visualization.
        ```
* **Vaihtoehto B (Osallistujajohtoinen, tekoälyn tarkentama):** Jos tiimilläsi on alustavia ideoita.
    * **Esimerkkikehote (Copilot Chat):**
        ```
        For the 'Gene Weaver - Dazzling DNA Destiny!' project (described in the main project `README.md`), we plan a [describe your architecture, e.g., 'React frontend application with internal logic to calculate genetic crosses and display results using SVG or a simple graphics library'].
        1. Is this MVP feasible in 2 hours?
        2. Suggest key libraries/modules for our chosen stack that would be good for UI (parent trait selection), implementing the Punnett Square logic, and creating clear, child-friendly visualizations of offspring?
        3. Outline the main functional React components or JavaScript modules we'd need to create.
        ```

### 2.3. Määritä arkkitehtuuri ja teknologiakokonaisuus (tech stack)
Ideoinnin perusteella tiiminne tulisi päättää:
* Korkean tason arkkitehtuuri (esim. Verkkosovellus: React/Vue/Svelte, Työpöytäsovellus: Python ja Tkinter/PyQt/CustomTkinter).
* Ensisijaiset ohjelmointikielet ja keskeiset kehykset/kirjastot käyttöliittymälle ja visualisoinnille.
Näiden valintojen dokumentointi on seuraava askel.

### 2.4. Luo projektin määrittelydokumentaatio
Selkeät määrittelyt ovat elintärkeitä sekä tiimisi että Copilotin ohjaamisessa. Nämä dokumentit tulisi luoda yhteistyössä ja iteratiivisesti.

**Työnkulku määrittelydokumenttien luomiseen:**
On suositeltavaa luoda nämä määrittelytiedostot (`ARCHITECTURE.md`, `BACKLOG.md`, `PROJECT_SPEC.md`) yksitellen.
1.  Keskustelkaa kunkin osion/tiedoston sisällöstä tiiminä.
2.  Käyttäkää Copilot Chatia, erityisesti **Copilot Edits** -toimintoa (esim. käyttämällä `#file` tai `#selection` Copilot Chatissa kohdistaaksenne muutokset tiettyihin tiedostoihin/tiedostojen osiin), auttamaan kunkin dokumentin luonnostelussa, päivittämisessä ja hiomisessa.
3.  Luokaa manuaalisesti `docs/specifications/` -kansio ja tyhjät markdown-tiedostot ensin. Tämä helpottaa Copilot Edits -toiminnon kohdistamista niihin.

**Keskeiset määrittelytiedostot:**

* **1. Arkkitehtuurikaavio (`docs/specifications/ARCHITECTURE.md`):**
    * **Tarkoitus:** Esittää visuaalisesti valitsemanne sovellusarkkitehtuuri.
    * **Sisältö:** Käytä tekstipohjaisia kaaviotyökaluja, kuten Mermaid JS, PlantUML, tai jopa selkeää tekstimuotoista kuvausta komponenteista ja niiden vuorovaikutuksista.
    * **Esimerkkikehote (Copilot Chat ja Edits `ARCHITECTURE.md`-tiedostolle):**
        ```
        #file docs/specifications/ARCHITECTURE.md
        Based on our decision to build a [e.g., 'frontend-only web application using JavaScript for the Gene Weaver project'], help me draft a Mermaid JS component diagram illustrating the main components (e.g., ParentInputUI, GeneticsEngine, OffspringDisplay) and how they interact.
        ```

* **2. Ominaisuuslista (backlog) (`docs/specifications/BACKLOG.md`):**
    * **Tarkoitus:** Listata MVP:hen vaadittavat ominaisuudet jaettuna hallittaviin tehtäviin.
    * **Sisältö:** Lista ominaisuuksista/käyttäjätarinoista. Priorisoi MVP:tä varten.
    * **Esimerkkikehote (Copilot Chat ja Edits `BACKLOG.md`-tiedostolle):**
        ```
        #file docs/specifications/BACKLOG.md
        Based on the 'Gene Weaver - Dazzling DNA Destiny!' MVP requirements, help me create a feature backlog. Key MVP tasks include:
        - UI component for selecting Parent 1 genotype (BB, Bb, bb).
        - UI component for selecting Parent 2 genotype (BB, Bb, bb).
        - Core logic module to calculate offspring genotype probabilities (Punnett Square).
        - Logic to map offspring genotypes to phenotypes based on simple dominance (B=Black, b=white).
        - UI component to display offspring genotype probabilities (e.g., 25% BB, 50% Bb, 25% bb).
        - UI component to visually display offspring phenotype probabilities (e.g., 75% Black, 25% White, using colors/icons).
        - Ensure results update interactively when parent inputs change.
        Break these down into clear backlog items.
        ```

* **3. Projektin päämäärittely (`docs/specifications/PROJECT_SPEC.md`):**
    * **Tarkoitus:** Keskeinen dokumentti, joka tiivistää tärkeimmät päätökset ja linkittää muihin yksityiskohtaisiin määrittelyihin.
    * **Sijainti:** `docs/specifications/PROJECT_SPEC.md`
    * **Sisällön runko:**
        * Projektin tavoite (lyhyesti, Gene Weaverin pääasiallisesta `README.md`-tiedostosta)
        * Viittaus arkkitehtuurikaavioon: "Katso `docs/specifications/ARCHITECTURE.md`"
        * Viittaus ominaisuuslistaan: "Katso `docs/specifications/BACKLOG.md`"
        * Valittu teknologiakokonaisuus (tech stack) (tietyt kielet, kirjastot, kehykset, esim. JavaScript, React, CSS tyylittelyyn)
        * Keskeiset moduulit/komponentit ja niiden päävastuut (korkean tason tekstuaalinen kuvaus, esim. `ParentSelector.js`, `GeneticsEngine.js`, `ResultsDisplay.js`)
    * **Esimerkkikehote (Copilot Chat ja Edits `PROJECT_SPEC.md`-tiedostolle, ARCHITECTURE ja BACKLOG -tiedostojen luonnostelun jälkeen):**
        ```
        #file docs/specifications/PROJECT_SPEC.md
        Help me create the main project specification for 'Gene Weaver'.
        It should include:
        - Project Goal (summary for Gene Weaver, emphasizing educational visualization).
        - A reference to `docs/specifications/ARCHITECTURE.md` for the architecture diagram.
        - A reference to `docs/specifications/BACKLOG.md` for the feature backlog.
        - Our chosen Technology Stack: [e.g., JavaScript with React for UI, basic CSS for styling, all logic client-side].
        - A brief outline of Key Modules/Components: [e.g., ParentInputForm, GeneticsCalculator, OffspringVisualizer].
        ```

---

## 3. Vaihe 2: Valmistautuminen Copilot-vetoiseen toteutukseen (Noin 15 minuuttia)

Kun suunnitelma on valmis, määritä ympäristösi maksimoidaksesi Copilotin tehokkuuden.

### 3.1. Versionhallinta Gitillä
Alusta Git-repositorio ja tee committeja usein: `git init`, `git add .`, `git commit -m "Initial planning and specification documents created"`. Säännölliset commitit ovat turvaverkkosi.

### 3.2. Yleiset Copilot-ohjeet (`.github/copilot-instructions.md`)
Tämä tiedosto tarjoaa projektikohtaisen, pysyvän kontekstin Copilotille VS Codessa, ohjaten sen käyttäytymistä kaikissa vuorovaikutuksissa.
* **Sijainti:** `.github/copilot-instructions.md`
* **Esimerkkisisältö:**
    ```markdown
    ## Project: Gene Weaver - Dazzling DNA Destiny!

    **Overall Goal:** Build an interactive educational application to visualize basic genetic inheritance (Mendelian genetics) for schoolchildren, focusing on clear and engaging visuals.
    **Core Requirements Document:** Refer to the main project description `README.md` for "Gene Weaver".
    **MVP Technical Specification:** Detailed in `docs/specifications/PROJECT_SPEC.md`.

    **Key Genetic Model Context (for quick reference by inline chat/edit modes):**
    * **Focus:** MVP implements single-gene inheritance with two alleles and simple dominance.
    * **Example Alleles:** 'B' (dominant, e.g., Black fur) and 'b' (recessive, e.g., white fur).
    * **Parental Input:** Users will provide genotypes for two parents (e.g., Parent 1: 'Bb', Parent 2: 'bb').
    * **Core Logic:** Calculate offspring genotype probabilities (e.g., BB, Bb, bb percentages) using Punnett Square principles.
    * **Output:** Display both offspring genotype probabilities and the resulting phenotype probabilities (e.g., Black fur, white fur percentages). Visualization is key.
    * **Phenotype Mapping Example:** BB -> Black, Bb -> Black, bb -> white.

    ## Role: AI Pair Programmer

    You are assisting developers in a 2-hour workshop to build an MVP (Minimum Viable Product) for the "Gene Weaver" project, based *only* on the provided project documents and explicit instructions.

    ## General Instructions for All Interactions:

    1.  **Scope Adherence:** Implement *only* features or code explicitly requested in the current prompt OR detailed in referenced specification documents (`README.md`, `docs/specifications/PROJECT_SPEC.md`, or specific task files in `docs/tasks/`). Do NOT add extra features or deviate without instruction.
    2.  **Clarify Ambiguity:** If a request is unclear, or if you believe a significantly better MVP-aligned alternative exists, briefly state your reasoning and ask for confirmation before proceeding.
    3.  **Clarity & Simplicity First:** Generate code that is readable, well-commented (for complex logic), and suitable for a timed workshop. Focus on core functionality and clear visualization.
    4.  **Documentation is Truth:** Prioritize instructions and specifications from `README.md` and files in the `docs/` directory.
    5.  **Tech Stack Adherence:** The team's chosen technology stack is defined in `docs/specifications/PROJECT_SPEC.md`. Adhere to these choices.
    6.  **Error Handling (Basic):** For user inputs (like genotype strings), include simple validation if specified in a task. For internal logic, ensure calculations are robust for valid inputs.
    7.  **No External Data/APIs for MVP:** This project's core logic is model-based. No external data fetching is required for the MVP.
    ```

### 3.3. Ohjaavat dokumentit Copilotin Agent-tilalle ja monimutkaisille tehtäville

Tehokkaaseen Copilot Agent-tilan (Agent Mode) käyttöön tai monimutkaisten toteutusten ohjaamiseen Chatissa käytetään kahdentyyppisiä dokumentteja:

1.  **Yleinen agentin työnkulku (`docs/instructions/agent_workflow.md`):**
    Tämä tiedosto määrittelee Copilot Agentin *standardoidun toimintatavan*, kun sitä pyydetään toteuttamaan mikä tahansa tehtävä. Luot tämän kerran. Se kertoo Copilotille, *miten* sen tulisi yleisesti lähestyä työtään.

2.  **Tehtäväkohtaiset dokumentit (esim. `docs/tasks/TEHTÄVÄN_NIMI.md`):**
    Jokaista merkittävää ominaisuutta tai backlog-kohtaa varten luodaan pieni markdown-tiedosto. Tämä tiedosto kuvaa yksityiskohtaisesti kyseisen tehtävän *erityisvaatimukset* (mitä rakentaa, mitkä moduulit, tietyt funktiot jne.) ja ohjeistaa Copilotia noudattamaan yleistä työnkulkua, joka on määritelty `agent_workflow.md`-tiedostossa. Alla olevan esimerkin "Määritetty rooli" on havainnollistava, ja se tulisi mukauttaa tehtäväkohtaisesti.

**Esimerkki 1: Yleinen agentin työnkulku -tiedosto**
* **Sijainti:** `docs/instructions/agent_workflow.md`
* **Sisältö:** (Oleta yleinen sisältö aiemmin määritellyn mukaisesti, varmistaen, että projektin nimi simuloidussa commit-viestissä on yleinen, kuten "feat: Toteuta [tehtävän kuvaus]")
    ```markdown
    ## Agent Mode - General Implementation Workflow

    This document outlines the standard operational procedure for GitHub Copilot Agent when tasked with implementing features or modules for this project.

    1.  **Understand Task & Context:**
        * Review the specific task requirements provided in the prompt or referenced task document (e.g., from `docs/tasks/`).
        * Refer to `docs/specifications/PROJECT_SPEC.md` for overall project architecture, technology stack, and MVP goals.
        * Refer to `.github/copilot-instructions.md` for global project conventions.
    2.  **Assessment & Planning:**
        * Before writing new code, briefly assess if any existing code in the target module(s) can be reused, needs refactoring to accommodate the new task, or might conflict.
        * Note any dependencies on other modules or unfulfilled prerequisites for the current task.
    3.  **Adherence to Specifications:**
        * Implement *only* the features, functions, and logic described in the specific task document and `docs/specifications/PROJECT_SPEC.md`.
    4.  **Deviation Protocol:**
        * If you believe a deviation from the specified requirements, outlined steps, or chosen technologies (as per `PROJECT_SPEC.md`) is strongly necessary or highly beneficial for achieving the task's goal:
            * Clearly state your proposed deviation.
            * Provide a concise justification (e.g., improves performance, simplifies code significantly, necessary for compatibility).
            * **Explicitly ask for permission/confirmation before implementing the deviation.** Await a "Proceed with deviation" or similar response. If no permission is given, adhere to the original specification.
    5.  **Code Implementation:**
        * Write clear, concise, and well-commented code (especially for non-obvious logic) according to the specific task requirements.
        * Follow language-specific best practices and any style guides mentioned in `PROJECT_SPEC.md` or `.github/copilot-instructions.md`.
    6.  **Post-Implementation Quality Checks (Simulated for Workshop):**
        * **(Linting):** Assume generated code is checked with a standard linter/formatter for the language. Aim to produce code that would pass.
        * **(Testing):** Assume relevant unit tests (if pre-defined or generated as part of the task) are executed. Aim to produce code that would pass these tests.
        * **(Fixes):** If (simulated) linting errors or test failures are implied or identified, attempt to fix the generated code.
    7.  **Output:**
        * Provide the complete code for the specified module(s) or the functions/classes implemented as per the task.
        * If changes were made to existing files (beyond adding new code), clearly indicate these changes.
    8.  **Git Commit (Simulated for Workshop):**
        * After successful implementation and (simulated) checks, a Git commit would typically be made.
        * The commit message should be concise, imperative, and accurately describe the change (e.g., "feat: Implement genetic calculation logic"). Maximum 160 characters. Indicate this simulated commit message in your response.
    ```

**Esimerkki 2: Tehtäväkohtainen dokumentti Gene Weaverille**
* **Sijainti (esimerkki):** `docs/tasks/IMPLEMENT_GENETICS_ENGINE.md`
* **Sisältö:**
    ```markdown
    ## Task: Implement Core Genetics Engine

    **Workflow Reference:** When implementing this task, adhere to the general procedure outlined in `docs/instructions/agent_workflow.md`.

    **Project Specification Reference:** `docs/specifications/PROJECT_SPEC.md`
    **Target Module(s):** `src/genetics_engine.js` (or `.py`, etc., depending on chosen stack - create if absent)
    **Assigned Role:** Developer specializing in application logic and algorithms.
    **Goal:** Create a module that takes two parent genotypes and calculates the probabilities of their offspring's genotypes and corresponding phenotypes based on a single-gene, two-allele, simple dominance model.

    ---
    **Specific Requirements & Acceptance Criteria for this Task:**

    1.  Ensure the target module (e.g., `src/genetics_engine.js`) is created if it doesn't exist.
    2.  **Input Validation (Optional but Recommended):** Consider a helper function to validate parent genotype inputs (e.g., ensuring they are valid strings like "BB", "Bb", "bb").
    3.  **Function `calculateOffspringGenotypes(parent1Genotype, parent2Genotype)`:**
        * **Action:** Takes two strings representing parent genotypes (e.g., "Bb", "bb").
        * Implements Punnett Square logic for a single gene with two alleles. Assume 'B' is dominant and 'b' is recessive for the MVP model.
        * **Return:** An object or dictionary with offspring genotype probabilities. Example: `{ "BB": 0.25, "Bb": 0.50, "bb": 0.25 }`.
    4.  **Function `getPhenotypes(offspringGenotypeProbabilities)`:**
        * **Action:** Takes the object/dictionary of offspring genotype probabilities.
        * Maps these to phenotype probabilities based on the simple dominance model (BB -> Black, Bb -> Black, bb -> white, as defined in the main project `README.md`).
        * **Return:** An object or dictionary with offspring phenotype probabilities. Example: `{ "Black Fur": 0.75, "White Fur": 0.25 }`.
    5.  **Allele Configuration (Consider):** The alleles (e.g., 'B', 'b') and their dominance/phenotype mapping should be clearly defined, perhaps as constants or a configuration within the module, making them easy to find and understand (as per `README.md`).
    6.  **Scope:** This module contains *only* the core genetic calculation logic. It should not handle UI input or direct visualization rendering.
    ```

## 4. Vaihe 3: Iteratiivinen toteutus Copilotin kanssa (Noin 45-55 minuuttia)

Nyt on aika muuttaa suunnitelmat ja määrittelyt koodiksi Copilotin avulla.

### 4.1. Toteuta perusrunko
Käynnistä toteutus Copilot Chatin avulla viitaten dokumentaatioosi. Automaattisempaan suoritukseen, erityisesti käytettäessä Copilot Agent-tilaa (esim. komennot kuten `/new` Copilot Chatissa, jos ne kutsuvat agenttimaisia toimintoja, tai muut erilliset Agent-ominaisuudet), tehtävänmäärittelyn selkeä erottaminen yleisestä työnkulusta on avainasemassa.

Kehotteesi tulisi selkeästi ilmoittaa, mikä dokumentti sisältää *tehtävän yksityiskohdat* ja mikä *yleisen toteutusprosessin*.

* **Esimerkkikehote (Copilot Chat, ohjaten Copilot Agent-tilaa tai kattavaa chat-vuorovaikutusta):**
    ```
    @workspace
    I need you to implement the core genetics engine for our 'Gene Weaver' project.

    The detailed requirements for what to build (module, functions, specific logic) are located in:
    #file:docs/tasks/IMPLEMENT_GENETICS_ENGINE.md

    The general instructions on how you should approach the implementation (assessment, deviation protocol, quality checks, commit simulation, etc.) are defined in:
    #file:docs/instructions/agent_workflow.md

    Please proceed with implementing the full task as described in #file:docs/tasks/IMPLEMENT_GENETICS_ENGINE.md, ensuring you strictly follow the general workflow outlined in #file:docs/instructions/agent_workflow.md.
    Start by ensuring the target module file exists or is created, then implement the functions as specified.
    ```
   **Huomautus vaiheittaiseen Chat-keskusteluun:** Jos suosit keskustelevampaa, vaiheittaista lähestymistapaa Copilot Chatissa (sen sijaan, että pyytäisit koko tehtävää kerralla), voit silti viitata molempiin dokumentteihin. Esimerkiksi:
    ```
    @workspace
    Let's start implementing the `calculateOffspringGenotypes` function from #file:docs/tasks/IMPLEMENT_GENETICS_ENGINE.md. Remember to follow the general process defined in #file:docs/instructions/agent_workflow.md.
    ```

### 4.2. Työstä backlogia
Käsittele kohteet `docs/specifications/BACKLOG.md`-tiedostostasi. Jokaiselle merkittävälle kohteelle:
1.  Luo uusi tehtäväkohtainen dokumentti `docs/tasks/`-kansioon (esim. `IMPLEMENT_PARENT_INPUT_UI.md`).
2.  Viittaa tässä tehtävädokumentissa `docs/instructions/agent_workflow.md`-tiedostoon.
3.  Yksityiskohtaista kyseisen tehtävän erityisvaatimukset, syötteet, tulosteet ja hyväksymiskriteerit.
4.  Käytä Copilot Chatia ( `@workspace`:n kanssa ja viitaten tehtävädokumenttiisi) tai Copilot Agent-tilaa tehtävän toteuttamiseen.

### 4.3. Koodin testaus
Varmenna Copilotin tuottama koodi ja oma koodisi.
* **TDD (Testivetoinen kehitys) -lähestymistapa:** Harkitse perus testirungon kirjoittamista *ennen* kuin pyydät Copilotia generoimaan funktiokoodin.
* **Testit toteutuksen jälkeen:** Kirjoita testit vähintään koodin generoinnin jälkeen toiminnallisuuden varmistamiseksi.
* **Esimerkkikehote (Copilot Chat testien kirjoittamiseen):**
    ```
    @workspace
    For the function `calculateOffspringGenotypes(parent1Genotype, parent2Genotype)` in our genetics engine module (e.g., `src/genetics_engine.js`), help me write unit tests (e.g., using Jest or a similar testing framework suitable for our stack). The tests should check for various parent combinations like:
    1. Parent1="BB", Parent2="bb" (Expected: 100% Bb genotypes)
    2. Parent1="Bb", Parent2="Bb" (Expected: 25% BB, 50% Bb, 25% bb genotypes)
    3. Parent1="bb", Parent2="bb" (Expected: 100% bb genotypes)
    Ensure tests cover the structure of the returned probability object.
    ```

### 4.4. Katselmoi, refaktoroi, committaa -sykli
* **Katselmoi:** Arvioi aina kriittisesti Copilotin generoimaa koodia. Vastaako se vaatimuksia? Onko se tehokasta? Onko se turvallista?
* **Refaktoroi:** Älä epäröi refaktoroida koodia selkeyden, suorituskyvyn tai paremman organisoinnin vuoksi. Voit pyytää Copilotilta refaktorointiehdotuksia.
* **Committaa:** Tee commit toimivista muutoksista Gitiin usein selkeillä viesteillä.

## 5. Vaihe 4: Yhteenveto ja esityksen valmistelu (Noin 15 minuuttia)

* Viimeistele MVP-ominaisuudet `BACKLOG.md`-tiedostosi mukaisesti.
* Varmista, että sovellus toimii ja on interaktiivinen.
* Valmistele lyhyt esittely sovelluksestasi ja kehitysprosessistasi Copilotin kanssa, keskittyen visualisointiin.

## 6. Keskeiset opit: Tekoäly-yhteistyön työnkulku (Noin 5 minuuttia)

* **Selkeys on valttia:** Tehokas tekoäly-yhteistyö perustuu selkeisiin, yksiselitteisiin ja hyvin strukturoituihin dokumentoituihin määrittelyihin ja työnkulkuihin.
* **Dokumentaatio työkaluna:** Käytä dokumentteja, kuten `PROJECT_SPEC.md`, `agent_workflow.md` ja tehtäväkohtaisia tiedostoja, paitsi ihmisten ymmärryksen tukena, myös suorana syötteenä ja ohjeistuksena tekoälylle.
* **Iteratiivinen hienosäätö:** Ensimmäinen kehotteesi tai Copilotin ensimmäinen tuotos ei välttämättä ole täydellinen. Iteroi ohjeitasi ja koodia.
* **Kehittäjä hallitsee:** Sinä olet pääkehittäjä. Katselmoi, ymmärrä, testaa ja omista kaikki koodi, olipa se sinun tai tekoälyn avustuksella kirjoitettua.
* **Strateginen kehottaminen:** Yleiset ohjeet (`.github/copilot-instructions.md`) ja hyvin laaditut tehtäväkohtaiset kehotteet parantavat merkittävästi Copilotin tuotosten laatua ja relevanssia.