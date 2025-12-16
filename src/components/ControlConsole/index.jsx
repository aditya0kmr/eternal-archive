import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import useEngineStore from '../../store/engineStore';

// Lever Component - Interactive mechanism for selecting mechanisms
const Lever = ({ position, label, onSelect, color, isActive }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Lever Handle */}
      <mesh
        ref={meshRef}
        onClick={() => onSelect(label)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 0.5, 0.2]} />
        <meshStandardMaterial
          color={hovered ? '#ff69b4' : color}
          emissive={hovered || isActive ? '#ff69b4' : '#000000'}
          emissiveIntensity={hovered || isActive ? 0.8 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Label */}
      <Text position={[0, -1.5, 0]} fontSize={0.5} color="#ffffff">
        {label}
      </Text>
    </group>
  );
};

// Control Console Platform
const ConsolePlatform = () => {
  return (
    <group>
      {/* Main Platform */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[15, 15, 1, 32]} />
        <meshStandardMaterial
          color="#4a4a6a"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Ambient Light */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 20, 10]} intensity={1} color="#ff69b4" />
      <pointLight position={[-10, 20, -10]} intensity={0.8} color="#ff1493" />
    </group>
  );
};

// Main Console Scene
const ConsoleScene = () => {
  const setCurrentMechanism = useEngineStore((state) => state.setCurrentMechanism);
  const [activeLever, setActiveLever] = useState(null);

  const mechanisms = [
    { label: 'TEMPORAL LOOM', position: [-8, 0, 0], color: '#ff69b4' },
    { label: 'MEMORY PRESS', position: [0, 0, 0], color: '#ff1493' },
    { label: 'DUAL COIL', position: [8, 0, 0], color: '#ffb6c1' },
    { label: 'PNEUMATIC TUBES', position: [-4, 0, -8], color: '#ff69b4' },
    { label: 'BINDING CHAIN', position: [4, 0, -8], color: '#ff1493' },
  ];

  const handleLeverSelect = (mechanismName) => {
    setActiveLever(mechanismName);
    setCurrentMechanism(mechanismName.toLowerCase().replace(/\s+/g, '_'));
  };

  return (
    <>
      <ConsolePlatform />
      
      {mechanisms.map((mech, i) => (
        <Lever
          key={i}
          position={mech.position}
          label={mech.label}
          color={mech.color}
          onSelect={handleLeverSelect}
          isActive={activeLever === mech.label}
        />
      ))}

      <OrbitControls autoRotate autoRotateSpeed={1} />
    </>
  );
};

export default function ControlConsole() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 10, 30], fov: 75 }}>
        <color attach="background" args={['#0a0e27']} />
        <ConsoleScene />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        textAlign: 'center',
        textShadow: '0 0 20px #ff69b4',
        pointerEvents: 'none',
      }}>
        <h1 style={{ fontSize: '2.5em', margin: 0 }}>CONTROL CONSOLE</h1>
        <p style={{ fontSize: '1.1em' }}>Select a mechanism to explore</p>
      </div>
    </div>
  );
}
