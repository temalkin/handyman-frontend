import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiSquare } = FiIcons;

const DoorsWindowsTreatment = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const services = [
    'Curtain rod installation',
    'Blinds installation and mounting',
    'Shade installation and setup',
    'Valance and cornice mounting',
    'Hardware installation and adjustment',
    'Custom treatment solutions',
  ];

  const benefits = [
    'Clean finish, proper coverage, light control',
    'Professional mounting and alignment',
    'Tailored solutions for any window',
  ];

  const treatmentTypes = [
    { type: 'Curtain Rods', description: 'Standard and decorative rods with proper wall anchoring' },
    { type: 'Blinds', description: 'Horizontal and vertical blinds with precise mounting' },
    { type: 'Shades', description: 'Roller, cellular, and Roman shades with smooth operation' },
    { type: 'Custom Solutions', description: 'Motorized treatments and specialty window coverings' },
  ];

  const processSteps = [
    {
      title: 'Measure & Plan',
      description: 'Confirm widths/heights, stack clearance, mounting surface, and hardware type',
    },
    {
      title: 'Prep & Protection',
      description: 'Mark level lines, locate studs, choose anchors for drywall/brick/plaster',
    },
    {
      title: 'Precise Mounting',
      description: 'Drill, anchor, set brackets true to level; hang rods/blinds/shades and balance',
    },
    {
      title: 'Adjustment & Cleanup',
      description: 'Set limits, cord safety, smooth operation check; tidy workspace and walkthrough',
    },
  ];

  const galleryImages = (IMAGES.pageMedia?.doorswindowstreatment?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Window treatment installation example ${idx + 1}`,
  }));

  const pricingTiers = [
    { service: 'Curtain Rod Install', price: '$20 - $45', description: 'Per rod, includes mounting hardware' },
    { service: 'Blinds Installation', price: '$25 - $60', description: 'Per window, standard mounting' },
    { service: 'Shades Installation', price: '$45 - $120', description: 'Per window, includes adjustment' },
  ];

  const faqs = [
    {
      question: 'Do you provide window treatments or just installation?',
      answer:
        'We install what you provide or can help with selection and purchasing. We work with major brands and custom makers.',
    },
    {
      question: 'Can you install treatments on any wall type?',
      answer:
        "Yes. We use appropriate anchors for drywall, plaster, brick, and most substrates. We'll assess on site.",
    },
    {
      question: 'Do you handle motorized window treatments?',
      answer:
        'Yes. We install motorized blinds and shades. Basic electrical hookups are included; complex automation is scoped separately.',
    },
    {
      question: 'What about unusual or custom window shapes?',
      answer:
        'We measure carefully and recommend suitable hardware/mounts. Most custom shapes are supported.',
    },
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Window Treatments Installation Charlotte',
          description:
            'Professional installation of curtains, blinds, shades, cornices, and custom/motorized window treatments in Charlotte and nearby areas.',
          provider: { '@type': 'LocalBusiness', name: 'Handyman of South Charlotte' },
          areaServed: [
            { '@type': 'City', name: 'Charlotte', addressRegion: 'NC' },
            { '@type': 'Place', name: 'Ballantyne' },
            { '@type': 'Place', name: 'South Charlotte' },
            { '@type': 'Place', name: 'Pineville' },
            { '@type': 'Place', name: 'Matthews' },
            { '@type': 'Place', name: 'Mint Hill' },
          ],
          serviceType: 'Window treatments installation',
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Window Treatments Installation in Charlotte &amp; Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Curtains, blinds, shades, cornices, and motorized systems. Clean lines, level installs, smooth operation.
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
              href="sms:980-316-7792?body=Hi! I need a window treatment installation quote."
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Window Treatment Services</h2>
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Installation Process</h2>
                <p className="text-primary-700 mb-6">
                  Level lines, proper anchors, and precise adjustments ensure a clean, reliable finish.
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

              {/* Treatment Types */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Treatment Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {treatmentTypes.map((type, index) => (
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
                  <SafeIcon icon={FiSquare} className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
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
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Installation Gallery</h2>
                <p className="text-primary-700 mb-6">
                  Recent installations across Charlotte. Straight lines, even coverage, and smooth controls.
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Window Treatments Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates.</strong> Final quote depends on window count/size, substrate, height/access, and motorization.
                    Treatments not included unless specified.
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
                  <Link to="/services/doors-windows-installation" className="text-primary-600 hover:text-primary-700 font-medium">
                    Door &amp; Window Installation →
                  </Link>
                  <Link to="/services/carpentry-woodworking" className="text-primary-600 hover:text-primary-700 font-medium">
                    Custom Carpentry →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Window Treatments?</h3>
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

export default DoorsWindowsTreatment;