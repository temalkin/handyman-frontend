import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiDroplet } = FiIcons;

const PressureWashing = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const services = [
    'Small driveway washing',
    'Whole-house soft washing',
    'Deck cleaning and restoration',
    'Concrete and paver cleaning',
    'Fence and gate cleaning',
    'Outdoor furniture cleaning',
  ];

  const benefits = [
    'Restore curb appeal with safe, even cleaning',
    'Professional equipment and techniques',
    'Eco-friendly, plant-safe solutions',
  ];

  const processSteps = [
    {
      title: 'Surface Assessment',
      description: 'Evaluate material, condition, and select the correct pressure/chemistry',
    },
    {
      title: 'Preparation & Protection',
      description: 'Cover outlets, protect landscaping, move/secure items in the work area',
    },
    {
      title: 'Professional Cleaning',
      description: 'Apply detergents as needed and rinse with the right pressure and tips',
    },
    {
      title: 'Final Rinse & Inspection',
      description: 'Thorough rinse, cleanup, and walkthrough to confirm results',
    },
  ];

  const problemsWeSolve = services;

  const galleryImages = (IMAGES.pageMedia?.pressurewashing?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Pressure washing example ${idx + 1}`,
  }));

  const pricingTiers = [
    {
      service: 'Small Driveway Wash',
      price: '$280 - $680',
      description: 'Single-car driveway; includes pretreat, wash, and rinse',
    },
    {
      service: 'Whole-House Soft Wash',
      price: '$380 - $800',
      description: 'Siding, trims, and walkways; low-pressure soft-wash',
    },
    {
      service: 'Deck Wash',
      price: '$180 - $540',
      description: 'Wood or composite deck cleaning and restoration prep',
    },
  ];

  const faqs = [
    {
      question: 'Do you use detergents or cleaning solutions?',
      answer:
        'Yes. For mildew, algae, and stains we use eco-friendly detergents. They are safe for plants and pets when applied correctly.',
    },
    {
      question: 'Will pressure washing damage my plants?',
      answer:
        'We pre-wet and post-rinse landscaping and use tarps where needed. Our detergents are plant-safe and applied carefully.',
    },
    {
      question: 'Do I need to provide a water source?',
      answer:
        'Yes, access to an exterior spigot is required. We bring all hoses, equipment, and solutions.',
    },
    {
      question: 'How long until surfaces are dry/usable?',
      answer:
        'Typically 2–4 hours depending on weather. Avoid foot traffic until fully dry for best results.',
    },
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Pressure Washing Charlotte',
          description:
            'Professional pressure and soft-wash services in Charlotte and nearby areas: driveways, whole-house exteriors, decks, fences, concrete, and pavers.',
          provider: { '@type': 'LocalBusiness', name: 'Handyman of South Charlotte' },
          areaServed: [
            { '@type': 'City', name: 'Charlotte', addressRegion: 'NC' },
            { '@type': 'Place', name: 'Ballantyne' },
            { '@type': 'Place', name: 'South Charlotte' },
            { '@type': 'Place', name: 'Pineville' },
            { '@type': 'Place', name: 'Matthews' },
            { '@type': 'Place', name: 'Mint Hill' },
          ],
          serviceType: 'Pressure washing, soft washing',
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Pressure Washing in Charlotte &amp; Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Driveways, whole-house soft wash, decks, fences, concrete and pavers. Professional
              equipment, eco-friendly solutions, clean results.
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
              href="sms:980-316-7792?body=Hi! I need a pressure washing quote."
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
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              {/* Problems We Solve */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Pressure Washing Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problemsWeSolve.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-primary-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Pressure Washing Process</h2>
                <p className="text-primary-700 mb-6">
                  We combine the right chemistry with safe pressure to restore curb appeal without
                  damaging delicate surfaces.
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
                  <SafeIcon icon={FiDroplet} className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      Professional Cleaning Standards
                    </h3>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-blue-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-blue-700 mt-4 text-sm">
                      <strong>Note:</strong> High-pressure for concrete; soft-wash for siding and
                      other delicate surfaces.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Before &amp; After Results</h2>
                <p className="text-primary-700 mb-6">
                  Work across Charlotte and nearby areas. Consistent, clean finishes with careful
                  surface protection.
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Pressure Washing Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates.</strong> Final quote depends on square footage,
                    stains, access, and water availability. Equipment and detergents included.
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
                  <Link
                    to="/services/garage-floor-epoxy"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Garage Floor Epoxy →
                  </Link>
                  <Link to="/services/drywall-repair" className="text-primary-600 hover:text-primary-700 font-medium">
                    Drywall Repair →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready to Refresh Your Exterior?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                {/* Why Choose Us */}
                <div className="mt-8 pt-6 border-top border-t border-primary-200">
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

export default PressureWashing;