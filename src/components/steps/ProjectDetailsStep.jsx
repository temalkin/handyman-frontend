import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiArrowLeft, FiArrowRight, FiUpload, FiX } = FiIcons

const ProjectDetailsStep = ({ formData, onDataChange, onNext, onPrev }) => {
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (files) => {
    const room = Math.max(0, 10 - (formData.photos?.length || 0))
    const newFiles = Array.from(files).slice(0, room)
    const fileObjects = newFiles.map(file => ({ file, name: file.name, size: file.size, url: URL.createObjectURL(file) }))
    onDataChange('photos', [...(formData.photos || []), ...fileObjects].slice(0, 10))
  }

  const removePhoto = (index) => {
    const newPhotos = (formData.photos || []).filter((_, i) => i !== index)
    onDataChange('photos', newPhotos)
  }

  const canProceed = !!formData.timeline

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Project Details</h2>
        <p className="text-gray-600">Help us understand your project better</p>
      </div>

      <div className="space-y-3">
        <label htmlFor="project-description" className="block text-lg font-semibold text-gray-800">Can you briefly describe the work?</label>
        <textarea id="project-description" placeholder="Tell us about your project, any specific requirements, or concerns..." value={formData.projectDescription || ''} onChange={(e) => onDataChange('projectDescription', e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-800">When do you want it done? *</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'this_week', label: 'This week', selectedColor: 'bg-red-50 border-red-200' },
            { id: 'next_week', label: 'Next week', selectedColor: 'bg-yellow-50 border-yellow-200' },
            { id: 'flexible', label: "I'm flexible", selectedColor: 'bg-blue-50 border-blue-200' }
          ].map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDataChange('timeline', option.id)}
              className={`no-hover-override p-4 rounded-xl border-2 text-center transition-all duration-300 ${formData.timeline === option.id ? option.selectedColor + ' shadow-lg' : 'bg-gray-50 border-gray-200 hover:shadow-md'}`}
              aria-pressed={formData.timeline === option.id}
              role="button"
            >
              <span className="text-lg font-semibold text-gray-800">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-800">Can you send us some photos?</label>
        <p className="text-sm text-gray-600">Upload up to 10 photos to help us understand your project better</p>
        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onDragEnter={(e)=>{e.preventDefault(); setDragActive(true)}} onDragLeave={(e)=>{e.preventDefault(); setDragActive(false)}} onDragOver={(e)=>{e.preventDefault();}} onDrop={(e)=>{e.preventDefault(); setDragActive(false); if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files)}}>
          <SafeIcon icon={FiUpload} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-2">Drag & drop photos here, or click to select</p>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e.target.files)} className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-500 transform hover:scale-105 transition ease-out duration-200">Choose Files</label>
        </div>
        {(formData.photos || []).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {formData.photos.map((photo, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
                <img src={photo.url} alt={photo.name} className="w-full h-24 object-cover rounded-lg" />
                <button onClick={() => removePhoto(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove photo">
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
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

export default ProjectDetailsStep


