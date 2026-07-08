import { Suspense, lazy } from 'react'
import useRevealUp from '../hooks/useRevealUp.js'

const AboutScene = lazy(() => import('./AboutScene.jsx'))

function RevealP({ children }) {
  const ref = useRevealUp()
  return <p ref={ref}>{children}</p>
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0a0a0a] text-gray-200 px-6 md:px-12 py-20 md:py-28">
      <Suspense fallback={null}>
        <AboutScene />
      </Suspense>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-12 gap-8 md:gap-10 items-start">
        {/* Left Column */}
        <div className="md:col-span-4">
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase block mb-3">01 — About</span>
          <h2 className="text-3xl md:text-5xl font-light leading-tight text-white italic">
            A Bengaluru front-end developer turning wireframes into interfaces people actually enjoy.
          </h2>
          <div className="mt-6 w-12 h-12 rounded-full border border-indigo-500/30 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-gray-400 leading-relaxed">
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

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm font-mono text-indigo-300">
            <div>
              <p>HIMANSHU PANCHAL · FRONTEND DEVELOPER</p>
              <a href="mailto:himanshupanchal8439@gmail.com" className="hover:underline" data-cursor>
                HIMANSHUPANCHAL8439@GMAIL.COM
              </a>{' '}
              · +91-8439470318
            </div>
            <a
              href="https://linkedin.com/in/himanshupanchal"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition uppercase tracking-tighter"
              data-cursor
            >
              Connect on LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
