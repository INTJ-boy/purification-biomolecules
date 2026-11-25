![Biomolecules purification website banner](assets/social/og-image.png)

# Procédés de purification de biomolécules 🧬

An interactive bilingual learning website about downstream processing
and the purification of biomolecules. Created by Zekraoui Rabah-Allaa
Eddine, with an academic context at the Université des Sciences et de la
Technologie Houari Boumediene (USTHB), Algeria.

The site combines illustrated explanations, animated process diagrams,
virtual laboratory models, and downloadable study materials to help
university students explore the main stages and techniques used in
biomolecule purification.

## Explore the website

-   **Fundamentals** --- Biomolecule categories, purification
    objectives, and the main product- and process-related impurities.
-   **Purification techniques** --- Interactive explanations and
    technical sheets for seven core techniques: centrifugation,
    filtration, precipitation, liquid-liquid extraction, chromatography,
    crystallization, and electrophoresis.
-   **Process stages** --- Follow the downstream purification workflow,
    from clarification and capture to intermediate purification,
    polishing, and final preparation.
-   **Animated illustrations** --- Visual explanations of the techniques
    and the journey of a molecule through a purification process.
-   **Virtual laboratory** --- Interactive equipment models and
    adjustable parameters for the seven core techniques, plus advanced
    models for monolith chromatography, aqueous two-phase systems, and
    continuous chromatography.
-   **Build-a-process challenge** --- Assemble a purification sequence
    for a selected example and explore the simulated effects on purity,
    yield, and cost. The challenge uses illustrative teaching values,
    not validated industrial process data.
-   **Advanced topics** --- Explore advanced purification approaches,
    impurity control, quality-control concepts, and product profiles.
-   **Acarbose case study** --- An educational example based on acarbose
    and the CORECT® context. Any process steps marked `[À ADAPTER]` /
    `[TO ADAPT]` are placeholders and should not be interpreted as
    Biopharm's confidential or confirmed manufacturing process.
-   **Study and presentation resources** --- Presenter mode with speaker
    notes and a timer, a searchable command palette, and a QR-code
    section linked to the configured website address.
-   **Downloads** --- Word report, one-page PDF summary, PowerPoint
    summary, and A3 poster, with preview images.

## Features

-   French and English interface.
-   Responsive, interactive presentation-style layout.
-   Animated technique illustrations and a 3D-style molecular helix
    rendered in the browser.
-   Virtual laboratory models with adjustable parameters.
-   Presenter mode, speaker notes, presentation timer, and fullscreen
    support where the browser allows it.
-   Search palette (Ctrl+K, `/`, or the Search control).
-   Lightweight mode for reducing visual effects on less powerful
    devices.
-   Local persistence for selected interface preferences where browser
    storage is available.
-   Designed to run locally from the project folder and to be hosted as
    a static website on GitHub Pages.
-   No build step or third-party JavaScript package installation is
    required.

Some optional external destinations, such as YouTube search links,
require an internet connection. Browser storage and fullscreen behavior
depend on the browser and its permissions.

## Run locally

1.  Download or clone this repository.
2.  Keep the folder structure intact.
3.  Open `index.html` in a modern browser.

The project is built with plain HTML, CSS, and JavaScript. The main page
loads its scripts in a specific order; do not reorder the script tags in
`index.html` unless you also check their dependencies.

## Deploy on GitHub Pages

1.  Upload the contents of this project folder to the root of a GitHub
    repository. `index.html` must be at the repository root.
2.  In **Settings → Pages**, choose **Deploy from a branch**, select the
    `main` branch and the `/ (root)` folder, then save.
3.  Once GitHub Pages provides the public address, update the website
    URL using the instructions in `GUIDE-PUBLICATION.md`.
4.  Check the published site and the QR code after updating the URL.

For automated URL replacement through GitHub Actions, add a workflow
that runs `python tools/set-url.py` from the repository root. The
workflow needs `contents: write` permission to commit the changed files.
See `GUIDE-PUBLICATION.md` for the manual publishing procedure.

## Project structure

``` text
.
├── index.html
├── css/
│   ├── style.css
│   └── theme.css
├── js/
│   ├── content.js
│   ├── config.js
│   ├── scenes.js
│   ├── labs.js
│   ├── builder.js
│   ├── journey.js
│   ├── acarbose.js
│   ├── advanced.js
│   ├── extra.js
│   ├── downloads.js
│   ├── ui.js
│   └── main.js
├── assets/
│   ├── downloads/
│   ├── figures/
│   ├── icons/
│   ├── previews/
│   └── social/
├── tools/
│   ├── set-url.py
│   └── qr-generator.html
├── GUIDE-PUBLICATION.md
├── GUIDE-MISE-A-JOUR-DOCUMENTS.md
├── PARTAGE-RESEAUX.md
└── LICENSE.txt
```

## Customize the project

  -----------------------------------------------------------------------
  To change                           Edit
  ----------------------------------- -----------------------------------
  French and English text, chapter    `js/content.js`
  content, and references             

  Presenter name(s), technique        `js/config.js`
  colors, and website URL used by the 
  QR section                          

  Main layout and styling             `css/style.css` and `css/theme.css`

  Technique animations                `js/scenes.js`

  Virtual laboratory models           `js/labs.js`

  Process challenge model             `js/builder.js`

  Molecule journey animation          `js/journey.js`

  Acarbose structure and mechanism    `js/acarbose.js`
  animation                           

  Advanced-topic cards and            `js/advanced.js` and `js/extra.js`
  supplementary sections              

  Downloadable documents              `assets/downloads/` and
                                      `js/downloads.js`

  Preview images for downloads        `assets/previews/`

  Website URL replacement             `tools/set-url.py`
  -----------------------------------------------------------------------

When replacing a downloadable document, preserve the filename referenced
by `js/downloads.js`. Update its preview image in `assets/previews/` as
needed.

## Documentation

-   `GUIDE-PUBLICATION.md` --- Publish the website with GitHub Pages and
    configure its public URL.
-   `GUIDE-MISE-A-JOUR-DOCUMENTS.md` --- Instructions for updating the
    downloadable documents.
-   `PARTAGE-RESEAUX.md` --- Sharing and social-preview guidance.
-   `tools/` --- Small utilities supplied with the project.

## License and contact

© 2026 Zekraoui Rabah-Allaa Eddine. All rights reserved.

This project, including its source code, text, illustrations, and
documents, is protected by the rights stated in `LICENSE.txt`. No
copying, modification, redistribution, reproduction, or commercial use
is permitted without prior authorization from the copyright holder.

For permission, licensing, questions, or feedback, contact the author
through
[LinkedIn](https://www.linkedin.com/in/zekraouirabahallaaeddine).
