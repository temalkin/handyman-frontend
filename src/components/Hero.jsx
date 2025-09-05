import React from 'react';
import CTAButtons from './CTAButtons';

const Hero = ({ title, subtitle, description, showCTA = true, backgroundImage, className = '' }) => {
  return (
    <section className={`relative pt-20 lg:pt-24 pb-16 lg:pb-20 ${className}`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" 
          style={{ backgroundImage: `url(${backgroundImage})` }} 
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-800 mb-6 animate-fadeInUp">
            {title}
          </h1>
          
          {subtitle && (
            <h2 className="text-xl lg:text-2xl text-primary-600 mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </h2>
          )}
          
          {description && (
            <p className="text-lg text-primary-700 max-w-3xl mx-auto mb-8 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              {description}
            </p>
          )}
          
          {showCTA && (
            <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <CTAButtons className="justify-center" />
            </div>
          )}
        </div>
      </div>

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
    </section>
  );
};

export default Hero;