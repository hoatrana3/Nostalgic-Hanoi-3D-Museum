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
        this.el.addEventListener('click', () => {
            const viewer = viewers[this.data.viewer]
            viewer.show()
            if (this.data.index !== -1) viewer.view(this.data.index)
        })
    }
});