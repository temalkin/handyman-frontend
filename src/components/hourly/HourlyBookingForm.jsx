import React, { useState, useEffect } from 'react';
import AddressAutocomplete from '../../common/AddressAutocomplete';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSend, FiUpload, FiX, FiMapPin, FiUser, FiPhone, FiMail } = FiIcons;

const HourlyBookingForm = ({ formData, onDataChange, onSubmit }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const hourlyPackages = [
    { id: '1hour', label: '1 hour', price: '$150', description: 'Quick fixes and small tasks' },
    { id: '4hours', label: '4 hours', price: '$390', description: 'Medium-sized projects', popular: true },
    { id: 'fullday', label: 'Full day (7.5 hours)', price: '$720', description: 'Larger projects and multiple tasks' }
  ];

  useEffect(() => {
    if (formSubmitted) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [formSubmitted]);

  const handleFileUpload = (files) => {
    const room = Math.max(0, 10 - (formData.hourlyPhotos?.length || 0));
    const newFiles = Array.from(files).slice(0, room);
    const fileObjects = newFiles.map(file => ({ file, name: file.name, size: file.size, url: URL.createObjectURL(file) }));
    onDataChange('hourlyPhotos', [...(formData.hourlyPhotos || []), ...fileObjects].slice(0, 10));
  };

  const removePhoto = (index) => {
    const newPhotos = (formData.hourlyPhotos || []).filter((_, i) => i !== index);
    onDataChange('hourlyPhotos', newPhotos);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragleave' || e.type === 'dragover') setDragActive(e.type !== 'dragleave');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit();
    setFormSubmitted(true);
  };

  const isFormValid = formData.hourlyPackage && formData.hourlyAddress && formData.hourlyFullName && formData.hourlyPhone && formData.hourlyEmail && formData.hourlyConsentToText;

  const formatPhoneNumber = (value) => {
    const digits = String(value || '').replace(/\D/g, '')
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    }
    return digits
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    onDataChange('hourlyPhone', formatted)
  }

  if (formSubmitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
          <SafeIcon icon={FiIcons.FiCheckCircle} className="w-24 h-24 text-green-500 mx-auto" />
        </motion.div>
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Hourly Request Submitted Successfully!</h2>
          <p className="text-xl text-gray-600 mb-2">Thank you, {formData.hourlyFullName}!</p>
          <p className="text-gray-600">We've received your hourly service request and will get back to you soon.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Hourly Service</h2>
        <p className="text-gray-600">Select a package and provide project details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800">Select an hourly package *</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hourlyPackages.map((pkg, index) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={`relative ${pkg.popular ? 'md:transform md:scale-105 md:z-10' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">POPULAR</div>
                )}
                <label className={`block p-5 border-2 rounded-xl transition-all cursor-pointer ${formData.hourlyPackage === pkg.id ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow'}`}>
                  <div className="flex items-start space-x-2">
                    <input type="radio" name="hourlyPackage" value={pkg.id} checked={formData.hourlyPackage === pkg.id} onChange={(e) => onDataChange('hourlyPackage', e.target.value)} className="mt-1" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-800">{pkg.label}</span>
                        <span className="text-lg font-bold text-blue-600">{pkg.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                    </div>
                  </div>
                </label>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="hourly-description" className="block text-lg font-semibold text-gray-800">Project description</label>
          <textarea id="hourly-description" placeholder="Describe what you need help with..." value={formData.hourlyDescription || ''} onChange={(e) => onDataChange('hourlyDescription', e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800">Upload photos (optional)</label>
          <p className="text-sm text-gray-600">Upload up to 10 photos to help us understand your project better</p>
          <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <SafeIcon icon={FiUpload} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600 mb-2">Drag & drop photos here, or click to select</p>
            <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e.target.files)} className="hidden" id="hourly-photo-upload" />
            <label htmlFor="hourly-photo-upload" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-500 transform hover:scale-105 transition ease-out duration-200">Choose Files</label>
          </div>
          {formData.hourlyPhotos?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.hourlyPhotos.map((photo, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
                  <img src={photo.url} alt={photo.name} className="w-full h-24 object-cover rounded-lg" />
                  <button type="button" onClick={() => removePhoto(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove photo">
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label htmlFor="hourly-address" className="block text-lg font-semibold text-gray-800">Project address *</label>
          <div className="relative">
            <SafeIcon icon={FiMapPin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <AddressAutocomplete id="hourly-address" value={formData.hourlyAddress || ''} onChange={(val) => onDataChange('hourlyAddress', val)} placeholder="Enter project address..." required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="space-y-6 border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
          <div className="space-y-2">
            <label htmlFor="hourly-full-name" className="block font-semibold text-gray-800">Your full name *</label>
            <div className="relative">
              <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input id="hourly-full-name" type="text" placeholder="Enter your full name" value={formData.hourlyFullName || ''} onChange={(e) => onDataChange('hourlyFullName', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="hourly-phone-number" className="block font-semibold text-gray-800">Phone number *</label>
            <div className="relative">
              <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="hourly-phone-number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(980) 316-7792"
                value={formData.hourlyPhone || ''}
                onChange={handlePhoneChange}
                maxLength={14}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="hourly-email-address" className="block font-semibold text-gray-800">Email address *</label>
            <div className="relative">
              <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input id="hourly-email-address" type="email" placeholder="your@email.com" value={formData.hourlyEmail || ''} onChange={(e) => onDataChange('hourlyEmail', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
          <div className="pt-2">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" checked={formData.hourlyConsentToText || false} onChange={(e) => onDataChange('hourlyConsentToText', e.target.checked)} className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
              <span className="text-gray-700">I agree to receive text messages from Handyman of South Charlotte. *</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={!isFormValid} className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold shadow-lg transition-colors ${isFormValid ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
            <span>Submit Hourly Request</span>
            <SafeIcon icon={FiSend} className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default HourlyBookingForm;


