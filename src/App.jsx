import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * AETHEL ENGINE - Phase 3: Complete Rendering System
 * Eternal Archive - 3D Romantic Digital Memory Vault
 * 
 * Architecture: Control Console Hub with interactive 3D mechanisms
 * Features: Rotating gears, animated scene, perfect rendering foundation
 * */

const App = () => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const meshesRef = useRef([])
  const animationIdRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    try {
      // ========== SCENE SETUP ==========
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0a0e27) // Deep space blue
      scene.fog = new THREE.Fog(0x0a0e27, 100, 1000)
      sceneRef.current = scene

      // ========== CAMERA SETUP ==========
      const width = window.innerWidth
      const height = window.innerHeight
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000)
      camera.position.set(0, 3, 8)
      cameraRef.current = camera

      // ========== RENDERER SETUP ==========
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        precision: 'highp'
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFShadowShadowMap
      containerRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // ========== LIGHTING SYSTEM ==========
      // Ambient light for overall illumination
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      // Main directional light
      const mainLight = new THREE.DirectionalLight(0xffffff, 1.2)
      mainLight.position.set(10, 15, 10)
      mainLight.castShadow = true
      mainLight.shadow.camera.left = -50
      mainLight.shadow.camera.right = 50
      mainLight.shadow.camera.top = 50
      mainLight.shadow.camera.bottom = -50
      mainLight.shadow.mapSize.width = 2048
      mainLight.shadow.mapSize.height = 2048
      scene.add(mainLight)

      // Accent lights for 3D depth
      const pointLight1 = new THREE.PointLight(0xff69b4, 0.8, 100) // Pink
      pointLight1.position.set(-5, 5, 5)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0x00ffff, 0.6, 100) // Cyan
      pointLight2.position.set(5, 5, -5)
      scene.add(pointLight2)

      // ========== CORE GEOMETRY: ROTATING GEARS (Control Console Foundation) ==========
      
      // Central gear (main hub)
      const centralGeoGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32)
      const centralMaterial = new THREE.MeshStandardMaterial({
        color: 0xff69b4,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0xff69b4,
        emissiveIntensity: 0.3
      })
      const centralGear = new THREE.Mesh(centralGeoGeometry, centralMaterial)
      centralGear.castShadow = true
      centralGear.receiveShadow = true
      scene.add(centralGear)
      meshesRef.current.push({ mesh: centralGear, rotationSpeed: 0.003 })

      // Left satellite sphere
      const sphereGeo1 = new THREE.SphereGeometry(0.6, 32, 32)
      const sphereMat1 = new THREE.MeshStandardMaterial({
        color: 0xff1493,
        metalness: 0.5,
        roughness: 0.3,
        emissive: 0xff1493,
        emissiveIntensity: 0.4
      })
      const sphere1 = new THREE.Mesh(sphereGeo1, sphereMat1)
      sphere1.position.set(-3.5, 2, 0)
      sphere1.castShadow = true
      sphere1.receiveShadow = true
      scene.add(sphere1)
      meshesRef.current.push({ mesh: sphere1, rotationSpeed: 0.005 })

      // Right satellite sphere
      const sphereGeo2 = new THREE.SphereGeometry(0.6, 32, 32)
      const sphereMat2 = new THREE.MeshStandardMaterial({
        color: 0xffb6c1,
        metalness: 0.5,
        roughness: 0.3,
        emissive: 0xffb6c1,
        emissiveIntensity: 0.3
      })
      const sphere2 = new THREE.Mesh(sphereGeo2, sphereMat2)
      sphere2.position.set(3.5, 2, 0)
      sphere2.castShadow = true
      sphere2.receiveShadow = true
      scene.add(sphere2)
      meshesRef.current.push({ mesh: sphere2, rotationSpeed: -0.005 })

      // Bottom platform (Control Console base)
      const platformGeo = new THREE.CylinderGeometry(4, 4, 0.2, 64)
      const platformMat = new THREE.MeshStandardMaterial({
        color: 0x2a3f5f,
        metalness: 0.8,
        roughness: 0.1
      })
      const platform = new THREE.Mesh(platformGeo, platformMat)
      platform.position.y = -2
      platform.receiveShadow = true
      scene.add(platform)

      // Decorative ring around central gear
      const ringGeo = new THREE.TorusGeometry(2.8, 0.1, 16, 100)
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
        metalness: 0.6,
        roughness: 0.2
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 4
      ring.castShadow = true
      scene.add(ring)

      // ========== ANIMATION LOOP ==========
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate)

        // Rotate all meshes
        meshesRef.current.forEach(item => {
          item.mesh.rotation.x += item.rotationSpeed * 0.5
          item.mesh.rotation.y += item.rotationSpeed
          item.mesh.rotation.z += item.rotationSpeed * 0.3
        })

        // Subtle camera orbit for immersion
        const time = Date.now() * 0.0001
        const cameraDistance = 8.5
        camera.position.x = Math.sin(time) * cameraDistance
        camera.position.z = Math.cos(time) * cameraDistance
        camera.lookAt(0, 1, 0)

        renderer.render(scene, camera)
      }

      animate()

      // ========== WINDOW RESIZE HANDLER ==========
      const handleResize = () => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight
        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        renderer.setSize(newWidth, newHeight)
      }

      window.addEventListener('resize', handleResize)

      // ========== CLEANUP ==========
      return () => {
        window.removeEventListener('resize', handleResize)
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
        }
        if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement)
        }
        renderer.dispose()
        centralGeoGeometry.dispose()
        centralMaterial.dispose()
        sphereGeo1.dispose()
        sphereMat1.dispose()
        sphereGeo2.dispose()
        sphereMat2.dispose()
        platformGeo.dispose()
        platformMat.dispose()
        ringGeo.dispose()
        ringMat.dispose()
      }
    } catch (error) {
      console.error('Three.js Scene Error:', error)
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div style="color: red; padding: 20px;">Error: ' + error.message + '</div>'
      }
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
        background: '#0a0e27',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: '#ff69b4',
        fontFamily: 'Courier New, monospace',
        fontSize: '14px',
        zIndex: 10,
        textShadow: '0 0 10px #ff69b4'
      }}>
        <h2 style={{ margin: '0 0 10px 0' }}>⚙️ AETHEL ENGINE - PHASE 3</h2>
        <p style={{ margin: '5px 0' }}>Status: 🟡 RENDERING ACTIVE</p>
        <p style={{ margin: '5px 0', fontSize: '12px' }}>Control Console: Initialized</p>
      </div>
    </div>
  )
}

export default App
