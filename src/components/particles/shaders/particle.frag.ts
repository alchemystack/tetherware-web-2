/**
 * Fragment shader for quantum interference particle field
 * Handles particle coloring with mouse-distance-based highlighting
 */
export const particleFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uMouseActive;
  uniform float uReducedMotion;

  varying float vDistance;
  varying float vOpacity;
  varying float vHighlight;

  void main() {
    // Create circular particle with soft edges
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    // Discard pixels outside circle
    if (dist > 0.5) discard;

    // Soft circular falloff
    float alpha = 1.0 - smoothstep(0.2, 0.5, dist);

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

    // Add subtle glow effect for highlighted particles
    float glowIntensity = highlightMix * (1.0 - dist * 2.0) * 0.5;
    color += highlightColor * glowIntensity;

    // Time-based subtle shimmer (disabled in reduced motion)
    float time = uReducedMotion > 0.5 ? 0.0 : uTime;
    float shimmer = sin(time * 2.0 + vDistance * 0.01) * 0.05 + 1.0;
    color *= shimmer;

    // Final alpha with opacity from vertex shader
    float finalAlpha = alpha * vOpacity;

    // Boost alpha for highlighted particles
    finalAlpha *= 1.0 + highlightMix * 0.5;

    // Clamp to reasonable range
    finalAlpha = clamp(finalAlpha, 0.0, 1.0);

    gl_FragColor = vec4(color, finalAlpha);
  }
`
