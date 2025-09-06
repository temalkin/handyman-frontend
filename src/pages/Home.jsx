import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CTAButtons from '../components/CTAButtons'
import GoogleReviewsCarousel from '../components/GoogleReviewsCarousel'
import SafeIcon from '../common/SafeIcon'
import AddressAutocomplete from '../common/AddressAutocomplete'
import ImageWithFallback from '../components/ImageWithFallback'
import { IMAGES, getImage } from '../config/images'
import * as FiIcons from 'react-icons/fi'
import { storeRequest } from '../common/BackendAPI'
import { sendTelegram } from '../common/BackendAPI'
import { buildTelegramMessage } from '../common/MessageFormatter'
import { sendSms } from '../common/BackendAPI'

const {
  FiUsers,
  FiClock,
  FiAward,
  FiZap,
  FiPhone,
  FiMail,
  FiSend,
  FiCheck,
  FiCamera,
  FiHelpCircle,
  FiArrowRight,
  FiStar,
  FiMapPin,
  FiShield,
  FiBolt
} = FiIcons

const Home = () => {
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
      // get or create session id for site forms
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
          source_page: 'Home',
          description: formData.details || ''
        }
      }

      const resp = await storeRequest(payload)

      // Fire-and-forget Telegram notification
      try {
        const formId = (resp && (resp.form_id || resp.request_id)) || ''
        const msg = buildTelegramMessage('New Contact (Home)', {
          Name: formData.name,
          Phone: formData.phone,
          Email: formData.email,
          Address: formData.address || '-',
          Details: formData.details || '-',
          FormID: formId
        })
        await sendTelegram(msg)
      } catch (_) {}

      // Fire-and-forget SMS confirmation to client
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
      // eslint-disable-next-line no-console
      console.error('Form submission error:', error)
      setFormErrors({ general: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: FiUsers,
      title: 'Local team, high accountability',
      description: 'Professional service with a personal touch for your home'
    },
    {
      icon: FiClock,
      title: '24/7 AI Assistant (Beta)',
      description: 'Call anytime - even 5 AM or midnight for booking'
    },
    {
      icon: FiAward,
      title: "15 Years' Experience",
      description: 'Experienced expertise you can trust'
    },
    {
      icon: FiZap,
      title: 'Fast Response',
      description: 'Quotes in minutes, not hours or days'
    }
  ]

  const services = [
    {
      name: 'Drywall Repair & Patching',
      description: 'Holes, cracks, popped screws, seam splits. We patch, blend texture, and paint to match so the repair disappears.',
      slug: 'drywall-repair-charlotte'
    },
    {
      name: 'After Water Damage — Drywall & Ceiling Restoration',
      description: 'Post-mitigation rebuild: replace insulation if needed, hang new drywall, tape, skim/texture, sand, prime, and paint for like-new finish.',
      slug: 'after-water-damage-drywall-restoration-charlotte'
    },
    {
      name: 'Interior Painting',
      description: 'Careful prep, crisp lines, correct sheen for kitchens, baths, halls, and bedrooms. Minimal disruption, great coverage.',
      slug: 'interior-painting-charlotte'
    },
    {
      name: 'Exterior Painting',
      description: 'Wash, scrape, sand, prime, and coat for Charlotte weather. Siding, trim, doors, shutters—durable curb appeal.',
      slug: 'exterior-painting-charlotte'
    },
    {
      name: 'TV Mount Installation',
      description: 'Stud-secure mounts, perfect height and angle, soundbar/shelf options, wire-conceal solutions available.',
      slug: 'tv-mount-installation-charlotte'
    },
    {
      name: 'LVP Floor Installation',
      description: 'Tough, water-resistant vinyl plank floors with proper subfloor prep, tight seams, clean transitions, and quarter-round.',
      slug: 'lvp-floor-installation-charlotte'
    }
  ]

  const trustBadges = [
    {
      icon: FiStar,
      label: '5-Star Reviews',
      color: IMAGES.badgeStar
    },
    {
      icon: FiMapPin,
      label: 'Top-Rated Locally',
      color: IMAGES.badgePin
    },
    {
      icon: FiShield,
      label: 'Professional & Insured',
      color: IMAGES.badgeShield
    },
    {
      icon: FiBolt,
      label: 'Urgent Repairs Available',
      color: IMAGES.badgeBolt
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section with Contact Form */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form - Shows first on mobile */}
            <div className="order-1 lg:order-2">
              <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200 sticky top-24 max-w-sm mx-auto lg:max-w-none">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-primary-800 mb-2">
                    Get Your Free Estimate
                  </h2>
                  <p className="text-primary-600 text-sm">
                    Tell us about your project and we'll get back to you quickly
                  </p>
                </div>

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
                        <label htmlFor="name" className="block text-xs font-medium text-primary-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
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
                        <label htmlFor="phone" className="block text-xs font-medium text-primary-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
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
                        <label htmlFor="email" className="block text-xs font-medium text-primary-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
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
                        <label htmlFor="address" className="block text-xs font-medium text-primary-700 mb-1">
                          Address
                        </label>
                        <AddressAutocomplete
                          id="address"
                          value={formData.address}
                          onChange={(val) => setFormData(prev => ({ ...prev, address: val }))}
                          placeholder="Street, City, State, ZIP"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="details" className="block text-xs font-medium text-primary-700 mb-1">
                        Details of Project
                      </label>
                      <textarea
                        id="details"
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

            {/* Hero Content - Shows second on mobile */}
            <div className="order-2 lg:order-1">
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-4xl lg:text-6xl font-bold text-primary-800 mb-6 animate-fadeInUp">
                  Trusted Handyman in South Charlotte & Ballantyne
                </h1>
                <p className="text-xl text-primary-600 mb-8 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  Professional handyman services with a personal touch. Fast response and first-time fixes that save you hours.
                </p>
              </div>

              <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white rounded-lg shadow-soft border border-gray-200 overflow-hidden">
                  <ImageWithFallback
                    src={getImage('home')}
                    alt="Happy homeowners welcoming a handyman inside a bright, modern home in South Charlotte"
                    className="w-full h-64 lg:h-80 object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={badge.label}
                className="flex items-center justify-center lg:justify-start space-x-3"
                aria-label={`${badge.label} badge`}
              >
                <SafeIcon 
                  icon={badge.icon} 
                  className="w-6 h-6 flex-shrink-0" 
                  style={{ color: badge.color }} 
                />
                <span className="text-primary-700 font-medium text-sm lg:text-base">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fast Booking System */}
      <section className="py-16 lg:py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
              Fast Booking System (AI Beta)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-soft border border-gray-100 animate-fadeInUp">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">
                Call Anytime
              </h3>
              <p className="text-primary-600 mb-6">
                Even at 5 AM or midnight. Our AI assistant (Beta – we're still improving quality) will take your info and book it.
              </p>
              <a
                href="tel:+19803167792"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-all duration-180"
              >
                <span style={{ whiteSpace: 'nowrap' }}>Call 980‑316‑7792</span>
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-soft border border-gray-100 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-semibold text-primary-800 mb-4">
                Contact Form
              </h3>
              <p className="text-primary-600 mb-6">
                Send your request any time through our online form.
              </p>
              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-all duration-180"
              >
                <span>Submit Request</span>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-soft border border-gray-100 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold text-primary-800 mb-4">
                Text Photos
              </h3>
              <p className="text-primary-600 mb-6">
                Send a task list and pictures—get a quote in minutes, not hours or days.
              </p>
              <a
                href="sms:+19803167792?body=Hi! I'd like a quote. Here are photos and details:"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-all duration-180"
              >
                <span>Text Us Now</span>
              </a>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-primary-700 font-medium">
              Simple services should be simple to access—anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="w-8 h-8" style={{ color: '#dc2626' }} />
                </div>
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 lg:py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
              Popular Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.name}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  to={`/${service.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block bg-white p-6 rounded-lg shadow-soft border border-gray-100 hover:shadow-soft-lg hover:bg-green-50 focus:bg-green-50 transition-all duration-180 group"
                >
                  <h3 className="text-lg font-semibold text-primary-800 group-hover:text-green-600 group-focus:text-green-600 transition-all duration-180 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-primary-600 text-sm">
                    {service.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 shadow-soft font-medium"
            >
              <span>View All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-8">
            Ready to Get Started?
          </h2>
          <CTAButtons className="justify-center" />
        </div>
      </section>

      {/* Mid-CTA Section: Gallery & FAQs */}
      <section className="pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
              Want to see our work—or have questions?
            </h2>
            <p className="text-lg text-primary-600">
              Explore real projects in our gallery, or browse quick answers in our FAQs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Link
              to="/gallery"
              onClick={() => window.scrollTo(0, 0)}
              aria-label="Open Gallery"
              className="group bg-white rounded-2xl shadow-soft border border-gray-100 p-8 text-center hover:shadow-soft-lg focus:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 group-focus:bg-green-100 transition-all duration-300">
                <SafeIcon icon={FiCamera} className="w-8 h-8 text-primary-600 group-hover:text-green-600 group-focus:text-green-600 transition-all duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3 group-hover:text-green-600 group-focus:text-green-600 transition-all duration-300">
                Check Our Gallery
              </h3>
              <p className="text-primary-600 mb-6 leading-relaxed">
                Browse real projects and before/after photos.
              </p>
              <div className="inline-flex items-center space-x-2 text-primary-600 group-hover:text-green-600 group-focus:text-green-600 font-medium transition-all duration-300">
                <span>View Gallery</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>

            <Link
              to="/faq"
              onClick={() => window.scrollTo(0, 0)}
              aria-label="Got Questions? See FAQs"
              className="group bg-white rounded-2xl shadow-soft border border-gray-100 p-8 text-center hover:shadow-soft-lg focus:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 group-focus:bg-green-100 transition-all duration-300">
                <SafeIcon icon={FiHelpCircle} className="w-8 h-8 text-primary-600 group-hover:text-green-600 group-focus:text-green-600 transition-all duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3 group-hover:text-green-600 group-focus:text-green-600 transition-all duration-300">
                Got Questions? See FAQs
              </h3>
              <p className="text-primary-600 mb-6 leading-relaxed">
                Quick answers about pricing, scheduling, and more.
              </p>
              <div className="inline-flex items-center space-x-2 text-primary-600 group-hover:text-green-600 group-focus:text-green-600 font-medium transition-all duration-300">
                <span>Browse FAQs</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Reviews Carousel */}
      <GoogleReviewsCarousel />

      {/* SEO Bottom Section */}
      <section id="seo-bottom" className="py-16 lg:py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-12">
            <div id="why-us">
              <h2 className="text-3xl font-bold text-primary-800 mb-8">Why Homeowners Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-primary-700">Local team, high accountability</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-primary-700">Clear scope and pricing—no surprises</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-primary-700">Respect for your home: floor protection and dust containment</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-primary-700">Fast scheduling windows and reliable communication</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-primary-700">Warranty on labor; manufacturer warranties honored on materials</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="process">
              <h2 className="text-3xl font-bold text-primary-800 mb-8">Our Simple Process</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">Text photos of the project for a same-day ballpark.</h3>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">On-site visit if needed to confirm final scope & price.</h3>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">Prep & protect: floors, furniture, dust control.</h3>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">Do the work right: follow specs, tidy site, clear updates.</h3>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">Finish & review: walkthrough, cleanup, warranty info.</h3>
                  </div>
                </div>
              </div>
            </div>

            <div id="pricing">
              <h2 className="text-3xl font-bold text-primary-800 mb-6">Transparent Pricing</h2>
              <p className="text-lg text-primary-700 leading-relaxed">
                Online quotes are ballpark based on photos; final pricing is confirmed after we see the space. You approve everything before we start.
              </p>
            </div>

            <div id="areas">
              <h2 className="text-3xl font-bold text-primary-800 mb-6">Service Areas</h2>
              <p className="text-lg text-primary-700 leading-relaxed">
                South Charlotte, Ballantyne, Blakeney, Pineville, Matthews, Mint Hill, Weddington, and nearby neighborhoods. Searching for handyman near me in these areas? We're local and ready to help.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-6">About Handyman of South Charlotte</h2>
              <p className="text-lg text-primary-700 leading-relaxed">
                We're a detail-first handyman service focused on precision craftsmanship, clear communication, and reliable scheduling. From small "patch the wall" repairs to full room repainting and LVP floors, we deliver work that blends in perfectly and lasts.
              </p>
            </div>

            <div id="faq">
              <h2 className="text-3xl font-bold text-primary-800 mb-8">FAQs</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">Do you handle water mitigation or leak detection?</h3>
                  <p className="text-primary-700 leading-relaxed">
                    No. A licensed mitigation/restoration company should locate the source, open the area, and fully dry it first. Once they clear the space, we handle the rebuild—insulation (if needed), drywall, taping, texture, prime, and paint.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">Can you match my texture and paint after the rebuild?</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Yes. We feather texture where needed and finish with the correct primer and sheen so the repair blends in.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">What do you need from the mitigation company before you start?</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Moisture clearance/"dry" confirmation and the area opened to sound material. Photos or scope notes help us quote faster.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">How quickly can you handle small drywall patches or a single-room rebuild?</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Many smaller jobs are scheduled within a few days. Text photos and we'll send a fast ballpark and earliest slot.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-gray-200">
              <CTAButtons className="justify-center" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Home