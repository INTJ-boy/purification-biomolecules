/* =====================================================================
   MAIN.JS : the engine. Loaded after all other files.
   stepper()  clickable step flows with purity and yield gauges (4.2 and the Acarbose process)
   render()   writes every text of the current language into the page (data-t, data-cards attributes) and builds the lists
   reels()    builds the roster, the team pyramid, the flow, then calls extras(), show(), labTabs(), labUp()
   ===================================================================== */
function stepper(id,list){const el=$(id);
  el.innerHTML=`<div class="steps">${list.map((s,i)=>`<button>${i+1}. ${s[0]}</button>`).join('')}</div><span class="out"><b>${T[L].purity}</b></span><div class="gauge"><div class="g1"></div></div><span class="out"><b>${T[L].yield}</b></span><div class="gauge"><div class="g2"></div></div><p class="out"></p>`;
  const b=el.querySelectorAll('button'),g=el.querySelectorAll('.gauge div'),o=el.querySelector('p.out');
  b.forEach((x,i)=>x.onclick=()=>{const s=list[i];b.forEach(y=>y.classList.toggle('on',y===x));g[0].style.width=s[1]+'%';g[1].style.width=s[2]+'%';o.innerHTML=`${T[L].purity} ${s[1]} % | ${T[L].yield} ${s[2]} %<br>${s[3]}`})}

function render(){const t=T[L];document.documentElement.lang=L;$('#lang').textContent=L=='fr'?'EN':'FR';
  document.querySelectorAll('[data-t]').forEach(e=>{const v=t[e.dataset.t];e.innerHTML=Array.isArray(v)?v.map(x=>'<p>'+x+'</p>').join(''):v});
  document.querySelectorAll('[data-cards]').forEach(e=>e.innerHTML=t[e.dataset.cards].map(c=>`<div class="card"><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join(''));
  $('#nav').innerHTML=t.nav.map((n,i)=>`<a href="#${['intro','gen','met','ex','con','ref'][i]}">${n}</a>`).join('');
  reels();
  $('#qc').innerHTML=t.qc.map(c=>`<button class="chip"><u></u>${c}</button>`).join('');
  const up=()=>{const n=document.querySelectorAll('.chip.on').length;$('#qcn').textContent=n;$('#qcg').style.width=n/8*100+'%'};
  document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{c.classList.toggle('on');c.firstChild.textContent=c.classList.contains('on')?'\u2713':'';up()});up();
  $('#vids').innerHTML=`<h3 style="width:100%">${t.vid}</h3>`+VID.map(v=>`<a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(v[2])}">${L=='fr'?v[1]:v[0]}</a>`).join('');
  stepper('#st1',t.s1);stepper('#st2',t.s2);
  $('#refs').innerHTML=REFS.map(r=>`<li>${r}</li>`).join('')}
$('#lang').onclick=()=>{L=L=='fr'?'en':'fr';try{localStorage.setItem('lang',L)}catch(e){}render()};

/* mixture dots in intro svg */
$('#dots').innerHTML=Array.from({length:26},(_,i)=>`<circle cx="${150+(i*37)%70}" cy="${35+(i*23)%90}" r="6" fill="${['#ff9f43','#b18cff','#2dd4bf','#ff5f8f'][i%4]}"/>`).join('');
/* splash */
setTimeout(()=>document.body.classList.add('go'),250);
/* reveal, progress, menu highlight */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id))}}),{threshold:0,rootMargin:"0px 0px -8% 0px"});
document.querySelectorAll('.rv').forEach(s=>io.observe(s));
addEventListener('scroll',()=>{$('#bar').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'},{passive:true});

function reels(){const t=T[L];
 $('#roster').innerHTML=t.m.map((m,i)=>`<button data-i="${i}" style="--c:${COL[i]}">${m[0]}</button>`).join('');
 document.querySelectorAll('#roster button').forEach(b=>b.onclick=()=>{eb=0;show(+b.dataset.i)});
 $('#snd').innerHTML=fon?'&#128266; '+t.snd1:'&#128263; '+t.snd0;
 const tile=i=>{const m=MEMBERS[i];return `<div class="tile${m[1]?' lead':''}" style="--c:${COL[i]}"><i>${m[1]?'\u2605':i+1}</i><b>${m[0]}</b><small>${m[1]?t.lead:t.mem}</small></div>`};$('#team').innerHTML=(()=>{const r=[];let i=0,n=1;while(i<MEMBERS.length){r.push(Array.from({length:Math.min(n,MEMBERS.length-i)},(_,k)=>i+k));i+=n;n++}return r})().map(r=>`<div class="trow">${r.map(tile).join('')}</div>`).join('');
 document.querySelector('.tick div').textContent=(t.tick+' ').repeat(6);
 $('#flow').innerHTML=t.flow.map(x=>`<span>${x}</span>`).join('<i></i>');extras();pbRender();journeyBuild();acBuild();advBuild();extraBuild();dlBuild();sdots();splitTitles();$('#efs').innerHTML=t.efs;show(ei);labTabs();labUp();[["tb","tools"],["tdn","tl_dn"],["tup","tl_up"],["lt","tl_lite"],["tprt","tl_print"],["thp","tl_help"],["tsr","tl_search"],["thc","tl_hc"],["tdy","tl_dy"],["pl","laser"],["tsh","tl_share"],["trf","tl_refs"]].forEach(x=>{const e=$("#"+x[0]);e.setAttribute("aria-label",t[x[1]]);e.title=t[x[1]]});$('#lex').innerHTML=t.lex.map(x=>`<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join('');$('#lexq').placeholder=t.lex_ph;lexq();$('#pres').innerHTML=document.documentElement.classList.contains('pres')?t.pres1:t.pres0}

render();
