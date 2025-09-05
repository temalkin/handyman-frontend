import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare, FiGrid } = FiIcons;

const Wainscoting = () => {
  const [stickyVisible, setStickyVisible] = useState(true);

  const styles = [
    { name: 'Board & Batten', description: 'Classic vertical boards with horizontal battens for timeless appeal' },
    { name: 'Shaker Style', description: 'Clean, rectangular panels with simple, elegant lines' },
    { name: 'Picture-Frame Molding', description: 'Decorative frames creating sophisticated wall panels' },
    { name: 'Beadboard', description: 'Traditional tongue-and-groove planking with distinctive bead detail' },
  ];

  const designConsiderations = [
    { aspect: 'Height Guidelines', details: 'Standard 32–36", chair rail at 36–42", or full-wall applications' },
    { aspect: 'Spacing & Proportion', details: 'Panel sizing based on room dimensions and architectural features' },
    { aspect: 'Color & Finish', details: 'Coordinate with existing trim, or create contrast for visual impact' },
    { aspect: 'Integration', details: 'Clean transitions around outlets, switches, and architectural elements' },
  ];

  const processSteps = [
    { title: 'Measure & Layout', description: 'Room measurement, story pole, and panel grid planning' },
    { title: 'Material Prep', description: 'Cut to size, dry-fit, and label components for fast install' },
    { title: 'Wall Prep', description: 'Check level/plumb, address high spots, and snap reference lines' },
    { title: 'Precise Install', description: 'Set rails/stiles with consistent reveals and true corners' },
    { title: 'Caulk & Fill', description: 'Seam fill, nail-hole patching, sand, and primer for paint-ready finish' },
  ];

  const galleryImages = (IMAGES.pageMedia?.wainscoting?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `Wainscoting example ${idx + 1}`,
  }));

  const pricingTiers = [
    { service: 'Single Accent Wall', price: '$380 - $750', description: 'One wall, basic board & batten or shaker style' },
    { service: 'Full Room (12x12)', price: '$1,200 - $2,400+', description: 'Complete room with chair rail and trim' },
  ];

  const faqs = [
    {
      question: 'What wall conditions are required?',
      answer:
        'Walls should be reasonably flat and plumb. Minor imperfections are fine; larger issues may need prep, which we can handle.',
    },
    {
      question: 'Is paint included?',
      answer:
        'Install is paint-ready with primer. Final painting can be coordinated separately or via our trusted partners.',
    },
    {
      question: 'How long does installation take?',
      answer: 'Accent wall: 1–2 days. Full room: 2–4 days depending on style, room size, and complexity.',
    },
    {
      question: 'How do I maintain wainscoting?',
      answer:
        'Dust regularly; clean with mild soap and water. Touch up paint as needed to keep the finish crisp.',
    },
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Wainscoting & Accent Walls Charlotte',
          description:
            'Custom wainscoting, board & batten, shaker panels, and decorative wall treatments installed paint-ready in Charlotte and nearby areas.',
          provider: { '@type': 'LocalBusiness', name: 'Handyman of South Charlotte' },
          areaServed: [
            { '@type': 'City', name: 'Charlotte', addressRegion: 'NC' },
            { '@type': 'Place', name: 'Ballantyne' },
            { '@type': 'Place', name: 'South Charlotte' },
            { '@type': 'Place', name: 'Pineville' },
            { '@type': 'Place', name: 'Matthews' },
            { '@type': 'Place', name: 'Mint Hill' },
          ],
          serviceType: 'Wainscoting installation, accent walls',
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Wainscoting, Board &amp; Batten, Accent Walls
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Elegant wall details — measured, leveled, and paint-ready. Crisp lines, clean reveals, consistent spacing.
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
              href="sms:980-316-7792?body=Hi! I need a wainscoting quote."
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
              {/* Styles */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Wainscoting Styles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {styles.map((style, index) => (
                    <div key={index} className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                      <h3 className="text-lg font-semibold text-primary-800 mb-3">{style.name}</h3>
                      <p className="text-primary-600">{style.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design & Layout */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Design &amp; Layout Considerations</h2>
                <div className="space-y-4">
                  {designConsiderations.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                      <SafeIcon icon={FiGrid} className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-primary-800 mb-1">{item.aspect}</h3>
                        <p className="text-primary-600">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation & Paint-Ready Finish (Process) */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Preparation &amp; Paint-Ready Finish</h3>
                <p className="text-blue-700 mb-4">Our process ensures clean lines and a durable, paint-ready surface.</p>
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-blue-100"
                    >
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-primary-800">{step.title}</h4>
                        <p className="text-primary-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery — 3 columns */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Style Gallery</h2>
                <p className="text-primary-700 mb-6">
                  Recent wainscoting installs around Charlotte — level rails, even spacing, sharp corners.
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Wainscoting Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Preliminary estimates.</strong> Final pricing depends on room size, style complexity, and materials.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Custom Carpentry →
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
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Elegant Wall Details?</h3>
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

export default Wainscoting;