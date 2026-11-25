/* =====================================================================
   UI.JS : extra interface features
   1. extras()      builds the plan, key takeaways, comparison table, key figures, next-chapter buttons
   2. PRESENTER MODE (button "Presenter": bar with arrows, timer and speaker notes). Notes text: js/content.js (notes)
   3. TOOLS menu (Aa button): text size, light mode, print/PDF, share link, copy references
   4. EASTER EGG: touch the squid in the footer
   5. cursor glow and 3D tilt of the cards
   ===================================================================== */
const fmt=(v,d)=>{const s=(+v).toFixed(d);return L=='fr'?s.replace('.',','):s};
function extras(){const t=T[L];
 $('#segs').innerHTML='<i></i>'.repeat(7);
 $('#plan_l').innerHTML=t.plan.map(p=>`<a class="pl" href="${p[2]}"><b>${p[0]}</b><span>${p[1]}</span></a>`).join('');
 document.querySelectorAll('[data-kt]').forEach(e=>{e.innerHTML=`<h3>${t.kt_t}</h3><ul>${t.kt[+e.dataset.kt].map(x=>`<li>${x}</li>`).join('')}</ul>`});
 $('#cmp').innerHTML=`<thead><tr>${t.cmp.h.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${t.cmp.r.map(r=>`<tr>${r.map((x,i)=>i?`<td>${x}</td>`:`<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody>`;
 $('#kpis').innerHTML=t.kpi.map(x=>`<div class="k"><b data-v="${x[0]}" data-d="${x[1]}">${fmt(x[0],x[1])}</b><small>${x[2]}</small></div>`).join('');
 const ids=['plan','intro','gen','met','ex','con'],nx=['intro','gen','met','ex','con','ref'];
 ids.forEach((id,i)=>{const s=$('#'+id);let a=s.querySelector('.nx');if(!a){a=document.createElement('a');a.className='nx';s.appendChild(a)}a.href='#'+nx[i];a.innerHTML=t.next+' &#9654;'})}
let kdone=false;new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!kdone){kdone=true;if(window.LITE)return;const s0=performance.now(),f=()=>{const p=Math.min(1,(performance.now()-s0)/1200);document.querySelectorAll('#kpis b').forEach(b=>b.textContent=fmt(b.dataset.v*p,b.dataset.d));if(p<1)requestAnimationFrame(f)};f()}}),{threshold:.4}).observe($('#kpis'));

/* presenter mode with visible bar */
const PS=['hero','plan','intro','gen','met','ex','con','ref'];function pnote(){const k=pidx();$('#pnt').innerHTML='<b>'+(k+1)+'/'+PS.length+'</b> '+T[L].notes[k];tmTick()}let pOn=false,pt0=0,ptm;
function pidx(){let k=0;PS.forEach((id,i)=>{if($('#'+id).offsetTop<=scrollY+innerHeight*.4)k=i});return k}
function pgo(d){const k=Math.max(0,Math.min(PS.length-1,pidx()+d));$('#'+PS[k]).scrollIntoView({behavior:'smooth'})}
function pset(on){pOn=on;document.documentElement.classList.toggle('pres',on);$('#pbar').hidden=!on;if(!on)laser(false);$('#pnotes').hidden=!on;$('#pres').innerHTML=on?T[L].pres1:T[L].pres0;clearInterval(ptm);
 if(on){pt0=Date.now();ptm=setInterval(()=>{const s=Math.floor((Date.now()-pt0)/1000);$('#pt').textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')},1000);$('#pc').textContent=(pidx()+1)+' / '+PS.length;pnote();
  try{const p=document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();p&&p.catch&&p.catch(()=>{})}catch(e){}
  setTimeout(()=>$('#hero').scrollIntoView({behavior:'smooth'}),60)}
 else{try{document.fullscreenElement&&document.exitFullscreen()}catch(e){}}}
$('#pres').onclick=()=>pset(!pOn);$('#px').onclick=()=>pset(false);$('#pp').onclick=()=>pgo(-1);$('#pn').onclick=()=>pgo(1);
addEventListener('scroll',()=>{if(pOn){$('#pc').textContent=(pidx()+1)+' / '+PS.length;pnote()}},{passive:true});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&pOn)pset(false)});
addEventListener('keydown',e=>{if(e.key=='Escape'){$('#tp').classList.remove('open');if(pOn)pset(false);return}
 if(!pOn||e.target.closest('#edit,input'))return;if(e.key==' '&&e.target.tagName=='BUTTON')return;
 const nx=['ArrowDown','ArrowRight','PageDown',' '].includes(e.key),pv=['ArrowUp','ArrowLeft','PageUp'].includes(e.key);if(!nx&&!pv)return;e.preventDefault();pgo(nx?1:-1)});
/* tools: text size, light mode, print, share, copy references */
let FSZ=100;try{FSZ=+localStorage.getItem('fs')||100}catch(e){}
function setFs(n){FSZ=Math.max(85,Math.min(140,n));document.documentElement.style.fontSize=FSZ+'%';try{localStorage.setItem('fs',FSZ)}catch(e){}}setFs(FSZ);
let LITE=false;try{const s=localStorage.getItem('lite');LITE=s===null?(navigator.hardwareConcurrency<=2||(navigator.deviceMemory&&navigator.deviceMemory<=2)||matchMedia('(prefers-reduced-motion:reduce)').matches):s==='1'}catch(e){}
function setLite(b){window.LITE=LITE=b;document.documentElement.classList.toggle('lite',b);$('#lt').classList.toggle('on',b);try{localStorage.setItem('lite',b?'1':'0')}catch(e){}}setLite(LITE);
$('#tb').onclick=()=>$('#tp').classList.toggle('open');$('#tdn').onclick=()=>setFs(FSZ-10);$('#tup').onclick=()=>setFs(FSZ+10);$('#lt').onclick=()=>setLite(!LITE);$('#tprt').onclick=()=>print();
function flash(b,txt){const o=b.textContent;b.textContent=txt;setTimeout(()=>b.textContent=o,1400)}
$('#tsh').onclick=function(){const d={title:document.title,url:location.href};if(navigator.share)navigator.share(d).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(location.href).then(()=>flash(this,T[L].tl_ok)).catch(()=>{})};
$('#trf').onclick=function(){const txt=REFS.map((r,i)=>'['+(i+1)+'] '+r.replace(/<[^>]+>/g,'')).join('\n');if(navigator.clipboard)navigator.clipboard.writeText(txt).then(()=>flash(this,T[L].tl_ok)).catch(()=>{})};
addEventListener('beforeprint',()=>document.querySelectorAll('details').forEach(d=>d.open=true));

/* ===== EASTER EGG: touch the squid in the footer ===== */
let sqn=0;
function bloop(){try{const C=new(window.AudioContext||window.webkitAudioContext)(),o=C.createOscillator(),g=C.createGain(),n=C.currentTime;o.type='sine';o.frequency.setValueAtTime(220,n);o.frequency.exponentialRampToValueAtTime(880,n+.18);g.gain.setValueAtTime(.18,n);g.gain.exponentialRampToValueAtTime(.001,n+.3);o.connect(g);g.connect(C.destination);o.start();o.stop(n+.32);setTimeout(()=>C.close(),700)}catch(e){}}
function squid(e){document.querySelectorAll('.egg').forEach(x=>x.remove());sqn++;const big=sqn%5==0,t=T[L],o=document.createElement('div');o.className='egg';
 const r=e.currentTarget.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;let s='';
 if(!window.LITE){
  for(let i=0;i<7;i++)s+=`<i class="ink" style="left:${x}px;top:${y}px;--s:${6+i*3};animation-delay:${i*.07}s"></i>`;
  for(let i=0;i<(big?1:5);i++)s+=`<b class="sw" style="top:${big?20:8+Math.random()*70}vh;font-size:${big?'34vh':(2+Math.random()*3)+'rem'};animation-duration:${big?4:2.4+Math.random()*1.4}s;animation-delay:${i*.25}s">\u{1F991}</b>`;
  for(let i=0;i<22;i++)s+=`<u class="bb" style="left:${Math.random()*100}vw;width:${6+Math.random()*14}px;height:${6+Math.random()*14}px;animation-delay:${Math.random()*1.2}s"></u>`}
 s+=`<p class="egt">\u{1F991} ${big?t.egg[2]:sqn==1?t.egg[0]:t.egg[1]}<small>Zekraoui Rabah Allaa Eddine</small></p>`;
 o.innerHTML=s;document.body.appendChild(o);bloop();setTimeout(()=>o.remove(),big?4600:3400)}
$('#sq').onclick=squid;
/* cursor glow and 3D tilt */
addEventListener('pointermove',e=>{const c=$('#cur');c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'});
if(matchMedia('(hover:hover)').matches){let last;document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card,.gl');if(last&&last!==c)last.style.transform='';if(c){const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');c.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg)`}last=c})}

/* ===== HELP WINDOW (button ? in the tools menu, or the ? key) ===== */
function helpClose(){const m=$('#helpm');if(m)m.hidden=true}
function helpOpen(){let m=$('#helpm');if(!m){m=document.createElement('div');m.id='helpm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m);m.onclick=e=>{if(e.target===m||e.target.closest('button'))helpClose()}}
 const t=T[L];m.innerHTML=`<div class="hbox"><h3>${t.help_t}</h3><ul>${t.help.map(x=>`<li>${x}</li>`).join('')}</ul><button class="btn" id="hx">OK</button></div>`;m.hidden=false;$('#hx').focus()}
$('#thp').onclick=()=>{$('#tp').classList.remove('open');helpOpen()};
addEventListener('keydown',e=>{if(e.key=='?'&&!e.target.closest('input,textarea'))helpOpen();if(e.key=='Escape')helpClose()});

/* ===== SIDE DOTS : quick jump between chapters (wide screens) ===== */
function sdots(){const t=T[L];$('#sdots').innerHTML=PS.map((id,i)=>`<a href="#${id}" aria-label="${i==0?t.title:i==1?t.plan_t:t.nav[i-2]}" title="${i==0?t.title:i==1?t.plan_t:t.nav[i-2]}"></a>`).join('')}
let maxSeen=0;addEventListener('scroll',()=>{const k=pidx();maxSeen=Math.max(maxSeen,k);document.querySelectorAll('#sdots a').forEach((a,j)=>{a.classList.toggle('on',j==k);a.classList.toggle('seen',j<=maxSeen&&j!=k)})},{passive:true});

/* ===== GLOSSARY SEARCH ===== */
function lexq(){const f=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),q=f($('#lexq').value||'');document.querySelectorAll('#lex details').forEach(d=>{d.hidden=!!q&&!f(d.textContent).includes(q)})}
$('#lexq').oninput=lexq;

/* ===== FULLSCREEN OF THE METHODS EDIT (for the jury room screen) ===== */
function efsSync(){const b=$('#efsnd');if(b){b.classList.toggle('on',fon);b.innerHTML=fon?'&#128266;':'&#128263;'}}
function efsSet(on){const e=$('#estage');e.classList.toggle('fs',on);document.documentElement.classList.toggle('efs',on);$('#efs').innerHTML=on?T[L].efx:T[L].efs;efsSync();
 if(on){if(!matchMedia('(pointer:coarse)').matches){try{const p=e.requestFullscreen&&e.requestFullscreen();p&&p.catch&&p.catch(()=>{})}catch(x){}}}else{try{document.fullscreenElement&&document.exitFullscreen()}catch(x){}}}
/* works everywhere: if the browser blocks true fullscreen (for example inside a preview frame) the stage still fills the whole screen */
$('#efs').onclick=()=>efsSet(!$('#estage').classList.contains('fs'));$('#efc').onclick=()=>efsSet(false);$('#efsnd').onclick=()=>funk(!fon);
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&$('#estage').classList.contains('fs'))efsSet(false)});
addEventListener('keydown',e=>{if(e.key=='Escape'&&$('#estage').classList.contains('fs'))efsSet(false)});

/* ===== LASER POINTER (red button in the presenter bar) ===== */
const LZ=document.createElement('div');LZ.id='laser';document.body.appendChild(LZ);
function laser(on){document.documentElement.classList.toggle('laser',on);const b=$('#pl');if(b)b.classList.toggle('on',on)}
$('#pl').onclick=()=>laser(!document.documentElement.classList.contains('laser'));
addEventListener('pointermove',e=>{if(document.documentElement.classList.contains('laser')){LZ.style.left=e.clientX+'px';LZ.style.top=e.clientY+'px'}},{passive:true});

/* ===== ACCESSIBILITY: high contrast and dyslexia-friendly font (remembered) ===== */
function flag(name,cls,btn){const on=(()=>{try{return localStorage.getItem(name)==='1'}catch(e){return false}})();
 const set=b=>{document.documentElement.classList.toggle(cls,b);$(btn).classList.toggle('on',b);try{localStorage.setItem(name,b?'1':'0')}catch(e){}};set(on);$(btn).onclick=()=>set(!document.documentElement.classList.contains(cls))}
flag('hc','hc','#thc');flag('dys','dys','#tdy');

/* ===== TITLES: words fly in when a chapter appears ===== */
function splitTitles(){document.querySelectorAll('section.sc h2').forEach(h=>{if(h.querySelector('.w'))return;h.innerHTML=h.textContent.split(' ').map((x,i)=>`<span class="w" style="--i:${i}">${x}</span>`).join(' ')})}

/* ===== RESUME where the visitor stopped (remembered on this device) ===== */
let rsT=0;addEventListener('scroll',()=>{clearTimeout(rsT);rsT=setTimeout(()=>{try{localStorage.setItem('lastsec',PS[pidx()])}catch(e){}},400)},{passive:true});
(function(){let last=null;try{last=localStorage.getItem('lastsec')}catch(e){}
 if(!last||last=='hero'||last=='plan'||!$('#'+last))return;
 setTimeout(()=>{if(scrollY>300)return;const t=T[L],d=document.createElement('div');d.id='resume';d.innerHTML=`<span>${t.rs_t}</span><button class="mini" id="rsy">${t.rs_y}</button><button class="mini" id="rsn">${t.rs_n}</button>`;document.body.appendChild(d);
  $('#rsy').onclick=()=>{$('#'+last).scrollIntoView({behavior:'smooth'});d.remove()};$('#rsn').onclick=()=>d.remove();setTimeout(()=>d.remove(),9000)},1200)})();

/* ===== SEARCH PALETTE (Ctrl+K, the / key, or the Search button in the tools menu) ===== */
function cmdItems(){const t=T[L],k=t.cmd_k,a=[],go=(el,o)=>el.scrollIntoView(o||{behavior:'smooth'});
 t.nav.forEach((n,i)=>a.push({n,k:k[0],f:()=>go($('#'+['intro','gen','met','ex','con','ref'][i]))}));
 t.m.forEach((m,i)=>a.push({n:m[0],k:k[1],f:()=>{show(i);go($('#edit'),{behavior:'smooth',block:'center'})}}));
 t.m.map(m=>m[0]).concat(t.lab_x.slice(1)).forEach((n,i)=>a.push({n,k:k[2],f:()=>{li=i;labTabs();labUp();go($('#lab'))}}));
 t.adv.forEach(x=>a.push({n:x[1],k:k[3],f:()=>go($('#adv'))}));
 [[t.hist_t,'#histl'],[t.qbd_t,'#qbdh'],[t.e2_t,'#e2h'],[t.qr_t,'#qr'],[t.dl_t,'#dlh']].forEach(x=>a.push({n:x[0],k:k[5],f:()=>go($(x[1]),{behavior:'smooth',block:'start'})}));
 t.lex.forEach(x=>a.push({n:x[0],k:k[4],f:()=>{$('#lexq').value=x[0];lexq();go($('#lex'),{behavior:'smooth',block:'center'});const d=document.querySelector('#lex details:not([hidden])');if(d)d.open=true}}));
 return a}
let cmI=0,cmR=[];
function cmdClose(){const m=$('#cmdk');if(m)m.hidden=true}
const nrm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function cmdRender(){const q=nrm($('#cmi').value||'').trim(),all=cmdItems();cmR=(q?all.filter(x=>nrm(x.n).includes(q)):all.slice(0,10)).slice(0,10);cmI=0;
 $('#cml').innerHTML=cmR.length?cmR.map((x,i)=>`<li data-i="${i}" class="${i==0?'on':''}"><span>${x.n}</span><small>${x.k}</small></li>`).join(''):`<li><span>${T[L].cmd_none}</span></li>`;
 $('#cml').querySelectorAll('li[data-i]').forEach(li=>li.onclick=()=>cmdGo(+li.dataset.i))}
function cmdGo(i){const x=cmR[i];if(!x)return;cmdClose();x.f()}
function cmdOpen(){let m=$('#cmdk');if(!m){m=document.createElement('div');m.id='cmdk';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.innerHTML='<div class="cbox"><input id="cmi" type="search" autocomplete="off"><ul id="cml"></ul></div>';document.body.appendChild(m);
  m.onclick=e=>{if(e.target===m)cmdClose()};$('#cmi').oninput=cmdRender;
  $('#cmi').onkeydown=e=>{const n=cmR.length;if(e.key=='ArrowDown'||e.key=='ArrowUp'){e.preventDefault();cmI=(cmI+(e.key=='ArrowDown'?1:-1)+n)%Math.max(1,n);$('#cml').querySelectorAll('li').forEach((l,i)=>l.classList.toggle('on',i==cmI))}else if(e.key=='Enter'){e.preventDefault();cmdGo(cmI)}else if(e.key=='Escape')cmdClose()}}
 $('#cmi').placeholder=T[L].cmd_ph;$('#cmi').setAttribute('aria-label',T[L].cmd_ph);$('#cmi').value='';m.hidden=false;cmdRender();$('#cmi').focus()}
$('#tsr').onclick=()=>{$('#tp').classList.remove('open');cmdOpen()};
addEventListener('keydown',e=>{if((e.key=='k'||e.key=='K')&&(e.ctrlKey||e.metaKey)){e.preventDefault();cmdOpen()}else if(e.key=='/'&&!e.target.closest('input,textarea')){e.preventDefault();cmdOpen()}else if(e.key=='Escape')cmdClose()});

/* ===== PRESENTATION TIMER (button in the presenter bar): total time shared between the chapters ===== */
const TM_OPT=[10,15,20,25,30],TM_FR=[.05,.05,.10,.15,.35,.20,.05,.05];let TM_TOT=15,tmChapT=0,tmLast=-1;
try{TM_TOT=+localStorage.getItem('tmtot')||15}catch(e){}
function tmFmt(s){s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function tmTick(){if(!pOn){tmLast=-1;return}const tot=TM_TOT*60,el=(Date.now()-pt0)/1000,k=pidx();if(k!==tmLast){tmLast=k;tmChapT=Date.now()}
 const bud=TM_FR[k]*tot,ch=(Date.now()-tmChapT)/1000,e=$('#ptl');if(!e)return;e.textContent=`${T[L].tm_t} : ${tmFmt(ch)} / ${tmFmt(bud)}  |  ${tmFmt(el)} / ${tmFmt(tot)}`;e.className=ch>bud?'over':ch>bud*.8?'warn':''}
function tmBtn(){$('#ptm').innerHTML='&#9201; '+TM_TOT}
$('#ptm').onclick=()=>{TM_TOT=TM_OPT[(TM_OPT.indexOf(TM_TOT)+1)%TM_OPT.length];try{localStorage.setItem('tmtot',TM_TOT)}catch(e){}tmBtn();tmLast=-1;tmTick()};tmBtn();setInterval(tmTick,1000);
