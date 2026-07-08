import { useEffect, useRef } from 'react'

/* Three.js particle field, isolated so `three` loads as its own chunk. */
export default function AboutScene() {
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

      const geometry = new THREE.BufferGeometry()
      const count = 2500
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.6,
      })

      const particles = new THREE.Points(geometry, material)
      scene.add(particles)

      camera.position.z = 5

      let rafId
      const animate = () => {
        rafId = requestAnimationFrame(animate)
        particles.rotation.y += 0.001
        particles.rotation.x += 0.0005
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

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" data-cursor></div>
}
