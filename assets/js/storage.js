import {data} from './data.js';
export function load(k){try{const v=JSON.parse(localStorage.getItem('ssh-'+k));return Array.isArray(v)?v:structuredClone(data[k])}catch{return structuredClone(data[k])}}
export function save(k,v){localStorage.setItem('ssh-'+k,JSON.stringify(v))}
export const settings={slaHours:{critical:4,high:8,medium:24,low:72}};
export function sla(x){const t=Date.parse(x.createdAt)+(settings.slaHours[x.priority]||24)*3600000;if(x.status==='resolved')return Date.parse(x.resolvedAt)<=t?'met':'breached';return Date.now()>t?'breached':'on_track'}
export function slaPercent(xs){let a=xs.filter(x=>x.status==='resolved');return a.length?Math.round(a.filter(x=>sla(x)==='met').length/a.length*100):100}
export function nextVersion(v,l){let [a,b,c]=v.replace(/^v/,'').split('.').map(Number);return l==='major'?'v'+(a+1)+'.0.0':l==='minor'?'v'+a+'.'+(b+1)+'.0':'v'+a+'.'+b+'.'+(c+1)}

export const getSlaState=sla;
export const getSlaPercent=slaPercent;
export const getNextVersion=nextVersion;

