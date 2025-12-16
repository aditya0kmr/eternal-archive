import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

/**
 * TemporalLoom Component
 * Timeline-based milestone system (2-3 milestones)
 */

const Milestone = ({ position, milestone, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#ff69b4' : '#ff1493'}
          emissive={hovered ? '#ff69b4' : '#000000'}
          emissiveIntensity={hovered ? 0.8 : 0}
        />
      </mesh>
      <Text position={[0, -2.5, 0]} fontSize={0.6} color="#ffffff">
        {milestone.title}
      </Text>
    </group>
  );
};

const TimelineScene = ({ milestones }) => {
  const startX = -(milestones.length - 1) * 10 / 2;

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff69b4" />
      {milestones.map((m, i) => (
        <Milestone key={i} position={[startX + i * 10, 0, 0]} milestone={m} index={i} />
      ))}
      <OrbitControls autoRotate autoRotateSpeed={2} />
    </>
  );
};

export default function TemporalLoom({ milestones = null }) {
  const defaultMilestones = [
    { title: 'First Meeting', date: '2023-01-15' },
    { title: 'Relationship Milestone', date: '2023-06-20' },
    { title: 'Forever Promise', date: '2024-12-31' },
  ];

  const data = milestones || defaultMilestones;

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 5, 30] }}>
        <TimelineScene milestones={data} />
      </Canvas>
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'white',
        pointerEvents: 'none',
      }}>
        <h1 style={{ fontSize: '2.5em', margin: 0, textShadow: '0 0 20px #ff69b4' }}>
          TEMPORAL LOOM
        </h1>
      </div>
    </div>
  );
}
