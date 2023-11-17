import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass';
import { RenderPass } from 'three/addons/postprocessing/RenderPass';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass';
import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import { useEffect, useRef } from 'react';

function debounce(fn, wait = 400) {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        timeout = null;
        resolve(fn(...args));
      }, wait);
    });
  };
}

const fade = (element, out = false, duration = 700) =>
  new Promise(resolve => {
    element.style.opacity = 0;
    let start;
    let id;
    const animate = timestamp => {
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

class Scene {
  constructor({
    canvas,
    images,
    fullscreen,
    amplitude,
    fallback,
    glitch,
    rgbshift,
  }) {
    this.images = [].concat(images);
    this.container = canvas;
    this.fullscreen = fullscreen;
    this.fallback = fallback;

    this.initialSize = {
      width: canvas.style.width ?? '100%',
      height: canvas.style.height ?? '100%',
    };

    amplitude ??= 0.0;
    this.amplitude = amplitude * 0.1;

    const { width, height } = this.getHeightWidth();

    this.W = width;
    this.H = height;

    this.mainScene = new THREE.Scene();
    this.mainScene.background = null;

    this.initCamera();
    this.initLights();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.W, this.H);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.composer = new EffectComposer(this.renderer);
    this.glitchEffect = new GlitchPass();
    this.composer.addPass(new RenderPass(this.mainScene, this.camera));

    if (glitch) this.composer.addPass(this.glitchEffect);

    if (rgbshift) {
      const shader = new ShaderPass(RGBShiftShader);
      const rgbAmount = 0.002 + rgbshift * 0.001;
      const angle = 3.5;
      shader.uniforms.amount.value = rgbAmount;
      shader.uniforms.angle.value = angle;
      shader.enabled = true;
      this.composer.addPass(shader);
    }

    this.clock = new THREE.Clock();
    this.loadBGImage(this.images[0]);
  }

  getHeightWidth = () => {
    if (this.fullscreen) {
      return {
        width: window.innerWidth,
        height: Math.max(window.outerHeight, window.innerHeight),
      };
    } else {
      this.container.style.width = this.initialSize.width;
      this.container.style.height = this.initialSize.height;
      const bounds = this.container.getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
      };
    }
  };

  initCamera() {
    const aspect = this.W / this.H;
    this.planeWidth = planeHeight * aspect;
    this.camera = new THREE.PerspectiveCamera(cameraFov, aspect, 0.1);
    this.camera.position.z = cameraZ;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.mainScene.position);
  }

  dispose = () => {
    this.uniforms?.tDiffuse?.value?.dispose?.();
    this.cube?.geometry?.dispose?.();
    this.cube?.material?.dispose?.();
    this.planeGeometry?.dispose?.();
    this.renderer?.dispose?.();
    cancelAnimationFrame(this.animationId);
  };

  initLights() {
    // const ambientlight = new THREE.AmbientLight(0xffffff);
    // this.mainScene.add(ambientlight);
  }

  handleResize = () => {
    const { width: w, height: h } = this.getHeightWidth();
    if (this.W === w && this.H === h) return;

    this.W = w;
    this.H = h;

    this.renderer.setSize(w, h);
    this.uniforms.resolution.value = new THREE.Vector2(w, h);

    const aspect = w / h;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    this.planeWidth = planeHeight * aspect;

    this.cube.scale.x = this.planeWidth;
    // window.onclick = this.togglePlayer;
    // window.ontouchstart = this.togglePlayer;
  };

  loadAudio = () => {
    const audio = document.getElementById('audio');
    audio.addEventListener('click', () => {
      if (this.analyser) return;
      const context = new (window.AudioContext || window.webkitAudioContext)();
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
        amplitude: { value: this.amplitude },
      };

      this.planeGeometry = new THREE.PlaneGeometry(1, 1);

      var cmaterial = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        wireframe: false,
        side: THREE.FrontSide,
        transparent: true,
      });
      this.cube = new THREE.Mesh(this.planeGeometry, cmaterial);
      this.cube.scale.x = this.planeWidth;
      this.cube.scale.y = planeHeight;
      this.mainScene.add(this.cube);
      fade(this.container);
      this.update();
    });
  }

  update = () => {
    if (this.fallback) this.fallback.style.display = 'none';
    this.animationId = requestAnimationFrame(this.update);
    const delta = this.clock.getDelta();
    this.uniforms.time.value += delta * timeMultiplier;
    this.updateWithMusic();
    this.composer.render();
    this.handleResize();
  };

  makeSlideshow() {
    this.dispose();
    const loader = new THREE.TextureLoader();
    const url = this.images[Math.floor(Math.random() * this.images.length)];
    const texture = loader.load(url, () => {
      this.uniforms.tDiffuse.value = texture;
      if (this.images.length > 1)
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
    this.toolbar.style.display = 'grid';
  };

  hidePlayer = () => {
    this.toolbar.style.display = 'none';
  };

  togglePlayer = e => {
    if (this.toolbar.contains(e.target)) return;
    if (this.toolbar.style.display === 'none') {
      this.showPlayer();
    } else {
      this.hidePlayer();
    }
  };
}

export default function World({
  children,
  images,
  fullscreen,
  amplitude,
  glitch,
  rgbshift,
  fallback,
  ...rest
}) {
  const canvas = useRef();
  const fallbackImg = useRef();
  const imageURL = [].concat(images).at(0);

  useEffect(() => {
    canvas.current ??= document.getElementById('scene');
    if (!canvas.current) return;
    if (!imageURL?.length) return;
    const scene = new Scene({
      canvas: canvas.current,
      fallback: fallbackImg.current,
      amplitude,
      rgbshift,
      images,
      fullscreen,
      glitch,
    });
    return () => {
      scene.dispose();
    };
  }, [imageURL]);
  return (
    <>
      {fallback && (
        <img
          src={typeof fallback === 'string' ? fallback : imageURL}
          ref={fallbackImg}
          className={rest?.className ?? ''}
          style={{
            position: 'absolute',
            top: 0,
            width: rest?.style?.width ?? '',
            height: rest?.style?.height ?? '',
          }}
        />
      )}
      <canvas ref={canvas} {...rest}></canvas>
      {children}
    </>
  );
}
