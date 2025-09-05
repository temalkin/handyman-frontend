import React from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'

const { FiList, FiClock, FiMessageSquare } = FiIcons

const FormToggle = ({ formType, onFormTypeChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-100 p-1 rounded-xl flex flex-wrap justify-center">
        <ToggleButton 
          isActive={formType === 'scope'}
          onClick={() => onFormTypeChange('scope')}
          icon={FiList}
          text="Order by Scope"
        />
        <ToggleButton 
          isActive={formType === 'hourly'}
          onClick={() => onFormTypeChange('hourly')}
          icon={FiClock}
          text="Hourly Order"
        />
        <ToggleButton 
          isActive={formType === 'ai'}
          onClick={() => onFormTypeChange('ai')}
          icon={FiMessageSquare}
          text="AI Assistant Order"
        />
      </div>
    </div>
  )
}

const ToggleButton = ({ isActive, onClick, icon, text }) => {
  return (
    <motion.button
      whileHover={{ scale: isActive ? 1 : 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative px-4 py-3 m-1 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 flex items-center space-x-2 ${
        isActive
          ? 'bg-primary-600 text-white hover:bg-primary-600 hover:text-white focus:bg-primary-600 focus:text-white shadow-soft'
          : 'bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 hover:text-primary-700'
      }`}
    >
      <SafeIcon icon={icon} className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="relative z-10">{text}</span>
    </motion.button>
  )
}

export default FormToggle


