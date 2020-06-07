alert('Cảm ơn bạn đã ghé thăm triển lãm Hoài niệm Hà Nội phố.\nQuá trình tải và hiển thị dữ liệu ở lần đầu truy cập có thể mất khoảng 1 phút, kính mong bạn thông cảm...')

function onBodyLoaded() {
    pauseAllVideo()
    setTimeoutLoadData()
}

function setTimeoutLoadData() {
    const timeout = setTimeout(function () {
        console.log('Timeout load data!')

        setAccessButtonContent()
        addAccessButtonEvent()

        toggleCameraPointerLockControl(true)

        modelViewerCloseButtonEvent()

        setupAllViewerThings()
    }, 10000)

    console.log(timeout)
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