import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';


const { FiCheck, FiPhone, FiMessageSquare, FiSun } = FiIcons;

const Lighting = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const services = [
    'Light fixture replacement',
    'Chandelier installation',
    'Recessed lighting installation',
    'Ceiling fan installation',
    'Under-cabinet lighting',
    'Dimmer switch installation'
  ];

  const benefits = [
    'Brighter rooms, better moods',
    'Safe electrical installation',
    'Professional fixture mounting'
  ];

  const lightingTypes = [
    {
      type: 'Fixture Replacement',
      description: 'Replace existing fixtures with new styles and improved lighting'
    },
    {
      type: 'Recessed Lighting',
      description: 'Clean, modern look with focused illumination'
    },
    {
      type: 'Chandeliers & Pendants',
      description: 'Statement lighting with proper support and electrical connections'
    },
    {
      type: 'Specialty Lighting',
      description: 'Under-cabinet, accent, and task lighting solutions'
    }
  ];


  const galleryImages = (IMAGES.pageMedia?.lighting?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Lighting installation example ${idx + 1}`
  }));


  const pricingTiers = [
    {
      service: 'Replace Existing Fixture',
      price: '$65 - $160',
      description: 'Labor only, standard ceiling height'
    },
    {
      service: 'Chandelier Install',
      price: '$180 - $380',
      description: 'Standard height, includes proper support'
    },
    {
      service: 'Recessed Lights',
      price: '$120 - $220',
      description: 'Per fixture labor, new wiring may add cost'
    }
  ];

  const faqs = [
    {
      question: 'Do you handle the electrical wiring?',
      answer: 'Yes, we handle basic electrical connections for fixture replacement. New circuits or complex wiring may require a licensed electrician, which we can coordinate.'
    },
    {
      question: 'Can you install heavy chandeliers safely?',
      answer: 'Yes, we ensure proper support with ceiling boxes rated for the weight and use appropriate mounting hardware for safe installation.'
    },
    {
      question: 'Do you provide the light fixtures?',
      answer: 'We can install fixtures you provide or help with selection and purchasing. We\'ll discuss options based on your style and budget preferences.'
    },
    {
      question: 'What about dimmer switches and controls?',
      answer: 'We can install dimmer switches and basic lighting controls. Smart switches and complex automation systems may require additional consultation.'
    }
  ];

  const problemsWeSolve = services

  const processSteps = [
    {
      title: 'Fixture Assessment & Planning',
      description: 'Check box rating, support, ceiling height, and ideal placement for the fixture'
    },
    {
      title: 'Safe Electrical Connections',
      description: 'Turn off power, verify wiring, install rated boxes, connect with proper hardware'
    },
    {
      title: 'Mounting & Alignment',
      description: 'Secure mounting, correct alignment and height, stable support for weight'
    },
    {
      title: 'Testing & Cleanup',
      description: 'Verify operation and dimming, tidy workspace, review with the homeowner'
    }
  ]

  const recentProjects = [
    'Ballantyne: Chandelier install with reinforced ceiling support',
    'South Charlotte: Recessed lighting layout for living room',
    'Pineville: Dimmer upgrade and under-cabinet LED lighting'
  ]

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Lighting Installation Charlotte",
          "description": "Professional lighting installation services in Charlotte and nearby areas: fixtures, chandeliers, recessed lights, dimmers, and more.",
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
              Lighting Installation in Charlotte & Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional lighting installs — fixtures, chandeliers, recessed lights, and dimmers. Safe electrical work with beautiful, consistent results.
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
              href="sms:980-316-7792?body=Hi! I need a lighting installation quote."
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
              {/* Problems We Solve */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Lighting Problems We Fix</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problemsWeSolve.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-primary-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Lighting Installation Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Lighting Installation Process</h2>
                <p className="text-primary-700 mb-6">
                  Proper planning, secure mounting, and safe wiring are essential for professional lighting installs. Here's how we do it.
                </p>
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-6 bg-primary-50 rounded-lg border border-primary-100"
                    >
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary-800 mb-2">{step.title}</h3>
                        <p className="text-primary-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiSun} className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Professional Installation Standards</h3>
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Lighting Installation Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates only.</strong> Final cost depends on fixture type, ceiling height, support, and wiring complexity. Fixtures not included unless specified.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <Link to="/services/smart-home-systems" className="text-primary-600 hover:text-primary-700 font-medium">
                    Smart Home Systems →
                  </Link>
                  <Link to="/services/painting" className="text-primary-600 hover:text-primary-700 font-medium">
                    Interior Painting →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready to Brighten Your Space?</h3>
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

export default Lighting;