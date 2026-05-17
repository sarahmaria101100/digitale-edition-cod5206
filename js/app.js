'use strict';

const panel = document.getElementById('transcription-panel');
const input = document.getElementById('search-input');

// Durchsucht den Elementbaum rekursiv nach Textknoten, die den Begriff enthalten.
function findTextNodes(node, term, results) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.toLowerCase().includes(term.toLowerCase())) {
            results.push(node);
        }
    } else {
        for (const child of [...node.childNodes]) {
            findTextNodes(child, term, results);
        }
    }
}

// Ersetzt einen Textknoten durch: Text davor + <mark> + Text danach.
// Ruft sich selbst rekursiv auf, falls der Begriff mehrmals vorkommt.
function wrapMatch(textNode, term) {
    const text = textNode.textContent;
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return;

    const before = document.createTextNode(text.slice(0, index));
    const mark = document.createElement('mark');
    mark.textContent = text.slice(index, index + term.length);
    const after = document.createTextNode(text.slice(index + term.length));

    textNode.replaceWith(before, mark, after);

    if (after.textContent.toLowerCase().includes(term.toLowerCase())) {
        wrapMatch(after, term);
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

    const textNodes = [];
    findTextNodes(panel, term, textNodes);
    textNodes.forEach(node => wrapMatch(node, term));
}

input.addEventListener('input', () => search(input.value.trim()));
