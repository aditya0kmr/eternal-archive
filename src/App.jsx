import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const App = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    try {
      // Scene setup
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0a0e27)

      // Camera
      const width = window.innerWidth
      const height = window.innerHeight
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
      camera.position.set(0, 3, 8)

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xff69b4, 1.5)
      pointLight.position.set(10, 10, 10)
      scene.add(pointLight)

      // Central Gear
      const centralGeo = new THREE.CylinderGeometry(2, 2, 0.5, 32)
      const centralMat = new THREE.MeshPhongMaterial({ color: 0xff69b4 })
      const centralGear = new THREE.Mesh(centralGeo, centralMat)
      scene.add(centralGear)

      // Left Sphere
      const sphereGeo1 = new THREE.SphereGeometry(0.6, 32, 32)
      const sphereMat1 = new THREE.MeshPhongMaterial({ color: 0xff1493 })
      const sphere1 = new THREE.Mesh(sphereGeo1, sphereMat1)
      sphere1.position.set(-3.5, 2, 0)
      scene.add(sphere1)

      // Right Sphere
      const sphereGeo2 = new THREE.SphereGeometry(0.6, 32, 32)
      const sphereMat2 = new THREE.MeshPhongMaterial({ color: 0xffb6c1 })
      const sphere2 = new THREE.Mesh(sphereGeo2, sphereMat2)
      sphere2.position.set(3.5, 2, 0)
      scene.add(sphere2)

      // Platform
      const platformGeo = new THREE.CylinderGeometry(4, 4, 0.2, 64)
      const platformMat = new THREE.MeshPhongMaterial({ color: 0x2a3f5f })
      const platform = new THREE.Mesh(platformGeo, platformMat)
      platform.position.y = -2
      scene.add(platform)

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)

        centralGear.rotation.x += 0.002
        centralGear.rotation.y += 0.003
        sphere1.rotation.y += 0.005
        sphere2.rotation.y -= 0.005

        // Camera orbital movement
        const time = Date.now() * 0.0001
        camera.position.x = Math.sin(time) * 8.5
        camera.position.z = Math.cos(time) * 8.5
        camera.lookAt(0, 1, 0)

        renderer.render(scene, camera)
      }
      animate()

      // Window resize handler
      const handleResize = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', handleResize)

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize)
        containerRef.current?.removeChild(renderer.domElement)
        renderer.dispose()
      }
    } catch (error) {
      console.error('Render Error:', error)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    />
  )
}

export default App
