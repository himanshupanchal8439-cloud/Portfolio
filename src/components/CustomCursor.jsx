import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    const handleMove = (e) => {
      window.__mouseX = e.clientX
      window.__mouseY = e.clientY
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3 })
    }
    window.addEventListener('mousemove', handleMove)

    const onEnter = () => ring.classList.add('is-hover')
    const onLeave = () => ring.classList.remove('is-hover')

    const attach = () => {
      document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      observer.disconnect()
      document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor-ring" ref={ringRef} aria-hidden="true"></div>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true"></div>
    </>
  )
}
