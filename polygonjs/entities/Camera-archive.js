define(
    [
        'polygonjs/Entity',
        'polygonjs/lib',
        'polygonjs/math',
        'polygonjs/geom/Vector2',
        'polygonjs/geom/Vector3'
    ],
    function (Entity, lib, math, Vector2, Vector3) {

        "use strict"

        var Camera = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'camera';
            this.zoom = opts.zoom || 1;
            this.mode = opts.mode || Camera.ISOMETRIC;
            switch (this.mode) {
                case Camera.ORTHOGRAPHIC:
                    this.facingVector = Vector3.create(-1, 0, 0).normalise();
                    this.projectToScreen = Camera.orthographicProjection;
                    break;
                case Camera.ISOMETRIC:
                    this.facingVector = Vector3.create(-1, -1, -1).normalise();
                    this.projectToScreen = Camera.isometricProjection;
                    break;
            }
        };

        Camera.ORTHOGRAPHIC = 'orthographic';
        Camera.ISOMETRIC = 'isometric';

        Camera.prototype = Object.create(Entity.prototype);

        Camera.orthographicProjection = function (v) {
            // return Vector3.create(v.z, -v.y, v.z);
            return Vector2.create(v.z, -v.y);
        };

        Camera.isometricProjection = function (v) {
            var vx = v.x, vy = -v.y, vz = v.z;
            var alpha = Math.PI / 6; // 30 degrees
            var beta = alpha;
            var x = (vx * Math.cos(alpha)) - (vz * Math.cos(beta));
            var y = (vx * Math.sin(alpha)) + (vz * Math.sin(beta)) + vy;
            // var z = ()
            return Vector2.create(x, y);
        };

        Camera.create = function (opts) {
            return new Camera(opts);
        };

        Camera.prototype.project = function (v) {
            return this.projectToScreen(v).multiplyBy(this.zoom);
        };

        Camera.prototype.distanceSort = function (vertices) {
            var self = this;
            var sorted = vertices.map(function (v, i) { return {v: v, i: i}; });
            var eye = this.facingVector.multiply(1000);
            sorted.sort(function (a, b) {
                return a.v.distanceToSquared(eye) - b.v.distanceToSquared(eye);
            });
            // sorted.sort(function (a, b) {
            //     return self.facingVector.dotProduct(a.v) - self.facingVector.dotProduct(b.v);
            // });
            return sorted.map(function (o) { return o.i; });
        };

        return Camera;
    }
);