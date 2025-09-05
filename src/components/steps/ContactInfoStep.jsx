import React from 'react'
import AddressAutocomplete from '../../common/AddressAutocomplete'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiArrowLeft, FiUser, FiPhone, FiMail, FiSend, FiMapPin } = FiIcons

const ContactInfoStep = ({ formData, onDataChange, onSubmit, onPrev }) => {
  const canSubmit = formData.fullName && formData.phone && formData.email && formData.address && formData.consentToText

  const handleSubmit = (e) => {
    e.preventDefault()
    if (canSubmit) onSubmit()
  }

  const formatPhoneNumber = (value) => {
    const digits = String(value || '').replace(/\D/g, '')
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    }
    return digits
  }

  const normalizePhoneE164US = (value) => {
    const digits = String(value || '').replace(/\D/g, '')
    if (!digits) return ''
    if (digits.length === 10) return `+1${digits}`
    if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
    return digits.startsWith('+') ? digits : `+${digits}`
  }

  const handlePhoneChange = (e) => {
    const raw = e.target.value
    const formatted = formatPhoneNumber(raw)
    const normalized = normalizePhoneE164US(raw)
    onDataChange('phone', formatted)
    onDataChange('phoneNormalized', normalized)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Information</h2>
        <p className="text-gray-600">We'll use this information to get in touch with you</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="project-address" className="block text-lg font-semibold text-gray-800">Project Address *</label>
          <div className="relative">
            <SafeIcon icon={FiMapPin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <AddressAutocomplete id="project-address" value={formData.address || ''} onChange={(val) => onDataChange('address', val)} placeholder="Enter project address..." required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="full-name" className="block text-lg font-semibold text-gray-800">Contact Name *</label>
          <div className="relative">
            <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input id="full-name" type="text" placeholder="Enter your full name" value={formData.fullName || ''} onChange={(e) => onDataChange('fullName', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="phone-number" className="block text-lg font-semibold text-gray-800">Phone Number *</label>
          <div className="relative">
            <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="phone-number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(980) 316-7792"
              value={formData.phone || ''}
              onChange={handlePhoneChange}
              maxLength={14}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email-address" className="block text-lg font-semibold text-gray-800">Email Address *</label>
          <div className="relative">
            <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input id="email-address" type="email" placeholder="your@email.com" value={formData.email || ''} onChange={(e) => onDataChange('email', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div className="pt-2">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input type="checkbox" checked={formData.consentToText || false} onChange={(e) => onDataChange('consentToText', e.target.checked)} className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
            <span className="text-gray-700">I agree to receive text messages from Handyman of South Charlotte. *</span>
          </label>
        </div>
        <div className="flex justify-between pt-6">
          <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPrev} className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back</span>
          </motion.button>
          {canSubmit && (
            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-primary-600 focus:bg-primary-600 transition-colors">
              <span>Submit Request</span>
              <SafeIcon icon={FiSend} className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ContactInfoStep


