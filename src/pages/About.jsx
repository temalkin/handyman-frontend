import React from 'react';
import {Link} from 'react-router-dom';
import Hero from '../components/Hero';
import SafeIcon from '../common/SafeIcon';
import {IMAGES} from '../config/images';
import ImageWithFallback from '../components/ImageWithFallback';
import * as FiIcons from 'react-icons/fi';

const {FiUsers,FiAward,FiShield,FiHeart,FiPhone,FiMessageSquare,FiMail}=FiIcons;

const About=()=> {
  const values=[
    {
      icon: FiUsers,
      title: 'Personal Touch',
      description: 'Every project receives individual attention and care from our experienced team.'
    },
    {
      icon: FiAward,
      title: 'Excellence',
      description: 'We strive for the highest quality in every job,no matter how big or small.'
    },
    {
      icon: FiShield,
      title: 'Reliability',
      description: 'Count on us to arrive on time and complete your project as promised.'
    },
    {
      icon: FiHeart,
      title: 'Integrity',
      description: 'Honest pricing,transparent communication,and ethical business practices.'
    }
  ];

  const galleryImages = (IMAGES.pageMedia?.about?.gallery || []).map((url, idx) => ({
    image: url,
    alt: `About example ${idx + 1}`
  }));

  return (
    <div className="bg-white">
      <Hero
        title="About Us"
        description="Professional handyman services with a personal touch. Learn about our story,values,and commitment to excellence."
        showCTA={false}
      />

      {/* Our Story */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-primary-700 leading-relaxed">
                <p>
                  We founded Handyman of South Charlotte in 2024 with 15 years of hands-on experience. After seeing too many homeowners struggle with unreliable providers,we set out to do things differently.
                </p>
                <p>
                  Owner-led,detail-focused service for everyday comfort and long-term reliability. Customers across Charlotte,Ballantyne,Mint Hill,Pineville,and Matthews trust our work.
                </p>
                <p>
                  We're here for more than quick fixes—we're your handyman partner for years to come.
                </p>
              </div>
            </div>
            <div className="relative animate-slideInRight">
              <ImageWithFallback
                src={IMAGES.aboutStory}
                alt="Professional handyman at work"
                className="w-full h-96 object-cover rounded-lg shadow-soft"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your Fix Section */}
      <section className="py-16 lg:py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
              Your Fix—Done Right,Right Away
            </h2>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto">
              Quick access to a pro who respects your time. Professional tools,clean and organized workspace.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h3 className="text-2xl font-bold text-primary-800 mb-6">
                Fast Booking System (AI Beta)
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiPhone} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary-800 mb-2">
                      Call anytime (even 5 AM or midnight)
                    </h4>
                    <p className="text-primary-600">
                      AI assistant books your service instantly
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiMail} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary-800 mb-2">
                      Contact form
                    </h4>
                    <p className="text-primary-600">
                      Send requests any time through our online form
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiMessageSquare} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary-800 mb-2">
                      Prefer texting?
                    </h4>
                    <p className="text-primary-600">
                      Send a task list and photos—get a fast quote
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-slideInRight">
              <ImageWithFallback
                src={IMAGES.aboutProcess}
                alt="Professional tools and workspace"
                className="w-full h-96 object-cover rounded-lg shadow-soft"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto">
              These core principles guide everything we do,from the smallest repair to the largest renovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value,index)=> (
              <div
                key={value.title}
                className="text-center animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={value.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-primary-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of satisfied customers who trust us with their home improvement needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19803167792"
              className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-green-100 focus:bg-green-100 transition-all duration-180 font-medium"
            >
              <SafeIcon icon={FiPhone} className="w-5 h-5" />
              <span style={{whiteSpace: 'nowrap'}}>Call 980‑316‑7792</span>
            </a>
            <Link
              to="/book"
              onClick={()=> window.scrollTo(0,0)}
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-green-500 hover:border-green-500 focus:bg-green-500 focus:border-green-500 transition-all duration-180 font-medium"
            >
              Book Your Service
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;