import React from 'react'
import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About <span className="neon-text">Fake News Radar</span></h1>
          <p className="text-xl text-gray-300">
            Understanding our mission and technology
          </p>
        </motion.div>
        
        <div className="space-y-12">
          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              In today's digital age, misinformation spreads faster than ever before. Fake News Radar was created to help people make more informed decisions about the content they consume online.
            </p>
            <p className="text-gray-300">
              Our mission is to promote media literacy and critical thinking by providing an accessible tool that can quickly analyze news content and highlight potentially misleading information.
            </p>
          </motion.section>
          
          {/* Technology Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
            <p className="text-gray-300 mb-6">
              Fake News Radar uses state-of-the-art natural language processing and machine learning techniques to analyze news content.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 neon-text">Machine Learning Model</h3>
                <p className="text-gray-400 text-sm">
                  We use transformer-based models (BERT/DistilBERT) fine-tuned on large datasets of real and fake news articles to detect patterns associated with misinformation.
                </p>
              </div>
              
              <div className="glass-panel p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 neon-text-secondary">Training Data</h3>
                <p className="text-gray-400 text-sm">
                  Our models are trained on diverse datasets including FakeNewsNet and LIAR, containing thousands of verified and fact-checked articles across various topics and sources.
                </p>
              </div>
            </div>
          </motion.section>
          
          {/* How It Works Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center mr-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Content Analysis</h3>
                  <p className="text-gray-400">
                    When you submit content, our system breaks it down into smaller segments and analyzes each one using our trained model.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center mr-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Pattern Recognition</h3>
                  <p className="text-gray-400">
                    The model identifies patterns and linguistic features that are commonly associated with misleading or false information.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center mr-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Credibility Scoring</h3>
                  <p className="text-gray-400">
                    Based on the analysis, we generate an overall credibility score and highlight specific segments that may contain misleading information.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Limitations Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-4">Limitations</h2>
            <p className="text-gray-300 mb-4">
              While our system is designed to be as accurate as possible, it's important to understand its limitations:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>No AI system is 100% accurate - always use critical thinking</li>
              <li>The model may not catch all types of misinformation</li>
              <li>Context and nuance can sometimes be misinterpreted</li>
              <li>Satire or humor may be flagged as misleading</li>
              <li>The system works best with English-language content</li>
            </ul>
            
            <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg">
              <p className="text-gray-300 text-sm">
                <strong className="text-primary-400">Important Note:</strong> Fake News Radar is a tool to assist with media literacy, not a definitive fact-checker. Always verify important information with multiple reliable sources.
              </p>
            </div>
          </motion.section>
          

        </div>
      </div>
    </div>
  )
}



export default AboutPage