import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { THREAT_DB } from './data'
import { QUESTIONS } from './questions'
import { SECTIONS, questionsForSection } from './sections'
import { SectionSelect } from './components/SectionSelect'
import { SwipeCard } from './components/SwipeCard'
import { ReportView } from './components/ReportView'
import type { Question } from './data'
type Theme='cyber'|'nord'|'light'|'dracula'
const THEMES:{id:Theme;label:string}[]=[
 {id:'cyber',label:'Cyber'},
 {id:'nord',label:'Nord'},
 {id:'light',label:'Light'},
 {id:'dracula',label:'Dracula'}]
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n))
const scoreColor=(s:number)=>s>=80?'var(--success)':s>=60?'var(--warning)':s>=40?'#f59e0b':'var(--danger)'
export default function App(){
const [theme,setTheme]=useState<Theme>(()=>(localStorage.getItem('hl-theme') as Theme)||'cyber')
const [screen,setScreen]=useState<'sections'|'quiz'|'report'>('sections')
const [sectionId,setSectionId]=useState('all')
const [qs,setQs]=useState<Question[]>(QUESTIONS)
const [qi,setQi]=useState(0)
const [score,setScore]=useState(62)
const [threats,setThreats]=useState<Set<string>>(new Set())
const [feedback,setFeedback]=useState<null|{chosen:Question['options'][number];correct:Question['options'][number]|null;isCorrect:boolean}>(null)
const [history,setHistory]=useState<{q:Question,chosen:Question['options'][number],isCorrect:boolean}[]>([])
const [exitX,setExitX]=useState(0)
const [skipped,setSkipped]=useState(0)
useEffect(()=>{document.documentElement.setAttribute('data-theme',theme);localStorage.setItem('hl-theme',theme)},[theme])
const q=qs[qi]
const done=qi>=qs.length
function startSection(id:string){const list=questionsForSection(id);setSectionId(id);setQs(list);setQi(0);setScore(62);setThreats(new Set());setFeedback(null);setHistory([]);setSkipped(0);setExitX(0);setScreen('quiz')}
function handleChoose(opt:Question['options'][number]){if(feedback||!q) return;const isCorrect=opt.threats.length===0&&opt.score>=0;const correct=q.options.find(o=>o.threats.length===0)||q.options.reduce((a,b)=>a.score>b.score?a:b);setFeedback({chosen:opt,correct:isCorrect?null:correct,isCorrect});setScore(s=>clamp(s+opt.score,0,100));const nt=new Set(threats);opt.threats.forEach(t=>nt.add(t));setThreats(nt);setHistory(h=>[...h,{q,chosen:opt,isCorrect}])}
function nextCard(dir=1){setExitX(dir*420);setTimeout(()=>{setFeedback(null);setExitX(0);if(qi+1>=qs.length) setScreen('report');else setQi(v=>v+1)},320)}
function skip(){if(feedback) return;setSkipped(s=>s+1);setExitX(-420);setTimeout(()=>{setExitX(0);if(qi+1>=qs.length) setScreen('report');else setQi(v=>v+1)},320)}
function onDragEnd(_a:any,info:any){if(feedback) return;if(Math.abs(info.offset.x)>110) skip()}
function reset(){setScreen('sections');setSectionId('all');setQs(QUESTIONS);setQi(0);setScore(62);setThreats(new Set());setFeedback(null);setHistory([]);setSkipped(0)}
const secMeta=SECTIONS.find(s=>s.id===sectionId)
return(<div className="min-h-screen" style={{background:'var(--bg)',color:'var(--text)'}}>
<header className="sticky top-0 z-30 backdrop-blur-md" style={{background:'color-mix(in srgb, var(--bg) 82%, transparent)',borderBottom:'1px solid var(--panel-border)'}}>
<div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between gap-4">
<button onClick={reset} className="flex items-center gap-3 text-left"><span className="w-8 h-8 rounded-lg grid place-items-center text-sm font-bold" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}>◈</span><span><div className="text-[13px] font-semibold tracking-tight leading-none">Hardening Lab</div><div className="text-[11px] mono" style={{color:'var(--text-muted)'}}>Security Trainer · {qs.length} cards</div></span></button>
<div className="flex items-center gap-2">
{screen==='quiz'&&(<div className="hidden sm:flex items-center gap-2 mono text-xs"><span className="px-2.5 py-1 rounded-full font-medium" style={{background:'var(--panel)',border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>{qi+1}/{qs.length}</span><span className="px-2.5 py-1 rounded-full font-bold" style={{background:'color-mix(in srgb, var(--success) 14%, var(--panel))',color:scoreColor(score),border:'1px solid var(--panel-border)'}}>{score}</span></div>)}
<select value={theme} onChange={e=>setTheme(e.target.value as Theme)} className="text-xs font-medium rounded-full px-3 py-1.5 outline-none cursor-pointer" style={{background:'var(--panel)',border:'1px solid var(--panel-border)',color:'var(--text)'}}>{THEMES.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select>
</div></div>
{screen==='quiz'&&(<div className="h-[2px] w-full" style={{background:'var(--panel-border)'}}><motion.div className="h-full" style={{background:'var(--accent)'}} initial={{width:0}} animate={{width:(done?100:(qi/qs.length)*100)+'%'}} transition={{duration:0.45}}/></div>)}
</header>
<main className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
{screen==='sections'&&<SectionSelect onStart={startSection} />}
{screen==='quiz'&&q&&(<div className="max-w-[640px] mx-auto">
<div className="flex items-center justify-between gap-3 mb-4"><button onClick={()=>setScreen('sections')} className="mono text-xs px-3 py-1.5 rounded-full" style={{background:'var(--panel)',border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>← Секции</button><span className="mono text-[11px] px-2.5 py-1 rounded-full" style={{background:'var(--accent-soft)',color:'var(--accent)',border:'1px solid var(--panel-border)'}}>{secMeta?secMeta.title:'Все секции'}</span></div>
<div className="mono text-[11px] tracking-wide text-center mb-3" style={{color:'var(--text-faint)'}}>Свайп влево — пропустить · Десктоп — кнопки ниже</div>
<SwipeCard q={q} qi={qi} feedback={feedback} exitX={exitX} onChoose={handleChoose} onDragEnd={onDragEnd} onSkip={skip} onNext={()=>nextCard(1)} />
<div className="mt-6 grid grid-cols-3 gap-3">
<div className="rounded-2xl p-3.5 card-shadow" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}><div className="mono text-[10px] tracking-widest" style={{color:'var(--text-faint)'}}>SCORE</div><div className="text-[20px] font-bold" style={{color:scoreColor(score)}}>{score}<span className="text-xs ml-1" style={{color:'var(--text-faint)'}}>/100</span></div></div>
<div className="rounded-2xl p-3.5 card-shadow" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}><div className="mono text-[10px] tracking-widest" style={{color:'var(--text-faint)'}}>ВЕКТОРЫ</div><div className="text-[20px] font-bold" style={{color:'var(--danger)'}}>{threats.size}</div></div>
<div className="rounded-2xl p-3.5 card-shadow" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}><div className="mono text-[10px] tracking-widest" style={{color:'var(--text-faint)'}}>ПРОГРЕСС</div><div className="text-[20px] font-bold">{qi+1}/{qs.length}</div></div>
</div>
<div className="mt-4 rounded-2xl p-4 card-shadow" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}><div className="flex items-center justify-between"><span className="mono text-[11px] tracking-[0.14em] font-semibold" style={{color:'var(--text-faint)'}}>ВЕКТОРЫ УГРОЗ</span><span className="mono text-[11px] px-2 py-0.5 rounded-full font-bold" style={{background:threats.size?'var(--danger)':'var(--bg-subtle)',color:threats.size?'white':'var(--text-muted)',border:'1px solid var(--panel-border)'}}>{threats.size} найдено</span></div>{threats.size===0?(<div className="mono text-xs mt-3 rounded-xl p-4 text-center" style={{background:'var(--bg-subtle)',border:'1px dashed var(--panel-border)',color:'var(--text-muted)'}}>Пока чисто.</div>):(<div className="mt-3 space-y-2 max-h-[220px] overflow-auto pr-1">{[...threats].map(id=>{const t=(THREAT_DB as any)[id];if(!t) return null;return(<div key={id} className="rounded-xl p-3" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)'}}><div className="flex items-start justify-between gap-2"><b className="text-sm leading-tight">{t.title}</b><span className="mono text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0" style={{background:t.severity==='critical'?'var(--danger)':t.severity==='high'?'#f97316':t.severity==='medium'?'var(--warning)':'var(--accent-2)',color:t.severity==='medium'?'#111827':'white'}}>{t.severity.toUpperCase()}</span></div><div className="mono text-[11px] mt-1" style={{color:'var(--accent-2)'}}>{t.vector}</div><div className="text-xs mt-1.5" style={{color:'var(--text-muted)'}}>{t.description}</div></div>)})}</div>)}</div>
</div>)}
{screen==='report'&&<ReportView score={score} qs={qs} threats={threats} history={history} sectionTitle={secMeta?secMeta.title:'Все секции'} onReset={reset} onRetry={()=>startSection(sectionId)} scoreColor={scoreColor} />}
</main>
{screen==='quiz'&&!done&&(<div className="sm:hidden fixed bottom-0 inset-x-0 px-4 py-3" style={{background:'color-mix(in srgb, var(--bg) 88%, transparent)',backdropFilter:'blur(10px)',borderTop:'1px solid var(--panel-border)'}}><div className="flex items-center justify-between mono text-xs"><span style={{color:'var(--text-muted)'}}>{qi+1}/{qs.length}</span><span className="font-bold" style={{color:scoreColor(score)}}>{score}/100</span><span style={{color:'var(--text-faint)'}}>{secMeta?secMeta.title:'All'}</span></div></div>)}
</div>)
}


