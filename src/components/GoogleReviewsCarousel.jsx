import React, { useState, useEffect, useRef } from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronLeft, FiChevronRight, FiStar, FiExternalLink } = FiIcons;

const GoogleReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Real Google reviews via Places Details
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const GOOGLE_PLACES_SCRIPT_ID = 'google-maps-places-script';
  const loadGoogleMapsScript = (apiKey) => {
    return new Promise((resolve, reject) => {
      try {
        if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.places) {
          resolve();
          return;
        }
        const existing = document.getElementById(GOOGLE_PLACES_SCRIPT_ID);
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', (e) => reject(e));
          return;
        }
        const script = document.createElement('script');
        script.id = GOOGLE_PLACES_SCRIPT_ID;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=quarterly`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      } catch (e) { reject(e); }
    });
  };

  useEffect(() => {
    const apiKey = import.meta && import.meta.env && import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const placeId = import.meta && import.meta.env && import.meta.env.VITE_GOOGLE_PLACE_ID;
    if (!apiKey || !placeId) return; // keep silent if not configured

    let cancelled = false;
    setLoading(true);
    setError('');
    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (cancelled) return;
        const svc = new window.google.maps.places.PlacesService(document.createElement('div'));
        svc.getDetails({ placeId, fields: ['reviews', 'url', 'rating', 'user_ratings_total', 'name'] }, (res, status) => {
          if (cancelled) return;
          try {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && res && Array.isArray(res.reviews)) {
              const mapped = res.reviews.map((r, idx) => ({
                id: idx + 1,
                name: r.author_name || 'Google User',
                rating: Number(r.rating) || 5,
                date: r.relative_time_description || '',
                text: r.text || '',
                profile: r.profile_photo_url || ''
              }));
              setReviews(mapped);
            } else {
              setError('Failed to load Google reviews');
            }
          } catch (_) {
            setError('Failed to parse Google reviews');
          } finally {
            setLoading(false);
          }
        });
      })
      .catch(() => { if (!cancelled) { setError('Failed to load Google Places'); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  // Get cards per view based on screen size
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // Desktop
      if (window.innerWidth >= 768) return 2;  // Tablet
      return 1; // Mobile
    }
    return 3;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil((reviews.length || 0) / cardsPerView);

  // Auto-rotate functionality
  useEffect(() => {
    if (!prefersReducedMotion && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 20000); // 20 seconds

      return () => clearInterval(interval);
    }
  }, [totalSlides, isHovered, prefersReducedMotion]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon
        key={i}
        icon={FiStar}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Get current reviews to display
  const getCurrentReviews = () => {
    if (!Array.isArray(reviews) || reviews.length === 0) return [];
    const startIndex = currentIndex * cardsPerView;
    return reviews.slice(startIndex, startIndex + cardsPerView);
  };

  const googleReviewsUrl = "https://www.google.com/search?q=Handyman+of+South+Charlotte+reviews";

  return (
    <section className="py-16 lg:py-20 bg-gray-50" aria-label="Customer reviews from Google">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            What Customers Say on Google
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Read authentic reviews from our satisfied customers across Charlotte and surrounding areas.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
          tabIndex="0"
          role="region"
          aria-label="Customer reviews carousel"
          ref={carouselRef}
        >
          {/* Reviews Grid */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={`grid gap-6 transition-all duration-500 ease-in-out ${
                cardsPerView === 3 ? 'lg:grid-cols-3' : 
                cardsPerView === 2 ? 'md:grid-cols-2' : 'grid-cols-1'
              }`}
              aria-live="polite"
              aria-atomic="false"
            >
              {loading && (
                <div className="col-span-full text-center text-gray-500">Loading reviews...</div>
              )}
              {!loading && error && (
                <div className="col-span-full text-center text-gray-500">{error}</div>
              )}
              {!loading && !error && getCurrentReviews().map((review, index) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Review Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                        {review.profile ? (
                          <img src={review.profile} alt={review.name} className="w-10 h-10 object-cover" />
                        ) : (
                          <span className="text-primary-600 font-semibold text-sm">{review.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-800">{review.name}</h3>
                        <p className="text-sm text-primary-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-primary-700 mb-4 leading-relaxed">
                    "{review.text}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-soft hover:shadow-soft-lg transition-all duration-200 text-primary-600 hover:text-white hover:bg-green-500 focus:bg-green-500 focus:text-white z-10"
                aria-label="Previous reviews"
              >
                <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-soft hover:shadow-soft-lg transition-all duration-200 text-primary-600 hover:text-white hover:bg-green-500 focus:bg-green-500 focus:text-white z-10"
                aria-label="Next reviews"
              >
                <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-600'
                    : 'bg-gray-300 hover:bg-primary-400'
                }`}
                aria-label={`Go to review slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-200">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-all duration-180 mb-4 sm:mb-0"
          >
            <span>Read more reviews on Google</span>
            <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
          </a>
          
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium shadow-soft"
          >
            <span>Leave a Google Review</span>
            <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
          </a>
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

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeInUp {
            animation: none;
          }
          
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default GoogleReviewsCarousel;