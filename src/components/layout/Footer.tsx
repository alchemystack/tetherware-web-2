import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const footerLinks = [
  { label: 'The Concept', href: '/concept' },
  { label: 'Explore', href: '/explore' },
  { label: 'About', href: '/about' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-10 border-t border-void-elevated/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="py-12 md:py-16">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Logo and tagline */}
            <div className="space-y-3">
              <Link
                to="/"
                className="inline-block font-display text-xl tracking-tight text-text-primary hover:text-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:text-cyan"
              >
                TETHERWARE
              </Link>
              <p className="text-text-tertiary text-sm max-w-xs">
                Exploring quantum randomness in AI safety and alignment.
              </p>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-wrap gap-6 md:gap-8">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:text-cyan"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-void-elevated to-transparent" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-text-tertiary text-xs">
            <p>&copy; {currentYear} Tetherware. All rights reserved.</p>
            <p className="text-text-tertiary/60">
              Research for beneficial AI.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
