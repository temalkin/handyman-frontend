import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare } = FiIcons;

const DrywallRepairCharlotte = () => {
  const [stickyVisible] = useState(true);

  const problemsWeSolve = [
    'Nail pops and screw holes',
    'Hairline and settlement cracks', 
    'Small to large holes from accidents',
    'Water damage patches (post-mitigation)',
    'Corner bead repairs and replacements',
    'Textured surface matching and blending'
  ];

  const processSteps = [
    {
      title: 'Damage Assessment',
      description: 'Evaluate hole size, surrounding drywall condition, and texture type to determine repair approach'
    },
    {
      title: 'Cut & Prepare',
      description: 'Cut damaged area to sound drywall, prepare patch material, and protect surrounding surfaces'
    },
    {
      title: 'Patch & Compound',
      description: 'Install backing material if needed, apply joint compound in thin, feathered coats'
    },
    {
      title: 'Sand & Texture Match',
      description: 'Sand smooth, apply matching texture, prime and paint to blend seamlessly with existing wall'
    }
  ];

  const beforeAfterImages = (IMAGES.pageMedia?.drywallRepairCharlotte?.beforeAfter || []).map((url, idx) => ({
    image: url,
    alt: `Drywall repair example ${idx + 1}`
  }));

  const pricingTiers = [
    {
      size: 'Small Patch (up to 6")',
      price: '$95 - $175',
      description: 'Nail holes, small cracks, minor wall repairs in Ballantyne area'
    },
    {
      size: 'Medium Hole (6" - 12")',
      price: '$180 - $320', 
      description: 'Doorknob holes, moderate damage in South Charlotte homes'
    },
    {
      size: 'Large Repair/Ceiling',
      price: '$350+',
      description: 'Extensive damage, ceiling work, textured surfaces in Matthews/Pineville'
    }
  ];

  const faqs = [
    {
      question: 'Will the repair be invisible after painting?',
      answer: 'Yes, our multi-coat process and texture matching techniques ensure repairs blend seamlessly. We prime and use matching paint sheen so you can\'t tell where the repair was made.'
    },
    {
      question: 'How long before I can paint over the repair?',
      answer: 'Joint compound typically needs 24 hours to fully dry before priming and painting. We\'ll let you know the exact timeline based on humidity and patch size.'
    },
    {
      question: 'Do you repair textured walls like popcorn or knockdown?',
      answer: 'Absolutely. We match existing wall textures including orange peel, knockdown, skip trowel, and light popcorn textures common in South Charlotte homes.'
    }
  ];

  const recentProjects = [
    'Ballantyne townhome: Multiple nail pop repairs in main hallway',
    'Pineville ranch: Large hole repair from furniture move damage', 
    'Matthews two-story: Ceiling crack repair from house settling'
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Drywall Repair Charlotte",
          "description": "Professional drywall repair and patching services in Charlotte, Ballantyne, and surrounding areas. Expert hole patching, crack repair, and texture matching.",
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
            "priceRange": "$95-$350+"
          }
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              Drywall Repair in Charlotte & Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional drywall patching and repair throughout South Charlotte, Ballantyne, Matthews, and Pineville. We patch holes, fix cracks, and blend texture so repairs disappear completely.
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
              href="sms:980-316-7792?body=Hi! I need drywall repair in Charlotte. Here are photos:"
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
              
              {/* Problems We Solve */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Drywall Problems We Fix</h2>
                <p className="text-primary-700 mb-6">
                  From small nail pops to large holes, we repair all types of drywall damage in Charlotte area homes. Our process ensures invisible repairs that blend perfectly with your existing walls.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problemsWeSolve.map((problem, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-primary-700">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Drywall Repair Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Drywall Repair Process</h2>
                <p className="text-primary-700 mb-6">
                  Every drywall repair in South Charlotte gets our systematic approach for lasting, invisible results. We don't just patch—we restore your wall to like-new condition.
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

              {/* Before & After Results */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Before & After Results</h2>
                <p className="text-primary-700 mb-6">
                  See the quality of our drywall repairs throughout the Charlotte area. Each project showcases our attention to detail and commitment to invisible repairs.
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

              {/* Pricing & What Affects Cost */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Drywall Repair Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates only.</strong> Final pricing depends on damage extent, texture complexity, and accessibility. Text photos for accurate quote.
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
                  Factors affecting cost: hole size, wall texture type, number of coats needed, ceiling height, and furniture moving requirements. Most Charlotte drywall repairs are completed same-day.
                </p>
              </div>

              {/* Why Choose Us for Drywall Repair */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-4">Why Charlotte Homeowners Choose Our Drywall Repair</h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Invisible repairs—you can't tell where damage was</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Same-day completion for most repairs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Perfect texture matching on all wall types</span>
                  </li>
                </ul>
              </div>

              {/* Recent Projects */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent Drywall Repairs in Charlotte Area</h2>
                <div className="space-y-3">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-primary-700">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Drywall Repair FAQs</h2>
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
                    Interior Painting Charlotte →
                  </Link>
                  <Link
                    to="/after-water-damage-drywall-restoration-charlotte"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Water Damage Restoration →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Your Drywall Repair?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Local team, high accountability</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Invisible repair results</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Same-day completion</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Clean job sites</span>
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

export default DrywallRepairCharlotte;