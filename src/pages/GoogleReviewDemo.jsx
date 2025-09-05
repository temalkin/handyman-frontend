import React from 'react';
import Hero from '../components/Hero';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiArrowLeft } = FiIcons;

const GoogleReviewDemo = () => {
  return (
    <div className="bg-white">
      <Hero
        title="Google Review Demo"
        description="This is a demonstration page for the Google review feature."
        showCTA={false}
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiStar} className="w-8 h-8 text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Google Review Demo Page
            </h2>
            
            <p className="text-lg text-blue-700 mb-6">
              This is a demo page. No live Google connection. We'll add the real link later.
            </p>
            
            <div className="bg-white border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                What would happen here:
              </h3>
              <ul className="text-left text-blue-700 space-y-2">
                <li>• Direct link to our Google Business profile</li>
                <li>• Pre-filled review form</li>
                <li>• Easy star rating selection</li>
                <li>• Option to add written feedback</li>
              </ul>
            </div>

            <a
              href="/reviews"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-180 font-medium"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Back to Reviews</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GoogleReviewDemo;