import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge, Heading, Section, Input } from '../components/ui'

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

// Core principles data
const principles = [
  {
    title: 'Empirical Rigor',
    description:
      'We test hypotheses through controlled experiments, publish negative results, and maintain skepticism about our own conclusions until evidence accumulates.',
  },
  {
    title: 'Open Collaboration',
    description:
      'Research gains value when shared. We release findings, datasets, and tools openly so the broader safety community can verify, critique, and build upon our work.',
  },
  {
    title: 'Practical Impact',
    description:
      'Theory serves practice. We prioritize research directions that could translate into deployable safety measures, not just interesting academic questions.',
  },
]

// Team members (realistic placeholder names)
const team = [
  {
    name: 'Dr. Elena Vasquez',
    role: 'Research Director',
    focus: 'Quantum information theory, AI alignment',
    badge: 'Leadership',
    badgeVariant: 'forest' as const,
  },
  {
    name: 'Marcus Chen',
    role: 'Senior Research Scientist',
    focus: 'Machine learning security, adversarial robustness',
    badge: 'Research',
    badgeVariant: 'cyan' as const,
  },
  {
    name: 'Dr. Amara Okonkwo',
    role: 'Quantum Systems Engineer',
    focus: 'QRNG integration, experimental physics',
    badge: 'Engineering',
    badgeVariant: 'outline' as const,
  },
  {
    name: 'James Whitmore',
    role: 'Research Engineer',
    focus: 'ML infrastructure, open-source tooling',
    badge: 'Engineering',
    badgeVariant: 'outline' as const,
  },
]

// Form state type
interface FormState {
  email: string
  message: string
  submitted: boolean
  error: string | null
}

export default function About() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState<FormState>({
    email: '',
    message: '',
    submitted: false,
    error: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Reset error state
    setFormState((prev) => ({ ...prev, error: null }))

    // Validate email
    if (!formState.email.trim()) {
      setFormState((prev) => ({ ...prev, error: 'Email is required' }))
      return
    }

    if (!validateEmail(formState.email)) {
      setFormState((prev) => ({
        ...prev,
        error: 'Please enter a valid email address',
      }))
      return
    }

    // Simulate form submission
    setIsSubmitting(true)

    // In production, this would send data to a server
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setFormState({
      email: '',
      message: '',
      submitted: true,
      error: null,
    })
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
              Our Mission
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading level={1} animate className="mb-6">
              About Tetherware
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-body text-text-secondary max-w-3xl leading-relaxed"
          >
            We are an independent research organization investigating whether
            quantum randomness can contribute to AI safety. Our work sits at the
            intersection of quantum physics, machine learning, and alignment
            research.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <Section reveal className="bg-void-surface/20">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          What Drives Us
        </p>
        <Heading level={2} className="mb-8">
          Our Mission
        </Heading>
        <div className="space-y-6 text-text-secondary text-body leading-relaxed max-w-3xl">
          <p>
            The alignment problem—ensuring advanced AI systems remain beneficial
            and controllable—may be the most important technical challenge of our
            time. Most approaches focus on training objectives, interpretability, or
            formal verification. We explore a complementary angle: leveraging
            fundamental physics.
          </p>
          <p>
            Quantum mechanics guarantees true unpredictability at the physical
            level. We investigate whether this property can create AI systems that
            resist manipulation, prevent reward hacking, and enable robust
            verification protocols. This is speculative research, but the potential
            payoff justifies exploration.
          </p>
          <p>
            We don't claim to have solved alignment. We're testing a hypothesis:
            that quantum randomness might be a useful tool in the safety
            researcher's toolkit. If our investigations prove fruitful, we'll share
            everything we learn.
          </p>
        </div>
      </Section>

      {/* Core Principles */}
      <Section reveal className="py-[var(--space-9)] lg:py-[var(--space-10)]">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          How We Work
        </p>
        <Heading level={2} className="mb-12">
          Core Principles
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
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
                <h3 className="font-body text-lg font-medium text-text-primary mb-3">
                  {principle.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {principle.description}
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

      {/* Team Section */}
      <Section reveal className="py-[var(--space-9)] lg:py-[var(--space-10)]">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          The People
        </p>
        <Heading level={2} className="mb-6">
          Our Team
        </Heading>
        <p className="text-text-secondary text-body leading-relaxed max-w-3xl mb-12">
          A small team with deep expertise in quantum physics, machine learning, and
          systems engineering. We value intellectual honesty and technical rigor
          over credentials and affiliations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card variant="glass" className="h-full">
                <Badge variant={member.badgeVariant} className="mb-3">
                  {member.badge}
                </Badge>
                <h3 className="font-body text-lg font-medium text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-cyan text-sm mb-3">{member.role}</p>
                <p className="text-text-tertiary text-sm">{member.focus}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section reveal className="bg-void-surface/20">
        <p className="text-text-tertiary text-sm uppercase tracking-wider mb-6">
          Get In Touch
        </p>
        <Heading level={2} className="mb-6">
          Contact Us
        </Heading>
        <p className="text-text-secondary text-body leading-relaxed max-w-3xl mb-10">
          Interested in collaboration, have questions about our research, or want
          to stay updated on our progress? Reach out—we're always interested in
          connecting with researchers and organizations working on AI safety.
        </p>

        <div className="max-w-md">
          {formState.submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-forest/10 border border-forest-bright/30 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-5 h-5 text-forest-bright"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium text-text-primary">
                  Message sent
                </span>
              </div>
              <p className="text-text-secondary text-sm">
                Thanks for reaching out. We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() =>
                  setFormState({
                    email: '',
                    message: '',
                    submitted: false,
                    error: null,
                  })
                }
                className="text-cyan text-sm mt-4 hover:underline focus-visible:outline-none focus-visible:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    email: e.target.value,
                    error: null,
                  }))
                }
                error={formState.error || undefined}
                disabled={isSubmitting}
              />

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-text-secondary"
                >
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="How can we help?"
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, message: e.target.value }))
                  }
                  disabled={isSubmitting}
                  className="
                    w-full rounded-lg px-4 py-3
                    bg-void-surface
                    border border-void-elevated
                    text-text-primary
                    placeholder:text-text-tertiary
                    transition-all duration-200 ease-out
                    outline-none
                    min-h-[120px]
                    resize-y
                    hover:border-void-elevated/80
                    focus:border-cyan
                    focus:shadow-glow-cyan
                    disabled:border-void-elevated/50
                    disabled:bg-void-deep
                    disabled:text-text-tertiary
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>

              <Button
                variant="primary"
                onClick={() => {}} // Form submission handled by onSubmit
                loading={isSubmitting}
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
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                }
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
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
          Browse our papers, experiments, and open-source tools. See the work
          we're doing to understand quantum randomness in AI safety.
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
            View Research
          </Button>
          <Button variant="secondary" onClick={() => navigate('/concept')}>
            The Concept
          </Button>
        </div>
      </Section>

      {/* Footer spacer */}
      <div className="h-24" />
    </motion.div>
  )
}
