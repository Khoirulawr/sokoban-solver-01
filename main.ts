import{readdirSync as R,readFileSync as f,writeFileSync as w,mkdirSync as m}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output",C="udlr";
const J=a=>[...a].sort((x,y)=>x-y).join(",");
function s(t){const r=t.trimEnd().split("\n"),H=r.length,W=Math.max(...r.map(x=>x.length)),A=new Array(W*H).fill(0),B=[],G=[];let P=-1;
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const c=r[y][x]||"#",i=y*W+x;if(c=="#")A[i]=1;else{if("$*".includes(c))B.push(i);if(".*+".includes(c))G.push(i);if("@+".includes(c))P=i;}}
const D=[-W,W,-1,1],L=new Set(G),Q=[...G];
for(let h=0;h<Q.length;h++){const c=Q[h];for(const d of D){const x=c-d;if(A[x]||A[x-d]||L.has(x))continue;L.add(x);Q.push(x);}}
const b=(s,k)=>{const p=new Array(W*H).fill(-2);p[s]=-1;const q=[s];for(let h=0;h<q.length;h++){const c=q[h];for(const e of D){const n=c+e;if(p[n]!=-2||k(n))continue;p[n]=c;q.push(n);}}return p;};
const h=(P/W)|0,S=new Set(),M=[];
for(let i=0;i<W*H;i++){if(A[i]||((i/W)|0)==h||S.has(i))continue;const a=b(i,x=>A[x]||((x/W)|0)==h),e=[];
for(let j=0;j<W*H;j++)if(a[j]>-2){e.push(j);S.add(j);}const v=B.filter(z=>e.includes(z)),g=G.filter(z=>e.includes(z));if(v.length&&v.length==g.length)M.push({c:new Set(e),b:v,g});}
let o="",u=P;const E=[...B];
for(const Rm of M){const k=J(Rm.g),q=[[Rm.b,u,[]]],V=new Set([J(Rm.b)+"|"+u]);let l=null;
for(let n=0;n<q.length&&!l;n++){const[bs,pl,mv]=q[n];if(J(bs)==k){l=mv;break;}const a=b(pl,x=>A[x]||bs.includes(x));
for(const z of bs)for(let di=0;di<4;di++){const e=D[di],j=z-e,y=z+e;if(a[j]==-2||A[y]||!L.has(y)||bs.includes(y)||!Rm.c.has(y))continue;const N=bs.map(x=>x==z?y:x),K=J(N)+"|"+z;if(V.has(K))continue;V.add(K);q.push([N,z,[...mv,[z,di]]]);}}
if(!l)return"";for(const[z,di]of l){const e=D[di],j=z-e,a=b(u,x=>A[x]||E.includes(x));let c=j,g2=0,v="";while(c!=u&&c>=0&&g2++<1e4){const z2=a[c];v=C[D.indexOf(c-z2)]+v;c=z2;}o+=v;o+=C[di].toUpperCase();u=z;E[E.indexOf(z)]=z+e;}}
return o;}
for(const id of R(I)){try{const t=f(I+"/"+id+"/level.txt","utf8");m(O+"/"+id,{recursive:true});w(O+"/"+id+"/solution.txt",s(t));}catch(e){}}
