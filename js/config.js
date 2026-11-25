/* =====================================================================
   CONFIG.JS : the small things you will most likely want to change
   ===================================================================== */

/* ---- PRESENTED BY (shown on the title page; add more names to get a pyramid: 1 on top, then 2, then 3...). Format: ["Full name", 1 or 0]
        1 = the creator of the site (gets the star and the top place), 0 = member.
        Rows are built in js/main.js (function reels): row 1 = first name, row 2 = names 2 and 3, row 3 = names 4 and 5 ---- */
const MEMBERS=[["Zekraoui Rabah-Allaa Eddine",1]]; /* TEAM: 1 = creator */

/* ---- COLORS: COL = color of each of the 6 techniques (tiles, names), BLOB = dark disc behind each animation ---- */
const COL=['#e8501b','#2f7fe0','#9b3fd0','#e09a00','#d93a5a','#16a085','#e11d96'],BLOB=['#10243f','#0d3a4f','#2a1a4a','#3a2610','#0f2d3a','#103a35','#1f2a44'];

/* ---- TECHNICAL SHEET METERS: [selectivity, cost, speed] from 1 to 5 for each technique, in the same order as the carousel
        (centrifugation, filtration, precipitation, extraction, chromatography, crystallization, electrophoresis) ---- */
const MT=[[1,2,5],[2,2,4],[2,1,4],[3,2,3],[5,5,2],[5,3,2],[4,3,3]];

/* ---- WEBSITE ADDRESS used by the QR code (end of the page). Replace the placeholder by your real link once the site is hosted on GitHub Pages,
        for example "https://zekraoui.github.io/purification-biomolecules/" ---- */
const SITE_URL="https://VOTRE-NOM.github.io/purification-biomolecules/";
