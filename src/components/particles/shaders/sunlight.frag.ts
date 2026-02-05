/**
 * Fragment shader for golden sunlight rays effect
 * Creates warm volumetric rays emanating from the upper-right area
 */
export const sunlightFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uReducedMotion;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // Pseudo-random function for ray variation
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  // Generate a single ray from a source point
  float ray(vec2 uv, vec2 source, float angle, float width, float falloff) {
    // Direction from source along the ray angle
    vec2 rayDir = vec2(cos(angle), sin(angle));

    // Vector from source to current pixel
    vec2 toPixel = uv - source;

    // Project onto ray direction (how far along the ray)
    float alongRay = dot(toPixel, rayDir);

    // Only show ray in the direction it's pointing (not behind source)
    if (alongRay < 0.0) return 0.0;

    // Perpendicular distance from ray line
    float perpDist = abs(dot(toPixel, vec2(-rayDir.y, rayDir.x)));

    // Ray width increases with distance from source
    float widthAtPoint = width * (1.0 + alongRay * 0.5);

    // Intensity based on perpendicular distance (sharp center, soft edges)
    float intensity = smoothstep(widthAtPoint, widthAtPoint * 0.3, perpDist);

    // Falloff with distance from source
    intensity *= exp(-alongRay * falloff);

    return intensity;
  }

  void main() {
    // Aspect-corrected UVs
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Time for animation (frozen in reduced motion)
    float time = uReducedMotion > 0.5 ? 0.0 : uTime;

    // Ray source position (upper-right area, slightly off-screen)
    vec2 source = vec2(aspect * 0.9, 1.1);

    // Accumulate rays
    float rays = 0.0;

    // Multiple rays with different angles and properties
    // Rays angle downward-left from the upper-right source
    float baseAngle = 3.926; // ~225 degrees (pointing down-left)

    // Main prominent rays
    rays += ray(uv, source, baseAngle - 0.15, 0.025, 0.8) * 1.0;
    rays += ray(uv, source, baseAngle + 0.10, 0.020, 0.9) * 0.8;
    rays += ray(uv, source, baseAngle + 0.35, 0.018, 1.0) * 0.6;
    rays += ray(uv, source, baseAngle - 0.40, 0.022, 0.85) * 0.7;
    rays += ray(uv, source, baseAngle + 0.60, 0.015, 1.1) * 0.5;

    // Softer, wider background rays
    rays += ray(uv, source, baseAngle + 0.05, 0.08, 0.5) * 0.3;
    rays += ray(uv, source, baseAngle - 0.25, 0.10, 0.4) * 0.25;
    rays += ray(uv, source, baseAngle + 0.45, 0.07, 0.55) * 0.2;

    // Subtle animation - rays slowly drift
    float drift = sin(time * 0.15) * 0.02;
    rays += ray(uv, source, baseAngle + drift, 0.03, 0.7) * 0.4;
    rays += ray(uv, source, baseAngle + 0.25 - drift * 0.5, 0.025, 0.75) * 0.35;

    // Gentle pulsing intensity
    float pulse = 1.0 + sin(time * 0.3) * 0.08;
    rays *= pulse;

    // Golden warm color palette
    // Core color: warm golden yellow
    vec3 coreColor = vec3(1.0, 0.78, 0.4);   // rgb(255, 200, 100)
    // Edge color: deeper amber/orange
    vec3 edgeColor = vec3(1.0, 0.63, 0.24);  // rgb(255, 160, 60)

    // Mix colors based on ray intensity (brighter areas more golden)
    vec3 rayColor = mix(edgeColor, coreColor, smoothstep(0.0, 0.5, rays));

    // Add subtle warm ambient glow near the source
    float sourceGlow = 1.0 - length(vUv - vec2(0.9, 1.0)) * 1.2;
    sourceGlow = max(sourceGlow, 0.0);
    sourceGlow = pow(sourceGlow, 3.0) * 0.15;

    // Combine rays with source glow
    float totalIntensity = rays * 0.15 + sourceGlow;

    // Keep it subtle - atmospheric rather than overpowering
    totalIntensity = clamp(totalIntensity, 0.0, 0.25);

    gl_FragColor = vec4(rayColor, totalIntensity);
  }
`
