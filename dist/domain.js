export const CATEGORIES=['Water supply','Sanitation','Street lighting','Road maintenance'];
export const WARDS=['Ward 01','Ward 02','Ward 03','Ward 04'];
export const CHANNELS=['Web form','Help desk','Field visit'];
export const TEAMS=['Water response','Sanitation crew','Electrical team','Roads team'];
export const STATUSES=['New','Assigned','In progress','Resolved','Reopened'];
export const HOURS={Critical:24,High:48,Normal:120};
export const NEXT={'New':['Assigned'],'Assigned':['In progress'],'In progress':['Resolved'],'Resolved':['Reopened'],'Reopened':['In progress']};
const hr=3600000;
export function dueAt(r){return r.createdAt+HOURS[r.priority]*hr;}
export function sla(r,now=Date.now()) {if(r.status==='Resolved')return r.resolvedAt<=dueAt(r)?'Met':'Missed';const left=dueAt(r)-now;return left<=0?'Overdue':left<=12*hr?'At risk':'On track';}
export function requestId(){return 'JS-'+Array.from(globalThis.crypto.getRandomValues(new Uint8Array(8)),b=>b.toString(16).padStart(2,'0')).join('').toUpperCase();}
export function createRequest(input,now=Date.now(),id=requestId()) {
 const title=String(input.title||'').trim(),description=String(input.description||'').trim();
 if(title.length<8||title.length>100)throw Error('Use a title between 8 and 100 characters.');
 if(description.length<20||description.length>1000)throw Error('Add 20–1,000 characters describing the issue.');
 for(const [key,list] of Object.entries({category:CATEGORIES,ward:WARDS,channel:CHANNELS,priority:Object.keys(HOURS)}))if(!list.includes(input[key]))throw Error('Choose a valid '+key+'.');
 return {id,title,description,category:input.category,ward:input.ward,channel:input.channel,priority:input.priority,status:'New',assignee:'',createdAt:now,resolvedAt:null,reopenCount:0,evidence:'',history:[{at:now,action:'Request created',note:input.channel}]};
}
export function transition(r,status,{assignee=r.assignee,note=''}={},now=Date.now()) {
 if(!NEXT[r.status]?.includes(status))throw Error('This status transition is not allowed.');
 if(!TEAMS.includes(assignee))throw Error('Assign a response team first.');
 const clean=String(note).trim();
 if((status==='Resolved'||status==='Reopened')&&clean.length<15)throw Error('Add at least 15 characters of resolution evidence or reopening reason.');
 if(clean.length>1000)throw Error('Keep the note within 1,000 characters.');
 return {...r,status,assignee,resolvedAt:status==='Resolved'?now:null,evidence:status==='Resolved'?clean:r.evidence,reopenCount:r.reopenCount+(status==='Reopened'?1:0),history:[...r.history,{at:now,action:status,note:clean||`Owned by ${assignee}`}]};
}
export function assign(r,assignee,now=Date.now()) {if(r.status==='Resolved')throw Error('Reopen the request before reassigning it.');if(!TEAMS.includes(assignee))throw Error('Choose a valid team.');if(r.status==='New')return transition(r,'Assigned',{assignee},now);return {...r,assignee,history:[...r.history,{at:now,action:'Reassigned',note:assignee}]};}
export function filterRequests(rows,{query='',status='',ward='',category=''}={}) {return rows.filter(r=>(!query||`${r.id} ${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase()))&&(!status||r.status===status)&&(!ward||r.ward===ward)&&(!category||r.category===category));}
export function metrics(rows,now=Date.now()) {const closed=rows.filter(r=>r.status==='Resolved'),open=rows.filter(r=>r.status!=='Resolved'),durations=closed.map(r=>(r.resolvedAt-r.createdAt)/hr).sort((a,b)=>a-b),n=durations.length;return {total:rows.length,open:open.length,resolved:closed.length,overdue:open.filter(r=>sla(r,now)==='Overdue').length,atRisk:open.filter(r=>sla(r,now)==='At risk').length,onTime:closed.filter(r=>sla(r,now)==='Met').length,onTimeRate:closed.length?closed.filter(r=>sla(r,now)==='Met').length/closed.length:null,medianHours:n?(durations[Math.floor((n-1)/2)]+durations[Math.floor(n/2)])/2:null,reopened:rows.filter(r=>r.reopenCount>0).length};}
export function rice({reach,impact,confidence,effort}) {if(![reach,impact,confidence,effort].every(Number.isFinite)||reach<0||impact<0||confidence<0||confidence>1||effort<=0)throw Error('Invalid RICE inputs.');return reach*impact*confidence/effort;}
export function experiment(aN,aYes,bN,bYes){if(![aN,aYes,bN,bYes].every(Number.isInteger)||aN<1||bN<1||aYes<0||bYes<0||aYes>aN||bYes>bN)throw Error('Enter valid counts; successes must be between zero and sample size.');const a=aYes/aN,b=bYes/bN,d=b-a,se=Math.sqrt(a*(1-a)/aN+b*(1-b)/bN);const adequate=[aYes,aN-aYes,bYes,bN-bYes].every(n=>n>=10);return {a,b,d,low:Math.max(-1,d-1.96*se),high:Math.min(1,d+1.96*se),adequate};}
export function csv(rows){const keys=['id','title','category','ward','channel','priority','status','assignee','createdAt','resolvedAt','reopenCount'];const safe=v=>{let s=String(v??'');if(/^[\s]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};return [keys.join(','),...rows.map(r=>keys.map(k=>safe(k.endsWith('At')&&r[k]?new Date(r[k]).toISOString():r[k])).join(','))].join('\r\n');}
export function seed(now=Date.now()) {const names=['Interrupted water supply near community centre','Uncollected waste at market junction','Street lights not working on main lane','Damaged road surface near bus stop'];return Array.from({length:72},(_,i)=>{const c=i%4,age=(8+(i*17)%240)*hr,createdAt=now-age,priority=i%11===0?'Critical':i%3===0?'High':'Normal';let r=createRequest({title:names[c]+` · Block ${i%9+1}`,description:'Synthetic demonstration request. Service disruption reported in a shared public area; requires inspection and an accountable response.',category:CATEGORIES[c],ward:WARDS[Math.floor(i/4)%4],channel:CHANNELS[i%3],priority},createdAt,`JS-${1001+i}`);if(i%5!==0){r=transition(r,'Assigned',{assignee:TEAMS[c]},createdAt+hr);if(i%5!==1){r=transition(r,'In progress',{},createdAt+2*hr);if(i%5===3||i%5===4){r=transition(r,'Resolved',{note:'Synthetic evidence: crew completed inspection and restoration; service checked on site.'},Math.min(now-hr,createdAt+(12+(i*13)%160)*hr));if(i%13===0)r=transition(r,'Reopened',{note:'Synthetic feedback: the same issue has returned and needs a second inspection.'},now-hr/2);}}}return r;});}
