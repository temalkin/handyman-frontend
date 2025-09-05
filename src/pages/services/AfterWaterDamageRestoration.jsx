import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare } = FiIcons;

const AfterWaterDamageRestoration = () => {
  const [stickyVisible] = useState(true);

  const problemsWeSolve = [
    'Post-mitigation drywall replacement',
    'Ceiling restoration after water damage',
    'Insulation replacement and installation', 
    'Texture matching on restored surfaces',
    'Full room rebuilds after flooding',
    'Paint and primer application for restored areas'
  ];

  const processSteps = [
    {
      title: 'Post-Mitigation Assessment',
      description: 'Verify dry conditions, assess opened areas, and plan restoration scope with homeowner'
    },
    {
      title: 'Insulation & Prep Work',
      description: 'Replace insulation if needed, prepare framing, and ensure proper vapor barriers'
    },
    {
      title: 'Drywall Installation',
      description: 'Hang new drywall, tape all seams, and apply joint compound in multiple coats'
    },
    {
      title: 'Texture, Prime & Paint',
      description: 'Match existing texture, prime all new surfaces, and paint to blend with existing areas'
    }
  ];

  const beforeAfterImages = (IMAGES.pageMedia?.waterDamageRestoration?.beforeAfter || []).map((url, idx) => ({
    image: url,
    alt: `Drywall repair example ${idx + 1}`
  }));


  const pricingTiers = [
    {
      size: 'Small Area (under 50 sq ft)',
      price: '$450 - $850',
      description: 'Bathroom ceiling or single wall section in Ballantyne homes'
    },
    {
      size: 'Medium Room (50-150 sq ft)',
      price: '$1,200 - $2,400',
      description: 'Bedroom or office restoration in South Charlotte area'
    },
    {
      size: 'Large Room/Multiple Areas',
      price: '$2,500+',
      description: 'Living room, kitchen, or multi-room restoration in Matthews/Pineville'
    }
  ];

  const faqs = [
    {
      question: 'What do you need from the mitigation company before starting?',
      answer: 'We need written confirmation that the area is dry (moisture readings within normal range), all affected materials have been removed to sound structure, and any mold remediation is complete.'
    },
    {
      question: 'Do you coordinate with insurance companies?',
      answer: 'Yes, we provide detailed estimates and work directly with insurance adjusters. We document all work with photos and can attend adjuster meetings if needed.'
    },
    {
      question: 'How long does a typical water damage restoration take?',
      answer: 'Small areas: 2-3 days. Medium rooms: 4-7 days. Large projects: 1-2 weeks. Timeline depends on drying time between coats and complexity of texture matching.'
    }
  ];

  const recentProjects = [
    'Ballantyne master bedroom: Full ceiling replacement after upstairs bathroom leak',
    'Pineville kitchen: Wall and cabinet area restoration after dishwasher leak',
    'Matthews basement: Complete room rebuild after foundation water intrusion'
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "After Water Damage Drywall Restoration Charlotte",
          "description": "Professional post-mitigation drywall and ceiling restoration in Charlotte. Complete rebuild services after water damage including insulation, drywall, texture, and paint.",
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
            "priceRange": "$450-$2500+"
          }
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              After Water Damage — Drywall & Ceiling Restoration in Charlotte
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional post-mitigation rebuild services in South Charlotte, Ballantyne, and surrounding areas. We handle the complete restoration: insulation replacement, new drywall, taping, texture matching, and paint for like-new results.
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
              href="sms:980-316-7792?body=Hi! I need water damage restoration in Charlotte. Mitigation is complete:"
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

              {/* What We Restore */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Post-Mitigation Restoration Services</h2>
                <p className="text-primary-700 mb-6">
                  After the mitigation company has dried and opened the damaged area, we handle the complete rebuild. From insulation to final paint, we restore your Charlotte home to like-new condition.
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

              {/* Our Restoration Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Water Damage Restoration Process</h2>
                <p className="text-primary-700 mb-6">
                  We don't start until mitigation is complete and the area is certified dry. Our systematic approach ensures your South Charlotte home is restored properly with no shortcuts.
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Restoration Results</h2>
                <p className="text-primary-700 mb-6">
                  See our water damage restoration work throughout Charlotte. Each project demonstrates our commitment to returning your home to pre-loss condition.
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Water Damage Restoration Pricing</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates only.</strong> Final cost depends on damage extent, insulation needs, and complexity. Insurance often covers restoration costs.
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
                  Cost factors include: square footage affected, insulation replacement needs, ceiling height, texture complexity, and number of rooms involved. We work directly with insurance adjusters for seamless claims processing.
                </p>
              </div>

              {/* Why Choose Us for Water Damage Restoration */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-4">Why Choose Us for Water Damage Restoration</h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Insurance claim experience and adjuster coordination</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Complete restoration from insulation to final paint</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Fast response to minimize additional damage</span>
                  </li>
                </ul>
              </div>

              {/* Recent Projects */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent Water Damage Restorations</h2>
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
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Water Damage Restoration FAQs</h2>
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
                    Drywall Repair Charlotte →
                  </Link>
                  <Link
                    to="/interior-painting-charlotte"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Interior Painting →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for Restoration?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Insurance claim expertise</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Complete restoration service</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Fast response times</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Like-new results</span>
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

export default AfterWaterDamageRestoration;