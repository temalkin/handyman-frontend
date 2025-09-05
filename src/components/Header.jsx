import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SafeIcon from '../common/SafeIcon'
import ImageWithFallback from './ImageWithFallback'
import { IMAGES } from '../config/images'
import * as FiIcons from 'react-icons/fi'

const { FiMenu, FiX, FiPhone, FiTool } = FiIcons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleLogoError = () => {
    setLogoError(true)
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Book', href: '/book' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQ', href: '/faq' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300 animate-slideDown ${isSticky ? 'shadow-soft backdrop-blur-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row - 3 Zone Flex Layout */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-4 lg:py-5">
          {/* Zone 1: Brand - Logo + Text as Single Link */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
              {/* Logo with fallback */}
              {!logoError ? (
                <ImageWithFallback
                  src={IMAGES.logo}
                  fallbackSrc={IMAGES.logoFallback}
                  alt="Handyman of South Charlotte Logo"
                  className="h-[30px] w-auto mr-3"
                  style={{ height: '30px', width: 'auto', marginRight: '12px' }}
                  onError={handleLogoError}
                />
              ) : (
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-3">
                  <SafeIcon icon={FiTool} className="w-5 h-5" />
                </div>
              )}
              {/* Company Name */}
              <span className="text-lg lg:text-2xl font-bold text-primary-800">
                Handyman of South Charlotte
              </span>
            </Link>
          </div>

          {/* Zone 2: Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`text-sm font-medium transition-colors duration-180 hover:text-green-500 focus:text-green-500 ${
                    location.pathname === item.href
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-primary-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Zone 3: Call Button (Desktop) */}
          <div className="hidden lg:flex">
            <a
              href="tel:+19803167792"
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 shadow-soft font-medium"
            >
              <SafeIcon icon={FiPhone} className="w-4 h-4" />
              <span className="whitespace-nowrap">980‑316‑7792</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-primary-600 hover:text-green-500 hover:bg-primary-50 focus:text-green-500 focus:bg-primary-50 transition-all duration-180"
          >
            <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>

          {/* Mobile Call Button - Wraps to Second Row */}
          <div className="flex lg:hidden w-full sm:w-auto order-last">
            <a
              href="tel:+19803167792"
              className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 shadow-soft font-medium w-full sm:w-auto"
            >
              <SafeIcon icon={FiPhone} className="w-4 h-4" />
              <span className="whitespace-nowrap">Call 980‑316‑7792</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white animate-slideDown">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    setIsOpen(false)
                    window.scrollTo(0, 0)
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-180 ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-primary-700 hover:text-green-500 hover:bg-primary-50 focus:text-green-500 focus:bg-primary-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </header>
  )
}

export default Header