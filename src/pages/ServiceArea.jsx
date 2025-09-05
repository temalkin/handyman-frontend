import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiCheck, FiPhone } = FiIcons;

const ServiceArea = () => {
  const serviceAreas = [
    {
      name: 'Charlotte',
      description: 'Downtown Charlotte and surrounding neighborhoods',
      featured: true
    },
    {
      name: 'Ballantyne',
      description: 'Ballantyne area and nearby communities',
      featured: true
    },
    {
      name: 'Mint Hill',
      description: 'Mint Hill and eastern Charlotte suburbs',
      featured: true
    },
    {
      name: 'Pineville',
      description: 'Pineville and southern Charlotte areas',
      featured: true
    },
    {
      name: 'Matthews',
      description: 'Matthews and southeastern communities',
      featured: true
    },
    {
      name: 'Nearby Areas',
      description: 'Additional communities within reasonable distance',
      featured: false
    }
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Service Areas"
        description="We proudly serve Charlotte and surrounding communities with professional handyman services."
        showCTA={false}
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Service Areas List */}
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-8">
                Areas We Serve
              </h2>
              <div className="space-y-6">
                {serviceAreas.map((area, index) => (
                  <div
                    key={area.name}
                    className={`p-6 rounded-lg border transition-all duration-200 ${
                      area.featured 
                        ? 'bg-primary-50 border-primary-200' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        area.featured ? 'bg-primary-600' : 'bg-gray-400'
                      }`}>
                        <SafeIcon 
                          icon={area.featured ? FiCheck : FiMapPin} 
                          className="w-5 h-5 text-white" 
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary-800 mb-2">
                          {area.name}
                        </h3>
                        <p className="text-primary-600">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-8">
                Service Area Map
              </h2>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center h-96 flex items-center justify-center">
                <div>
                  <SafeIcon icon={FiMapPin} className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">
                    Charlotte Metro Area
                  </h3>
                  <p className="text-primary-600">
                    Serving Charlotte and surrounding communities
                  </p>
                </div>
              </div>

              {/* Service Area Badges */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-primary-800 mb-4">
                  Primary Service Areas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {serviceAreas.filter(area => area.featured).map((area) => (
                    <span
                      key={area.name}
                      className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {area.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-primary-600 text-white rounded-lg p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Not Sure If We Serve Your Area?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Give us a call! We may be able to serve areas outside our primary service zones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:980-316-7792"
                className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <SafeIcon icon={FiPhone} className="w-5 h-5" />
                <span>Call 980-316-7792</span>
              </a>
              <Link
                to="/book"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                <span>Book Service</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceArea;