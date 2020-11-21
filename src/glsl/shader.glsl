#pragma glslify: snoise3 = require('glsl-noise/simplex/3d')

#define PI 3.14159265359

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D tDiffuse;
uniform float freq;
varying vec2 v_uv;

float noise( in vec2 x ) {
    return sin(1.5*x.x)*sin(1.5*x.y);
}

const mat2 rotate = mat2(0.80, 0.60, -0.600, 0.80);

#define nOctaves 2
float fbm ( in vec2 _st, float t) {
    float v = -0.1;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < nOctaves; ++i) {
        v += a * noise(_st);
        _st = (3.0 * _st * rotate + shift);
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = v_uv;
    float t = time * 5.5;

    vec2 q = vec2( fbm( uv + vec2(0.0,0.0) + (cos(t) + 1.), t ), fbm( uv + vec2(5.2,1.3) + (sin(t)+1.), t ) );
    vec2 r = vec2( fbm( uv + -4.0*q + vec2(1.7,9.2) + sin(t), t), fbm( uv + 4.0*q + vec2(8.3,2.8) + cos(t), t) );
    float mod = fbm( uv + 4.0*r, t );

    vec4 color = texture2D(tDiffuse, uv + (vec2(mod)*-0.1));

    gl_FragColor = vec4(color.rgb, 1.0);
}