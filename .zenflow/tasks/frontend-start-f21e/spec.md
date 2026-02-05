# Technical Specification: Tetherware.org Website

## Task Difficulty: Hard

---

## DESIGN LOCK (Mandatory Before Code)

```
CONTEXT: AI safety research organization landing page with dynamic particle visualization
BILLION: First-of-its-kind quantum-aesthetic interface that makes visitors feel they're
         witnessing the intersection of physics and consciousness—not another tech startup
DIRECTION: Scientific Ethereal—where deep space meets quantum mechanics meets neural networks
ESCAPE: AI defaults to purple gradients + centered grids + Inter font →
        I build asymmetric tension + living particle topology + distinctive typography
SIGNATURE: Infinite particle mesh that breathes and responds like a living organism,
           with mouse interaction creating quantum interference patterns
```

### Design Brief
- **Purpose**: Establish Tetherware as a serious, innovative force in AI safety research through quantum randomness
- **Emotion**: Awe (the sublime feeling of witnessing something vast and intelligent)
- **Sensation**: "Like peering into the fabric of reality itself"—Linear's precision meets NASA's gravitas
- **Anti-reference**: Must NEVER feel like a crypto landing page, generic SaaS, or AI hype site

### Aesthetic Direction: Scientific Ethereal
Fully committed to this extreme: The interface should feel like mission control for understanding consciousness. Cold precision warmed by the organic unpredictability of the particle system. Every element should feel calculated yet alive.

---

## Technical Context

### Technology Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (fast HMR, optimized builds)
- **Styling**: Tailwind CSS (mobile-first, design tokens via CSS variables)
- **Routing**: React Router v6
- **Animation**:
  - Three.js + @react-three/fiber for WebGL particle system
  - Framer Motion for UI animations and page transitions
  - GSAP for scroll-driven animations
  - Custom GLSL shaders for particle effects
- **Typography**: Distinctive pairing (see Typography section)

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.x",
    "@react-three/drei": "^9.x",
    "framer-motion": "^11.x",
    "gsap": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "@types/three": "^0.160.0"
  }
}
```

---

## Design System

### Color Palette (Emotional Foundation)

**Temperature**: Cool (trust, depth, cosmic)
**Saturation**: Muted base with strategic vibrant accents (sophisticated + memorable)
**Hierarchy**: 60% void/dark, 30% particle/content, 10% accent focal points

```css
:root {
  /* Void - The infinite dark (not pure black, has depth) */
  --void-deep: #050508;        /* 60% - Primary background, cosmic depth */
  --void-surface: #0a0b0f;     /* Raised surfaces */
  --void-elevated: #12131a;    /* Cards, elevated elements */

  /* Particle Field Colors */
  --particle-base: rgba(180, 190, 200, 0.5);      /* Cool gray, scientific */
  --particle-highlight: rgba(64, 224, 208, 0.8);  /* Turquoise quantum glow */

  /* Forest Green Accent - Organic intelligence (warm contrast) */
  --accent-forest: #1a3d2e;           /* Deep, grounding */
  --accent-forest-bright: #2d6a4f;    /* Interactive states */
  --accent-forest-glow: rgba(45, 106, 79, 0.4);

  /* Quantum Cyan Accent - Energy, data, precision */
  --accent-cyan: #40e0d0;             /* Primary accent - turquoise */
  --accent-cyan-muted: #2dd4bf;       /* Secondary cyan */
  --accent-cyan-glow: rgba(64, 224, 208, 0.3);

  /* Text Hierarchy */
  --text-primary: #f0f2f5;            /* High contrast, not pure white */
  --text-secondary: rgba(240, 242, 245, 0.7);
  --text-tertiary: rgba(240, 242, 245, 0.5);
  --text-accent: var(--accent-cyan);

  /* Shadows - from palette, never pure black */
  --shadow-sm: 0 2px 8px rgba(5, 5, 8, 0.4);
  --shadow-md: 0 4px 16px rgba(5, 5, 8, 0.5);
  --shadow-lg: 0 8px 32px rgba(5, 5, 8, 0.6);
  --shadow-glow-cyan: 0 0 24px var(--accent-cyan-glow);
  --shadow-glow-forest: 0 0 24px var(--accent-forest-glow);

  /* Z-Tokens (mandatory, no raw z-index) */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 150;
  --z-modal: 200;
  --z-toast: 300;
  --z-tooltip: 400;

  /* Spacing (8px base, justified tokens) */
  --space-1: 4px;   /* Tight grouping */
  --space-2: 8px;   /* Related elements */
  --space-3: 12px;  /* Component internal */
  --space-4: 16px;  /* Component padding */
  --space-5: 24px;  /* Section gaps */
  --space-6: 32px;  /* Major sections */
  --space-7: 48px;  /* Page sections */
  --space-8: 64px;  /* Hero spacing */
  --space-9: 96px;  /* Major breaks */
  --space-10: 128px; /* Page margins */
}
```

### Typography (Distinctive Voice)

**BANNED**: Inter, Roboto, Arial, system-ui, SF Pro, Space Grotesk, Poppins

**Chosen Pairing**:
- **Display**: "Instrument Serif" or "Cormorant Garamond" - carries authority, scientific gravitas, unexpected elegance
- **Body**: "Söhne" (Klim) or fallback "DM Sans" - Swiss precision, excellent readability, modern but not generic

**Rationale**: Scientific research demands authority (serif display) while modern interface needs clarity (geometric sans body). The contrast creates tension and memorability.

```css
/* Typography Scale - fluid via clamp() */
--font-display: 'Instrument Serif', 'Cormorant Garamond', Georgia, serif;
--font-body: 'Sohne', 'DM Sans', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Hero - commanding presence */
--text-hero: clamp(3rem, 8vw, 5.5rem);      /* 48-88px */
--leading-hero: 1.05;                        /* Tight, dramatic */
--tracking-hero: -0.03em;                    /* Pulled in for density */

/* Display - section headers */
--text-display: clamp(2rem, 5vw, 3.5rem);   /* 32-56px */
--leading-display: 1.1;
--tracking-display: -0.02em;

/* Title - subsections */
--text-title: clamp(1.5rem, 3vw, 2rem);     /* 24-32px */
--leading-title: 1.2;

/* Body - readable content */
--text-body: clamp(1rem, 1.5vw, 1.125rem);  /* 16-18px */
--leading-body: 1.65;                        /* Relaxed for readability */

/* Small - captions, labels */
--text-small: clamp(0.75rem, 1vw, 0.875rem); /* 12-14px */
--leading-small: 1.4;
--tracking-small: 0.02em;                    /* Slightly open for legibility */

/* Mono - data, code */
--text-mono: 0.875rem;
--tracking-mono: -0.02em;
```

### Optical Corrections (Mandatory)
- Centered text: `translateY(-1px)` for visual balance
- Headlines 32px+: `translateX(-1%)` to optically align left edge
- Icons beside text: shift up 1-2px for baseline alignment
- Border radius proportional: 8→16→24 based on element size
- `text-wrap: balance` for all headings (no orphans)

---

## Technical Laws (Non-Negotiable)

### Text & Overflow
```
ALL text containers: break-words min-w-0 max-w-full overflow-hidden
```
Flex/grid children: `min-w-0` mandatory. Test: 50-char unbreakable string must wrap.

### Responsive
```
ALL flex containers: flex-wrap: wrap
html/body: overflow-x: hidden
```
320px viewport = zero horizontal scroll.

### Touch & States
Interactive minimum: 44×44px touch target.
ALL interactives must have: rest → hover → focus-visible → active → disabled states.
Loading/error states where applicable.

### Overlays & Z-Index
```css
.trigger { position: relative; isolation: isolate; }
.overlay { position: fixed; z-index: var(--z-dropdown); }
```
- Calculate space: above/below/left/right
- Default: below-right
- If below < height → flip UP
- If right < width → flip LEFT
- Clamp 8px from viewport edges
- Recalculate on scroll/resize
- Dismiss: outside click, Escape, trigger re-click

---

## Functional Mandate

Every interactive element MUST function. Decorative interactivity = critical failure.

**Requirements:**
- **Buttons**: onClick with real action—state change, navigation, or visible feedback
- **Forms**: onSubmit → validation → loading → success/error with visual feedback
- **Toggles/Inputs**: onChange updates visible state immediately
- **Links**: Actual navigation or smooth scroll-to-section
- **Async**: Loading → Success → Error states visible

**Test:** Click every element. Nothing visible happens → not shippable.

---

## Particle System Architecture

### The Signature Element
The particle mesh is the hero—it must feel like a living quantum field, not a tech demo.

**Behavior:**
1. **At rest**: Gentle wave motion using layered simplex noise (3 octaves)
2. **Mouse interaction**: Quantum interference pattern—particles displace in concentric ripples with phase offset
3. **Scroll**: Vertical parallax + amplitude modulation (deeper waves as user scrolls)
4. **Edge handling**: Particles extend 150% beyond viewport, opacity fadeout at boundaries (no hard edges)

**Technical Implementation:**
```
ParticleField Component
├── @react-three/fiber Canvas (full viewport, fixed position)
├── Custom ShaderMaterial
│   ├── Vertex Shader
│   │   ├── Simplex noise for base wave (uTime)
│   │   ├── Mouse position uniform (uMouse) for interference
│   │   ├── Scroll uniform (uScroll) for parallax
│   │   └── Distance-based displacement with smooth falloff
│   └── Fragment Shader
│       ├── Base color from palette
│       ├── Distance-to-mouse glow effect
│       └── Edge fadeout based on screen position
├── InstancedMesh for 15,000+ particles (GPU instancing)
├── Responsive density: scale particle count with viewport
└── Performance: RAF-based updates, skip frames on low-end devices
```

**Novel Pattern**: Mouse creates "quantum tunneling" effect—particles nearest to cursor phase through each other, creating depth illusion.

---

## Component Architecture

### Interactive States (All Components)
Every component with interaction must implement:
```typescript
interface InteractiveStates {
  default: Style;
  hover: Style;      // Mouse over
  focus: Style;      // Keyboard focus (focus-visible)
  active: Style;     // Being pressed/clicked
  disabled: Style;   // Non-interactive state
  loading?: Style;   // Async operation in progress
}
```

### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick: () => void;  // REQUIRED - must do something
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Size specifications (minimum 44px touch target)
sizes: {
  sm: { height: 36px, padding: '8px 16px', fontSize: 14px },  // Still 44px touch via padding
  md: { height: 44px, padding: '12px 24px', fontSize: 16px },
  lg: { height: 52px, padding: '16px 32px', fontSize: 18px },
}

// Animations
hover: scale(1.02) + glow shadow + 200ms ease-out
active: scale(0.98) + 100ms
focus: 2px ring offset with accent color
```

### Card Component
```typescript
interface CardProps {
  variant: 'solid' | 'glass' | 'outline';
  children: React.ReactNode;
  hoverable?: boolean;
  onClick?: () => void;  // If provided, card is interactive
  className?: string;
}

// Glass variant: backdrop-blur-md + subtle border + grain texture
// Hover: translateY(-4px) + shadow-lg + 300ms spring
```

### Section Component
```typescript
interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  align?: 'left' | 'center';  // Default: left (anti-centered default)
  reveal?: boolean;  // Scroll-triggered reveal animation
}

// Scroll reveal: Intersection Observer at 0.2 threshold
// Animation: opacity 0→1 + translateY(24px→0) + 600ms ease-out
// Stagger children: 80ms delay between elements
```

### Navigation Component
```typescript
interface NavProps {
  items: { label: string; href: string }[];
}

// Behavior:
// - Transparent at top, blur + subtle border on scroll (60px threshold)
// - Logo left (Tetherware wordmark)
// - Links right with underline slide-in on hover
// - Fixed position, z-index: var(--z-sticky)
// - Mobile: hamburger menu at 768px breakpoint
```

---

## Page Structure

### Landing Page (Home)

```
┌──────────────────────────────────────────────────────────────┐
│ [TETHERWARE]                    Concept   Explore   About    │ ← Nav (transparent)
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← Particle field (full bleed)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│                                                              │
│     Exploring quantum                                        │ ← Hero (LEFT-ALIGNED, not centered)
│     randomness in AI                                         │    Creates tension, feels intentional
│     safety and alignment                                     │
│                                                              │
│     Where true randomness meets artificial intelligence.     │ ← Subhead (secondary text color)
│     A new paradigm for alignment research.                   │
│                                                              │
│     [ Learn More ↓ ]                                         │ ← Ghost button, scroll indicator
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  THE QUESTION                                                │ ← Section (scroll reveal)
│  ───────────────                                             │
│                                                              │
│  Can quantum randomness provide the unpredictability         │
│  necessary to create truly safe AI systems?                  │
│                                                              │
│  We're exploring whether harnessing genuine quantum          │
│  uncertainty—rather than pseudo-random algorithms—           │
│  could fundamentally change how we approach alignment.       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  THREE PILLARS                                               │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  │ ◇ QUANTUM       │  │ ◇ ALIGNMENT     │  │ ◇ SAFETY        │
│  │                 │  │                 │  │                 │
│  │ True randomness │  │ New approaches  │  │ Robust systems  │
│  │ from quantum    │  │ to the core     │  │ that remain     │
│  │ phenomena       │  │ alignment       │  │ beneficial      │
│  │                 │  │ problem         │  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│     Ready to explore the intersection of                     │ ← CTA Section
│     quantum physics and AI safety?                           │
│                                                              │
│     [ Read The Concept → ]  [ Explore Research ]             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Content Rules (No Lorem Ipsum)**:
- All copy must be psychologically realistic
- Tone: Authoritative but accessible, scientific but not jargon-heavy
- Headlines: Active voice, create intrigue

---

## Motion Choreography

### Page Load Sequence
```
0ms    - Particle field begins (immediate, establishes atmosphere)
200ms  - Navigation fades in (opacity 0→1, 400ms)
400ms  - Hero title reveals (per-word stagger, 60ms each)
600ms  - Hero subtitle fades in (opacity + translateY)
800ms  - CTA button scales in (0.9→1 + opacity)
```

### Scroll Reveal Pattern
```
Intersection threshold: 0.2 (element 20% visible triggers)
Base animation: opacity 0→1 + translateY(24px→0)
Duration: 600ms
Easing: cubic-bezier(0.22, 1, 0.36, 1) (smooth deceleration)
Stagger: 80ms between siblings
```

### Signature Animation: Quantum Interference
When mouse moves over particle field:
- Particles within 200px radius respond
- Inner ring (0-80px): phase shift + color transition to cyan
- Middle ring (80-150px): wave displacement, dampened
- Outer ring (150-200px): subtle ripple, high dampening
- Animation uses spring physics (stiffness: 100, damping: 15)

---

## File Structure

```
src/
├── main.tsx                     # Entry point
├── App.tsx                      # Router + AnimatePresence
├── index.css                    # Tailwind directives + CSS variables
│
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx       # Fixed nav with scroll behavior
│   │   ├── Layout.tsx           # Page wrapper with particle field
│   │   └── Footer.tsx           # Minimal footer
│   │
│   ├── particles/
│   │   ├── ParticleField.tsx    # R3F canvas + scene
│   │   ├── ParticleMesh.tsx     # Instanced mesh component
│   │   ├── shaders/
│   │   │   ├── particle.vert    # Vertex shader
│   │   │   └── particle.frag    # Fragment shader
│   │   └── useParticleUniforms.ts
│   │
│   └── ui/
│       ├── Button.tsx           # All variants + states
│       ├── Card.tsx             # Solid/glass/outline
│       ├── Badge.tsx            # Status indicators
│       ├── Input.tsx            # Form input
│       ├── Section.tsx          # Scroll reveal wrapper
│       ├── Heading.tsx          # Animated typography
│       ├── Link.tsx             # Hover underline
│       ├── Divider.tsx          # Decorative separator
│       └── index.ts             # Barrel export
│
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── Concept.tsx              # "The Concept"
│   ├── Explore.tsx              # "Explore"
│   └── About.tsx                # "About"
│
├── hooks/
│   ├── useScrollPosition.ts     # Scroll tracking
│   ├── useInView.ts             # Intersection observer
│   ├── useMousePosition.ts      # Normalized mouse coords
│   └── useReducedMotion.ts      # prefers-reduced-motion
│
└── lib/
    └── utils.ts                 # cn() helper, etc.
```

---

## Verification Checklist

### Technical (must pass)
- [ ] 320px viewport: no horizontal scroll, no clipped content
- [ ] All text containers: `break-words min-w-0`
- [ ] All flex containers: `flex-wrap: wrap`
- [ ] All overlays: position logic + z-tokens + edge clamping
- [ ] All touch targets: ≥44px
- [ ] All interactives: 5 states implemented (default, hover, focus, active, disabled)

### Functional (must pass)
- [ ] Every button has working onClick handler
- [ ] Forms validate and provide feedback
- [ ] All navigation links work
- [ ] Particle field responds to mouse and scroll
- [ ] Reduced motion respected (`prefers-reduced-motion`)

### Design (must pass)
- [ ] Aesthetic fully committed (Scientific Ethereal)
- [ ] Typography distinctive (no banned fonts)
- [ ] Color intentional (no purple gradients, no gray-on-gray)
- [ ] Composition creates tension (NOT centered defaults everywhere)
- [ ] Signature element present (quantum interference particle effect)
- [ ] NO Lorem ipsum anywhere

### $1B Gate (must pass)
- [ ] Would Linear/Stripe ship exactly this?
- [ ] ONE thing someone will describe to others? (The particle field interaction)
- [ ] Does it feel like mission control for consciousness research?

---

## Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Particle animation: 60fps on modern hardware
- Bundle size: < 400KB initial (lazy load particle system if needed)
- Cumulative Layout Shift: < 0.1

---

## Accessibility

- `prefers-reduced-motion`: Disable particle animation, simplify reveals
- Keyboard navigation: All interactive elements focusable in logical order
- Color contrast: Text ≥7:1, UI elements ≥4.5:1
- Focus indicators: Visible, high-contrast ring
- Screen reader: Semantic HTML, ARIA labels where needed
- Target: WCAG AA minimum, AAA for text
