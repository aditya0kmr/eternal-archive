import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import useEngineStore from './store/engineStore'
import ChronometricKey from './engine/ChronometricKey/ChronometricKey'
import ControlConsole from './components/ControlConsole'
import './App.css'

function App() {
  const currentMechanism = useEngineStore((state) => state.currentMechanism)
  const loggedInUser = useEngineStore((state) => state.loggedInUser)

  // Render different scene based on logged-in state and mechanism
  const renderScene = () => {
    if (!loggedInUser) {
      return <ChronometricKey />
    }
    return <ControlConsole />
  }

  return (
    <div className="app-container">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0a0e27']} />
        <ambientLight intensity={0.6} />
        <Suspense fallback={null}>
          {renderScene()}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
