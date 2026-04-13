# Visual Design – Wien, ÖNB Cod. 5206

## Gesamtkonzept

Wissenschaftlich und sachlich, aber mit mittelalterlichem Flair. Keine Spielerei — die Gestaltung soll die historische Quelle würdig präsentieren, ohne den Inhalt zu verdecken.

## Seiten

### 1. Startseite (`index.html`)
- Kurze Einleitung: Was ist diese Handschrift? Was ist das Projekt?
- Kerndaten der Handschrift in strukturierter Form (Tabelle oder Infobox):
  - Signatur: Wien, ÖNB Cod. 5206
  - Aufbewahrungsort: Österreichische Nationalbibliothek, Wien
  - Datierung: ca. 1477–1547
  - Beschreibstoff: Papier
  - Umfang: 181 Blätter, Quart (210 × 138 mm)
  - Sprache: Frühneuhochdeutsch
  - Inhalt: Deutsche arithmetische Texte (Rechenarten, Gesellschafts- und Warenrechnung)
- Link/Button zur Editionsansicht.
- Optional: Vorschaubild der Handschrift.

### 2. Editionsansicht (`edition.html`)
- Zweispaltiges Layout:
  - **Links:** Faksimile-Bild der aktuellen Seite (skaliert auf Bildschirmhöhe)
  - **Rechts:** Transkription der aktuellen Seite
- Seitennavigation: Vor/Zurück-Buttons + Angabe der aktuellen Folio-Nummer (z.B. „fol. 81r")
- Umschalter (Toggle) oben: „Diplomatisch" / „Normalisiert"
- Hover-Tooltip auf `<div>`-Abschnitten: zeigt Rechenart + Abschnittstyp (outline / reckoning_example)

## Farbschema

Erdige, historisch wirkende Töne — angelehnt an Pergament und Tinte:

| Rolle | Farbe | Hex |
|---|---|---|
| Hintergrund | Pergamentton | `#f5ead8` |
| Haupttext | Tintenbraun/-schwarz | `#2c1a0e` |
| Akzent / Navigation | Dunkelrot (wie Rubrizierung) | `#8b1a1a` |
| Sekundär | Gedämpftes Beige | `#e8d5b0` |
| Tooltip-Hintergrund | Dunkelbraun, halbtransparent | `#3d2409cc` |

## Typografie

- **Überschriften:** Serif-Schrift mit historischem Charakter (z.B. `Cinzel`, `IM Fell English`, oder `Georgia` als Fallback)
- **Fließtext / Transkription:** Gut lesbare Serif-Schrift (z.B. `Crimson Text`, oder `Georgia`)
- **Interface-Elemente (Buttons, Labels):** Schlicht, kleine Kapitälchen oder reguläres Gewicht

## Navigation

- Einfache Kopfzeile mit Projekttitel und Links: „Startseite" | „Edition"
- Keine komplexe Navigation nötig (nur 2 Seiten)

## Offene Entscheidungen

- Genaue Schriftart: wird beim Styling entschieden (Google Fonts oder Systemschriften)
- Bildgröße und Skalierungsverhalten bei kleineren Bildschirmen: wird beim Implementieren festgelegt
