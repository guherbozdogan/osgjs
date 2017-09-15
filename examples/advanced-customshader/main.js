(function() {
    'use strict';

    // various osg shortcuts
    var OSG = window.OSG;
    var osg = OSG.osg;
    var AppOSGJS = window.AppOSGJS;
    var CShapeHelper = window.CShapeHelper;
    var CShaders = window.CShaders;

    // inherits for the ExampleOSGJS prototype
    var Example = function() {
        // can be overriden with url parm ?&scale=1
        this._config = {
            scale: 0.1
        };
    };

    Example.prototype = osg.objectInherit(AppOSGJS, {
        initDatGUI: function() {
            // config to let data gui change the scale
            this._gui = new window.dat.GUI();
            // use of scale from config default value or url parm ?&scale=1
            var controller = this._gui.add(this._config, 'scale', 0.1, 2.0);
            var self = this;
            controller.onChange(function(value) {
                // change the matrix
                osg.mat4.fromScaling(self._model.getMatrix(), [value, value, value]);
                self._model.dirtyBound();
            });
        }
    });

    window.addEventListener(
        'load',
        function() {
            'use strict';

            var app = new AppOSGJS();

            // inherits for the ExampleOSGJS prototype
            app._config = {
                scale: 0.1
            };

            app.initDatGUI = function() {
                // config to let data gui change the scale
                this._gui = new window.dat.GUI();
                // use of scale from config default value or url parm ?&scale=1
                var controller = this._gui.add(this._config, 'scale', 0.1, 2.0);
                var self = this;
                controller.onChange(function(value) {
                    // change the matrix
                    osg.mat4.fromScaling(self._model.getMatrix(), [value, value, value]);
                    self._model.dirtyBound();
                });
            };

            app
                .readShaders([
                    'shaders/standardFragmentShader.glsl',
                    'shaders/standardVertexShader.glsl'
                ])
                .bind(app)
                .then(function() {
                    app.run({
                        antialias: true,
                        alpha: true
                    });
                });
        },
        true
    );
})();
