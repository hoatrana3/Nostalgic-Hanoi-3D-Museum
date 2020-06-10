AFRAME.registerComponent('museum-image', {
    schema: {
        index: {
            type: 'int',
            default: -1
        },
        viewer: {
            type: 'string',
            default: ''
        }
    },
    init: function () {
        const findViewerInterval = setInterval(() => {
            const viewer = viewers[this.data.viewer]

            if (viewer != null) {
                this.el.addEventListener('click', () => {
                    viewer.show()
                    if (this.data.index !== -1) viewer.view(this.data.index)
                })

                clearInterval(findViewerInterval)
            }
        }, 500)
    }
});