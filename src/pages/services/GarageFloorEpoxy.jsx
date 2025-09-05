import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiLayers } = FiIcons;

const GarageFloorEpoxy = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const services = [
    'Floor preparation and cleaning',
    'Crack repair and surface leveling',
    'Solid color epoxy application',
    'Decorative flake systems',
    'Clear protective topcoats',
    'Complete cleanup and curing',
  ];

  const benefits = [
    'Clean, glossy, easy to maintain',
    'Durable and chemical-resistant',
    'Professional application and finish',
  ];

  const systemTypes = [
    { type: 'Solid Color Epoxy', description: 'Uniform color, high-gloss, modern look' },
    { type: 'Decorative Flakes', description: 'Broadcast flakes for texture, color depth, and traction' },
    { type: 'Clear Topcoat', description: 'Extra protection, UV stability, enhanced shine' },
  ];

  const processSteps = [
    { title: 'Surface Preparation', description: 'Degrease, grind/etch, and repair cracks for strong adhesion' },
    { title: 'Primer Application', description: 'Primer coat to promote bonding and seal the slab' },
    { title: 'Epoxy Installation', description: 'Base coat application; optional full/partial flake broadcast' },
    { title: 'Protective Finish', description: 'Clear topcoat and scheduled cure for durability' },
  ];

  const galleryImages = (IMAGES.pageMedia?.garagefloorepoxy?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Garage floor epoxy example ${idx + 1}`,
  }));

  const pricingExample = {
    size: '2-Car Garage (400–500 sq ft)',
    price: '$1,400 - $3,250',
    pricePerSqFt: '$3.50 - $6.50 per sq ft',
    description: 'Labor + materials; includes prep, epoxy, and clear topcoat',
  };

  const faqs = [
    {
      question: 'How long does the installation process take?',
      answer:
        'Typical 2–3 days: Day 1 prep/primer, Day 2 epoxy/flake, Day 3 clear topcoat. Full cure ~7 days.',
    },
    {
      question: 'Can you apply epoxy over existing coatings?',
      answer:
        'Old coatings must be removed/mechanically profiled for adhesion. We assess and include prep in the quote.',
    },
    {
      question: 'How do I maintain the epoxy floor?',
      answer:
        'Sweep regularly; mop with mild detergent. Avoid harsh solvents and abrasives to preserve gloss.',
    },
    {
      question: 'Is the floor slippery when wet?',
      answer:
        'We can add anti-slip additive to the topcoat. Flake systems also increase traction.',
    },
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Garage Floor Epoxy Charlotte',
          description:
            'Professional garage epoxy systems: solid color, decorative flake, and clear topcoats with proper surface prep in Charlotte and nearby areas.',
          provider: { '@type': 'LocalBusiness', name: 'Handyman of South Charlotte' },
          areaServed: [
            { '@type': 'City', name: 'Charlotte', addressRegion: 'NC' },
            { '@type': 'Place', name: 'Ballantyne' },
            { '@type': 'Place', name: 'South Charlotte' },
            { '@type': 'Place', name: 'Pineville' },
            { '@type': 'Place', name: 'Matthews' },
            { '@type': 'Place', name: 'Mint Hill' },
          ],
          serviceType: 'Garage floor epoxy installation',
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Garage Floor Epoxy Installation
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Clean, glossy, easy to maintain. Durable, chemical-resistant floors with solid color
              or decorative flake finishes.
            </p>
            <CTAButtons className="justify-center" />
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
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
              href="sms:980-316-7792?body=Hi! I need a garage floor epoxy quote."
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Epoxy Flooring Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-primary-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Installation Process</h2>
                <p className="text-primary-700 mb-6">
                  Proper mechanical prep and a controlled cure are the foundation of a durable,
                  glossy epoxy floor.
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

              {/* Epoxy System Options */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Epoxy System Options</h2>
                <div className="space-y-4">
                  {systemTypes.map((type, index) => (
                    <div key={index} className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                      <h3 className="text-lg font-semibold text-primary-800 mb-2">{type.type}</h3>
                      <p className="text-primary-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiLayers} className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Professional Installation Benefits</h3>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-blue-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Gallery — 3 columns */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Installation Gallery</h2>
                <p className="text-primary-700 mb-6">
                  Recent epoxy installs across Charlotte — clean prep, even broadcast, deep gloss.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {galleryImages.map((item, index) => (
                    <div
                      key={index}
                      className="relative w-full pb-[56.25%] overflow-hidden rounded-lg shadow-soft"
                    >
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

              {/* Pricing */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Garage Epoxy Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimate.</strong> Final pricing depends on slab condition, moisture, flake coverage, and access.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-soft border border-gray-200 text-center">
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">{pricingExample.size}</h3>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{pricingExample.price}</div>
                  <div className="text-lg text-primary-600 mb-4">{pricingExample.pricePerSqFt}</div>
                  <p className="text-primary-600 text-sm">{pricingExample.description}</p>
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
                  <Link to="/services/pressure-washing" className="text-primary-600 hover:text-primary-700 font-medium">
                    Pressure Washing →
                  </Link>
                  <Link to="/services/floor-installation" className="text-primary-600 hover:text-primary-700 font-medium">
                    Floor Installation →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Garage Transformation?</h3>
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

export default GarageFloorEpoxy;