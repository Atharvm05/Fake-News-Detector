import { useState } from 'react'
import apiService from '../services/api'
import { getScoreColor, getScoreBackground, getScoreGradient, isValidUrl } from '../utils/helpers'

// Custom hook for news analysis functionality
const useNewsAnalyzer = () => {
  const [inputType, setInputType] = useState('text') // 'text' or 'url'
  const [inputContent, setInputContent] = useState('')
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Change input type (text or URL)
  const handleInputTypeChange = (type) => {
    setInputType(type)
    setResult(null)
    setError(null)
  }

  // Handle content input change
  const handleContentChange = (e) => {
    setInputContent(e.target.value)
    setResult(null)
    setError(null)
  }

  // Handle URL input change
  const handleUrlChange = (e) => {
    setUrl(e.target.value)
    setResult(null)
    setError(null)
  }

  // Submit for analysis
  const analyzeContent = async () => {
    setError(null)
    setResult(null)
    setIsAnalyzing(true)

    try {
      let analysisResult

      if (inputType === 'text') {
        if (!inputContent.trim()) {
          throw new Error('Please enter some text to analyze')
        }
        // Call the real API service
        analysisResult = await apiService.analyzeContent(inputContent)
      } else {
        if (!url.trim()) {
          throw new Error('Please enter a URL to analyze')
        }
        if (!isValidUrl(url)) {
          throw new Error('Please enter a valid URL')
        }
        // Call the real API service
        analysisResult = await apiService.analyzeUrl(url)
      }

      // Process the result before setting it
      setResult(processAnalysisResult(analysisResult))
    } catch (err) {
      setError(err.message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Helper function to handle analysis results
  const processAnalysisResult = (result) => {
    // Any additional processing of the result can be done here
    return result
  }

  // Helper functions are now imported from utils/helpers.js

  return {
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
  }
}

export default useNewsAnalyzer