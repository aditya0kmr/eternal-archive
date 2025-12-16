# eternal-archive
A personalized 3D romantic digital archive with tactile mechanisms and immersive experience - built entirely on GitHub with HTML, CSS, and JavaScript


## 🎯 Phase 2: Chronometric Key System (✅ COMPLETE)

### Features Implemented:

#### 3D Gear Mechanics
- **Three Interlocking Gears**: Main Chronometric Key with rotating gears at different speeds
  - Large gear (radius 15): Pink hot (#ff69b4) - rotates at 0.01 rad/frame
  - Medium gear (radius 10): Deep pink (#ff1493) - rotates at -0.02 rad/frame
  - Small gear (radius 8): Light pink (#ffb6c1) - rotates at 0.015 rad/frame
- **Wireframe Design**: Modern tech aesthetic with glowing neon effects
- **Dynamic Lighting**: Dual pink PointLights for romantic ambiance

#### Interactive Elements
- **Click Detection**: Raycast-based gear selection and interaction
- **Gear Reversible**: Click gears to reverse rotation direction
- **Visual Feedback**: Emissive intensity changes on gear click (glow pulse effect)
- **Animation Trigger**: Smooth transitions with 300ms feedback duration

#### Enhanced Particle System
- **800 Animated Particles**: Hot pink particles with physics simulation
- **Boundary Wrapping**: Particles bounce within defined space
- **Smooth Movement**: 0.08 unit/frame velocity with continuous animation
- **Transparency**: 70% opacity for ethereal feel

#### Starfield Background
- **1500 Stars**: Color-varied starfield for depth
- **Color Variation**: Stars range from white to light blue for natural appearance
- **Slow Rotation**: Subtle rotation for immersive atmosphere
- **Viewport Spanning**: Covers entire 2000x2000 unit space

#### UI Layer
- **Animated Title**: "AETHEL ENGINE" with hot pink gradient text
- **Dynamic Description**: "A personalized 3D romantic digital archive with tactile mechanisms"
- **Interactive Buttons**:
  - "EXPLORE ARCHIVE" - Opens future archive browsing
  - "ABOUT" - Shows information panel
  - Pink borders (#ff69b4) with glow on hover
  - Smooth transitions and hover animations

#### Mouse Interactions
- **Camera Tracking**: Subtle camera follow based on mouse position
- **Smooth Movement**: 0.8% interpolation for natural feel
- **Depth Perception**: XY plane movement creates parallax effect with 3D objects

### Technical Specifications:

**Performance**:
- Optimized Three.js r128 CDN integration
- WebGL rendering with antialiasing and high pixel ratio support
- Shadow mapping enabled for visual depth
- requestAnimationFrame for smooth 60fps target

**Code Structure**:
- Modular function design (init, create*, animate, event handlers)
- Efficient buffer geometry usage
- Data-driven configuration object
- Event delegation for clean interaction handling

**Responsive Design**:
- Full viewport coverage
- Window resize handling
- Dynamic aspect ratio adjustment
- Touch-compatible mouse tracking

### Live Demo:
🌐 **URL**: https://aditya0kmr.github.io/eternal-archive/

**User Experience**:
1. Page loads with smooth fade-in animations
2. Title and buttons appear with staggered animations (0.5s delay)
3. 3D gears rotating smoothly in background
4. Particles flowing through scene in real-time
5. Mouse movement tracked - camera follows smoothly
6. Button hover shows pink fill with glow effect
7. Clicking gears reverses rotation + visual feedback pulse

### Browser Compatibility:
✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Modern mobile browsers (iOS Safari, Chrome Mobile)

### Git History:
- **Commit 1-5**: Phase 1 foundation (repo, HTML, CSS, basic particles)
- **Commit 6**: Enhanced particle system + interactive features
- **Commit 7**: UI layer styling + animations
- **Commit 8**: Phase 2 - Chronometric Key gear system ✅

### Next Phase (Phase 3):
- [ ] Memory Card Archive System
- [ ] Gear alignment detection for unlocking memories
- [ ] Archive browsing interface with thumbnail previews
- [ ] Tactile feedback sounds/vibrations
- [ ] Save/load functionality
- [ ] Responsive mobile optimization

---

## 🚀 Phase 3.1: Aethel Engine v1 - React/Vite/R3F Foundation (🟡 IN PROGRESS)

**Status**: Building core engine framework with React + Three.js integration

### Architecture Implemented:
- ✅ Vite build system with React 18 & JSX support
- ✅ React Three Fiber (R3F) for 3D rendering
- ✅ Drei library for enhanced 3D utilities  
- ✅ Zustand store for global engine state management
- ✅ Public folder structure for GitHub Pages
- ✅ Modular component architecture

### Core Components (v1 Stubs):
1. **ChronometricKey** - 3D gear mechanism with click-to-unlock
   - Mock unlock with Aadi/Nanniii users
   - Rotating wireframe gears
   - Click detection for user selection

2. **ControlConsole** - Main navigation hub
   - Cylindrical platform with glow effect
   - Placeholder for mechanism levers
   - Camera navigation system

### Engine State Store:
- `loggedInUser`: Auth state (Aadi/Nanniii)
- `currentMechanism`: Navigation state
- `moodSummary`: Future mood aggregation
- `letters`: Stored love letters

### Next: Local Build & Deploy
```bash
npm install
npm run build
# Deploy dist/ to GitHub Pages
```

**v1 Roadmap**:
- [ ] Implement 3 interactive gears in Chronometric Key
- [ ] Add user selection modal
- [ ] Create Temporal Loom (2-3 milestones)
- [ ] Create Memory Press (3-6 photos)
- [ ] Create Dual Coil Capacitor (Firestore letters)
- [ ] Setup Firebase Auth & Firestore
- [ ] GitHub Actions CI/CD pipeline

**Built with**: HTML5, CSS3, JavaScript ES6, Three.js r128, GitHub Pages
**Status**: 🚀 Live & Continuously Deployed
**Last Updated**: December 17, 2025 12:15 AM IST
