                                                                        
                                                                      
                                                                                                                                               
                                                                                                              
                                                                                                       
                                                                           
const JR_X=[30,90,140,190,240,290],JR_P=['10','35','70','95','99','99.5'],JR_Y=['100','95','85','75','70','68'],JR_OUT=[10,12,8,4,2];
let jrRaf=0,jrP=0,jrParts=[];
function journeyBuild(){const t=T[L],box=$('#jr');if(!box)return;
 jrParts=[];let k=0;JR_OUT.forEach((n,s)=>{for(let q=0;q<n;q++)jrParts.push({t:'i',st:s+1,c:['#ff9f43','#ff5f8f','#b18cff','#ffd23f'][k++%4]})});
 for(let q=0;q<2;q++)jrParts.push({t:'i',st:0,c:'#ff9f43'});for(let q=0;q<12;q++)jrParts.push({t:'p',st:q==3?2:q==7?3:0,c:'#2dd4bf'});
 jrParts.forEach((p,j)=>{p.x0=10+rr(j)*34;p.y0=46+rr(j+7)*28;p.ph=rr(j+3)*6});
 box.innerHTML=`<svg viewBox="0 0 320 160" role="img" aria-label="${t.jr_t}">${SGD}${JR_X.map((x,i)=>jrIcon(i,x)).join('')}<rect x="8" y="38" width="304" height="44" rx="22" ${GLS}/>${JR_X.map((x,i)=>`<line x1="${x}" x2="${x}" y1="34" y2="86" stroke="#ffffff55" stroke-dasharray="3 4"/><text x="${x}" y="142" text-anchor="middle" fill="#cfe3ee" font-size="7.5" font-family="sans-serif">${t.jr_st[i]}</text>`).join('')}${jrParts.map((p,j)=>`<circle id="jp${j}" r="${p.t=='p'?4.4:3.2}" fill="${p.c}"/>`).join('')}</svg>
 <p class="out" id="jro" aria-live="polite"></p><button class="mini" id="jrb">&#9654; ${t.jr_play}</button>`;
 $('#jrb').onclick=jrPlay;jrDraw(jrP)}
function jrDraw(p){const t=T[L],front=40+p*260;let st=0;JR_X.forEach((x,i)=>{if(front>=x)st=i});
 jrParts.forEach((q,j)=>{const x=q.x0+p*262;let y=q.y0+Math.sin(p*20+q.ph)*3,op=1,cx=x;
  if(q.st>0){const xs=JR_X[q.st];if(x>xs){const f=Math.min(1,(x-xs)/30);y+=f*f*62;op=1-f;cx=xs+(x-xs)*.4}}
  const e=document.getElementById('jp'+j);if(e){e.setAttribute('cx',Math.min(cx,302).toFixed(1));e.setAttribute('cy',y.toFixed(1));e.setAttribute('opacity',op.toFixed(2))}});
 const o=$('#jro');if(o)o.innerHTML=`<b>${t.jr_st[st]}</b> : ${t.purity} ${L=='fr'?JR_P[st].replace('.',','):JR_P[st]} % | ${t.yield} ${JR_Y[st]} %`}
function jrPlay(){cancelAnimationFrame(jrRaf);const s0=performance.now(),D=12000,f=()=>{jrP=Math.min(1,(performance.now()-s0)/D);jrDraw(jrP);if(jrP<1)jrRaf=requestAnimationFrame(f)};f()}
let jrOnce=false;new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!jrOnce){jrOnce=true;jrPlay()}}),{threshold:.5}).observe($('#jr'));

                                                                                              
function jrIcon(i,x){const m='stroke="#e8f2f8" stroke-width="1.6"';
 return [`<rect x="${x-9}" y="6" width="18" height="24" rx="4" fill="url(#sgPl)" ${m}/><line x1="${x}" x2="${x}" y1="8" y2="24" stroke="#cfe3ee" stroke-width="1.6"/><rect x="${x-6}" y="22" width="12" height="2.6" fill="#cfe3ee"><animateTransform attributeName="transform" type="scale" additive="sum" values="1 1;.2 1;1 1" dur=".7s" repeatCount="indefinite"/></rect>`,
 `<g transform="translate(${x} 18)"><circle r="12" fill="url(#sgPl)" ${m}/><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur=".5s" repeatCount="indefinite"/><line x1="-9" x2="9" y1="0" y2="0" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/><line x1="0" x2="0" y1="-9" y2="9" stroke="#2dd4bf" stroke-width="3" stroke-linecap="round"/></g></g>`,
 `<rect x="${x-6}" y="4" width="12" height="28" rx="3" ${GLS}/><rect x="${x-5}" y="16" width="10" height="14" fill="url(#sgSand)"/><rect x="${x-5}" width="10" height="4" fill="url(#sgB1)"><animate attributeName="y" values="14;26" dur="2s" repeatCount="indefinite"/></rect>`,
 `<rect x="${x-6}" y="4" width="12" height="28" rx="3" ${GLS}/><rect x="${x-5}" y="14" width="10" height="16" fill="url(#sgSand)"/><rect x="${x-5}" width="10" height="4" fill="url(#sgB0)"><animate attributeName="y" values="12;26" dur="1.6s" repeatCount="indefinite"/></rect>`,
 `<rect x="${x-10}" y="8" width="20" height="18" rx="3" ${GLS}/><line x1="${x-10}" x2="${x+10}" y1="17" y2="17" stroke="#ffd23f" stroke-width="2" stroke-dasharray="3 2"/>`,
 `<rect x="${x-11}" y="12" width="22" height="11" rx="5.5" fill="#fff"/><line x1="${x}" x2="${x}" y1="12" y2="23" stroke="#c9d2da"/><rect x="${x-11}" y="12" width="11" height="11" rx="5.5" fill="#e8f2f8"/>`][i]}
