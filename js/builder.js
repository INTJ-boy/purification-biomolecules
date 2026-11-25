const PB_STARTS=[[100,400,300,80,60],[100,350,350,100,30],[100,300,300,60,12]],PB_COL=['#2dd4bf','#a97f3a','#b18cff','#ff5f8f','#ffd23f'],PB_BUDGET=90;
const PB_OPCOL=['#00bcd4','#ff7043','#8bc34a','#e11d96'];
/* order of PB_OPS: 0 centrifugation, 1 filtration, 2 precipitation, 3 extraction, 4 chromatography, 5 crystallization, 6 ATPS, 7 monolith, 8 continuous chromatography, 9 preparative electrophoresis */
const PB_OPS=[{r:[.95,.05,0,.05],y:.97,c:6},{r:[.98,.30,0,.10],y:.94,c:8},{r:[.20,.60,.10,.30],y:.88,c:4},{r:[0,.30,.10,.50],y:.85,c:7},{r:[0,.995,.95,.85],y:.86,c:30},{r:[.10,.70,.90,.98],y:.82,c:10},
 {r:[.55,.80,.45,.55],y:.90,c:8},{r:[0,.995,.93,.80],y:.90,c:24},{r:[0,.998,.96,.88],y:.92,c:22},{r:[0,.90,.95,.60],y:.45,c:35}];
const PB_MOD=[
 [[1,1],[1,1],[1.1,1.1],[1.1,1.1],[1,1],[1,1],[.5,.8],[.5,.7],[1,1.05],[.4,.5]],
 [[1,1],[1,1],[1,.97],[1,.5],[1.05,1],[.4,.6],[1.15,1],[1,1.05],[1,1],[1,.5]],
 [[1,.9],[1,.8],[.8,.9],[1,.3],[.7,.7],[.1,.2],[.8,.9],[1.1,1.1],[.9,.9],[.5,.4]]];
const PB_STAGE=[0,0,1,1,2,3,1,2,2,3],PB_SOL=[[0,1,4,5],[0,1,6,4],[0,1,6,7]];
let pbProd=0,pbSu=false,pbSeq=[],pbNote=-1;
function pbName(i,t){return i<6?t.m[i][0]:t.pb_ops[i-6]}
function pbCalc(){const S=PB_STARTS[pbProd];let v=[...S],seen={},foul=false,cost=0,mism=false,order=false,maxS=0;
 pbSeq.forEach(i=>{const o=PB_OPS[i],m=PB_MOD[pbProd][i];let f=seen[i]?.5:1,y=Math.min(.99,o.y*m[1]);seen[i]=1;cost+=o.c;
  if(m[0]<.6||m[1]<.75)mism=true;
  if([4,7,8].includes(i)&&v[1]/S[1]>.1){y*=.7;foul=true}
  if(i==5&&v[0]/v.reduce((a,b)=>a+b,0)<.6)f*=.5;
  const sg=PB_STAGE[i];if(sg<maxS){f*=.5;order=true}maxS=Math.max(maxS,sg);
  for(let c=0;c<4;c++)v[c+1]*=1-Math.min(.999,o.r[c]*m[0])*f;v[0]*=y});
 if(pbSu)cost*=.85;
 const tot=v.reduce((a,b)=>a+b,0),pur=v[0]/tot*100,yld=v[0],win=pur>=98&&yld>=50&&cost<=PB_BUDGET;let m=9;
 if(pbNote==8)m=8;else if(!pbSeq.length)m=0;else if(win)m=6;else if(pur>=98&&yld>=50)m=11;else if(pur>=98)m=7;else if(foul)m=2;else if(order)m=12;else if(mism)m=10;
 else if(v[1]/tot>.1)m=1;else if(v[3]/tot>.02)m=3;else if(v[2]/tot>.02)m=4;else if(v[4]/tot>.02)m=5;
 return{v,tot,pur,yld,cost,m,win,S}}
function pbRecord(c){if(!c.win)return;try{const k='pbrec'+pbProd,old=+localStorage.getItem(k);if(!old||c.cost<old)localStorage.setItem(k,Math.round(c.cost))}catch(e){}}
function pbRender(){const t=T[L],c=pbCalc(),box=$('#pb');if(!box)return;pbRecord(c);
 const sum=c.S.reduce((a,b)=>a+b,0),bar=(v,lab)=>`<div class="pbbar" role="img" aria-label="${lab}">${v.map((x,i)=>`<i style="width:${(x/sum*100).toFixed(1)}%;background:${PB_COL[i]}"></i>`).join('')}</div>`;
 let rec='';try{rec=localStorage.getItem('pbrec'+pbProd)||''}catch(e){}
 const stars=c.win?(c.cost<=50?3:c.cost<=70?2:1):0,opc=i=>i<6?COL[i]:PB_OPCOL[i-6];
 box.innerHTML=`<p class="out"><b>${t.pb_prod}</b></p><div class="pbsc">${t.pb_sc.map((s,i)=>`<button data-p="${i}" class="${i==pbProd?'on':''}"><b>${s[0]}</b><small>${s[1]}</small></button>`).join('')}</div>
 <p class="out"><b>${t.pb_cls}</b></p><div class="pbpal">${[0,1,2,3,4,5].map(i=>`<button data-i="${i}" style="--c:${opc(i)}">+ ${pbName(i,t)}<small>${PB_OPS[i].c}</small></button>`).join('')}</div>
 <p class="out"><b>${t.pb_adv}</b></p><div class="pbpal">${[6,7,8,9].map(i=>`<button data-i="${i}" style="--c:${opc(i)}">+ ${pbName(i,t)}<small>${PB_OPS[i].c}</small></button>`).join('')}</div>
 <label class="pbsu"><input type="checkbox" id="pbsu" ${pbSu?'checked':''}> ${t.pb_su}</label>
 <div class="pbseq">${pbSeq.length?pbSeq.map((i,k)=>`<span style="--c:${opc(i)}">${k+1}. ${pbName(i,t)} <button data-r="${k}" aria-label="remove">&times;</button></span>`).join('<em>&#9654;</em>'):''}</div>
 <p class="out"><b>${t.pb_start}</b></p>${bar(c.S,t.pb_start)}<p class="out"><b>${t.pb_end}</b></p>${bar(c.v,t.pb_end)}
 <div class="pbleg">${t.pb_comp.map((n,i)=>`<span><i style="background:${PB_COL[i]}"></i>${n}</span>`).join('')}</div>
 <div class="pbres"><div><small>${t.purity}</small><b>${fmt(c.pur,1)} %</b></div><div><small>${t.yield}</small><b>${fmt(c.yld,0)} %</b></div><div class="${c.cost>PB_BUDGET?'bad':''}"><small>${t.pb_cost} / ${t.pb_budget} ${PB_BUDGET}</small><b>${fmt(c.cost,0)}</b></div></div>
 <p class="pbmsg${c.win?' win':''}" aria-live="polite">${c.win?'&#9733;'.repeat(stars)+'&#9734;'.repeat(3-stars)+' ':''}${t.pb_m[c.m]}</p>${rec?`<p class="out">${t.pb_rec} : ${rec}</p>`:''}
 <div class="pbbtn"><button class="mini" id="pbr">${t.pb_reset}</button><button class="mini" id="pbs">${t.pb_solve}</button><button class="mini" id="pbc">${t.pb_copy}</button></div>`;
 box.querySelectorAll('.pbsc button').forEach(b=>b.onclick=()=>{pbProd=+b.dataset.p;pbSeq=[];pbNote=-1;pbRender()});
 box.querySelectorAll('.pbpal button').forEach(b=>b.onclick=()=>{if(pbSeq.length>=5)pbNote=8;else{pbSeq.push(+b.dataset.i);pbNote=-1}pbRender()});
 box.querySelectorAll('.pbseq button').forEach(b=>b.onclick=()=>{pbSeq.splice(+b.dataset.r,1);pbNote=-1;pbRender()});
 $('#pbsu').onchange=e=>{pbSu=e.target.checked;pbRender()};
 $('#pbr').onclick=()=>{pbSeq=[];pbNote=-1;pbRender()};$('#pbs').onclick=()=>{pbSeq=[...PB_SOL[pbProd]];pbNote=-1;pbRender()};
 $('#pbc').onclick=function(){const txt=`${t.pb_sc[pbProd][0]} : ${pbSeq.map(i=>pbName(i,t)).join(' > ')} | ${t.purity} ${fmt(c.pur,1)} % | ${t.yield} ${fmt(c.yld,0)} % | ${t.pb_cost} ${fmt(c.cost,0)}`;
  if(navigator.clipboard)navigator.clipboard.writeText(txt).then(()=>flash(this,t.pb_copied)).catch(()=>{})}}
