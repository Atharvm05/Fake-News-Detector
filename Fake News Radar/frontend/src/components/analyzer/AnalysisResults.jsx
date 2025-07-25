import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import CredibilityScore from './CredibilityScore'
import HighlightedSegments from './HighlightedSegments'
import SourceInfo from './SourceInfo'

const AnalysisResults = ({ result }) => {
  if (!result) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 md:p-8 rounded-xl"
    >
      <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>
      
      {/* Source information when available */}
      <SourceInfo 
        url={result.url} 
        title={result.title} 
        metadata={result.source_metadata} 
      />
      
      <CredibilityScore score={result.score} />
      
      <HighlightedSegments segments={result.highlighted_segments} />
    </motion.div>
  )
}

AnalysisResults.propTypes = {
  result: PropTypes.shape({
    score: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    highlighted_segments: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        confidence: PropTypes.number.isRequired,
        reason: PropTypes.string.isRequired,
        index: PropTypes.number
      })
    ).isRequired,
    // New fields from enhanced API response
    url: PropTypes.string,
    title: PropTypes.string,
    source_metadata: PropTypes.shape({
      published_date: PropTypes.string,
      author: PropTypes.string,
      source: PropTypes.string
    })
  })
}

export default AnalysisResults