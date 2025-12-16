import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function ControlConsole() {
  const meshRef = useRef()
feat: Add ControlConsole R3F stub component  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[15, 15, 2, 32]} />
        <meshStandardMaterial color="#00ff88" wireframe />
      </mesh>
      <text position={[0, 5, 0]} fontSize={2} color="#ff69b4">CONTROL CONSOLE</text>
    </group>
  )
}

export default ControlConsole
