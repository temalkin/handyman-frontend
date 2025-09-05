import React from 'react';

const GOOGLE_PLACES_SCRIPT_ID = 'google-maps-places-script';

const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.places) {
      resolve();
      return;
    }
    if (document.getElementById(GOOGLE_PLACES_SCRIPT_ID)) {
      const existing = document.getElementById(GOOGLE_PLACES_SCRIPT_ID);
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
  });
};

const getCharlotteBounds = () => {
  try {
    const sw = new window.google.maps.LatLng(35.00, -81.15);
    const ne = new window.google.maps.LatLng(35.50, -80.55);
    return new window.google.maps.LatLngBounds(sw, ne);
  } catch (_) {
    return null;
  }
};

const AddressAutocomplete = ({
  id,
  value,
  onChange,
  onSelect,
  placeholder = 'Enter address',
  required = false,
  className = '',
}) => {
  const inputRef = React.useRef(null);
  const autocompleteRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('VITE_GOOGLE_MAPS_API_KEY is not set. Falling back to plain input.');
      return () => { mounted = false; };
    }
    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!mounted) return;
        setReady(true);
        if (inputRef.current && window.google && window.google.maps && window.google.maps.places) {
          const bounds = getCharlotteBounds();
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            fields: ['formatted_address', 'address_components', 'geometry'],
            types: ['address'],
            componentRestrictions: { country: 'us' },
            bounds: bounds || undefined,
            strictBounds: !!bounds,
          });
          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();
            const formatted = place && place.formatted_address ? place.formatted_address : (inputRef.current ? inputRef.current.value : '');
            if (typeof onChange === 'function') onChange(formatted);
            if (typeof onSelect === 'function') onSelect(place);
          });
        }
      })
      .catch((e) => {
        console.warn('Failed to load Google Maps Places:', e);
      });
    return () => {
      mounted = false;
    };
  }, [onChange, onSelect]);

  return (
    <input
      id={id}
      ref={inputRef}
      type="text"
      value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      required={required}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && ready) {
          // let autocomplete handle; do not submit form
        }
      }}
    />
  );
};

export default AddressAutocomplete;


