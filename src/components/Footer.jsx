import React from 'react';
import {Link} from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiPhone,FiMail} = FiIcons;

const Footer = () => {
  const quickLinks = [
    {name: 'Services', href: '/services'},
    {name: 'Book Now', href: '/book'},
    {name: 'Gallery', href: '/gallery'},
    {name: 'About', href: '/about'},
    {name: 'Contact', href: '/contact'}
  ];

  const serviceAreas = [
    'Charlotte',
    'Ballantyne',
    'Mint Hill',
    'Pineville',
    'Matthews'
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              Handyman of South Charlotte
            </h3>
            <p className="text-gray-300 mb-6">
              Professional handyman services with a personal touch. Fast response and first-time fixes that save you hours.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+19803167792"
                className="flex items-center space-x-3 text-gray-200 hover:text-green-400 focus:text-green-400 transition-all duration-180"
              >
                <SafeIcon icon={FiPhone} className="w-5 h-5" />
                <span className="font-medium text-lg" style={{whiteSpace: 'nowrap'}}>980‑316‑7792</span>
              </a>
              <a
                href="sms:+19803167792?body=Hi! I'd like to send photos for an estimate."
                className="flex items-center space-x-3 text-gray-200 hover:text-green-400 focus:text-green-400 transition-all duration-180"
              >
                <SafeIcon icon={FiMail} className="w-5 h-5" />
                <span>Text Us Photos for Quick Quote</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-300 hover:text-green-400 focus:text-green-400 transition-all duration-180"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area} className="text-gray-300">{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-gray-300 mb-4 sm:mb-0">
            © 2025 Handyman of South Charlotte. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/privacy"
              onClick={() => window.scrollTo(0, 0)}
              className="text-gray-300 hover:text-green-400 focus:text-green-400 transition-all duration-180 text-sm"
            >
              Privacy Policy & Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;