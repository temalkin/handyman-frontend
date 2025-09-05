import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiTool } = FiIcons;

const CarpentryWoodworking = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const services = [
    'Trim and molding installation',
    'Door and window framing',
    'Structural framing repairs',
    'Custom built-in shelving',
    'Kitchen and bathroom cabinets',
    'Fireplace mantels and surrounds',
    'Wood rot repair and replacement',
    'Custom storage solutions',
  ];

  const materialsFinishes = [
    {
      category: 'Wood Species',
      options: ['Pine', 'Oak', 'Maple', 'Cherry', 'Poplar', 'MDF / Engineered'],
    },
    {
      category: 'Hardware',
      options: ['Hinges & Slides', 'Handles & Knobs', 'Brackets & Supports', 'Specialty Hardware'],
    },
    {
      category: 'Finishes',
      options: ['Natural Stain', 'Paint Grade', 'Clear Coat', 'Distressed / Rustic'],
    },
  ];

  const processSteps = [
    { title: 'Consultation & Measurement', description: 'Detailed assessment, measurements, and design discussion' },
    { title: 'Material Selection', description: 'Choose wood species, hardware, and finishes that fit budget and style' },
    { title: 'Preparation & Setup', description: 'Site protection, tooling, and precise layout before cutting' },
    { title: 'Construction & Installation', description: 'Accurate cutting, joinery, assembly, and secure installation' },
    { title: 'Finishing & Cleanup', description: 'Sanding, touch-ups, hardware tweaks, and full site cleanup' },
  ];

  const galleryImages = (IMAGES.pageMedia?.carpentrywoodworking?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Carpentry & woodworking example ${idx + 1}`,
  }));

  const pricingTiers = [
    { service: 'Small Trim Repair', price: '$120 - $260', description: 'Baseboard, casing, or crown molding repair' },
    { service: 'New Interior Door Install', price: '$180 - $380', description: 'Labor only for standard interior door' },
    { service: 'Small Built-in Project', price: '$950 - $2,400+', description: 'Custom shelving or small closet system' },
  ];

  const faqs = [
    {
      question: 'Do you provide materials or should I purchase them?',
      answer:
        "We can supply materials or work with what you provide. We'll recommend options based on design, durability, and budget.",
    },
    {
      question: 'Typical lead time for custom projects?',
      answer:
        'Simple repairs: 1–3 days. Custom built-ins and larger projects: 1–3 weeks depending on scope and material availability.',
    },
    {
      question: 'Do you handle finishing and painting?',
      answer:
        'We handle sanding and prep. Painting/staining can be coordinated or referred to trusted partners and scoped separately.',
    },
    {
      question: 'Are permits needed?',
      answer:
        "Most interior carpentry doesn't require permits. Structural changes may; we’ll flag this during consultation and help coordinate.",
    },
  ];

  const problemsWeSolve = services;

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Carpentry & Woodworking Charlotte',
          description:
            'Custom carpentry, trim, built-ins, framing repairs, cabinets, mantels, and wood rot repair in Charlotte and nearby areas.',
          provider: { '@type': 'LocalBusiness', name: 'Handyman of South Charlotte' },
          areaServed: [
            { '@type': 'City', name: 'Charlotte', addressRegion: 'NC' },
            { '@type': 'Place', name: 'Ballantyne' },
            { '@type': 'Place', name: 'South Charlotte' },
            { '@type': 'Place', name: 'Pineville' },
            { '@type': 'Place', name: 'Matthews' },
            { '@type': 'Place', name: 'Mint Hill' },
          ],
          serviceType: 'Carpentry, woodworking, built-ins',
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Custom Carpentry &amp; Wood Repairs in Charlotte &amp; Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              From trim to built-ins — precise, durable craftsmanship. Clean lines, solid joinery, and a tidy finish.
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
              href="sms:980-316-7792?body=Hi! I need a carpentry quote."
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
              {/* Services / Problems We Solve */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Carpentry Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problemsWeSolve.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-primary-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials & Finishes */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Materials &amp; Finishes Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {materialsFinishes.map((category, index) => (
                    <div key={index} className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                      <h3 className="text-lg font-semibold text-primary-800 mb-3">{category.category}</h3>
                      <ul className="space-y-2">
                        {category.options.map((option, optIndex) => (
                          <li key={optIndex} className="text-primary-600 text-sm">
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our 5-Step Carpentry Process</h2>
                <p className="text-primary-700 mb-6">
                  Precision layout, solid joinery, and clean finish work — built to last and look great.
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

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Project Gallery</h2>
                <p className="text-primary-700 mb-6">
                  Recent custom carpentry across Charlotte — tight reveals, crisp miters, smooth finishes.
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Carpentry Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates.</strong> Final pricing depends on scope, materials, site conditions, and design complexity.
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
                  <Link to="/services/wainscoting" className="text-primary-600 hover:text-primary-700 font-medium">
                    Wainscoting &amp; Trim →
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
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Custom Carpentry?</h3>
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

export default CarpentryWoodworking;