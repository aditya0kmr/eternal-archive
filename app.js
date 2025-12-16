// Aethel Engine - Phase 3.1: Control Console with Navigation System
// Advanced interactive 3D romantic digital archive with scene management

let scene, camera, renderer;
let particles = null;
let starfield = null;
let gears = [];
let controlConsoleOrbs = [];
let selectedGear = null;

// Scene state tracking
let currentScene = 'chronometric'; // 'chronometric' or 'console'
let cameraTargetPosition = new THREE.Vector3(0, 0, 50);
let cameraCurrentPosition = new THREE.Vector3(0, 0, 50);

// Configuration
const config = {
  particleCount: 800,
  particleSize: 1.2,
  particleColor: 0xff69b4,
  starCount: 1500,
  backgroundColor: 0x0a0a1a,
  gearConfig: [
    { radius: 15, size: 0.8, speed: 0.01, position: [-20, 0, 0], color: 0xff69b4 },
    { radius: 10, size: 0.6, speed: -0.02, position: [0, 0, 0], color: 0xff1493 },
    { radius: 8, size: 0.5, speed: 0.015, position: [20, 0, 0], color: 0xffb6c1 }
  ]
};

function init() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(config.backgroundColor);
  
  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.z = 50;
  cameraCurrentPosition.copy(camera.position);
  cameraTargetPosition.copy(camera.position);
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.getElementById('root').appendChild(renderer.domElement);
  
  // Initialize Chronometric Key
  createStarfield();
  createParticleSystem();
  createChronometricKey();
  createLighting();
  
  // Event listeners
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('click', onCanvasClick);
  
  // Start animation
  animate();
}

function createStarfield() {
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(config.starCount * 3);
  const starColors = new Float32Array(config.starCount * 3);
  
  for (let i = 0; i < config.starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 2000;
    starPositions[i + 1] = (Math.random() - 0.5) * 2000;
    starPositions[i + 2] = (Math.random() - 0.5) * 2000;
    
    const colorVariation = Math.random() * 0.4 + 0.6;
    starColors[i] = colorVariation;
    starColors[i + 1] = colorVariation;
    starColors[i + 2] = colorVariation + 0.15;
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  
  const starMaterial = new THREE.PointsMaterial({ size: 1.5, vertexColors: true });
  starfield = new THREE.Points(starGeometry, starMaterial);
  scene.add(starfield);
}

function createParticleSystem() {
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(config.particleCount * 3);
  const particleVelocities = new Float32Array(config.particleCount * 3);
  
  for (let i = 0; i < config.particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 200;
    particlePositions[i + 1] = (Math.random() - 0.5) * 200;
    particlePositions[i + 2] = (Math.random() - 0.5) * 200;
    
    particleVelocities[i] = (Math.random() - 0.5) * 0.1;
    particleVelocities[i + 1] = (Math.random() - 0.5) * 0.1;
    particleVelocities[i + 2] = (Math.random() - 0.5) * 0.1;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.userData.velocity = particleVelocities;
  
  const particleMaterial = new THREE.PointsMaterial({
    color: config.particleColor,
    size: config.particleSize,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true
  });
  
  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
}

function createChronometricKey() {
  const gearGroup = new THREE.Group();
  gearGroup.name = 'chronometricKey';
  
  for (let i = 0; i < config.gearConfig.length; i++) {
    const gearData = config.gearConfig[i];
    const gear = createGear(gearData);
    gearGroup.add(gear);
    gears.push({ mesh: gear, ...gearData, rotation: 0, isReversed: false });
  }
  
  scene.add(gearGroup);
}

function createGear(gearData) {
  const group = new THREE.Group();
  group.position.set(...gearData.position);
  group.userData.gearData = gearData;
  
  // Rim circle
  const rimGeometry = new THREE.BufferGeometry();
  const rimVertices = [];
  const teethCount = Math.floor(gearData.radius * 3);
  
  for (let i = 0; i < teethCount; i++) {
    const angle = (i / teethCount) * Math.PI * 2;
    rimVertices.push(Math.cos(angle) * gearData.radius, Math.sin(angle) * gearData.radius, 0);
  }
  
  rimGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(rimVertices), 3));
  const rimMaterial = new THREE.LineBasicMaterial({ color: gearData.color, linewidth: 3 });
  const rim = new THREE.LineLoop(rimGeometry, rimMaterial);
  rim.userData.isGear = true;
  group.add(rim);
  
  // Teeth lines
  for (let i = 0; i < teethCount; i++) {
    const angle = (i / teethCount) * Math.PI * 2;
    const x1 = Math.cos(angle) * gearData.radius;
    const y1 = Math.sin(angle) * gearData.radius;
    const x2 = Math.cos(angle) * (gearData.radius * 0.7);
    const y2 = Math.sin(angle) * (gearData.radius * 0.7);
    
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array([x1, y1, 0, x2, y2, 0]), 3
    ));
    const line = new THREE.Line(lineGeometry, rimMaterial);
    line.userData.isGear = true;
    group.add(line);
  }
  
  // Center hub
  const hubGeometry = new THREE.CircleGeometry(3, 16);
  const hubMaterial = new THREE.MeshBasicMaterial({ color: gearData.color, transparent: true, opacity: 0.3 });
  const hub = new THREE.Mesh(hubGeometry, hubMaterial);
  hub.position.z = 0.1;
  hub.userData.isGear = true;
  group.add(hub);
  
  return group;
}

function createLighting() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const pointLight1 = new THREE.PointLight(0xff69b4, 1, 500);
  pointLight1.position.set(-50, 50, 50);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0xff1493, 0.8, 500);
  pointLight2.position.set(50, -50, 50);
  scene.add(pointLight2);
}

function animate() {
  requestAnimationFrame(animate);
  
  // Update starfield rotation
  if (starfield) {
    starfield.rotation.z += 0.00005;
  }
  
  // Update particles
  if (particles && particles.geometry.attributes.position) {
    const particlePositions = particles.geometry.attributes.position.array;
    const velocity = particles.geometry.userData.velocity;
    
    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] += (Math.random() - 0.5) * 0.08;
      particlePositions[i + 1] += (Math.random() - 0.5) * 0.08;
      particlePositions[i + 2] += (Math.random() - 0.5) * 0.08;
      
      // Boundary wrapping
      if (Math.abs(particlePositions[i]) > 100) particlePositions[i] *= -0.9;
      if (Math.abs(particlePositions[i + 1]) > 100) particlePositions[i + 1] *= -0.9;
      if (Math.abs(particlePositions[i + 2]) > 100) particlePositions[i + 2] *= -0.9;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }
  
  // Update gears
  gears.forEach((gear) => {
    if (!gear.isReversed) {
      gear.mesh.rotation.z += gear.speed;
    } else {
      gear.mesh.rotation.z -= gear.speed;
    }
  });
  
  // Smooth camera movement
  camera.position.lerp(cameraTargetPosition, 0.008);
  
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  cameraTargetPosition.x = x * 20;
  cameraTargetPosition.y = y * 15;
}

function onCanvasClick(event) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  
  const gearMeshes = gears.map(g => g.mesh);
  const intersects = raycaster.intersectObjects(gearMeshes, true);
  
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    const gearGroup = clickedMesh.parent || clickedMesh;
    const clickedGear = gears.find(g => g.mesh === gearGroup || g.mesh.children.includes(clickedMesh));
    
    if (clickedGear) {
      clickedGear.isReversed = !clickedGear.isReversed;
      triggerGearAnimation(clickedGear);
    }
  }
}

function triggerGearAnimation(gear) {
  gear.mesh.children.forEach(child => {
    if (child.material && child.material.emissive) {
      const originalEmissive = child.material.emissive.getHex();
      child.material.emissive.setHex(0xffffff);
      child.material.emissive.intensity = 1;
      
      setTimeout(() => {
        child.material.emissive.setHex(originalEmissive);
        child.material.emissive.intensity = 0;
      }, 300);
    }
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
