# Data – Wien, ÖNB Cod. 5206

## Vorliegende Materialien

### TEI-XML-Datei
- **Datei:** `data/Wien_Nationalbibliothek_5206.xml`
- **Umfang:** 3.591 Zeilen, eine Datei
- **Kodierung:** TEI P5, erstellt im Rahmen des ERC-Projekts „German Arithmetical Treatises in Manuscripts of the Late Middle Ages (1400–1522)", Universität Graz
- **Transkribierte Abschnitte:** fol. 39r und fol. 81r–94v (29 Seiten gesamt)
- **Sprache des Textes:** Frühneuhochdeutsch (mit lateinischen Einschüben)

### Bilder
- **Format:** JPG
- **Anzahl:** 29 Dateien
- **Namensschema:** `WienoesterreichischeNationalbibliothekCod.5296-0001.jpg` bis `...0029.jpg`
- **Speicherort (geplant):** `data/img/`
- **Status:** Noch nicht im Repository, werden nachgereicht.
- Die Bilder sind im XML unter `<graphic url="..."/>` innerhalb von `<surface>`-Elementen referenziert.

## Struktur der XML-Datei

### Wichtige Elemente

| Element | Anzahl | Bedeutung |
|---|---|---|
| `<pb>` | 29 | Seitenumbrüche, mit `@facs` (Bildreferenz) und `@n` (Folio-Nummer) |
| `<choice>` / `<abbr>` / `<expan>` | ~1.539 | Abkürzungen mit diplomatischer und normalisierter Form |
| `<am>` / `<g>` | ~2.500 | Mittelalterliche Sonderzeichen (MUFI-Zeichensatz) |
| `<zone>` | 962 | Textzonen auf den Seiten (für Bild-Text-Koordination) |
| `<hi>` | 877 | Hervorhebungen (`rend="heading"`, `rend="initial"`, `rend="superscript"`, etc.) |
| `<lb>` | 765 | Zeilenumbrüche mit Bildreferenz |
| `<rs>` | 483 | Benannte Entitäten (Währungen, Waren, Maße, Gewichte, Längen, Volumen) |
| `<div>` | 152 | Textabschnitte, gegliedert nach Rechenart |
| `<figure>` | 40 | Mathematische Figuren/Diagramme |
| `<unclear>` | 21 | Unsichere Lesungen |
| `<note>` | 16 | Randbemerkungen (`place="above"`, `place="bottom"`) |

### Div-Typen (Rechenarten)

Die `<div>`-Elemente sind **verschachtelt**. Ein äußeres `div` gibt die übergeordnete Rechenart an, ein inneres `div` klassifiziert den Abschnitt als `outline` (theoretische Erklärung) oder `reckoning_example` (konkretes Rechenbeispiel).

**Rechenarten (äußere div-Typen):**
`conversion_calculation`, `cooperation_calculation`, `commodity_calculation`, `allocation_calculation`, `fraction_calculation`, `multiplication`, `division`, `addition`, `subtraction`, `bisection`, `doubling`, `root_extraction`, `regula_de_tri`

**Abschnittstypen (innere div-Typen):**
- `outline` – Erklärung der Rechenmethode
- `reckoning_example` – Konkretes Rechenbeispiel
- `test` – Probe/Überprüfung

## Für die Website benötigtes Format

Die TEI-XML-Datei wird direkt per JavaScript (DOMParser oder XMLSerializer) im Browser geparst. Kein Konvertierungsschritt nötig. Die Darstellung erfolgt durch Traversieren der XML-Struktur und dynamisches Erzeugen von HTML-Elementen.
