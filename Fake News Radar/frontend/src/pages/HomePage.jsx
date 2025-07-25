import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomePage = () => {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="neon-text">AI-Powered</span> News Credibility Checker
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Analyze news content in seconds and identify potentially misleading information with our advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/analyzer" className="futuristic-button text-center">
                Try the Analyzer
              </Link>
              <Link to="/about" className="futuristic-button-outline text-center">
                Learn More
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
              <h3 className="text-xl font-semibold mb-4 neon-text">News Credibility Analysis</h3>
              
              <div className="space-y-4">
                <div className="glass-panel p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Sample Headline 1</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">93% Credible</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '93%' }}></div>
                  </div>
                </div>
                
                <div className="glass-panel p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Sample Headline 2</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">62% Credible</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                
                <div className="glass-panel p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Sample Headline 3</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">28% Credible</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-500/10 rounded-full filter blur-xl"></div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It <span className="neon-text">Works</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our AI-powered system analyzes news content using advanced machine learning techniques to determine credibility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            number="01"
            title="Input Content"
            description="Paste any news article, snippet, or URL into our analyzer."
            delay={0.1}
          />
          <FeatureCard 
            number="02"
            title="AI Analysis"
            description="Our model analyzes the content using advanced NLP techniques."
            delay={0.2}
          />
          <FeatureCard 
            number="03"
            title="Get Results"
            description="Receive a detailed credibility score with highlighted misleading content."
            delay={0.3}
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="glass-panel-highlight p-8 md:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-secondary-900/50"></div>
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to Analyze News Content?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Try our AI-powered news credibility checker now and make more informed decisions about the content you consume.
              </p>
              <Link to="/analyzer" className="futuristic-button inline-block">
                Start Analyzing
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ number, title, description, delay }) => {
  return (
    <motion.div 
      className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:shadow-neon transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      <span className="text-5xl font-bold text-primary-500/20">{number}</span>
      <h3 className="text-xl font-semibold mt-4 mb-2 group-hover:neon-text transition-all duration-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

export default HomePage