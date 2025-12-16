import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, TorusGeometry } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ChronometricKey Component
 * 
 * A 3D interactive gear system with:
 * - 3 rotating interlocking gears
 * - Click detection and gear interaction
 * - Particle effects
 * - Starfield background
 * - User selection interface
 */

// Gear Component
const Gear = ({ position, radius, color, rotationSpeed, onClick, isSelected }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += rotationSpeed;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <torusGeometry args={[radius, radius * 0.15, 32, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={isHovered || isSelected ? color : '#000000'}
        emissiveIntensity={isHovered || isSelected ? 0.8 : 0}
        wireframe={true}
      />
      {/* Gear teeth */}
      {Array.from({ length: Math.floor(radius * 3) }).map((_, i) => (
        <mesh key={i} position={[radius * Math.cos(i * 0.2), radius * Math.sin(i * 0.2), 0]}>
          <boxGeometry args={[radius * 0.1, radius * 0.2, radius * 0.1]} />
          <meshStandardMaterial color={color} wireframe={true} />
        </mesh>
      ))}
    </mesh>
  );
};

// Particle System
const ParticleSystem = ({ count = 800 }) => {
  const pointsRef = useRef();
  const positionArray = useRef(new Float32Array(count * 3));
  const velocityArray = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positionArray.current[i * 3] = (Math.random() - 0.5) * 50;
      positionArray.current[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positionArray.current[i * 3 + 2] = (Math.random() - 0.5) * 50;

      velocityArray.current[i * 3] = (Math.random() - 0.5) * 0.1;
      velocityArray.current[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocityArray.current[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      for (let i = 0; i < count; i++) {
        positionArray.current[i * 3] += velocityArray.current[i * 3];
        positionArray.current[i * 3 + 1] += velocityArray.current[i * 3 + 1];
        positionArray.current[i * 3 + 2] += velocityArray.current[i * 3 + 2];

        // Boundary wrapping
        if (Math.abs(positionArray.current[i * 3]) > 25)
          velocityArray.current[i * 3] *= -1;
        if (Math.abs(positionArray.current[i * 3 + 1]) > 25)
          velocityArray.current[i * 3 + 1] *= -1;
        if (Math.abs(positionArray.current[i * 3 + 2]) > 25)
          velocityArray.current[i * 3 + 2] *= -1;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={positionArray.current}
        />
      </bufferGeometry>
      <pointsMaterial color="#ff69b4" size={0.2} />
    </points>
  );
};

// Starfield Background
const Starfield = ({ count = 1500 }) => {
  const pointsRef = useRef();

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const color = new THREE.Color().setHSL(0.6, 0.2, Math.random() * 0.5 + 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.array = positions;
      pointsRef.current.geometry.attributes.color.array = colors;
    }
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.0001;
    }
  });

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

    const color = new THREE.Color().setHSL(0.6, 0.2, Math.random() * 0.5 + 0.5);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={positions}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          itemSize={3}
          array={colors}
        />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.5} />
    </points>
  );
};

// Scene Content
const SceneContent = ({ selectedGear, onGearSelect }) => {
  const [gearStates, setGearStates] = useState({
    gear1: { speed: 0.01, selected: false },
    gear2: { speed: -0.02, selected: false },
    gear3: { speed: 0.015, selected: false },
  });

  const handleGearClick = (gearName) => {
    setGearStates(prev => ({
      ...prev,
      [gearName]: { ...prev[gearName], selected: !prev[gearName].selected }
    }));
    onGearSelect(gearName);
  };

  return (
    <>
      <Starfield count={1500} />
      <ParticleSystem count={800} />

      {/* Main Gears */}
      <Gear
        position={[0, 0, 0]}
        radius={15}
        color="#ff69b4"
        rotationSpeed={gearStates.gear1.speed}
        onClick={() => handleGearClick('gear1')}
        isSelected={gearStates.gear1.selected}
      />
      <Gear
        position={[20, 0, 0]}
        radius={10}
        color="#ff1493"
        rotationSpeed={gearStates.gear2.speed}
        onClick={() => handleGearClick('gear2')}
        isSelected={gearStates.gear2.selected}
      />
      <Gear
        position={[-20, 15, 0]}
        radius={8}
        color="#ffb6c1"
        rotationSpeed={gearStates.gear3.speed}
        onClick={() => handleGearClick('gear3')}
        isSelected={gearStates.gear3.selected}
      />

      {/* Lighting */}
      <pointLight position={[10, 20, 10]} intensity={0.8} color="#ff69b4" />
      <pointLight position={[-10, -20, 10]} intensity={0.8} color="#ff1493" />
      <ambientLight intensity={0.4} />

      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enableZoom={true}
        enablePan={true}
      />
    </>
  );
};

// Main Component
export default function ChronometricKey() {
  const [selectedGear, setSelectedGear] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleGearSelect = (gear) => {
    setSelectedGear(gear);
    // Check if all gears are selected for unlock
    if (gear) {
      console.log('Gear selected:', gear);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <SceneContent selectedGear={selectedGear} onGearSelect={handleGearSelect} />
      </Canvas>

      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          fontSize: '3em',
          margin: 0,
          textShadow: '0 0 20px #ff69b4',
          fontFamily: 'monospace',
        }}>
          CHRONOMETRIC KEY
        </h1>
        <p style={{
          fontSize: '1.2em',
          marginTop: '10px',
          color: '#ff69b4',
        }}>
          Click the gears to align
        </p>
      </div>

      {/* User Selection Panel */}
      {!selectedUser && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '20px',
          pointerEvents: 'auto',
        }}>
          <button
            onClick={() => handleUserSelect('Aadi')}
            style={{
              padding: '10px 30px',
              fontSize: '1.1em',
              background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
              border: '2px solid #ff69b4',
              color: 'white',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 20px #ff69b4';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Aadi
          </button>
          <button
            onClick={() => handleUserSelect('Nanniii')}
            style={{
              padding: '10px 30px',
              fontSize: '1.1em',
              background: 'linear-gradient(135deg, #ff1493, #ffb6c1)',
              border: '2px solid #ff1493',
              color: 'white',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 20px #ff1493';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Nanniii
          </button>
        </div>
      )}

      {selectedUser && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#ff69b4',
          padding: '15px 20px',
          borderRadius: '5px',
          border: '2px solid #ff69b4',
          pointerEvents: 'auto',
        }}>
          <p style={{ margin: 0 }}>
            Selected User: <strong>{selectedUser}</strong>
          </p>
          {selectedGear && (
            <p style={{ margin: '10px 0 0 0', fontSize: '0.9em' }}>
              Gear Selected: {selectedGear}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
