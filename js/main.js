'use strict';

// ============================================================
// KONFIGURATION
// ============================================================

const XML_PATH = 'data/Wien_Nationalbibliothek_5206.xml';

// Deutsche Labels für die Rechenarten (aus div[@type])
const CALC_LABELS = {
    'conversion_calculation':  'Umrechnungsrechnung',
    'cooperation_calculation': 'Gesellschaftsrechnung',
    'commodity_calculation':   'Warenrechnung',
    'allocation_calculation':  'Verteilungsrechnung',
    'fraction_calculation':    'Bruchrechnung',
    'multiplication':          'Multiplikation',
    'division':                'Division',
    'addition':                'Addition',
    'subtraction':             'Subtraktion',
    'bisection':               'Halbierung (Mediatio)',
    'doubling':                'Verdoppelung (Duplatio)',
    'root_extraction':         'Wurzelziehen',
    'regula_de_tri':           'Dreisatz (Regula de tri)',
    'test':                    'Probe',
};

// Deutsche Labels für den Abschnittstyp (outline / reckoning_example)
const SECTION_LABELS = {
    'outline':           'Erklärung der Methode',
    'reckoning_example': 'Rechenbeispiel',
    'test':              'Probe',
};

// Typen, die als Abschnittstyp gelten (nicht als Rechenart)
const SECTION_TYPES = new Set(['outline', 'reckoning_example', 'test']);

// ============================================================
// ZUSTAND
// ============================================================

let xmlDoc      = null;   // das geparste XML-Dokument
let pages       = [];     // Array von { folio, imageUrl, pbElement }
let currentPage = 0;      // Index der aktuell angezeigten Seite
let currentMode = 'diplomatic'; // 'diplomatic' | 'normalized'

// ============================================================
// DOM-ELEMENTE
// ============================================================

const btnPrev          = document.getElementById('btn-prev');
const btnNext          = document.getElementById('btn-next');
const folioDisplay     = document.getElementById('current-folio');
const btnDiplomatic    = document.getElementById('btn-diplomatic');
const btnNormalized    = document.getElementById('btn-normalized');
const facsimileImage   = document.getElementById('facsimile-image');
const transcriptionPanel = document.getElementById('transcription-panel');
const tooltip          = document.getElementById('tooltip');
const tooltipType      = document.getElementById('tooltip-type');
const tooltipSection   = document.getElementById('tooltip-section');

// ============================================================
// INITIALISIERUNG
// ============================================================

async function init() {
    try {
        const response = await fetch(XML_PATH);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, 'application/xml');

        buildPageList();
        renderPage(currentPage);
        setupEventListeners();
    } catch (e) {
        transcriptionPanel.innerHTML =
            '<p style="color:#8b1a1a; padding:1rem;">' +
            'Die XML-Datei konnte nicht geladen werden.<br>' +
            'Bitte die Seite über einen lokalen Webserver öffnen (z.B. mit ' +
            '<code>python3 -m http.server</code> im Projektordner).' +
            '</p>';
        console.error(e);
    }
}

// ============================================================
// SEITENLISTE AUFBAUEN
// ============================================================

function buildPageList() {
    // 1. Bildpfade aus <graphic xml:id="IMAGE.N" url="..."> lesen
    const imageMap = {};
    const graphics = xmlDoc.getElementsByTagNameNS('*', 'graphic');
    for (const graphic of graphics) {
        const id = graphic.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'id')
                || graphic.getAttribute('xml:id');
        const url = graphic.getAttribute('url');
        if (id && url) {
            imageMap[id] = url;
        }
    }

    // 2. Alle <pb>-Elemente durchgehen und Seitenliste erstellen
    const pbs = xmlDoc.getElementsByTagNameNS('*', 'pb');
    for (const pb of pbs) {
        const facs  = pb.getAttribute('facs'); // z.B. "#IMAGE.2"
        const folio = pb.getAttribute('n');    // z.B. "081r"
        const imageId  = facs ? facs.replace('#', '') : null;
        const filename = imageId ? imageMap[imageId] : null;
        pages.push({
            folio,
            imageUrl:  filename ? `data/img/Wien_5206(frueher5296)/${filename}` : null,
            pbElement: pb,
        });
    }
}

// ============================================================
// SEITE RENDERN
// ============================================================

function renderPage(index) {
    const page = pages[index];

    folioDisplay.textContent = `fol. ${page.folio}`;

    if (page.imageUrl) {
        facsimileImage.src = page.imageUrl;
        facsimileImage.alt = `Faksimile fol. ${page.folio}`;
    } else {
        facsimileImage.removeAttribute('src');
        facsimileImage.alt = 'Bild noch nicht verfügbar';
    }

    transcriptionPanel.innerHTML = '';
    const content = renderPageContent(index, currentMode);
    transcriptionPanel.appendChild(content);

    updateNavButtons();
    setupTooltipListeners();
}

function updateNavButtons() {
    btnPrev.disabled = (currentPage === 0);
    btnNext.disabled = (currentPage === pages.length - 1);
}

// ============================================================
// XML → HTML: SEITENINHALT
// ============================================================

function renderPageContent(targetPage, mode) {
    const container = document.createElement('div');
    let currentPageIdx = -1;
    const divStack = [container];

    function walk(xmlNode) {
        if (xmlNode.nodeType === Node.ELEMENT_NODE && xmlNode.localName === 'pb') {
            currentPageIdx++;
            return;
        }

        if (xmlNode.nodeType === Node.ELEMENT_NODE && xmlNode.localName === 'div') {
            const type = xmlNode.getAttribute('type');
            const htmlDiv = document.createElement('div');
            if (type) {
                htmlDiv.classList.add('text-section');
                htmlDiv.dataset.type = type;
            }
            divStack.push(htmlDiv);
            for (const child of xmlNode.childNodes) walk(child);
            divStack.pop();
            if (htmlDiv.hasChildNodes()) {
                divStack[divStack.length - 1].appendChild(htmlDiv);
            }
            return;
        }

        if (currentPageIdx !== targetPage) {
            if (xmlNode.nodeType === Node.ELEMENT_NODE) {
                for (const child of xmlNode.childNodes) walk(child);
            }
            return;
        }

        if (xmlNode.nodeType === Node.TEXT_NODE) {
            const text = xmlNode.textContent;
            if (text.trim()) {
                divStack[divStack.length - 1].appendChild(document.createTextNode(text));
            }
            return;
        }

        if (xmlNode.nodeType === Node.ELEMENT_NODE) {
            const rendered = renderElement(xmlNode, mode);
            if (rendered) divStack[divStack.length - 1].appendChild(rendered);
        }
    }

    const body = xmlDoc.getElementsByTagNameNS('*', 'body')[0];
    if (body) {
        for (const child of body.childNodes) walk(child);
    }
    return container;
}

// ============================================================
// XML → HTML: EINZELNE ELEMENTE
// ============================================================

function renderElement(xmlNode, mode) {
    const tag = xmlNode.localName;

    switch (tag) {

        case 'p': {
            const p = document.createElement('p');
            renderChildren(xmlNode, p, mode);
            return p.hasChildNodes() ? p : null;
        }

        case 'choice': {
            const targetTag = mode === 'diplomatic' ? 'abbr' : 'expan';
            const target = xmlNode.getElementsByTagNameNS('*', targetTag)[0];
            if (!target) return null;
            const span = document.createElement('span');
            renderChildren(target, span, mode);
            return span;
        }

        case 'hi': {
            const rend = xmlNode.getAttribute('rend') || '';
            const span = document.createElement('span');
            span.className = `hi-${rend}`;
            renderChildren(xmlNode, span, mode);
            return span.hasChildNodes() ? span : null;
        }

        case 'lb':
            return document.createElement('br');

        case 'rs': {
            const span = document.createElement('span');
            span.classList.add('rs', `rs-${xmlNode.getAttribute('type')}`);
            renderChildren(xmlNode, span, mode);
            return span;
        }

        case 'unclear': {
            const span = document.createElement('span');
            span.className = 'unclear';
            renderChildren(xmlNode, span, mode);
            return span;
        }

        case 'g': {
            const text = xmlNode.textContent;
            return text ? document.createTextNode(text) : null;
        }

        case 'am': {
            const span = document.createElement('span');
            span.className = 'am';
            renderChildren(xmlNode, span, mode);
            return span;
        }

        case 'span': {
            const span = document.createElement('span');
            renderChildren(xmlNode, span, mode);
            return span;
        }

        case 'note':
        case 'figure':
        case 'pb':
        case 'surface':
        case 'graphic':
        case 'zone':
            return null;

        default: {
            const span = document.createElement('span');
            renderChildren(xmlNode, span, mode);
            return span.hasChildNodes() ? span : null;
        }
    }
}

function renderChildren(xmlNode, htmlParent, mode) {
    for (const child of xmlNode.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent;
            if (text) htmlParent.appendChild(document.createTextNode(text));
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            const rendered = renderElement(child, mode);
            if (rendered) htmlParent.appendChild(rendered);
        }
    }
}

// ============================================================
// EVENT LISTENER
// ============================================================

function setupEventListeners() {
    btnPrev.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            renderPage(currentPage);
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            renderPage(currentPage);
        }
    });

    btnDiplomatic.addEventListener('click', () => {
        if (currentMode !== 'diplomatic') {
            currentMode = 'diplomatic';
            btnDiplomatic.classList.add('active');
            btnNormalized.classList.remove('active');
            renderPage(currentPage);
        }
    });

    btnNormalized.addEventListener('click', () => {
        if (currentMode !== 'normalized') {
            currentMode = 'normalized';
            btnNormalized.classList.add('active');
            btnDiplomatic.classList.remove('active');
            renderPage(currentPage);
        }
    });
}

// ============================================================
// TOOLTIP
// ============================================================

function setupTooltipListeners() {
    const sections = transcriptionPanel.querySelectorAll('.text-section');
    sections.forEach(el => {
        el.addEventListener('mouseenter', (e) => showTooltip(e, el));
        el.addEventListener('mousemove',  (e) => moveTooltip(e));
        el.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event, element) {
    const { calcType, sectionType } = getTooltipInfo(element);
    if (!calcType && !sectionType) return;

    tooltipType.textContent    = calcType    ? CALC_LABELS[calcType]    ?? calcType    : '';
    tooltipSection.textContent = sectionType ? SECTION_LABELS[sectionType] ?? sectionType : '';

    tooltip.removeAttribute('hidden');
    moveTooltip(event);
}

function moveTooltip(event) {
    tooltip.style.left = (event.clientX + 12) + 'px';
    tooltip.style.top  = (event.clientY + 12) + 'px';
}

function hideTooltip() {
    tooltip.setAttribute('hidden', '');
}

function getTooltipInfo(element) {
    let calcType    = null;
    let sectionType = null;
    let node = element;

    while (node && node !== transcriptionPanel) {
        const type = node.dataset?.type;
        if (type) {
            if (!sectionType && SECTION_TYPES.has(type)) {
                sectionType = type;
            } else if (!calcType && !SECTION_TYPES.has(type)) {
                calcType = type;
            }
        }
        node = node.parentElement;
    }

    return { calcType, sectionType };
}

// ============================================================
// START
// ============================================================

init();
