// === Setup Scene, Camera, Renderer ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("fpsCanvas").appendChild(renderer.domElement);

// === Lantai dengan tekstur ===
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');
const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// === Dinding sederhana ===
const wallTexture = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');
const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });
const wallGeometry = new THREE.PlaneGeometry(20, 10);
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(0, 5, -20);
scene.add(wall);

// === Kubus objek ===
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 1, -5);
scene.add(cube);

// === Kontrol FPS (PointerLock) ===
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => controls.lock());
camera.position.y = 1.6;

// === Keyboard Movement (WASD) ===
const keys = {};
document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

function movePlayer() {
  const speed = 0.1;
  if (keys['KeyW']) controls.moveForward(speed);
  if (keys['KeyS']) controls.moveForward(-speed);
  if (keys['KeyA']) controls.moveRight(-speed);
  if (keys['KeyD']) controls.moveRight(speed);
}

// === Animasi Loop ===
function animate() {
  requestAnimationFrame(animate);
  movePlayer();
  renderer.render(scene, camera);
}
animate();
