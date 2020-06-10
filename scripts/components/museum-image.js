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
        const viewer = viewers[this.data.viewer]

        this.el.addEventListener('click', () => {
            viewer.show()
            if (this.data.index !== -1) viewer.view(this.data.index)
        })
    }
});