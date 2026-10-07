import { SECTIONS } from '../sections'
export function SectionSelect({ onStart }: { onStart: (id:string)=>void }){
  return (
    <div>
      <div className="max-w-[720px] mb-8">
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight leading-tight">Выбери направление<br/>для тренировки</h1>
        <p className="mt-3 text-[14px] leading-relaxed" style={{color:'var(--text-muted)'}}>
          Каждая секция — подборка карточек с уязвимым кодом и кейсами. Свайпай, отвечай, получай разбор и прокачивай Security Score.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={()=>onStart('all')} className="group text-left rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[188px] card-shadow transition-all hover:scale-[1.01]" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}>
          <div>
            <div className="w-10 h-10 rounded-xl grid place-items-center text-lg mb-4" style={{background:'var(--accent-soft)',color:'var(--accent)',border:'1px solid var(--panel-border)'}}>✦</div>
            <div className="text-[16px] font-semibold">Все секции</div>
            <div className="mono text-xs mt-1" style={{color:'var(--text-muted)'}}>8 карточек · полный аудит</div>
            <div className="text-sm mt-3 leading-relaxed" style={{color:'var(--text-muted)'}}>Пройди все 8 шагов от типа системы до мониторинга и получи итоговый отчёт.</div>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold mono" style={{color:'var(--accent)'}}>Начать <span>→</span></div>
        </button>
        {SECTIONS.map(s=>(
          <button key={s.id} onClick={()=>onStart(s.id)} className="group text-left rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[188px] card-shadow transition-all hover:scale-[1.01]" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}>
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="w-10 h-10 rounded-xl grid place-items-center text-sm" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)',color:'var(--accent)'}}>{s.icon}</span>
                <span className="mono text-[10px] tracking-widest px-2 py-1 rounded-full font-medium" style={{background:'var(--bg-subtle)',border:'1px solid var(--panel-border)',color:'var(--text-faint)'}}>{s.questionIds.length} CARDS</span>
              </div>
              <div className="text-[16px] font-semibold mt-4">{s.title}</div>
              <div className="mono text-xs mt-1" style={{color:'var(--accent)'}}>{s.subtitle}</div>
              <div className="text-sm mt-2.5 leading-relaxed" style={{color:'var(--text-muted)'}}>{s.description}</div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold mono" style={{color:'var(--text)'}}>Открыть секцию <span>→</span></div>
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-2xl p-4 sm:p-5 flex gap-3 items-start" style={{background:'var(--panel)',border:'1px solid var(--panel-border)'}}>
        <span className="shrink-0 w-7 h-7 rounded-full grid place-items-center mono text-xs" style={{background:'var(--accent-soft)',color:'var(--accent)'}}>i</span>
        <div className="text-sm leading-relaxed" style={{color:'var(--text-muted)'}}><b style={{color:'var(--text)'}}>Как это работает:</b> читай карточку → выбери ответ → получи цветовой фидбек (зелёный — исправлено, красный — разбор) → свайп к следующей.</div>
      </div>
    </div>
  )
}
