import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SafeIcon from '../common/SafeIcon'
import AddressAutocomplete from '../common/AddressAutocomplete'
import ImageWithFallback from '../components/ImageWithFallback'
import { IMAGES, getServiceImage } from '../config/images'
import * as FiIcons from 'react-icons/fi'
import { storeRequest, sendTelegram, sendSms } from '../common/BackendAPI'
import { buildTelegramMessage } from '../common/MessageFormatter'

const { FiSend, FiPhone, FiCheck } = FiIcons

const Services = () => {
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

  const services = [
    {
      name: 'Drywall Repair & Patching',
      description: 'Professional hole patching, crack repair, and texture matching throughout Charlotte.',
      slug: 'drywall-repair-charlotte',
      imageKey: 'drywallRepair'
    },
    {
      name: 'After Water Damage Restoration',
      description: 'Complete post-mitigation rebuild: insulation, drywall, texture, and paint.',
      slug: 'after-water-damage-drywall-restoration-charlotte',
      imageKey: 'waterDamage'
    },
    {
      name: 'Interior Painting',
      description: 'Expert wall painting with premium finishes and crisp, clean lines.',
      slug: 'interior-painting-charlotte',
      imageKey: 'interiorPainting'
    },
    {
      name: 'Exterior House Painting',
      description: 'Weather-resistant exterior painting for lasting curb appeal.',
      slug: 'exterior-painting-charlotte',
      imageKey: 'exteriorPainting'
    },
    {
      name: 'TV Mount Installation',
      description: 'Safe wall mounting with cable management and perfect viewing angles.',
      slug: 'tv-mount-installation-charlotte',
      imageKey: 'tvMount'
    },
    {
      name: 'LVP Floor Installation',
      description: 'Professional luxury vinyl plank flooring with expert preparation.',
      slug: 'lvp-floor-installation-charlotte',
      imageKey: 'lvpFlooring'
    },
    {
      name: 'Lighting Installation',
      description: 'Fixtures, chandeliers, recessed lights, dimmers — safe electrical work.',
      slug: 'services/lighting',
      imageKey: 'lighting'
    },
    {
      name: 'Smart Home Systems',
      description: 'Video doorbells, smart thermostats, cameras, locks, and automation.',
      slug: 'services/smart-home-systems',
      imageKey: 'smartHome'
    },
    {
      name: 'Pressure Washing',
      description: 'Driveways, siding, decks — restore curb appeal with safe cleaning.',
      slug: 'services/pressure-washing',
      imageKey: 'pressureWashing'
    },
    {
      name: 'Doors & Windows Installation',
      description: 'Interior/exterior doors, window replacement, hardware and sealing.',
      slug: 'services/doors-windows-installation',
      imageKey: 'doorsWindows'
    },
    {
      name: 'Window Treatments',
      description: 'Blinds, shades, curtain hardware — clean installs with proper anchoring.',
      slug: 'services/doors-windows-treatment',
      imageKey: 'windowTreatments'
    },
    {
      name: 'Custom Carpentry & Wood Repairs',
      description: 'Trim, framing, built-ins, cabinets, mantels, wood rot repair.',
      slug: 'services/carpentry-woodworking',
      imageKey: 'carpentry'
    },
    {
      name: 'Floor Installation',
      description: 'Floating floors, transitions, quarter-round — clean and durable results.',
      slug: 'services/floor-installation',
      imageKey: 'floorInstall'
    },
    {
      name: 'Garage Floor Epoxy',
      description: 'Durable, easy-to-clean epoxy coating for garage floors.',
      slug: 'services/garage-floor-epoxy',
      imageKey: 'garageEpoxy'
    },
    {
      name: 'Wainscoting & Accent Walls',
      description: 'Board & batten, shaker, picture-frame molding — paint-ready finish.',
      slug: 'services/wainscoting',
      imageKey: 'wainscoting'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '')
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
    if (formData.honeypot) {
      errors.general = 'Spam detected'
      return errors
    }
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!phoneDigits) {
      errors.phone = 'Phone number is required'
    } else if (phoneDigits.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit phone number'
    }
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
      // get or create session id
      let sessionId = ''
      try {
        const K = 'site_session_id'
        sessionId = localStorage.getItem(K) || ''
        if (!sessionId) {
          sessionId = `${Date.now()}-${Math.random().toString(36).slice(2)}`
          localStorage.setItem(K, sessionId)
        }
      } catch (_) {}

      const payload = {
        source: 'website',
        form_type: 'contact',
        session_id: sessionId || undefined,
        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        meta: {
          source_page: 'Services',
          description: formData.details || ''
        }
      }

      const resp = await storeRequest(payload)

      // Telegram notification (fire-and-forget)
      try {
        const formId = (resp && (resp.form_id || resp.request_id)) || ''
        const msg = buildTelegramMessage('New Contact (Services)', {
          Name: formData.name,
          Phone: formData.phone,
          Email: formData.email,
          Address: formData.address || '-',
          Details: formData.details || '-',
          FormID: formId
        })
        await sendTelegram(msg)
      } catch (_) {}

      // SMS confirmation to client (fire-and-forget)
      try {
        const normalizePhoneE164US = (value) => {
          const digits = String(value || '').replace(/\D/g, '')
          if (!digits) return ''
          if (digits.length === 10) return `+1${digits}`
          if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
          return digits.startsWith('+') ? digits : `+${digits}`
        }
        const to = normalizePhoneE164US(formData.phone)
        if (to) {
          const smsText = `Hi${formData.name ? ' ' + formData.name : ''}! Thanks for contacting Handyman of South Charlotte. We received your request and will reach out soon.`
          await sendSms({ to, text: smsText, subject: 'Contact Request' })
        }
      } catch (_) {}

      setIsSubmitted(true)
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
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Handyman Services Charlotte",
          "description": "Comprehensive handyman services in Charlotte including drywall repair, painting, TV mounting, flooring, and water damage restoration.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Handyman of South Charlotte"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Charlotte",
              "addressRegion": "NC"
            },
            {
              "@type": "Place",
              "name": "Ballantyne"
            },
            {
              "@type": "Place",
              "name": "South Charlotte"
            }
          ]
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Handyman Services Charlotte
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional handyman services for your Charlotte home. From small repairs to complete installations, we handle it all with expertise and care throughout South Charlotte, Ballantyne, and surrounding areas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden hover:shadow-soft-lg transition-all duration-300 group"
              >
                <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={getServiceImage(service.imageKey)}
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-primary-600 mb-4">
                    {service.description}
                  </p>
                  <div className="flex space-x-3">
                    <Link
                      to={`/${service.slug}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium"
                    >
                      Learn More
                    </Link>
                    <Link
                      to="/book"
                      onClick={() => window.scrollTo(0, 0)}
                      className="flex-1 border border-primary-600 text-primary-600 text-center py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white hover:border-green-500 focus:bg-green-500 focus:text-white focus:border-green-500 transition-all duration-180 font-medium"
                    >
                      Book
                    </Link>
                  </div>
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
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="services-name" className="block text-xs font-medium text-primary-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="services-name"
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
                      <div>
                        <label htmlFor="services-phone" className="block text-xs font-medium text-primary-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="services-phone"
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
                      <div>
                        <label htmlFor="services-email" className="block text-xs font-medium text-primary-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="services-email"
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
                      <div>
                        <label htmlFor="services-address" className="block text-xs font-medium text-primary-700 mb-1">
                          Address
                        </label>
                        <AddressAutocomplete
                          id="services-address"
                          value={formData.address}
                          onChange={(val) => setFormData(prev => ({ ...prev, address: val }))}
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                          placeholder="Street, City, State, ZIP"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="services-details" className="block text-xs font-medium text-primary-700 mb-1">
                        Details of Project
                      </label>
                      <textarea
                        id="services-details"
                        name="details"
                        rows={5}
                        value={formData.details}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 resize-vertical"
                        placeholder="Describe your project in detail..."
                      />
                    </div>
                    {formErrors.general && (
                      <div className="text-red-500 text-xs text-center">
                        {formErrors.general}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <SafeIcon icon={FiSend} className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                    </button>
                    <div className="text-center">
                      <a
                        href="tel:+19803167792"
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-all duration-180 text-sm"
                      >
                        <SafeIcon icon={FiPhone} className="w-3 h-3" />
                        <span>Call: 980‑316‑7792</span>
                      </a>
                    </div>
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
    </div>
  )
}

export default Services