uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D tDiffuse;
uniform float freq;
varying vec2 v_uv;

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
float fbm ( in vec2 _st) // Fractional Brownian Motion
{
    float v = -0.3;
    float a = 0.3;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < nOctaves; ++i) {
        v += a * noise(_st);
        _st = 3.0 * _st * rotate + shift;
        a *= 0.5;
    }
    return v;
}

#define PI 3.14159265359
void main() {
    float mouseX = -0.7;
    float mouseY = 0.05;
    vec2 st = 15.0*mouseY*(gl_FragCoord.xy/resolution.y-.5);
    vec3 color = vec3(0.0);
    vec2 q = vec2(0.);
    q.x = fbm( st + cos(0.02*(time*5.)));
    q.y = fbm( st + sin(1.0-0.15*(time*5.)));
    vec2 r = vec2(0.);
    r.x = fbm( st + (22.0*mouseX+0.4)*q + vec2(1.7,2.2)+sin(st.x+0.035*(time*5.)) );
    r.y = fbm( st + (2.0*mouseY+.5)*q + vec2(8.3,2.8)+ sin(st.y+.2));
    float f = fbm(1.4*st+6.0*r);
    color = smoothstep(vec3(0.101961,0.19608,0.666667),vec3(0.666667,0.666667,0.98039),color);
    color = mix(color,vec3(1.856,.5*(1.0+sin(1.5+.2*(time*5.))),0.164706),r.x+length(q));
    color = mix(color,vec3(.5*(1.0-cos(.1*(time*5.))),.2+.2*(1.0+sin(0.5+.3*time*5.)),1.0),length(r+q));
    color*=(1.5*f*f*f+1.8*f*f+1.7*f);
    color*=vec3(2.8+r,1.7+q.y);
    color=pow(color, vec3(.6));

    vec3 tex = texture2D(tDiffuse, v_uv).rgb;

    if(tex.r < 0.15 && tex.g < 0.2 && tex.b < 0.2) {
        gl_FragColor = vec4(color, 1.);
        return;
    }

    // float fm = smoothstep(0., 0.01, sin(pow(time*3., 3.6)));
    // gl_FragColor = vec4(tex*(fm)+color*(1.-fm), 1.);
    gl_FragColor = vec4(tex, 1.);
}