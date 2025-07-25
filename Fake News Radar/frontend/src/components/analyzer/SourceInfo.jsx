import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const SourceInfo = ({ url, title, metadata }) => {
  if (!url) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
    >
      {title && (
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
      )}
      
      <p className="text-blue-400 mb-3">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {url}
        </a>
      </p>
      
      {metadata && (
        <div className="text-sm text-gray-300 grid grid-cols-1 md:grid-cols-3 gap-2">
          {metadata.published_date && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium mr-1">Published:</span> {metadata.published_date}
            </div>
          )}
          
          {metadata.author && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium mr-1">Author:</span> {metadata.author}
            </div>
          )}
          
          {metadata.source && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5z" />
              </svg>
              <span className="font-medium mr-1">Source:</span> {metadata.source}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

SourceInfo.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  metadata: PropTypes.shape({
    published_date: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string
  })
}

export default SourceInfo