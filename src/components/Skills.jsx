import useRevealUp from '../hooks/useRevealUp.js'

const SKILLS = [
  { name: 'JS / TS', pct: '92%' },
  { name: 'React.js', pct: '90%' },
  { name: 'Tailwind', pct: '88%' },
  { name: 'WordPress', pct: '85%' },
  { name: 'Shopify', pct: '85%' },
  { name: 'Three.js', pct: '78%' },
  { name: 'Figma', pct: '88%' },
  { name: 'Git', pct: '88%' },
]

function SkillNode({ name, pct }) {
  const ref = useRevealUp()
  return (
    <div ref={ref} className="orbit-node rounded-3xl p-6 flex flex-col items-center justify-center text-center aspect-square">
      <div className="h-italic text-brand-primary text-lg">{name}</div>
      <div className="eyebrow text-brand-secondary mt-2 text-[9px]">{pct}</div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative bg-brand-dark text-brand-cream overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none overflow-hidden">
        <div className="h-display text-[18vw] leading-none tracking-tighter whitespace-nowrap">SKILLS · SKILLS · SKILLS</div>
      </div>

      <div className="relative z-10 flex items-end justify-between mb-16 md:mb-20">
        <div>
          <div className="eyebrow text-brand-accent mb-4"><span className="opacity-50">02 —</span> Toolkit</div>
          <h2 className="h-display fs-h2 max-w-3xl">
            Seven <span className="h-italic text-brand-accent">honest</span> tools.
          </h2>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {SKILLS.map((s) => (
          <SkillNode key={s.name} {...s} />
        ))}
      </div>
    </section>
  )
}
