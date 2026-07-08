const ITEMS = ['React', 'TypeScript', 'Tailwind', 'WordPress', 'Shopify', 'Three.js']

function Track() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={item} className={i % 2 === 1 ? 'h-italic' : ''}>{item}&nbsp;·</span>
      ))}
    </>
  )
}

export default function Marquee() {
  return (
    <section className="py-8 border-y border-brand-primary/10 bg-brand-cream/50 overflow-hidden">
      <div className="marquee-track h-editorial text-brand-primary/25 fs-mega">
        <Track />
        <Track />
      </div>
    </section>
  )
}
