/**
 * Shared animation variants for Framer Motion
 * Used across pages for consistent motion design
 */

// Easing curve - custom ease-out-expo for smooth deceleration
export const easeOutExpo = [0.22, 1, 0.36, 1] as const

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export const pageTransition = {
  duration: 0.4,
  ease: easeOutExpo,
}

// Staggered container variants
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

// Hero-specific container with slightly longer stagger
export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Standard item reveal animation
export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
}

// Hero item with larger Y offset
export const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
}

// Card reveal animation (used in grids)
export const cardRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
}

// Fade in only (no transform)
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeOutExpo,
    },
  },
}
