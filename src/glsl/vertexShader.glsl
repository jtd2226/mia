uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D tDiffuse;
uniform float freq;
varying vec2 v_uv;
varying vec3 v_normal;
attribute vec3 color;

float random (in vec2 _st) 
{
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

float noise( in vec2 x )
{
    return sin(1.5*x.x)*sin(1.5*x.y);
}

const mat2 rotate = mat2(0.80, 0.60, -0.600, 0.80);

#define nOctaves 2
float fbm (in vec2 _st, float a) // Fractional Brownian Motion
{
    float v = 0.5;
    vec2 shift = vec2(1.0);
    for (int i = 0; i < nOctaves; ++i) {
        v += a * noise(_st);
        _st = 2.0 * _st * rotate + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    v_uv = uv;

    vec3 p = position;

    // float scale = 0.5 + fbm(p.xy+cos(time*20.), ((pow(freq*0.3, 2.)*0.0008)));
    // p.x *= scale;
    // p.y *= scale;
    // p.z *= scale;
    vec3 transformed = vec3(position);
    float dx = position.x;
    float dy = position.y;
    float freq = sqrt(dx*dx + dy*dy);
    float amp = 0.1;
    float angle = -time*10.0+freq*6.0;
    transformed.z += sin(angle)*amp;

    vec3 objectNormal = normalize(vec3(0.0,-amp * freq * cos(angle),1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    
    v_normal = normalMatrix * objectNormal;
}
