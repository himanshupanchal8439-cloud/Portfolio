import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: '#home', label: 'Home' },
  { id: '#about', label: 'About' },
  { id: '#skills', label: 'Skills' },
  { id: '#experience', label: 'Experience' },
  { id: '#projects', label: 'Projects' },
  { id: '#contact', label: 'Contact' },
]

export default function SectionIndicator() {
  const [active, setActive] = useState(0)
  const triggers = useRef([])

  useEffect(() => {
    triggers.current = SECTIONS.map((s, i) => {
      const section = document.querySelector(s.id)
      if (!section) return null
      return ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      })
    })
    return () => triggers.current.forEach((t) => t && t.kill())
  }, [])

  return (
    <nav id="section-indicator" className="text-brand-primary hidden md:flex" aria-label="Sections">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          type="button"
          className={active === i ? 'active' : ''}
          aria-label={s.label}
          onClick={() => document.querySelector(s.id)?.scrollIntoView({ behavior: 'smooth' })}
        />
      ))}
    </nav>
  )
}
