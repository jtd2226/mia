import Stage from './Stage'
import {template} from './util'

const APP = window.APP || {}

function tabClicked(event, links) {
    if(event.target.classList.contains("selected")) return;

    let tabContent = document.getElementById("tabContent");
    links.forEach(link => {
        link.classList.remove("selected")
    })
    event.target.classList.add("selected")
    
    tabContent.parentNode.replaceChild(tabContent.cloneNode(false), tabContent)
    tabContent = document.getElementById("tabContent");

    tabContent.appendChild(template(event.target.dataset.content))
    tabContent.classList.remove("slideup")
    tabContent.classList.add("slidein")
}

const initApp = () => {
    window.APP = APP

    APP.Stage = new Stage()

    const links = [document.getElementById("musicTab"),
                   document.getElementById("mediaTab"),
                   document.getElementById("contactTab")];

    const mia = document.getElementById('mia')
    const tabContent = document.getElementById("tabContent")
    
    mia.classList.add('slidedown')
    
    setTimeout(() => {
        mia.classList.remove('slidedown')
    }, 2100)
    
    links.forEach(link => {
        link.addEventListener("click", event => tabClicked(event, links))
    })
    tabContent.appendChild(template("musicContent"))
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    initApp()
} else {
    document.addEventListener('DOMContentLoaded', initApp)
}
