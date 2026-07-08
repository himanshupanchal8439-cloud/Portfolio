import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { href: '#home', label: 'Home', theme: 'dark' },
  { href: '#about', label: 'About', theme: 'light' },
  { href: '#skills', label: 'Skills', theme: 'dark' },
  { href: '#experience', label: 'Experience', theme: 'light' },
  { href: '#projects', label: 'Projects', theme: 'dark' },
  { href: '#contact', label: 'Contact', theme: 'light' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const triggers = LINKS.map(({ href, theme: t }) => {
      const section = document.querySelector(href)
      if (!section) return null
      return ScrollTrigger.create({
        trigger: section,
        start: 'top 100',
        end: 'bottom 100',
        onEnter: () => setTheme(t),
        onEnterBack: () => setTheme(t),
      })
    })
    return () => triggers.forEach((t) => t && t.kill())
  }, [])

  const isLight = theme === 'light'

  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
      <nav
        className={`${isLight ? 'glass-nav-light' : 'glass-nav'} rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between`}
      >
        <a
          href="#home"
          className={`text-lg sm:text-xl font-bold tracking-tighter flex items-center gap-2 ${isLight ? 'text-brand-ink' : 'text-white'}`}
          data-cursor
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0"></span>
          Himanshu
        </a>

        <div className={`hidden lg:flex gap-8 text-sm font-medium ${isLight ? 'text-brand-ink/70' : 'text-gray-300'}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" data-cursor>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-cursor
            className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
          >
            Hire Me
          </a>
          <button
            type="button"
            className={`lg:hidden text-2xl ${isLight ? 'text-brand-ink' : 'text-white'}`}
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden ${open ? 'flex' : 'hidden'} ${isLight ? 'glass-nav-light text-brand-ink/80' : 'glass-nav text-gray-300'} mt-3 rounded-2xl flex-col gap-1 px-6 py-4`}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="py-2.5" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mt-3 inline-flex justify-center bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition"
          onClick={() => setOpen(false)}
        >
          Hire Me
        </a>
      </div>
    </header>
  )
}
