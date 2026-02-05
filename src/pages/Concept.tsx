import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge, Heading, Section } from '../components/ui'

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

// Staggered content animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Key concept cards data
const keyConcepts = [
  {
    title: 'Quantum vs Pseudo-Random',
    description:
      'Pseudo-random number generators are deterministic algorithms that produce sequences appearing random but are fundamentally predictable given the seed. Quantum randomness derives from physical phenomena at the subatomic level—inherently unpredictable by the laws of physics themselves.',
  },
  {
    title: 'The Measurement Problem',
    description:
      'In quantum mechanics, measurement collapses superposition into definite states. This collapse generates outcomes that cannot be predetermined, even with perfect knowledge of the system. We leverage this property to create unpredictability that no adversary can reverse-engineer.',
  },
  {
    title: 'Entanglement and Correlation',
    description:
      'Entangled particles maintain correlated states across any distance. This allows verification of true randomness: if correlations match quantum predictions, the randomness is genuine. No classical system can replicate these statistical signatures.',
  },
]

// Research implications data
const implications = [
  {
    badge: 'Adversarial Robustness',
    badgeVariant: 'cyan' as const,
    title: 'Unpredictable Decision Boundaries',
    content:
      'By introducing quantum uncertainty into decision-making processes, AI systems become resistant to adversarial attacks that exploit deterministic patterns. Attackers cannot optimize against what they cannot predict.',
  },
  {
    badge: 'Reward Hacking',
    badgeVariant: 'forest' as const,
    title: 'Preventing Specification Gaming',
    content:
      'AI systems often find unexpected shortcuts to maximize reward functions. Quantum randomness in evaluation mechanisms prevents systems from learning to game specific criteria, encouraging genuinely aligned behavior.',
  },
  {
    badge: 'Deception Detection',
    badgeVariant: 'outline' as const,
    title: 'Stochastic Verification Protocols',
    content:
      'Randomly selected verification checks—chosen via quantum processes—prevent AI systems from predicting when they are being evaluated. This makes consistent deception computationally infeasible.',
  },
]

export default function Concept() {
  const navigate = useNavigate()

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants}>
            <p className="text-text-tertiary text-sm uppercase tracking-wider mb-4">
              Understanding the Foundation
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading level={1} animate className="mb-6">
              The Concept
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-body text-text-secondary max-w-3xl leading-relaxed"
          >
            At the intersection of quantum physics and artificial intelligence lies
            an unexplored frontier. We investigate whether the fundamental
            unpredictability of quantum mechanics can address core challenges in AI
            alignment and safety.
          </motion.p>
        </motion.div>
      </section>

      {/* Why Randomness Matters */}
      <Section reveal className="bg-void-surface/20">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          The Foundation
        </p>
        <Heading level={2} className="mb-8">
          Why Randomness Matters
        </Heading>
        <div className="space-y-6 text-text-secondary text-body leading-relaxed max-w-3xl">
          <p>
            Randomness is not merely noise—it's a fundamental tool for creating
            systems that resist manipulation. In cryptography, true randomness
            protects secrets. In optimization, stochastic methods escape local
            minima. In game theory, mixed strategies prevent exploitation.
          </p>
          <p>
            For AI safety, randomness offers something unique: the ability to
            create decision-making processes that cannot be gamed by the system
            itself. An AI that cannot predict its own evaluation criteria cannot
            optimize specifically for those criteria while ignoring the underlying
            intent.
          </p>
          <p>
            But not all randomness is equal. Pseudo-random generators, while
            computationally useful, are fundamentally deterministic. A sufficiently
            advanced AI could potentially identify patterns or even recover seeds.
            Only quantum randomness provides mathematical guarantees of
            unpredictability.
          </p>
        </div>
      </Section>

      {/* Quantum vs Pseudo-Random - Key Concepts */}
      <Section reveal className="py-[var(--space-9)] lg:py-[var(--space-10)]">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          Technical Foundations
        </p>
        <Heading level={2} className="mb-12">
          Quantum vs Pseudo-Random
        </Heading>

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {keyConcepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card variant="outline" className="h-full">
                <h3 className="font-body text-xl font-medium text-text-primary mb-4">
                  {concept.title}
                </h3>
                <p className="text-text-secondary text-base leading-relaxed">
                  {concept.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="h-px bg-gradient-to-r from-transparent via-void-elevated to-transparent" />
      </div>

      {/* Implications for Alignment */}
      <Section reveal className="py-[var(--space-9)] lg:py-[var(--space-10)]">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          Research Directions
        </p>
        <Heading level={2} className="mb-6">
          Implications for Alignment
        </Heading>
        <p className="text-text-secondary text-body leading-relaxed max-w-3xl mb-12">
          True randomness opens novel approaches to longstanding alignment
          challenges. We explore three primary research directions where quantum
          properties may prove transformative.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {implications.map((item, index) => (
            <motion.div
              key={item.title}
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
                <Badge variant={item.badgeVariant} className="mb-4">
                  {item.badge}
                </Badge>
                <h3 className="font-body text-lg font-medium text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.content}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* The Path Forward */}
      <Section reveal className="bg-void-surface/20">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          Current State
        </p>
        <Heading level={2} className="mb-8">
          The Path Forward
        </Heading>
        <div className="space-y-6 text-text-secondary text-body leading-relaxed max-w-3xl">
          <p>
            This research is early-stage and exploratory. Quantum random number
            generators exist today, but integrating them meaningfully into AI
            systems requires solving non-trivial engineering and theoretical
            challenges.
          </p>
          <p>
            We must answer questions like: How much randomness is sufficient? Where
            in the decision pipeline should it be introduced? Can we verify that
            randomness is being used as intended? These are open problems we're
            actively investigating.
          </p>
          <p>
            Our approach is empirical and iterative. We build prototypes, test
            hypotheses, and publish findings. If quantum randomness proves useful
            for AI safety, we want the broader research community to benefit from
            what we learn.
          </p>
        </div>
      </Section>

      {/* CTA Section */}
      <Section
        reveal
        align="center"
        className="py-[var(--space-10)] lg:py-[var(--space-10)]"
      >
        <Heading level={2} className="mb-4 translate-x-0">
          Explore Our Research
        </Heading>
        <p className="text-text-secondary text-body mb-10 max-w-xl mx-auto">
          Dive into specific research areas, experiments, and findings as we
          investigate the quantum-AI safety connection.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/explore')}
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
            Explore Research
          </Button>
          <Button variant="secondary" onClick={() => navigate('/about')}>
            About Tetherware
          </Button>
        </div>
      </Section>

      {/* Footer spacer */}
      <div className="h-24" />
    </motion.div>
  )
}
