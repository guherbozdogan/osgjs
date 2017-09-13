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


void main(void) {
    vec3 p = vec3(uModelViewMatrix * vec4(Vertex,1.0));


    //v = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;


    l = normalize ( lightPos - p);

    v = normalize ( eyePos - p);


    n = normalize(vec3(uModelViewMatrix * vec4(Normal,1.0)));
    //Vertex.x = Vertex.x + rand(1.0); Vertex.y = Vertex.y + rand(1.0);

     gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(Vertex,1.0);
    alpha = 1.0;
    vTexCoord0 = TexCoord0;
    position = uModelViewMatrix * vec4(Vertex.x  ,Vertex.y ,Vertex.z,1.0);
}
