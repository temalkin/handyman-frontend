import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft } = FiIcons;

const ServiceFooterNav = () => {
  const location = useLocation();

  // All available services
  const allServices = [
    { name: 'Drywall Repair', slug: 'drywall-repair-charlotte' },
    { name: 'Water Damage Restoration', slug: 'after-water-damage-drywall-restoration-charlotte' },
    { name: 'Interior Painting', slug: 'interior-painting-charlotte' },
    { name: 'Exterior Painting', slug: 'exterior-painting-charlotte' },
    { name: 'TV Mount Installation', slug: 'tv-mount-installation-charlotte' },
    { name: 'LVP Floor Installation', slug: 'lvp-floor-installation-charlotte' }
  ];

  // Get current service slug
  const getCurrentSlug = () => {
    const path = location.pathname;
    // Remove leading slash and match against our service slugs
    const slug = path.substring(1);
    return allServices.find(service => service.slug === slug) ? slug : null;
  };

  // Randomize and filter other services (exclude current page)
  const otherServices = useMemo(() => {
    const currentSlug = getCurrentSlug();
    const filtered = allServices.filter(service => service.slug !== currentSlug);
    
    // Shuffle array and take 4-6 services
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [location.pathname]);

  // Only render on service pages
  if (!getCurrentSlug()) {
    return null;
  }

  return (
    <nav 
      aria-label="Service page footer navigation" 
      className="border-t border-gray-200 bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Services Button */}
        <div className="text-center mb-6">
          <Link
            to="/services"
            aria-label="Go back to all services page"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 hover:shadow-soft transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>
        </div>

        {/* Other Services Links */}
        <div className="text-center">
          <p className="text-primary-700 mb-4 font-medium">
            Or explore other services:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {otherServices.map((service) => (
              <Link
                key={service.slug}
                to={`/${service.slug}`}
                aria-label={`Go to ${service.name} service`}
                className="inline-block bg-white text-primary-600 px-4 py-2 rounded-lg text-sm font-medium border border-primary-200 hover:bg-primary-50 hover:shadow-soft hover:border-primary-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ServiceFooterNav;