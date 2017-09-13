'use strict';

var OSG = window.OSG;
var osgGA = OSG.osgGA;
var osg = OSG.osg;
var osgViewer = OSG.osgViewer;
var osgUtil = OSG.osgUtil;

var CADManipulatorStandardMouseKeyboardController =
    osgGA.CADManipulatorStandardMouseKeyboardController;
//var CCADManipulator = osgGA.CCADManipulator;

var createTexturedBoxGeometryLines = function(cx, cy, cz, sx, sy, sz) {
    var centerx = cx !== undefined ? cx : 0.0;
    var centery = cy !== undefined ? cy : 0.0;
    var centerz = cz !== undefined ? cz : 0.0;

    var sizex = sx !== undefined ? sx : 1.0;
    var sizey = sy !== undefined ? sy : 1.0;
    var sizez = sz !== undefined ? sz : 1.0;

    var g = new osg.Geometry();
    var dx, dy, dz;
    dx = sizex / 2.0;
    dy = sizey / 2.0;
    dz = sizez / 2.0;

    var vertexes = new osg.Float32Array(24);

    // var uv = new MACROUTILS.Float32Array(48);
    // var normal = new MACROUTILS.Float32Array(72);

    // -ve y plane
    vertexes[0] = centerx - dx;
    vertexes[1] = centery - dy;
    vertexes[2] = centerz - dz;

    vertexes[3] = centerx + dx;
    vertexes[4] = centery - dy;
    vertexes[5] = centerz - dz;

    vertexes[6] = centerx + dx;
    vertexes[7] = centery + dy;
    vertexes[8] = centerz - dz;

    vertexes[9] = centerx - dx;
    vertexes[10] = centery + dy;
    vertexes[11] = centerz - dz;

    // +ve y plane
    vertexes[12] = centerx - dx;
    vertexes[13] = centery - dy;
    vertexes[14] = centerz + dz;

    vertexes[15] = centerx + dx;
    vertexes[16] = centery - dy;
    vertexes[17] = centerz + dz;

    vertexes[18] = centerx + dx;
    vertexes[19] = centery + dy;
    vertexes[20] = centerz + dz;

    vertexes[21] = centerx - dx;
    vertexes[22] = centery + dy;
    vertexes[23] = centerz + dz;

    var indexes = new osg.Uint16Array(24);
    indexes[0] = 0;
    indexes[1] = 1;
    indexes[2] = 1;
    indexes[3] = 2;
    indexes[4] = 2;
    indexes[5] = 3;

    indexes[6] = 3;
    indexes[7] = 0;
    indexes[8] = 4;
    indexes[9] = 5;
    indexes[10] = 5;
    indexes[11] = 6;

    indexes[12] = 6;
    indexes[13] = 7;
    indexes[14] = 7;
    indexes[15] = 4;

    indexes[16] = 0;
    indexes[17] = 4;

    indexes[18] = 1;
    indexes[19] = 5;
    indexes[20] = 2;
    indexes[21] = 6;
    indexes[22] = 3;
    indexes[23] = 7;

    g.getAttributes().Vertex = new osg.BufferArray(osg.BufferArray.ARRAY_BUFFER, vertexes, 3);

    var primitive = new osg.DrawElements(
        osg.primitiveSet.LINES,
        new osg.BufferArray(osg.BufferArray.ELEMENT_ARRAY_BUFFER, indexes, 1)
    );

    g.getPrimitives().push(primitive);
    return g;
};

var createTexturedBoxGeometry = function(cx, cy, cz, sx, sy, sz) {
    var centerx = cx !== undefined ? cx : 0.0;
    var centery = cy !== undefined ? cy : 0.0;
    var centerz = cz !== undefined ? cz : 0.0;

    var sizex = sx !== undefined ? sx : 1.0;
    var sizey = sy !== undefined ? sy : 1.0;
    var sizez = sz !== undefined ? sz : 1.0;

    var g = new osg.Geometry();
    var dx, dy, dz;
    dx = sizex / 2.0;
    dy = sizey / 2.0;
    dz = sizez / 2.0;

    var vertexes = new osg.Float32Array(72);
    var uv = new osg.Float32Array(48);
    var normal = new osg.Float32Array(72);

    // -ve y plane
    vertexes[0] = centerx - dx;
    vertexes[1] = centery - dy;
    vertexes[2] = centerz + dz;
    normal[0] = 0.0;
    normal[1] = -1.0;
    normal[2] = 0.0;
    uv[0] = 0.0;
    uv[1] = 0.0;

    vertexes[3] = centerx - dx;
    vertexes[4] = centery - dy;
    vertexes[5] = centerz - dz;
    normal[3] = 0.0;
    normal[4] = -1.0;
    normal[5] = 0.0;
    uv[2] = 0.0;
    uv[3] = 0.0;

    vertexes[6] = centerx + dx;
    vertexes[7] = centery - dy;
    vertexes[8] = centerz - dz;
    normal[6] = 0.0;
    normal[7] = -1.0;
    normal[8] = 0.0;
    uv[4] = 0.0;
    uv[5] = 0.0;

    vertexes[9] = centerx + dx;
    vertexes[10] = centery - dy;
    vertexes[11] = centerz + dz;
    normal[9] = 0.0;
    normal[10] = -1.0;
    normal[11] = 0.0;
    uv[6] = 0.0;
    uv[7] = 0.0;

    // +ve y plane
    vertexes[12] = centerx + dx;
    vertexes[13] = centery + dy;
    vertexes[14] = centerz + dz;
    normal[12] = 0.0;
    normal[13] = 1.0;
    normal[14] = 0.0;
    uv[8] = 0.0;
    uv[9] = 0.0;

    vertexes[15] = centerx + dx;
    vertexes[16] = centery + dy;
    vertexes[17] = centerz - dz;
    normal[15] = 0.0;
    normal[16] = 1.0;
    normal[17] = 0.0;
    uv[10] = 0.0;
    uv[11] = 0.0;

    vertexes[18] = centerx - dx;
    vertexes[19] = centery + dy;
    vertexes[20] = centerz - dz;
    normal[18] = 0.0;
    normal[19] = 1.0;
    normal[20] = 0.0;
    uv[12] = 0.0;
    uv[13] = 0.0;

    vertexes[21] = centerx - dx;
    vertexes[22] = centery + dy;
    vertexes[23] = centerz + dz;
    normal[21] = 0.0;
    normal[22] = 1.0;
    normal[23] = 0.0;
    uv[14] = 0.0;
    uv[15] = 0.0;

    // +ve x plane
    vertexes[24] = centerx + dx;
    vertexes[25] = centery - dy;
    vertexes[26] = centerz + dz;
    normal[24] = 1.0;
    normal[25] = 0.0;
    normal[26] = 0.0;
    uv[16] = 0.0;
    uv[17] = 0.0;

    vertexes[27] = centerx + dx;
    vertexes[28] = centery - dy;
    vertexes[29] = centerz - dz;
    normal[27] = 1.0;
    normal[28] = 0.0;
    normal[29] = 0.0;
    uv[18] = 0.0;
    uv[19] = 0.0;

    vertexes[30] = centerx + dx;
    vertexes[31] = centery + dy;
    vertexes[32] = centerz - dz;
    normal[30] = 1.0;
    normal[31] = 0.0;
    normal[32] = 0.0;
    uv[20] = 0.0;
    uv[21] = 0.0;

    vertexes[33] = centerx + dx;
    vertexes[34] = centery + dy;
    vertexes[35] = centerz + dz;
    normal[33] = 1.0;
    normal[34] = 0.0;
    normal[35] = 0.0;
    uv[22] = 0.0;
    uv[23] = 0.0;

    // -ve x plane
    vertexes[36] = centerx - dx;
    vertexes[37] = centery + dy;
    vertexes[38] = centerz + dz;
    normal[36] = -1.0;
    normal[37] = 0.0;
    normal[38] = 0.0;
    uv[24] = 0.0;
    uv[25] = 0.0;

    vertexes[39] = centerx - dx;
    vertexes[40] = centery + dy;
    vertexes[41] = centerz - dz;
    normal[39] = -1.0;
    normal[40] = 0.0;
    normal[41] = 0.0;
    uv[26] = 0.0;
    uv[27] = 0.0;

    vertexes[42] = centerx - dx;
    vertexes[43] = centery - dy;
    vertexes[44] = centerz - dz;
    normal[42] = -1.0;
    normal[43] = 0.0;
    normal[44] = 0.0;
    uv[28] = 0.0;
    uv[29] = 0.0;

    vertexes[45] = centerx - dx;
    vertexes[46] = centery - dy;
    vertexes[47] = centerz + dz;
    normal[45] = -1.0;
    normal[46] = 0.0;
    normal[47] = 0.0;
    uv[30] = 0.0;
    uv[31] = 0.0;

    // top
    // +ve z plane
    vertexes[48] = centerx - dx;
    vertexes[49] = centery + dy;
    vertexes[50] = centerz + dz;
    normal[48] = 0.0;
    normal[49] = 0.0;
    normal[50] = 1.0;
    uv[32] = 0.0;
    uv[33] = 1.0;

    vertexes[51] = centerx - dx;
    vertexes[52] = centery - dy;
    vertexes[53] = centerz + dz;
    normal[51] = 0.0;
    normal[52] = 0.0;
    normal[53] = 1.0;
    uv[34] = 0.0;
    uv[35] = 0.0;

    vertexes[54] = centerx + dx;
    vertexes[55] = centery - dy;
    vertexes[56] = centerz + dz;
    normal[54] = 0.0;
    normal[55] = 0.0;
    normal[56] = 1.0;
    uv[36] = 1.0;
    uv[37] = 0.0;

    vertexes[57] = centerx + dx;
    vertexes[58] = centery + dy;
    vertexes[59] = centerz + dz;
    normal[57] = 0.0;
    normal[58] = 0.0;
    normal[59] = 1.0;
    uv[38] = 1.0;
    uv[39] = 1.0;

    // bottom
    // -ve z plane
    vertexes[60] = centerx + dx;
    vertexes[61] = centery + dy;
    vertexes[62] = centerz - dz;
    normal[60] = 0.0;
    normal[61] = 0.0;
    normal[62] = -1.0;
    uv[40] = 0.0;
    uv[41] = 1.0;

    vertexes[63] = centerx + dx;
    vertexes[64] = centery - dy;
    vertexes[65] = centerz - dz;
    normal[63] = 0.0;
    normal[64] = 0.0;
    normal[65] = -1.0;
    uv[42] = 0.0;
    uv[43] = 0.0;

    vertexes[66] = centerx - dx;
    vertexes[67] = centery - dy;
    vertexes[68] = centerz - dz;
    normal[66] = 0.0;
    normal[67] = 0.0;
    normal[68] = -1.0;
    uv[44] = 1.0;
    uv[45] = 0.0;

    vertexes[69] = centerx - dx;
    vertexes[70] = centery + dy;
    vertexes[71] = centerz - dz;
    normal[69] = 0.0;
    normal[70] = 0.0;
    normal[71] = -1.0;
    uv[46] = 1.0;
    uv[47] = 1.0;

    var indexes = new osg.Uint16Array(36);
    indexes[0] = 0;
    indexes[1] = 1;
    indexes[2] = 2;
    indexes[3] = 0;
    indexes[4] = 2;
    indexes[5] = 3;

    indexes[6] = 4;
    indexes[7] = 5;
    indexes[8] = 6;
    indexes[9] = 4;
    indexes[10] = 6;
    indexes[11] = 7;

    indexes[12] = 8;
    indexes[13] = 9;
    indexes[14] = 10;
    indexes[15] = 8;
    indexes[16] = 10;
    indexes[17] = 11;

    indexes[18] = 12;
    indexes[19] = 13;
    indexes[20] = 14;
    indexes[21] = 12;
    indexes[22] = 14;
    indexes[23] = 15;

    indexes[24] = 16;
    indexes[25] = 17;
    indexes[26] = 18;
    indexes[27] = 16;
    indexes[28] = 18;
    indexes[29] = 19;

    indexes[30] = 20;
    indexes[31] = 21;
    indexes[32] = 22;
    indexes[33] = 20;
    indexes[34] = 22;
    indexes[35] = 23;

    g.getAttributes().Vertex = new osg.BufferArray(osg.BufferArray.ARRAY_BUFFER, vertexes, 3);
    g.getAttributes().Normal = new osg.BufferArray(osg.BufferArray.ARRAY_BUFFER, normal, 3);
    g.getAttributes().TexCoord0 = new osg.BufferArray(osg.BufferArray.ARRAY_BUFFER, uv, 2);

    var primitive = new osg.DrawElements(
        osg.primitiveSet.TRIANGLES,
        new osg.BufferArray(osg.BufferArray.ELEMENT_ARRAY_BUFFER, indexes, 1)
    );
    g.getPrimitives().push(primitive);
    return g;
};

function getShader() {
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

function getShaderVariant2() {
    var vertexshader = [
        '',
        'attribute vec3 Vertex;',
        'attribute vec3 Normal;',
        'uniform mat4 uModelViewMatrix;',
        'uniform mat4 uProjectionMatrix;',
        'uniform mat3 uModelViewNormalMatrix;',
        'uniform vec3 lightPos;',
        'uniform vec3 eyePos;',
        'varying vec4 position;',
        'attribute vec2 TexCoord0;',
        'varying vec2 vTexCoord0;',
        'varying vec3 l;',
        'varying vec3 h;',
        'varying vec3 v;',
        'varying vec3 n;',
        'void main(void) {',
        '  vec3 p = vec3(uModelViewMatrix * vec4(Vertex,1.0));',
        '  l = normalize ( lightPos - p);',

        '  v = normalize ( eyePos - p);',
        '  h = normalize (l+ v);',

        '  n = normalize(uModelViewNormalMatrix * Normal);',
        ' gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(Vertex,1.0); ',

        '  position = uModelViewMatrix * vec4(Vertex,1.0);',
        '  vTexCoord0 = TexCoord0;',
        '}'
    ].join('\n');

    var fragmentshader = [
        '',
        '#ifdef GL_ES',
        'precision highp float;',
        '#endif',
        'uniform vec3 color;',
        'varying vec3 l;',
        'varying vec3 h;',
        'varying vec3 v;',
        'varying vec3 n;',

        '#ifdef GL_ES',
        'precision highp float;',
        '#endif',
        'varying vec2 vTexCoord0;',
        'uniform sampler2D Texture0;',
        'void main(void) {',
        '  const vec4 diffColor  = vec4(0.2, 0.5, 1.0, 1.0);',
        '  const vec4 specColor  = vec4(0.7, 0.7, 0.7, 1.0);',
        '  const float specPower = 30.0;',

        '  const float kd = 1.0;',
        '  const float ka = 0.2;',
        '  vec3 n2 = normalize( n );',
        '  vec3 l2 = normalize( l );',
        '  vec3 h2 = normalize( h );',
        '  vec4 diff = diffColor *  max(dot(n2,l2), 0.0);',
        '  vec4 spec = specColor *  pow(max(dot(n2,l2), 0.0), specPower);',
        '  //gl_FragColor = diff + spec;',
        '  //gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);',
        '  vec2 uv = vTexCoord0;',
        '  gl_FragColor = vec4(texture2D(Texture0, uv))+ vec4(1.0, 0.5, 1.0, 1.0);',
        '}',
        ''
    ].join('\n');

    var program = new osg.Program(
        new osg.Shader('VERTEX_SHADER', vertexshader),
        new osg.Shader('FRAGMENT_SHADER', fragmentshader)
    );

    return program;
}

function createScene() {
    var root = new osg.Node();

    var target = new osg.MatrixTransform();
    var target2 = new osg.MatrixTransform();
    var targetModel1 = createTexturedBoxGeometry(0, 0, 0, 2, 2, 2);

    var targetModel2 = createTexturedBoxGeometry(4, 0, 0, 2, 2, 2);
    target.addChild(targetModel1);
    target2.addChild(targetModel2);

    var material = new osg.Material();
    material.setDiffuse([1, 0, 0, 1]);
    target.getOrCreateStateSet().setAttributeAndModes(getShader());
       target2.getOrCreateStateSet().setAttributeAndModes(getShaderVariant2());
    //target2.getOrCreateStateSet().setAttributeAndModes(getShader());

    var density = osg.Uniform.createFloat1(0.0, 'density');
    target.getOrCreateStateSet().addUniform(density);
    target2.getOrCreateStateSet().addUniform(density);

    var lightPos = osg.Uniform.createFloat3([0, 0, -10], 'lightPos');
    target.getOrCreateStateSet().addUniform(lightPos);
    target2.getOrCreateStateSet().addUniform(lightPos);

    var eyePos = osg.Uniform.createFloat3([0, 0, -1], 'eyePos');
    target.getOrCreateStateSet().addUniform(eyePos);
    target2.getOrCreateStateSet().addUniform(eyePos);

    var color = osg.Uniform.createFloat3([1, 0, 0], 'color');
    var color2 = osg.Uniform.createFloat3([1, 1, 1], 'color');

    target.getOrCreateStateSet().addUniform(color);
    target2.getOrCreateStateSet().addUniform(color2);

    root.addChild(target);
    root.addChild(target2);

    root.getOrCreateStateSet().setAttributeAndModes(new osg.CullFace('DISABLE'));

    return root;
}

var main = function() {
    // The 3D canvas.
    var canvas = document.getElementById('View');

    var viewer;
    viewer = new osgViewer.Viewer(canvas, {
        antialias: true,
        alpha: true
    });
    viewer.init();
    var rotate = new osg.MatrixTransform();
    rotate.addChild(createScene());
    viewer.getCamera().setClearColor(osg.vec4.fromValues(230 / 255.0, 233 / 255.0, 239 / 255.0, 1));
    //viewer.getCamera().setClearColor(osg.vec4.create());

    viewer.setSceneData(rotate);
    var bs = rotate.getBoundingSphere();

    viewer.setupManipulator(new osgGA.CCADManipulator());
    //viewer.setupManipulator(new CADManipulatorStandardMouseKeyboardController());
    viewer.getManipulator().setDistance(rotate.getBound().radius() * 4.0);

    viewer
        .getManipulator()
        .setProjectionMatrixAsOrtho(
            -bs.radius() * 4,
            bs.radius() * 4,
            -bs.radius() * 4,
            bs.radius() * 4,
            0,
            600
        );

    viewer.getManipulator().setEyePosition([10, 10, 100]);

    viewer.getManipulator().setTarget([0, 0, 0]);

    viewer.run();
};

window.addEventListener('load', main, true);
