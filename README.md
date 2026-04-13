# Wien, Österreichische Nationalbibliothek, Cod. 5206 – Digitale Edition

Digitale Edition der arithmetischen Texte aus Wien, ÖNB Cod. 5206, einer spätmittelalterlichen Handschrift mit deutschsprachigen Rechenanleitungen (ca. 1477–1547).

Entstanden im Rahmen des Universitätskurses Webentwicklung, basierend auf Daten des ERC-Projekts *German Arithmetical Treatises in Manuscripts of the Late Middle Ages (1400–1522)* (Universität Graz).

## Was die Website kann

- **Startseite** mit Beschreibung der Handschrift und Links zu externen Ressourcen
- **Editionsansicht** mit Faksimile (links) und Transkription (rechts) für alle 29 edierten Seiten (fol. 39r, fol. 81r–94v)
- Navigation zwischen den Seiten
- Umschalter zwischen **diplomatischer** (abgekürzt) und **normalisierter** (aufgelöst) Darstellung
- Hover-Tooltip über Textabschnitten zeigt die Rechenart (z.B. „Bruchrechnung") und den Abschnittstyp (z.B. „Rechenbeispiel")

## Wie man die Seite öffnet

Die Website benötigt einen lokalen Webserver, weil JavaScript die XML-Datei lädt.

Im Projektordner folgenden Befehl im Terminal ausführen:

```bash
python3 -m http.server
```

Dann im Browser öffnen: [http://localhost:8000](http://localhost:8000)

## Projektstruktur

```
Webentwicklung_Projekt/
├── index.html          ← Startseite
├── edition.html        ← Editionsansicht
├── css/
│   └── style.css       ← Stylesheet
├── js/
│   └── main.js         ← XML-Laden, Rendering, Navigation, Tooltip
├── data/
│   ├── Wien_Nationalbibliothek_5206.xml   ← TEI-XML-Transkription
│   └── img/                               ← Faksimile-Bilder (JPG)
├── docs/
│   ├── requirements.md    ← Anforderungen
│   ├── data.md            ← Datenbeschreibung
│   ├── visual-design.md   ← Design-Entscheidungen
│   └── journal.md         ← Arbeitsprotokoll
└── tutorial/
    └── tutorial.md        ← Persönliches HTML/CSS/JS-Tutorial
```
