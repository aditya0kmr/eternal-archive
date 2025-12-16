import { Mesh } from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useEngineStore from '../../store/engineStore'

function ChronometricKey() {
  const meshRef = useRef()
  const setLoggedInUser = useEngineStore((state) => state.setLoggedInUser)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.01
    }
  })

  const handleClick = () => {
    // V1: Mock unlock with Aadi user
    setLoggedInUser('Aadi')
  }

  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ambientLight intensity={0.6} />
      <group onClick={handleClick}>
        <mesh ref={meshRef}>
          <boxGeometry args={[15, 15, 15]} />
          <meshStandardMaterial color="#ff69b4" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </>
  )
}

export default ChronometricKey
