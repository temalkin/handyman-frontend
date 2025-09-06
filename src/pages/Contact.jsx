import React, { useState, useEffect, useRef } from 'react';
import AddressAutocomplete from '../common/AddressAutocomplete';
import Hero from '../components/Hero';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { storeRequest, sendTelegram, sendSms, signFileUpload, commitUploadedFile } from '../common/BackendAPI';
import { buildTelegramMessage } from '../common/MessageFormatter';

const { FiPhone, FiMessageSquare, FiMail, FiSend, FiUpload, FiMapPin, FiCheck, FiX } = FiIcons;

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
    photos: null,
    consentToText: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
    try {
      const list = Array.from(e.target.files || [])
      if (list.length === 0) return
      const existing = Array.isArray(formData.photos) ? formData.photos : []
      const room = Math.max(0, 10 - existing.length)
      const toAdd = list.slice(0, room).map(f => ({ file: f, name: f.name, type: f.type, size: f.size, url: URL.createObjectURL(f) }))
      setFormData(prev => ({ ...prev, photos: [...existing, ...toAdd] }))
      // reset input value to allow re-select same files
      try { e.target.value = '' } catch (_) {}
    } catch (_) {}
  };

  const removePhotoAt = (idx) => {
    const items = Array.isArray(formData.photos) ? [...formData.photos] : []
    if (idx < 0 || idx >= items.length) return
    try { if (items[idx] && items[idx].url && items[idx].url.startsWith('blob:')) URL.revokeObjectURL(items[idx].url) } catch (_) {}
    items.splice(idx, 1)
    setFormData(prev => ({ ...prev, photos: items }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setErrorMsg('Please enter a valid US phone number: (XXX) XXX-XXXX');
      return;
    }

    setSubmitting(true);
    // session id
    let sessionId = '';
    try {
      const K = 'site_session_id';
      sessionId = localStorage.getItem(K) || '';
      if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem(K, sessionId);
      }
    } catch (_) {}

    try {
      // 1) store request
      const resp = await storeRequest({
        source: 'website',
        form_type: 'contact',
        session_id: sessionId || undefined,
        contact: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          consentToText: !!formData.consentToText,
        },
        meta: {
          source_page: 'Contact',
          description: formData.description,
          serviceType: formData.serviceType || ''
        }
      });
      const formId = (resp && (resp.form_id || resp.request_id)) || '';

      // 2) upload photos via presigned flow (if any) and collect public URLs
      try {
        const items = Array.isArray(formData.photos) ? formData.photos : [];
        var photoLinks = [];
        for (const it of items) {
          const f = (it && it.file) ? it.file : it;
          if (!f) continue;
          const sig = await signFileUpload({ filename: f.name || 'photo.jpg', contentType: f.type || 'application/octet-stream', formId });
          await fetch(sig.put_url, { method: 'PUT', headers: { 'Content-Type': sig.content_type || f.type || 'application/octet-stream' }, body: f });
          const committed = await commitUploadedFile({ formId, key: sig.key, contentType: sig.content_type || f.type, size: f.size });
          if (committed && committed.url) {
            photoLinks.push(committed.url);
          }
        }
      } catch (_) {}

      // 3) telegram notification (with photo links if present)
      try {
        const msg = buildTelegramMessage('New Contact (Contact page)', {
          Name: formData.name,
          Phone: formData.phone,
          Address: formData.address || '-',
          Service: formData.serviceType || '-',
          Description: formData.description || '-',
          Photos: Array.isArray(formData.photos) ? formData.photos.length : 0,
          FormID: formId
        });
        const linksText = (typeof photoLinks !== 'undefined' && Array.isArray(photoLinks) && photoLinks.length > 0)
          ? ('\n' + photoLinks.map((u, i) => `Photo ${i + 1}: ${u}`).join('\n'))
          : '';
        await sendTelegram(msg + linksText);
      } catch (_) {}

      // 4) sms confirmation to client
      try {
        const normalizePhoneE164US = (value) => {
          const digits = String(value || '').replace(/\D/g, '')
          if (!digits) return ''
          if (digits.length === 10) return `+1${digits}`
          if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
          return digits.startsWith('+') ? digits : `+${digits}`
        }
        const to = normalizePhoneE164US(formData.phone)
        if (to && formData.consentToText) {
          const smsText = `Hi${formData.name ? ' ' + formData.name : ''}! Thanks for contacting Handyman of South Charlotte. We received your request and will reach out soon.`
          await sendSms({ to, text: smsText, subject: 'Contact Request' })
        }
      } catch (_) {}

      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Contact submit failed', err);
      setErrorMsg('Submission failed. Please try again.');
      setSubmitting(false);
    }
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

  if (submitted) {
    return (
      <div className="bg-white">
        <Hero 
          title="Successfully sent!" 
          description="Thank you for your request. We will reach out to you shortly." 
          showCTA={false} 
        />
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
              <SafeIcon icon={FiCheck} className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-primary-800 mb-3">Request submitted</h2>
            <p className="text-primary-600 mb-8">We received your details and will contact you soon. You can also call or text us anytime.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+19803167792"
                className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-colors duration-200 font-medium"
              >
                <SafeIcon icon={FiPhone} className="w-5 h-5" />
                <span>Call (980) 316‑7792</span>
              </a>
              <a 
                href="sms:+19803167792?body=Hi! I just submitted the contact form."
                className="inline-flex items-center justify-center space-x-2 border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors duration-200 font-medium"
              >
                <SafeIcon icon={FiMessageSquare} className="w-5 h-5" />
                <span>Send a text</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

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

                <div className="pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!formData.consentToText}
                      onChange={(e) => setFormData(prev => ({ ...prev, consentToText: e.target.checked }))}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      required
                    />
                    <span className="text-sm text-primary-700">I agree to receive text messages from Handyman of South Charlotte. *</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="photos" className="block text-sm font-medium text-primary-700 mb-2">
                    Photo Upload (up to 10)
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

                  {Array.isArray(formData.photos) && formData.photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      {formData.photos.map((p, idx) => (
                        <div key={idx} className="relative group">
                          <img src={p.url} alt={p.name || `photo-${idx+1}`} className="w-full h-24 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removePhotoAt(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove photo"
                          >
                            <SafeIcon icon={FiX} className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3 px-6 rounded-lg transition-all duration-180 font-medium flex items-center justify-center space-x-2 ${submitting ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-green-500 focus:bg-green-500'}`}
                >
                  <SafeIcon icon={FiSend} className="w-5 h-5" />
                  <span>{submitting ? 'Sending…' : 'Send Request'}</span>
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