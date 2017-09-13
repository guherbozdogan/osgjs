precision highp float;
uniform vec3 color;
varying vec3 l;
varying vec3 v;
varying vec3 n;
varying float alpha;
varying vec2 vTexCoord0;
uniform sampler2D Texture0;
void main(void) {
    const vec4 diffColor  = vec4(0.5, 0.0, 0.0, 1.0);
    const vec4 specColor  = vec4(0.7, 0.7, 0.0, 1.0);
    const float specPower = 30.0;

    vec3 n2 = normalize( n );
    vec3 l2 = normalize( l );
    vec3 v2 = normalize( v );
    vec3 r = reflect( -v2, n2 );
    vec4 diff = diffColor *  max(dot(n2,l2), 0.0);
    vec4 spec = specColor *  pow(max(dot(l2, r), 0.0), specPower);

    vec2 uv = vTexCoord0;
    vec4 tcolor = vec4(texture2D(Texture0, uv));

    gl_FragColor = diff + spec+tcolor;
}
