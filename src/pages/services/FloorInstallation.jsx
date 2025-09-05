import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiLayers } = FiIcons;

const FloorInstallation = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const materialsInstalled = [
    { type: 'Luxury Vinyl Plank (LVP)', description: 'Waterproof, durable, realistic wood-look' },
    { type: 'Laminate Flooring', description: 'Cost-effective with authentic wood/stone patterns' },
    { type: 'Engineered Hardwood', description: 'Real wood veneer, stable floating/lock systems' },
    { type: 'Transitions & Trim', description: 'Matching reducers, T-molds, thresholds, quarter round' },
  ];

  const subfloorPrep = [
    'Moisture testing and assessment',
    'Subfloor leveling and structural repair',
    'Proper acclimation of flooring materials',
    'Underlayment selection and installation',
    'Expansion gap planning and execution',
  ];

  const transitionOptions = [
    { type: 'T-Molding', use: 'Between rooms of same-height flooring' },
    { type: 'Reducer Strips', use: 'Transition to lower adjacent flooring' },
    { type: 'Threshold / Saddle', use: 'Doorways and exterior thresholds' },
    { type: 'Quarter Round & Base', use: 'Clean perimeter finish around walls/obstacles' },
  ];

  const galleryImages = (IMAGES.pageMedia?.floorinstallation?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Floor installation example ${idx + 1}`,
  }));

  const pricingTiers = [
    { service: 'LVP/Laminate Install', price: '$2.00 - $3.25/sq ft', description: 'Labor only; basic prep and transitions' },
    { service: 'Stair Installation', price: '$45 - $85/step', description: 'Per step incl. nosing and risers' },
    { service: 'Remove Old Flooring', price: '$0.75 - $1.50/sq ft', description: 'Removal and disposal of existing floor' },
  ];

  const faqs = [
    {
      question: 'How long should flooring acclimate before installation?',
      answer:
        'Most floating floors need 48–72 hours in the install environment. We plan delivery accordingly.',
    },
    {
      question: 'Is underlayment included?',
      answer:
        'Standard foam underlayment is included. Moisture/sound upgrades available at additional cost.',
    },
    {
      question: 'Do you move furniture?',
      answer:
        'We can move smaller items. Large appliances/fragile pieces should be handled by owners or movers.',
    },
    {
      question: 'What warranty do you provide?',
      answer:
        '1-year workmanship warranty on installation. Material warranties come from the manufacturer.',
    },
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Floor Installation Charlotte',
          description:
            'Professional installation of LVP, laminate, and engineered hardwood in Charlotte and nearby areas. Subfloor prep, moisture checks, and clean transitions.',
          provider: { '@type': 'LocalBusiness', name: 'Handyman of South Charlotte' },
          areaServed: [
            { '@type': 'City', name: 'Charlotte', addressRegion: 'NC' },
            { '@type': 'Place', name: 'Ballantyne' },
            { '@type': 'Place', name: 'South Charlotte' },
            { '@type': 'Place', name: 'Pineville' },
            { '@type': 'Place', name: 'Matthews' },
            { '@type': 'Place', name: 'Mint Hill' },
          ],
          serviceType: 'Floor installation (LVP, laminate, engineered hardwood)',
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Professional Floor Installation (LVP, Laminate &amp; More)
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Smooth subfloors, tight seams, clean transitions. Expert installs with careful prep and tidy finishes.
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
              href="sms:980-316-7792?body=Hi! I need a flooring installation quote."
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
              {/* Materials We Install */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Materials We Install</h2>
                <div className="space-y-4">
                  {materialsInstalled.map((material, index) => (
                    <div key={index} className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                      <h3 className="text-lg font-semibold text-primary-800 mb-2">{material.type}</h3>
                      <p className="text-primary-600">{material.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subfloor Prep & Moisture Checks */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiLayers} className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Subfloor Prep &amp; Moisture Checks</h3>
                    <p className="text-blue-700 mb-4">
                      Proper preparation is essential for long-lasting flooring. Our prep includes:
                    </p>
                    <ul className="space-y-2">
                      {subfloorPrep.map((step, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-blue-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Transitions & Trim Options */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Transitions, Base &amp; Quarter Round Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {transitionOptions.map((option, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-primary-800 mb-1">{option.type}</h3>
                        <p className="text-primary-600 text-sm">{option.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery (3 columns) */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Installation Gallery</h2>
                <p className="text-primary-700 mb-6">
                  Recent flooring installs around Charlotte — flat subfloors, tight seams, tidy transitions.
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

              {/* Estimated Pricing */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Floor Installation Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Preliminary estimates.</strong> Final pricing after on-site review of subfloor condition and project scope.
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
                  <Link to="/services/carpentry-woodworking" className="text-primary-600 hover:text-primary-700 font-medium">
                    Trim &amp; Molding →
                  </Link>
                  <Link to="/services/wainscoting" className="text-primary-600 hover:text-primary-700 font-medium">
                    Wainscoting →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for New Floors?</h3>
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

export default FloorInstallation;