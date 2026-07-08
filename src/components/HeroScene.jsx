import { useEffect, useRef } from 'react'

/* Three.js glass-tube + glowing diamond + orbiting cubes scene, isolated so `three` loads as its own chunk. */
export default function HeroScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (cancelled) return

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x030305, 0.03)

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 0, 20)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      container.appendChild(renderer.domElement)

      const sceneGroup = new THREE.Group()
      scene.add(sceneGroup)

      const disposables = []

      // Glass tube
      const tubeGeo = new THREE.CylinderGeometry(2, 2, 40, 64)
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      })
      const glassTube = new THREE.Mesh(tubeGeo, glassMat)
      glassTube.rotation.z = Math.PI / 4
      glassTube.rotation.x = Math.PI / 6
      sceneGroup.add(glassTube)
      disposables.push(tubeGeo, glassMat)

      // Metallic rings
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.9, roughness: 0.3 })
      disposables.push(ringMat)
      for (let i = -15; i <= 15; i += 10) {
        const ringGeo = new THREE.CylinderGeometry(2.05, 2.05, 0.5, 64)
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.y = i
        glassTube.add(ring)
        disposables.push(ringGeo)
      }

      // Inner glowing diamond
      const diamondGeo = new THREE.OctahedronGeometry(1)
      const diamondMat = new THREE.MeshStandardMaterial({
        color: 0x8652ff,
        emissive: 0x43b4ff,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      })
      const diamond = new THREE.Mesh(diamondGeo, diamondMat)
      glassTube.add(diamond)
      disposables.push(diamondGeo, diamondMat)

      // Curved dark track
      const trackGeo = new THREE.TorusGeometry(12, 1.2, 32, 100, Math.PI * 1.5)
      const trackMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.6, roughness: 0.7 })
      const track = new THREE.Mesh(trackGeo, trackMat)
      track.rotation.x = Math.PI / 2.2
      track.position.z = 2
      track.position.y = -5
      sceneGroup.add(track)
      disposables.push(trackGeo, trackMat)

      // Glowing cubes orbiting the track
      const cubes = []
      const cubeColors = [0xff61d8, 0x43b4ff, 0x00ff88]
      for (let i = 0; i < 3; i++) {
        const cubeGroup = new THREE.Group()

        const boxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5)
        const boxMat = new THREE.MeshStandardMaterial({
          color: 0x333333,
          metalness: 0.8,
          roughness: 0.2,
          transparent: true,
          opacity: 0.8,
        })
        const box = new THREE.Mesh(boxGeo, boxMat)

        const innerGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8)
        const innerMat = new THREE.MeshBasicMaterial({ color: cubeColors[i] })
        const innerBox = new THREE.Mesh(innerGeo, innerMat)

        const glow = new THREE.PointLight(cubeColors[i], 2, 10)

        cubeGroup.add(box)
        cubeGroup.add(innerBox)
        cubeGroup.add(glow)
        sceneGroup.add(cubeGroup)

        disposables.push(boxGeo, boxMat, innerGeo, innerMat)
        cubes.push({ mesh: cubeGroup, angle: i * ((Math.PI * 1.5) / 3) })
      }

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const dirLight = new THREE.DirectionalLight(0xffffff, 2)
      dirLight.position.set(10, 20, 10)
      scene.add(dirLight)
      const backLight = new THREE.PointLight(0x43b4ff, 1, 50)
      backLight.position.set(-10, -10, -10)
      scene.add(backLight)

      // Mouse parallax
      let mouseX = 0
      let mouseY = 0
      let targetX = 0
      let targetY = 0
      const handleMouseMove = (e) => {
        mouseX = e.clientX - window.innerWidth / 2
        mouseY = e.clientY - window.innerHeight / 2
      }
      document.addEventListener('mousemove', handleMouseMove)

      const clock = new THREE.Clock()
      let rafId
      const torusRadius = 12

      const animate = () => {
        rafId = requestAnimationFrame(animate)
        const elapsedTime = clock.getElapsedTime()

        diamond.rotation.y = elapsedTime * 0.5
        diamond.rotation.z = elapsedTime * 0.2
        glassTube.rotation.x = Math.PI / 6 + Math.sin(elapsedTime * 0.2) * 0.05

        cubes.forEach((cubeObj, index) => {
          cubeObj.angle += 0.005
          const x = Math.cos(cubeObj.angle) * torusRadius
          const z = Math.sin(cubeObj.angle) * torusRadius
          cubeObj.mesh.position.set(x, track.position.y, z + track.position.z)
          cubeObj.mesh.rotation.x = elapsedTime * 0.5 + index
          cubeObj.mesh.rotation.y = elapsedTime * 0.5
        })

        targetX = mouseX * 0.0005
        targetY = mouseY * 0.0005
        sceneGroup.rotation.y += 0.05 * (targetX - sceneGroup.rotation.y)
        sceneGroup.rotation.x += 0.05 * (targetY - sceneGroup.rotation.x)

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
        document.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
        disposables.forEach((d) => d.dispose())
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
