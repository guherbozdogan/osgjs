(function() {
    var Shaders = function() {
        this._name = 'Shaders';
    };
    Shaders.prototype = {
        getShader: function() {
            var vertexshader = [
                '',
                'precision highp float;',
                'attribute vec3 Vertex;',
                'attribute vec3 Normal;',
                'uniform mat4 uModelViewMatrix;',
                'uniform mat4 uProjectionMatrix;',
                'uniform mat3 uModelViewNormalMatrix;',
                'uniform vec3 lightPos;',
                'uniform vec3 eyePos;',
                'varying vec4 position;',
                'varying vec3 l;',
                'varying vec3 v;',
                'varying vec3 n;',
                'varying float alpha;',

                'float rand(vec2 n){  return 0.5 + 0.5 * fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);}',

                'void main(void) {',
                '  vec3 p = vec3(uModelViewMatrix * vec4(Vertex,1.0));',
                '  l = normalize ( lightPos - p);',

                '  v = normalize ( eyePos - p);',

                '  n = normalize(uModelViewNormalMatrix * Normal);',
                '//Vertex.x = Vertex.x + rand(1.0); Vertex.y = Vertex.y + rand(1.0);',

                ' gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(Vertex,1.0); alpha = 1.0;',
                '  position = uModelViewMatrix * vec4(Vertex.x  ,Vertex.y ,Vertex.z,1.0); ',
                '}'
            ].join('\n');

            var fragmentshader = [
                '',
                'precision highp float;',
                'uniform vec3 color;',
                'varying vec3 l;',
                'varying vec3 v;',
                'varying vec3 n;',
                'varying float alpha;',
                'void main(void) {',
                '  const vec4 diffColor  = vec4(0.5, 0.0, 0.0, 1.0);',
                '  const vec4 specColor  = vec4(0.7, 0.7, 0.0, 1.0);',
                '  const float specPower = 30.0;',

                '  vec3 n2 = normalize( n );',
                '  vec3 l2 = normalize( l );',
                '  vec3 v2 = normalize( v );',
                '  vec3 r = reflect( -v2, n2 );',
                '  vec4 diff = diffColor *  max(dot(n2,l2), 0.0);',
                '  vec4 spec = specColor *  pow(max(dot(l2, r), 0.0), specPower);',
                '  gl_FragColor = diff + spec;',
                '}',
                ''
            ].join('\n');

            var program = new osg.Program(
                new osg.Shader('VERTEX_SHADER', vertexshader),
                new osg.Shader('FRAGMENT_SHADER', fragmentshader)
            );
            return program;
        }
    };

    window.CShaders = Shaders;
})();
