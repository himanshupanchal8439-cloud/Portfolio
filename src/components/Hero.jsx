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
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center px-4 sm:px-6 py-28 md:py-24">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Background Title */}
      <h1 className="absolute inset-0 flex items-center justify-center z-10 text-[22vw] sm:text-[18vw] md:text-[15vw] font-bold text-white/5 select-none leading-none tracking-tighter pointer-events-none whitespace-nowrap">
        DEVELOPER
      </h1>

      {/* Content */}
      <div ref={heroTextRef} className="hero-text-wrapper relative z-20 text-center mt-16 sm:mt-20 px-2">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-handwriting text-purple-500 mb-4 rotate-[-3deg]">
          Frontend Armor
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300">Created for you.</p>
      </div>

      {/* Info Card */}
      <div className="relative z-10 mt-10 md:mt-0 md:absolute md:bottom-12 md:left-12 glass-card p-5 sm:p-6 rounded-3xl w-full max-w-xs sm:max-w-sm mx-auto md:mx-0">
        <h3 className="font-bold text-base sm:text-lg mb-2">CURRENTLY AVAILABLE</h3>
        <p className="text-gray-400 text-sm mb-4">Open to new frontend projects and freelance work this month.</p>
        <a href="#contact" className="text-sm font-semibold flex items-center gap-2 hover:text-purple-400 transition" data-cursor>
          Get in touch <span>→</span>
        </a>
      </div>
    </section>
  )
}
