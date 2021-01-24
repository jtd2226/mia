import * as THREE from "three";
import vertexShader from "../glsl/vertexShader.glsl";
import fragmentShader from "../glsl/shader.glsl";

function debounce(fn, wait = 400) {
    let timeout = null;
    return (...args) => {
        clearTimeout(timeout);
        return new Promise((resolve) => {
            timeout = setTimeout(() => {
                timeout = null;
                resolve(fn(...args));
            }, wait);
        });
    };
}

const imageURLS = [
    "./img/MAMA/miaxsatara.jpg",
];

const fade = (element, out = false, duration = 300) =>
    new Promise((resolve) => {
        element.style.opacity = 0;
        let start;
        let id;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const lerp = (1 / duration) * elapsed;
            element.style.opacity = out ? 1 - lerp : lerp;
            if (elapsed < duration) id = requestAnimationFrame(animate);
            else {
                cancelAnimationFrame(id);
                resolve();
            }
        };
        id = requestAnimationFrame(animate);
    });

const cameraZ = 10;
const planeZ = 0;
const cameraDistance = cameraZ - planeZ;
const cameraFov = 75;
const vFov = (cameraFov * Math.PI) / 180;
const planeHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
const timeMultiplier = 0.2;

export default class Scene {
    constructor(canvas) {
        this.container = canvas;

        this.W = window.outerWidth;
        this.H = window.innerHeight;

        this.start();
        this.bindEvent();
    }

    start = () => {
        this.mainScene = new THREE.Scene();
        this.mainScene.background = new THREE.Color(0x000);
        this.initCamera();
        this.initLights();

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container,
        });
        this.renderer.setSize(this.W, this.H);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.clock = new THREE.Clock();
        this.loadBGImage(imageURLS[0]);
    };

    initCamera() {
        const aspect = this.W / this.H;
        this.planeWidth = planeHeight * aspect;
        this.camera = new THREE.PerspectiveCamera(cameraFov, aspect, 0.1);
        this.camera.position.z = cameraZ;
        this.camera.updateProjectionMatrix();
        this.camera.lookAt(this.mainScene.position);
    }

    initLights() {
        // const ambientlight = new THREE.AmbientLight(0xffffff);
        // this.mainScene.add(ambientlight);
    }

    onResize = debounce(() => {
        const w = window.innerWidth;
        const h = Math.max(window.outerHeight, window.innerHeight);
        if (this.W === w && this.H === h) return;

        this.W = w;
        this.H = h;

        this.renderer.setSize(w, h);
        this.uniforms.resolution.value = new THREE.Vector2(w, h);

        const aspect = w / h;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();

        this.planeWidth = planeHeight * aspect;

        this.uniforms.tDiffuse.value.dispose();
        this.cube.geometry.dispose();
        this.cube.material.dispose();

        this.planeGeometry.dispose();
        this.planeGeometry = new THREE.PlaneBufferGeometry(
            this.planeWidth,
            planeHeight
        );

        this.cube.geometry = this.planeGeometry;
    }, 500);

    bindEvent = () => {
        window.addEventListener("resize", () => {
            const w = window.innerWidth;
            const h = Math.max(window.outerHeight, window.innerHeight);
            const thresh = 200;
            const shouldAnimate =
                Math.abs(this.W - w) > thresh || Math.abs(this.H - h) > thresh;

            if (shouldAnimate) {
                this.container.style.opacity = 0;
                cancelAnimationFrame(this.animationId);
            }
            this.renderer.dispose();
            this.onResize(w, h).then(() => {
                if (shouldAnimate) fade(this.container).then(this.update);
            });
        });
        // window.onclick = this.togglePlayer;
        // window.ontouchstart = this.togglePlayer;
    };

    loadAudio = () => {
        const audio = document.getElementById("audio");
        audio.addEventListener("click", () => {
            if (this.analyser) return;
            const context = new (window.AudioContext ||
                window.webkitAudioContext)();
            const src = context.createMediaElementSource(audio);
            this.analyser = context.createAnalyser();
            this.analyser.smoothingTimeConstant = 0.9;
            src.connect(this.analyser);
            this.analyser.connect(context.destination);
            this.analyser.fftSize = 512;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);
        });
    };

    loadBGImage(url) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(url, () => {
            // this.loadAudio();
            this.uniforms = {
                time: { value: this.clock.getElapsedTime() },
                resolution: { value: new THREE.Vector2(this.W, this.H) },
                tDiffuse: { value: texture },
                mouse: { value: new THREE.Vector2(0) },
                amount: { value: 1.0 },
                freq: { value: 0.0 },
                freq2: { value: 0.0 },
            };

            this.planeGeometry = new THREE.PlaneBufferGeometry(
                this.planeWidth,
                planeHeight
            );

            var cmaterial = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                wireframe: false,
                side: THREE.FrontSide,
            });
            this.cube = new THREE.Mesh(this.planeGeometry, cmaterial);
            this.mainScene.add(this.cube);
            this.update();
        });
    }

    update = () => {
        this.animationId = requestAnimationFrame(this.update);
        const delta = this.clock.getDelta();
        this.uniforms.time.value += delta * timeMultiplier;
        this.updateWithMusic();
        this.renderer.render(this.mainScene, this.camera);
    };

    makeSlideshow() {
        const loader = new THREE.TextureLoader();
        const url = imageURLS[Math.floor(Math.random() * imageURLS.length)];
        const texture = loader.load(url, () => {
            this.uniforms.tDiffuse.value = texture;
            setTimeout(this.makeSlideshow.bind(this), 10000);
        });
    }

    updateWithMusic() {
        if (!this.analyser) return;
        this.analyser.getByteFrequencyData(this.dataArray);
        this.uniforms.freq.value = this.dataArray[0];
        this.uniforms.freq2.value = this.dataArray[100];
    }

    showPlayer = () => {
        this.toolbar.style.display = "grid";
    };

    hidePlayer = () => {
        this.toolbar.style.display = "none";
    };

    togglePlayer = (e) => {
        if (this.toolbar.contains(e.target)) return;
        if (this.toolbar.style.display === "none") {
            this.showPlayer();
        } else {
            this.hidePlayer();
        }
    };
}
