import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import LoadingSpinner from '../ui/LoadingSpinner'

const AnalyzerForm = ({
  inputType,
  inputContent,
  url,
  isAnalyzing,
  error,
  handleInputTypeChange,
  handleContentChange,
  handleUrlChange,
  handleSubmit
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-panel p-6 md:p-8 rounded-xl mb-8"
    >
      <div className="flex mb-6">
        <button
          type="button"
          className={`flex-1 py-3 px-4 rounded-l-lg transition-all ${inputType === 'text' ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
          onClick={() => handleInputTypeChange('text')}
        >
          Text Input
        </button>
        <button
          type="button"
          className={`flex-1 py-3 px-4 rounded-r-lg transition-all ${inputType === 'url' ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
          onClick={() => handleInputTypeChange('url')}
        >
          URL Input
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {inputType === 'text' ? (
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-300 mb-2">Paste news content</label>
            <textarea
              id="content"
              className="futuristic-input h-40"
              placeholder="Paste the news article or snippet here..."
              value={inputContent}
              onChange={handleContentChange}
            ></textarea>
          </div>
        ) : (
          <div className="mb-6">
            <label htmlFor="url" className="block text-gray-300 mb-2">Enter news URL</label>
            <input
              type="url"
              id="url"
              className="futuristic-input"
              placeholder="https://example.com/news-article"
              value={url}
              onChange={handleUrlChange}
            />
          </div>
        )}
        
        <button
          type="submit"
          className="futuristic-button w-full flex items-center justify-center"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <LoadingSpinner className="-ml-1 mr-3" />
              Analyzing...
            </>
          ) : 'Analyze Content'}
        </button>
      </form>
      
      {error && (
        <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}
    </motion.div>
  )
}

AnalyzerForm.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputContent: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isAnalyzing: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleInputTypeChange: PropTypes.func.isRequired,
  handleContentChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default AnalyzerForm