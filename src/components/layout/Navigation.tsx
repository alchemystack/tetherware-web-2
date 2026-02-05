import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { cn } from '../../lib/utils'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'The Concept', href: '/concept' },
  { label: 'Explore', href: '/explore' },
  { label: 'About', href: '/about' },
]

export default function Navigation() {
  const { isScrolled } = useScrollPosition(60)
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-[150] transition-all duration-300',
        isScrolled
          ? 'bg-void-deep/80 backdrop-blur-md border-b border-void-elevated/50'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="relative group focus-visible:outline-none"
          >
            <span className="font-display text-xl md:text-2xl tracking-tight text-text-primary transition-colors duration-200 group-hover:text-cyan group-focus-visible:text-cyan">
              TETHERWARE
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <li key={item.href} className="group">
                  <Link
                    to={item.href}
                    className={cn(
                      'relative py-2 text-sm tracking-wide transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:text-cyan',
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {item.label}
                    {/* Underline indicator - active state or hover animation */}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-0 h-[1px] bg-cyan transition-all duration-300',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={cn(
              'md:hidden relative w-11 h-11 flex items-center justify-center',
              'text-text-secondary hover:text-text-primary transition-colors duration-200',
              'focus-visible:outline-none focus-visible:text-cyan'
            )}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={cn(
                  'w-full h-[1.5px] bg-current transition-all duration-300 origin-left',
                  isMobileMenuOpen && 'rotate-45 translate-y-[0.5px]'
                )}
              />
              <span
                className={cn(
                  'w-full h-[1.5px] bg-current transition-all duration-300',
                  isMobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'w-full h-[1.5px] bg-current transition-all duration-300 origin-left',
                  isMobileMenuOpen && '-rotate-45 -translate-y-[0.5px]'
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-void-deep/95 backdrop-blur-lg border-b border-void-elevated/50 overflow-hidden"
          >
            <ul className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.href
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'block py-3 text-lg tracking-wide transition-colors duration-200',
                        'focus-visible:outline-none focus-visible:text-cyan',
                        isActive
                          ? 'text-cyan'
                          : 'text-text-secondary hover:text-text-primary'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
