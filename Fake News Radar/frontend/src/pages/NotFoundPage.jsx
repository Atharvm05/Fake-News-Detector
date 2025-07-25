import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFoundPage = () => {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 rounded-xl max-w-lg"
      >
        <div className="relative mb-6">
          <h1 className="text-8xl font-bold neon-text">404</h1>
          <div className="absolute inset-0 blur-xl opacity-50 bg-primary-500 rounded-full"></div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        
        <Link to="/" className="futuristic-button inline-block">
          Return Home
        </Link>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </div>
  )
}

export default NotFoundPage