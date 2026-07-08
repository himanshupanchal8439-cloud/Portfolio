import { useEffect, useRef } from 'react'

/* Three.js torus-knot scene, isolated so `three` loads as its own chunk. */
export default function HeroScene() {
  const canvasContainerRef = useRef(null)

  useEffect(() => {
    const container = canvasContainerRef.current
    if (!container) return

    let cancelled = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (cancelled) return

      let mouseX = window.innerWidth / 2
      let mouseY = window.innerHeight / 2
      const handleMouseMove = (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
      }
      window.addEventListener('mousemove', handleMouseMove)

      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
      camera.position.z = 6

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      const geometry = new THREE.TorusKnotGeometry(1.4, 0.55, 200, 64)
      const material = new THREE.MeshStandardMaterial({
        color: 0x111116,
        metalness: 0.9,
        roughness: 0.15,
      })
      const mainObject = new THREE.Mesh(geometry, material)
      scene.add(mainObject)

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
      scene.add(ambientLight)

      const lightPurple = new THREE.PointLight(0x7c3aed, 15, 20)
      lightPurple.position.set(4, 2, 2)
      scene.add(lightPurple)

      const lightWarm = new THREE.PointLight(0xd4af37, 10, 20)
      lightWarm.position.set(-4, 3, 2)
      scene.add(lightWarm)

      const backLight = new THREE.PointLight(0xffffff, 8, 20)
      backLight.position.set(0, -2, -4)
      scene.add(backLight)

      let targetX = 0
      let targetY = 0
      const clock = new THREE.Clock()
      let rafId

      const animate = () => {
        rafId = requestAnimationFrame(animate)
        const elapsedTime = clock.getElapsedTime()

        mainObject.position.y = Math.sin(elapsedTime * 2) * 0.1
        mainObject.rotation.y += 0.002
        mainObject.rotation.x += 0.001

        const windowHalfX = window.innerWidth / 2
        const windowHalfY = window.innerHeight / 2
        const mX = (mouseX - windowHalfX) * 0.001
        const mY = (mouseY - windowHalfY) * 0.001

        targetX = mX * 0.5
        targetY = mY * 0.5

        scene.rotation.x += 0.05 * (targetY - scene.rotation.x)
        scene.rotation.y += 0.05 * (targetX - scene.rotation.y)

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
        window.removeEventListener('mousemove', handleMouseMove)
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

  return (
    <div
      ref={canvasContainerRef}
      id="canvas-container"
      className="absolute inset-0 w-full h-full cursor-crosshair z-10"
      data-cursor
    ></div>
  )
}
