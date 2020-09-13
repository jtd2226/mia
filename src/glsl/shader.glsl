#pragma glslify: snoise3 = require('glsl-noise/simplex/3d')

#define PI 3.14159265359

uniform float time;
uniform sampler2D tDiffuse;
varying vec2 v_uv;
    
vec2 rotateUV(vec2 uv, vec2 pivot, float rotation) {
    float sine = sin(rotation);
    float cosine = cos(rotation);

    uv -= pivot;
    uv.x = uv.x * cosine - uv.y * sine;
    uv.y = uv.x * sine + uv.y * cosine;
    uv += pivot;

    return uv;
}

vec4 thingy(float time, vec2 vUv) {
    vec2 p = - 1.0 + 2.0 * vUv;
    float a = time * 40.0;
    float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;

    e = 400.0 * ( p.x * 0.5 + 0.5 );
    f = 400.0 * ( p.y * 0.5 + 0.5 );
    i = 200.0 + sin( e * g + a / 150.0 ) * 20.0;
    d = 200.0 + cos( f * g / 2.0 ) * 18.0 + cos( e * g ) * 7.0;
    r = sqrt( pow( abs( i - e ), 2.0 ) + pow( abs( d - f ), 2.0 ) );
    q = f / r;
    e = ( r * cos( q ) ) - a / 2.0;
    f = ( r * sin( q ) ) - a / 2.0;
    d = sin( e * g ) * 176.0 + sin( e * g ) * 164.0 + r;
    h = ( ( f + d ) + a / 2.0 ) * g;
    i = cos( h + r * p.x / 1.3 ) * ( e + e + a ) + cos( q * g * 6.0 ) * ( r + h / 3.0 );
    h = sin( f * g ) * 144.0 - sin( e * g ) * 212.0 * p.x;
    h = ( h + ( f - e ) * q + sin( r - ( a + h ) / 7.0 ) * 10.0 + i / 4.0 ) * g;
    i += cos( h * 2.3 * sin( a / 350.0 - q ) ) * 184.0 * sin( q - ( r * 4.3 + a / 12.0 ) * g ) + tan( r * g + h ) * 184.0 * cos( r * g + h );
    i = mod( i / 5.6, 256.0 ) / 64.0;
    if ( i < 0.0 ) i += 4.0;
    if ( i >= 2.0 ) i = 4.0 - i;
    d = r / 350.0;
    d += sin( d * d * 8.0 ) * 0.52;
    f = ( sin( a * g ) + 1.0 ) / 2.0;
    return vec4( vec3( f * i / 1.6, i / 2.0 + d / 13.0, i ) * d * p.x + vec3( i / 1.3 + d / 8.0, i / 2.0 + d / 18.0, i ) * d * ( 1.0 - p.x ), 1.0 );
}

void main() {
    float t = time * 0.05;
    vec2 uv = v_uv;

    float nh = 0.;
    float min = smoothstep(0., .3, ((sin(time)/100.) + 0.05));
    float max = 1. - min;

    float offX = (uv.x + sin(uv.y + t * 9.)) * (PI * 2.);
    float offY = (uv.y - t * .2 - cos(t * 9.) * 0.9);
    nh = (snoise3(vec3(offX, offY, sin(t * .5)) * (PI*uv.y))) * .03;

    uv -= vec2(0.5);
    uv *= 1.;
    uv += vec2(0.5);

    vec4 color = texture2D(tDiffuse, uv + vec2(nh));

    vec2 position = ( gl_FragCoord.xy );

    gl_FragColor = vec4(mix(color.rgb, thingy(time, v_uv).rgb, -0.15), color.a);
}