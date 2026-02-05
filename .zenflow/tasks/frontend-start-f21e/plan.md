# Spec and build

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

---

## Agent Instructions

**BILLION-DOLLAR INTERFACE MODE ACTIVE**

You build billion-dollar interfaces. Every output = flagship product launching today.

**PRIORITY**: Functional → Beautiful → Cohesive → Memorable → Performance
**MINDSET**: First instinct is AI default. Default is wrong. Elevate everything.

### Before Writing Any Code
1. Read `spec.md` completely - it contains the DESIGN LOCK
2. Follow all Technical Laws (non-negotiable)
3. Every interactive MUST function (no decorative buttons)
4. All 5 states for every interactive (default, hover, focus, active, disabled)
5. NO Lorem ipsum - psychologically realistic copy only
6. NO banned fonts (Inter, Roboto, Arial, system-ui, SF Pro, Space Grotesk, Poppins)
7. NO purple gradients, gray-on-gray, centered defaults everywhere

### Anti-Slop Intercept
| Instinct | Intercept |
|----------|-----------|
| Purple gradient | Use quantum cyan + forest green from spec |
| Inter/Roboto | Use Instrument Serif + DM Sans |
| Centered grid | Left-align hero, create asymmetric tension |
| Uniform spacing | Cluster density vs. breathing space intentionally |
| White void | Use void-deep (#050508) with atmosphere |
| Standard button | Add glow, spring physics, memorable interaction |

---

## Workflow Steps

### [x] Step: Technical Specification

**Difficulty: Hard**

Created comprehensive technical specification in `spec.md` covering:
- DESIGN LOCK: Scientific Ethereal aesthetic, quantum-consciousness intersection
- Technology stack: React 18 + TypeScript + Vite + Tailwind + Three.js + Framer Motion + GSAP
- Design system: Void-based palette, distinctive typography (Instrument Serif + DM Sans), 8px grid
- Particle system: Quantum interference patterns, 15K+ instanced particles, GLSL shaders
- Technical Laws: Text overflow, responsive, touch targets, z-tokens, 5-state interactives
- Verification: Technical, Functional, Design, and $1B Gate checklists

---

### [x] Step: Project Setup & Core Infrastructure
<!-- chat-id: 12708d99-be2e-4f5e-9a66-ac94bbf2d89d -->

Initialize the project with billion-dollar foundations.

**Pre-flight:**
- [x] Create `.gitignore` (node_modules, dist, .cache, *.log, etc.)

**Project Initialization:**
1. Create `package.json` with all dependencies from spec (React, Three.js, Framer Motion, GSAP, Tailwind)
2. Create `vite.config.ts` with React plugin
3. Create `tsconfig.json` with strict mode
4. Create `index.html` with:
   - Preload fonts (Instrument Serif from Google Fonts, DM Sans)
   - Meta viewport for mobile
   - Dark theme meta color
5. Create `postcss.config.js` and `tailwind.config.ts`:
   - Extend colors with spec void/accent palette
   - Add custom spacing scale
   - Configure typography plugin if using

**Entry Points:**
6. Create `src/main.tsx` - React 18 createRoot
7. Create `src/App.tsx`:
   - React Router setup with AnimatePresence for page transitions
   - Routes: /, /concept, /explore, /about
8. Create `src/index.css`:
   - Tailwind directives (@tailwind base/components/utilities)
   - CSS variables from spec (all colors, spacing, z-tokens, typography)
   - Base styles: html/body overflow-x: hidden, void-deep background
   - Font-face declarations

**Layout Components:**
9. Create `src/components/layout/Navigation.tsx`:
   - Fixed position, z-index: var(--z-sticky)
   - Transparent at top, blur + border on scroll (60px threshold)
   - Logo left (TETHERWARE wordmark in display font)
   - Links right with underline slide-in hover animation
   - All 5 states for nav links
   - Mobile: hamburger at 768px (can be simplified initially)
10. Create `src/components/layout/Layout.tsx`:
    - Page wrapper component
    - Slot for ParticleField (will be added next step)
    - Main content area with proper z-index layering

**Hooks:**
11. Create `src/hooks/useScrollPosition.ts` - scroll Y tracking
12. Create `src/hooks/useReducedMotion.ts` - prefers-reduced-motion detection
13. Create `src/lib/utils.ts` - cn() helper (clsx + tailwind-merge)

**Verification:**
- [x] `npm install` completes without errors
- [x] `npm run dev` starts, shows navigation
- [x] Navigation links route correctly
- [x] Scroll behavior triggers nav background change
- [x] 320px viewport: no horizontal scroll

---

### [x] Step: WebGL Particle System - The Signature Element
<!-- chat-id: 250af0be-67c5-45b1-bc31-4237694d0b10 -->

Build the quantum interference particle field that makes visitors pause.

**SIGNATURE**: This is the ONE thing people will describe to others.

**Hooks:**
1. Create `src/hooks/useMousePosition.ts`:
   - Track normalized mouse position (-1 to 1)
   - Smooth interpolation for fluid movement
   - Return { x, y, isActive }

2. Create `src/components/particles/useParticleUniforms.ts`:
   - Combine mouse position, scroll, and time into uniforms
   - Handle reduced motion (freeze animation)

**Shaders:**
3. Create `src/components/particles/shaders/particle.vert`:
   - Uniforms: uTime, uMouse (vec2), uScroll, uResolution
   - Base wave: layered simplex noise (3 octaves) for organic motion
   - Mouse interference: distance-based displacement with phase offset
   - Inner ring (0-80px): strong displacement + color shift
   - Middle ring (80-150px): medium wave, dampened
   - Outer ring (150-200px): subtle ripple
   - Scroll parallax: vertical offset based on uScroll
   - Edge fadeout: calculate screen position, reduce opacity at edges

4. Create `src/components/particles/shaders/particle.frag`:
   - Base color: particle-base from spec
   - Highlight: particle-highlight (cyan) based on mouse distance
   - Edge fadeout: smooth opacity reduction at viewport boundaries
   - Glow effect: additive blending near mouse cursor

**Components:**
5. Create `src/components/particles/ParticleMesh.tsx`:
   - InstancedMesh with 15,000+ particles (scale with viewport)
   - Grid layout extending 150% beyond viewport
   - Custom ShaderMaterial with uniforms from hook
   - useFrame for animation loop (RAF-based)
   - Performance: skip frames on low-end devices

6. Create `src/components/particles/ParticleField.tsx`:
   - React Three Fiber Canvas
   - Full viewport, fixed position, z-index: var(--z-base)
   - pointer-events: none (allow clicks through to content)
   - OrthographicCamera or perspective with far plane
   - Suspense boundary with null fallback (particles load async)

7. Integrate into `Layout.tsx`:
   - ParticleField as first child, behind all content
   - Content wrapper with relative position, higher z-index

**Novel Pattern - Quantum Tunneling Effect:**
- Particles nearest cursor (inner 40px) phase through each other
- Creates depth illusion by temporarily hiding some particles
- Reveals void beneath the particle surface

**Verification:**
- [x] Particles render full viewport, no visible edges
- [x] Mouse interaction creates interference ripples
- [x] Scroll affects wave amplitude and parallax
- [x] 60fps on modern hardware (check with React DevTools)
- [x] Reduced motion: particles frozen but visible
- [x] Mobile: touch interaction works, particle count reduced

**Implementation Summary:**
- Created `useMousePosition` hook with smooth lerp interpolation and touch support
- Created `useParticleUniforms` hook combining mouse, scroll, time uniforms
- Created vertex shader with 3-octave FBM noise, quantum interference rings, scroll parallax
- Created fragment shader with base/highlight colors, additive glow, edge fadeout
- Created `ParticleMesh` with 15K instanced particles, viewport-adaptive density
- Created `ParticleField` with R3F Canvas, WebGL fallback, lazy loading
- Integrated into Layout component

---

### [x] Step: UI Component Library
<!-- chat-id: fbaa6f8e-5ed5-4a7e-bbe0-0d4757c5153d -->

Build the design system components with full interactivity.

**MANDATE**: Every button clicks, every state exists, no decorative elements.

**Utility:**
1. Create `src/components/ui/index.ts` - barrel export for all components

**Button Component:**
2. Create `src/components/ui/Button.tsx`:
   - Variants: primary (forest green glow), secondary (cyan outline), ghost (transparent)
   - Sizes: sm (36px), md (44px), lg (52px) - all meet 44px touch target
   - Props: onClick (REQUIRED), disabled, loading, icon, iconPosition
   - States:
     - default: base styles
     - hover: scale(1.02) + glow shadow + 200ms ease-out
     - focus-visible: 2px ring offset with accent color
     - active: scale(0.98) + 100ms
     - disabled: opacity 50%, cursor not-allowed
     - loading: spinner icon, pointer-events none
   - Animation: Framer Motion whileHover, whileTap

**Card Component:**
3. Create `src/components/ui/Card.tsx`:
   - Variants: solid (void-elevated bg), glass (backdrop-blur + grain), outline (border only)
   - Props: hoverable, onClick (makes card interactive), className
   - Hover (if hoverable): translateY(-4px) + shadow-lg + 300ms spring
   - If onClick provided: all 5 interactive states
   - Glass variant: subtle noise texture overlay

**Badge Component:**
4. Create `src/components/ui/Badge.tsx`:
   - Variants: default, cyan, forest, outline
   - Pill shape (border-radius: 9999px)
   - Subtle scale on hover if interactive

**Input Component:**
5. Create `src/components/ui/Input.tsx`:
   - Text input with void-surface background
   - Focus: cyan glow ring, border color change
   - States: default, focus, error, disabled
   - Placeholder styling (text-tertiary)
   - Error state: red border + error message below

**Divider Component:**
6. Create `src/components/ui/Divider.tsx`:
   - Horizontal gradient line (void-surface to accent to void-surface)
   - Optional vertical variant
   - Decorative, no interaction needed

**Link Component:**
7. Create `src/components/ui/Link.tsx`:
   - Underline slides in from left on hover
   - Color variants: default (text-secondary), accent (cyan)
   - Works with React Router (use Link component internally)
   - All states: default, hover, focus, active

**Verification:**
- [x] All buttons have onClick that does something visible
- [x] All 5 states work for every interactive component
- [x] Touch targets >= 44px
- [x] Hover animations smooth (200-300ms)
- [x] Focus rings visible with keyboard navigation
- [x] Reduced motion: no scale/transform, only opacity changes

**Implementation Summary:**
- Created barrel export `src/components/ui/index.ts` for all 6 components
- **Button**: 3 variants (primary/secondary/ghost), 3 sizes, Framer Motion spring animations, loading spinner, full 5-state support
- **Card**: 3 variants (solid/glass/outline), glass variant with noise texture overlay, spring physics hover, keyboard accessible
- **Badge**: 4 variants (default/cyan/forest/outline), pill shape, interactive mode with scale animation
- **Input**: Full form support with label, error/hint messages, focus glow, all states, proper ARIA attributes
- **Divider**: 3 variants (default/gradient/accent), horizontal/vertical orientation support
- **Link**: React Router integration, slide-in underline animation, external link detection with indicator icon
- All components respect prefers-reduced-motion
- TypeScript compiles without errors
- Build succeeds

---

### [x] Step: Section & Heading Components with Scroll Reveal
<!-- chat-id: 21d7dbe4-6de0-4095-8ddf-c37c0e995a68 -->

Build content structure with choreographed animations.

**Hooks:**
1. Create `src/hooks/useInView.ts`:
   - Intersection Observer wrapper
   - Configurable threshold (default: 0.2)
   - Returns { ref, isInView }
   - Trigger once option (for reveal animations)

**Heading Component:**
2. Create `src/components/ui/Heading.tsx`:
   - Levels: 1 (hero), 2 (display), 3 (title), 4 (subtitle)
   - Typography from spec (font-display for h1/h2, font-body for h3/h4)
   - Props: level, animate, className
   - Animate mode:
     - Per-word stagger reveal (60ms between words)
     - opacity 0 to 1 + translateY(12px to 0)
   - Optical correction: translateX(-1%) for h1/h2
   - text-wrap: balance (no orphans)

**Section Component:**
3. Create `src/components/ui/Section.tsx`:
   - Props: id, title, subtitle, children, align (default: left), reveal
   - Scroll reveal animation when reveal=true:
     - opacity 0 to 1 + translateY(24px to 0)
     - Duration: 600ms
     - Easing: cubic-bezier(0.22, 1, 0.36, 1)
   - Stagger children: 80ms delay between direct children
   - Consistent padding: var(--space-7) vertical, responsive horizontal
   - Max-width container (prose-like for readability)

**Motion Choreography (add to Section):**
- Use Framer Motion staggerChildren and delayChildren
- Ensure animations only trigger once (not on scroll back up)
- Respect reduced motion

**Verification:**
- [x] Sections reveal when scrolling into view
- [x] Animation triggers at 20% visibility
- [x] Children stagger correctly (80ms gaps visible)
- [x] Headings align properly (optical correction visible)
- [x] Reduced motion: instant appearance, no animation
- [x] No layout shift during reveal

**Implementation Summary:**
- Created `src/hooks/useInView.ts` with Intersection Observer, configurable threshold (0.2), rootMargin, and triggerOnce option
- Created `src/components/ui/Heading.tsx`:
  - 4 levels with proper typography (font-display for h1/h2, font-body for h3/h4)
  - Word-stagger reveal animation (60ms between words) using Framer Motion
  - Optical correction translateX(-1%) for h1/h2
  - text-wrap: balance for no orphans
  - Respects prefers-reduced-motion
- Created `src/components/ui/Section.tsx`:
  - Props: id, title, subtitle, children, align (default: left), reveal
  - Scroll reveal with opacity + translateY animation (600ms, ease-out-expo)
  - Stagger children with 80ms delay using Framer Motion staggerChildren
  - Consistent spacing with CSS variables
  - Animations trigger once at 20% visibility
  - Static rendering when reduced motion preferred
- Exported components from `src/components/ui/index.ts`
- Build succeeds with no TypeScript errors

---

### [x] Step: Landing Page (Home)
<!-- chat-id: 7a2f59d2-e5a6-4767-85dd-9a3e2d6c8682 -->

Build the flagship landing page - this is the $1B gate.

**REMEMBER:**
- NO Lorem ipsum
- NO centered-everything defaults
- Hero LEFT-ALIGNED for tension
- Every button MUST do something

**Page Structure:**
1. Create `src/pages/Home.tsx`:

**Hero Section (viewport height):**
- Left-aligned hero creates intentional asymmetric tension
- Particle field visible behind
- Heading level 1 with animate: Exploring quantum randomness in AI safety and alignment
- Subtitle text-secondary: Where true randomness meets artificial intelligence. A new paradigm for alignment research.
- Ghost button: Learn More with down arrow, onClick scrolls to question section

**The Question Section:**
- id=question for scroll target
- Title: The Question
- Content about quantum randomness and AI safety (realistic copy)
- reveal=true for scroll animation

**Three Pillars Section:**
- Title: Three Pillars
- 3-column grid (1 col mobile) of glass Cards
- Each card: Badge (Quantum/Alignment/Safety), heading, description
- Cards hoverable with real content

**CTA Section:**
- Heading level 2: Ready to explore the intersection of quantum physics and AI safety?
- Two buttons: Read The Concept (primary, navigates to /concept), Explore Research (secondary, navigates to /explore)
- Center-aligned OK for CTA sections

**Page Load Animation Sequence:**
- 0ms: Particle field active
- 200ms: Navigation fades in
- 400ms: Hero title reveals (word stagger)
- 600ms: Subtitle fades in
- 800ms: CTA button scales in

**Verification:**
- [x] Hero left-aligned, creates visual tension
- [x] All buttons navigate or scroll somewhere
- [x] Scroll reveals trigger correctly
- [x] Card hovers feel satisfying (spring physics)
- [x] Page load sequence choreographed
- [x] Mobile: single column, touch-friendly
- [x] NO Lorem ipsum - all real copy
- [x] Slop test: Does NOT look like every AI demo

**Implementation Summary:**
- Rebuilt `src/pages/Home.tsx` with complete landing page implementation
- **Hero Section**:
  - Full viewport height with left-aligned content (asymmetric tension)
  - Animated Heading level 1 with word-stagger reveal
  - Subtitle with realistic copy about quantum mechanics and AI alignment
  - Ghost "Learn More" button with down arrow, scrolls to #question section
  - Subtle animated scroll indicator at bottom
  - Orchestrated page load animation sequence (staggered children with delays)
- **The Question Section**:
  - Section with id="question" for smooth scroll target
  - Scroll reveal animation enabled
  - Three paragraphs of realistic, psychologically-grounded copy about quantum randomness in AI safety
  - Section label with uppercase tracking
- **Three Pillars Section**:
  - 3-column responsive grid (1 col mobile, 3 col desktop)
  - Glass variant Cards with hover effects and spring physics
  - Badges: Quantum (cyan), Alignment (forest), Safety (outline)
  - Each pillar has title and description with real content
  - Staggered reveal animation per card
- **CTA Section**:
  - Center-aligned (appropriate for CTA)
  - Heading level 2 with question framing
  - Two buttons: "Read The Concept" (primary, navigates to /concept), "Explore Research" (secondary, navigates to /explore)
  - Buttons use react-router-dom navigate for SPA navigation
- **Gradient divider** between sections for visual separation
- Build succeeds with no TypeScript errors
- All interactive elements have working onClick handlers

---

### [x] Step: Secondary Pages
<!-- chat-id: d373766c-1482-4307-b47d-5b4ea8a851b4 -->

Build Concept, Explore, and About pages with consistent design language.

**Page Transitions:**
- Wrap routes in AnimatePresence
- Exit: opacity 0, translateY(-8px), 200ms
- Enter: opacity 0 to 1, translateY(8px to 0), 400ms

**Concept Page:**
1. Create `src/pages/Concept.tsx`:
   - Hero: The Concept heading with particle field visible
   - Sections explaining quantum randomness in AI:
     - Why Randomness Matters
     - Quantum vs Pseudo-Random
     - Implications for Alignment
   - Use Card components for key concepts
   - Realistic copy about quantum computing and AI safety

**Explore Page:**
2. Create `src/pages/Explore.tsx`:
   - Explore heading
   - Grid of research areas/resources as Cards
   - Each card hoverable with onClick (can link to # for now)
   - Categories: Research Papers, Experiments, Data, Tools
   - Badge components for categorization

**About Page:**
3. Create `src/pages/About.tsx`:
   - About Tetherware heading
   - Mission statement section
   - Team/organization placeholder (realistic names if placeholder)
   - Contact section with Input component (email signup)
   - Form must validate and show feedback

**Footer (optional):**
4. Create `src/components/layout/Footer.tsx`:
   - Minimal: Logo, copyright, maybe social links
   - Consistent with nav styling

**Verification:**
- [x] Page transitions smooth (exit before enter)
- [x] All pages accessible via navigation
- [x] Content realistic, no Lorem ipsum
- [x] Forms validate and provide feedback
- [x] Consistent design language across pages
- [x] Mobile responsive

**Implementation Summary:**
- **Page Transitions**: AnimatePresence already configured with mode="wait" in App.tsx; all pages use consistent pageVariants with exit(-8px), enter(+8px), 400ms duration
- **Concept Page** (`src/pages/Concept.tsx`):
  - Hero with animated heading and descriptive subtitle
  - "Why Randomness Matters" section with realistic copy about cryptography, optimization, and AI safety
  - "Quantum vs Pseudo-Random" section with 3 outline Cards explaining key concepts (quantum measurement, entanglement, PRNGs)
  - "Implications for Alignment" section with 3 glass Cards covering adversarial robustness, reward hacking, and deception detection
  - "The Path Forward" section acknowledging early-stage research
  - CTA section navigating to /explore and /about
- **Explore Page** (`src/pages/Explore.tsx`):
  - Hero with research & resources theme
  - Category filter bar with 5 options: All, Research Papers, Experiments, Data & Benchmarks, Tools & Libraries
  - 10 research items with realistic titles, descriptions, status badges (Published/Ongoing/Planned), and dates
  - Animated filter transitions with Framer Motion layout
  - Each card is hoverable with onClick handler
  - "Contribute to Our Research" section about open collaboration
  - CTA section navigating to /about and /concept
- **About Page** (`src/pages/About.tsx`):
  - Hero with mission overview
  - "Our Mission" section with 3 paragraphs explaining alignment research and quantum approach
  - "Core Principles" section with 3 outline Cards (Empirical Rigor, Open Collaboration, Practical Impact)
  - "Our Team" section with 4 realistic team members (glass Cards with roles, focus areas, badge variants)
  - **Contact Form** with:
    - Email input using Input component with validation
    - Textarea for optional message with matching styling
    - Form submission with loading state and simulated delay
    - Success state with confirmation message and "Send another" option
    - Email validation (required + format check)
  - CTA section navigating to /explore and /concept
- **Footer** (`src/components/layout/Footer.tsx`):
  - TETHERWARE wordmark logo with hover effect
  - Tagline: "Exploring quantum randomness in AI safety and alignment"
  - Navigation links to all secondary pages
  - Gradient divider
  - Copyright with current year
  - Integrated into Layout.tsx with flex-grow main content
- All pages use consistent animation patterns, Section/Heading components, and realistic copy
- TypeScript compiles without errors
- Build succeeds

---

### [x] Step: Polish & Optimization - Ship Nothing Less Than Extraordinary
<!-- chat-id: e83721e7-4a13-4d3d-aa5a-80522ad97352 -->

Final refinements for production-ready, billion-dollar quality.

**Accessibility:**
1. Add `prefers-reduced-motion` support throughout:
   - Particle field: freeze animation, static position
   - UI animations: instant transitions, no transforms
   - Scroll reveals: instant appearance
2. Keyboard navigation audit:
   - Tab through all interactives in logical order
   - Focus rings visible and consistent
   - Escape closes any overlays
3. Screen reader audit:
   - Semantic HTML (header, main, nav, section, footer)
   - ARIA labels where needed
   - Alt text for any images

**Performance:**
4. Bundle analysis:
   - Check size with `npm run build`
   - Target: < 400KB initial
   - Lazy load ParticleField if over budget
5. Particle system optimization:
   - Reduce count on mobile (8K vs 15K)
   - Skip frames on low-end devices (check FPS)
   - Consider LOD (level of detail) based on scroll

**Cross-browser:**
6. Test on Chrome, Firefox, Edge
7. WebGL fallback: static gradient if WebGL unavailable

**Final Polish:**
8. Visual audit at multiple viewports (320, 768, 1024, 1440, 1920):
   - No horizontal scroll anywhere
   - No orphaned headings
   - Consistent spacing
   - No sharp edges or visual breaks
9. Interaction audit:
   - Click every button - something happens
   - Tab through everything - focus visible
   - All hovers feel satisfying
10. Motion audit:
    - Choreography feels intentional
    - No janky transitions
    - Spring physics feel natural

**Verification Checklists (from spec):**

**Technical (must pass):**
- [ ] 320px viewport: no horizontal scroll
- [ ] All text: break-words min-w-0
- [ ] All flex: flex-wrap applied
- [ ] All touch targets: >= 44px
- [ ] All interactives: 5 states

**Functional (must pass):**
- [ ] Every button has working handler
- [ ] Forms validate and provide feedback
- [ ] All navigation works
- [ ] Particle field responds to mouse/scroll
- [ ] Reduced motion respected

**Design (must pass):**
- [ ] Scientific Ethereal aesthetic committed
- [ ] Typography distinctive (no banned fonts)
- [ ] Color intentional (no banned patterns)
- [ ] Composition creates tension
- [ ] Signature element present (quantum interference)
- [ ] NO Lorem ipsum

**$1B Gate (must pass):**
- [ ] Would Linear/Stripe ship exactly this?
- [ ] ONE thing someone will describe to others?
- [ ] Feels like mission control for consciousness research?

**Build & Report:**
11. `npm run build` - must succeed
12. `npm run preview` - test production build
13. Write `{@artifacts_path}/report.md`:
    - What was implemented
    - How it was tested
    - Challenges encountered
    - $1B gate self-assessment
