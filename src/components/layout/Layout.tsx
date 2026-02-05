import { ReactNode } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import { ParticleField } from '../particles'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-void-deep flex flex-col">
      {/* Quantum Particle Field - The Signature Element */}
      <ParticleField />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main
        className="relative flex-grow"
        style={{ zIndex: 10 }}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
