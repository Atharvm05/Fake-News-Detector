import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const NoIssuesDetected = ({ message = "Our analysis didn't find any potentially misleading content." }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30"
    >
      <svg 
        className="w-12 h-12 text-green-400 mx-auto mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h3 className="text-xl font-medium text-green-400 mb-2">No Issues Detected</h3>
      <p className="text-gray-300">{message}</p>
    </motion.div>
  )
}

NoIssuesDetected.propTypes = {
  message: PropTypes.string
}

export default NoIssuesDetected