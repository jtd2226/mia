import Stage from './Stage'

const APP = window.APP || {}

/*-----------------------------------------------------------------------------------*/
/*  01. INIT
/*-----------------------------------------------------------------------------------*/

const initApp = () => {
    window.APP = APP

    APP.Stage = new Stage()

    const buttonContainer = document.querySelector('.buttonContainer')
    const mia = document.getElementById('mia')

    buttonContainer.classList.add('fadein')
    mia.classList.add('slidedown')

    setTimeout(() => {
        buttonContainer.classList.remove('fadein')
    }, 3500)

    setTimeout(() => {
        mia.classList.remove('slidedown')
    }, 3150)
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    initApp()
} else {
    document.addEventListener('DOMContentLoaded', initApp)
}
