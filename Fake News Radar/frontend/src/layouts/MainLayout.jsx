import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/navigation/Footer'
import BackgroundEffects from '../components/ui/BackgroundEffects'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background effects */}
      <BackgroundEffects />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout