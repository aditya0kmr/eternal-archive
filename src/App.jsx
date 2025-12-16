import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import useEngineStore from './store/engineStore'
import ChronometricKey from './engine/ChronometricKey/ChronometricKey'
import ControlConsole from './components/ControlConsole'
import './App.css'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Render Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0a0e27',
          color: '#ff69b4',
          fontFamily: 'monospace'
        }}>
          <h1>⚠️ Scene Error</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )
    }
    return this.props.children
  }
}

function LoadingFallback() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#0a0e27',
      color: '#ff69b4',
      fontSize: '24px',
      fontFamily: 'monospace'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ animation: 'spin 2s infinite' }}>◆ ◇ ◆</div>
        <p>Initializing Aethel Engine...</p>
      </div>
    </div>
  )
}

function App() {
  const currentMechanism = useEngineStore((state) => state.currentMechanism)
  const loggedInUser = useEngineStore((state) => state.loggedInUser)
  const [isLoading, setIsLoading] = useState(false)

  // Render different scene based on logged-in state and mechanism
  const renderScene = () => {
    if (!loggedInUser) {
      return <ChronometricKey onLoadComplete={() => setIsLoading(false)} />
    }
    return <ControlConsole />
  }

  return (
    <ErrorBoundary>
      <div className="app-container">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 75 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true }}
          onCreated={() => setIsLoading(false)}
        >
          <color attach="background" args={['#0a0e27']} />
          <ambientLight intensity={0.6} />
          <Suspense fallback={null}>
            {renderScene()}
          </Suspense>
        </Canvas>
        {isLoading && <LoadingFallback />}
      </div>
    </ErrorBoundary>
  )
}

export default App
