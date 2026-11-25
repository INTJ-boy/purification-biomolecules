let ei=-1,eb=0,AC,fon=false;
function show(i){ei=i;const t=T[L],st=$('#edit'),nm=$('#nm'),ro=i<0;st.classList.remove('swap');void st.offsetWidth;st.classList.add('swap');st.classList.remove('sw0','sw1','sw2');if(i>=0)st.classList.add('sw'+i%3);$('#no').textContent=i<0?'':String(i+1).padStart(2,'0')+'/07';document.querySelectorAll('#segs i').forEach((s,j)=>s.className=j<i?'f':j==i?'on':'');
 $('#roster').style.display=ro?'grid':'none';$('#fig').style.display=ro?'none':'flex';if(ro)$('#fig').innerHTML='';
 const name=ro?t.roster:t.m[i][0].toUpperCase();nm.textContent=name;nm.dataset.g=name;nm.style.color=ro?'#111':COL[i];
 $('#cp').textContent=ro?t.rostercp:t.m[i][1];fiche(i);
 if(!ro)$('#fig').innerHTML=`<svg viewBox="0 52 200 196" aria-hidden="true"><defs><clipPath id="ecl"><rect x="4" y="54" width="192" height="192" rx="46"/></clipPath></defs><rect x="4" y="54" width="192" height="192" rx="46" fill="${BLOB[i]}"/><g clip-path="url(#ecl)">${scene(i)}</g></svg>`;
 try{navigator.userActivation&&navigator.userActivation.hasBeenActive&&navigator.vibrate&&navigator.vibrate(10)}catch(e){}}
function step(d){eb=0;show(((ei+1+d+8)%8)-1)}
function fiche(i){const t=T[L],e=$('#fiche');if(i<0){e.style.borderLeft='';e.innerHTML=`<h3>${t.fx_h}</h3><p>${t.fx_p}</p>`;return}const x=t.fx[i];e.style.borderLeft='6px solid '+COL[i];
 e.innerHTML=`<h3>${t.m[i][0]}</h3><div class="fx">${t.fx_l.map((l,k)=>`<div><b>${l}</b><p>${x[k]}</p></div>`).join('')}</div><div class="mt">${t.mt.map((l,k)=>`<span>${l} <i>${'\u25CF'.repeat(MT[i][k])}${'\u25CB'.repeat(5-MT[i][k])}</i></span>`).join('')}</div><div class="types"><b>${t.types_t}</b><div class="chips">${t.types[i].map((y,q)=>`<button class="chp" data-q="${q}">${y[0]}</button>`).join('')}</div><p class="out tyd" aria-live="polite"></p></div><button class="mini" data-lab="${i}">${t.try}</button>`;e.querySelectorAll('.chp').forEach(c=>c.onclick=()=>{e.querySelectorAll('.chp').forEach(z=>z.classList.toggle('on',z===c));const y=t.types[i][+c.dataset.q];e.querySelector('.tyd').innerHTML=`<b>${y[0]}</b> : ${y[1]}`});e.querySelector('[data-lab]').onclick=()=>{li=i;labTabs();labUp();$('#lab').scrollIntoView({behavior:'smooth'})}}

$('#edit').addEventListener('click',e=>{if(e.target.closest('button,.roster'))return;const r=$('#edit').getBoundingClientRect();step(e.clientX-r.left<r.width*.35?-1:1)});
$('#edit').addEventListener('pointermove',e=>{const r=$('#edit').getBoundingClientRect(),s=$('#edit').style;s.setProperty('--px',((e.clientX-r.left)/r.width-.5).toFixed(2));s.setProperty('--py',((e.clientY-r.top)/r.height-.5).toFixed(2))},{passive:true});
$('#eprev').onclick=()=>step(-1);$('#enext').onclick=()=>step(1);
$('#edit').addEventListener('keydown',e=>{if(e.key=='ArrowRight'||e.key=='ArrowDown')step(1);if(e.key=='ArrowLeft'||e.key=='ArrowUp')step(-1)});
let tx=0,ty=0;$('#edit').addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
$('#edit').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))step(dx<0?1:-1)});

let AB=null,AS=null,GN=null,t0=0,lastB=-9,raf=0;const T0=4.335,BP=.5815,NB=16,LOOPS=3,LOOPLEN=NB*BP,LEAD=.012;
function sched(b){if(b<14)return b%2?undefined:b/2;return b==14?-1:undefined}
function pulse(){const h=$('#hand'),e=$('#edit');h.classList.remove('tap');void h.offsetWidth;h.classList.add('tap');e.classList.add('b');setTimeout(()=>e.classList.remove('b'),120)}
function etick(){if(!fon)return;const lat=AC.outputLatency||AC.baseLatency||0,el=Math.max(0,AC.currentTime-t0-lat),total=T0+LOOPS*LOOPLEN;
 if(el>=total){funk(false);show(-1);return}
 const lp=el<T0?0:Math.min(LOOPS-1,Math.floor((el-T0)/LOOPLEN));
 $('#tlb').style.width=(el/total*100)+'%';$('#rec').textContent='\u25CF REC 00:'+String(Math.floor(el)).padStart(2,'0')+'.'+Math.floor((el%1)*10)+(el<T0?'':'  LOOP '+(lp+1)+'/'+LOOPS);
 if(el<T0){if(lastB!==-1){lastB=-1;show(-1)}}else{const gb=Math.floor((el-T0)/BP);if(gb!==lastB){lastB=gb;pulse();const x=sched(gb%NB);if(x!==undefined)show(x)}}
 raf=requestAnimationFrame(etick)}
async function funk(on){const b=$('#snd'),t=T[L];
 if(!on){fon=false;cancelAnimationFrame(raf);if(AS){try{const n=AC.currentTime;GN.gain.cancelScheduledValues(n);GN.gain.setValueAtTime(GN.gain.value,n);GN.gain.linearRampToValueAtTime(0,n+.15);AS.stop(n+.18)}catch(e){}AS=null}b.classList.remove('on');b.innerHTML='&#128263; '+t.snd0;if(window.efsSync)efsSync();return}
 try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();await AC.resume();
  if(!AB){const r=atob(AUDIO),u=new Uint8Array(r.length);for(let i=0;i<r.length;i++)u[i]=r.charCodeAt(i);AB=await AC.decodeAudioData(u.buffer)}
  if(fon)return;fon=true;GN=AC.createGain();GN.connect(AC.destination);AS=AC.createBufferSource();AS.buffer=AB;AS.loop=true;AS.loopStart=T0-LEAD;AS.loopEnd=T0-LEAD+LOOPLEN;AS.connect(GN);
  t0=AC.currentTime+.05;AS.start(t0);AS.stop(t0+T0+LOOPS*LOOPLEN+.4);lastB=-9;b.classList.add('on');b.innerHTML='&#128266; '+t.snd1;if(window.efsSync)efsSync();etick()}catch(e){fon=false}}
$('#snd').onclick=()=>funk(!fon);

new IntersectionObserver(es=>es.forEach(e=>{if(e.intersectionRatio<.35&&fon)funk(false)}),{threshold:[0,.35]}).observe($('#edit'));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&fon)funk(false)});addEventListener('pagehide',()=>{if(fon)funk(false)});
