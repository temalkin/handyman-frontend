import React from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiArrowLeft, FiArrowRight, FiCheck } = FiIcons

const ServiceGroupStep = ({ mainCategories, selectedGroups, onGroupsChange, onNext, onPrev, serviceData }) => {
  const [customText, setCustomText] = React.useState('')

  const toggleGroup = (groupId) => {
    const next = selectedGroups.includes(groupId)
      ? selectedGroups.filter(id => id !== groupId)
      : [...selectedGroups, groupId]
    onGroupsChange(next)
  }

  const addCustomService = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    const label = String(customText || '').trim()
    if (!label) return
    const id = `custom:${encodeURIComponent(label)}`
    if (selectedGroups.includes(id)) return
    onGroupsChange([...(selectedGroups || []), id])
    setCustomText('')
  }

  const removeCustom = (id) => {
    onGroupsChange((selectedGroups || []).filter(g => g !== id))
  }

  const getCategoryName = (categoryId) => {
    switch(categoryId) {
      case 'repairs': return 'Repairs'
      case 'installations': return 'Installations'
      case 'painting': return 'Painting & Finishing'
      case 'renovations': return 'Renovations'
      default: return categoryId
    }
  }

  const groupedServices = {}
  mainCategories.forEach(categoryId => {
    if (serviceData[categoryId]) {
      const categoryGroups = Object.keys(serviceData[categoryId])
      if (categoryGroups.length > 0) groupedServices[categoryId] = categoryGroups
    }
  })

  const canProceed = selectedGroups.length > 0

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Which specific services do you need?</h2>
        <p className="text-gray-600">Select all services that apply to your project</p>
      </div>
      {Object.entries(groupedServices).map(([categoryId, groups], categoryIndex) => (
        <div key={categoryId} className="space-y-4">
          <motion.h3 className="text-xl font-bold text-gray-700 border-b pb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: categoryIndex * 0.1 }}>
            {getCategoryName(categoryId)}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {groups.map((groupId, index) => {
              const isSelected = selectedGroups.includes(groupId)
              const displayName = serviceData[categoryId]?.[groupId]?.name || groupId
              return (
                <motion.button
                  key={groupId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleGroup(groupId)}
                  className={`no-hover-override p-4 rounded-lg border-2 text-left transition-all duration-300 ${isSelected ? 'border-gray-300 bg-gray-100 shadow-sm' : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                  aria-pressed={isSelected}
                  role="button"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-800">{displayName}</h4>
                    {isSelected && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gray-600"><SafeIcon icon={FiCheck} className="w-5 h-5" /></motion.div>)}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}
      {/* Custom service input */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Or add your service</label>
        <form onSubmit={addCustomService} className="flex gap-2">
          <input
            type="text"
            value={customText}
            onChange={(e)=> setCustomText(e.target.value)}
            placeholder="Describe the service..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Add</button>
        </form>
        {/* Show custom items */}
        {selectedGroups.some(id => id.startsWith('custom:')) && (
          <div className="flex flex-wrap gap-2">
            {selectedGroups.filter(id => id.startsWith('custom:')).map(id => {
              const label = decodeURIComponent(id.slice(7))
              return (
                <span key={id} className="inline-flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-800 px-3 py-1 rounded-full">
                  {label}
                  <button type="button" onClick={()=> removeCustom(id)} className="text-gray-500 hover:text-gray-700">
                    <SafeIcon icon={FiIcons.FiX} className="w-4 h-4" />
                  </button>
                </span>
              )
            })}
          </div>
        )}
      </div>
      <div className="flex justify-between pt-6">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPrev} className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
          <span>Back</span>
        </motion.button>
        {canProceed && (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onNext} className="flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors">
            <span>Continue</span>
            <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default ServiceGroupStep


