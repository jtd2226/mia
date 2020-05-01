#pragma glslify: snoise3 = require('glsl-noise/simplex/3d')

uniform sampler2D u_map;
uniform sampler2D u_hovermap;

uniform float u_alpha;
uniform float u_time;
uniform float u_progressHover;
uniform float u_progressClick;

uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec2 u_ratio;
uniform vec2 u_hoverratio;

varying vec2 v_uv;

void main() {
  vec2 resolution = u_res * PR;
  float time = u_time * 0.05;
  vec2 uv = v_uv;

  float offX = uv.x + sin(uv.y + time * 9.);
  float offY = uv.y - time * .2 - cos(time * 2.) * 0.1;
  float nh = (snoise3(vec3(offX, offY, time * .5 ) * 2.)) * .03;

  uv -= vec2(0.5);
  uv *= 1.;
  uv *= u_ratio;
  uv += vec2(0.5);

  vec4 imageDistorted = texture2D(u_map, uv + vec2(nh));

  gl_FragColor = vec4(imageDistorted.rgb, u_alpha);
}
