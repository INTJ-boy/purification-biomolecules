/* =====================================================================
   CORE.JS : tiny helpers shared by every file. Loaded first. No need to edit.
   $()  = short for document.querySelector     L = current language ("fr" or "en")
   ===================================================================== */
const $=s=>document.querySelector(s);let L='fr';try{L=localStorage.getItem('lang')||'fr'}catch(e){}
