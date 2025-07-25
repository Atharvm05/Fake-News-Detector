import axios from 'axios'

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// API service functions
const apiService = {
  // Analyze text content
  analyzeContent: async (content) => {
    try {
      const response = await api.post('/analyze/content', { content })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // Analyze URL
  analyzeUrl: async (url) => {
    try {
      const response = await api.post('/analyze/url', { url })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // Get model information
  getModelInfo: async () => {
    try {
      const response = await api.get('/model/info')
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

// Error handler helper
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const serverError = error.response.data.detail || 'Server error occurred'
    return new Error(serverError)
  } else if (error.request) {
    // The request was made but no response was received
    return new Error('No response from server. Please check your connection.')
  } else {
    // Something happened in setting up the request that triggered an Error
    return new Error('Error setting up request: ' + error.message)
  }
}

export default apiService