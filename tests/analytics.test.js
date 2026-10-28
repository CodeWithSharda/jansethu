import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {seed,csv,metrics} from '../dist/domain.js';
function check(rows){const time=Date.UTC(2026,9,29,9),dir=mkdtempSync(join(tmpdir(),'jansetu-')),file=join(dir,'requests.csv');try{writeFileSync(file,csv(rows));const result=JSON.parse(execFileSync(process.env.PYTHON || 'python3',['analytics/analyze.py',file,'--as-of',new Date(time).toISOString()],{encoding:'utf8'})),js=metrics(rows,time);assert.equal(result.total,js.total);assert.equal(result.active,js.open);assert.equal(result.resolved,js.resolved);assert.equal(result.overdue,js.overdue);assert.equal(result.on_time_rate,js.onTimeRate);assert.equal(result.median_resolution_hours,js.medianHours);assert.equal(result.ever_reopened,js.reopened);}finally{rmSync(dir,{recursive:true,force:true});}}
test('Python / SQL reproduces JavaScript metrics on all demo data',()=>check(seed(Date.UTC(2026,9,29,9))));
test('Python / SQL handles an empty export without misleading ratios',()=>check([]));
test('Python / SQL reproduces an all-open cohort',()=>check(seed(Date.UTC(2026,9,29,9)).filter(r=>r.status!=='Resolved')));
