import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

/**
 * Memory Press Component - Phase 3.3
 * Gallery system with interactive photo plates
 */
const MemoryPress = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const photos = [
    { id: 1, title: 'First Moment', color: '#ff69b4', year: 2023 },
    { id: 2, title: 'Together', color: '#ff1493', year: 2023 },
    { id: 3, title: 'Our Journey', color: '#ffb6c1', year: 2024 },
    { id: 4, title: 'Forever', color: '#ff69b4', year: 2024 },
    { id: 5, title: 'Memories', color: '#ff1493', year: 2025 },
  ];

  return (
    <>
      {/* Platform */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[18, 18, 1, 32]} />
        <meshStandardMaterial color="#3a3a5a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[15, 25, 15]} intensity={1} color="#ff69b4" />

      {/* Photo Grid */}
      {photos.map((photo, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = (col - 1) * 10;
        const z = row * 10;

        return (
          <group key={photo.id} position={[x, 0, z]}>
            {/* Photo Plate */}
            <mesh onClick={() => setSelectedPhoto(i)}>
              <boxGeometry args={[3, 4, 0.2]} />
              <meshStandardMaterial
                color={photo.color}
                metalness={0.8}
                roughness={0.2}
                emissive={selectedPhoto === i ? photo.color : '#000000'}
                emissiveIntensity={selectedPhoto === i ? 0.6 : 0}
              />
            </mesh>
            {/* Photo Label */}
            <Text position={[0, -2.5, 0.15]} fontSize={0.5} color="#ffffff">
              {photo.title}
            </Text>
            <Text position={[0, -3, 0.15]} fontSize={0.3} color="#ffb6c1">
              {photo.year}
            </Text>
          </group>
        );
      })}

      {/* Camera Controls */}
      <OrbitControls autoRotate autoRotateSpeed={1} />

      {/* Title */}
      <Text position={[0, 15, 0]} fontSize={2} color="#ff69b4" textAlign="center">
        MEMORY PRESS
      </Text>
    </>
  );
};

export default MemoryPress;
