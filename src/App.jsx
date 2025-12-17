import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0.3, 0.4, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshPhongMaterial color="#ff69b4" />
    </mesh>
  )
}

function Sphere1() {
  return (
    <mesh position={[-4, 2, 0]}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshPhongMaterial color="#ff1493" />
    </mesh>
  )
}

function Sphere2() {
  return (
    <mesh position={[4, 2, 0]}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshPhongMaterial color="#ffb6c1" />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Box />
      <Sphere1 />
      <Sphere2 />
      <OrbitControls autoRotate autoRotateSpeed={3} />
    </>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#0a0e27' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
