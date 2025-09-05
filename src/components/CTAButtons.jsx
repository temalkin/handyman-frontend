import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMessageSquare, FiCalendar } = FiIcons;

const CTAButtons = ({ variant = 'default', className = '', showHeadline = true }) => {
  const location = useLocation();

  const headlineMap = {
    'tv-mount-installation': 'Mount Your TV Safely & Cleanly',
    'furniture-assembly': 'Ready to Assemble It Right?',
    'painting': 'Refresh Your Space with Pro Painting',
    'drywall-repair': 'Fix Cracks & Holes the Right Way',
    'pressure-washing': 'Restore Your Curb Appeal',
    'carpentry-woodworking': 'Custom Carpentry, Built Right',
    'wainscoting': 'Elegant Wainscoting, Precision Installed',
    'floor-installation': 'Install Beautiful, Durable Floors',
    'garage-floor-epoxy': 'Upgrade Your Garage Floor with Epoxy',
    'doors-windows-installation': 'Expert Doors & Windows Installation',
    'doors-windows-treatment': 'Perfect Blinds, Shades & Curtains',
    'lighting': 'Brighten Your Home with Expert Lighting',
    'smart-home-systems': 'Smarter Home, Seamless Setup'
  };

  const addArticle = (serviceName) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const firstLetter = serviceName.toLowerCase().charAt(0);
    const article = vowels.includes(firstLetter) ? 'an' : 'a';
    return `Ready to book ${article} ${serviceName}?`;
  };

  const getServiceSlug = () => {
    const path = location.pathname;
    if (path.startsWith('/services/')) {
      return path.replace('/services/', '');
    }
    return null;
  };

  const getHeadline = () => {
    const slug = getServiceSlug();
    if (!slug) return null;

    if (headlineMap[slug]) {
      return headlineMap[slug];
    }

    const serviceName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return addArticle(serviceName);
  };

  const headline = showHeadline ? getHeadline() : null;

  const buttonBaseClasses = "inline-flex items-center justify-center min-h-[56px] px-6 py-4 rounded-2xl font-medium transition-all duration-180 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 whitespace-nowrap hover:bg-green-500 focus:bg-green-500";

  const buttonVariants = {
    primary: "bg-primary-600 text-white shadow-soft hover:shadow-soft-lg",
    outline: "border-2 border-primary-600 text-primary-600 hover:text-white hover:border-green-500 focus:text-white focus:border-green-500",
    light: "bg-white text-primary-600 border border-primary-200 hover:text-white hover:border-green-500 focus:text-white focus:border-green-500 shadow-soft"
  };

  return (
    <div className={className}>
      {headline && (
        <h3 className="text-xl font-semibold text-primary-800 mb-6 text-center">
          {headline}
        </h3>
      )}
      <div className="flex flex-col space-y-3 sm:grid sm:grid-cols-1 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-3 sm:space-y-0">
        <Link
          to="/book"
          className={`${buttonBaseClasses} ${buttonVariants.primary}`}
          aria-label="Book your service now"
          onClick={() => window.scrollTo(0, 0)}
        >
          <SafeIcon icon={FiCalendar} className="w-5 h-5 mr-2" />
          <span>Book Now</span>
        </Link>

        <a
          href="sms:+19803167792?body=Hi! I'd like to send photos for an estimate."
          className={`${buttonBaseClasses} ${buttonVariants.outline}`}
          aria-label="Send us a text message with photos"
        >
          <SafeIcon icon={FiMessageSquare} className="w-5 h-5 mr-2" />
          <span>Text Us</span>
        </a>

        <a
          href="tel:+19803167792"
          className={`${buttonBaseClasses} ${buttonVariants.light}`}
          aria-label="Call us at 980-316-7792"
        >
          <SafeIcon icon={FiPhone} className="w-5 h-5 mr-2" />
          <span style={{ whiteSpace: 'nowrap' }}>Call 980‑316‑7792</span>
        </a>
      </div>
    </div>
  );
};

export default CTAButtons;