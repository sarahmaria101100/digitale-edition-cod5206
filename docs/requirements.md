# Requirements – Wien, ÖNB Cod. 5206 Digital Edition

## Must-have

### Startseite
- Zeigt Basisinformationen zur Handschrift: Signatur, Aufbewahrungsort, Datierung, Beschreibstoff, Umfang, Sprache, Projektkontext.
- Link zur Editionsansicht.

### Editionsansicht
- Zweispaltiges Layout: links Faksimile-Bild der Seite, rechts Transkription.
- Navigation zwischen den 29 Seiten (fol. 39r, fol. 81r–94v).
- Umschalter zwischen zwei Darstellungsmodi der Transkription:
  - **Diplomatisch**: Text wie im Manuskript, mit Abkürzungen (Inhalt von `<abbr>`).
  - **Normalisiert**: Abkürzungen aufgelöst (Inhalt von `<expan>`).
- Hover-Funktion: Beim Überfahren eines Textabschnitts mit der Maus wird ein Tooltip angezeigt mit:
  - Der Rechenart des übergeordneten `<div>` (z.B. `fraction_calculation`, `cooperation_calculation`).
  - Ob es sich um ein `outline`- oder `reckoning_example`-Div handelt.

### Allgemein
- Die Website ist nicht öffentlich zugänglich (Unikurs-Projekt, kein Impressum erforderlich).
- Kein Login oder Zugangsbeschränkung nötig — reicht als lokale Datei oder auf Uni-Server.

## Nice-to-have

- Lesbare deutsche Labels für die Rechenarten im Tooltip (statt der englischen Attributwerte).
- Hervorhebung von `<rs>`-Entitäten (Währungen, Waren, Maße) im Text per Farbe oder Unterstrich.
- Verlinkung auf externe Ressourcen zur Handschrift (Handschriftencensus, manuscripta.at, ÖNB-Digitalisat).
- Inhaltsverzeichnis der Textabschnitte nach Rechenart.

## Offene Fragen

- Werden die Bilder lokal eingebunden oder über eine externe URL (z.B. ÖNB-Digitalisat)?
- Soll die normalisierte Darstellung auch mittelalterliche Sonderzeichen (MUFI-Glyphen) ersetzen oder nur Abkürzungen auflösen?
