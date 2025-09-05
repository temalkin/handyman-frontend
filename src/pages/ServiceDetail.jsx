import React from 'react';
import {useParams} from 'react-router-dom';
import Hero from '../components/Hero';
import CTAButtons from '../components/CTAButtons';
import SafeIcon from '../common/SafeIcon';
import {IMAGES} from '../config/images';
import * as FiIcons from 'react-icons/fi';

const {FiCheck,FiArrowRight}=FiIcons;

const ServiceDetail=()=> {
  const {slug}=useParams();

  // Service data - in a real app,this would come from an API or database
  const serviceData={
    'tv-mount-installation': {
      name: 'TV Mount Installation',
      description: 'Professional TV mounting service with level installation,clean cable management,and concealed wiring.',
      image: IMAGES.tvMountDetail1,
      benefits: [
        'Perfect level mounting every time',
        'Clean,concealed cable management',
        'Wall stud detection and secure mounting',
        'All mounting hardware included',
        'Wall damage prevention'
      ],
      process: [
        'Wall assessment and stud location',
        'Professional mounting and leveling',
        'Cable management and testing'
      ],
      gallery: [
        IMAGES.tvMountDetail1,
        IMAGES.tvMountDetail2,
        IMAGES.tvMountDetail3
      ],
      faqs: [
        {
          question: 'What size TVs can you mount?',
          answer: 'We can mount TVs from 32" to 85" on most wall types.'
        },
        {
          question: 'Do you hide the cables?',
          answer: 'Yes,we provide clean cable management and can run cables through walls when possible.'
        }
      ]
    },
    'furniture-assembly': {
      name: 'Furniture Assembly',
      description: 'Expert furniture assembly service for all major brands. Built right,the first time.',
      image: IMAGES.furnitureDetail1,
      benefits: [
        'Expert assembly of all furniture brands',
        'Proper tool usage and techniques',
        'Time-saving professional service',
        'Warranty-compliant assembly',
        'Cleanup and packaging removal'
      ],
      process: [
        'Inventory check and preparation',
        'Professional assembly using proper tools',
        'Quality check and cleanup'
      ],
      gallery: [
        IMAGES.furnitureDetail1,
        IMAGES.furnitureDetail2,
        IMAGES.furnitureDetail3
      ],
      faqs: [
        {
          question: 'What furniture brands do you assemble?',
          answer: 'We assemble furniture from all major brands including IKEA,Wayfair,Amazon,and more.'
        },
        {
          question: 'Do you bring your own tools?',
          answer: 'Yes,we bring all necessary tools and hardware for professional assembly.'
        }
      ]
    }
    // Add more services as needed
  };

  const service=serviceData[slug] || {
    name: 'Service Not Found',
    description: 'The requested service could not be found.',
    benefits: [],
    process: [],
    gallery: [],
    faqs: []
  };

  return (
    <div className="bg-white">
      <Hero
        title={service.name}
        description={service.description}
        showCTA={false}
        backgroundImage={service.image}
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Benefits */}
              {service.benefits.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-6">
                    Why Choose Our Service
                  </h2>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit,index)=> (
                      <li
                        key={index}
                        className="flex items-center space-x-3 animate-fadeInUp"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-primary-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              {service.process.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-6">
                    Our Process
                  </h2>
                  <div className="space-y-4">
                    {service.process.map((step,index)=> (
                      <div
                        key={index}
                        className="flex items-center space-x-4 animate-fadeInUp"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-primary-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {service.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-6">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.gallery.map((image,index)=> (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden rounded-lg animate-fadeInUp"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <img
                          src={image}
                          alt={`${service.name} example ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq,index)=> (
                      <div
                        key={index}
                        className="bg-primary-50 p-6 rounded-lg border border-primary-100 animate-fadeInUp"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <h3 className="text-lg font-semibold text-primary-800 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-primary-600">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100 sticky top-24">
                <h3 className="text-xl font-semibold text-primary-800 mb-6">
                  Ready to Get Started?
                </h3>
                <CTAButtons variant="default" className="flex-col" />
                <div className="mt-6 pt-6 border-t border-primary-200">
                  <p className="text-sm text-primary-600">
                    Quick quote by text: Send photos and details to get a ballpark estimate in minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;