import { useState } from 'react';
import { OrbitControls, Text } from '@react-three/drei';

/**
 * Dual Coil Capacitor - Phase 3.4
 * Love letter generation interface
 */
const DualCoil = () => {
  const [chargeLevel, setChargeLevel] = useState(0);
  const [selectedMode, setSelectedMode] = useState('romantic');

  const modes = [
    { name: 'ROMANTIC', color: '#ff69b4', position: [-8, 0, 0] },
    { name: 'FLIRTY', color: '#ff1493', position: [8, 0, 0] },
  ];

  return (
    <>
      {/* Platform */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[20, 20, 1, 32]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[15, 25, 15]} intensity={1.2} color="#ff69b4" />

      {/* Coil Mechanism */}
      {modes.map((mode) => (
        <group key={mode.name} position={mode.position}>
          {/* Coil Ring */}
          <mesh onClick={() => setSelectedMode(mode.name.toLowerCase())}>
            <torusGeometry args={[4, 1.5, 16, 100]} />
            <meshStandardMaterial
              color={mode.color}
              metalness={0.8}
              roughness={0.2}
              emissive={selectedMode === mode.name.toLowerCase() ? mode.color : '#000000'}
              emissiveIntensity={selectedMode === mode.name.toLowerCase() ? 0.8 : 0}
            />
          </mesh>
          {/* Mode Label */}
          <Text position={[0, -5.5, 0]} fontSize={0.8} color={mode.color}>
            {mode.name}
          </Text>
        </group>
      ))}

      {/* Charge Level Indicator */}
      <Text position={[0, 10, 0]} fontSize={1.5} color="#ff69b4" textAlign="center">
        DUAL COIL CAPACITOR
      </Text>

      {/* Camera Controls */}
      <OrbitControls autoRotate autoRotateSpeed={2} />
    </>
  );
};

export default DualCoil;
