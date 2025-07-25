import React from 'react'

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary-500/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-primary-700/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Radar pulse effect */}
      <div className="absolute bottom-10 right-10 flex items-center justify-center">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping"></div>
          <div className="absolute inset-0 bg-primary-400 rounded-full"></div>
        </div>
        <div className="radar-pulse w-16 h-16 animate-pulse-radar"></div>
        <div className="radar-pulse w-32 h-32 animate-pulse-radar" style={{ animationDelay: '1s' }}></div>
        <div className="radar-pulse w-48 h-48 animate-pulse-radar" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
    </div>
  )
}

export default BackgroundEffects