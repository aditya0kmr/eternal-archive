import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import useEngineStore from '../../store/engineStore'

/**
 * ChronometricKey - Phase 3.2
 * The romantic 3D entry mechanism with gears and particles
 */
function ChronometricKey() {
  const gearRef = useRef()
  const setLoggedInUser = useEngineStore((state) => state.setLoggedInUser)

  // Animate the gear
  useFrame(() => {
    if (gearRef.current) {
      gearRef.current.rotation.z += 0.005
    }
  })

  const handleUserSelect = (user) => {
    setLoggedInUser(user)
  }

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff69b4" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#ff1493" />

      {/* Title */}
      <Text position={[0, 8, 0]} fontSize={1.5} color="#ff69b4" textAlign="center">
        ETERNAL ARCHIVE
      </Text>

      {/* Main Rotating Gear */}
      <group ref={gearRef} position={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[4, 1, 16, 100]} />
          <meshStandardMaterial
            color="#ff69b4"
            metalness={0.8}
            roughness={0.2}
            emissive="#ff69b4"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Decorative Gear 1 */}
      <mesh position={[-6, 3, 0]}>
        <torusGeometry args={[2.5, 0.8, 16, 100]} />
        <meshStandardMaterial
          color="#ff1493"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Decorative Gear 2 */}
      <mesh position={[6, 3, 0]}>
        <torusGeometry args={[2.5, 0.8, 16, 100]} />
        <meshStandardMaterial
          color="#ffb6c1"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* User Selection Buttons */}
      {/* Button 1 - Aadi */}
      <group>
        <mesh
          position={[-5, -4, 0]}
          onClick={() => handleUserSelect('Aadi')}
        >
          <boxGeometry args={[3, 1.5, 0.5]} />
          <meshStandardMaterial
            color="#ff69b4"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        <Text position={[-5, -4, 0.3]} fontSize={0.6} color="#ffffff" textAlign="center">
          AADI
        </Text>
      </group>

      {/* Button 2 - Nanniii */}
      <group>
        <mesh
          position={[5, -4, 0]}
          onClick={() => handleUserSelect('Nanniii')}
        >
          <boxGeometry args={[3, 1.5, 0.5]} />
          <meshStandardMaterial
            color="#ff1493"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        <Text position={[5, -4, 0.3]} fontSize={0.6} color="#ffffff" textAlign="center">
          NANNIII
        </Text>
      </group>

      {/* Subtitle */}
      <Text position={[0, -8, 0]} fontSize={0.6} color="#ffb6c1" textAlign="center">
        Click a name to begin
      </Text>

      {/* Camera Controls */}
      <OrbitControls autoRotate autoRotateSpeed={2} />
    </>
  )
}

export default ChronometricKey
