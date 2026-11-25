/* =====================================================================
   SCENES.JS : the animated drawings (SVG) of the 6 techniques shown in the methods edit
   scene(i): i = 0 centrifugation, 1 filtration, 2 precipitation, 3 extraction, 4 chromatography, 5 crystallization, 6 electrophoresis
   Every scene is a small lab setup drawn with gradients, glass reflections, shadows and looping animations (SMIL).
   Shared look: SGD (gradients), GLS (glass style), sh() (soft shadow), hl() (glass reflection).
   rotor(): the realistic centrifuge rotor used by scene 0 and by the laboratory.
   ===================================================================== */
const SGD=`<defs>
<linearGradient id="sgGl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".18" stop-color="#fff" stop-opacity=".07"/><stop offset=".62" stop-color="#fff" stop-opacity=".03"/><stop offset=".9" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/></linearGradient>
<linearGradient id="sgMt" x1="0" x2="1"><stop offset="0" stop-color="#5d6a76"/><stop offset=".35" stop-color="#e6ecf1"/><stop offset=".7" stop-color="#9aa6b1"/><stop offset="1" stop-color="#4c5863"/></linearGradient>
<linearGradient id="sgPl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46525e"/><stop offset="1" stop-color="#1d252d"/></linearGradient>
<radialGradient id="sgSh"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="sgWa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bff3ff" stop-opacity=".55"/><stop offset="1" stop-color="#3aa6c9" stop-opacity=".78"/></linearGradient>
<linearGradient id="sgOr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd08a"/><stop offset="1" stop-color="#ff9f43"/></linearGradient>
<linearGradient id="sgSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0d9a3"/><stop offset="1" stop-color="#c49a4c"/></linearGradient>
<linearGradient id="sgB0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff3b6b" stop-opacity="0"/><stop offset=".5" stop-color="#ff3b6b" stop-opacity=".95"/><stop offset="1" stop-color="#ff3b6b" stop-opacity="0"/></linearGradient>
<linearGradient id="sgB1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2dd4bf" stop-opacity="0"/><stop offset=".5" stop-color="#2dd4bf" stop-opacity=".95"/><stop offset="1" stop-color="#2dd4bf" stop-opacity="0"/></linearGradient>
<linearGradient id="sgB2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd23f" stop-opacity="0"/><stop offset=".5" stop-color="#ffd23f" stop-opacity=".95"/><stop offset="1" stop-color="#ffd23f" stop-opacity="0"/></linearGradient>
</defs>`;
const GLS='fill="url(#sgGl)" stroke="#e8f2f8" stroke-opacity=".9" stroke-width="2.4"';
const sh=(cx,cy,rx)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${(rx*.13).toFixed(1)}" fill="url(#sgSh)"/>`;
const hl=d=>`<path d="${d}" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round" fill="none"/>`;
const rr=j=>(j*47%97)/97;
const prism=(c,k)=>`<g transform="translate(${c[0]} ${c[1]})"><g><animateTransform attributeName="transform" type="scale" values=".1;1.15;1.15" keyTimes="0;.5;1" dur="6s" begin="${c[2]}s" repeatCount="indefinite"/><polygon points="0,-14 10,-8 0,-2 -10,-8" fill="#fff"/><polygon points="-10,-8 0,-2 0,12 -10,6" fill="#dbeafe"/><polygon points="10,-8 0,-2 0,12 10,6" fill="#93c5fd"/></g></g>`;

/* 0 CENTRIFUGE: top view of the rotor spinning, with its control panel counting up */
function scene0(){
 const nums=['0','900','2400','4000'].map((v,k)=>`<text x="100" y="228" text-anchor="middle" fill="#7dffb2" font-size="11" font-family="monospace"><animate attributeName="opacity" calcMode="discrete" values="${[0,1,2,3].map(q=>q==k?1:0).join(';')}" dur="8s" repeatCount="indefinite"/>${v} rpm</text>`).join('');
 return SGD+rotor('e',100,124,62,.2)+hl('M48 96 A56 56 0 0 1 96 66')+`<rect x="48" y="208" width="104" height="34" rx="6" fill="url(#sgPl)" stroke="url(#sgMt)" stroke-width="2"/>${nums}<text x="100" y="239" text-anchor="middle" fill="#7dffb2" font-size="8" font-family="monospace">1431 x g | 10:00</text><circle cx="60" cy="216" r="2.4" fill="#35ff7a"><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></circle>`}

/* 1 FILTRATION: Buchner funnel on a side-arm flask under vacuum, cake building on the filter paper */
function scene1(){
 const fl='M64 238 L136 238 L116 172 L116 154 L84 154 L84 172 Z';let s=SGD+sh(100,241,54);
 s+=`<clipPath id="sgfl"><path d="${fl}"/></clipPath><g clip-path="url(#sgfl)"><rect x="60" width="80" height="80" fill="url(#sgWa)"><animate attributeName="y" values="236;206;206" dur="7s" repeatCount="indefinite"/></rect></g><path d="${fl}" ${GLS}/>`;
 s+=`<path d="M84 154 L116 154 L112 140 L88 140 Z" fill="#2b3036"/><rect x="116" y="158" width="28" height="6" rx="3" ${GLS}/><path d="M144 161 C162 161 164 140 164 118" stroke="#9aa6b1" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M164 118 L164 92" stroke="#cfd8df" stroke-width="3" stroke-dasharray="3 6" fill="none"><animate attributeName="stroke-dashoffset" from="0" to="-18" dur=".6s" repeatCount="indefinite"/></path>`;
 s+=`<rect x="94" y="132" width="12" height="40" ${GLS}/><path d="M56 74 L144 74 L144 120 L108 134 L92 134 L56 120 Z" ${GLS}/>`;
 s+=`<rect x="58" y="92" width="84" height="28" fill="#b98b3e" opacity=".85"><animate attributeName="y" values="92;108;108" dur="7s" repeatCount="indefinite"/><animate attributeName="height" values="28;12;12" dur="7s" repeatCount="indefinite"/></rect>`;
 s+=`<rect x="58" y="118" width="84" height="3" fill="#f4f0e6"/><rect x="58" y="116" width="84" height="2" fill="#c9a45c"><animate attributeName="height" values="2;10;10" dur="7s" repeatCount="indefinite"/><animate attributeName="y" values="116;108;108" dur="7s" repeatCount="indefinite"/></rect>`;
 for(let j=0;j<3;j++)s+=`<circle cx="100" r="3" fill="#bff3ff"><animate attributeName="cy" from="170" to="214" dur="1.1s" begin="-${j*.37}s" repeatCount="indefinite"/></circle>`;
 return s+hl('M62 80 L62 112')+hl('M70 236 L84 190')}

/* 2 PRECIPITATION: beaker on a magnetic stirrer, reagent added by a dropper, flakes forming then settling */
function scene2(){
 let s=SGD+sh(100,246,70);
 s+=`<rect x="42" y="228" width="116" height="16" rx="5" fill="url(#sgPl)" stroke="#6b7783" stroke-width="1.5"/><circle cx="142" cy="236" r="4" fill="url(#sgMt)"/><circle cx="58" cy="236" r="2.4" fill="#ff3b3b"><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/></circle>`;
 s+=`<clipPath id="sgb"><path d="M62 104 L62 224 Q62 228 68 228 L132 228 Q138 228 138 224 L138 104 Z"/></clipPath><g clip-path="url(#sgb)"><rect x="60" y="124" width="80" height="106" fill="url(#sgWa)"/><rect x="60" y="124" width="80" height="106" fill="#fff"><animate attributeName="opacity" values="0;.32;.32;0" dur="8s" repeatCount="indefinite"/></rect>`;
 for(let k=0;k<3;k++)s+=`<ellipse cx="100" cy="${150+k*22}" rx="30" ry="5" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"><animate attributeName="rx" values="30;16;30" dur="${(.8+k*.2).toFixed(1)}s" repeatCount="indefinite"/></ellipse>`;
 for(let j=0;j<18;j++)s+=`<g transform="translate(${66+rr(j)*68} 0)"><polygon points="0,-4 5,-1 3,4 -3,3" fill="#efe4ff"/><animateTransform attributeName="transform" type="translate" additive="sum" values="0 128;4 214" dur="${(3+rr(j+2)*2).toFixed(1)}s" begin="-${(rr(j+1)*4).toFixed(1)}s" repeatCount="indefinite"/></g>`;
 s+=`<rect x="60" width="80" fill="#efe4ff"><animate attributeName="y" values="224;210;210" dur="8s" repeatCount="indefinite"/><animate attributeName="height" values="6;20;20" dur="8s" repeatCount="indefinite"/></rect><g transform="translate(100 219)"><rect x="-15" y="-3" width="30" height="6" rx="3" fill="#fff"><animateTransform attributeName="transform" type="scale" values="1 1;.12 1;1 1" dur=".45s" repeatCount="indefinite"/></rect></g></g>`;
 s+=`<path d="M62 104 L62 224 Q62 228 68 228 L132 228 Q138 228 138 224 L138 104" ${GLS}/><path d="M58 104 L142 104" stroke="#e8f2f8" stroke-width="2.4" stroke-linecap="round"/>`;
 for(let k=0;k<4;k++)s+=`<line x1="62" x2="${k%2?72:80}" y1="${138+k*22}" y2="${138+k*22}" stroke="#e8f2f8" stroke-width="1.6"/>`;
 s+=`<rect x="96" y="52" width="8" height="44" rx="3" ${GLS}/><path d="M92 55 C92 36 108 36 108 55 Z" fill="#c0392b"/><path d="M98 96 L102 96 L100 106 Z" fill="#e8f2f8"/><circle cx="100" r="3.2" fill="#efe4ff"><animate attributeName="cy" values="107;128;128" keyTimes="0;.15;1" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.15;1" dur="1.6s" repeatCount="indefinite"/></circle>`;
 return s+hl('M68 110 L68 214')}

/* 3 EXTRACTION: separatory funnel on a ring stand. It is shaken (emulsion), then the two phases separate */
function scene3(){
 const b='M94 84 C40 108 46 178 94 214 L94 226 L106 226 L106 214 C154 178 160 108 106 84 Z',ph=(a,bb)=>`<animate attributeName="opacity" values="${a}" keyTimes="0;.2;.55;1" dur="9s" repeatCount="indefinite"/>`;
 let s=SGD+sh(100,243,62);
 s+=`<rect x="44" y="238" width="112" height="6" rx="2" fill="url(#sgMt)"/><rect x="146" y="64" width="6" height="176" rx="2" fill="url(#sgMt)"/><rect x="106" y="106" width="42" height="5" rx="2" fill="url(#sgMt)"/><ellipse cx="100" cy="108" rx="14" ry="4" fill="none" stroke="url(#sgMt)" stroke-width="3"/>`;
 s+=`<g><animateTransform attributeName="transform" type="rotate" values="0 100 150;-7 100 150;7 100 150;-7 100 150;7 100 150;0 100 150;0 100 150" keyTimes="0;.04;.08;.12;.16;.2;1" dur="9s" repeatCount="indefinite"/>`;
 s+=`<clipPath id="sgsf"><path d="${b}"/></clipPath><g clip-path="url(#sgsf)"><rect x="30" y="76" width="140" height="170" fill="#d9b98a">${ph('.75;.75;0;0')}</rect><rect x="30" y="76" width="140" height="78" fill="url(#sgOr)">${ph('0;0;.9;.9')}</rect><rect x="30" y="154" width="140" height="92" fill="url(#sgWa)">${ph('0;0;.9;.9')}</rect><line x1="30" x2="170" y1="154" y2="154" stroke="#fff" stroke-width="2">${ph('0;0;.9;.9')}</line>`;
 for(let j=0;j<16;j++){const y0=100+rr(j)*110;s+=`<circle cx="${68+rr(j+3)*64}" cy="${y0.toFixed(0)}" r="${(2+rr(j+5)*3).toFixed(1)}" fill="#fff" opacity=".6"><animate attributeName="cy" values="${y0.toFixed(0)};${(y0+(j%2?-14:14)).toFixed(0)};${y0.toFixed(0)}" dur="${(1+rr(j)).toFixed(1)}s" repeatCount="indefinite"/>${ph('.7;.7;0;0')}</circle>`}
 s+=`</g><path d="${b}" ${GLS}/><rect x="92" y="68" width="16" height="18" fill="#e8f2f8" fill-opacity=".8"/><rect x="95" y="56" width="10" height="14" rx="3" fill="#c0392b"/><rect x="88" y="224" width="24" height="7" rx="2" fill="#e8f2f8"/><rect x="112" y="226" width="22" height="4" rx="2" fill="#c0392b"/>${hl('M62 118 C54 142 58 168 78 194')}</g>`;
 return s}

/* 4 CHROMATOGRAPHY: column on a stand with a pump, three colored bands separating, fraction collector rack moving under the outlet */
function scene4(){
 let s=SGD+sh(100,243,72);
 s+=`<rect x="26" y="238" width="148" height="6" rx="2" fill="url(#sgMt)"/><rect x="32" y="62" width="6" height="178" rx="2" fill="url(#sgMt)"/><rect x="36" y="118" width="48" height="5" rx="2" fill="url(#sgMt)"/><rect x="78" y="110" width="12" height="18" rx="3" fill="#39434d"/>`;
 s+=`<rect x="42" y="66" width="22" height="26" rx="4" fill="url(#sgPl)" stroke="#6b7783"/><g transform="translate(53 79)"><circle r="6" fill="#9aa6b1"/><rect x="-1" y="-6" width="2" height="12" fill="#39434d"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur=".9s" repeatCount="indefinite"/></rect></g>`;
 s+=`<path d="M53 66 L53 50 C53 40 104 40 104 52" stroke="#b9c3cc" stroke-width="3" fill="none"/><rect x="90" y="52" width="28" height="8" rx="3" fill="#39434d"/>`;
 s+=`<clipPath id="sgcl"><rect x="86" y="62" width="36" height="110" rx="4"/></clipPath><rect x="84" y="58" width="40" height="118" rx="6" ${GLS}/><g clip-path="url(#sgcl)"><rect x="84" y="62" width="40" height="42" fill="url(#sgWa)"/><rect x="84" y="104" width="40" height="70" fill="url(#sgSand)"/>`;
 for(let j=0;j<46;j++)s+=`<circle cx="${87+rr(j)*34}" cy="${107+rr(j+5)*64}" r="${(1.2+rr(j+2)*1.2).toFixed(1)}" fill="#a97f3a" opacity=".7"/>`;
 [[5,0],[6.5,1],[8,2]].forEach(b=>s+=`<rect x="84" width="40" height="16" fill="url(#sgB${b[1]})"><animate attributeName="y" values="102;156" dur="${b[0]}s" repeatCount="indefinite"/></rect>`);
 s+=`</g>${hl('M89 70 L89 168')}<rect x="101" y="176" width="6" height="14" fill="#e8f2f8"/><circle cx="104" r="2.6" fill="#7fe9ff"><animate attributeName="cy" from="192" to="224" dur=".8s" repeatCount="indefinite"/></circle>`;
 s+=`<g><animateTransform attributeName="transform" type="translate" calcMode="discrete" values="0 0;-26 0;-52 0;-78 0;-104 0" dur="7s" repeatCount="indefinite"/>`;
 ['#7fe9ff','#ff5f8f','#2dd4bf','#ffd23f','#7fe9ff'].forEach((c,j)=>s+=`<rect x="${97+26*j}" y="212" width="14" height="28" rx="6" ${GLS}/><rect x="${98.5+26*j}" width="11" rx="5" fill="${c}" opacity=".9"><animate attributeName="height" values="0;0;16;16" keyTimes="0;${j/5};${(j+1)/5};1" dur="7s" repeatCount="indefinite"/><animate attributeName="y" values="238;238;222;222" keyTimes="0;${j/5};${(j+1)/5};1" dur="7s" repeatCount="indefinite"/></rect>`);
 return s+'</g>'}

/* 5 CRYSTALLIZATION: flask cooling in an ice bath, thermometer falling, crystals growing and sparkling */
function scene5(){
 const f='M72 232 L128 232 L113 160 L113 110 L87 110 L87 160 Z';let s=SGD+sh(100,245,68);
 s+=`<clipPath id="sgcf"><path d="${f}"/></clipPath><g clip-path="url(#sgcf)"><rect x="60" y="150" width="80" height="90" fill="url(#sgOr)" opacity=".45"/></g><path d="${f}" ${GLS}/>`;
 [[84,224,0],[100,228,.9],[116,222,1.8],[92,212,2.7],[108,210,3.6],[100,218,4.4]].forEach(c=>s+=prism(c));
 [[88,212,.2],[112,216,1.1],[100,206,2],[96,226,2.9]].forEach(p=>s+=`<path transform="translate(${p[0]} ${p[1]})" d="M0-4 L1-1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1-1Z" fill="#fff" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.6s" begin="${p[2]}s" repeatCount="indefinite"/></path>`);
 s+=`<rect x="98" y="92" width="5" height="104" rx="2.5" fill="#ffffff22" stroke="#e8f2f8" stroke-width="1.5"/><rect x="99.5" width="2" rx="1" fill="#ff3b3b"><animate attributeName="y" values="112;156" dur="8s" repeatCount="indefinite"/><animate attributeName="height" values="84;40" dur="8s" repeatCount="indefinite"/></rect>`;
 s+=`<path d="M50 158 L50 232 Q50 240 58 240 L142 240 Q150 240 150 232 L150 158 Z" fill="url(#sgWa)" opacity=".55"/>`;
 for(let j=0;j<6;j++)s+=`<rect x="${58+j*14}" y="${166+(j%2)*10}" width="11" height="11" rx="2.5" fill="#fff" opacity=".5" stroke="#e8f2f8" stroke-opacity=".7"><animateTransform attributeName="transform" type="translate" values="0 0;0 ${j%2?-2.5:2.5};0 0" dur="${(2+j*.3).toFixed(1)}s" repeatCount="indefinite"/></rect>`;
 s+=`<path d="M50 140 L50 232 Q50 240 58 240 L142 240 Q150 240 150 232 L150 140" ${GLS}/><text x="154" y="118" fill="#fff" font-size="9" font-family="monospace" text-anchor="start"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.3;.5;1" dur="8s" repeatCount="indefinite"/>25 C</text><text x="154" y="118" fill="#7fe9ff" font-size="9" font-family="monospace"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.3;.5;1" dur="8s" repeatCount="indefinite"/>4 C</text>`;
 return s+hl('M76 226 L90 164')}

function scene(i){return [scene0,scene1,scene2,scene3,scene4,scene5,scene6][i]()}


function rotor(id,cx,cy,R,dur){let w='';for(let a=0;a<360;a+=45)w+=`<g transform="rotate(${a})"><rect x="-8" y="${-R+5}" width="16" height="${R*.6}" rx="8" fill="#1a2128"/><rect x="-5.5" y="${-R+8}" width="11" height="${R*.5}" rx="5.5" fill="#f4f8fb" fill-opacity=".92"/><circle cy="${-R+13}" r="5.5" fill="${a/45%2?'#2f7fe0':'#e8501b'}"/></g>`;
 const rot=`<g transform="translate(${cx} ${cy})"><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="${dur}s" repeatCount="indefinite"/><circle r="${R}" fill="url(#rg${id})"/>${w}<circle r="9" fill="#d8dee4"/><circle r="3.2" fill="#333"/></g></g>`;
 return `<defs><radialGradient id="mg${id}"><stop offset="0" stop-color="#2b3640"/><stop offset="1" stop-color="#11171c"/></radialGradient><radialGradient id="rg${id}"><stop offset="0" stop-color="#d4dbe2"/><stop offset=".7" stop-color="#8d99a4"/><stop offset="1" stop-color="#5d6a76"/></radialGradient></defs><circle cx="${cx}" cy="${cy}" r="${R+12}" fill="url(#mg${id})" stroke="#b9c3cc" stroke-width="3"/>${rot}<g opacity=".25" transform="rotate(7 ${cx} ${cy})">${rot}</g>`}

/* 6 ELECTROPHORESIS: vertical gel tank with buffer, a gel whose lanes run down, electrode bubbles and a power supply */
function scene6(){
 let s=SGD+sh(100,246,76);
 s+=`<rect x="108" y="56" width="74" height="30" rx="5" fill="url(#sgPl)" stroke="url(#sgMt)" stroke-width="2"/><rect x="114" y="62" width="36" height="14" rx="2" fill="#07210f"/><text x="132" y="73" text-anchor="middle" fill="#7dffb2" font-size="9" font-family="monospace">150 V</text><circle cx="124" cy="86" r="3.4" fill="#ff3b3b"/><circle cx="164" cy="86" r="3.4" fill="#222" stroke="#9aa6b1"/><circle cx="172" cy="68" r="3" fill="#35ff7a"><animate attributeName="opacity" values="1;.3;1" dur="1.2s" repeatCount="indefinite"/></circle>`;
 s+=`<path d="M40 100 L40 90 L164 90 L164 86" stroke="#222" stroke-width="2.6" fill="none"/><path d="M150 226 L190 226 L190 94 L124 94 L124 86" stroke="#c0392b" stroke-width="2.6" fill="none"/>`;
 s+=`<rect x="22" y="232" width="156" height="7" rx="3" fill="url(#sgMt)"/><rect x="24" y="96" width="152" height="136" rx="8" ${GLS}/><clipPath id="sge"><rect x="26" y="98" width="148" height="132" rx="6"/></clipPath><g clip-path="url(#sge)"><rect x="26" y="98" width="148" height="132" fill="url(#sgWa)" opacity=".7"/>`;
 for(let k=0;k<14;k++){const x=k%2?[38,46,160,168][k%4]:[40,48,158,166][k%4];s+=`<circle cx="${x}" r="${(1.4+rr(k)*1.4).toFixed(1)}" fill="#fff" opacity=".7"><animate attributeName="cy" from="224" to="102" dur="${(2.2+rr(k+2)*1.6).toFixed(1)}s" begin="-${(rr(k+1)*3).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;.8;0" dur="${(2.2+rr(k+2)*1.6).toFixed(1)}s" begin="-${(rr(k+1)*3).toFixed(1)}s" repeatCount="indefinite"/></circle>`}
 s+=`</g><rect x="40" y="99" width="120" height="3" fill="#222"/><rect x="40" y="224" width="120" height="3" fill="#c0392b"/>`;
 s+=`<rect x="52" y="104" width="96" height="112" rx="3" fill="#e9f0f8" opacity=".95" stroke="#b9c8d8"/>`;
 const lanes=[[[112,.55],[124,.55],[136,.55],[150,.55],[164,.55],[180,.55],[196,.55]],[[116,.4],[130,.8],[142,.5],[158,.6],[170,.4],[186,.5],[198,.4]],[[132,.2],[150,.9],[162,.3]],[[150,.9],[172,.15]],[[150,1]]];
 lanes.forEach((ln,i)=>{const x=58+i*17;s+=`<rect x="${x}" y="105" width="12" height="6" fill="#9fb3c8"/>`;ln.forEach(b=>s+=`<rect x="${x}" width="12" height="3" rx="1" fill="${i==0?'#4a5568':'#1c3f8f'}" opacity="0"><animate attributeName="y" values="108;${b[0]};${b[0]}" keyTimes="0;.8;1" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;${b[1]};${b[1]};0" keyTimes="0;.05;.93;1" dur="9s" repeatCount="indefinite"/></rect>`)});
 s+=`<line x1="54" x2="146" stroke="#2f7fe0" stroke-width="2"><animate attributeName="y1" values="108;206;206" keyTimes="0;.8;1" dur="9s" repeatCount="indefinite"/><animate attributeName="y2" values="108;206;206" keyTimes="0;.8;1" dur="9s" repeatCount="indefinite"/></line>`;
 return s+hl('M32 104 L32 224')}

/* global gradient definitions, placed first in the page so every drawing can use them even when another drawing is hidden */
document.body.insertAdjacentHTML('afterbegin','<svg id="gdefs" width="0" height="0" style="position:absolute;pointer-events:none" aria-hidden="true">'+SGD+'</svg>');
