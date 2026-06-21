'use strict';

const panel = document.getElementById('transcription-panel');
const input = document.getElementById('search-input');

// Durchsucht den Elementbaum rekursiv nach Textknoten, die den Begriff enthalten.
function findTextNodes(node, lowerTerm, results) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.toLowerCase().includes(lowerTerm)) {
        results.push(node);
    } else {
        for (const child of [...node.childNodes]) {
            findTextNodes(child, lowerTerm, results);
        }
    }
}

// Ersetzt einen Textknoten durch: Text davor + <mark> + Text danach.
// Ruft sich selbst rekursiv auf, falls der Begriff mehrmals vorkommt.
function wrapMatch(textNode, term, lowerTerm) {
    const text = textNode.textContent;
    const index = text.toLowerCase().indexOf(lowerTerm);
    if (index === -1) return;

    const before = document.createTextNode(text.slice(0, index));
    const mark = document.createElement('mark');
    mark.textContent = text.slice(index, index + term.length);
    const after = document.createTextNode(text.slice(index + term.length));

    textNode.replaceWith(before, mark, after);

    if (after.textContent.toLowerCase().includes(lowerTerm)) {
        wrapMatch(after, term, lowerTerm);
    }
}

// Entfernt alle <mark>-Elemente und stellt Textknoten wieder her.
function clearHighlights() {
    panel.querySelectorAll('mark').forEach(mark => {
        mark.replaceWith(mark.textContent);
    });
    panel.normalize();
}

// Hauptfunktion: erst aufräumen, dann neu suchen und markieren.
function search(term) {
    clearHighlights();
    if (term.length < 2) return;

    const lowerTerm = term.toLowerCase();
    const textNodes = [];
    findTextNodes(panel, lowerTerm, textNodes);
    textNodes.forEach(node => wrapMatch(node, term, lowerTerm));
}

input.addEventListener('input', () => search(input.value.trim()));
