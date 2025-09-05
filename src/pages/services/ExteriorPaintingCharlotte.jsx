import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare } = FiIcons;

const ExteriorPaintingCharlotte = () => {
  const [stickyVisible] = useState(true);

  const problemsWeSolve = [
    'Faded and chalking exterior paint',
    'Peeling paint from moisture damage',
    'Wood rot and siding deterioration',
    'Trim and shutter restoration',
    'Front door and garage door painting',
    'Deck and fence staining'
  ];

  const processSteps = [
    {
      title: 'Surface Assessment & Prep',
      description: 'Power wash surfaces, scrape loose paint, sand rough areas, and prime bare wood for optimal adhesion'
    },
    {
      title: 'Repair & Caulking',
      description: 'Fill gaps and holes, replace damaged wood, caulk seams, and ensure weather-tight seal'
    },
    {
      title: 'Prime & Paint Application',
      description: 'Apply high-quality primer and two coats of exterior paint designed for Charlotte\'s climate'
    },
    {
      title: 'Final Inspection & Cleanup',
      description: 'Walk-through for touch-ups, clean all equipment, and restore landscaping protection'
    }
  ];

  const beforeAfterImages = (IMAGES.pageMedia?.exteriorPaintingCharlotte?.beforeAfter || []).map((url, idx) => ({
    image: url,
    alt: `Exterior painting example ${idx + 1}`
  }));

  const pricingTiers = [
    {
      size: 'Trim & Accent Work',
      price: '$680 - $1,200',
      description: 'Front door, shutters, and trim refresh in Ballantyne area'
    },
    {
      size: 'Single Story Home',
      price: '$2,800 - $4,500',
      description: 'Complete exterior painting for ranch homes in South Charlotte'
    },
    {
      size: 'Two Story Home',
      price: '$4,200 - $7,200',
      description: 'Full exterior painting for two-story homes in Matthews/Pineville'
    }
  ];

  const faqs = [
    {
      question: 'What exterior paint do you recommend for Charlotte weather?',
      answer: 'We use high-quality acrylic latex paints from Sherwin-Williams and Benjamin Moore that resist fading, mildew, and moisture. These paints are specifically formulated for the Southeast climate.'
    },
    {
      question: 'How do you protect landscaping during exterior painting?',
      answer: 'We cover all plants and outdoor furniture with drop cloths and plastic sheeting. Our team is careful to avoid paint drips and will rinse any accidental overspray immediately.'
    },
    {
      question: 'When is the best time for exterior painting in Charlotte?',
      answer: 'Spring through fall offers the best weather conditions. We avoid painting in high humidity, extreme heat, or when rain is forecasted within 24 hours of application.'
    }
  ];

  const recentProjects = [
    'Ballantyne colonial: Complete siding, trim, and shutter restoration',
    'Pineville ranch: Deck staining and front door refinishing project',
    'Matthews two-story: Full exterior with garage door and accent colors'
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Exterior House Painting Charlotte",
          "description": "Professional exterior house painting services in Charlotte, Ballantyne, and surrounding areas. Expert siding, trim, and deck painting for lasting curb appeal.",
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
            "priceRange": "$680-$7200"
          }
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Exterior House Painting in Charlotte & Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional exterior painting services throughout South Charlotte, Ballantyne, Matthews, and Pineville. Weather-resistant finishes, expert preparation, and lasting curb appeal for your home.
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
              href="sms:980-316-7792?body=Hi! I need exterior house painting in Charlotte. Here are photos:"
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

              {/* Exterior Painting Services */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Exterior Painting Services</h2>
                <p className="text-primary-700 mb-6">
                  Boost your Charlotte home's curb appeal with professional exterior painting. We use premium paints designed for North Carolina's climate to ensure long-lasting, beautiful results.
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

              {/* Our Exterior Painting Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Exterior Painting Process</h2>
                <p className="text-primary-700 mb-6">
                  Successful exterior painting in Charlotte requires proper preparation and weather-resistant materials. Our proven process ensures your paint job withstands humidity, UV rays, and seasonal weather changes.
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

              {/* Exterior Painting Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Exterior Painting Transformations</h2>
                <p className="text-primary-700 mb-6">
                  See our exterior painting work throughout the Charlotte area. Each project demonstrates our commitment to quality preparation and lasting finishes.
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

              {/* Exterior Painting Pricing */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Exterior Painting Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates only.</strong> Final cost depends on house size, siding condition, paint quality, and prep work needed. Paint and materials separate unless specified.
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
                  Cost factors include: house square footage, siding material and condition, trim complexity, paint quality selection, and amount of prep work required. Two-story homes require additional equipment and safety measures.
                </p>
              </div>

              {/* Why Choose Our Exterior Painting */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-4">Why Choose Our Exterior Painting Services</h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Climate-appropriate paint selection for Charlotte weather</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Thorough prep work for maximum paint adhesion</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Complete landscaping protection during work</span>
                  </li>
                </ul>
              </div>

              {/* Recent Exterior Painting Projects */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent Exterior Painting Projects</h2>
                <div className="space-y-3">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-primary-700">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exterior Painting FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Exterior Painting FAQs</h2>
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
                    to="/interior-painting-charlotte"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Interior Painting →
                  </Link>
                  <Link
                    to="/drywall-repair-charlotte"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Drywall Repair →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibol text-primary-800 mb-6">Ready for Exterior Painting?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Weather-resistant finishes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Thorough surface prep</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Premium paint products</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Landscaping protection</span>
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

export default ExteriorPaintingCharlotte;