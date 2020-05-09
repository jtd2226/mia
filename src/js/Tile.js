import * as THREE from 'three'
import vertexShader from '../glsl/vertexShader.glsl'
import { getRatio } from './util.js'

export default class Tile {

    constructor(imageSrc, scene, duration, fragmentShader) {
        this.scene = scene
        this.duration = duration

        this.sizes = new THREE.Vector2(0, 0)
        this.offset = new THREE.Vector2(0, 0)

        this.vertexShader = vertexShader
        this.fragmentShader = fragmentShader

        this.clock = new THREE.Clock()

        this.mouse = new THREE.Vector2(0, 0)

        this.loader = new THREE.TextureLoader()
        this.images = []
        this.preload(imageSrc, () => { this.initTile() })
    }

    /* Actions
    --------------------------------------------------------- */

    initTile() {
        const texture = this.images[0]

        this.getBounds()

        this.uniforms = {
            u_alpha: { value: 1 },
            u_map: { type: 't', value: texture },
            u_ratio: { value: getRatio(this.sizes, texture.image) },
            u_mouse: { value: this.mouse },
            u_progressHover: { value: 0 },
            u_progressClick: { value: 0 },
            u_time: { value: this.clock.getElapsedTime() },
            u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        }

        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            transparent: true,
            defines: {
                PI: Math.PI,
                PR: window.devicePixelRatio.toFixed(1),
            },
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.mesh.position.x = this.offset.x
        this.mesh.position.y = this.offset.y

        this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)

        this.scene.mainScene.add(this.mesh)
    }

    update() {
        if (!this.mesh) return
        this.uniforms.u_time.value += this.clock.getDelta()
    }

    /* Values
    --------------------------------------------------------- */

    getBounds() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const left = 0;
        const top = 0;

        if (!this.sizes.equals(new THREE.Vector2(width, height))) {
            this.sizes.set(width, height)
        }

        if (!this.offset.equals(new THREE.Vector2(left - window.innerWidth / 2 + width / 2, -top + window.innerHeight / 2 - height / 2))) {
            this.offset.set(left - window.innerWidth / 2 + width / 2, -top + window.innerHeight / 2 - height / 2)
        }
    }

    preload(imageSrc, callback) {
        const image = this.loader.load(imageSrc, callback)
        image.center.set(0.5, 0.5)
        this.images.push(image)
    }

}

