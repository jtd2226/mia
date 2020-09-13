import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

import trippyShader from "../glsl/trippyShader.glsl";
import shapeShader from "../glsl/shapeShader.glsl";
import revealShader from "../glsl/revealShader.glsl";
import gooeyShader from "../glsl/gooeyShader.glsl";
import waveShader from "../glsl/waveShader.glsl";
import vertexShader from "../glsl/vertexShader.glsl";
import backgroundShader from "../glsl/shader.glsl";

const perspective = 0;
// const bgImageURL = './img/MAMA/party.jpg'
// const bgImageURL = './img/MAMA/grassymama.JPEG'
// const bgImageURL = './img/MAMA/mama2.jpg'
// const bgImageURL = './img/MAMA/mamahome.jpg'
// const bgImageURL = './img/MAMA/mamajiyu.png'
// const bgImageURL = './img/MAMA/mamatwinkleeyes.jpg'
// const bgImageURL = './img/MAMA/swirlymama.png'
// const bgImageURL = "./img/MAMA/mama1.jpg";
const bgImageURL = "./img/MAMA/mamasky.JPEG";
// const bgImageURL = "./img/MAMA/nfsmama.JPG";
// const bgImageURL = './img/MAMA/trippymama.JPG'

const shaders = [
    trippyShader,
    shapeShader,
    gooeyShader,
    waveShader,
    revealShader,
];

export default class Scene {
    constructor(canvas) {
        this.container = canvas;

        this.W = window.innerWidth;
        this.H = window.innerHeight;

        this.mouse = new THREE.Vector2(0, 0);

        this.start();

        this.bindEvent();
    }

    bindEvent() {
        window.addEventListener("resize", () => {
            this.onResize();
        });
    }

    start() {
        this.mainScene = new THREE.Scene();
        this.initCamera();
        this.initLights();

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: this.container,
            alpha: true,
        });
        this.renderer.setSize(this.W, this.H);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.composer = new EffectComposer(this.renderer);

        const renderPass = new RenderPass(this.mainScene, this.camera);
        this.composer.addPass(renderPass);

        this.clock = new THREE.Clock();

        const loader = new THREE.TextureLoader();
        const texture = loader.load(bgImageURL, () => {
            this.mainScene.background = texture;

            this.uniforms = {
                time: { value: this.clock.getElapsedTime() },
                tDiffuse: { value: texture },
                amount: { value: 1.0 },
            };

            this.shaderPass = new ShaderPass({
                uniforms: this.uniforms,
                vertexShader: vertexShader,
                fragmentShader: backgroundShader,
            });
            this.composer.addPass(this.shaderPass);
            this.update();
        });
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            100,
            this.W / this.H,
            3,
            10000
        );
        this.camera.position.set(0, 0, perspective);
    }

    initLights() {
        const ambientlight = new THREE.AmbientLight(0xffffff, 2);
        this.mainScene.add(ambientlight);
    }

    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        this.W = window.innerWidth;
        this.H = window.innerHeight;

        this.camera.aspect = this.W / this.H;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.W, this.H);
    }

    /* Actions
    --------------------------------------------------------- */

    update() {
        requestAnimationFrame(this.update.bind(this));

        const delta = this.clock.getDelta();
        this.shaderPass.uniforms.time.value += delta;

        this.renderer.render(this.mainScene, this.camera);
        this.composer.render();
    }
}
