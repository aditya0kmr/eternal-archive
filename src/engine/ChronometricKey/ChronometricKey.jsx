import { Mesh } from 'three'
import { useRef, useEffect } from 'react'
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
    <group onClick={handleClick}>
      <mesh ref={meshRef}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="#ff69b4" wireframe />
      </mesh>
    </group>
  )
}

export default ChronometricKey
