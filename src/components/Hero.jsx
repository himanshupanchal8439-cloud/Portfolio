import { useEffect, useRef, Suspense, lazy } from 'react'
import gsap from 'gsap'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

export default function Hero() {
  const heroTextRef = useRef(null)

  /* Subtle 3D tilt on the floating overlay text */
  useEffect(() => {
    const heroText = heroTextRef.current
    if (!heroText) return

    const handleMove = (e) => {
      if (window.innerWidth <= 1024) return
      const xAxis = (window.innerWidth / 2 - e.pageX) / 40
      const yAxis = (window.innerHeight / 2 - e.pageY) / 40
      gsap.to(heroText, {
        rotationY: xAxis,
        rotationX: yAxis,
        duration: 1.5,
        ease: 'power3.out',
        transformPerspective: 1200,
      })
    }
    document.addEventListener('mousemove', handleMove)
    return () => document.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#0d0d0f] flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-full text-center pointer-events-none z-0">
        <h1 className="text-[18vw] font-['Oswald'] font-bold text-white/[0.04] leading-none tracking-tighter select-none whitespace-nowrap">
          DEVELOPER
        </h1>
      </div>

      <Suspense fallback={<div className="absolute inset-0 w-full h-full z-10" />}>
        <HeroScene />
      </Suspense>

      <div ref={heroTextRef} className="hero-text-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-20 flex flex-col items-center justify-center mt-16 md:mt-24">
        <h2
          className="text-7xl md:text-[8vw] font-['Caveat'] text-[#7c3aed] -rotate-3 transform translate-y-10"
          style={{ textShadow: '0 4px 30px rgba(124, 58, 237, 0.3)' }}
        >
          Frontend Armor
        </h2>
        <p className="text-3xl md:text-5xl font-['Caveat'] text-white mt-2 md:mt-4 ml-16 md:ml-48 -rotate-3">
          Created for you.
        </p>
      </div>

      <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-end z-30 pointer-events-none">
        <div className="pointer-events-auto mb-8 md:mb-0 max-w-[280px]">
          <h3 className="text-white font-['Oswald'] text-lg tracking-widest uppercase mb-3">Limited Pre-orders</h3>
          <p className="text-white/50 text-sm font-sans leading-relaxed">
            Own the next-generation web interface engineered for your comfort and bold individuality.
          </p>
        </div>

        <div className="pointer-events-auto bg-[#1a1a1c]/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 max-w-[320px] w-full shadow-2xl transition-colors hover:bg-[#1a1a1c]/80 hover:border-white/20">
          <h3 className="text-white font-['Oswald'] text-xl tracking-wide uppercase mb-3 leading-tight">
            This Month's<br />Exclusive
          </h3>
          <p className="text-white/50 text-sm font-sans mb-8 leading-relaxed">
            Collaborate now and unlock exclusive development pricing on full-stack builds this month.
          </p>
          <a href="#contact" className="flex items-center justify-between text-white/80 hover:text-white text-sm transition-colors group">
            See more info
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
