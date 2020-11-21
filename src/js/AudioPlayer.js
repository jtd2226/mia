import { Audio, AudioLoader, AudioAnalyser, AudioListener } from "three";

function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

export const state = {
    needsToLoad: "needsToLoad",
    loading: "isLoading",
    playing: "isPlaying",
    paused: "isPaused",
};

class AudioPlayer {
    constructor(props) {
        this.props = props;
        this.props.frequencyCount = this.props.frequencyCount || 2048;
        this.fftSize = this.props.frequencyCount * 2;

        this.audio = new Audio(new AudioListener());
        this.container = document.createElement("div");
        this.container.style = `display: grid;
                                grid-gap: 40px;
                                align-items: center;
                                grid-template-columns: min-content 1fr;`;

        this.button = document.createElement("i");
        this.updateIcon("fa-play");
        this.container.appendChild(this.button);

        this.progressContainer = document.createElement("div");
        this.progressContainer.style = `display: grid;
                                        align-items: end;
                                        grid-template-rows: 1fr 1fr;
                                        grid-template-columns: 1fr 1fr;`;
        this.progress = document.createElement("progress");
        this.progress.style = `grid-column: 1 / span 2; width: 100%; opacity: 0.7;`;
        this.progressContainer.appendChild(this.progress);

        this.forwardProgress = document.createElement("p");
        this.reverseProgress = document.createElement("p");
        this.reverseProgress.style.textAlign = "end";
        this.progressContainer.appendChild(this.forwardProgress);
        this.progressContainer.appendChild(this.reverseProgress);

        this.resetProgress();
        this.container.appendChild(this.progressContainer);

        this.setSong(this.props.song);

        this.addEventListeners();
    }

    updateIcon = (name) => {
        this.button.className = `fas ${name} fa-3x`;
    };

    resetProgress() {
        this.progress.max = 100.0;
        this.progress.value = 0.0;
        this.forwardProgress.innerHTML = "0:00";
        this.reverseProgress.innerHTML = "-0:00";
    }

    setSong = (song) => {
        if (song) this.pause();
        this.props.song = song;
        this.resetProgress();
        this.state = song ? state.needsToLoad : "";
        this.button.style = song
            ? `cursor: pointer;`
            : `cursor: not-allowed; opacity: 0.3;`;
    };

    getFrequencyData = () => this.audioAnalyser.getAverageFrequency();

    addEventListeners = () => {
        this.button.addEventListener("click", this.toggleAudioPlay);
        window.addEventListener("keyup", this.onKeyUp);
        if (this.props.audioFinishedPlaying)
            this.audio.addEventListener(
                "ended",
                this.props.audioFinishedPlaying
            );
    };

    removeEventListeners = () => {
        this.button.removeEventListener("click", this.toggleAudioPlay);
        window.removeEventListener("keyup", this.onKeyUp);
        if (this.props.audioFinishedPlaying)
            this.audio.removeEventListener(
                "ended",
                this.props.audioFinishedPlaying
            );
    };

    dispose = () => {
        this.removeEventListeners();
        this.audio.disconnect();
        if (this.audio) this.audio.pause();
    };

    animateButton = () => this.button.classList.add("spin-animation");

    stopButtonAnimation = () => this.button.classList.remove("spin-animation");

    //**blob to dataURL**
    blobToDataURL(blob) {
        var a = new FileReader();
        return new Promise((resolve, reject) => {
            a.onload = (e) => resolve(e.target.result);
            a.onerror = (e) => reject(e);
            a.readAsDataURL(blob);
        });
    }

    loadAudio = async () => {
        this.state = state.loading;
        this.updateIcon("fa-compact-disc");
        const song =
            typeof this.props.song === "string"
                ? this.props.song
                : await this.blobToDataURL(this.props.song);

        this.animateButton();

        this.props.camera.remove(this.listener);
        this.listener = new AudioListener();
        this.audio = new Audio(this.listener);
        this.props.camera.add(this.listener);

        const loader = new AudioLoader();
        loader.load(
            song,
            function (buffer) {
                this.audio.setBuffer(buffer);
                this.stopButtonAnimation();
                this.progress.value = 0.0;
                this.progress.max = this.audio.buffer.duration || 0.0;
                this.play();
            }.bind(this)
        );
        this.audioAnalyser = new AudioAnalyser(this.audio, this.fftSize);
        this.audioAnalyser.analyser.smoothingTimeConstant = 0.99;
    };

    updateProgress = () => {
        const time = this.audio.context.currentTime;
        this.progress.value = time;

        this.forwardProgress.innerHTML = fmtMSS(time.toFixed(0));
        this.reverseProgress.innerHTML = `-${fmtMSS(
            (this.progress.max - time).toFixed(0)
        )}`;
    };

    onKeyUp = (event) => {
        if (event.keyCode === 32) this.toggleAudioPlay();
    };

    toggleAudioPlay = (event) => {
        if (event) event.stopPropagation();
        switch (this.state) {
            case state.playing:
                this.pause();
                break;
            case state.paused:
                this.play();
                break;
            case state.needsToLoad:
                this.loadAudio();
                break;
            default:
                break;
        }
    };

    play = () => {
        this.state = state.playing;
        this.audio.play();
        this.updateIcon("fa-pause");
        if (this.props.onPlay) this.props.onPlay();
    };

    pause = () => {
        this.state = state.paused;
        this.audio.pause();
        this.updateIcon("fa-play");
        if (this.props.onPause) this.props.onPause();
    };
}

export default AudioPlayer;
