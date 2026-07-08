import useRevealLine from '../hooks/useRevealLine.js'
import useRevealUp from '../hooks/useRevealUp.js'

function RevealLine({ children, className = '' }) {
  const ref = useRevealLine()
  return (
    <span className="block overflow-hidden">
      <span className="split-word">
        <span ref={ref} className={`split-inner ${className}`}>{children}</span>
      </span>
    </span>
  )
}

function RevealP({ children }) {
  const ref = useRevealUp()
  return <p ref={ref}>{children}</p>
}

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-3 lg:sticky lg:top-32 self-start">
          <div className="eyebrow text-brand-secondary mb-6"><span className="opacity-50">01 —</span> About</div>
          <div className="h-italic text-brand-primary text-xl leading-snug">
            A Bengaluru front-end developer turning wireframes into interfaces people actually enjoy.
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <h2 className="h-display fs-h2 text-brand-primary mb-12">
            <RevealLine>Built at the</RevealLine>
            <RevealLine className="h-italic text-brand-secondary">keyboard</RevealLine>
            <RevealLine>— not the boardroom.</RevealLine>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 fs-lead text-brand-ink/75">
            <RevealP>
              I'm a detail-oriented Front-End Developer with 1+ years of experience specializing in modern
              JavaScript, React.js, and responsive web design. I focus on UI/UX collaboration, browser
              performance optimization, and automated testing.
            </RevealP>
            <RevealP>
              I've built interactive dashboards that increased mobile user engagement by 45%, and reduced
              critical bugs through automated testing — working across WordPress, Shopify, and React-based
              products.
            </RevealP>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 border-t border-brand-primary/10 pt-8">
            <div>
              <div className="eyebrow text-brand-primary/60">Himanshu Panchal · Frontend Developer</div>
              <div className="eyebrow text-brand-primary/40 mt-1">himanshupanchal8439@gmail.com · +91-8439470318</div>
            </div>
            <a href="https://linkedin.com/in/himanshupanchal" target="_blank" rel="noreferrer" className="link-line eyebrow text-brand-primary" data-cursor>
              Connect on LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
