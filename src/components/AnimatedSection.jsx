import React from 'react';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  return (
    <div 
      className={`animate-fadeInUp ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;