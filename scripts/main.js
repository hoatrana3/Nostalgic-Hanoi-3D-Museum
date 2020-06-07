function onBodyLoaded() {
    toggleCameraPointerLockControl(true)

    addAccessButtonEvent()
    modelViewerCloseButtonEvent()
    pauseAllVideo()

    setupAllViewerThings()
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
    })
}

function modelViewerCloseButtonEvent() {
    const modelViewerDom = document.getElementById('model-viewer-container')
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