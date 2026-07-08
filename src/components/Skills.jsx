import { Suspense, lazy } from 'react'
import useRevealUp from '../hooks/useRevealUp.js'

const SkillsScene = lazy(() => import('./SkillsScene.jsx'))

const SKILLS = [
  { name: 'React.js', icon: '⚛️' },
  { name: 'JS / TS', icon: 'JS' },
  { name: 'Three.js', icon: '🌐' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'WordPress', icon: '🇼' },
  { name: 'Shopify', icon: '🛍️' },
  { name: 'Figma', icon: '✨' },
  { name: 'Git', icon: '📦' },
]

function SkillCard({ name, icon }) {
  const ref = useRevealUp()
  return (
    <div ref={ref} className="skill-card p-6 rounded-2xl text-center text-white">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-bold">{name}</div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-[#0a0a0a] overflow-hidden py-16 px-6 md:px-8">
      <Suspense fallback={null}>
        <SkillsScene />
      </Suspense>

      <div className="relative z-10 max-w-[1000px] mx-auto">
        <h3 className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4 text-center">02 — Expertise</h3>
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Technical Core</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SKILLS.map((s) => (
            <SkillCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
