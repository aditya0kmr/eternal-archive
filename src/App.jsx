import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const App = () => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const meshesRef = useRef([])

  useEffect(() => {
    if (!containerRef.current) return

    // Scene Setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0e27)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 2, 8)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1.5)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Main Pink Cube
    const boxGeometry = new THREE.BoxGeometry(3, 3, 3)
    const pinkMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 })
    const box = new THREE.Mesh(boxGeometry, pinkMaterial)
    box.position.set(0, 0, 0)
    box.rotation.set(0.3, 0.4, 0)
    scene.add(box)
    meshesRef.current.push(box)

    // Left Sphere (Magenta)
    const sphereGeometry1 = new THREE.SphereGeometry(0.8, 32, 32)
    const magentaMaterial = new THREE.MeshPhongMaterial({ color: 0xff1493 })
    const sphere1 = new THREE.Mesh(sphereGeometry1, magentaMaterial)
    sphere1.position.set(-4, 2, 0)
    scene.add(sphere1)
    meshesRef.current.push(sphere1)

    // Right Sphere (Light Pink)
    const sphereGeometry2 = new THREE.SphereGeometry(0.8, 32, 32)
    const lightPinkMaterial = new THREE.MeshPhongMaterial({ color: 0xffb6c1 })
    const sphere2 = new THREE.Mesh(sphereGeometry2, lightPinkMaterial)
    sphere2.position.set(4, 2, 0)
    scene.add(sphere2)
    meshesRef.current.push(sphere2)

    // Animation Loop
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate all meshes
      meshesRef.current.forEach(mesh => {
        mesh.rotation.x += 0.002
        mesh.rotation.y += 0.003
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        background: '#0a0e27',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    />
  )
}

export default App
