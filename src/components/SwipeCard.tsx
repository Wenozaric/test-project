import { motion, AnimatePresence } from 'framer-motion'
import { THREAT_DB } from '../data'
import type { Question } from '../data'
const GOOD: Record<string,string> = {
 web:'Web SPA+API - классика.',
 argon:'Argon2id - брутфорс нерентабелен.',
 orm:'ORM - SQLi закрыт.',
 waf:'WAF + CDN на 443.',
 tls13:'TLS 1.3 + HSTS.',
 secure_front:'CSP + DOMPurify.',
 siem:'SIEM + Dependabot.'
}
type FB = null | { chosen: Question['options'][number]; correct: Question['options'][number]|null; isCorrect: boolean }
export function SwipeCard(p:{q:Question,qi:number,feedback:FB,exitX:number,onChoose:(o:Question['options'][number])=>void,onDragEnd:(a:any,i:any)=>void,onSkip:()=>void,onNext:()=>void}){
 const { q, qi, feedback, exitX, onChoose, onDragEnd, onSkip, onNext } = p
 return (
  <div className="relative">
   <AnimatePresence mode="wait">
    <motion.div key={q.id+'-'+qi} drag={!feedback?'x':false} dragConstraints={{left:0,right:0}} dragElastic={0.22} onDragEnd={onDragEnd}
     initial={{opacity:0,y:14,scale:0.98}} animate={{opacity:1,y:0,scale:1,x:exitX?exitX:0,rotate:exitX?(exitX>0?6:-6):0}} exit={{opacity:0,x:exitX||280,rotate:8}} transition={{type:'spring',stiffness:340,damping:30,mass:0.8}} whileHover={!feedback?{y:-2,rotate:0.3}:{}}
     className="rounded-[20px] card-shadow overflow-hidden" style={{background:feedback?(feedback.isCorrect?'color-mix(in srgb, var(--success) 7%, var(--panel))':'color-mix(in srgb, var(--danger) 6%, var(--panel))'):'var(--panel)',border:'1px solid '+(feedback?(feedback.isCorrect?'var(--success)':'var(--danger)'):'var(--panel-border)')}}>
     <div className="px-5 sm:px-6 pt-5 pb-4 flex items-start justify-between gap-4">
      <div>
       <div className="mono text-[11px] tracking-[0.14em] font-medium" style={{color:'var(--text-faint)'}}>ВОПРОС {qi+1} · {q.title}</div>
       <h2 className="text-[18px] sm:text-[20px] font-semibold leading-snug mt-2" style={{color:'var(--text)'}}>{q.question}</h2>
       {q.hint && <div className="mono text-xs mt-2 px-2.5 py-1.5 rounded-lg inline-flex gap-1.5 items-center" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>{q.hint}</div>}
      </div>
      <span className="shrink-0 mono text-[10px] tracking-widest px-2 py-1 rounded-full font-semibold hidden sm:inline" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>{q.id}</span>
     </div>
     {(q.id==='q_db'||q.id==='q_front')&&(
      <div className="mx-5 sm:mx-6 rounded-xl overflow-hidden mono text-[12px] leading-relaxed" style={{background:'var(--bg)',border:'1px solid var(--panel-border)'}}>
       <div className="px-3 py-1.5 flex items-center justify-between" style={{background:'var(--bg-subtle)',borderBottom:'1px solid var(--panel-border)',color:'var(--text-faint)'}}><span>vuln.ts</span><span className="text-[10px]">READ ONLY</span></div>
       <pre className="p-3 overflow-auto" style={{color:'var(--text-muted)'}}>{q.id==='q_db'?'const q="SELECT * FROM users WHERE id="+req.query.id':'el.innerHTML=userInput'}</pre>
      </div>
     )}
     <div className="p-3 sm:p-4 space-y-2">
      {q.options.map(opt=>{
       const isChosen=feedback?.chosen.value===opt.value
       const isCorrectOpt=feedback?.correct?.value===opt.value
       const ok=!!(feedback&&isCorrectOpt)
       const bad=!!(feedback&&isChosen&&!feedback.isCorrect)
       return (
        <button key={opt.value} disabled={!!feedback} onClick={()=>onChoose(opt)} className="w-full text-left rounded-xl px-3.5 py-3 flex items-center justify-between gap-3 transition-all duration-200" style={{background:ok?'color-mix(in srgb, var(--success) 12%, var(--panel))':bad?'color-mix(in srgb, var(--danger) 10%, var(--panel))':'var(--bg-subtle)',border:'1px solid '+(ok?'var(--success)':bad?'var(--danger)':'var(--panel-border)')}}>
         <span className="text-[14px] leading-snug" style={{color:'var(--text)'}}>{opt.label}</span>
         <span className="shrink-0 flex items-center gap-2">
          {feedback&&ok&&<span className="w-6 h-6 rounded-full grid place-items-center text-xs font-bold" style={{background:'var(--success)',color:'white'}}>✓</span>}
          {feedback&&bad&&<span className="w-6 h-6 rounded-full grid place-items-center text-xs font-bold" style={{background:'var(--danger)',color:'white'}}>✕</span>}
          <span className="mono text-[11px] px-1.5 py-0.5 rounded-full font-medium" style={{background:'var(--panel)',border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>{opt.score>0?('+'+opt.score):opt.score}</span>
         </span>
        </button>
       )
      })}
     </div>
     <AnimatePresence>
       {feedback && (
         <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}} transition={{duration:0.28}} className="mx-3 sm:mx-4 mb-4 rounded-xl p-4 overflow-hidden" style={{background:feedback.isCorrect?'color-mix(in srgb, var(--success) 10%, var(--bg-subtle))':'color-mix(in srgb, var(--danger) 8%, var(--bg-subtle))',border:'1px solid '+(feedback.isCorrect?'color-mix(in srgb, var(--success) 30%, var(--panel-border))':'color-mix(in srgb, var(--danger) 30%, var(--panel-border))')}}>
           {feedback.isCorrect ? (
             <div>
               <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide px-2.5 py-1 rounded-full" style={{background:'var(--success)',color:'white'}}>✓ Успешно исправлено</div>
               <div className="text-sm leading-relaxed mt-3" style={{color:'var(--text)'}}>{GOOD[feedback.chosen.value] || ('Отлично. +'+feedback.chosen.score)}</div>
             </div>
           ) : (
             <div>
               <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide px-2.5 py-1 rounded-full" style={{background:'var(--danger)',color:'white'}}>✕ Разбор ошибки</div>
               <div className="text-sm mt-3" style={{color:'var(--text)'}}>Правильный: <b style={{color:'var(--success)'}}>{feedback.correct?.label}</b></div>
               {feedback.chosen.threats[0] && (THREAT_DB as any)[feedback.chosen.threats[0]] && (
                 <div className="mt-3 rounded-lg p-3" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}>
                   <div className="flex items-center gap-2">
                     <span className="text-xs font-bold mono px-2 py-0.5 rounded-full" style={{background:'color-mix(in srgb, var(--danger) 14%, var(--panel))',color:'var(--danger)',border:'1px solid var(--panel-border)'}}>{(THREAT_DB as any)[feedback.chosen.threats[0]].severity.toUpperCase()}</span>
                     <span className="text-sm font-semibold">{(THREAT_DB as any)[feedback.chosen.threats[0]].title}</span>
                   </div>
                   <div className="mono text-[11px] mt-1" style={{color:'var(--accent-2)'}}>{(THREAT_DB as any)[feedback.chosen.threats[0]].vector}</div>
                   <div className="text-xs leading-relaxed mt-2" style={{color:'var(--text-muted)'}}>
                     <div><b style={{color:'var(--text)'}}>Что не так:</b> {(THREAT_DB as any)[feedback.chosen.threats[0]].description}</div>
                     <div className="mt-1"><b style={{color:'var(--text)'}}>Как взломают:</b> {(THREAT_DB as any)[feedback.chosen.threats[0]].exploit}</div>
                     <div className="mt-1"><b style={{color:'var(--success)'}}>Фикс:</b> {(THREAT_DB as any)[feedback.chosen.threats[0]].mitigation}</div>
                   </div>
                 </div>
               )}
             </div>
           )}
         </motion.div>
       )}
     </AnimatePresence>
     <div className="px-3 sm:px-4 pb-4 flex items-center justify-between gap-2">
       <button onClick={onSkip} disabled={!!feedback} className="mono text-xs font-medium px-3.5 py-2 rounded-full transition disabled:opacity-40" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>← Пропустить</button>
       {feedback ? (
         <button onClick={onNext} className="mono text-xs font-bold px-5 py-2 rounded-full" style={{background:'var(--accent)',color:'var(--bg)',border:'1px solid var(--panel-border)'}}>Далее →</button>
       ) : (
         <span className="mono text-xs px-3 py-2 rounded-full" style={{border:'1px dashed var(--panel-border)',color:'var(--text-faint)'}}>Выбери ответ</span>
       )}
     </div>
    </motion.div>
   </AnimatePresence>
  </div>
 )
}


