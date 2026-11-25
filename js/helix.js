/* =====================================================================
   HELIX.JS : the 3D DNA helix in the background, drawn on a plain 2D canvas (no external library, works offline).
   It turns and slides with your scroll and follows the pointer slightly. Stops in light mode or when the tab is hidden.
   Change the colors here: COL_A = first strand, COL_B = second strand.
   ===================================================================== */
(function(){const cv=$('#gl'),x=cv.getContext('2d');if(!x)return;const COL_A='#2dd4bf',COL_B='#ff9f43';let W=0,H=0,dpr=1,mx=0,my=0;
 function size(){dpr=Math.min(devicePixelRatio||1,innerWidth<700?1.5:2);W=innerWidth;H=innerHeight;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);x.setTransform(dpr,0,0,dpr,0,0)}
 size();addEventListener('resize',size);addEventListener('pointermove',e=>{mx=e.clientX/W-.5;my=e.clientY/H-.5},{passive:true});
 const PTS=Array.from({length:70},(_,i)=>({x:Math.random(),y:Math.random(),z:Math.random(),s:Math.random()*1.4+.4})),calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function frame(t){requestAnimationFrame(frame);if(document.hidden||window.LITE)return;
  const p=Math.min(1,scrollY/Math.max(1,document.body.scrollHeight-innerHeight)),big=W>900,R=Math.min(W,H)*(big?.13:.15),F=Math.min(W,H)*1.3,sp=R*.36,N=Math.ceil(H*1.7/sp)+4,L=N*sp,rot=(calm?0:t*.0004)+p*14,off=p*L*.9,cx=big?W*.78:W*.5;
  x.clearRect(0,0,W,H);
  x.fillStyle='#9fe8ff';PTS.forEach(q=>{x.globalAlpha=.15+q.z*.35;x.beginPath();x.arc(q.x*W+mx*24*q.z,((q.y*H-p*H*q.z*1.5)%H+H)%H,q.s,0,6.283);x.fill()});
  const pts=[],yy=i=>((i*sp-off)%L+L)%L-L*.12;
  for(let i=0;i<N;i++){const a=i*.36+rot,y=yy(i);if(y<-sp*2||y>H+sp*2)continue;
   const A=[0,1].map(s=>{const g=a+s*Math.PI,xx=Math.cos(g)*R,zz=Math.sin(g)*R,sc=F/(F+zz+R*2);return{x:cx+xx*sc+mx*28,y:y+my*18,z:zz,sc,col:s?COL_B:COL_A}});
   x.globalAlpha=.3;x.strokeStyle='#6aa9c9';x.lineWidth=2*((A[0].sc+A[1].sc)/2);x.beginPath();x.moveTo(A[0].x,A[0].y);x.lineTo(A[1].x,A[1].y);x.stroke();A.forEach(q=>pts.push(q))}
  pts.sort((a,b)=>b.z-a.z);pts.forEach(q=>{const d=(q.z+R)/(2*R);x.globalAlpha=.4+.6*(1-d);x.fillStyle=q.col;x.shadowColor=q.col;x.shadowBlur=14*q.sc;x.beginPath();x.arc(q.x,q.y,R*.13*q.sc,0,6.283);x.fill()});
  x.shadowBlur=0;x.globalAlpha=1}
 requestAnimationFrame(frame)})();
