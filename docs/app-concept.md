# Konzept: JavaScript-Anwendungen

## Übersicht

Das Projekt enthält zwei JavaScript-Dateien, die gemeinsam die interaktive
Editionsansicht bilden: `main.js` stellt die Kernfunktionalität bereit,
`app.js` ergänzt sie um eine Textsuche.

---

## main.js — Dynamische Edition

### Was die Anwendung tut

`main.js` lädt beim Öffnen der Seite automatisch die TEI-XML-Datei
(`Wien_Nationalbibliothek_5206.xml`) und übersetzt sie in HTML. Die Seite
enthält damit keine statischen Transkriptionstexte — alles wird zur Laufzeit
aus dem XML erzeugt.

Drei Features sind eingebaut:

**1. Dynamisches Rendering:** Die XML-Elemente (`<p>`, `<hi>`, `<choice>`,
`<lb>` u. a.) werden von einer rekursiven `walk`-Funktion in HTML-Elemente
übersetzt. Seitenumbrüche (`<pb>`) teilen das Dokument in 29 navigierbare
Seiten auf, denen jeweils ein Faksimile-Bild zugeordnet ist.

**2. Darstellungswechsel (diplomatisch / normalisiert):** Zwei Buttons
ermöglichen das Umschalten zwischen diplomatischer Transkription (Abkürzungen
sichtbar, `<abbr>`) und normalisierter Darstellung (Abkürzungen aufgelöst,
`<expan>`). Die Entscheidung fällt in `renderElement` bei jedem `<choice>`-
Element im XML: je nach aktivem Modus wird der entsprechende Kindknoten gerendert.

**3. Tooltip-System:** Bewegt man die Maus über einen Textabschnitt, erscheint
ein Tooltip mit Rechenart (z.B. „Bruchrechnung") und Abschnittstyp (z.B.
„Rechenbeispiel"). Die Informationen stammen aus den `type`-Attributen der
`<div>`-Elemente im TEI. Die Funktion `getTooltipInfo` klettert dafür den
DOM-Baum nach oben und liest die `data-type`-Attribute aus.

### Bedienung

- **‹ Zurück / Weiter ›** — blättert durch die 29 Seiten
- **Diplomatisch / Normalisiert** — wechselt den Darstellungsmodus
- **Hover über Textabschnitt** — zeigt den Tooltip

---

## app.js — Textsuche

### Was die Anwendung tut

`app.js` ergänzt die Editionsansicht um eine Volltextsuche innerhalb der
aktuell angezeigten Transkription. Trefferworte werden mit einem
`<mark>`-Element gelb hervorgehoben. Die Suche ist nicht-fallsensitiv
(„Gulden" und „gulden" liefern dasselbe Ergebnis).

### Bedienung

- Suchfeld im oberen Steuerbereich der Editionsseite eintippen
- Treffer werden sofort gelb markiert
- Feld leeren → Markierungen verschwinden

