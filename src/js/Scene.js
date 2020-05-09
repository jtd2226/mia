import { template } from './util'
import * as THREE from 'three'
import Tile from './Tile'

import trippyShader from '../glsl/trippyShader.glsl'
import shapeShader from '../glsl/shapeShader.glsl'
import revealShader from '../glsl/revealShader.glsl'
import gooeyShader from '../glsl/gooeyShader.glsl'
import waveShader from '../glsl/waveShader.glsl'

const perspective = 800
const bgImageURL = './img/MAMA/party.jpg'

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

        this.update()
    }

    initCamera() {
        const fov = (180 * (2 * Math.atan(this.H / 2 / perspective))) / Math.PI

        this.camera = new THREE.PerspectiveCamera(fov, this.W / this.H, 1, 10000)
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

        this.tile.update()

        this.renderer.render(this.mainScene, this.camera)
    }

}
