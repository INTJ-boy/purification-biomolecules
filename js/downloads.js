const DL_KIND=['word','pdf','ppt','poster'];
const DL_FILES={word:'assets/downloads/Compte_rendu_purification_biomolecules.docx',pdf:'assets/downloads/Resume_1_page.pdf',ppt:'assets/downloads/Resume_PowerPoint.pptx',poster:'assets/downloads/Affiche_poster_A3.pdf'};
const DL_PREV={word:['assets/previews/word1.jpg','assets/previews/word2.jpg'],pdf:['assets/previews/sum1.jpg'],ppt:['assets/previews/ppt1.jpg','assets/previews/ppt2.jpg','assets/previews/ppt3.jpg','assets/previews/ppt4.jpg','assets/previews/ppt5.jpg','assets/previews/ppt6.jpg','assets/previews/ppt7.jpg','assets/previews/ppt8.jpg'],poster:['assets/previews/poster1.jpg']};
const dlPos={word:0,pdf:0,ppt:0,poster:0};
function dlGet(k){const a=document.createElement('a');
 if(typeof DL_DATA!=='undefined'&&DL_DATA[k]){const d=DL_DATA[k],bin=atob(d.b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);a.href=URL.createObjectURL(new Blob([u],{type:d.mime}));a.download=d.name}
 else{a.href=DL_FILES[k];a.download=DL_FILES[k].split('/').pop()}
 document.body.appendChild(a);a.click();setTimeout(()=>{a.remove();if(a.href.startsWith('blob:'))URL.revokeObjectURL(a.href)},5000)}
function dlBuild(){const t=T[L],box=$('#dl');if(!box)return;
 box.innerHTML=t.dl.map((x,i)=>{const k=DL_KIND[i],n=DL_PREV[k].length;return `<div class="card dlc"><h3>${x[0]}</h3><div class="dlv"><img id="dli-${k}" alt="${x[0]}" src="${DL_PREV[k][dlPos[k]]}"></div>${n>1?`<div class="dlnav"><button class="mini" data-k="${k}" data-d="-1" aria-label="Previous">&#9664;</button><span id="dlc-${k}">${dlPos[k]+1} / ${n}</span><button class="mini" data-k="${k}" data-d="1" aria-label="Next">&#9654;</button></div>`:''}<p>${x[1]}</p><p class="out">${x[2]}</p><button class="btn" data-get="${k}">${t.dl_get}</button></div>`}).join('');
 box.querySelectorAll('[data-get]').forEach(b=>b.onclick=()=>dlGet(b.dataset.get));
 box.querySelectorAll('.dlnav button').forEach(b=>b.onclick=()=>{const k=b.dataset.k,n=DL_PREV[k].length;dlPos[k]=(dlPos[k]+ +b.dataset.d+n)%n;$('#dli-'+k).src=DL_PREV[k][dlPos[k]];$('#dlc-'+k).textContent=(dlPos[k]+1)+' / '+n})}
