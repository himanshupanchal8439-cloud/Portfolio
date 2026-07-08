import { Suspense, lazy } from 'react'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#030305] flex flex-col">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 -mt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-2 leading-tight">
          Design, Build, Ship <br />
          <span className="bg-gradient-to-r from-[#ff61d8] via-[#8652ff] to-[#43b4ff] text-transparent bg-clip-text">
            Modern Interfaces.
          </span>
        </h1>
        <p className="text-gray-400 max-w-lg mt-4 text-sm md:text-base">
          Frontend Developer specializing in React.js, modern JavaScript, and responsive
          design — turning wireframes into pixel-perfect experiences.
        </p>

        <div className="flex gap-4 mt-10 pointer-events-auto">
          <a href="#projects" data-cursor className="btn-custom btn-primary cursor-pointer">
            View Work
          </a>
          <a href="#contact" data-cursor className="btn-custom cursor-pointer">
            Contact Me
          </a>
        </div>
      </div>

      <div className="relative z-10 pb-8 flex flex-col items-center justify-center text-gray-500 text-sm pointer-events-none">
        <span className="mb-2">Discover My Work</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce text-[#8652ff]">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </section>
  )
}
