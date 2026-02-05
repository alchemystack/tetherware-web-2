# Technical Specification: Dots to Lines with Sunlight Rays

## Overview

Transform the existing particle field from circular dots to short oriented lines, with cursor-following behavior, plus add golden sunlight ray effects for warmth.

**Difficulty Assessment: Medium**
- Requires shader modifications (vertex + fragment)
- New geometry approach (lines vs points)
- Smooth cursor-following interpolation
- Additional visual layer (sunlight rays)
- No architectural changes needed

---

## Technical Context

### Language & Framework
- **React 18.2** with TypeScript
- **Three.js 0.160** via React Three Fiber 8.15
- **Vite** build system
- **GLSL** shaders (vertex + fragment)

### Relevant Dependencies
- `three` - 3D rendering
- `@react-three/fiber` - React bindings
- `@react-three/drei` - Utilities (available but not used in particles)

### Current Architecture
The particle system consists of:
1. **ParticleField.tsx** - Canvas wrapper, WebGL setup
2. **ParticleMesh.tsx** - Geometry generation, particle positions/attributes
3. **useParticleUniforms.ts** - Real-time uniform updates (mouse, scroll, time)
4. **shaders/particle.vert.ts** - Vertex shader (motion, positioning)
5. **shaders/particle.frag.ts** - Fragment shader (coloring, opacity)

---

## Implementation Approach

### Part 1: Transform Dots to Lines

#### Current State
- Uses `THREE.Points` with `gl_PointSize` for circular particles
- Fragment shader creates soft circular falloff
- No orientation data per particle

#### Target State
- Use `THREE.InstancedMesh` with `THREE.PlaneGeometry` for thin rectangles (lines)
- Each instance has orientation angle stored as attribute
- Lines rotate toward cursor based on proximity

#### Technical Changes

**1. ParticleMesh.tsx**
- Replace `<points>` with `<instancedMesh>`
- Use thin `PlaneGeometry` (e.g., 0.5 wide x 8 tall)
- Add new attributes:
  - `aAngle` (Float32Array) - base orientation angle (randomized around "up")
  - `aTargetAngle` (Float32Array) - computed target angle toward cursor
- Pass instance matrices via `instanceMatrix`

**2. Vertex Shader (particle.vert.ts)**
- Remove `gl_PointSize` logic
- Add rotation matrix calculation based on angle
- Compute target angle toward cursor position
- Interpolate between base angle and target angle based on distance to cursor
- Apply rotation to vertex positions

**3. Fragment Shader (particle.frag.ts)**
- Remove circular `gl_PointCoord` logic
- Use UV coordinates for soft edge falloff on line ends
- Keep color logic (base, highlight, forest colors)

#### Angle Following Logic
```
baseAngle = roughly π/2 (pointing up) + small random offset
targetAngle = atan2(cursor.y - particle.y, cursor.x - particle.x) + π/2

influence = smoothstep(outerRadius, innerRadius, distanceToCursor)
finalAngle = mix(baseAngle, targetAngle, influence * uMouseActive)
```

The `influence` factor creates gradual transition:
- Far from cursor: lines point up (default)
- Near cursor: lines rotate to face cursor
- Transition is smooth via `smoothstep`

### Part 2: Golden Sunlight Rays

#### Approach: Separate Mesh Layer
Add a new component for volumetric light rays, rendered behind the particle lines.

**New File: SunlightRays.tsx**
- Uses fullscreen quad with custom shader
- Rays emanate from multiple source points (top-right area)
- Soft, animated golden glow
- Very subtle (atmospheric, not dominant)

**Sunlight Shader**
- Fragment-only effect on fullscreen quad
- Multiple ray sources with different angles
- Soft gaussian falloff
- Golden/warm color palette: `rgb(255, 200, 100)` to `rgb(255, 160, 60)`
- Animated intensity (slow pulse/drift)
- Blends additively with scene

#### Color Integration
Sunlight rays should complement existing palette:
- **Current**: Void dark bg, cyan/forest particle highlights
- **Addition**: Warm golden rays create contrast
- Rays are subtle (10-20% opacity) to not overpower

---

## Source Code Changes

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/particles/ParticleMesh.tsx` | Switch to InstancedMesh, add angle attributes |
| `src/components/particles/shaders/particle.vert.ts` | Add rotation logic, angle interpolation |
| `src/components/particles/shaders/particle.frag.ts` | UV-based rendering instead of point coords |
| `src/components/particles/useParticleUniforms.ts` | No changes needed (mouse data already available) |
| `src/components/particles/ParticleField.tsx` | Add SunlightRays component |
| `src/components/particles/shaders/index.ts` | Export new sunlight shaders |

### Files to Create

| File | Purpose |
|------|---------|
| `src/components/particles/SunlightRays.tsx` | Sunlight ray mesh component |
| `src/components/particles/shaders/sunlight.vert.ts` | Fullscreen quad vertex shader |
| `src/components/particles/shaders/sunlight.frag.ts` | Ray generation fragment shader |

---

## Data Model / API Changes

### New Shader Attributes (per instance)
```typescript
// In ParticleMesh.tsx
const angles = new Float32Array(particleCount) // Base orientation
// Populated with: Math.PI / 2 + (Math.random() - 0.5) * 0.3 (roughly up with variation)
```

### New Uniforms (optional, for rays)
```typescript
// In SunlightRays.tsx or shared
uRayIntensity: { value: 0.15 }  // Overall ray strength
uRayColor: { value: new THREE.Color(1.0, 0.78, 0.4) } // Golden warm
```

---

## Verification Approach

### Build & Lint
```bash
npm run build   # TypeScript compilation + Vite build
npm run lint    # ESLint checks
```

### Manual Testing Checklist
1. **Lines render correctly** - Thin oriented shapes visible
2. **Default orientation** - Lines point roughly upward when cursor is away
3. **Cursor following** - Lines gradually orient toward cursor as it approaches
4. **Smooth transition** - No snapping, gradual rotation
5. **Edge fadeout preserved** - Lines fade at screen edges
6. **Mouse interactivity preserved** - Highlight colors still work
7. **Sunlight rays visible** - Subtle golden rays from upper area
8. **Performance acceptable** - No frame drops (check DevTools)
9. **Reduced motion respected** - Lines don't rotate, rays don't animate
10. **Mobile responsive** - Works on touch devices

### Browser Testing
- Chrome (primary)
- Firefox
- Safari (WebGL compatibility)
- Mobile Chrome/Safari

---

## Risk Assessment

### Low Risk
- Shader modifications are self-contained
- No API changes
- Existing hooks/uniforms are reused

### Medium Risk
- InstancedMesh performance with 15,000 instances
  - Mitigation: Same order of magnitude as current Points
- GLSL rotation math complexity
  - Mitigation: Well-documented pattern

### Mitigations
- Keep old shader code commented during development
- Test performance on lower-end devices
- Use `requestAnimationFrame` profiling

---

## Dependencies

No new dependencies required. Current stack supports all features:
- Three.js `InstancedMesh` for lines
- Existing shader pipeline for custom GLSL
- React Three Fiber for mesh management
