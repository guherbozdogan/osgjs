precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uModelViewNormalMatrix;
attribute vec3 Vertex;
attribute vec3 Normal;
attribute vec2 TexCoord0;
uniform vec3 lightPos;
uniform vec3 eyePos;
varying vec4 position;
varying vec3 l;
varying vec3 v;
varying vec3 n;
varying float alpha;
varying vec2 vTexCoord0;
float rand(vec2 n){  return 0.5 + 0.5 * fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);}
vec3 getScale( const in mat4 matrix ) {
      // Only working with positive scales.
      float xs = matrix[0][0] * matrix[0][1] * matrix[0][2] * matrix[0][3] < 0. ? -1. : 1.;
      float ys = matrix[1][0] * matrix[1][1] * matrix[1][2] * matrix[1][3] < 0. ? -1. : 1.;
      float zs = matrix[2][0] * matrix[2][1] * matrix[2][2] * matrix[2][3] < 0. ? -1. : 1.;
      vec3 scale;
      scale.x = xs * sqrt( matrix[0][0] * matrix[0][0] + matrix[0][1] * matrix[0][1] + matrix[0][2] * matrix[0][2]);
      scale.y = ys * sqrt( matrix[1][0] * matrix[1][0] + matrix[1][1] * matrix[1][1] + matrix[1][2] * matrix[1][2]);
      scale.z = zs * sqrt( matrix[2][0] * matrix[2][0] + matrix[2][1] * matrix[2][1] + matrix[2][2] * matrix[2][2]);
      return scale;
}

#pragma DECLARE_FUNCTION
vec4 billboard( const in vec3 vertex, const in mat4 modelViewMatrix, const in mat4 projectionMatrix ) {
      vec3 scale = getScale( modelViewMatrix );
      return projectionMatrix * ( vec4( scale.x* vertex.x , scale.y * vertex.y, scale.z * vertex.z, 1.0 ) + vec4( modelViewMatrix[ 3 ].xyz, 0.0 ) );
}


void main(void) {
    vec3 p = vec3(uModelViewMatrix * vec4(Vertex,1.0));


    //v = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;


    l = normalize ( lightPos - p);

    v = normalize ( eyePos - p);


    n = normalize(vec3(uModelViewNormalMatrix * Normal));
    //Vertex.x = Vertex.x + rand(1.0); Vertex.y = Vertex.y + rand(1.0);

    // gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(Vertex,1.0);
     gl_Position =billboard(Vertex,uModelViewMatrix,uProjectionMatrix);
       alpha = 1.0;
    vTexCoord0 = TexCoord0;
    position = uModelViewMatrix * vec4(Vertex.x  ,Vertex.y ,Vertex.z,1.0);
}
