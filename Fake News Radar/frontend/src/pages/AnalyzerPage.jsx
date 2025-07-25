import React from 'react'
import { motion } from 'framer-motion'
import useNewsAnalyzer from '../hooks/useNewsAnalyzer'
import AnalyzerForm from '../components/analyzer/AnalyzerForm'
import AnalysisResults from '../components/analyzer/AnalysisResults'

const AnalyzerPage = () => {
  const {
    inputType,
    inputContent,
    url,
    isAnalyzing,
    result,
    error,
    handleInputTypeChange,
    handleContentChange,
    handleUrlChange,
    analyzeContent,
    getScoreColor,
    getScoreBackground,
    getScoreGradient
  } = useNewsAnalyzer()
  
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">News <span className="neon-text">Analyzer</span></h1>
          <p className="text-xl text-gray-300">
            Paste any news content or URL to analyze its credibility
          </p>
        </motion.div>
        
        <AnalyzerForm
          inputType={inputType}
          inputContent={inputContent}
          url={url}
          isAnalyzing={isAnalyzing}
          error={error}
          handleInputTypeChange={handleInputTypeChange}
          handleContentChange={handleContentChange}
          handleUrlChange={handleUrlChange}
          handleSubmit={(e) => {
            e.preventDefault()
            analyzeContent()
          }}
        />
        
        <AnalysisResults result={result} />
      </div>
    </div>
  )
}

export default AnalyzerPage