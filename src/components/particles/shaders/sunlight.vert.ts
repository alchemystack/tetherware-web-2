/**
 * Vertex shader for sunlight rays effect
 * Simple fullscreen quad positioning
 */
export const sunlightVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
