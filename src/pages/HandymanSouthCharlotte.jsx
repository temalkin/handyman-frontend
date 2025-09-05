import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../components/CTAButtons';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiMapPin, FiHome } = FiIcons;

const HandymanSouthCharlotte = () => {
  const [stickyVisible] = useState(true);

  const servicesInSouthCharlotte = [
    {
      name: 'Drywall Repair in South Charlotte',
      description: 'Patch holes, fix cracks, and blend textures in Blakeney, Rea Farms, and surrounding neighborhoods',
      link: '/drywall-repair-charlotte'
    },
    {
      name: 'Interior Painting in South Charlotte', 
      description: 'Professional wall painting for homes in Providence, Carmel, and South Park areas',
      link: '/interior-painting-charlotte'
    },
    {
      name: 'TV Mount Installation in South Charlotte',
      description: 'Safe wall mounting with cable management for homes throughout South Charlotte',
      link: '/tv-mount-installation-charlotte'
    },
    {
      name: 'LVP Floor Installation in South Charlotte',
      description: 'Luxury vinyl plank flooring for Quail Hollow, Foxcroft, and nearby communities',
      link: '/lvp-floor-installation-charlotte'
    },
    {
      name: 'Water Damage Restoration in South Charlotte',
      description: 'Post-mitigation drywall and ceiling restoration throughout South Charlotte area',
      link: '/after-water-damage-drywall-restoration-charlotte'
    },
    {
      name: 'Exterior Painting in South Charlotte',
      description: 'House painting and siding refresh for South Charlotte neighborhoods',
      link: '/exterior-painting-charlotte'
    }
  ];

  const neighborhoods = [
    'Blakeney',
    'Providence',
    'Carmel', 
    'South Park',
    'Rea Farms',
    'Quail Hollow',
    'Foxcroft',
    'Stonehaven',
    'Piper Glen',
    'Arboretum'
  ];

  const caseStudy = {
    title: 'South Charlotte Ranch Home Renovation',
    description: 'Complete interior refresh including drywall repairs, full interior painting, and LVP flooring installation in a 2,400 sq ft ranch home in the Blakeney area.',
    details: 'Project included patching multiple nail pops, repainting all common areas in modern colors, and installing luxury vinyl plank flooring in the kitchen and living areas. Completed in 5 days with minimal disruption to the family.'
  };

  const faqs = [
    {
      question: 'Do you service all South Charlotte neighborhoods?',
      answer: 'Yes, we provide handyman services throughout South Charlotte including Blakeney, Providence, Carmel, South Park, Rea Farms, Quail Hollow, and surrounding areas. We\'re familiar with the common home styles and needs in each neighborhood.'
    },
    {
      question: 'What are the most common handyman needs in South Charlotte?',
      answer: 'South Charlotte homeowners frequently need drywall repairs from settling, interior painting refreshes, TV mounting in family rooms, and flooring updates. We also handle a lot of water damage restoration from HVAC and plumbing issues.'
    },
    {
      question: 'How quickly can you respond to South Charlotte service calls?',
      answer: 'Most South Charlotte jobs can be scheduled within 2-3 days. For urgent repairs like water damage restoration, we often can respond same-day or next-day depending on our current schedule.'
    }
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Handyman South Charlotte",
          "description": "Professional handyman services in South Charlotte neighborhoods including Blakeney, Providence, Carmel, and surrounding areas.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "South Charlotte",
            "addressRegion": "NC",
            "addressCountry": "US"
          },
          "areaServed": [
            {
              "@type": "Place",
              "name": "South Charlotte"
            },
            {
              "@type": "Place", 
              "name": "Blakeney"
            },
            {
              "@type": "Place",
              "name": "Providence"
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
              Handyman South Charlotte
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional handyman services for South Charlotte neighborhoods including Blakeney, Providence, Carmel, South Park, and surrounding areas. Local team with high accountability for all your home repair needs.
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
              href="sms:980-316-7792?body=Hi! I need handyman services in South Charlotte:"
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

              {/* Handyman Services in South Charlotte */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Handyman Services in South Charlotte</h2>
                <p className="text-primary-700 mb-6">
                  We provide comprehensive handyman services throughout South Charlotte, from Blakeney to Providence and everywhere in between. Our local team understands the unique needs of South Charlotte homes and neighborhoods.
                </p>
                <div className="space-y-4">
                  {servicesInSouthCharlotte.map((service, index) => (
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

              {/* South Charlotte Neighborhoods We Serve */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">South Charlotte Neighborhoods We Serve</h2>
                <p className="text-primary-700 mb-6">
                  Our handyman services cover all major South Charlotte neighborhoods. We're familiar with the home styles, common issues, and community standards throughout the area.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {neighborhoods.map((neighborhood, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <span className="text-primary-700 text-sm">{neighborhood}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us for South Charlotte */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-4">Why South Charlotte Residents Choose Us</h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Local team familiar with South Charlotte home styles</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Fast response times throughout the area</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Understanding of HOA requirements and standards</span>
                  </li>
                </ul>
              </div>

              {/* South Charlotte Project Case Study */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent South Charlotte Project</h2>
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

              {/* South Charlotte Handyman FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">South Charlotte Handyman FAQs</h2>
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
                    to="/handyman-ballantyne"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Handyman Ballantyne →
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
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for South Charlotte Handyman Services?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Local South Charlotte team</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Fast response times</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>High accountability</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>HOA compliant work</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-primary-200">
                  <p className="text-sm text-primary-600">
                    <strong>Primary Areas:</strong> Blakeney, Providence, Carmel, South Park, Rea Farms, Quail Hollow
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

export default HandymanSouthCharlotte;