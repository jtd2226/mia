import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import Tile from './Tile'

import trippyShader from '../glsl/trippyShader.glsl'
import shapeShader from '../glsl/shapeShader.glsl'
import revealShader from '../glsl/revealShader.glsl'
import gooeyShader from '../glsl/gooeyShader.glsl'
import waveShader from '../glsl/waveShader.glsl'

const perspective = 150
// const bgImageURL = './img/MAMA/party.jpg'
// const bgImageURL = './img/MAMA/grassymama.JPEG'
// const bgImageURL = './img/MAMA/mama2.jpg'
// const bgImageURL = './img/MAMA/mamahome.jpg'
// const bgImageURL = './img/MAMA/mamajiyu.png'
// const bgImageURL = './img/MAMA/mamatwinkleeyes.jpg'
// const bgImageURL = './img/MAMA/swirlymama.png'
const bgImageURL = './img/MAMA/mama1.jpg'
// const bgImageURL = './img/MAMA/trippymama.JPG'

const shaders = [
    trippyShader,
    shapeShader,
    gooeyShader,
    waveShader,
    revealShader,
]

export default class Scene {

    constructor(canvas) {
        this.container = canvas

        this.W = window.innerWidth
        this.H = window.innerHeight

        this.mouse = new THREE.Vector2(0, 0)

        this.start()

        this.bindEvent()
    }

    bindEvent() {
        window.addEventListener('resize', () => { this.onResize() })
    }

    start() {
        this.mainScene = new THREE.Scene()
        this.initCamera()
        this.initLights()

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container,
            alpha: true,
        })
        this.renderer.setSize(this.W, this.H)
        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.tile = new Tile(bgImageURL, this, 0.5, shaders[0])

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.autoRotate = true
        this.controls.autoRotateSpeed = 1
        this.update()
    }

    setOrientationControls() {
        this.controls = new DeviceOrientationControls(this.camera, true)
        this.controls.connect()
        this.controls.update()
    }

    initCamera() {
        const fov = (180 * (2 * Math.atan(this.H / 2 / perspective))) / Math.PI

        this.camera = new THREE.PerspectiveCamera(100, this.W / this.H, 3, 10000)
        this.camera.position.set(0, 0, perspective)
    }

    initLights() {
        const ambientlight = new THREE.AmbientLight(0xffffff, 2)
        this.mainScene.add(ambientlight)
    }

    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        this.W = window.innerWidth
        this.H = window.innerHeight

        this.camera.aspect = this.W / this.H

        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.W, this.H)
        this.tile.getBounds()
    }

    /* Actions
    --------------------------------------------------------- */

    update() {
        requestAnimationFrame(this.update.bind(this))

        this.controls.update()
        this.tile.update()

        this.renderer.render(this.mainScene, this.camera)
    }

}
