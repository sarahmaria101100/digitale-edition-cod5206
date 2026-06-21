# Wien, Österreichische Nationalbibliothek, Cod. 5206 – Digitale Edition

Digitale Edition der arithmetischen Texte aus Wien, ÖNB Cod. 5206, einer spätmittelalterlichen Handschrift mit deutschsprachigen Rechenanleitungen (ca. 1477–1547).

Entstanden im Rahmen des Universitätskurses Webentwicklung, basierend auf Daten des ERC-Projekts *German Arithmetical Treatises in Manuscripts of the Late Middle Ages (1400–1522)* (Universität Graz).

**Live:** [https://sarahmaria101100.github.io/Webentwicklung_Projekt/](https://sarahmaria101100.github.io/Webentwicklung_Projekt/)

## Was die Website kann

- **Startseite** mit Beschreibung der Handschrift und Links zu externen Ressourcen
- **Editionsansicht** mit Faksimile (links) und Transkription (rechts) für alle 29 edierten Seiten (fol. 39r, fol. 81r–94v)
- Navigation zwischen den Seiten
- Umschalter zwischen **diplomatischer** (abgekürzt) und **normalisierter** (aufgelöst) Darstellung
- Hover-Tooltip über Textabschnitten zeigt die Rechenart (z.B. „Bruchrechnung") und den Abschnittstyp (z.B. „Rechenbeispiel")
- **Volltextsuche** mit Treffermarkierung im Transkriptionstext

## Wie man die Seite öffnet

Die Website lädt die XML-Datei per JavaScript und benötigt dafür einen Webserver (direkt als Datei öffnen funktioniert nicht).

**Lokal:**
```bash
python3 -m http.server
```
Dann im Browser: [http://localhost:8000](http://localhost:8000)

**Online:** Die Seite ist auf GitHub Pages deployt (Link oben).

## Projektstruktur

```
Webentwicklung_Projekt/
├── index.html          ← Startseite
├── edition.html        ← Editionsansicht
├── css/
│   └── style.css       ← Stylesheet (Mobile-First, zwei Breakpoints: 640px, 960px)
├── js/
│   ├── main.js         ← XML-Laden, Rendering, Navigation, Tooltip
│   └── app.js          ← Volltextsuche mit Mark-Highlighting
├── data/
│   ├── Wien_Nationalbibliothek_5206.xml   ← TEI-XML-Transkription
│   └── img/                               ← Faksimile-Bilder (JPG)
├── docs/
│   ├── requirements.md    ← Anforderungen
│   ├── data.md            ← Datenbeschreibung
│   ├── visual-design.md   ← Design-Entscheidungen
│   ├── app-concept.md     ← Konzept für die JavaScript-Erweiterungen
│   └── journal.md         ← Arbeitsprotokoll
└── tutorial/
    └── tutorial.md        ← Persönliches HTML/CSS/JS-Tutorial
```

## Quellen

| Ressource | Herkunft |
|-----------|----------|
| TEI-XML-Transkription | ERC-Projekt *German Arithmetical Treatises in Manuscripts of the Late Middle Ages*, Universität Graz |
| Faksimile-Bilder | Österreichische Nationalbibliothek Wien, [Digitalisat Cod. 5206](https://digital.onb.ac.at/RepViewer/viewer.faces?doc=DTL_4593643) |
| Schriften (Cinzel, Crimson Text) | [Google Fonts](https://fonts.google.com), SIL Open Font License |
| Kein externer JavaScript-Code verwendet | — |

## Lizenz

Der Quellcode (HTML, CSS, JavaScript) steht unter der [MIT-Lizenz](LICENSE).

Die Transkriptionsdaten (TEI-XML) und die Faksimile-Bilder unterliegen den Nutzungsbedingungen des ERC-Projekts bzw. der Österreichischen Nationalbibliothek und sind nicht Teil der MIT-Lizenz.
