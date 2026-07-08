import useRevealUp from '../hooks/useRevealUp.js'

const ITEMS = [
  {
    date: 'April 2025 — April 2026',
    title: 'Frontend Developer, Screen Interactive Pvt Ltd — Bangalore',
    body: 'Engineered interactive web apps and custom WordPress architectures; built and customized Shopify storefronts with Liquid; integrated REST APIs with backend teams; improved page speed scores by 30% through refactoring and asset optimization.',
  },
  {
    date: 'January 2024 — May 2024',
    title: 'Frontend Developer Intern, HyDear Tech Private Limited — Noida',
    body: 'Developed and optimized responsive pages with React.js; translated Figma wireframes into pixel-perfect, accessible components using Tailwind CSS and Bootstrap; fixed critical bugs and improved app stability via Git/GitHub.',
  },
  {
    date: 'Graduated 2024',
    title: 'B.Tech, Computer Science & Engineering — Shobhit University, Gangoh',
    body: 'CGPA: 6.5 / 10 (approx. 3.4 / 4.0 US equivalent).',
  },
]

function TimelineItem({ date, title, body }) {
  const ref = useRevealUp()
  return (
    <div ref={ref} className="relative">
      <span className="stage-dot absolute -left-[45px] top-1"></span>
      <p className="eyebrow text-brand-primary/50 mb-2">{date}</p>
      <h3 className="h-editorial text-2xl mb-2 text-brand-primary">{title}</h3>
      <p className="text-brand-ink/70 fs-lead">{body}</p>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="eyebrow text-brand-secondary mb-4 text-center"><span className="opacity-50">03 —</span> Career Path</div>
      <h2 className="h-display fs-h2 text-brand-primary mb-16 text-center">Experience</h2>

      <div className="max-w-4xl mx-auto relative border-l border-brand-primary/15 pl-10 space-y-16">
        {ITEMS.map((item) => (
          <TimelineItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}
