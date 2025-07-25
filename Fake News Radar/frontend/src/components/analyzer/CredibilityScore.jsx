import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { formatScore, getCredibilityCategory, getScoreColor, getScoreBackground, getScoreGradient } from '../../utils/helpers'

const CredibilityScore = ({ score }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-medium">Credibility Score</span>
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBackground(score)} ${getScoreColor(score)}`}
        >
          {formatScore(score)} - {getCredibilityCategory(score)}
        </motion.span>
      </div>
      <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`bg-gradient-to-r ${getScoreGradient(score)} h-3 rounded-full`} 
        />
      </div>
    </div>
  )
}

CredibilityScore.propTypes = {
  score: PropTypes.number.isRequired
}

export default CredibilityScore