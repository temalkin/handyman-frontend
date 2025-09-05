import { IMAGES } from '../../config/images';
import ImageWithFallback from '../../components/ImageWithFallback';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButtons from '../../components/CTAButtons';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiPhone, FiMessageSquare } = FiIcons;

const TVMountInstallationCharlotte = () => {
  const [stickyVisible] = useState(true);

  const problemsWeSolve = [
    'Unsafe TV placement on furniture',
    'Tangled cables and messy wires',
    'Wrong viewing height and angles',
    'Lack of wall stud mounting',
    'No space for soundbars or components',
    'Difficulty accessing wall outlets'
  ];

  const processSteps = [
    {
      title: 'Wall Assessment & Planning',
      description: 'Locate wall studs, check electrical access, and determine optimal viewing height and angle'
    },
    {
      title: 'Mount Installation',
      description: 'Securely attach mount to wall studs using appropriate hardware for your TV size and weight'
    },
    {
      title: 'TV Mounting & Leveling',
      description: 'Carefully mount TV to bracket, ensure perfect level, and test all movement adjustments'
    },
    {
      title: 'Cable Management & Testing',
      description: 'Conceal cables, connect all components, and verify proper operation of all functions'
    }
  ];

  const beforeAfterImages = (IMAGES.pageMedia?.tvMountInstallationCharlotte?.beforeAfter || []).map((url, idx) => ({
    image: url,
    alt: `TV mount installation example ${idx + 1}`
  }));

  const pricingTiers = [
    {
      size: 'Basic TV Mount',
      price: '$120 - $180',
      description: 'Standard mount installation in Ballantyne homes, includes basic cable management'
    },
    {
      size: 'Full Motion Mount',
      price: '$160 - $240',
      description: 'Articulating mount with swivel and tilt in South Charlotte area'
    },
    {
      size: 'Premium Setup',
      price: '$220 - $320',
      description: 'Mount + soundbar + in-wall cable concealment in Matthews/Pineville'
    }
  ];

  const faqs = [
    {
      question: 'What TV sizes can you mount safely?',
      answer: 'We can mount TVs from 32" to 85" on most wall types. We always mount to wall studs for maximum safety and use weight-rated brackets appropriate for your specific TV model.'
    },
    {
      question: 'Can you hide the cables inside the wall?',
      answer: 'Yes, we can run cables through the wall using in-wall rated cables and proper techniques. This creates the cleanest look with no visible wires between your TV and components.'
    },
    {
      question: 'What if my wall doesn\'t have studs where I want the TV?',
      answer: 'We can install blocking between studs or use heavy-duty toggle bolts rated for your TV\'s weight. We\'ll assess your specific wall type and recommend the safest mounting method.'
    }
  ];

  const recentProjects = [
    'Ballantyne family room: 75" TV mount with soundbar and gaming console setup',
    'Pineville master bedroom: Articulating mount for optimal viewing from bed',
    'Matthews home theater: Multiple TV mounts with complete cable concealment'
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "TV Mount Installation Charlotte",
          "description": "Professional TV mounting services in Charlotte, Ballantyne, and surrounding areas. Safe wall mounting with cable management and perfect viewing angles.",
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
            "priceRange": "$120-$320"
          }
        })}
      </script>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
              TV Mount Installation in Charlotte & Ballantyne
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional TV mounting services throughout South Charlotte, Ballantyne, Matthews, and Pineville. Safe wall mounting, cable concealment, and perfect viewing angles for your home entertainment.
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
              href="sms:980-316-7792?body=Hi! I need TV mount installation in Charlotte. TV size and room photos:"
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

              {/* TV Mounting Services */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">TV Mounting Services</h2>
                <p className="text-primary-700 mb-6">
                  Transform your Charlotte home's entertainment space with professional TV mounting. We ensure safe installation, clean cable management, and optimal viewing angles for every room.
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

              {/* Our TV Mounting Process */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Our TV Mounting Process</h2>
                <p className="text-primary-700 mb-6">
                  Safe TV mounting requires proper wall preparation and stud location. Our systematic approach ensures your South Charlotte TV installation is secure, level, and professionally finished.
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

              {/* TV Mounting Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">TV Mounting Results</h2>
                <p className="text-primary-700 mb-6">
                  See our TV mounting work throughout Charlotte. Each installation demonstrates our attention to safety, aesthetics, and functionality.
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

              {/* TV Mount Installation Pricing */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">TV Mount Installation Pricing</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Ballpark estimates only.</strong> Final cost depends on TV size, mount type, wall condition, and cable management needs. Mount hardware separate unless specified.
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
                  Pricing factors: TV size and weight, mount type (fixed, tilt, or full-motion), wall material, cable concealment complexity, and additional component installation needs.
                </p>
              </div>

              {/* Why Choose Our TV Mounting */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-4">Why Choose Our TV Mounting Services</h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Always mount to wall studs for maximum safety</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Perfect level installation every time</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-primary-700">Clean cable management and wire concealment</span>
                  </li>
                </ul>
              </div>

              {/* Recent TV Mounting Projects */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent TV Mounting Projects</h2>
                <div className="space-y-3">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-primary-700">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TV Mounting FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">TV Mounting FAQs</h2>
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
                    to="/handyman-ballantyne"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-colors duration-180"
                  >
                    Handyman Ballantyne →
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
                <h3 className="text-xl font-semibold text-primary-800 mb-6">Ready for TV Mounting?</h3>
                <CTAButtons variant="default" className="flex-col space-y-3" />

                <div className="mt-8 pt-6 border-t border-primary-200">
                  <h4 className="font-semibold text-primary-800 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Stud-mounted for safety</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Perfect level every time</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>Clean cable management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                      <span>All TV sizes welcome</span>
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

export default TVMountInstallationCharlotte;