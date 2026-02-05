import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge, Heading, Section } from '../components/ui'

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

// Hero animation orchestration
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Pillar card data
const pillars = [
  {
    badge: 'Quantum',
    badgeVariant: 'cyan' as const,
    title: 'True Randomness',
    description:
      'Harnessing genuine quantum uncertainty—not pseudo-random algorithms—to introduce unpredictability that cannot be reverse-engineered or anticipated.',
  },
  {
    badge: 'Alignment',
    badgeVariant: 'forest' as const,
    title: 'New Approaches',
    description:
      'Exploring whether quantum indeterminacy can provide novel solutions to the core alignment problem: ensuring AI systems remain beneficial as they grow more capable.',
  },
  {
    badge: 'Safety',
    badgeVariant: 'outline' as const,
    title: 'Robust Systems',
    description:
      'Building architectures where quantum randomness creates natural barriers against manipulation, deception, and reward hacking.',
  },
]

export default function Home() {
  const navigate = useNavigate()

  const scrollToQuestion = () => {
    const section = document.getElementById('question')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      {/* Hero Section - Full viewport, left-aligned for tension */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Hero Title */}
          <motion.div variants={heroItemVariants}>
            <Heading
              level={1}
              animate
              className="mb-6"
            >
              Exploring quantum randomness in AI safety and alignment
            </Heading>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={heroItemVariants}
            className="text-body text-text-secondary max-w-2xl leading-relaxed"
          >
            Where true randomness meets artificial intelligence. A new paradigm
            for alignment research that draws from the fundamental
            unpredictability of quantum mechanics.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={heroItemVariants} className="mt-10">
            <Button
              variant="ghost"
              onClick={scrollToQuestion}
              icon={
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              }
              iconPosition="right"
              className="group border border-void-elevated hover:border-cyan/30 rounded-full px-6"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - subtle ambient element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-text-tertiary to-transparent"
          />
        </motion.div>
      </section>

      {/* The Question Section */}
      <Section
        id="question"
        reveal
        className="bg-void-surface/30"
      >
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          The Question
        </p>
        <Heading level={2} className="mb-8">
          Can quantum randomness provide the unpredictability necessary to
          create truly safe AI systems?
        </Heading>
        <div className="space-y-6 text-text-secondary text-body leading-relaxed max-w-3xl">
          <p>
            Current AI safety research relies heavily on deterministic
            approaches—mathematical proofs, formal verification, and carefully
            constrained optimization. But what if the very predictability of
            these systems is part of the problem?
          </p>
          <p>
            We're exploring whether harnessing genuine quantum uncertainty—rather
            than pseudo-random algorithms—could fundamentally change how we
            approach alignment. True randomness, sourced from quantum phenomena,
            cannot be predicted or reverse-engineered, even in principle.
          </p>
          <p>
            This opens new possibilities: AI systems that cannot be gamed by
            adversarial inputs, decision processes that resist manipulation, and
            exploration strategies that are genuinely unpredictable.
          </p>
        </div>
      </Section>

      {/* Three Pillars Section */}
      <Section reveal className="py-[var(--space-9)] lg:py-[var(--space-10)]">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          Our Focus
        </p>
        <Heading level={2} className="mb-12">
          Three Pillars of Research
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.badge}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card variant="glass" hoverable className="h-full">
                <Badge variant={pillar.badgeVariant} className="mb-4">
                  {pillar.badge}
                </Badge>
                <h3 className="font-body text-xl font-medium text-text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Divider with gradient */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="h-px bg-gradient-to-r from-transparent via-void-elevated to-transparent" />
      </div>

      {/* CTA Section */}
      <Section
        reveal
        align="center"
        className="py-[var(--space-10)] lg:py-[var(--space-10)]"
      >
        <Heading level={2} className="mb-4 translate-x-0">
          Ready to explore the intersection?
        </Heading>
        <p className="text-text-secondary text-body mb-10 max-w-xl mx-auto">
          Discover how quantum physics and AI safety research converge to create
          new possibilities for beneficial artificial intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/concept')}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            }
            iconPosition="right"
          >
            Read The Concept
          </Button>
          <Button variant="secondary" onClick={() => navigate('/explore')}>
            Explore Research
          </Button>
        </div>
      </Section>

      {/* Footer spacer */}
      <div className="h-24" />
    </motion.div>
  )
}
