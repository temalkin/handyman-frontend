import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare } = FiIcons;

const InteriorPaintingCharlotte = () => {
  const [stickyVisible] = useState(true);

  const problemsWeSolve = [
    'Outdated wall colors and faded paint',
    'Scuff marks and wall imperfections',
    'Uneven paint coverage and brush marks',
    'Wrong paint sheen for room function',
    'Color matching between rooms',
    'Trim and ceiling touch-ups'
  ];

  const processSteps = [
    {
      title: 'Color Consultation & Prep',
      description: 'Review color choices, assess wall condition, fill holes, and sand rough spots for smooth finish'
    },
    {
      title: 'Protection & Masking',
      description: 'Cover floors and furniture, tape trim and fixtures with precision for crisp paint lines'
    },
    {
      title: 'Prime & Paint Application',
      description: 'Apply primer where needed, then two coats of paint using proper techniques for even coverage'
    },
    {
      title: 'Final Details & Cleanup',
      description: 'Remove tape while paint is tacky, touch up any imperfections, and complete thorough cleanup'
    }
  ];

  const beforeAfterImages = (IMAGES.pageMedia?.interiorPaintingCharlotte?.beforeAfter || []).map((url, idx) => ({
    image: url,
    alt: `Interior painting example ${idx + 1}`
  }));

  const pricingTiers = [
    {
      size: 'Accent Wall',
      price: '$180 - $320',
      description: 'Single feature wall in Ballantyne homes, includes prep and two coats'
    },
    {
      size: 'Standard Room (12x12)',
      price: '$420 - $780',
      description: 'Four walls painted in South Charlotte area, standard prep included'
    },
    {
      size: 'Large Room + Ceiling',
      price: '$680 - $1,200',
      description: 'Living room or master bedroom in Matthews/Pineville with ceiling'
    }
  ];

  const faqs = [
    {
      question: 'What paint brands do you recommend for Charlotte homes?',
      answer: 'We use premium brands like Sherwin-Williams and Benjamin Moore. For high-traffic areas, we recommend washable paints. For bathrooms and kitchens, we use moisture-resistant formulations.'
    },
    {
      question: 'How do you ensure crisp, clean lines?',
      answer: 'We use high-quality painter\'s tape, remove it while paint is still tacky, and use proper brush techniques. Our painters have years of experience achieving professional results.'
    },
    {
      question: 'Do you move furniture during painting?',
      answer: 'We can move smaller furniture pieces and will work around larger items with proper protection. For best results, we recommend clearing the room beforehand when possible.'
    }
  ];

  const recentProjects = [
    'Ballantyne kitchen: Cabinet painting and accent wall in modern navy',
    'Pineville master suite: Full room repaint with vaulted ceiling work',
    'Matthews family room: Open concept painting with color flow between spaces'
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service", 
          "name": "Interior Painting Charlotte",
          "description": "Professional interior painting services in Charlotte, Ballantyne, and surrounding areas. Expert wall painting, color consultation, and premium finishes.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Handyman of South Charlotte"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Charlotte", 
              "addressRegion": "NC"
            },
            {
              "@type": "Place",
              "name": "Ballantyne"
            },
            {
              "@type": "Place",
              "name": "South Charlotte"
            }
          ],
          "offers": {
            "@type": "Offer",
            "priceRange": "$180-$1200"
          }
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Interior Painting in Charlotte & Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional interior painting services throughout South Charlotte, Ballantyne, Matthews, and Pineville. Expert preparation, premium paints, and flawless finishes that transform your home.
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
              href="sms:980-316-7792?body=Hi! I need interior painting in Charlotte. Here are room photos:"
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

              {/* Interior Painting Services */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Interior Painting Services</h2>
                <p className="text-primary-700 mb-6">
                  Transform your Charlotte home with professional interior painting. We handle everything from color consultation to final cleanup, ensuring beautiful, long-lasting results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problemsWeSolve.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-primary-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Interior Painting Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Interior Painting Process</h2>
                <p className="text-primary-700 mb-6">
                  Quality interior painting starts with proper preparation. Our systematic approach ensures smooth, even coverage and crisp lines that last for years in your South Charlotte home.
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

              {/* Painting Results Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Interior Painting Results</h2>
                <p className="text-primary-700 mb-6">
                  See our interior painting work throughout Charlotte. Each project showcases our attention to detail and commitment to exceptional finishes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {beforeAfterImages.map((item, index) => (
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

              {/* Interior Painting Pricing */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Interior Painting Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates only.</strong> Final cost depends on room size, wall condition, paint quality, and ceiling height. Paint cost separate unless specified.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {pricingTiers.map((tier, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-soft border border-gray-200">
                      <h3 className="text-lg font-semibold text-primary-800 mb-2">{tier.size}</h3>
                      <div className="text-2xl font-bold text-primary-600 mb-3">{tier.price}</div>
                      <p className="text-primary-600 text-sm">{tier.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-primary-700">
                  Pricing factors: wall preparation needs, paint quality selection, ceiling height, trim work, and furniture moving requirements. Premium paints cost more but provide better coverage and durability.
                </p>
              </div>

              {/* Why Choose Our Interior Painting */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-4">Why Choose Our Interior Painting Services</h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Smooth, even coverage with no brush marks</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Razor-sharp lines and professional finish</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Complete protection of floors and furniture</span>
                  </li>
                </ul>
              </div>

              {/* Recent Interior Painting Projects */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent Interior Painting Projects</h2>
                <div className="space-y-3">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-primary-700">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interior Painting FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Interior Painting FAQs</h2>
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
                    to="/drywall-repair-charlotte"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Drywall Repair →
                  </Link>
                  <Link
                    to="/exterior-painting-charlotte"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Exterior Painting →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Interior Painting?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Professional prep work</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Premium paint products</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Crisp, clean lines</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Complete cleanup</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-primary-200">
                  <p className="text-sm text-primary-600">
                    <strong>Serving:</strong> Charlotte, Ballantyne, Pineville, Matthews, Mint Hill, Blakeney
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

export default InteriorPaintingCharlotte;