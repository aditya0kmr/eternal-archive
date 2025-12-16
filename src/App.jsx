import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

function SimpleScene() {
  return (
    
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Main Gear */}
      <mesh position={[0, 0, 0]} rotation={[0.4, 0.3, 0]}>
        <boxGeometry args={[4, 4, 4]} />
                <meshStandardMaterial color="#ff69b4" metalness={0.8} roughness={0.2} />
                </mesh>
      
      {/* Decorative spheres */}
      <mesh position={[-4, 2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ff1493" />
      </mesh>
      
      <mesh position={[4, 2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
      
{/* Text components removed - Three.js Text requires font prop with URL. TODO: Add font loading and re-enable text elements */}      
      
      <OrbitControls autoRotate autoRotateSpeed={2} />
              </>
  )
}

function App() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#0a0e27' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }} gl={{ antialias: true } frameloop="always" }}
        <Suspense fallback={null}>
          <SimpleScene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
