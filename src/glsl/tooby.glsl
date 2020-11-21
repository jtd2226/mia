uniform float time;
uniform vec2 resolution;
uniform sampler2D tDiffuse;
uniform float freq;
varying vec2 v_uv;

vec2 R = resolution;
vec2 Scale=vec2(0.0015,0.0015);
float Saturation = -0.5; // 0 - 1;

#define PI 3.14159265359

#define MAX_ITERATION 10.
float mandelbrot(vec2 c) {
	vec2 z = c;
	float count = 0.0;
	float t = time*0.1;
	for (float i = 0.0; i < MAX_ITERATION; i++) {
		vec2 f = abs(z/dot(z,z)) - abs(vec2(sin(t),sin(t)));
		z =  vec2(f.x+f.y, f.x*f.y);
		count += length(f)*.1;
	}

	float re = (length(z*count/MAX_ITERATION));
	return re;
}

vec3 lungth(vec2 x,vec3 c){
    return vec3(length(x+c.r),length(x+c.g),length(c.b));
}

void main( void ) {
    float ufreq = sin(freq)*0.05 + 1.;

	vec2 position = (2. * v_uv )- 1. / 1.;
    float pl = length(position) * 2.;
	float dd = (pl*0.25);
	float d = (2. / dd + time*1.);
	
    vec2 x = gl_FragCoord.xy;
    vec3 c2=vec3(0);

    x=(x*(Scale)*R/R.x);
    c2=lungth(x,vec3(5.,6.,7.)*(Saturation)*d);
    c2=.5 + (-0.2+pow(ufreq, 7.))*sin(c2);
	
    vec3 tex = texture2D(tDiffuse, v_uv + (c2.yz)*dd*(0.15*sin(time/2.)) + vec2(mandelbrot(position)*0.05)).rgb;
    tex += vec3((ufreq-1.)*2., 0., 0.0);

	gl_FragColor = vec4(tex, 1.);
}