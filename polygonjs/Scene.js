define(['polygonjs/Fn'], function (Fn) {

    var Scene = function (opts) {
        opts = opts || {};
        this.root = null;
        this.cameras = [];
        this.lights = [];
        this.polygons = [];
        this.models = [];

        this.mainCamera = null;
    };

    Scene.create = function (opts) {
        return new Scene(opts);
    };

    Scene.prototype = {

        update: function (delta) {
            if (this.root)
                this.root.update(delta);
        },

        revalidate: function () {
            var self = this;
            this.cameras = [];
            this.lights = [];
            this.polygons = [];
            this.models = [];
            this._revalidateFromChildren(this.root.children);
            
            if (this.cameras.length > 0 && !Fn.contains(this.camera, this.mainCamera))
                this.mainCamera = this.cameras[0];
        },

        _revalidateFromChildren: function (children) {
            var self = this;
            Fn.each(children, function (entity) {
                switch (entity.type) {
                    case 'camera':
                        self.cameras.push(entity);
                        break;
                    case 'light':
                        self.lights.push(entity);
                        break;
                    case 'polygon':
                        self.polygons.push(entity);
                        break;
                    case 'model':
                        self.models.push(entity);
                        break;
                }
                self._revalidateFromChildren(entity.children);
            });
        }
    };

    return Scene;
});