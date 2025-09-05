import React, { useState, useEffect, useRef } from 'react';
import AddressAutocomplete from '../common/AddressAutocomplete';
import Hero from '../components/Hero';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMessageSquare, FiMail, FiSend, FiUpload, FiMapPin, FiCheck } = FiIcons;

const GOOGLE_PLACES_SCRIPT_ID = 'google-maps-places-script';
const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    serviceType: '',
    description: '',
    photos: null
  });
  const mapRef = useRef(null);

  const serviceTypes = [
    'TV Mount Installation',
    'Furniture Assembly',
    'Painting',
    'Drywall Repair',
    'Pressure Washing',
    'Carpentry & Woodworking',
    'Wainscoting',
    'Floor Installation',
    'Garage Floor Epoxy',
    'Doors & Windows',
    'Smart Home Systems',
    'Lighting',
    'Other'
  ];

  const serviceAreas = [
    {
      name: 'Charlotte',
      description: 'Downtown Charlotte and surrounding neighborhoods',
      featured: true
    },
    {
      name: 'Ballantyne',
      description: 'Ballantyne area and nearby communities',
      featured: true
    },
    {
      name: 'Mint Hill',
      description: 'Mint Hill and eastern Charlotte suburbs',
      featured: true
    },
    {
      name: 'Pineville',
      description: 'Pineville and southern Charlotte areas',
      featured: true
    },
    {
      name: 'Matthews',
      description: 'Matthews and southeastern communities',
      featured: true
    },
    {
      name: 'Nearby Areas',
      description: 'Additional communities within reasonable distance',
      featured: false
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Format US phone numbers as (XXX) XXX-XXXX
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return digits;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, photos: e.target.files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional enforcement: ensure 10 digits
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      alert('Please enter a valid US phone number: (XXX) XXX-XXXX');
      return;
    }
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your request! We\'ll get back to you soon.');
  };

  useEffect(() => {
    const apiKey = import.meta && import.meta.env && import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;
    let cancelled = false;
    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (cancelled || !mapRef.current) return;
        const center = { lat: 35.2271, lng: -80.8431 }; // Charlotte, NC
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 11,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        });
        new window.google.maps.Marker({ position: center, map, title: 'Charlotte, NC' });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bg-white">
      <Hero 
        title="Let's Get Your To-Do List Done" 
        description="Choose your preferred way to contact us and get started with your project today." 
        showCTA={false} 
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Options */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-primary-800 mb-8">
                Contact Options
              </h2>

              {/* Call Option */}
              <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiPhone} className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary-800 mb-2">
                      Call: 980‑316‑7792
                    </h3>
                    <p className="text-primary-600 mb-4">
                      24/7 AI assistant in Beta - Call anytime, even at 5 AM or midnight for instant booking.
                    </p>
                    <a 
                      href="tel:+19803167792"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium"
                    >
                      <SafeIcon icon={FiPhone} className="w-4 h-4" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Text Option */}
              <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiMessageSquare} className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary-800 mb-2">
                      Text: 980‑316‑7792
                    </h3>
                    <p className="text-primary-600 mb-4">
                      Send photos and task list for a quick quote. Attach photos and describe your project.
                    </p>
                    <a 
                      href="sms:+19803167792?body=Hi! I'd like a quote. Here are photos and details of my project:"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium"
                    >
                      <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                      <span>Text Us</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quote Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-800 text-center">
                  <strong>Ballpark estimate—final quote after a quick walkthrough.</strong> Quotes by text are ballpark estimates; hourly rates provide exact pricing.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-soft border border-gray-200">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">
                Contact Form
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
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
                    inputMode="tel"
                    pattern="^\(\d{3}\) \d{3}-\d{4}$"
                    title="Enter a valid US phone: (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-primary-700 mb-2">
                    Address
                  </label>
                  <AddressAutocomplete
                    id="address"
                    value={formData.address}
                    onChange={(val) => setFormData(prev => ({ ...prev, address: val }))}
                    placeholder="Start typing your project address..."
                    required={false}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-primary-700 mb-2">
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-2">
                    Brief Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-180"
                    placeholder="Describe your project in detail..."
                  />
                </div>

                <div>
                  <label htmlFor="photos" className="block text-sm font-medium text-primary-700 mb-2">
                    Photo Upload
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-all duration-180">
                    <SafeIcon icon={FiUpload} className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      id="photos"
                      name="photos"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="photos"
                      className="cursor-pointer text-primary-600 hover:text-green-500 focus:text-green-500 font-medium transition-all duration-180"
                    >
                      Click to upload photos
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      Upload photos of your project for better estimates
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiSend} className="w-5 h-5" />
                  <span>Send Request</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 lg:py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
              Areas We Serve
            </h2>
            <p className="text-lg text-primary-600">
              We proudly serve Charlotte and surrounding communities with professional handyman services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Service Areas List */}
            <div>
              <h3 className="text-2xl font-bold text-primary-800 mb-8">
                Primary Service Areas
              </h3>
              <div className="space-y-6">
                {serviceAreas.map((area, index) => (
                  <div
                    key={area.name}
                    className={`p-6 rounded-lg border transition-all duration-200 ${
                      area.featured 
                        ? 'bg-white border-primary-200 shadow-soft' 
                        : 'bg-primary-100 border-primary-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        area.featured ? 'bg-primary-600' : 'bg-gray-400'
                      }`}>
                        <SafeIcon 
                          icon={area.featured ? FiCheck : FiMapPin} 
                          className="w-5 h-5 text-white" 
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-primary-800 mb-2">
                          {area.name}
                        </h4>
                        <p className="text-primary-600">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map & Service Area Badges */}
            <div>
              <h3 className="text-2xl font-bold text-primary-800 mb-8">
                Service Area Map
              </h3>
              <div className="bg-white border border-primary-200 rounded-lg h-96 overflow-hidden shadow-soft">
                <div ref={mapRef} className="w-full h-full" />
              </div>

              {/* Service Area Badges */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-primary-800 mb-4">
                  Primary Service Areas
                </h4>
                <div className="flex flex-wrap gap-3">
                  {serviceAreas.filter(area => area.featured).map((area) => (
                    <span
                      key={area.name}
                      className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {area.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-primary-600 text-white rounded-lg p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Not Sure If We Serve Your Area?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Give us a call! We may be able to serve areas outside our primary service zones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:980-316-7792"
                className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <SafeIcon icon={FiPhone} className="w-5 h-5" />
                <span>Call 980-316-7792</span>
              </a>
              <a 
                href="/book"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                <span>Book Service</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;