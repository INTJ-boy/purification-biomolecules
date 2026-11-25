/* =====================================================================
   EXTRA.JS : chapter extras
   1. history timeline (chapter II)           2. quality by design cards (chapter III, 6.1)
   3. second example: monoclonal antibody (chapter IV): stepper + comparison table with acarbose
   4. QR code of the website (end of the page), driven by SITE_URL in js/config.js
   Texts: js/content.js (keys hist, qbd, e2_*, s3, e2cmp, qr_*).
   ===================================================================== */
function qrBuild(){const t=T[L],b=$('#qr');if(!b)return;const ph=/VOTRE|YOUR/i.test(SITE_URL);let svg='';try{svg=qrSvg(SITE_URL,200)}catch(e){svg=''}
 b.innerHTML=`<div class="qrw">${svg}<div><h3>${t.qr_t}</h3><p>${t.qr_p}</p><p class="out"><b>${SITE_URL}</b></p>${ph?`<p class="warn">${t.qr_ph}</p>`:''}<button class="mini" id="qrc">${t.qr_copy}</button></div></div>`;
 $('#qrc').onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText(SITE_URL).then(()=>flash(this,t.pb_copied)).catch(()=>{})}}
function extraBuild(){const t=T[L];
 const h=$('#histl');if(h)h.innerHTML=t.hist.map(x=>`<div class="tle"><b>${x[0]}</b><p>${x[1]}</p></div>`).join('');
 const qc=$('#qbdc');if(qc)qc.innerHTML=t.qbd_c.map(x=>`<span>${x}</span>`).join('<i>&#9654;</i>');
 const q=$('#qbd');if(q)q.innerHTML=t.qbd.map((c,i)=>`<div class="card"><span class="advn">${i+1}</span><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('');
 if($('#st3'))stepper('#st3',t.s3);
 const e=$('#e2tbl');if(e)e.innerHTML=`<thead><tr>${t.e2cmp.h.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${t.e2cmp.r.map(r=>`<tr>${r.map((x,i)=>i?`<td>${x}</td>`:`<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody>`;
 qrBuild()}
