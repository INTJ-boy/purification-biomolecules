/* =====================================================================
   QR.JS : small QR code generator (byte mode, error correction level M, versions 1 to 10, up to 213 characters). No library, works offline.
   qrMatrix(text) returns a square array of booleans (true = dark module). qrSvg(text, pixels) returns an SVG string.
   The address encoded on the site comes from SITE_URL in js/config.js.
   ===================================================================== */
const QR_EC=[null,[16,10,[[1,16]]],[28,16,[[1,28]]],[44,26,[[1,44]]],[64,18,[[2,32]]],[86,24,[[2,43]]],[108,16,[[4,27]]],[124,18,[[4,31]]],[154,22,[[2,38],[2,39]]],[182,22,[[3,36],[2,37]]],[216,26,[[4,43],[1,44]]]];
const QR_AL=[null,[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50]];
const QR_EXP=new Array(512),QR_LOG=new Array(256);(function(){let x=1;for(let i=0;i<255;i++){QR_EXP[i]=x;QR_LOG[x]=i;x<<=1;if(x&256)x^=0x11d}for(let i=255;i<512;i++)QR_EXP[i]=QR_EXP[i-255]})();
function qrMul(a,b){return a&&b?QR_EXP[QR_LOG[a]+QR_LOG[b]]:0}
function qrRS(data,n){let g=[1];for(let i=0;i<n;i++){const ng=new Array(g.length+1).fill(0);g.forEach((c,j)=>{ng[j]^=c;ng[j+1]^=qrMul(c,QR_EXP[i])});g=ng}
 const r=new Array(n).fill(0);data.forEach(d=>{const f=d^r[0];r.shift();r.push(0);if(f)g.slice(1).forEach((c,j)=>{r[j]^=qrMul(c,f)})});return r}
function qrBch(v,poly,hi){let d=v<<(hi);const hb=n=>31-Math.clz32(n);while(hb(d)>=hb(poly))d^=poly<<(hb(d)-hb(poly));return d}
function qrMatrix(text){const bytes=Array.from(new TextEncoder().encode(text));let v=1;
 for(;v<=10;v++){const cap=QR_EC[v][0]*8,need=4+(v<10?8:16)+bytes.length*8;if(need<=cap)break}
 if(v>10)throw new Error('QR: text too long');
 const [dcw,ecw,groups]=QR_EC[v],bits=[],push=(val,len)=>{for(let i=len-1;i>=0;i--)bits.push((val>>i)&1)};
 push(4,4);push(bytes.length,v<10?8:16);bytes.forEach(b=>push(b,8));
 for(let i=0;i<4&&bits.length<dcw*8;i++)bits.push(0);while(bits.length%8)bits.push(0);
 const cw=[];for(let i=0;i<bits.length;i+=8){let b=0;for(let j=0;j<8;j++)b=(b<<1)|bits[i+j];cw.push(b)}
 for(let p=0;cw.length<dcw;p++)cw.push(p%2?0x11:0xec);
 const blocks=[];let pos=0;groups.forEach(g=>{for(let i=0;i<g[0];i++){const d=cw.slice(pos,pos+g[1]);pos+=g[1];blocks.push({d,e:qrRS(d,ecw)})}});
 const out=[],maxd=Math.max(...blocks.map(b=>b.d.length));for(let i=0;i<maxd;i++)blocks.forEach(b=>{if(i<b.d.length)out.push(b.d[i])});for(let i=0;i<ecw;i++)blocks.forEach(b=>out.push(b.e[i]));
 const size=17+4*v,M=Array.from({length:size},()=>new Array(size).fill(null)),fn=Array.from({length:size},()=>new Array(size).fill(false));
 const set=(r,c,val,f=true)=>{if(r<0||c<0||r>=size||c>=size)return;M[r][c]=val;if(f)fn[r][c]=true};
 const finder=(r,c)=>{for(let i=-1;i<=7;i++)for(let j=-1;j<=7;j++){const on=i>=0&&i<=6&&j>=0&&j<=6&&(i==0||i==6||j==0||j==6||(i>=2&&i<=4&&j>=2&&j<=4));set(r+i,c+j,on)}};
 finder(0,0);finder(0,size-7);finder(size-7,0);
 for(let i=8;i<size-8;i++){set(6,i,i%2==0);set(i,6,i%2==0)}
 const al=QR_AL[v];al.forEach(r=>al.forEach(c=>{if((r==6&&c==6)||(r==6&&c==al[al.length-1])||(r==al[al.length-1]&&c==6))return;for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++)set(r+i,c+j,Math.max(Math.abs(i),Math.abs(j))!=1)}));
 set(size-8,8,true);
 for(let i=0;i<9;i++){fn[8][i]=true;fn[i][8]=true}for(let i=0;i<8;i++){fn[8][size-1-i]=true;fn[size-1-i][8]=true}
 if(v>=7){const vi=(v<<12)|qrBch(v,0x1f25,12);for(let i=0;i<18;i++){const b=!!((vi>>i)&1),a=Math.floor(i/3),c=size-11+i%3;set(a,c,b);set(c,a,b)}}
 const dbits=[];out.forEach(b=>{for(let i=7;i>=0;i--)dbits.push((b>>i)&1)});
 const place=mask=>{const G=M.map(r=>r.slice());let k=0,up=true;for(let c=size-1;c>0;c-=2){if(c==6)c--;for(let i=0;i<size;i++){const r=up?size-1-i:i;for(let j=0;j<2;j++){const cc=c-j;if(fn[r][cc])continue;let b=k<dbits.length?dbits[k]==1:false;k++;
   const m=[(r+cc)%2==0,r%2==0,cc%3==0,(r+cc)%3==0,(Math.floor(r/2)+Math.floor(cc/3))%2==0,(r*cc)%2+(r*cc)%3==0,((r*cc)%2+(r*cc)%3)%2==0,((r+cc)%2+(r*cc)%3)%2==0][mask];G[r][cc]=m?!b:b}}up=!up}return G};
 const fmt=(G,mask)=>{const f=(((0<<3)|mask)<<10|qrBch((0<<3)|mask,0x537,10))^0x5412;/* level M = 00 */
  const bit=i=>!!((f>>i)&1);for(let i=0;i<6;i++){G[i][8]=bit(i);G[8][size-1-i]=bit(i)}G[7][8]=bit(6);G[8][size-8]=bit(6);G[8][8]=bit(7);G[8][7]=bit(7);G[size-7][8]=bit(8);G[8][size-7]=bit(8);for(let i=9;i<15;i++){G[8][14-i]=bit(i);G[size-15+i][8]=bit(i)}G[size-8][8]=true};
 const pen=G=>{let s=0;for(let t=0;t<2;t++)for(let i=0;i<size;i++){let run=1;for(let j=1;j<size;j++){const a=t?G[j][i]:G[i][j],b=t?G[j-1][i]:G[i][j-1];if(a==b){run++;if(run==5)s+=3;else if(run>5)s++}else run=1}}
  for(let i=0;i<size-1;i++)for(let j=0;j<size-1;j++){const a=G[i][j];if(a==G[i][j+1]&&a==G[i+1][j]&&a==G[i+1][j+1])s+=3}
  const pat=[1,0,1,1,1,0,1,0,0,0,0],pat2=pat.slice().reverse();for(let t=0;t<2;t++)for(let i=0;i<size;i++)for(let j=0;j<=size-11;j++){let a=true,b=true;for(let k=0;k<11;k++){const x=t?G[j+k][i]:G[i][j+k];if((x?1:0)!=pat[k])a=false;if((x?1:0)!=pat2[k])b=false}if(a||b)s+=40}
  let dark=0;G.forEach(r=>r.forEach(x=>{if(x)dark++}));s+=Math.floor(Math.abs(dark*100/(size*size)-50)/5)*10;return s};
 let best=null,bs=1e9;for(let m=0;m<8;m++){const G=place(m);fmt(G,m);const s=pen(G);if(s<bs){bs=s;best=G}}
 return best.map(r=>r.map(x=>!!x))}
function qrSvg(text,px){const m=qrMatrix(text),n=m.length,q=4;let d='';m.forEach((r,y)=>r.forEach((x,i)=>{if(x)d+=`M${i+q} ${y+q}h1v1h-1z`}));
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n+2*q} ${n+2*q}" width="${px}" height="${px}" shape-rendering="crispEdges" role="img" aria-label="QR code"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#000"/></svg>`}
