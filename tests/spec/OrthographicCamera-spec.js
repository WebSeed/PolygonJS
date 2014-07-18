define(
    [
        'polygonjs/Entity',
        'polygonjs/cameras/Camera',
        'polygonjs/cameras/OrthographicCamera'
    ],
    function (Entity, Camera, OrthographicCamera) { 

        "use strict";

        describe('OrthographicCamera', function () {

            it('should "extend" Camera', function () {
                var p = Camera.create();
                expect(p instanceof Camera).toBe(true);
                expect(p instanceof Entity).toBe(true);
            });

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var camera = OrthographicCamera.create();
                    expect(camera instanceof OrthographicCamera).toBeTruthy();
                });

                it('should have an entity type of \'camera\'', function () {
                    var camera = Camera.create();
                    expect(camera.type).toBe('camera');
                });
            });
        });
    }
);