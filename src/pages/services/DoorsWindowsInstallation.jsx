import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiHome } = FiIcons;

const DoorsWindowsInstallation = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const services = [
    'Interior prehung door installation',
    'Exterior door replacement',
    'Window replacement and installation',
    'Door frame repair and adjustment',
    'Hardware installation and upgrades',
    'Weatherproofing and sealing',
  ];

  const benefits = [
    'Smooth operation and tight fit',
    'Professional installation techniques',
    'Proper sealing and weatherproofing',
  ];

  const installationTypes = [
    {
      type: 'Interior Doors',
      description: 'Prehung doors, pocket doors, and barn doors with proper alignment',
    },
    {
      type: 'Exterior Doors',
      description: 'Entry doors, patio doors, and storm doors with weather sealing',
    },
    {
      type: 'Windows',
      description: 'Replacement windows with proper flashing and insulation',
    },
  ];

  const problemsWeSolve = services;

  const galleryImages = (IMAGES.pageMedia?.doorswindows?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Doors & windows installation example ${idx + 1}`,
  }));

  const pricingTiers = [
    {
      service: 'Interior Prehung Door',
      price: '$150 - $320',
      description: 'Labor only; hanging, alignment, and standard hardware',
    },
    {
      service: 'Exterior Door',
      price: '$350 - $780',
      description: 'Labor only; includes threshold, weatherstripping, and sealing',
    },
    {
      service: 'Window Replacement',
      price: '$250 - $620',
      description: 'Labor per window; includes insulation, flashing, and sealant',
    },
  ];

  const faqs = [
    {
      question: 'Do you provide doors and windows or just installation?',
      answer:
        "We can install what you provide or help with selection and purchasing. We'll recommend options that fit your budget and style.",
    },
    {
      question: 'How do you ensure proper fit and operation?',
      answer:
        'We measure, check square/plumb, shim where needed, and test operation multiple times before finish work.',
    },
    {
      question: 'Is weatherproofing included for exterior installations?',
      answer:
        'Yes. Proper flashing, insulation, sealant, and weatherstripping are included for exterior doors and windows.',
    },
    {
      question: 'Can you work with custom or non-standard sizes?',
      answer:
        'Yes. Custom sizes may require extra prep and materials, which we include in your written quote.',
    },
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Doors & Windows Installation Charlotte',
          description:
            'Professional door and window installation in Charlotte and nearby areas: interior/exterior doors, replacement windows, hardware upgrades, sealing, and weatherproofing.',
          provider: { '@type': 'LocalBusiness', name: 'Handyman of South Charlotte' },
          areaServed: [
            { '@type': 'City', name: 'Charlotte', addressRegion: 'NC' },
            { '@type': 'Place', name: 'Ballantyne' },
            { '@type': 'Place', name: 'South Charlotte' },
            { '@type': 'Place', name: 'Pineville' },
            { '@type': 'Place', name: 'Matthews' },
            { '@type': 'Place', name: 'Mint Hill' },
          ],
          serviceType: 'Door installation, window replacement',
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Doors &amp; Windows Installation in Charlotte &amp; Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Smooth operation, tight fit, and proper weatherproofing. Professional installs for
              lasting performance and a clean finish.
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
              href="sms:980-316-7792?body=Hi! I need a doors/windows installation quote."
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
              {/* Services / Problems We Solve */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Installation Services</h2>
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Installation Process</h2>
                <p className="text-primary-700 mb-6">
                  Precise measurements, correct shimming, and reliable sealing ensure smooth
                  operation and long-term efficiency.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Assessment & Planning',
                      description:
                        'Measurements, check for square/plumb, review swing/clearances, and hardware layout.',
                    },
                    {
                      title: 'Prep & Protection',
                      description:
                        'Protect floors/walls, remove old units, prep openings, and ensure clean surfaces.',
                    },
                    {
                      title: 'Secure Install',
                      description:
                        'Set, shim, and fasten; align reveals, install hardware; flashing/insulation where needed.',
                    },
                    {
                      title: 'Sealing & Finish',
                      description:
                        'Weatherstrip and seal; test operation; cleanup and walkthrough with the homeowner.',
                    },
                  ].map((step, index) => (
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

              {/* What We Install */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">What We Install</h2>
                <div className="space-y-4">
                  {installationTypes.map((type, index) => (
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
                  <SafeIcon icon={FiHome} className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      Professional Installation Standards
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
                      <strong>Note:</strong> Exterior installs include flashing, insulation, and
                      sealing per manufacturer best practices.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Installation Gallery</h2>
                <p className="text-primary-700 mb-6">
                  Recent door and window installs around the Charlotte area. Clean reveals, smooth
                  operation, and tidy finish work.
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Doors &amp; Windows Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates.</strong> Final quote depends on size, material,
                    framing corrections, hardware, and accessibility. Units not included unless
                    specified.
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
                    to="/services/carpentry-woodworking"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Carpentry &amp; Trim →
                  </Link>
                  <Link
                    to="/services/doors-windows-treatment"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Window Treatments →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">
                  Ready for New Doors &amp; Windows?
                </h3>
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

export default DoorsWindowsInstallation;