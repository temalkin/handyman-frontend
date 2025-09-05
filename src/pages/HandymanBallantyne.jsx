import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../components/CTAButtons';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiMapPin, FiHome } = FiIcons;

const HandymanBallantyne = () => {
  const [stickyVisible] = useState(true);

  const servicesInBallantyne = [
    {
      name: 'Drywall Repair in Ballantyne',
      description: 'Expert wall patching and crack repair for Ballantyne homes and townhomes',
      link: '/drywall-repair-charlotte'
    },
    {
      name: 'Interior Painting in Ballantyne',
      description: 'Professional room painting for Ballantyne Village, Commons, and surrounding areas',
      link: '/interior-painting-charlotte'
    },
    {
      name: 'TV Mount Installation in Ballantyne',
      description: 'Safe TV mounting with clean cable management for Ballantyne family rooms',
      link: '/tv-mount-installation-charlotte'
    },
    {
      name: 'LVP Floor Installation in Ballantyne',
      description: 'Premium flooring installation for Ballantyne condos and single-family homes',
      link: '/lvp-floor-installation-charlotte'
    },
    {
      name: 'Water Damage Restoration in Ballantyne',
      description: 'Complete post-mitigation restoration for Ballantyne area properties',
      link: '/after-water-damage-drywall-restoration-charlotte'
    },
    {
      name: 'Exterior Painting in Ballantyne',
      description: 'Professional house painting and HOA-compliant exterior work',
      link: '/exterior-painting-charlotte'
    }
  ];

  const ballantyneAreas = [
    'Ballantyne Village',
    'Ballantyne Commons',
    'Ballantyne Country Club',
    'Ballantyne Corporate Park',
    'Ballantyne East',
    'Ballantyne West',
    'Palisades',
    'Ardrey Kell'
  ];

  const caseStudy = {
    title: 'Ballantyne Townhome Complete Refresh',
    description: 'Full interior update for a 3-bedroom townhome in Ballantyne Village including water damage restoration, fresh paint throughout, and luxury vinyl plank flooring.',
    details: 'After a water leak from the upstairs unit, we completed the post-mitigation restoration, repainted all common areas in updated colors, and installed LVP flooring on the main level. Project completed in 7 days while maintaining HOA standards.'
  };

  const faqs = [
    {
      question: 'Do you work with Ballantyne HOA requirements?',
      answer: 'Absolutely. We\'re familiar with Ballantyne area HOA standards and ensure all exterior work meets community guidelines. We can help coordinate approvals when needed and always use approved materials and colors.'
    },
    {
      question: 'What are the most common handyman needs in Ballantyne?',
      answer: 'Ballantyne residents frequently need drywall repairs in townhomes, interior painting updates, TV mounting in modern open floor plans, and water damage restoration from HVAC issues common in multi-story homes.'
    },
    {
      question: 'How familiar are you with Ballantyne home styles?',
      answer: 'Very familiar. We regularly work on Ballantyne\'s mix of townhomes, condos, and single-family homes. We understand the construction styles, common issues, and quality standards expected in the community.'
    }
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Handyman Ballantyne",
          "description": "Professional handyman services in Ballantyne including Ballantyne Village, Commons, and surrounding neighborhoods. Expert home repairs and improvements.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ballantyne",
            "addressRegion": "NC",
            "addressCountry": "US"
          },
          "areaServed": [
            {
              "@type": "Place",
              "name": "Ballantyne"
            },
            {
              "@type": "Place",
              "name": "Ballantyne Village"
            },
            {
              "@type": "Place",
              "name": "Ballantyne Commons"
            }
          ],
          "telephone": "+1-980-316-7792"
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Handyman Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional handyman services for Ballantyne residents including Ballantyne Village, Commons, and surrounding communities. Reliable repairs and improvements with HOA-compliant quality standards.
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
              className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-green-500 transition-colors duration-200"
              aria-label="Call for quote"
            >
              <SafeIcon icon={FiPhone} className="w-6 h-6" />
            </a>
            <a
              href="sms:980-316-7792?body=Hi! I need handyman services in Ballantyne:"
              className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200"
              aria-label="Text for quote"
            >
              <SafeIcon icon={FiMessageSquare} className="w-6 h-6" />
            </a>
          </div>
        </div>
      )}

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">

              {/* Handyman Services in Ballantyne */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Handyman Services in Ballantyne</h2>
                <p className="text-primary-700 mb-6">
                  We provide expert handyman services throughout the Ballantyne community, from townhomes in Ballantyne Village to single-family homes near Ballantyne Country Club. Our team understands the quality standards and HOA requirements of the area.
                </p>
                <div className="space-y-4">
                  {servicesInBallantyne.map((service, index) => (
                    <Link
                      key={index}
                      to={service.link}
                      onClick={() => window.scrollTo(0, 0)}
                      className="block p-6 bg-primary-50 rounded-lg border border-primary-100 hover:bg-green-50 focus:bg-green-50 transition-all duration-180 group"
                    >
                      <h3 className="text-lg font-semibold text-primary-800 group-hover:text-green-600 group-focus:text-green-600 transition-all duration-180 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-primary-600">{service.description}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Ballantyne Areas We Serve */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Ballantyne Areas We Serve</h2>
                <p className="text-primary-700 mb-6">
                  Our handyman services cover all Ballantyne neighborhoods and communities. We're experienced with the area's mix of townhomes, condos, and single-family homes.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ballantyneAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <span className="text-primary-700 text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us for Ballantyne */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-4">Why Ballantyne Residents Choose Us</h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">HOA-compliant work and quality standards</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Experience with Ballantyne's home styles and construction</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Responsive scheduling for busy professionals</span>
                  </li>
                </ul>
              </div>

              {/* Ballantyne Project Case Study */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent Ballantyne Project</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <SafeIcon icon={FiHome} className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-primary-800 mb-2">{caseStudy.title}</h3>
                      <p className="text-primary-700 mb-3">{caseStudy.description}</p>
                      <p className="text-primary-600 text-sm">{caseStudy.details}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ballantyne Handyman FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Ballantyne Handyman FAQs</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                      <h3 className="text-lg font-semibold text-primary-800 mb-2">{faq.question}</h3>
                      <p className="text-primary-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Areas */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">We Also Serve</h3>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/handyman-south-charlotte"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Handyman South Charlotte →
                  </Link>
                  <Link
                    to="/services"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    All Services →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Ballantyne Handyman Services?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>HOA compliant quality</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Ballantyne area expertise</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Professional scheduling</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Premium results</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-primary-200">
                  <p className="text-sm text-primary-600">
                    <strong>Primary Areas:</strong> Ballantyne Village, Commons, Country Club, Corporate Park
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

export default HandymanBallantyne;