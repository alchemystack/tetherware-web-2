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

### [ ] Step: Add cursor-following rotation behavior

Make lines gradually rotate toward the cursor based on proximity.

1. Update vertex shader (particle.vert.ts):
   - Calculate target angle: `atan2(cursor.y - pos.y, cursor.x - pos.x) + PI/2`
   - Compute influence factor using smoothstep based on distance to cursor
   - Interpolate between base angle and target angle: `mix(baseAngle, targetAngle, influence)`
   - Apply smooth following with existing mouse active transition

2. Tune parameters:
   - Inner radius: strong rotation influence
   - Outer radius: no rotation influence
   - Ensure smooth transition between zones

3. Verification:
   - Run `npm run build` and `npm run lint`
   - Visual check: lines rotate toward cursor when nearby
   - Lines return to upward orientation when cursor moves away
   - Transition is smooth, no snapping
   - Reduced motion: lines stay stationary

---

### [ ] Step: Add golden sunlight rays effect

Create atmospheric warm sunlight rays for visual depth.

1. Create sunlight shaders:
   - `shaders/sunlight.vert.ts`: Fullscreen quad vertex shader
   - `shaders/sunlight.frag.ts`: Ray generation with golden color palette
   - Rays emanate from upper-right area
   - Soft gaussian falloff, subtle animation

2. Create SunlightRays.tsx component:
   - Fullscreen mesh with custom shader material
   - Use shared uniforms (uTime, uReducedMotion)
   - Additive blending for glow effect
   - Low opacity (10-20%) for atmospheric effect

3. Update ParticleField.tsx:
   - Import and render SunlightRays behind particle lines
   - Ensure proper render order

4. Update shader index exports

5. Verification:
   - Run `npm run build` and `npm run lint`
   - Visual check: golden rays visible from upper area
   - Rays are subtle, don't overpower particle effect
   - Reduced motion: rays don't animate

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
