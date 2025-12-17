import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PresentationControls } from '@react-three/drei'
import { Suspense } from 'react'

// Main 3D Scene Component
function Scene() {
  const groupRef = useRef()
  const { scene } = useThree()

  useEffect(() => {
    // Ensure scene background is set
    scene.background.setHex(0x0a0e27)
  }, [scene])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.005
      groupRef.current.rotation.y += 0.008
    }
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[15, 15, 15]} intensity={1.2} />
      <pointLight position={[-15, -10, -15]} intensity={0.8} color="#ff69b4" />

      {/* Main Pink Cube */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshPhongMaterial color="#ff69b4" shininess={100} />
      </mesh>

      {/* Left Decorative Sphere */}
      <mesh position={[-4, 2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial color="#ff1493" shininess={80} />
      </mesh>

      {/* Right Decorative Sphere */}
      <mesh position={[4, 2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial color="#ffb6c1" shininess={60} />
      </mesh>

      {/* Bottom Accent Spheres */}
      <mesh position={[-2, -2, 2]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial color="#ff85c0" emissive="#ff69b4" emissiveIntensity={0.3} />
      </mesh>

      <mesh position={[2, -2, -2]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial color="#ffc0cb" emissive="#ff1493" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

// Loading Fallback
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ff69b4" wireframe />
    </mesh>
  )
}

// Main App Component
export default function App() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      background: '#0a0e27'
    }}>
      <Canvas
        camera={{
          position: [0, 2, 8],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          precision: 'highp',
          pixelRatio: Math.min(window.devicePixelRatio, 2)
        }}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
        shadows
      >
        <color attach="background" args={['#0a0e27']} />
        <fog attach="fog" args={['#0a0e27', 10, 50]} />
        
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
        
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
