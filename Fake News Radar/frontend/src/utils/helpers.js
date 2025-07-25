/**
 * Helper functions for the Fake News Radar application
 */

/**
 * Format a credibility score as a percentage
 * @param {number} score - Score between 0 and 1
 * @returns {string} Formatted percentage
 */
export const formatScore = (score) => {
  return `${Math.round(score * 100)}%`
}

/**
 * Get the credibility category based on score
 * @param {number} score - Score between 0 and 1
 * @returns {string} Category label
 */
export const getCredibilityCategory = (score) => {
  if (score >= 0.7) return 'Credible'
  if (score >= 0.4) return 'Somewhat Credible'
  return 'Not Credible'
}

/**
 * Get appropriate text color class based on credibility score
 * @param {number} score - Score between 0 and 1
 * @returns {string} Tailwind CSS class for text color
 */
export const getScoreColor = (score) => {
  if (score >= 0.7) return 'text-green-400'
  if (score >= 0.4) return 'text-yellow-400'
  return 'text-red-400'
}

/**
 * Get appropriate background color class based on credibility score
 * @param {number} score - Score between 0 and 1
 * @returns {string} Tailwind CSS class for background
 */
export const getScoreBackground = (score) => {
  if (score >= 0.7) return 'bg-green-500/20'
  if (score >= 0.4) return 'bg-yellow-500/20'
  return 'bg-red-500/20'
}

/**
 * Get appropriate gradient color class based on credibility score
 * @param {number} score - Score between 0 and 1
 * @returns {string} Tailwind CSS class for gradient
 */
export const getScoreGradient = (score) => {
  if (score >= 0.7) return 'from-green-500 to-green-400'
  if (score >= 0.4) return 'from-yellow-500 to-yellow-400'
  return 'from-red-500 to-red-400'
}

/**
 * Validate a URL
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}