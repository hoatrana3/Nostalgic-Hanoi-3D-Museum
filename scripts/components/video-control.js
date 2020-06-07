AFRAME.registerComponent('video-control', {
    init: function () {
        this.el.addEventListener('click', () => {
            const targetVideo = document.querySelector(this.el.getAttribute('src'))

            if (targetVideo.paused) {
                targetVideo.play()
            } else {
                targetVideo.pause()
            }
        })
    }
});