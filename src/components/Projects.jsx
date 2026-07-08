const PROJECTS = [
  {
    tag: '№ 01 · Storefront',
    stack: 'React + Tailwind',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
    alt: 'E-Commerce Web Application',
    title: 'E-Commerce',
    titleItalic: 'Web App',
    desc: 'Fully responsive storefront built with React.js and Tailwind CSS, using Context API for global cart state, sessions, and dynamic product filtering — 25% faster initial load via lazy loading and code-splitting.',
  },
  {
    tag: '№ 02 · Dashboard',
    stack: 'React + Chart.js',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    alt: 'SaaS Analytics Dashboard Platform',
    title: 'SaaS Analytics',
    titleItalic: 'Dashboard',
    desc: 'Interactive admin dashboard visualizing MRR and retention, with real-time filtering, multi-series timeline charts, and a dark-mode accessible UI scoring 95+ on Lighthouse.',
  },
]

function ProjectCard({ tag, stack, img, alt, title, titleItalic, desc }) {
  return (
    <article className="product-card p-8 md:p-10 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-6">
        <div className="eyebrow text-brand-accent">{tag}</div>
        <div className="eyebrow opacity-40">{stack}</div>
      </div>
      <div className="rounded-2xl overflow-hidden mb-6">
        <img src={img} alt={alt} className="w-full h-48 object-cover hover:scale-110 transition duration-500" loading="lazy" />
      </div>
      <div>
        <h3 className="h-editorial text-3xl md:text-4xl mb-3">
          {title} <span className="h-italic text-brand-accent">{titleItalic}</span>
        </h3>
        <p className="text-brand-cream/70 max-w-sm mb-6 fs-lead">{desc}</p>
        <a href="#" className="eyebrow text-brand-accent link-line" data-cursor>View details →</a>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative bg-brand-dark text-brand-cream overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none overflow-hidden">
        <div className="h-display text-[18vw] leading-none tracking-tighter whitespace-nowrap">PROJECTS · PROJECTS</div>
      </div>

      <div className="relative z-10 flex items-end justify-between mb-16 md:mb-20">
        <div>
          <div className="eyebrow text-brand-accent mb-4"><span className="opacity-50">04 —</span> Selected Work</div>
          <h2 className="h-display fs-h2 max-w-3xl">Two builds. <span className="h-italic text-brand-accent">Real impact.</span></h2>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.tag} {...p} />
        ))}
      </div>
    </section>
  )
}
