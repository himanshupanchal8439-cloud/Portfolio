import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useRevealLine() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tween = gsap.from(el, {
      yPercent: 115,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    })
    return () => tween.scrollTrigger?.kill()
  }, [])

  return ref
}
