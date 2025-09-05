// Image upload utilities are no longer handled on the frontend.
// These stubs are kept to avoid breaking imports during the design-only phase.
export const uploadImage = async () => ({ success: false, error: 'Not implemented on frontend' })
export const deleteImage = async () => ({ success: false, error: 'Not implemented on frontend' })
export const listImages = async () => ({ success: false, error: 'Not implemented on frontend' })

export const createPlaceholderBlob = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d')
  ctx.globalAlpha = 0
  ctx.fillRect(0, 0, 1, 1)
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob], 'blank.png', { type: 'image/png' }))
    }, 'image/png')
  })
}