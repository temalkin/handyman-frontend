import React,{useState} from 'react';
import Hero from '../components/Hero';
import GoogleReviewsCarousel from '../components/GoogleReviewsCarousel';
import SafeIcon from '../common/SafeIcon';
import AddressAutocomplete from '../common/AddressAutocomplete';
import {IMAGES} from '../config/images';
import ImageWithFallback from '../components/ImageWithFallback';
import * as FiIcons from 'react-icons/fi';
import HourlyBookingForm from '../components/hourly/HourlyBookingForm';
import AIAssistantOrder from '../components/ai/AIAssistantOrder';
import MainCategoryStep from '../components/steps/MainCategoryStep';
import ServiceGroupStep from '../components/steps/ServiceGroupStep';
import ProjectDetailsStep from '../components/steps/ProjectDetailsStep';
import ContactInfoStep from '../components/steps/ContactInfoStep';
import { serviceData } from '../data/serviceData';
import FormToggle from '../components/FormToggle';

const {FiList,FiClock,FiMessageSquare,FiPhone,FiMail,FiSend,FiCheck}=FiIcons;

const Book=()=> {
  const [activeTab,setActiveTab]=useState('scope');
  const [formData,setFormData]=useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    details: '',
    honeypot: '' // Anti-spam field
  });
  const [scopeStep, setScopeStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [formErrors,setFormErrors]=useState({});
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);

  const tabs=[
    {id: 'scope',label: 'Order by Scope',icon: FiList},
    {id: 'hourly',label: 'Hourly Order',icon: FiClock},
    {id: 'ai',label: 'AI Assistant Order (Beta)',icon: FiMessageSquare}
  ];

  const steps=[
    'Service Type',
    'Service Group',
    'Details',
    'Project Info',
    'Contact'
  ];

  const handleInputChange=(e)=> {
    const {name,value}=e.target;
    setFormData(prev=> ({...prev,[name]: value}));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev=> ({...prev,[name]: ''}));
    }
  };

  const formatPhoneNumber=(value)=> {
    // Remove all non-numeric characters
    const phoneNumber=value.replace(/\D/g,'');
    // Format as (###) ###-####
    if (phoneNumber.length >=6) {
      return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`;
    } else if (phoneNumber.length >=3) {
      return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
    } else {
      return phoneNumber;
    }
  };

  const handlePhoneChange=(e)=> {
    const formatted=formatPhoneNumber(e.target.value);
    setFormData(prev=> ({...prev,phone: formatted}));
    if (formErrors.phone) {
      setFormErrors(prev=> ({...prev,phone: ''}));
    }
  };

  const validateForm=()=> {
    const errors={};
    // Check honeypot
    if (formData.honeypot) {
      errors.general='Spam detected';
      return errors;
    }
    // Name validation
    if (!formData.name.trim()) {
      errors.name='Name is required';
    }
    // Phone validation
    const phoneDigits=formData.phone.replace(/\D/g,'');
    if (!phoneDigits) {
      errors.phone='Phone number is required';
    } else if (phoneDigits.length !==10) {
      errors.phone='Please enter a valid 10-digit phone number';
    }
    // Email validation
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email='Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email='Please enter a valid email address';
    }
    return errors;
  };

  const handleSubmit=async (e)=> {
    e.preventDefault();
    const errors=validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate form submission
      const submissionData={
        ...formData,
        source_page: 'Book',
        timestamp: new Date().toISOString()
      };
      // In a real implementation,you would send this to your form handler
      console.log('Form submission:',submissionData);
      // Simulate API delay
      await new Promise(resolve=> setTimeout(resolve,1000));
      setIsSubmitted(true);
      // Reset form after successful submission
      setTimeout(()=> {
        setFormData({
          name: '',
          address: '',
          phone: '',
          email: '',
          details: '',
          honeypot: ''
        });
        setIsSubmitted(false);
      },5000);
    } catch (error) {
      console.error('Form submission error:',error);
      setFormErrors({general: 'Something went wrong. Please try again.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section with Contact Form */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form - Shows first on mobile */}
            <div className="order-1 lg:order-2">
              <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200 sticky top-24 max-w-sm mx-auto lg:max-w-none">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-primary-800 mb-2">
                    Get Your Free Estimate
                  </h2>
                  <p className="text-primary-600 text-sm">
                    Tell us about your project and we'll get back to you quickly
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Thanks! We've received your request.
                    </h3>
                    <p className="text-green-600 text-sm mb-4">
                      We'll reach out within 2 business hours (Mon–Sat,8:00 AM–6:00 PM). If you submitted after hours or on Sunday,we'll contact you the next business day.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                      <h4 className="text-green-800 font-semibold mb-3 text-center">
                        How to prepare for our call
                      </h4>
                      <p className="text-green-700 text-sm mb-2">
                        <strong>Text photos to: 980-316-7792</strong>
                      </p>
                      <p className="text-green-700 text-sm mb-2">
                        <strong>Send:</strong>
                      </p>
                      <ul className="text-green-700 text-xs space-y-1 ml-3">
                        <li>• A wide shot of the area we'll work on.</li>
                        <li>• 2–3 close-ups so we can see materials,edges,and shapes (wall/ceiling/object).</li>
                        <li>• A photo of the item to be installed or a product link.</li>
                        <li>• (Optional) One photo with a tape measure in frame for scale.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      style={{display: 'none'}}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                    {/* Two-column grid for first 4 fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium text-primary-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Your full name"
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                        )}
                      </div>
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-medium text-primary-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          maxLength="14"
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="(555) 123-4567"
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-primary-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="your.email@example.com"
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>
                      {/* Address */}
                      <div>
                        <label htmlFor="address" className="block text-xs font-medium text-primary-700 mb-1">
                          Address
                        </label>
                        <AddressAutocomplete
                          id="address"
                          value={formData.address}
                          onChange={(val)=> setFormData(prev=> ({...prev, address: val}))}
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                          placeholder="Street,City,State,ZIP"
                        />
                      </div>
                    </div>
                    {/* Details - Full width */}
                    <div>
                      <label htmlFor="details" className="block text-xs font-medium text-primary-700 mb-1">
                        Details of Project
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        rows={5}
                        value={formData.details}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180 resize-vertical"
                        placeholder="Describe your project in detail..."
                      />
                    </div>
                    {/* General Error */}
                    {formErrors.general && (
                      <div className="text-red-500 text-xs text-center">
                        {formErrors.general}
                      </div>
                    )}
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <SafeIcon icon={FiSend} className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                    </button>
                    {/* Secondary Call Link */}
                    <div className="text-center">
                      <a
                        href="tel:+19803167792"
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-all duration-180 text-sm"
                      >
                        <SafeIcon icon={FiPhone} className="w-3 h-3" />
                        <span>Call: 980‑316‑7792</span>
                      </a>
                    </div>
                    {/* Compliance Note */}
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      By submitting,you agree to receive updates related to your request. To opt out of texts,reply STOP to the number on our website.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Hero Content - Shows second on mobile */}
            <div className="order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold text-primary-800 mb-6 animate-fadeInUp">
                  Book Your Service
                </h1>
                <p className="text-xl text-primary-600 mb-8 leading-relaxed animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                  Choose your preferred booking method and get started with your project today.
                </p>
                {/* Booking Flow Image */}
                <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                  <div className="bg-white rounded-lg shadow-soft border border-gray-200 overflow-hidden">
                    <ImageWithFallback
                      src={IMAGES.bookProcess}
                      alt="Professional handyman service booking process"
                      className="w-full h-64 lg:h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Tabs */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <FormToggle formType={activeTab} onFormTypeChange={setActiveTab} />

          {/* Steps */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary-800 text-center mb-6">
              Booking Steps
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {steps.map((step,index)=> (
                <div
                  key={step}
                  className="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-lg border border-primary-100"
                >
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-primary-700 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Forms by selected tab */}
          {activeTab === 'hourly' && (
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <HourlyBookingForm
                formData={formData}
                onDataChange={(key, val)=> setFormData(prev=> ({...prev, [key]: val}))}
                onSubmit={()=> console.log('Hourly submit')}
              />
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="bg-white p-0 rounded-xl shadow-soft border border-gray-100">
              <AIAssistantOrder
                formData={formData}
                onDataChange={(key, val)=> setFormData(prev=> ({...prev, [key]: val}))}
                onSubmit={()=> console.log('AI submit')}
              />
            </div>
          )}

          {activeTab === 'scope' && (
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              {scopeStep === 1 && (
                <MainCategoryStep
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                  onNext={()=> setScopeStep(2)}
                />
              )}
              {scopeStep === 2 && (
                <ServiceGroupStep
                  mainCategories={selectedCategories}
                  selectedGroups={selectedGroups}
                  onGroupsChange={setSelectedGroups}
                  onPrev={()=> setScopeStep(1)}
                  onNext={()=> setScopeStep(3)}
                  serviceData={serviceData}
                />
              )}
              {scopeStep === 3 && (
                <ProjectDetailsStep
                  formData={formData}
                  onDataChange={(key, val)=> setFormData(prev=> ({...prev, [key]: val}))}
                  onPrev={()=> setScopeStep(2)}
                  onNext={()=> setScopeStep(4)}
                />
              )}
              {scopeStep === 4 && (
                <ContactInfoStep
                  formData={formData}
                  onDataChange={(key, val)=> setFormData(prev=> ({...prev, [key]: val}))}
                  onPrev={()=> setScopeStep(3)}
                  onSubmit={()=> console.log('Scope submit', { selectedCategories, selectedGroups, formData })}
                />
              )}
            </div>
          )}

          {/* AI Assistant Note */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <p className="text-blue-800">
              <strong>24/7 AI Assistant (Beta)</strong> — Quality improving;a human tech reviews every booking.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews Carousel */}
      <GoogleReviewsCarousel />

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
    </div>
  );
};

export default Book;