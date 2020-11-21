import { WEBGL } from "three/examples/jsm/WebGL";
import Scene from "./Scene";
import { template } from "./util";

function smoothscroll(to = 0, step = 3, element = document.documentElement) {
    return new Promise((resolve) => {
        let start;
        let id;
        const pos = element.scrollTop;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const thresh = 1;
            const d = to <= pos ? -1 : 1;
            const newPos = pos + elapsed * step * d;
            element.scrollTop = newPos;
            if (newPos <= to + thresh) {
                element.scrollTop = to;
                cancelAnimationFrame(id);
                resolve();
            } else {
                id = requestAnimationFrame(animate);
            }
        };
        id = requestAnimationFrame(animate);
    });
}

const animate = (element, from = {}) => ({
    to: (props) =>
        new Promise((resolve) => {
            let start;
            let id;
            const { y } = props;
            const pos = from.y || 0;
            const duration = props.duration || 700;
            const anim = (timestamp) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const lerp =
                    ((y - pos) / ((duration / 100) * 6)) * (0.1 * elapsed) +
                    pos;
                // const thresh = 1;
                element.style.top = `${lerp}px`;
                if ((y > pos && lerp >= y) || (y < pos && lerp <= y)) {
                    element.style = element.style;
                    cancelAnimationFrame(id);
                    resolve();
                } else {
                    id = requestAnimationFrame(anim);
                }
            };
            id = requestAnimationFrame(anim);
        }),
});

function toggleScrollButton(pos) {
    const nav = document.getElementById("nav");
    const yPos = window.innerHeight * 0.7;
    if (pos < 150 && nav.classList.contains("bottombar")) {
        return animate(nav, { y: yPos })
            .to({ y: 0 })
            .then(() => nav.classList.remove("bottombar"));
    } else if (pos > 150 && !nav.classList.contains("bottombar")) {
        return animate(nav)
            .to({ y: yPos })
            .then(() => nav.classList.add("bottombar"));
    }
    return new Promise((resolve) => resolve());
}

let ticking = false;
function onScroll(e) {
    if (ticking) return;
    window.requestAnimationFrame(() => {
        toggleScrollButton(document.documentElement.scrollTop).then(() => {
            ticking = false;
        });
    });
    ticking = true;
}

function tabClicked(event, links) {
    const scrollPos = document.documentElement.scrollTop;
    const h = window.innerHeight;

    if (event.target.classList.contains("selected")) {
        if (scrollPos > h) window.scrollTo(0, window.innerHeight);
        smoothscroll();
        return;
    }

    setTimeout(() => {
        if (scrollPos > h) window.scrollTo(0, window.innerHeight);
        smoothscroll();
    }, 500);
    let tabContent = document.getElementById("tabContent");
    links.forEach((link) => {
        link.classList.remove("selected");
    });
    event.target.classList.add("selected");
    tabContent.parentNode.replaceChild(tabContent.cloneNode(false), tabContent);
    tabContent = document.getElementById("tabContent");

    tabContent.appendChild(template(event.target.dataset.content));
    tabContent.classList.remove("slideup");
    tabContent.classList.add("slidein");
}

const initApp = () => {
    initScene();
    initContent();
    window.addEventListener("scroll", onScroll);
};

function initContent() {
    const mia = document.getElementById("mia");
    if (!mia) return;

    const links = [
        document.getElementById("musicTab"),
        document.getElementById("mediaTab"),
        document.getElementById("contactTab"),
    ];

    const tabContent = document.getElementById("tabContent");

    mia.classList.add("slidedown");

    setTimeout(() => {
        mia.classList.remove("slidedown");
    }, 2100);

    links.forEach((link) => {
        link.addEventListener("click", (event) => tabClicked(event, links));
    });
    tabContent.appendChild(template("musicContent"));
}

function initScene() {
    if (WEBGL.isWebGLAvailable()) {
        let scene = new Scene(document.getElementById("scene"));
    } else {
        const staticbg = document.createElement("div");
        staticbg.className = "bgimage";
        document.documentElement.appendChild(staticbg);
    }
}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    initApp();
} else {
    document.addEventListener("DOMContentLoaded", initApp);
}
