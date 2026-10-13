import assert from 'node:assert/strict';
import {solve} from './engine.js';
import {circuits,bridge,transfer} from './circuits.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const expected=[300,1000,600,200,6000/11,250,220,200,300,400/3,300,220,220,300,2000];
circuits.forEach((c,i)=>{let s=solve(c);near(s.req,expected[i]);near(s.power,s.totalP);assert.ok(s.kcl<1e-8);s.rows.forEach(r=>near(r.p,r.v*r.i));});
let s=solve(bridge);near(s.req,140);near(s.nodes.B,48/7);near(s.nodes.C,36/7);
let c=structuredClone(circuits[6]);c.e[2].r=600;s=solve(c);near(s.current,.048);near(s.rows[1].i,.036);
c.e[2].r=Infinity;s=solve(c);near(s.req,300);near(s.rows[2].v,8);near(s.rows[2].i,0);
c=structuredClone(circuits[6]);c.e.push({a:'B',b:'0',r:0});s=solve(c);near(s.req,100);near(s.current,.12);near(s.rows[1].p,0);
c=structuredClone(circuits[6]);c.e[0].r=Infinity;s=solve(c);near(s.current,0);near(s.rows[0].v,12);
assert.throws(()=>solve({v:12,e:[{a:'A',b:'0',r:0}]}),/קצר/);
assert.throws(()=>solve({v:12,e:[{a:'A',b:'0',r:-1}]}),/התנגדות/);
s=solve(transfer);near(s.req,200);near(s.current,.045);near(s.nodes.B,4.5);
console.log('PASS: 15 task networks, bridge, transfer, open/short faults, invalid input, KCL and power balance');

