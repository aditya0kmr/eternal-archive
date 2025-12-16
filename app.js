// Aethel Engine - Phase 2: Chronometric Key with 3D Gear System
// Advanced interactive 3D romantic digital archive

let scene, camera, renderer;
let particles = null;
let starfield = null;
let gears = [];
let memorycards = [];
let selectedGear = null;
let rotationTarget = 0;

// Configuration
const config = {
  particleCount: 800,
  particleSize: 1.2,
  particleColor: 0xff69b4,
  starCount: 1500,
  backgroundColor: 0x0a0e27,
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
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 60;
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.getElementById('canvas-container').appendChild(renderer.domElement);
  
  // Create scene elements
  createStarfield();
  createParticleSystem();
  createChronometricKey();
  createLighting();
  updateTitleText();
  
  // Handle interactions
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('click', onCanvasClick);
  
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
    
    const colorVariation = Math.random() * 0.4 + 0.6;
    starColors[i * 3] = colorVariation;
    starColors[i * 3 + 1] = colorVariation;
    starColors[i * 3 + 2] = colorVariation + 0.15;
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  
  const starMaterial = new THREE.PointsMaterial({
    size: 0.6,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.7
  });
  
  starfield = new THREE.Points(starGeometry, starMaterial);
  scene.add(starfield);
}

function createParticleSystem() {
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(config.particleCount * 3);
  const particleVelocities = new Float32Array(config.particleCount * 3);
  
  for (let i = 0; i < config.particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 150;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 150;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    
    particleVelocities[i * 3] = (Math.random() - 0.5) * 0.08;
    particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
    particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.userData.velocities = particleVelocities;
  
  const particleMaterial = new THREE.PointsMaterial({
    color: config.particleColor,
    size: config.particleSize,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7
  });
  
  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
}

function createChronometricKey() {
  // Create main gear group
  const gearGroup = new THREE.Group();
  gearGroup.name = 'chronometricKey';
  
  // Create three main gears
  config.gearConfig.forEach((gearConfig, index) => {
    const gear = createGear(gearConfig, index);
    gearGroup.add(gear);
    gears.push(gear);
  });
  
  scene.add(gearGroup);
}

function createGear(gearConfig, index) {
  const group = new THREE.Group();
  group.position.copy(new THREE.Vector3(...gearConfig.position));
  group.userData.speed = gearConfig.speed;
  group.userData.radius = gearConfig.radius;
  group.userData.index = index;
  group.userData.rotationAngle = 0;
  group.userData.isClickable = true;
  
  // Main gear body
  const toothCount = Math.ceil(gearConfig.radius * 1.5);
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  
  // Create gear teeth
  for (let i = 0; i < toothCount; i++) {
    const angle1 = (i / toothCount) * Math.PI * 2;
    const angle2 = ((i + 0.4) / toothCount) * Math.PI * 2;
    const angle3 = ((i + 0.6) / toothCount) * Math.PI * 2;
    
    const r1 = gearConfig.radius;
    const r2 = gearConfig.radius * 0.8;
    
    vertices.push(r1 * Math.cos(angle1), r1 * Math.sin(angle1), 0);
    vertices.push(r2 * Math.cos(angle2), r2 * Math.sin(angle2), 0);
    vertices.push(r2 * Math.cos(angle3), r2 * Math.sin(angle3), 0);
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
  
  const material = new THREE.MeshBasicMaterial({
    color: gearConfig.color,
    emissive: gearConfig.color,
    emissiveIntensity: 0.3,
    wireframe: true,
    wireframeLinewidth: 2
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  
  // Add rim
  const rimGeometry = new THREE.BufferGeometry();
  const rimVertices = [];
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    rimVertices.push(
      gearConfig.radius * 0.6 * Math.cos(angle),
      gearConfig.radius * 0.6 * Math.sin(angle),
      0
    );
  }
  rimGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(rimVertices), 3));
  
  const rimMaterial = new THREE.LineBasicMaterial({ color: gearConfig.color });
  const rimLine = new THREE.Line(rimGeometry, rimMaterial);
  group.add(rimLine);
  
  group.userData.mesh = mesh;
  group.userData.rim = rimLine;
  
  return group;
}

function createLighting() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  const light1 = new THREE.PointLight(0xff69b4, 0.8, 100);
  light1.position.set(30, 30, 30);
  scene.add(light1);
  
  const light2 = new THREE.PointLight(0xff1493, 0.6, 80);
  light2.position.set(-30, -30, 30);
  scene.add(light2);
}

function updateTitleText() {
  const titleElement = document.getElementById('aethel-title');
  if (titleElement) {
    titleElement.textContent = 'Chronometric Key';
  }
  
  const descElement = document.getElementById('aethel-desc');
  if (descElement) {
    descElement.textContent = 'Align the gears to unlock eternal memories';
  }
}

function animate() {
  requestAnimationFrame(animate);
  
  // Animate starfield
  if (starfield) {
    starfield.rotation.x += 0.00003;
    starfield.rotation.y += 0.00007;
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
      
      if (Math.abs(posArray[i * 3]) > 80) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 80) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 50) velocities[i * 3 + 2] *= -1;
    }
    
    particles.rotation.x += 0.00008;
    particles.rotation.y += 0.00015;
    positions.needsUpdate = true;
  }
  
  // Animate gears
  gears.forEach(gear => {
    gear.rotation.z += gear.userData.speed;
    gear.userData.rotationAngle += gear.userData.speed;
  });
  
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
  
  if (camera) {
    camera.position.x += (x * 8 - camera.position.x) * 0.008;
    camera.position.y += (y * 8 - camera.position.y) * 0.008;
    camera.lookAt(0, 0, 0);
  }
}

function onCanvasClick(event) {
  if (event.target !== renderer.domElement) return;
  
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  
  const intersects = raycaster.intersectObjects(gears, true);
  
  if (intersects.length > 0) {
    const clickedGear = gears.find(g => intersects[0].object.parent === g || intersects[0].object === g);
    if (clickedGear) {
      selectedGear = clickedGear;
      clickedGear.userData.speed *= -1;
      triggerGearAnimation(clickedGear);
    }
  }
}

function triggerGearAnimation(gear) {
  // Add visual feedback
  const originalEmissive = gear.children[0].material.emissiveIntensity;
  gear.children[0].material.emissiveIntensity = 0.7;
  
  setTimeout(() => {
    gear.children[0].material.emissiveIntensity = originalEmissive;
  }, 300);
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
