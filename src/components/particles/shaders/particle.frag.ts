/**
 * Fragment shader for quantum interference particle field
 * Handles line coloring with mouse-distance-based highlighting
 * Uses UV coordinates for soft line edges
 */
export const particleFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uMouseActive;
  uniform float uReducedMotion;

  varying float vDistance;
  varying float vOpacity;
  varying float vHighlight;
  varying vec2 vUv;

  void main() {
    // UV coordinates: x is across the line width, y is along the line length
    // Both range from 0 to 1

    // Soft falloff at line edges (width direction)
    float edgeFalloffX = 1.0 - smoothstep(0.3, 0.5, abs(vUv.x - 0.5));

    // Soft falloff at line ends (length direction)
    float edgeFalloffY = 1.0 - smoothstep(0.35, 0.5, abs(vUv.y - 0.5));

    // Combined alpha from edge falloffs
    float alpha = edgeFalloffX * edgeFalloffY;

    // Discard nearly transparent pixels
    if (alpha < 0.01) discard;

    // Base color - cool gray/silver (particle-base from spec)
    vec3 baseColor = vec3(0.71, 0.75, 0.78); // rgb(180, 190, 200)

    // Highlight color - quantum cyan (particle-highlight from spec)
    vec3 highlightColor = vec3(0.25, 0.88, 0.82); // rgb(64, 224, 208)

    // Forest green for secondary accent
    vec3 forestColor = vec3(0.18, 0.42, 0.31); // rgb(45, 106, 79)

    // Mix colors based on mouse distance
    // Inner particles glow cyan, with a subtle forest undertone further out
    float highlightMix = vHighlight * uMouseActive;
    float forestMix = smoothstep(0.3, 0.6, vHighlight) * 0.3 * uMouseActive;

    vec3 color = baseColor;
    color = mix(color, forestColor, forestMix);
    color = mix(color, highlightColor, highlightMix);

    // Add subtle glow effect for highlighted lines
    float centerFalloff = 1.0 - length(vUv - vec2(0.5)) * 2.0;
    float glowIntensity = highlightMix * max(centerFalloff, 0.0) * 0.5;
    color += highlightColor * glowIntensity;

    // Time-based subtle shimmer (disabled in reduced motion)
    float time = uReducedMotion > 0.5 ? 0.0 : uTime;
    float shimmer = sin(time * 2.0 + vDistance * 0.01) * 0.05 + 1.0;
    color *= shimmer;

    // Final alpha with opacity from vertex shader
    float finalAlpha = alpha * vOpacity;

    // Boost alpha for highlighted lines
    finalAlpha *= 1.0 + highlightMix * 0.5;

    // Clamp to reasonable range
    finalAlpha = clamp(finalAlpha, 0.0, 1.0);

    gl_FragColor = vec4(color, finalAlpha);
  }
`
