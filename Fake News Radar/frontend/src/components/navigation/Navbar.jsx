import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 glass-panel backdrop-blur-lg bg-dark-900/80' : 'py-4 bg-transparent'}`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">FR</span>
                <div className="absolute inset-0 rounded-full border-2 border-primary-400 animate-ping opacity-75"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold neon-text">Fake News Radar</h1>
              <p className="text-xs text-gray-400">AI-Powered Credibility Checker</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <NavItem to="/" label="Home" />
            <NavItem to="/analyzer" label="Analyzer" />
            <NavItem to="/about" label="About" />
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <ul className="flex flex-col space-y-4">
              <MobileNavItem to="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavItem to="/analyzer" label="Analyzer" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavItem to="/about" label="About" onClick={() => setIsMobileMenuOpen(false)} />
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  )
}

// Desktop NavItem component
const NavItem = ({ to, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'text-primary-400 font-medium relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:rounded-full'
            : 'text-gray-300 hover:text-white transition-colors duration-300'
        }
      >
        {label}
      </NavLink>
    </li>
  )
}

// Mobile NavItem component
const MobileNavItem = ({ to, label, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'block text-primary-400 font-medium'
            : 'block text-gray-300 hover:text-white transition-colors duration-300'
        }
        onClick={onClick}
      >
        {label}
      </NavLink>
    </li>
  )
}

export default Navbar