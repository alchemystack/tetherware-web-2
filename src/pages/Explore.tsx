import { useState } from 'react'
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

// Research categories
type Category = 'all' | 'papers' | 'experiments' | 'data' | 'tools'

interface ResearchItem {
  id: string
  category: Exclude<Category, 'all'>
  title: string
  description: string
  status: 'published' | 'ongoing' | 'planned'
  date?: string
}

const researchItems: ResearchItem[] = [
  {
    id: 'qrng-integration',
    category: 'papers',
    title: 'QRNG Integration Architectures for Neural Networks',
    description:
      'A systematic analysis of where and how quantum random number generators can be integrated into deep learning pipelines, with benchmarks on computational overhead and randomness consumption.',
    status: 'published',
    date: '2025',
  },
  {
    id: 'adversarial-robustness',
    category: 'papers',
    title: 'Stochastic Defenses Against Adversarial Examples',
    description:
      'Empirical study comparing quantum-seeded randomization versus pseudo-random approaches in defending against gradient-based adversarial attacks across image classification tasks.',
    status: 'ongoing',
  },
  {
    id: 'verification-protocols',
    category: 'papers',
    title: 'Quantum-Random Verification Protocols for AI Systems',
    description:
      'Theoretical framework for using Bell inequality tests to verify that AI evaluation mechanisms are genuinely non-deterministic and resistant to anticipation.',
    status: 'planned',
  },
  {
    id: 'rl-exploration',
    category: 'experiments',
    title: 'Quantum Exploration in Reinforcement Learning',
    description:
      'Experimental comparison of exploration strategies in sparse-reward environments: epsilon-greedy with pseudo-random vs quantum-random sources across Atari and MuJoCo benchmarks.',
    status: 'ongoing',
  },
  {
    id: 'deception-detection',
    category: 'experiments',
    title: 'Stochastic Probing for Deception Detection',
    description:
      'Prototype system that uses quantum-random selection of evaluation prompts to detect inconsistencies in language model responses, indicating potential deceptive behavior.',
    status: 'ongoing',
  },
  {
    id: 'reward-hacking',
    category: 'experiments',
    title: 'Preventing Reward Hacking via Random Evaluation',
    description:
      'Controlled experiment testing whether quantum-random selection of reward evaluation criteria reduces specification gaming in goal-directed agents.',
    status: 'planned',
  },
  {
    id: 'qrng-benchmark',
    category: 'data',
    title: 'QRNG Performance Benchmarks',
    description:
      'Standardized benchmark dataset comparing throughput, latency, and statistical properties of commercial quantum random number generators for AI applications.',
    status: 'published',
    date: '2024',
  },
  {
    id: 'randomness-corpus',
    category: 'data',
    title: 'AI Randomness Requirements Corpus',
    description:
      'Survey dataset collecting randomness consumption patterns across 50+ AI systems, categorized by application domain, model architecture, and security requirements.',
    status: 'ongoing',
  },
  {
    id: 'qrng-lib',
    category: 'tools',
    title: 'qrand-ml: Quantum Randomness for ML',
    description:
      'Python library providing drop-in replacements for numpy and torch random functions backed by quantum random number generators, with automatic fallback and caching.',
    status: 'published',
    date: '2025',
  },
  {
    id: 'verification-toolkit',
    category: 'tools',
    title: 'Stochastic Verification Toolkit',
    description:
      'Open-source framework for implementing quantum-random probing protocols in AI evaluation pipelines, with integrations for popular ML frameworks.',
    status: 'ongoing',
  },
]

const categoryLabels: Record<Category, string> = {
  all: 'All Research',
  papers: 'Research Papers',
  experiments: 'Experiments',
  data: 'Data & Benchmarks',
  tools: 'Tools & Libraries',
}

const statusStyles = {
  published: { badge: 'cyan' as const, label: 'Published' },
  ongoing: { badge: 'forest' as const, label: 'Ongoing' },
  planned: { badge: 'outline' as const, label: 'Planned' },
}

export default function Explore() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredItems =
    activeCategory === 'all'
      ? researchItems
      : researchItems.filter((item) => item.category === activeCategory)

  const categories: Category[] = ['all', 'papers', 'experiments', 'data', 'tools']

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
              Research & Resources
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading level={1} animate className="mb-6">
              Explore
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-body text-text-secondary max-w-3xl leading-relaxed"
          >
            Browse our research papers, ongoing experiments, datasets, and
            open-source tools. All resources are designed to advance the
            understanding of quantum randomness in AI safety.
          </motion.p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <Section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                min-h-[44px] min-w-[44px]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void-deep
                ${
                  activeCategory === category
                    ? 'bg-cyan/15 text-cyan border border-cyan/40'
                    : 'bg-void-elevated text-text-secondary border border-void-surface hover:text-text-primary hover:border-void-elevated'
                }
              `}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </motion.div>
      </Section>

      {/* Research Grid */}
      <Section className="py-[var(--space-8)] lg:py-[var(--space-9)]">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                layout: { duration: 0.3 },
                opacity: { duration: 0.4 },
                y: { duration: 0.4, delay: index * 0.05 },
              }}
            >
              <Card
                variant="glass"
                hoverable
                onClick={() => {
                  // For now, cards link to a placeholder
                  // In production, this would navigate to individual research pages
                  console.log(`View details for: ${item.id}`)
                }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={statusStyles[item.status].badge}>
                    {statusStyles[item.status].label}
                  </Badge>
                  <span className="text-text-tertiary text-xs uppercase tracking-wider">
                    {categoryLabels[item.category].replace(' & ', ' · ')}
                  </span>
                </div>

                <h3 className="font-body text-lg font-medium text-text-primary mb-3">
                  {item.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed flex-grow">
                  {item.description}
                </p>

                {item.date && (
                  <p className="text-text-tertiary text-xs mt-4 pt-4 border-t border-void-elevated">
                    Published {item.date}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-text-tertiary text-center py-12"
          >
            No items found in this category.
          </motion.p>
        )}
      </Section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="h-px bg-gradient-to-r from-transparent via-void-elevated to-transparent" />
      </div>

      {/* Contributing Section */}
      <Section reveal className="py-[var(--space-9)] lg:py-[var(--space-10)]">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          Open Research
        </p>
        <Heading level={2} className="mb-8">
          Contribute to Our Research
        </Heading>
        <div className="space-y-6 text-text-secondary text-body leading-relaxed max-w-3xl">
          <p>
            Our research is open by design. We publish findings, share datasets,
            and release tools under permissive licenses. If our work proves
            valuable for AI safety, we want the entire research community to
            benefit.
          </p>
          <p>
            We welcome collaboration from researchers, engineers, and organizations
            interested in quantum approaches to AI alignment. Whether you want to
            reproduce our experiments, build on our tools, or propose new research
            directions—we're interested in hearing from you.
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
          Learn More About Tetherware
        </Heading>
        <p className="text-text-secondary text-body mb-10 max-w-xl mx-auto">
          Discover our mission, team, and how we approach the challenge of making
          AI systems genuinely safe through quantum uncertainty.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/about')}
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
            About Tetherware
          </Button>
          <Button variant="secondary" onClick={() => navigate('/concept')}>
            Read The Concept
          </Button>
        </div>
      </Section>

      {/* Footer spacer */}
      <div className="h-24" />
    </motion.div>
  )
}
