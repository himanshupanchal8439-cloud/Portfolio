import { useEffect, useRef } from 'react'

/* Three.js rotating sphere particle field, isolated so `three` loads as its own chunk. */
export default function SkillsScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (cancelled) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      const group = new THREE.Group()
      scene.add(group)

      const geometry = new THREE.SphereGeometry(15, 32, 32)
      const material = new THREE.PointsMaterial({
        color: 0x6366f1,
        size: 0.1,
        transparent: true,
        opacity: 0.4,
      })
      const particles = new THREE.Points(geometry, material)
      group.add(particles)

      camera.position.z = 30

      let rafId
      const animate = () => {
        rafId = requestAnimationFrame(animate)
        group.rotation.y += 0.002
        group.rotation.x += 0.001
        renderer.render(scene, camera)
      }
      animate()

      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
      }
      window.addEventListener('resize', handleResize)

      cleanup = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('resize', handleResize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-[1]" data-cursor></div>
}
