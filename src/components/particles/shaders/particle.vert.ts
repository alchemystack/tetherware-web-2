/**
 * Vertex shader for quantum interference particle field
 * Creates organic wave motion with mouse-driven interference patterns
 */
export const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  uniform float uScroll;
  uniform float uScrollVelocity;
  uniform vec2 uResolution;
  uniform float uReducedMotion;

  attribute float aScale;
  attribute float aRandomness;

  varying float vDistance;
  varying float vOpacity;
  varying float vHighlight;

  // Simplex 3D noise
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Fractal Brownian Motion - layered noise for organic motion
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    // 3 octaves for rich organic movement
    for (int i = 0; i < 3; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }

    return value;
  }

  void main() {
    vec3 pos = position;

    // Time factor (frozen if reduced motion)
    float time = uReducedMotion > 0.5 ? 0.0 : uTime;

    // ============================================
    // BASE WAVE MOTION - Organic, flowing movement
    // ============================================

    // Primary wave using FBM for organic feel
    float waveFrequency = 0.015;
    float waveAmplitude = 40.0 + uScroll * 20.0; // Deeper waves as user scrolls

    // Add scroll velocity to increase wave intensity during fast scrolling
    waveAmplitude += uScrollVelocity * 2.0;

    vec3 noiseInput = vec3(
      pos.x * waveFrequency,
      pos.y * waveFrequency,
      time * 0.3
    );

    float wave = fbm(noiseInput) * waveAmplitude;

    // Secondary wave for complexity
    float wave2 = snoise(vec3(
      pos.x * 0.008 + time * 0.1,
      pos.y * 0.008,
      time * 0.15
    )) * 25.0;

    // Combine waves
    pos.z += wave + wave2;

    // ============================================
    // MOUSE INTERFERENCE - Quantum ripple effect
    // ============================================

    // Convert mouse from normalized coords to world space
    vec2 mouseWorld = uMouse * vec2(uResolution.x * 0.5, uResolution.y * 0.5);

    // Distance from particle to mouse
    float distToMouse = length(pos.xy - mouseWorld);

    // Define interference rings
    float innerRadius = 80.0;
    float middleRadius = 150.0;
    float outerRadius = 250.0;

    // Inner ring - strong displacement + quantum tunneling
    float innerInfluence = 1.0 - smoothstep(0.0, innerRadius, distToMouse);

    // Phase offset creates the interference pattern
    float phase = distToMouse * 0.05 - time * 3.0;
    float interference = sin(phase) * innerInfluence * 30.0 * uMouseActive;

    // Middle ring - wave displacement
    float middleInfluence = smoothstep(innerRadius, middleRadius, distToMouse) *
                           (1.0 - smoothstep(middleRadius, outerRadius, distToMouse));
    float middleWave = sin(distToMouse * 0.03 - time * 2.0) * middleInfluence * 20.0 * uMouseActive;

    // Outer ring - subtle ripple
    float outerInfluence = smoothstep(middleRadius, outerRadius, distToMouse) *
                          (1.0 - smoothstep(outerRadius, outerRadius + 100.0, distToMouse));
    float outerRipple = sin(distToMouse * 0.02 - time * 1.5) * outerInfluence * 10.0 * uMouseActive;

    // Apply mouse displacement
    pos.z += interference + middleWave + outerRipple;

    // Quantum tunneling - particles phase through in inner ring
    float tunneling = innerInfluence * sin(time * 5.0 + aRandomness * 6.28) * 15.0 * uMouseActive;
    pos.z += tunneling;

    // ============================================
    // SCROLL PARALLAX
    // ============================================

    // Different layers move at different speeds based on Z
    float parallaxFactor = (pos.z + 50.0) / 100.0; // Normalize to 0-1 range roughly
    pos.y += uScroll * 200.0 * parallaxFactor;

    // ============================================
    // EDGE FADEOUT - No hard edges
    // ============================================

    // Calculate screen position for edge fadeout
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vec4 clipPos = projectionMatrix * mvPosition;
    vec2 screenPos = clipPos.xy / clipPos.w; // Normalized device coordinates

    // Fade at edges (beyond 0.85 of screen)
    float edgeFadeX = 1.0 - smoothstep(0.85, 1.0, abs(screenPos.x));
    float edgeFadeY = 1.0 - smoothstep(0.85, 1.0, abs(screenPos.y));
    float edgeFade = edgeFadeX * edgeFadeY;

    // ============================================
    // OUTPUT
    // ============================================

    // Pass distance to mouse for fragment shader highlighting
    vDistance = distToMouse;

    // Calculate highlight intensity for cyan glow near mouse
    vHighlight = (1.0 - smoothstep(0.0, outerRadius, distToMouse)) * uMouseActive;

    // Final opacity with edge fade and randomness
    vOpacity = edgeFade * (0.4 + aRandomness * 0.4);

    // Apply scale with slight pulse near mouse
    float scalePulse = 1.0 + innerInfluence * 0.5 * sin(time * 4.0) * uMouseActive;
    float finalScale = aScale * scalePulse;

    // Point size based on scale and distance
    gl_PointSize = finalScale * (300.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 8.0);

    gl_Position = clipPos;
  }
`
