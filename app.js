// Aethel Engine - 3D Romantic Digital Archive
// Three.js initialization and scene setup

let scene, camera, renderer;
let stars = [];
let particles = [];
const particleCount = 500;

function init() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e27);
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('canvas-container').appendChild(renderer.domElement);
  
  // Create starfield background
  createStarfield();
  
  // Create romantic particles
  createParticles();
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  // Start animation loop
  animate();
}

function createStarfield() {
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(3000);
  
  for (let i = 0; i < 3000; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 2000;
    starPositions[i + 1] = (Math.random() - 0.5) * 2000;
    starPositions[i + 2] = (Math.random() - 0.5) * 2000;
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    sizeAttenuation: true
  });
  
  const starfield = new THREE.Points(starGeometry, starMaterial);
  scene.add(starfield);
}

function createParticles() {
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 100;
    particlePositions[i + 1] = (Math.random() - 0.5) * 100;
    particlePositions[i + 2] = (Math.random() - 0.5) * 100;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xff69b4,
    size: 0.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6
  });
  
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);
  particles.push(particleSystem);
}

function animate() {
  requestAnimationFrame(animate);
  
  // Rotate particles slowly
  particles.forEach(particle => {
    particle.rotation.x += 0.0001;
    particle.rotation.y += 0.0002;
  });
  
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
