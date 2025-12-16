import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import useEngineStore from '../../store/engineStore';

/**
 * TemporalLoom Component
 * Timeline-based milestone system with interactive dioramas
 */
const Milestone = ({ position, milestone, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Milestone Sphere */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#ff69b4' : '#ff1493'}
          emissive={hovered ? '#ff69b4' : '#000000'}
          emissiveIntensity={hovered ? 0.8 : 0}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Milestone Label */}
      <Text position={[0, -2.5, 0]} fontSize={0.6} color="#ffffff">
        {milestone.title}
      </Text>
      {/* Date Label */}
      <Text position={[0, -3.2, 0]} fontSize={0.4} color="#ff69b4">
        {milestone.date}
      </Text>
    </group>
  );
};

const TimelineConnector = ({ start, end }) => {
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([start[0], start[1], start[2], end[0], end[1], end[2]])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ff69b4" linewidth={2} />
    </line>
  );
};

const TemporalLoom = ({ milestones = null }) => {
  const defaultMilestones = [
    { title: 'First Meeting', date: '2023-01-15', location: 'Sharda University' },
    { title: 'Movie Night', date: '2023-06-20', location: 'PVR Cinema' },
    { title: 'Dehradun Trip', date: '2024-07-15', location: 'Dehradun, Uttarakhand' },
  ];

  const data = milestones || defaultMilestones;
  const startX = -(data.length - 1) * 10 / 2;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 20, 10]} intensity={1} color="#ff69b4" />
      <pointLight position={[-10, 20, -10]} intensity={0.8} color="#ff1493" />

      {/* Timeline Connector Line */}
      {data.length > 1 && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                startX, 0, 0,
                startX + (data.length - 1) * 10, 0, 0,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ff69b4" linewidth={3} />
        </line>
      )}

      {/* Milestones */}
      {data.map((m, i) => (
        <Milestone
          key={i}
          position={[startX + i * 10, 0, 0]}
          milestone={m}
          index={i}
        />
      ))}

      {/* Camera Controls */}
      <OrbitControls autoRotate autoRotateSpeed={1.5} />

      {/* Title in 3D Space */}
      <Text position={[0, 15, 0]} fontSize={2} color="#ff69b4" textAlign="center">
        TEMPORAL LOOM
      </Text>
    </>
  );
};

export default TemporalLoom;
