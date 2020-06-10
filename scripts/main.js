alert('Cảm ơn bạn đã ghé thăm triển lãm Hoài niệm Hà Nội phố.\nQuá trình tải và hiển thị dữ liệu ở lần đầu truy cập có thể mất khoảng 1 phút, kính mong bạn thông cảm...')

function onBodyLoaded() {
    pauseAllVideo()
    setAllModelLoadedEvent()
    turnOffRoomLights()

    setupAllViewerThings()
    modelViewerCloseButtonEvent()
    setOptionButtonsEvent()

    setTimeout(function () {
        setupThingsAfterLoaded()
    }, 5000)
}

function setupThingsAfterLoaded() {
    setAccessButtonContent()
    addAccessButtonEvent()
    setSceneUpdateShadow()
    toggleCameraPointerLockControl(true)
}

function setSceneUpdateShadow() {
    const scene = document.querySelector('a-scene')
    scene.renderer.shadowMap.autoUpdate = false;
    scene.renderer.shadowMap.needsUpdate = true;
}

function setAllModelLoadedEvent() {
    const modelList = document.querySelectorAll('[gltf-model]')
    let timeoutLoadedAll = null

    modelList.forEach(model => {
        model.addEventListener('model-loaded', () => {
            if (timeoutLoadedAll != null) clearTimeout(timeoutLoadedAll)
            timeoutLoadedAll = setTimeout(() => {
                setupThingsAfterLoaded()
            }, 1000)
        })
    })
}

function setAccessButtonContent() {
    const accessBtnText = document.getElementById('access-btn-text')
    const accessBtnIcon = document.getElementById('access-btn-icon')

    if (accessBtnText != null) accessBtnText.innerHTML = 'Xem triển lãm'
    if (accessBtnIcon != null) {
        accessBtnIcon.classList.remove('fa-spinner')
        accessBtnIcon.classList.add('fa-arrow-right')
    }
}

function pauseAllVideo() {
    const videos = document.querySelectorAll('video')
    videos.forEach(video => video.pause())
}

function addAccessButtonEvent() {
    const loadingScreen = document.getElementById('loading-screen')
    const accessBtn = document.getElementById('access-btn')

    accessBtn.addEventListener('click', () => {
        loadingScreen.classList.add('hide')
        setSceneUpdateShadow()
    })
}

function setOptionButtonsEvent() {
    homeButtonEvent()
    facebookButtonEvent()
    screenshotButtonEvent()
    lightToggleButtonEvent()
}

function homeButtonEvent() {
    const loadingScreen = document.getElementById('loading-screen')
    const homeButton = document.getElementById('home-btn')
    homeButton.addEventListener('click', () => {
        loadingScreen.classList.remove('hide')
    })
}

function facebookButtonEvent() {
    const facebookButton = document.getElementById('facebook-btn')
    facebookButton.addEventListener('click', () => {
        if (confirm("Sẽ có popup trang cá nhân Facebook của chúng tôi xuất hiện.\nBạn muốn ghé thăm chứ?")) {
            window.open('https://www.facebook.com/hoatrana3', '_blank')
            window.open('https://www.facebook.com/ngohoang34', '_blank')
        }
    })
}

function screenshotButtonEvent() {
    const screenshotButton = document.getElementById('screenshot-btn')
    screenshotButton.addEventListener('click', () => {
        if (confirm("Quá trình screenshot sẽ cho bạn 2 ảnh: dạng perspective và dạng equirectangular để tải xuống.\nQuá trình sẽ mất khoảng vài giây, bạn muốn screenshot ngay chứ?")) {
            document.querySelector('a-scene').components.screenshot.capture('perspective');
            document.querySelector('a-scene').components.screenshot.capture('equirectangular');
        }
    })
}

function lightToggleButtonEvent() {
    const lightToggleBtn = document.getElementById('light-toggle-btn')
    lightToggleBtn.addEventListener('click', () => {
        lightToggleBtn.classList.toggle('light-on')

        if (lightToggleBtn.classList.contains('light-on')) {
            turnOnRoomLights()
            setSceneUpdateShadow()
        } else {
            turnOffRoomLights()
        }
    })
}

function turnOffRoomLights() {
    const frontLight = document.getElementById('front-light')
    const room1Light = document.getElementById('room1-light')
    const room2Light = document.getElementById('room2-light')
    const room3Light = document.getElementById('room3-light')

    turnOffLight(frontLight)
    turnOffLight(room1Light)
    turnOffLight(room2Light)
    turnOffLight(room3Light)
}

function turnOnRoomLights() {
    const frontLight = document.getElementById('front-light')
    const room1Light = document.getElementById('room1-light')
    const room2Light = document.getElementById('room2-light')
    const room3Light = document.getElementById('room3-light')

    turnOnLight(frontLight)
    turnOnLight(room1Light)
    turnOnLight(room2Light)
    turnOnLight(room3Light)
}

function turnOffLight(light) {
    light.setAttribute('visible', false)
    light.setAttribute('light', 'castShadow', false)
    light.setAttribute('light', 'intensity', 0)
}

function turnOnLight(light) {
    light.setAttribute('visible', true)
    light.setAttribute('light', 'castShadow', true)
    light.setAttribute('light', 'intensity', 1)
}

function modelViewerCloseButtonEvent() {
    const closeBtn = document.getElementById('model-view-close-btn')

    closeBtn.addEventListener('click', () => {
        toggleModelViewer(false)
    })

    document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) toggleModelViewer(false)
    })
}

function toggleCameraPointerLockControl(isEnable) {
    const cameraEl = document.getElementById('mainCamera')

    if (cameraEl != null) {
        if (isEnable) {
            cameraEl.setAttribute('look-controls', 'enabled: true; pointerLockEnabled: true')
        } else {
            cameraEl.setAttribute('look-controls', 'enabled: false')
        }
    }
}

function toggleModelViewer(isOpen, objectId) {
    if (isOpen) {
        const modelViewerDom = document.getElementById('model-viewer-container')

        if (modelViewerDom != null) {
            modelViewerDom.classList.add('show')
            toggle3DObjectContent(true, objectId)
            toggleCameraPointerLockControl(false)
        }
    } else {
        const modelViewerDom = document.getElementById('model-viewer-container')

        if (modelViewerDom != null) {
            modelViewerDom.classList.remove('show')
            toggle3DObjectContent(false)
            toggleCameraPointerLockControl(true)
        }
    }
}