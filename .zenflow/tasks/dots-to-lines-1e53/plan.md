# Spec and build

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

---

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:
- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification
<!-- chat-id: 4e7ae9a3-86d5-4267-976d-c0e365a350a0 -->

**Completed.** Technical specification saved to `.zenflow/tasks/dots-to-lines-1e53/spec.md`.

**Summary:**
- **Difficulty**: Medium
- **Approach**: Replace Points with InstancedMesh for oriented lines, add angle attributes with cursor-following interpolation, create separate SunlightRays component for golden volumetric rays
- **Files to modify**: ParticleMesh.tsx, particle.vert.ts, particle.frag.ts, ParticleField.tsx
- **Files to create**: SunlightRays.tsx, sunlight.vert.ts, sunlight.frag.ts

---

### [x] Step: Convert particle dots to oriented lines
<!-- chat-id: f4162abc-3e90-4529-9cb3-b70648b7179e -->

**Completed.** Particle rendering converted from circular points to oriented lines.

**Summary of changes:**
- **ParticleMesh.tsx**: Replaced `<points>` with `<instancedMesh>` using thin PlaneGeometry (0.5 x 8 units). Added `aAngle` attribute for base orientation (PI/2 ± 15° random variation). Updated to use `instancedBufferAttribute` for per-instance data.
- **particle.vert.ts**: Added `aAngle` attribute and `vUv` varying. Added `rotate2D()` matrix function. Changed from point-based to instance-based positioning with rotation applied to vertex positions.
- **particle.frag.ts**: Replaced `gl_PointCoord` circular logic with UV-based line rendering. Added soft falloff at line edges (width) and ends (length). Preserved existing color blending logic.

**Verification:**
- Build passes (`npm run build`)
- Lines render with upward orientation (PI/2 base angle with ±15° random variation)
- Edge fadeout and highlight colors preserved

---

### [x] Step: Add cursor-following rotation behavior
<!-- chat-id: ac8b6740-ca25-4b9e-ab7f-c524504a745a -->

**Completed.** Lines now gradually rotate toward the cursor based on proximity.

**Summary of changes:**
- **particle.vert.ts**: Added cursor-following rotation logic:
  - Calculate target angle using `atan(toCursor.y, toCursor.x) + PI/2` to point lines toward cursor
  - Rotation influence computed via `smoothstep(100.0, 300.0, distToMouse)` for smooth gradient
  - Influence multiplied by `uMouseActive` for smooth enter/leave transitions
  - Influence disabled when `uReducedMotion` is active for accessibility
  - Final angle interpolated with `mix(aAngle, targetAngle, rotationInfluence)`

**Parameters:**
- Inner radius: 100px (strong rotation influence)
- Outer radius: 300px (no rotation influence)
- Smooth gradient transition between zones

**Verification:**
- Build passes (`npm run build`)
- Lines rotate toward cursor when nearby
- Lines return to upward orientation when cursor moves away
- Transition is smooth via uMouseActive interpolation
- Reduced motion: lines stay at base angle

---

### [x] Step: Add golden sunlight rays effect
<!-- chat-id: 4724e9e5-2b05-43e2-b73c-6f8e24ae7567 -->

**Completed.** Golden sunlight rays effect added for warm atmospheric depth.

**Summary of changes:**
- **shaders/sunlight.vert.ts**: Simple fullscreen quad vertex shader passing UV coordinates
- **shaders/sunlight.frag.ts**: Ray generation fragment shader with:
  - Multiple rays emanating from upper-right area (source at ~0.9, 1.1 in UV space)
  - Rays angle downward-left (~225 degrees) with varying widths and falloffs
  - Golden color palette: core `rgb(255, 200, 100)` to edge `rgb(255, 160, 60)`
  - Soft gaussian falloff along ray length
  - Subtle animation (slow drift and pulse) disabled in reduced motion
  - Subtle ambient glow near source point
  - Total intensity clamped to 0.25 max for atmospheric effect
- **SunlightRays.tsx**: Component using `<mesh>` with `<planeGeometry args={[2, 2]}>`
  - Additive blending for glow effect
  - `renderOrder={-1}` to render behind particles
  - Shared uniforms: uTime, uReducedMotion, uResolution
  - Lazy loaded via `lazy()` for performance
- **ParticleField.tsx**: Added `<SunlightRays />` inside Suspense, before ParticleMesh
- **shaders/index.ts**: Added exports for sunlight shaders

**Verification:**
- Build passes (`npm run build`)
- TypeScript compilation successful (no type errors)
- Rays render with golden warm colors from upper-right
- Subtle intensity (10-25% max) doesn't overpower particles
- Reduced motion: rays frozen (no animation)

---

### [ ] Step: Final verification and cleanup

Ensure everything works together and clean up any debug code.

1. Remove debug console.log statements from ParticleMesh.tsx
2. Run full build and lint: `npm run build && npm run lint`
3. Test all interactions:
   - Default state: lines pointing up, subtle rays visible
   - Cursor interaction: lines follow cursor, colors highlight
   - Scroll parallax: still working
   - Edge fadeout: lines fade at screen edges
   - Reduced motion: respects accessibility preference
4. Test on mobile viewport
5. Write completion report to `.zenflow/tasks/dots-to-lines-1e53/report.md`
