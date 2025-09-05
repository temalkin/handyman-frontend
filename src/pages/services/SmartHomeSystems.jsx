import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';


const { FiCheck, FiPhone, FiMessageSquare, FiWifi } = FiIcons;

const SmartHomeSystems = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const services = [
    'Video doorbell installation',
    'Smart thermostat setup',
    'Security camera installation',
    'Smart lock installation',
    'Smart switch installation',
    'Home automation setup'
  ];

  const benefits = [
    'Modern comfort at your fingertips',
    'Professional installation and setup',
    'Integration with existing systems'
  ];

  const smartDevices = [
    {
      device: 'Video Doorbells',
      description: 'See and speak with visitors from anywhere with professional installation'
    },
    {
      device: 'Smart Thermostats',
      description: 'Energy-efficient climate control with scheduling and remote access'
    },
    {
      device: 'Security Systems',
      description: 'Cameras, sensors, and monitoring for peace of mind'
    },
    {
      device: 'Smart Locks',
      description: 'Keyless entry with remote access and guest codes'
    }
  ];

  const galleryImages = (IMAGES.pageMedia?.smartHomeSystems?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Smart home system installation example ${idx + 1}`
  }));

  const pricingTiers = [
    {
      service: 'Video Doorbell',
      price: '$80 - $150',
      description: 'Installation and basic setup, device not included'
    },
    {
      service: 'Smart Thermostat',
      price: '$90 - $180',
      description: 'Installation and programming, device not included'
    },
    {
      service: 'Security Camera',
      price: '$150 - $220',
      description: 'Per device installation, system setup additional'
    },
    {
      service: 'Smart Lock',
      price: '$90 - $180',
      description: 'Installation and programming, device not included'
    }
  ];

  const faqs = [
    {
      question: 'Do you provide the smart home devices?',
      answer: 'We can install devices you provide or help with selection and purchasing. We\'ll recommend compatible systems based on your needs and budget.'
    },
    {
      question: 'Can you integrate with existing home automation?',
      answer: 'Yes, we can integrate new devices with most existing smart home systems. We\'ll assess compatibility during consultation.'
    },
    {
      question: 'Do you handle the app setup and configuration?',
      answer: 'Yes, we include basic app setup and configuration in our installation service. We\'ll walk you through the controls before we finish.'
    },
    {
      question: 'What about Wi-Fi and network requirements?',
      answer: 'We\'ll assess your network during installation. Most smart devices require reliable Wi-Fi coverage in the installation area.'
    }
  ];

  return (
    <div className="bg-white">
        {/* SEO Schema */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Smart home systems installation",
          "description": "",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Handyman of South Charlotte"
          },
          "areaServed": [
            { "@type": "City", "name": "Charlotte", "addressRegion": "NC" },
            { "@type": "Place", "name": "Ballantyne" },
            { "@type": "Place", "name": "South Charlotte" }
          ]
        })}
      </script>
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Smart Home Systems Installation
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional installation of smart home devices — video doorbells, thermostats, security cameras, smart locks, switches and more. Seamless integration and setup.
            </p>
            <CTAButtons className="justify-center" />
          </div>
        </div>
      </section>

      {/* Sticky Quote Button */}
      {stickyVisible && (
        <div className="fixed bottom-4 right-4 z-40 lg:bottom-6 lg:right-6">
          <div className="flex flex-col space-y-2">
            <a
              href="tel:980-316-7792"
              className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <SafeIcon icon={FiPhone} className="w-6 h-6" />
            </a>
            <a
              href="sms:980-316-7792?body=Hi! I need a smart home installation quote."
              className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200"
            >
              <SafeIcon icon={FiMessageSquare} className="w-6 h-6" />
            </a>
          </div>
        </div>
      )}

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Services */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Smart Home Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-primary-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiWifi} className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Professional Smart Home Setup</h3>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-blue-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-blue-700 mt-4 text-sm">
                      <strong>Note:</strong> Wiring for new boxes may add cost. We'll assess during consultation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Installation Gallery</h2>
                <p className="text-primary-700 mb-6">
                  See the quality of our lighting installations throughout the Charlotte area. Each project showcases our attention to detail and commitment to professional installation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {galleryImages.map((item, index) => (
                    <div key={index} className="relative w-full pb-[56.25%] overflow-hidden rounded-lg shadow-soft">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.alt}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Pricing */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Estimated Pricing (Labor Only)</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark price—final quote after a quick walkthrough.</strong> Smart devices not included unless specified.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pricingTiers.map((tier, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-soft border border-gray-200">
                      <h3 className="text-lg font-semibold text-primary-800 mb-2">{tier.service}</h3>
                      <div className="text-2xl font-bold text-primary-600 mb-3">{tier.price}</div>
                      <p className="text-primary-600 text-sm">{tier.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                      <h3 className="text-lg font-semibold text-primary-800 mb-2">{faq.question}</h3>
                      <p className="text-primary-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Related Services</h3>
                <div className="flex flex-wrap gap-3">
                  <Link to="/services/lighting" className="text-primary-600 hover:text-primary-700 font-medium">
                    Lighting Installation →
                  </Link>
                  <Link to="/services/tv-mount-installation" className="text-primary-600 hover:text-primary-700 font-medium">
                    TV Mount Installation →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Smart Home Upgrade?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                {/* Why Choose Us */}
                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Owner-led service</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Detail-focused work</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Always punctual</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Clean job sites</span>
                    </li>
                  </ul>
                </div>

                {/* Service Areas */}
                <div className="mt-6 pt-6 border-t border-primary-200">
                  <p className="text-sm text-primary-600">
                    <strong>Serving:</strong> Charlotte, Ballantyne, Pineville, Matthews, Mint Hill
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartHomeSystems;

