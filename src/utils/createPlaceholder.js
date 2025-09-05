// Utility to create a minimal placeholder image for Supabase Storage
export const createMinimalPlaceholder = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d')
    
    // Create a light gray background
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, 100, 100)
    
    // Add a subtle border
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, 98, 98)
    
    // Add text
    ctx.fillStyle = '#6b7280'
    ctx.font = '12px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Image', 50, 45)
    ctx.fillText('Coming', 50, 60)
    ctx.fillText('Soon', 50, 75)
    
    canvas.toBlob((blob) => {
      resolve(new File([blob], 'blank.jpg', { type: 'image/jpeg' }))
    }, 'image/jpeg', 0.8)
  })
}

// Instructions for manual upload
export const getUploadInstructions = () => {
  return {
    bucketName: 'site-assets',
    folders: [
      'logos/',
      'hero/',
      'backgrounds/',
      'services/',
      'services/thumbs/',
      'services/details/',
      'gallery/',
      'gallery/bathroom/',
      'gallery/flooring/',
      'gallery/furniture/',
      'gallery/other/',
      'pages/',
      'pages/about/',
      'pages/book/',
      'placeholders/'
    ],
    requiredFiles: [
      'placeholders/blank.jpg - Use the createMinimalPlaceholder function',
      'logos/logo.svg - Your company logo',
      'hero/hero-main.jpg - Main hero image',
      'backgrounds/hero-bg.jpg - Hero background image',
      // Add more required files as needed
    ],
    note: 'Create these folders in your Supabase Storage bucket and upload the corresponding images. The system will automatically use fallbacks for missing images.'
  }
}