// Aethel Engine - 3D Romantic Digital Archive
// Enhanced Three.js visualization with improved particles

let scene, camera, renderer;
let particles = null;
let starfield = null;
let titleText = null;

// Configuration
const config = {
  particleCount: 1000,
  particleSize: 1.5,
  particleColor: 0xff69b4,
  starCount: 2000,
  backgroundColor: 0x0a0e27
};

function init() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(config.backgroundColor);
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 60;
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowShadowMap;
  document.getElementById('canvas-container').appendChild(renderer.domElement);
  
  // Create scene elements
  createStarfield();
  createParticleSystem();
  createLighting();
  updateTitleText();
  
  // Handle interactions
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);
  
  // Start animation loop
  animate();
}

function createStarfield() {
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(config.starCount * 3);
  const starColors = new Float32Array(config.starCount * 3);
  
  for (let i = 0; i < config.starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 2000;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    
    // Vary star colors between white and light blue
    const colorVariation = Math.random() * 0.3 + 0.7;
    starColors[i * 3] = colorVariation;
    starColors[i * 3 + 1] = colorVariation;
    starColors[i * 3 + 2] = colorVariation + 0.1;
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  
  const starMaterial = new THREE.PointsMaterial({
    size: 0.8,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });
  
  starfield = new THREE.Points(starGeometry, starMaterial);
  scene.add(starfield);
}

function createParticleSystem() {
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(config.particleCount * 3);
  const particleVelocities = new Float32Array(config.particleCount * 3);
  
  for (let i = 0; i < config.particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 120;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    
    particleVelocities[i * 3] = (Math.random() - 0.5) * 0.1;
    particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
    particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.userData.velocities = particleVelocities;
  
  const particleMaterial = new THREE.PointsMaterial({
    color: config.particleColor,
    size: config.particleSize,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    sizeRange: [0.5, 10]
  });
  
  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
}

function createLighting() {
  // Ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  
  // Directional light for dramatic effect
  const directionalLight = new THREE.DirectionalLight(0xff69b4, 0.5);
  directionalLight.position.set(30, 30, 30);
  scene.add(directionalLight);
}

function updateTitleText() {
  // Update title in HTML (if exists)
  const titleElement = document.getElementById('aethel-title');
  if (titleElement) {
    titleElement.textContent = 'Aethel Engine';
  }
  
  const descElement = document.getElementById('aethel-desc');
  if (descElement) {
    descElement.textContent = 'A personalized 3D romantic digital archive with tactile mechanisms';
  }
}

function animate() {
  requestAnimationFrame(animate);
  
  // Animate starfield
  if (starfield) {
    starfield.rotation.x += 0.00005;
    starfield.rotation.y += 0.0001;
  }
  
  // Animate particles
  if (particles) {
    const positions = particles.geometry.getAttribute('position');
    const velocities = particles.geometry.userData.velocities;
    const posArray = positions.array;
    
    for (let i = 0; i < config.particleCount; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Wrap around boundaries
      if (Math.abs(posArray[i * 3]) > 60) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 60) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 60) velocities[i * 3 + 2] *= -1;
    }
    
    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0002;
    positions.needsUpdate = true;
  }
  
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  // Subtle camera movement following mouse
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  if (camera) {
    camera.position.x += (x * 10 - camera.position.x) * 0.01;
    camera.position.y += (y * 10 - camera.position.y) * 0.01;
    camera.lookAt(0, 0, 0);
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
