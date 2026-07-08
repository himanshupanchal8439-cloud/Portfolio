import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useMagnetic from '../hooks/useMagnetic.js'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const hireRef = useMagnetic()

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 60,
      onUpdate: (self) => {
        navRef.current?.classList.toggle('shadow-lg', self.scroll() > 60)
      },
    })
    return () => trigger.kill()
  }, [])

  return (
    <header id="navbar" ref={navRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <nav className="px-6 md:px-10 py-4 flex items-center justify-between glass-light">
        <a href="#home" className="h-editorial text-xl text-brand-primary" data-cursor>
          HP<span className="h-italic text-brand-secondary">.dev</span>
        </a>
        <ul className="hidden lg:flex items-center gap-10 eyebrow text-brand-ink/70">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-line" data-cursor>{l.label}</a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          ref={hireRef}
          className="magnetic hidden lg:inline-flex bg-brand-primary text-brand-cream eyebrow px-6 py-3 rounded-full"
          data-cursor
        >
          Hire Me
        </a>
        <button
          type="button"
          className="lg:hidden text-2xl text-brand-primary"
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </nav>
      <div className={`lg:hidden ${open ? 'flex' : 'hidden'} flex-col gap-1 px-6 pb-6 glass-light eyebrow text-brand-ink/80`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="py-2.5" onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a
          href="#contact"
          className="mt-3 inline-flex justify-center bg-brand-primary text-brand-cream px-6 py-3 rounded-full"
          onClick={() => setOpen(false)}
        >
          Hire Me
        </a>
      </div>
    </header>
  )
}
