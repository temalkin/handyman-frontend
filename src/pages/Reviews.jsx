import React, { useState } from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar } = FiIcons;

const Reviews = () => {
  const [ratings, setRatings] = useState({
    booking: 0,
    technician: 0,
    quality: 0
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      id: 'booking',
      text: 'Clarity and ease of our booking process'
    },
    {
      id: 'technician', 
      text: "Technician's punctuality and clarity of explanation"
    },
    {
      id: 'quality',
      text: 'Quality and workmanship of the completed service'
    }
  ];

  const scaleLabels = [
    '1 = Needs improvement',
    '2 = Fair', 
    '3 = Satisfactory',
    '4 = Very good',
    '5 = Excellent'
  ];

  const handleRating = (questionId, rating) => {
    setRatings(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all questions are answered
    const allAnswered = Object.values(ratings).every(rating => rating > 0);
    if (!allAnswered) {
      alert('Please rate all questions before submitting.');
      return;
    }

    // Calculate average rating across questions
    const total = (ratings.booking || 0) + (ratings.technician || 0) + (ratings.quality || 0);
    const average = total / 3;

    // If average rating is 4 or more – redirect to Google reviews
    if (average >= 4) {
      const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;
      const googleUrl = placeId
        ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
        : '/reviews/google-demo';
      window.open(googleUrl, '_blank');
      return;
    }

    // Otherwise – open email client for private feedback
    const feedbackEmail = import.meta.env.VITE_FEEDBACK_EMAIL || 'info@handymanofsouthcharlotte.com';
    const subject = encodeURIComponent('Feedback on recent service');
    const body = encodeURIComponent(
      `Hello,\n\nI would like to share feedback about my experience.\n\nRatings:\n- Booking: ${ratings.booking}/5\n- Technician: ${ratings.technician}/5\n- Quality: ${ratings.quality}/5\n\nComments: `
    );
    window.location.href = `mailto:${feedbackEmail}?subject=${subject}&body=${body}`;
  };

  const renderStars = (questionId, currentRating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(questionId, star)}
            className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded"
          >
            <SafeIcon
              icon={FiStar}
              className={`w-6 h-6 ${
                star <= currentRating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="bg-white">
        <section className="py-8 lg:py-10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiStar} className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-green-800 mb-3">
                Review submitted successfully!
              </h2>
              <p className="text-green-700 mb-4">
                Thanks for your feedback. If you have a moment, please leave us a review on Google — it really helps others find us.
              </p>
              <a
                href="/reviews/google-demo"
                className="inline-flex items-center justify-center bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium"
              >
                Review on Google
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-whit space-y-0 pb-0">
      <section className="pt-2 pb-0 text-center mb-3">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-1">Share Your Experience</h1>
          <p className="text-primary-600">Please rate the following on a 1–5 scale.</p>
        </div>
      </section>

      <section className="py-1 lg:py-2 -space-y-10 pb-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Questions */}
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white p-4 rounded-lg shadow-soft border border-gray-100"
              >
                <div className="text-center mb-3">
                  <h3 className="text-lg font-semibold text-primary-800 mb-3">
                    {question.text}
                  </h3>
                  {renderStars(question.id, ratings[question.id])}
                </div>
                
                {/* Show current rating */}
                {ratings[question.id] > 0 && (
                  <div className="text-center">
                    <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      Rating: {ratings[question.id]} star{ratings[question.id] !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Scale Legend */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="text-base font-semibold text-primary-800 mb-3 text-center">
                Rating Scale
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
                {scaleLabels.map((label, index) => (
                  <div
                    key={index}
                    className="text-xs text-primary-700 font-medium"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium shadow-soft"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Reviews;