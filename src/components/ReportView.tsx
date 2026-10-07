import { motion } from 'framer-motion'
import { THREAT_DB } from '../data'
import type { Question } from '../data'
export function ReportView({score, qs, threats, history, sectionTitle, onReset, onRetry, scoreColor}:{score:number,qs:Question[],threats:Set<string>,history:{q:Question,chosen:Question['options'][number],isCorrect:boolean}[],sectionTitle:string,onReset:()=>void,onRetry:()=>void,scoreColor:(n:number)=>string}){
  return (
    <div className="max-w-[720px] mx-auto">
      <button onClick={onReset} className="mono text-xs px-3 py-1.5 rounded-full mb-4" style={{background:'var(--panel)',border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>← К секциям</button>
      <div className="rounded-[20px] p-6 sm:p-7 card-shadow" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}>
        <div className="mono text-[11px] tracking-[0.14em] font-semibold" style={{color:'var(--text-faint)'}}>HARDENING REPORT</div>
        <div className="mt-3 flex flex-wrap items-baseline gap-3">
          <span className="text-[32px] font-bold tracking-tight" style={{color:scoreColor(score)}}>{score}<span className="text-[16px] ml-1" style={{color:'var(--text-faint)'}}>/100</span></span>
          <span className="text-sm font-semibold px-2.5 py-1 rounded-full" style={{background:'var(--accent-soft)',color:'var(--accent)',border:'1px solid var(--panel-border)'}}>{score>=80?'Hardened':score>=60?'Needs':'Critical'}</span>
          <span className="mono text-xs" style={{color:'var(--text-muted)'}}>{new Date().toLocaleString('ru-RU')} · {qs.length} cards · {sectionTitle}</span>
        </div>
        <div className="mt-4 h-2 rounded-full overflow-hidden" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)'}}><motion.div className="h-full rounded-full" style={{background:scoreColor(score)}} initial={{width:0}} animate={{width:score+'%'}} transition={{duration:0.6}}/></div>
        <div className="mt-6"><div className="mono text-xs tracking-widest font-semibold" style={{color:'var(--text-faint)'}}>ЧЕК-ЛИСТ</div>
          <div className="mt-3 space-y-2">
            {[...threats].length===0?(<div className="rounded-xl p-4 mono text-sm text-center" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>Угроз не найдено.</div>):([...threats].map(id=>{const t=(THREAT_DB as any)[id];return(<label key={id} className="flex gap-3 rounded-xl p-3 cursor-pointer" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)'}}><input type="checkbox" className="mt-0.5"/><span className="text-sm leading-relaxed"><b>{t.title}:</b> <span style={{color:'var(--text-muted)'}}>{t.mitigation}</span></span></label>)}) )}
            <label className="flex gap-3 rounded-xl p-3 cursor-pointer" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)'}}><input type="checkbox"/><span className="text-sm"><b>Pentest:</b> <span style={{color:'var(--text-muted)'}}>раз в квартал</span></span></label>
            <label className="flex gap-3 rounded-xl p-3 cursor-pointer" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)'}}><input type="checkbox"/><span className="text-sm"><b>Backup 3-2-1:</b> <span style={{color:'var(--text-muted)'}}>шифрованные</span></span></label>
          </div>
        </div>
        {history.length>0&&(<div className="mt-6"><div className="mono text-xs tracking-widest font-semibold" style={{color:'var(--text-faint)'}}>ИСТОРИЯ</div><div className="mt-3 grid gap-2">{history.map((h,i)=>(<div key={i} className="rounded-xl px-3 py-2.5 flex items-center justify-between gap-3" style={{background:'var(--bg-subtle)',border:'1px solid '+(h.isCorrect?'color-mix(in srgb, var(--success) 22%, var(--panel-border))':'color-mix(in srgb, var(--danger) 22%, var(--panel-border))')}}><span className="text-sm truncate"><span className="mono text-xs mr-2" style={{color:'var(--text-faint)'}}>{i+1}.</span>{h.q.title} — <span style={{color:h.isCorrect?'var(--success)':'var(--danger)'}}>{h.chosen.label}</span></span><span className="shrink-0 w-6 h-6 rounded-full grid place-items-center text-xs font-bold" style={{background:h.isCorrect?'var(--success)':'var(--danger)',color:'white'}}>{h.isCorrect?'✓':'✕'}</span></div>))}</div></div>)}
        <div className="mt-6 flex gap-2"><button onClick={()=>window.print()} className="flex-1 py-2.5 rounded-full font-semibold text-sm" style={{background:'var(--accent)',color:'var(--bg)'}}>Печать</button><button onClick={async()=>{const txt='HARDENING REPORT '+score+'/100\n'+[...threats].map(i=>(THREAT_DB as any)[i].title+': '+(THREAT_DB as any)[i].mitigation).join('\n');await navigator.clipboard.writeText(txt);alert('Скопировано!')}} className="flex-1 py-2.5 rounded-full font-semibold text-sm" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)',color:'var(--text)'}}>Копировать</button></div>
        <div className="mt-4 flex gap-2"><button onClick={onReset} className="flex-1 py-2.5 rounded-full font-medium text-sm" style={{border:'1px solid var(--panel-border)',color:'var(--text-muted)'}}>К секциям</button><button onClick={onRetry} className="flex-1 py-2.5 rounded-full font-medium text-sm" style={{background:'var(--panel)',border:'1px solid var(--panel-border)',color:'var(--text)'}}>Снова</button></div>
      </div>
      <div className="mono text-[11px] text-center mt-6" style={{color:'var(--text-faint)'}}>© Hardening Lab · offline</div>
    </div>
  )
}
