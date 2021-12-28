import './style.css'
import * as THREE from 'https://unpkg.com/three@0.136.0/build/three.module.js'


// Textures
const textureLoader = new THREE.TextureLoader()
const cubeTex = textureLoader.load('static/textures/strange-normalmap.jpg')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 )
camera.position.set(0, 0, 21)

// Renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true
})
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

// Objects
const geometry = new THREE.TorusKnotGeometry( 6, .7, 300, 20, 2, 7 )
const cubeGeometry = new THREE.BoxGeometry(6, 6, 6, 6)

// Materials
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.3,
  metalness: 1
})

const cubeMaterial = new THREE.MeshStandardMaterial()
cubeMaterial.color = new THREE.Color(0x0000ff)
cubeMaterial.normalMap = cubeTex

// Mesh
const torusKnot = new THREE.Mesh( geometry, material )
const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial )
scene.add( torusKnot, cubeMesh )

// Lights
const pointLight = new THREE.PointLight(0x00fff0, 1)
const pointLight2 = new THREE.PointLight(0xff000, .7)
pointLight.position.set(2, 3, 4)
pointLight2.position.set(-1.9, 1, -1.7)
scene.add(pointLight, pointLight2)


// Animation
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

let windowX = window.innerWidth / 2
let windowY = window.innerHeight / 2

function onDocumentMouseMove(e){
  mouseX = (e.clientX - windowX)
  mouseY = (e.clientY - windowY)
}

const clock = new THREE.Clock()

const animate = () => {

  const elapsedTime = clock.getElapsedTime()

  targetX = mouseX * .001
  targetY = mouseY * .001

  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  torusKnot.rotation.y += .03 
  cubeMesh.rotation.x = .01 * elapsedTime
  cubeMesh.rotation.y = .01 * elapsedTime

  cubeMesh.rotation.y += 1 * (targetX - cubeMesh.rotation.y)
  cubeMesh.rotation.x += 1.3 * (targetY - cubeMesh.rotation.x)
  // cubeMesh.position.z += -.7 * (targetY - cubeMesh.rotation.x)
}

animate()


