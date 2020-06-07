AFRAME.registerComponent('museum-object', {
    schema: {
        hoverable: {
            type: 'boolean',
            default: true
        },
        is3DObject: {
            type: 'boolean',
            default: false
        }
    },
    init: function () {
        if (this.data.hoverable) {
            this.el.addEventListener('mouseenter', () => {
                const currentScale = this.el.object3D.scale
                this.el.object3D.scale.set(currentScale.x + 0.1, currentScale.y + 0.1, currentScale.z + 0.05)
            })

            this.el.addEventListener('mouseleave', () => {
                const currentScale = this.el.object3D.scale
                this.el.object3D.scale.set(currentScale.x - 0.1, currentScale.y - 0.1, currentScale.z - 0.05)
            })
        }

        if (this.data.is3DObject) {
            this.el.addEventListener('click', () => {
                toggleModelViewer(true, this.el.id)

                const modelViewer = document.getElementById('model-viewer')
                if (modelViewer != null) {
                    modelViewer.setAttribute('src', this.el.getAttribute('gltf-model'))
                }
            })
        }
    }
});