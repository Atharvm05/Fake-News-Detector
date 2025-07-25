import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { formatScore } from '../../utils/helpers'
import NoIssuesDetected from './NoIssuesDetected'

const HighlightedSegment = ({ segment, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      key={index} 
      className="glass-panel p-4 rounded-lg border border-red-500/30 mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-red-400">Potentially Misleading</span>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
          {formatScore(segment.confidence)} Confidence
        </span>
      </div>
      <p className="text-gray-300 highlight-misleading">{segment.text}</p>
      <p className="mt-2 text-xs text-gray-400">{segment.reason}</p>
    </motion.div>
  )
}

HighlightedSegment.propTypes = {
  segment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    confidence: PropTypes.number.isRequired,
    reason: PropTypes.string.isRequired,
    index: PropTypes.number
  }).isRequired,
  index: PropTypes.number.isRequired
}

const HighlightedSegments = ({ segments }) => {
  if (segments.length === 0) {
    return <NoIssuesDetected />
  }

  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Highlighted Segments</h3>
      <div className="space-y-4">
        {segments.map((segment, index) => (
          <HighlightedSegment key={index} segment={segment} index={index} />
        ))}
      </div>
    </div>
  )
}

HighlightedSegments.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      confidence: PropTypes.number.isRequired,
      reason: PropTypes.string.isRequired,
      index: PropTypes.number
    })
  ).isRequired
}

export default HighlightedSegments