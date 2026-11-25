const AC_P=[.8,3.2];let acOn=0,acRaf=0,acLevel=.12,acFly=[],acLast=0,acC=-1,acVis=false;
function acHex(x,y,r,db){let p='';for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;p+=(i?'L':'M')+(x+r*Math.cos(a)).toFixed(1)+' '+(y+r*Math.sin(a)).toFixed(1)}
 return `<path d="${p}Z" fill="${db?'#2dd4bf33':'#ffffff10'}" stroke="#e8f2f8" stroke-width="2"/>`+(db?`<line x1="${x-r*.5}" y1="${y-r*.7}" x2="${x+r*.5}" y2="${y-r*.7}" stroke="#ff9f43" stroke-width="2.4"/>`:'')}
function acBuild(){const t=T[L],box=$('#ac');if(!box)return;
 let s=SGD+`<g transform="translate(0 4)"><line x1="68" x2="106" y1="30" y2="30" stroke="#e8f2f8" stroke-width="2"/><line x1="128" x2="166" y1="30" y2="30" stroke="#e8f2f8" stroke-width="2"/><line x1="188" x2="226" y1="30" y2="30" stroke="#e8f2f8" stroke-width="2"/>${[0,1,2,3].map(i=>acHex(46+i*60,30,20,i==0)).join('')}<circle cx="97" cy="30" r="6" fill="#ff9f43"/><text x="97" y="33" text-anchor="middle" font-size="8" fill="#111" font-family="monospace">N</text>
 ${t.ac_st.map((n,i)=>`<text x="${46+i*60}" y="66" text-anchor="middle" font-size="7.5" fill="#cfe3ee" font-family="sans-serif">${n}</text>`).join('')}
 <path d="M26 2 L26 -2 L106 -2 L106 2" fill="none" stroke="#2dd4bf" stroke-width="1.6"/><text x="66" y="-6" text-anchor="middle" font-size="8" fill="#2dd4bf" font-family="sans-serif">${t.ac_br[0]}</text>
 <path d="M146 2 L146 -2 L226 -2 L226 2" fill="none" stroke="#ff9f43" stroke-width="1.6"/><text x="186" y="-6" text-anchor="middle" font-size="8" fill="#ff9f43" font-family="sans-serif">${t.ac_br[1]}</text></g>
 <rect x="8" y="96" width="304" height="90" rx="14" fill="#ffffff08" stroke="#ffffff22"/><text x="18" y="110" font-size="8" fill="#9bb8c2" font-family="sans-serif">${t.ac_ch}</text><text x="130" y="110" font-size="8" fill="#9bb8c2" font-family="sans-serif">${t.ac_en}</text><text x="266" y="110" text-anchor="middle" font-size="8" fill="#9bb8c2" font-family="sans-serif">${t.ac_g}</text>
 <line x1="20" x2="112" y1="146" y2="146" stroke="#ffffff33" stroke-width="3"/><g id="acChain"></g><path id="acEnz" fill="#b18cff" stroke="#e8f2f8" stroke-width="2"/><g id="acBlk" opacity="0"><rect x="116" y="127" width="30" height="8" rx="4" fill="#2dd4bf"/><rect x="116" y="137" width="30" height="8" rx="4" fill="#2dd4bf" opacity=".6"/></g>
 <g id="acFl"></g><rect x="254" y="116" width="24" height="64" rx="8" ${GLS}/><rect id="acLv" x="257" y="176" width="18" height="0" rx="6" fill="#ff5f5f"/>`;
 box.innerHTML=`<svg viewBox="0 -14 320 200" role="img" aria-label="${t.ac_t}">${s}</svg><div class="acb"><button class="mini" data-m="0">${t.ac_off}</button><button class="mini" data-m="1">${t.ac_on}</button></div><p class="out" id="acm" aria-live="polite"></p>`;
 box.querySelectorAll('.acb button').forEach(b=>b.onclick=()=>{acOn=+b.dataset.m;acFly=[];acC=-1;acUi()});acUi()}
function acUi(){const t=T[L];document.querySelectorAll('#ac .acb button').forEach(b=>{const on=+b.dataset.m==acOn;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});$('#acm').textContent=acOn?t.ac_mn:t.ac_mo;const k=$('#acBlk');if(k)k.setAttribute('opacity',acOn?1:0)}
function acFrame(now){if(!acVis)return;const t=now/1000,dt=Math.min(.1,t-acLast||0);acLast=t;const P=AC_P[acOn],ph=t%P,c=Math.floor(t/P);
 const a=6+(ph<.3?32*Math.sin(Math.PI*ph/.3):0),cx=146,cy=136,r=20,ar=a*Math.PI/180;
 const e=$('#acEnz');if(!e)return;e.setAttribute('d',`M${cx} ${cy} L${(cx-r*Math.cos(ar)).toFixed(1)} ${(cy-r*Math.sin(ar)).toFixed(1)} A${r} ${r} 0 1 1 ${(cx-r*Math.cos(ar)).toFixed(1)} ${(cy+r*Math.sin(ar)).toFixed(1)} Z`);
 if(c!==acC){acC=c;acFly.push({u:0})}
 let ch='';for(let i=0;i<6;i++){const x=24+i*16+((t*14)%16);if(x<110)ch+=`<circle cx="${x.toFixed(1)}" cy="146" r="6" fill="#ffd23f" stroke="#fff3" /><path d="M${(x-3).toFixed(1)} 143 L${(x+3).toFixed(1)} 149" stroke="#a87a00" stroke-width="1"/>`}
 $('#acChain').innerHTML=ch;
 let fl='';acFly=acFly.filter(f=>{f.u+=dt/1.1;if(f.u>=1){acLevel=Math.min(1,acLevel+.075);return false}const x=146+(266-146)*f.u,y=cy-4-30*Math.sin(Math.PI*f.u)+(f.u*30);fl+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#ffd23f"/>`;return true});
 $('#acFl').innerHTML=fl;acLevel=Math.max(.1,acLevel-dt*.02);const h=acLevel*58;$('#acLv').setAttribute('height',h.toFixed(1));$('#acLv').setAttribute('y',(176-h).toFixed(1));
 requestAnimationFrame(acFrame)}
new IntersectionObserver(es=>es.forEach(e=>{acVis=e.isIntersecting;if(acVis){acLast=performance.now()/1000;requestAnimationFrame(acFrame)}}),{threshold:.2}).observe($('#ac'));
