import { useEffect, useRef } from 'react'

/* Three.js wireframe torus-knot scene, isolated so `three` loads as its own chunk. */
export default function HeroScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (cancelled) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
      const material = new THREE.MeshPhongMaterial({
        color: 0x6d28d9,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(1, 1, 1)
      scene.add(light)
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))

      camera.position.z = 4

      let rafId
      const animate = () => {
        rafId = requestAnimationFrame(animate)
        mesh.rotation.x += 0.005
        mesh.rotation.y += 0.005
        renderer.render(scene, camera)
      }
      animate()

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

      cleanup = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('resize', handleResize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="heroCanvas"
      className="absolute top-0 left-0 z-[1] block"
      data-cursor
    ></canvas>
  )
}
