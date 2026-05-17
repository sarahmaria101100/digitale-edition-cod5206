# Journal – Wien, ÖNB Cod. 5206

## 2026-04-13
- Projektidee definiert: digitale Edition von Wien, ÖNB Cod. 5206 (spätmittelalterliches Arithmetik-Handbuch).
- TEI-XML-Datei in `data/` abgelegt.
- Phase 1 (Bestandsaufnahme) abgeschlossen: XML-Struktur analysiert, 29 Seiten, verschachtelte `<div>`-Elemente mit Rechenarten und Abschnittstypen.
- Phase 2 (Exploration) abgeschlossen: Layout, Features und Designrichtung festgelegt.
- Phase 3 (Destillieren) abgeschlossen: `requirements.md`, `data.md`, `visual-design.md`, `journal.md` erstellt.
- Ordnerstruktur angelegt: `data/`, `data/img/`, `docs/`, `css/`, `js/`, `tutorial/`.
- Bilder (29 JPGs) in data/img/Wien_5206(frueher5296)/ abgelegt.
## 2026-04-13 (Fortsetzung)
- Bildpfad-Bug behoben: xml:id lag auf <graphic>, nicht auf <surface>.
- Bilder erfolgreich eingebunden, Faksimile wird angezeigt.
- Diplomatisch/normalisiert-Toggle funktioniert.
- Tooltip für Rechenart und Abschnittstyp funktioniert.

## 2026-05-17
- Assignment 2 erhalten: JavaScript-Erweiterung, Präsentation am 19.05.2026.
- Konzept für Rechenart-Filter entwickelt: Checkboxen filtern die 29 Seiten nach Rechenart, Ergebnisse zeigen Folio-Nummern mit Typ-Badges.
- `docs/app-concept.md` erstellt (Konzeptdokument, halbe Seite).
- `js/app.js` (Rechenart-Filter, ~72 Zeilen) und `filter.html` implementiert; Filter-CSS zu `style.css` hinzugefügt; Nav in `index.html` und `edition.html` erweitert.
- app.js auf Wunsch vereinfacht: `buildCheckboxes` in `init` integriert, DOM-Manipulation durch `innerHTML` + Template Literals ersetzt.
- Auf Wunsch alle JavaScript-Dateien entfernt (inkl. `main.js`) — nur HTML und CSS verblieben.
- `js/main.js` neu aufgebaut mit allen drei Features: dynamisches XML-Rendering, Diplomatisch/Normalisiert-Toggle, Tooltip-System.
- Zweite JavaScript-Erweiterung hinzugefügt: Textsuche (`js/app.js`, 57 Zeilen). Suchfeld in `edition.html` eingebunden; Treffer werden mit `<mark>` gelb hervorgehoben; `clearHighlights` + `normalize()` stellen den Text bei neuer Suche wieder her.
- `vorbereitung_präsentation.md` erstellt: Zeile-für-Zeile-Erklärung von `main.js` und `app.js` auf Deutsch, mit Konzepttabellen für Rückfragen.
