export function solve(c){
 if(!Number.isFinite(c.v)||c.v<=0)throw Error('מתח המקור חייב להיות חיובי וסופי');
 const all=[...new Set(['A','0',...c.e.flatMap(e=>[e.a,e.b])])],parent=Object.fromEntries(all.map(n=>[n,n]));
 const root=n=>parent[n]===n?n:(parent[n]=root(parent[n]));
 c.e.forEach(e=>{if(e.r<0||Number.isNaN(e.r))throw Error('התנגדות חייבת להיות חיובית, נתק או קצר');if(e.r===0)parent[root(e.a)]=root(e.b)});
 const high=root('A'),low=root('0');if(high===low)throw Error('קצר ישיר על מקור מתח אידיאלי: אין זרם סופי מוגדר');
 const roots=[...new Set(all.map(root))],adj=Object.fromEntries(roots.map(n=>[n,[]]));
 c.e.filter(e=>e.r>0&&Number.isFinite(e.r)).forEach(e=>{let a=root(e.a),b=root(e.b);adj[a].push(b);adj[b].push(a)});
 const anchored=new Set([high,low]),queue=[high,low];for(let j=0;j<queue.length;j++)for(const n of adj[queue[j]])if(!anchored.has(n)){anchored.add(n);queue.push(n)}
 const floating=roots.filter(n=>!anchored.has(n)),unknown=roots.filter(n=>anchored.has(n)&&n!==high&&n!==low),known={[high]:c.v,[low]:0};
 const m=unknown.map(()=>Array(unknown.length+1).fill(0));
 c.e.filter(e=>e.r>0&&Number.isFinite(e.r)).forEach(e=>{let a=root(e.a),b=root(e.b),g=1/e.r;if(a===b)return;for(const [u,w] of [[a,b],[b,a]]){let i=unknown.indexOf(u);if(i<0)continue;m[i][i]+=g;let j=unknown.indexOf(w);if(j>=0)m[i][j]-=g;else if(w in known)m[i][unknown.length]+=g*known[w]}});
 for(let k=0;k<unknown.length;k++){let p=k;for(let i=k+1;i<unknown.length;i++)if(Math.abs(m[i][k])>Math.abs(m[p][k]))p=i;[m[k],m[p]]=[m[p],m[k]];if(Math.abs(m[k][k])<1e-14)throw Error('רשת צפה או בלתי פתירה');let v=m[k][k];for(let j=k;j<=unknown.length;j++)m[k][j]/=v;for(let i=0;i<unknown.length;i++)if(i!==k){let q=m[i][k];for(let j=k;j<=unknown.length;j++)m[i][j]-=q*m[k][j]}}
 unknown.forEach((n,i)=>known[n]=m[i][unknown.length]);floating.forEach(n=>known[n]=NaN);
 const nodes=Object.fromEntries(all.map(n=>[n,known[root(n)]]));
 const rows=c.e.map((e,i)=>{let v=nodes[e.a]-nodes[e.b],current=e.r===0?null:!Number.isFinite(e.r)?0:v/e.r;return {...e,name:'R'+(i+1),v,i:current,p:current===null?0:current*current*(Number.isFinite(e.r)?e.r:0)}});
 let current=0;rows.forEach(e=>{if(e.r===0)return;if(root(e.a)===high&&root(e.b)!==high)current+=e.i;if(root(e.b)===high&&root(e.a)!==high)current-=e.i});
 const residuals=unknown.map(n=>rows.reduce((s,e)=>e.i===null?s:s+(root(e.a)===n?e.i:0)-(root(e.b)===n?e.i:0),0));
 const totalP=rows.reduce((s,e)=>s+e.p,0);return {nodes,rows,current,req:current>1e-14?c.v/current:Infinity,power:c.v*current,totalP,kcl:Math.max(0,...residuals.map(Math.abs)),floating};
}
