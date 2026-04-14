# Tutorial – Wien, ÖNB Cod. 5206

Dieses Tutorial erklärt den HTML- und CSS-Code der Website Zeile für Zeile,
bezogen auf deinen konkreten Code. Nach dem Lesen kannst du jede Entscheidung
bei einer Präsentation erklären.

> **JavaScript-Teile** (main.js, XML-Parsing, Tooltip-Logik) werden später im Semester erklärt.

---

## Teil 1: HTML-Grundstruktur (gilt für beide Seiten)

### `<!DOCTYPE html>`
```html
<!DOCTYPE html>
```
Teilt dem Browser mit, dass dies ein HTML5-Dokument ist. Ohne diese Zeile
schaltet der Browser in den „Quirks Mode" — einen Kompatibilitätsmodus für
sehr alte Seiten — und rendert Layouts falsch.

### `<html lang="de">`
```html
<html lang="de">
```
Das Wurzelelement der gesamten Seite. Das Attribut `lang="de"` teilt dem
Browser und Screenreadern mit, dass der Inhalt auf Deutsch ist. Das ist
wichtig für die korrekte Aussprache bei Screenreadern und für Suchmaschinen.

### `<head>`
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wien, ÖNB Cod. 5206 – Digitale Edition</title>
    <link rel="stylesheet" href="css/style.css">
</head>
```
Der `<head>` ist unsichtbar — er enthält Metadaten über die Seite, keine Inhalte.

- **`<meta charset="UTF-8">`**: Legt die Zeichenkodierung fest. UTF-8 kann alle
  Zeichen darstellen, die in unserem Text vorkommen — wichtig besonders für die
  mittelalterlichen Sonderzeichen (Umlaute, MUFI-Glyphen) aus der Transkription.

- **`<meta name="viewport" ...>`**: Sorgt dafür, dass die Seite auf Mobilgeräten
  in der richtigen Größe angezeigt wird und nicht auf Desktop-Breite
  herausgezoomt wird.

- **`<title>`**: Text, der im Browser-Tab erscheint. Für jede Seite unterschiedlich
  formuliert (`index.html`: vollständiger Name; `edition.html`: kürzere Variante).

- **`<link rel="stylesheet" href="css/style.css">`**: Bindet unser Stylesheet ein.
  `rel="stylesheet"` sagt dem Browser, worum es sich handelt. Der Pfad `css/style.css`
  ist relativ zur HTML-Datei.

---

## Teil 2: index.html – die Startseite

### `<header>`
```html
<header>
    <nav>
        <a href="index.html">Startseite</a>
        <a href="edition.html">Edition</a>
    </nav>
    <h1>Wien, Österreichische Nationalbibliothek, Cod. 5206</h1>
    <p>Deutsche Abhandlungen zur Arithmetik ...</p>
</header>
```
`<header>` ist ein semantisches Element — es kennzeichnet den Kopfbereich der
Seite. Browser und Screenreader wissen dadurch, dass das die Kopfzeile ist,
nicht irgendein `<div>`.

- **`<nav>`**: Kennzeichnet den Navigationsbereich. Screenreader können damit
  direkt zur Navigation springen. Enthält zwei einfache Links (`<a>`).

- **`<h1>`**: Die wichtigste Überschrift der Seite — es darf nur eine geben.
  Sie nennt das Objekt, um das es geht: die Handschrift.

- **`<p>` im Header**: Ein beschreibender Untertitel. Kein eigenes Element dafür
  vorgesehen in HTML, deshalb ein einfacher Absatz.

### `<main>`
```html
<main>
    <section id="intro"> ... </section>
    <section id="manuscript-info"> ... </section>
    <section id="links"> ... </section>
    <section id="cta"> ... </section>
</main>
```
`<main>` enthält den Hauptinhalt der Seite — alles, was nicht Navigation,
Header oder Footer ist. Pro Seite gibt es genau ein `<main>`.

Die vier `<section>`-Elemente unterteilen den Inhalt logisch:
- `#intro`: Einleitungstext
- `#manuscript-info`: Handschriftdaten
- `#links`: externe Links
- `#cta`: der Button zur Editionsansicht

Das `id`-Attribut gibt jedem Abschnitt einen eindeutigen Namen. Das CSS
kann damit gezielt einzelne Sections ansprechen (z.B. `#intro { ... }`).

### `<section id="intro">` — Einleitung
```html
<section id="intro">
    <h2>Über diese Edition</h2>
    <p>Diese digitale Edition erschließt ...</p>
    <p>Die Edition entstand im Rahmen des ERC-Projekts
        <em>German Arithmetical Treatises ...</em> ...</p>
</section>
```
- **`<h2>`**: Überschrift zweiter Ebene (nach dem `<h1>` im Header).
  Überschriften bilden eine Hierarchie: `h1` → `h2` → `h3`. Diese Hierarchie
  niemals überspringen.

- **`<p>`**: Jeder Absatz bekommt sein eigenes `<p>`-Element. Zwei separate
  `<p>` erzeugen sichtbaren Abstand zwischen den Absätzen.

- **`<em>`**: Betont den Projektnamen kursiv. `<em>` steht für *emphasis* —
  das ist semantischer als einfaches `<i>`, weil es inhaltliche Bedeutung trägt.

### `<section id="manuscript-info">` — Tabelle
```html
<table>
    <tr>
        <th>Signatur</th>
        <td>Wien, Österreichische Nationalbibliothek, Cod. 5206</td>
    </tr>
    ...
</table>
```
Eine HTML-Tabelle für die Handschriftdaten, weil es sich um strukturierte
Schlüssel-Wert-Paare handelt. Das ist genau der Anwendungsfall, für den
Tabellen gedacht sind.

- **`<tr>`** (table row): Eine Zeile in der Tabelle.
- **`<th>`** (table header): Eine Kopfzelle — enthält die Bezeichnung
  (z.B. „Signatur"). Wird vom Browser standardmäßig fett und zentriert
  dargestellt, wir überschreiben das im CSS.
- **`<td>`** (table data): Eine normale Datenzelle — enthält den Wert.

### `<section id="links">` — externe Links
```html
<ul>
    <li>
        <a href="https://handschriftencensus.de/11737" target="_blank">
            Handschriftencensus
        </a>
    </li>
    ...
</ul>
```
- **`<ul>`** (unordered list): Eine Liste ohne Nummerierung, weil die
  Reihenfolge der Links keine Rolle spielt.
- **`<li>`** (list item): Jeder Listenpunkt.
- **`target="_blank"`**: Öffnet den Link in einem neuen Tab. Sinnvoll
  bei externen Seiten, damit der Nutzer die Edition nicht verlässt.

### `<section id="cta">` — Button zur Edition
```html
<section id="cta">
    <a href="edition.html">Zur Edition</a>
</section>
```
Ein einfacher Link, der per CSS wie ein Button aussieht. Wir verwenden
`<a>` statt `<button>`, weil er zu einer anderen Seite navigiert —
`<button>` ist für Aktionen auf der gleichen Seite (wie unsere Toggle-Buttons).

### `<footer>`
```html
<footer>
    <p>Edition im Rahmen eines Universitätskurses. Nicht zur öffentlichen Verbreitung bestimmt.</p>
</footer>
```
`<footer>` kennzeichnet den Fußbereich. Enthält hier einen Hinweis auf den
Kurskontext. Da die Seite nicht öffentlich ist, braucht es kein Impressum.

---

## Teil 3: edition.html – die Editionsansicht

### `<body class="edition-page">`
```html
<body class="edition-page">
```
Die `<body>`-Klasse erlaubt es, im CSS Regeln zu schreiben, die nur für
die Editionsseite gelten — z.B. `body.edition-page main { max-width: 100%; }`.
So teilen beide Seiten dasselbe Stylesheet, ohne sich gegenseitig zu
beeinflussen.

### Steuerleiste `#edition-controls`
```html
<div id="edition-controls">
    <div id="page-navigation">
        <button id="btn-prev" type="button">&#8249; Zurück</button>
        <span id="current-folio">fol. 81r</span>
        <button id="btn-next" type="button">Weiter &#8250;</button>
    </div>
    <div id="transcription-toggle">
        <button id="btn-diplomatic" type="button" class="active">Diplomatisch</button>
        <button id="btn-normalized" type="button">Normalisiert</button>
    </div>
</div>
```
Hier verwenden wir `<div>` statt `<section>`, weil das keine inhaltlichen
Abschnitte sind, sondern Interface-Elemente.

- **`<button type="button">`**: `type="button"` ist wichtig — ohne es würde
  ein Button in einem Formular automatisch das Formular abschicken. Mit
  `type="button"` passiert nichts, bis JavaScript eine Aktion anhängt.

- **`&#8249;` und `&#8250;`**: HTML-Entities für die Zeichen ‹ und ›
  (einfache Winkelzeichen). So werden sie in jedem Browser korrekt angezeigt,
  egal welche Zeichenkodierung.

- **`<span id="current-folio">`**: Ein Inline-Element (kein Zeilenumbruch),
  das die aktuelle Folio-Nummer anzeigt. JavaScript aktualisiert seinen
  Inhalt, wenn die Seite wechselt.

- **`class="active"`** auf `#btn-diplomatic`: Markiert den gerade aktiven
  Modus. Das CSS färbt ihn dunkelrot. JavaScript wechselt diese Klasse,
  wenn der Nutzer umschaltet.

### Zweispaltiges Layout `#edition-view`
```html
<div id="edition-view">
    <div id="facsimile-panel">
        <img id="facsimile-image" src="" alt="Faksimile fol. 81r">
    </div>
    <div id="transcription-panel">
        <!-- Wird per JavaScript befüllt -->
    </div>
</div>
```
- **`<img src="" alt="...">`**: Das `src`-Attribut ist zunächst leer —
  JavaScript setzt den richtigen Bildpfad, sobald bekannt ist, welche Seite
  gerade angezeigt wird. Das `alt`-Attribut ist Pflicht: es beschreibt das
  Bild für Screenreader und wird angezeigt, wenn das Bild nicht lädt.

- **`#transcription-panel` ist leer**: Der Inhalt wird vollständig per
  JavaScript aus der TEI-XML-Datei generiert. Der Kommentar im HTML zeigt,
  wie die entstehenden `<div>`-Elemente aussehen werden — mit `data-type`
  für die Rechenart und `data-section` für outline/reckoning_example.

### Tooltip `#tooltip`
```html
<div id="tooltip" role="tooltip" hidden>
    <span id="tooltip-type"></span>
    <span id="tooltip-section"></span>
</div>
```
- **`role="tooltip"`**: Ein ARIA-Attribut (Accessible Rich Internet
  Applications). Es sagt Screenreadern, dass dieses Element ein Tooltip ist —
  kein normaler Seiteninhalt.

- **`hidden`**: HTML-Attribut, das das Element komplett ausblendet
  (entspricht `display: none`). JavaScript entfernt `hidden`, wenn die
  Maus über einem Textabschnitt ist, und fügt es wieder hinzu, wenn sie
  wegbewegt wird.

- **Zwei `<span>`s**: Inline-Elemente ohne eigenen Zeilenumbruch.
  `#tooltip-type` zeigt die Rechenart, `#tooltip-section` den Abschnittstyp.
  JavaScript schreibt den Text hinein.

### `<script src="js/main.js">` am Ende von `<body>`
```html
    <script src="js/main.js"></script>
</body>
```
Das `<script>`-Tag steht bewusst am Ende des `<body>`, nicht im `<head>`.
So ist der gesamte HTML-Inhalt bereits geladen, bevor JavaScript ausgeführt
wird. Würde das Script im `<head>` stehen, würde es versuchen, Elemente
anzusprechen, die noch nicht existieren.

---

## Teil 4: CSS – style.css

### CSS-Variablen
```css
:root {
    --color-bg:     #f5ead8;
    --color-accent: #8b1a1a;
    ...
}
```
`:root` ist das oberste Element des Dokuments (entspricht `<html>`).
CSS-Variablen (mit `--` Präfix) werden hier einmal definiert und überall
im Stylesheet mit `var(--color-bg)` verwendet. Wenn wir eine Farbe ändern
wollen, ändern wir sie nur an dieser einen Stelle.

Die Farben sind historisch inspiriert:
- `#f5ead8` — Pergamentton (helles Gelbbraun)
- `#2c1a0e` — Tintenbraun (sehr dunkles Braun statt reinem Schwarz)
- `#8b1a1a` — Dunkelrot, angelehnt an die rote Tinte (Rubrizierung) mittelalterlicher Handschriften

### Google Fonts einbinden
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
```
`@import` lädt externe Stylesheets — hier zwei Schriftarten von Google Fonts:
- **Cinzel**: Für Überschriften. Basiert auf römischen Inschriften, wirkt
  historisch-monumental, gut lesbar in Großbuchstaben.
- **Crimson Text**: Für Fließtext. Eine klassische Serifenschrift, gut
  lesbar für längere Texte, ähnlich wie Buchschriften.

`display=swap` verhindert, dass Text unsichtbar bleibt, während die
Schrift lädt — der Browser zeigt zuerst die Fallback-Schrift (Georgia).

### Reset
```css
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```
Browser haben unterschiedliche Standard-Abstände für Elemente. Dieser
Reset setzt alles auf null, damit das Layout auf jedem Browser gleich
aussieht. `box-sizing: border-box` bewirkt, dass `padding` und `border`
in die angegebene Breite eingerechnet werden — intuitiver als der Standard.

### `body` als Flex-Container
```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
```
Damit der Footer immer am unteren Rand bleibt, auch wenn die Seite wenig
Inhalt hat: `display: flex` und `flex-direction: column` stapeln Header,
Main und Footer vertikal. `min-height: 100vh` (100% der Fensterhöhe)
streckt den Body über die gesamte Höhe. `main { flex: 1; }` lässt den
Hauptbereich den verbleibenden Platz einnehmen.

### Header-Styling
```css
header {
    background-color: var(--color-text); /* Tintenbraun */
    color: var(--color-bg);
    border-bottom: 3px solid var(--color-accent);
}
```
Der Header hat dunklen Hintergrund mit hellem Text — umgekehrt zum Rest
der Seite. Der rote Streifen unten (`border-bottom`) greift die Rubrizierung
mittelalterlicher Handschriften auf.

### Tabellen-Styling
```css
th {
    font-family: var(--font-heading);
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--color-accent);
    width: 30%;
}
```
Die `<th>`-Zellen (Bezeichnungen wie „Signatur") werden in Kapitälchen
dargestellt (`text-transform: uppercase` + kleine Schriftgröße).
`width: 30%` begrenzt die linke Spalte, damit die rechte Spalte mehr
Platz für den Inhalt bekommt.

### Zweispaltiges Layout der Editionsansicht
```css
#edition-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    height: calc(100vh - 220px);
}
```
CSS Grid teilt den Bereich in zwei gleich breite Spalten (`1fr 1fr` —
„1 Bruchteil" je). `gap` erzeugt Abstand zwischen den Spalten.

`height: calc(100vh - 220px)` ist entscheidend: Die Gesamthöhe des
Browsers minus die Höhe von Header, Steuerleiste und Footer ergibt
genau den verbleibenden Platz. So können Bild und Transkription
unabhängig voneinander scrollen, ohne dass die gesamte Seite scrollt.

### Hover-Effekt auf Textabschnitten
```css
.text-section:hover {
    border-left-color: var(--color-accent);
    background-color: rgba(139, 26, 26, 0.06);
}
```
`:hover` ist eine CSS-Pseudoklasse — die Regel gilt nur, wenn die Maus
über dem Element ist. Der rote linke Rahmen und die leichte Einfärbung
zeigen dem Nutzer, welcher Abschnitt gerade aktiv ist, bevor der Tooltip
erscheint. `rgba(139, 26, 26, 0.06)` ist dieselbe Farbe wie `--color-accent`,
aber mit nur 6% Deckkraft — sehr dezent.

### Tooltip-Positionierung
```css
#tooltip {
    position: fixed;
    z-index: 100;
    pointer-events: none;
}
```
- **`position: fixed`**: Der Tooltip bleibt immer an derselben Stelle
  im Browserfenster, unabhängig vom Scroll-Zustand. JavaScript setzt die
  genaue Position anhand der Mauskoordinaten.
- **`z-index: 100`**: Stellt sicher, dass der Tooltip über allen anderen
  Elementen liegt.
- **`pointer-events: none`**: Der Tooltip selbst löst keine Mausereignisse
  aus — sonst würde er sich selbst auslösen und flackern.

### Toggle-Button aktiver Zustand
```css
#transcription-toggle button.active {
    background-color: var(--color-accent);
    color: var(--color-bg);
    border-color: var(--color-accent);
}
```
Der aktive Button (diplomatisch oder normalisiert) wird dunkelrot
eingefärbt. Die Klasse `active` wird per JavaScript zwischen den
beiden Buttons gewechselt, wenn der Nutzer umschaltet.

---

## Teil 5: JavaScript – main.js

Wird später im Semester erklärt.
