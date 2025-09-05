import React, { useState } from 'react'
import Hero from '../components/Hero'
import SafeIcon from '../common/SafeIcon'
import AddressAutocomplete from '../common/AddressAutocomplete'
import { IMAGES, getGalleryImage } from '../config/images'
import ImageWithFallback from '../components/ImageWithFallback'
import * as FiIcons from 'react-icons/fi'

const { FiX, FiChevronLeft, FiChevronRight, FiSend, FiPhone, FiCheck } = FiIcons

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    details: '',
    honeypot: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'bathroom', name: 'Bathroom Remodels' },
    { id: 'flooring', name: 'Flooring Projects' },
    { id: 'furniture', name: 'Furniture Assembly' },
    { id: 'other', name: 'We Do More' }
  ]

  const galleryItems = [
    // Bathroom Remodels
    {
      id: 1,
      category: 'bathroom',
      image: getGalleryImage('bathroom', 1),
      title: 'Complete bathroom renovation with custom tile work and walk-in shower',
      description: 'Modern bathroom transformation with premium fixtures'
    },
    {
      id: 2,
      category: 'bathroom',
      image: getGalleryImage('bathroom', 2),
      title: 'Custom bathroom vanity installation',
      description: 'Beautiful vanity with integrated storage solutions'
    },
    {
      id: 3,
      category: 'bathroom',
      image: getGalleryImage('bathroom', 3),
      title: 'Small bathroom renovation with space-saving fixtures',
      description: 'Maximizing space in compact bathroom design'
    },
    // Flooring Projects
    {
      id: 4,
      category: 'flooring',
      image: getGalleryImage('flooring', 1),
      title: 'Hardwood flooring installation in living room',
      description: 'Premium hardwood floors with professional installation'
    },
    {
      id: 5,
      category: 'flooring',
      image: getGalleryImage('flooring', 2),
      title: 'Custom tile flooring installation in kitchen',
      description: 'Elegant tile work with precise installation'
    },
    {
      id: 6,
      category: 'flooring',
      image: getGalleryImage('flooring', 3),
      title: 'Luxury vinyl plank flooring installation in dining room',
      description: 'Durable and beautiful LVP flooring solution'
    },
    // Furniture Assembly
    {
      id: 7,
      category: 'furniture',
      image: getGalleryImage('furniture', 1),
      title: 'Professional assembly of complex office furniture',
      description: 'Complete office setup with ergonomic furniture'
    },
    {
      id: 8,
      category: 'furniture',
      image: getGalleryImage('furniture', 2),
      title: 'Complete living room furniture assembly and setup',
      description: 'Full living room furniture installation'
    },
    {
      id: 9,
      category: 'furniture',
      image: getGalleryImage('furniture', 3),
      title: 'Bedroom furniture assembly including bed frame and dressers',
      description: 'Complete bedroom furniture setup'
    },
    // We Do More
    {
      id: 10,
      category: 'other',
      image: getGalleryImage('other', 1),
      title: 'Gutter cleaning and maintenance',
      description: 'Professional gutter cleaning service'
    },
    {
      id: 11,
      category: 'other',
      image: getGalleryImage('other', 2),
      title: 'Pressure washing deck restoration',
      description: 'Deck cleaning and restoration services'
    },
    {
      id: 12,
      category: 'other',
      image: getGalleryImage('other', 3),
      title: 'Door repair and refinishing',
      description: 'Professional door restoration and repair'
    }
  ]

  const filteredItems = selectedCategory === 'all' ? galleryItems : galleryItems.filter(item => item.category === selectedCategory)

  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    let newIndex
    if (direction === 'next') {
      newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1
    }
    setSelectedImage(filteredItems[newIndex])
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '')
    // Format as (###) ###-####
    if (phoneNumber.length >= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    } else if (phoneNumber.length >= 3) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return phoneNumber
    }
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData(prev => ({ ...prev, phone: formatted }))
    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    // Check honeypot
    if (formData.honeypot) {
      errors.general = 'Spam detected'
      return errors
    }
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!phoneDigits) {
      errors.phone = 'Phone number is required'
    } else if (phoneDigits.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit phone number'
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setIsSubmitting(true)
    try {
      const submissionData = {
        ...formData,
        source_page: 'Gallery',
        timestamp: new Date().toISOString()
      }
      // In a real implementation, you would send this to your form handler
      console.log('Form submission:', submissionData)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          address: '',
          phone: '',
          email: '',
          details: '',
          honeypot: ''
        })
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setFormErrors({ general: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white">
      <Hero
        title="Our Work Gallery"
        description="Take a look at some of our recent projects and see the quality craftsmanship we bring to every job."
        showCTA={false}
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-soft'
                    : 'bg-white text-primary-600 border border-primary-200 hover:bg-primary-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden hover:shadow-soft-lg transition-all duration-300 cursor-pointer group"
                onClick={() => openLightbox(item)}
              >
                <div className="relative w-full pb-[75%] overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
                Ready for your ideas to come true?
              </h2>
              <h4 className="text-xl lg:text-2xl text-primary-600 mb-6">
                We're here to start working on them today!
              </h4>
              <p className="text-lg text-primary-700">
                Tell us a bit about your project and we'll reach out shortly.
              </p>
            </div>
            {/* Right Column - Contact Form */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200 w-full max-w-sm">
                {isSubmitted ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Thanks! We've received your request.
                    </h3>
                    <p className="text-green-600 text-sm mb-4">
                      We'll reach out within 2 business hours (Mon–Sat, 8:00 AM–6:00 PM). If you submitted after hours or on Sunday, we'll contact you the next business day.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                      <h4 className="text-green-800 font-semibold mb-3 text-center">
                        How to prepare for our call
                      </h4>
                      <p className="text-green-700 text-sm mb-2">
                        <strong>Text photos to: 980-316-7792</strong>
                      </p>
                      <p className="text-green-700 text-sm mb-2">
                        <strong>Send:</strong>
                      </p>
                      <ul className="text-green-700 text-xs space-y-1 ml-3">
                        <li>• A wide shot of the area we'll work on.</li>
                        <li>• 2–3 close-ups so we can see materials, edges, and shapes (wall/ceiling/object).</li>
                        <li>• A photo of the item to be installed or a product link.</li>
                        <li>• (Optional) One photo with a tape measure in frame for scale.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                    {/* Two-column grid for desktop/tablet */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Name */}
                      <div>
                        <label htmlFor="gallery-name" className="block text-xs font-medium text-primary-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="gallery-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Your full name"
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                        )}
                      </div>
                      {/* Phone */}
                      <div>
                        <label htmlFor="gallery-phone" className="block text-xs font-medium text-primary-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="gallery-phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          maxLength="14"
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="(555) 123-4567"
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                      {/* Email */}
                      <div>
                        <label htmlFor="gallery-email" className="block text-xs font-medium text-primary-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="gallery-email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="your.email@example.com"
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>
                      {/* Address */}
                      <div>
                        <label htmlFor="gallery-address" className="block text-xs font-medium text-primary-700 mb-1">
                          Address
                        </label>
                        <AddressAutocomplete
                          id="gallery-address"
                          value={formData.address}
                          onChange={(val) => setFormData(prev => ({ ...prev, address: val }))}
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                          placeholder="Street, City, State, ZIP"
                        />
                      </div>
                    </div>
                    {/* Details - Full width */}
                    <div>
                      <label htmlFor="gallery-details" className="block text-xs font-medium text-primary-700 mb-1">
                        Details of Project
                      </label>
                      <textarea
                        id="gallery-details"
                        name="details"
                        rows={5}
                        value={formData.details}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 resize-vertical"
                        placeholder="Describe your project in detail..."
                      />
                    </div>
                    {/* General Error */}
                    {formErrors.general && (
                      <div className="text-red-500 text-xs text-center">
                        {formErrors.general}
                      </div>
                    )}
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <SafeIcon icon={FiSend} className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                    </button>
                    {/* Secondary Call Link */}
                    <div className="text-center">
                      <a
                        href="tel:+19803167792"
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-all duration-180 text-sm"
                      >
                        <SafeIcon icon={FiPhone} className="w-3 h-3" />
                        <span>Call: 980‑316‑7792</span>
                      </a>
                    </div>
                    {/* Compliance Note */}
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      By submitting, you agree to receive updates related to your request. To opt out of texts, reply STOP to the number on our website.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 lg:py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready for Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your vision and turn it into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Contact Us
            </a>
            <a
              href="tel:980-316-7792"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Call for Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            <div className="bg-white p-6 rounded-b-lg">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-primary-600">
                {selectedImage.description}
              </p>
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
            >
              <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
            >
              <SafeIcon icon={FiChevronRight} className="w-6 h-6" />
            </button>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
            >
              <SafeIcon icon={FiX} className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery