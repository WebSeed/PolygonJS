define(['polygonjs/math'], function (math) {

    "use strict";

    var Vector3 = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };

    Vector3.create = function (x, y, z) {
        return new Vector3(x, y, z);
    };

    Vector3.createFromArray = function (arr) {
        return new Vector3(arr[0], arr[1], arr[2]);
    };

    Vector3.createFromArrays = function (ia) {
        var oa = [];
        if (ia) {
            var len = ia.length;
            for (var i = 0; i < len; i++) {
                oa.push(Vector3.createFromArray(ia[i]));
            }
        }
        return oa;
    };

    Vector3.mean = function (arrs) {
        var ax = 0,
            ay = 0,
            az = 0;
        if (arrs) {
            var len = arrs.length;
            for (var i = 0; i < len; i++) {
                ax += arrs[i].x;
                ay += arrs[i].y;
                az += arrs[i].z;
            }
            ax /= len;
            ay /= len;
            az /= len;
        }
        return Vector3.create(ax, ay, az);
    };

    Vector3.normalFromPositionVectors = function (a, b, c) {
        var ba = a.subtract(b);
        var ca = a.subtract(c);
        return ba.normal(ca);
    };

    Vector3.prototype = {
        
        clone: function () {
            return new Vector3(this.x, this.y, this.z);
        },

        copy: function (v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            return this;
        },

        equals: function (v) {
            return (math.equals(this.x, v.x) &&
                math.equals(this.y, v.y) &&
                math.equals(this.z, v.z));
        },

        toArray: function () {
            return [this.x, this.y, this.z];
        },

        // TODO: deprecate
        add: function (v) {
            return this.clone().addTo(v);
        },

        addTo: function (v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        },

        // TODO: deprecate
        subtract: function (v) {
            return this.clone().subtractBy(v);
        },

        subtractBy: function (v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        },

        // TODO: deprecate
        multiply: function (k) {
            return this.clone().multiplyBy(k);
        },

        multiplyBy: function (k) {
            this.x *= k;
            this.y *= k;
            this.z *= k;
            return this;
        },

        distanceTo: function (v) {
            return Math.sqrt(this.distanceToSquared(v));
        },

        distanceToSquared: function (v) {
            var dx = v.x - this.x;
            var dy = v.y - this.y;
            var dz = v.z - this.z;
            return dx * dx + dy * dy + dz * dz;
        },

        magnitude: function () {
            return Math.sqrt(this.magnitudeSquared());
        },

        magnitudeSquared: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },

        crossProduct: function (v) {
            var x = this.x, y = this.y, z = this.z;
            this.x = y * v.z - z * v.y;
            this.y = z * v.x - x * v.z;
            this.z = x * v.y - y * v.x;
            return this;
        },

        dotProduct: function (v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        },

        normalise: function () {
            var mag = this.magnitude();
            if (mag !== 0) {
                this.x /= mag;
                this.y /= mag;
                this.z /= mag;
            }
            return this;
        },

        normalised: function () {
            return this.clone().normalise();
        },

        normal: function (v) {
            return this.crossProduct(v).normalise();
        },

        applyMatrix4: function (m) {
            var x = this.x, y = this.y, z = this.z;
            this.x = x * m.a + y * m.b + z * m.c;
            this.y = x * m.e + y * m.f + z * m.g;
            this.z = x * m.i + y * m.j + z * m.k;
            return this;
        },

        applyProjection: function (m) {
            var x = this.x, y = this.y, z = this.z;
            this.x = x * m.a + y * m.b + z * m.c + m.d;
            this.y = x * m.e + y * m.f + z * m.g + m.h;
            this.z = x * m.i + y * m.j + z * m.k + m.l;
            var vw  = x * m.m + y * m.n + z * m.o + m.p;
            if (vw !== 0 && vw !== 1) {
                this.x /= vw;
                this.y /= vw;
                this.z /= vw;
            }
            return this;
        }
    };

    Vector3.ZERO    = Vector3.create(0, 0, 0);
    Vector3.ONE     = Vector3.create(1, 1, 1);
    Vector3.X       = Vector3.create(1, 0, 0);
    Vector3.Y       = Vector3.create(0, 1, 0);
    Vector3.Z       = Vector3.create(0, 0, 1);
    Vector3.UP      = Vector3.create(0, 1, 0);
    Vector3.DOWN    = Vector3.create(0, -1, 0);
    Vector3.FORWARD = Vector3.create(0, 0, -1);
    Vector3.BACK    = Vector3.create(0, 0, 1);
    Vector3.RIGHT   = Vector3.create(1, 0, 0);
    Vector3.LEFT    = Vector3.create(-1, 0, 0);

    return Vector3;
});