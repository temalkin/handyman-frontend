import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare } = FiIcons;

const LVPFloorInstallationCharlotte = () => {
  const [stickyVisible] = useState(true);

  const problemsWeSolve = [
    'Outdated carpet and worn flooring',
    'Water-damaged hardwood floors',
    'Uneven subfloor conditions',
    'Poor transitions between rooms',
    'Squeaky and creaky floors',
    'Pet damage and staining'
  ];

  const processSteps = [
    {
      title: 'Subfloor Assessment & Prep',
      description: 'Check subfloor flatness, repair squeaks, and ensure proper moisture levels before installation'
    },
    {
      title: 'Acclimation & Planning',
      description: 'Allow flooring to acclimate, plan layout direction, and calculate expansion gaps needed'
    },
    {
      title: 'Installation & Cutting',
      description: 'Install underlayment, cut and fit LVP planks with proper staggered pattern and tight seams'
    },
    {
      title: 'Transitions & Trim',
      description: 'Install transition strips, quarter-round molding, and ensure clean finished edges'
    }
  ];

  const beforeAfterImages = (IMAGES.pageMedia?.lvpFloorInstallationCharlotte?.beforeAfter || []).map((url, idx) => ({
    image: url,
    alt: `LVP flooring installation example ${idx + 1}`
  }));


  const pricingTiers = [
    {
      size: 'Small Room (under 200 sq ft)',
      price: '$3.50 - $5.25/sq ft',
      description: 'Bedroom or office LVP installation in Ballantyne area'
    },
    {
      size: 'Medium Room (200-400 sq ft)',
      price: '$3.25 - $4.75/sq ft',
      description: 'Living room or kitchen flooring in South Charlotte'
    },
    {
      size: 'Large Area (400+ sq ft)',
      price: '$3.00 - $4.25/sq ft',
      description: 'Open concept or multiple rooms in Matthews/Pineville'
    }
  ];

  const faqs = [
    {
      question: 'How long does LVP flooring need to acclimate?',
      answer: 'Most LVP requires 48-72 hours to acclimate in the room where it will be installed. This prevents expansion and contraction issues after installation. We coordinate delivery timing accordingly.'
    },
    {
      question: 'Can LVP be installed over existing flooring?',
      answer: 'In many cases, yes. LVP can often go over tile, hardwood, or concrete if the surface is level and stable. We\'ll assess your existing floor and recommend the best approach.'
    },
    {
      question: 'What about transitions between rooms and different floor heights?',
      answer: 'We install appropriate transition strips for doorways and height changes. Options include T-molding, reducers, and thresholds to create smooth, professional transitions between different flooring types.'
    }
  ];

  const recentProjects = [
    'Ballantyne townhome: 1,200 sq ft open concept LVP with kitchen island cutouts',
    'Pineville ranch: Master suite LVP replacement including bathroom transitions',
    'Matthews two-story: Main level LVP installation with stair nosing and trim'
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "LVP Floor Installation Charlotte",
          "description": "Professional luxury vinyl plank flooring installation in Charlotte, Ballantyne, and surrounding areas. Expert subfloor prep, tight seams, and clean transitions.",
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
            "priceRange": "$3.00-$5.25 per sq ft"
          }
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              LVP Floor Installation in Charlotte & Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional luxury vinyl plank flooring installation throughout South Charlotte, Ballantyne, Matthews, and Pineville. Expert subfloor preparation, tight seams, and clean transitions for lasting beauty.
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
              href="sms:980-316-7792?body=Hi! I need LVP flooring installation in Charlotte. Room size and photos:"
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

              {/* LVP Installation Services */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">LVP Flooring Installation</h2>
                <p className="text-primary-700 mb-6">
                  Upgrade your Charlotte home with luxury vinyl plank flooring. Our professional installation ensures proper subfloor preparation, tight seams, and beautiful transitions that last for years.
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

              {/* Our LVP Installation Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our LVP Installation Process</h2>
                <p className="text-primary-700 mb-6">
                  Successful LVP installation starts with proper subfloor preparation. Our proven process ensures your South Charlotte flooring installation is smooth, tight, and professionally finished.
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

              {/* LVP Installation Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">LVP Installation Results</h2>
                <p className="text-primary-700 mb-6">
                  See our luxury vinyl plank installations throughout Charlotte. Each project showcases our precision cutting, tight seams, and professional finishing work.
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

              {/* LVP Installation Pricing */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">LVP Installation Pricing in Charlotte</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates only.</strong> Final cost depends on room layout, subfloor condition, and transition complexity. LVP materials separate unless specified.
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
                  Pricing factors: square footage, subfloor preparation needs, number of cuts around obstacles, transition strips required, and removal of existing flooring. Larger areas typically have lower per-square-foot costs.
                </p>
              </div>

              {/* Why Choose Our LVP Installation */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-4">Why Choose Our LVP Installation</h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Proper subfloor prep for long-lasting results</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Tight seams and precise cutting around obstacles</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Professional transitions and quarter-round trim</span>
                  </li>
                </ul>
              </div>

              {/* Recent LVP Projects */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent LVP Installation Projects</h2>
                <div className="space-y-3">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-primary-700">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LVP Installation FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">LVP Installation FAQs</h2>
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
                    to="/handyman-south-charlotte"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Handyman South Charlotte →
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
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for LVP Flooring?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Expert subfloor prep</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Tight, precise seams</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Professional transitions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Clean finished edges</span>
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

export default LVPFloorInstallationCharlotte;