import React, { useState } from 'react'
import { IMAGES } from '../config/images'

const ImageWithFallback = ({
  src,
  alt,
  className = '',
  fallbackSrc = IMAGES.placeholder,
  onError,
  onLoad,
  loading = 'lazy',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  if (import.meta?.env?.DEV) {
    // Basic dev logging to debug broken images
    // eslint-disable-next-line no-console
    console.debug('[ImageWithFallback] src:', src)
  }

  const handleError = (e) => {
    if (import.meta?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn('[ImageWithFallback] error loading:', imgSrc, e?.type)
    }
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
    
    if (onError) {
      onError(e)
    }
  }

  const handleLoad = (e) => {
    setIsLoaded(true)
    if (onLoad) onLoad(e)
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : ''}`.trim()}
      onError={handleError}
      onLoad={handleLoad}
      loading={loading}
      {...props}
    />
  )
}

export default ImageWithFallback