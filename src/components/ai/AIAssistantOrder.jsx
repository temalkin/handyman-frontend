import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import AddressAutocomplete from '../../common/AddressAutocomplete'
import { buildTelegramMessage } from '../../common/MessageFormatter'
import {
  sendSms as backendSendSms,
  sendTelegram as backendSendTelegram,
  sendTelegramWithPhotos as backendSendTelegramWithPhotos,
  sendTelegramDocument as backendSendTelegramDocument,
  storeRequest,
  uploadPhotos,
  aiEnsureRequest,
  aiIngestMessage,
} from '../../common/BackendAPI'

const { FiSend, FiUpload, FiX, FiMessageCircle, FiClipboard, FiUser, FiPlusCircle, FiArrowRight, FiRotateCcw } = FiIcons

const AIAssistantOrder = ({ formData, onDataChange, onSubmit }) => {
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef(null)
  const fileInputRef = useRef(null)
  const messageInputRef = useRef(null)
  const sessionIdRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [formData.aiMessages, isTyping])

  const handleFileUpload = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const room = Math.max(0, 10 - (formData.aiPhotos?.length || 0))
    const newFiles = Array.from(files).slice(0, room)
    const fileObjects = newFiles.map(file => ({ file, name: file.name, size: file.size, url: URL.createObjectURL(file) }))
    onDataChange('aiPhotos', [...(formData.aiPhotos || []), ...fileObjects].slice(0, 10))
    try { if (fileInputRef.current) fileInputRef.current.value = '' } catch {}
  }

  const removeCurrentPhotoAt = (idx) => {
    const list = Array.isArray(formData.aiPhotos) ? [...formData.aiPhotos] : []
    if (idx < 0 || idx >= list.length) return
    try { if (list[idx] && list[idx].url && list[idx].url.startsWith('blob:')) URL.revokeObjectURL(list[idx].url) } catch {}
    list.splice(idx, 1)
    onDataChange('aiPhotos', list)
  }

  const [userMessage, setUserMessage] = useState('')
  const MAX_USER_MESSAGES = 30
  const hasPhotos = Array.isArray(formData.aiPhotos) && formData.aiPhotos.length > 0
  const GREETING_MESSAGE = "Hi! I’m your AI assistant. Tell me about your project or attach photos, and I’ll help capture your request.";

  // Phone normalization for notifications where needed
  const normalizePhone = (raw) => {
    if (!raw) return ''
    const digits = String(raw).replace(/\D/g, '')
    if (!digits) return ''
    if (digits.length === 10) return `+1${digits}`
    if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
    return digits.startsWith('+') ? digits : `+${digits}`
  }

  const formatPhoneUS = (value) => {
    const digits = String(value || '').replace(/\D/g, '')
    if (digits.length >= 6) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`
    if (digits.length >= 3) return `(${digits.slice(0,3)}) ${digits.slice(3)}`
    return digits
  }

  const handleAiPhoneChange = (e) => {
    const raw = e.target.value
    const formatted = formatPhoneUS(raw)
    const normalized = normalizePhone(raw)
    onDataChange('aiPhone', formatted)
    onDataChange('aiPhoneNormalized', normalized)
  }

  const WEBHOOK_URL = 'https://www.klmnoperesete.com/webhook/website_ai_helper'

  const sendToWebhook = async (payload, { timeoutMs = 15000 } = {}) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      let data = null
      try { data = await res.json() } catch (_) { data = null }
      if (!res.ok) {
        const err = new Error('Webhook responded with non-2xx status')
        err.status = res.status
        err.data = data
        throw err
      }
      return data
    } finally { clearTimeout(timeoutId) }
  }

  // Initialize/load session and messages
  useEffect(() => {
    try {
      const STORAGE_KEY = 'ai_session_id'
      let sid = localStorage.getItem(STORAGE_KEY)
      if (!sid) {
        sid = `${Date.now()}-${Math.random().toString(36).slice(2)}`
        localStorage.setItem(STORAGE_KEY, sid)
      }
      sessionIdRef.current = sid
      const chatKey = `ai_chat_${sid}`
      const stored = localStorage.getItem(chatKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          const cleaned = parsed.map(m => ({ sender: m.sender, content: String(m.content || ''), photos: Array.isArray(m.photos) ? m.photos : undefined }))
          const current = Array.isArray(formData.aiMessages) ? formData.aiMessages : []
          if (current.length === 0) {
            onDataChange('aiMessages', cleaned.length > 0 ? cleaned : [{ sender: 'ai', content: GREETING_MESSAGE }])
          }
        }
      } else {
        const current = Array.isArray(formData.aiMessages) ? formData.aiMessages : []
        if (current.length === 0) {
          onDataChange('aiMessages', [{ sender: 'ai', content: GREETING_MESSAGE }])
        }
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist messages to localStorage per session
  useEffect(() => {
    try {
      if (!sessionIdRef.current) return
      const chatKey = `ai_chat_${sessionIdRef.current}`
      const serializable = (formData.aiMessages || []).map(m => ({ sender: m.sender, content: String(m.content || ''), photos: Array.isArray(m.photos) ? m.photos : undefined }))
      localStorage.setItem(chatKey, JSON.stringify(serializable))
    } catch {}
  }, [formData.aiMessages])
  const adjustTextarea = (el) => {
    if (!el) return
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24
    const maxHeight = lineHeight * 5
    el.style.height = 'auto'
    const newHeight = Math.min(el.scrollHeight, maxHeight)
    el.style.height = `${newHeight}px`
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }

  useEffect(() => {
    if (messageInputRef.current) adjustTextarea(messageInputRef.current)
  }, [userMessage])
  const sendMessage = (e) => {
    if (e) e.preventDefault()
    const hasPhotos = Array.isArray(formData.aiPhotos) && formData.aiPhotos.length > 0
    if (!userMessage.trim() && !hasPhotos) return

    // Enforce max user messages
    const userCount = (formData.aiMessages || []).reduce((acc, m) => acc + (m.sender === 'user' ? 1 : 0), 0)
    if (userCount >= MAX_USER_MESSAGES) {
      const capped = [
        ...(formData.aiMessages || []),
        { sender: 'ai', content: 'Thank you for chatting with our AI assistant. Please submit a request and we will contact you soon.' }
      ]
      onDataChange('aiMessages', capped)
      setIsTyping(false)
      return
    }
    const photosToSend = hasPhotos ? [...formData.aiPhotos] : undefined
    const updated = [...(formData.aiMessages || []), { sender: 'user', content: userMessage.trim(), photos: photosToSend }]
    onDataChange('aiMessages', updated)
    setUserMessage('')
    if (hasPhotos) onDataChange('aiPhotos', [])
    setIsTyping(true)

    // Fire-and-forget persistence to backend (ensure request, upload photos, ingest message)
    ;(async () => {
      try {
        let storagePaths = []
        if (hasPhotos) {
          try {
            const ensure = await aiEnsureRequest({ sessionId: sessionIdRef.current })
            const requestId = ensure?.request_id || ensure?.requestId
            if (requestId) {
              const up = await uploadPhotos({ requestId, origin: 'ai-message', files: photosToSend, sessionId: sessionIdRef.current })
              const items = (up && Array.isArray(up.items)) ? up.items : []
              storagePaths = items.map(it => it?.storage_path).filter(Boolean)
            }
          } catch (_) {}
        }
        try { await aiIngestMessage({ sessionId: sessionIdRef.current, sender: 'user', content: userMessage.trim(), photosCount: hasPhotos ? photosToSend.length : 0, storagePaths }) } catch (_) {}
      } catch (_) {}
    })()

    // Build payload and get AI reply
    ;(async () => {
      try {
        const prior = (formData.aiMessages || []).slice(-20)
        const sanitizedHistory = prior.map(m => ({ sender: m.sender, content: typeof m.content === 'string' ? m.content : '', photos_count: Array.isArray(m.photos) ? m.photos.length : 0 }))
        const normalizedJobs = Array.isArray(formData.aiJobs)
          ? formData.aiJobs.map(j => ({ id: j.id, name: j.name, price: Number(j.price) || 0 })) : []
        const jobsTotal = normalizedJobs.reduce((s, j) => s + (Number(j.price) || 0), 0)
        const contentText = userMessage.trim() || (hasPhotos ? 'Sent photos' : '')
        const photosCountValue = hasPhotos ? (photosToSend?.length || 0) : 0
        const commonFields = {
          sender: 'user',
          content: contentText,
          photos_count: photosCountValue,
          message: contentText,
          sessionId: sessionIdRef.current,
          history: sanitizedHistory,
          contact: {
            address: formData.aiAddress,
            fullName: formData.aiFullName,
            phone: formData.aiPhone,
            email: formData.aiEmail,
          },
          source: 'calculator_ai',
          current_jobs: normalizedJobs,
          jobs_total: jobsTotal,
          photosCount: photosCountValue,
        }

        let data
        if (hasPhotos) {
          const fd = new FormData()
          fd.append('sender', commonFields.sender)
          fd.append('content', commonFields.content)
          fd.append('photos_count', String(commonFields.photos_count))
          fd.append('message', commonFields.message)
          fd.append('sessionId', commonFields.sessionId)
          fd.append('history', JSON.stringify(commonFields.history))
          fd.append('contact', JSON.stringify(commonFields.contact))
          fd.append('source', commonFields.source)
          fd.append('current_jobs', JSON.stringify(commonFields.current_jobs))
          fd.append('jobs_total', String(commonFields.jobs_total))
          fd.append('photosCount', String(commonFields.photosCount))
          photosToSend.forEach((p, idx) => { if (p && p.file) fd.append('photos', p.file, p.name || `photo-${idx}`) })
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 30000)
          try {
            const response = await fetch(WEBHOOK_URL, { method: 'POST', headers: { Accept: 'application/json' }, body: fd, signal: controller.signal })
            try { data = await response.json() } catch { data = null }
          } finally { clearTimeout(timeoutId) }
        } else {
          data = await sendToWebhook(commonFields)
        }

        const normalized = Array.isArray(data) ? (data[0]?.output ?? data[0] ?? {}) : (data?.output ?? data ?? {})
        const replyMessage = normalized?.reply_message || normalized?.message || 'Thanks! I have recorded that. Could you share any other details about the job?'
        const withAI = [...updated, { sender: 'ai', content: replyMessage }]
        onDataChange('aiMessages', withAI)
      } catch (err) {
        const withErr = [...updated, { sender: 'ai', content: 'Sorry, something went wrong. Please try again.' }]
        onDataChange('aiMessages', withErr)
      } finally {
        setIsTyping(false)
      }
    })()
  }

  const isFormValid = formData.aiAddress && formData.aiFullName && formData.aiPhone && formData.aiEmail && formData.aiConsentToText
  const calculateTotal = () => {
    let total = 0
    ;(formData.aiJobs || []).forEach(j => { const n = Number(j.price); if (!Number.isNaN(n)) total += n })
    return `$${total.toFixed(2)}`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
      {/* Chat */}
      <div className="flex flex-col h-full border-r border-gray-200 lg:border-r-0">
        <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <SafeIcon icon={FiMessageCircle} className="w-5 h-5 mr-2" />
            <h3 className="text-lg font-semibold">AI Assistant</h3>
          </div>
          <button
            type="button"
            onClick={() => {
              try {
                if (sessionIdRef.current) localStorage.removeItem(`ai_chat_${sessionIdRef.current}`)
              } catch {}
              onDataChange('aiMessages', [{ sender: 'ai', content: GREETING_MESSAGE }])
              onDataChange('aiPhotos', [])
              setUserMessage('')
              if (messageInputRef.current) {
                messageInputRef.current.style.height = 'auto'
              }
            }}
            className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded"
            title="Reset dialogue"
          >
            <SafeIcon icon={FiRotateCcw} className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 bg-gray-50"
          style={{ maxHeight: hasPhotos ? 'calc(100vh - 260px)' : 'calc(100vh - 180px)', minHeight: '240px' }}
        >
          {(formData.aiMessages || []).map((m, i) => (
            <div key={i} className={`mb-4 flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-3 ${m.sender === 'user' ? 'bg-primary-500 text-white rounded-tr-none' : 'bg-white shadow-md rounded-tl-none'}`}>
                {m.content && <div className="mb-2 whitespace-pre-wrap">{m.content}</div>}
                {Array.isArray(m.photos) && m.photos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {m.photos.map((p, idx) => (<img key={idx} src={p.url} alt={p.name} className="h-20 w-20 object-cover rounded-lg" />))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[80%] rounded-2xl p-3 bg-white shadow-md rounded-tl-none">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={sendMessage} className={`px-4 pt-3 ${hasPhotos ? 'pb-3' : 'pb-1'} bg-white border-t border-gray-200`}>
          {hasPhotos && (
            <div className="flex overflow-x-auto space-x-2 mb-2 pb-1">
              {formData.aiPhotos.map((photo, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <img src={photo.url} alt={photo.name} className="h-16 w-16 object-cover rounded-lg" />
                  <button type="button" onClick={() => removeCurrentPhotoAt(index)} className="absolute top-1 right-1 z-20 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700" aria-label="Remove photo" title="Remove photo">
                    <SafeIcon icon={FiX} className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <textarea
                ref={messageInputRef}
                value={userMessage}
                onChange={(e)=> setUserMessage(e.target.value)}
                onInput={(e) => adjustTextarea(e.target)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none overflow-hidden"
              />
              <label htmlFor="ai-photo-upload" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" title="Attach photos">
                <SafeIcon icon={FiUpload} className="w-5 h-5" />
              </label>
              <input id="ai-photo-upload" type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" ref={fileInputRef} />
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-primary-600 text-white p-3 rounded-xl hover:bg-green-500 transform hover:scale-105 transition ease-out duration-200">
              <SafeIcon icon={FiSend} className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
      </div>
      {/* Summary */}
      <div className="bg-white border-l border-gray-200">
        <div className="bg-gray-50 p-4 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-800">Job Summary</h3></div>
        <div className="p-4">
          <div className="mb-6">
            <div className="flex items-center justify-between w-full p-2 bg-primary-50 rounded-lg mb-2">
              <div className="flex items-center"><SafeIcon icon={FiClipboard} className="w-5 h-5 text-primary-600 mr-2" /><span className="font-medium">Jobs</span></div>
            </div>
            <div className="space-y-3 mt-3">
              {(formData.aiJobs || []).map(job => (
                <div key={job.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{job.name}</p>
                    <div className="flex items-center text-sm text-gray-500"><span className="font-medium text-primary-600">${String(Number(job.price).toFixed(2))}</span></div>
                  </div>
                  <button onClick={() => onDataChange('aiJobs', (formData.aiJobs || []).filter(j => j.id !== job.id))} className="text-gray-400 hover:text-red-500"><SafeIcon icon={FiX} className="w-5 h-5" /></button>
                </div>
              ))}
              <button onClick={() => onDataChange('aiJobs', [...(formData.aiJobs || []), { id: `${Date.now()}`, name: 'New job item', price: 0 }])} className="flex items-center justify-center w-full p-2 border border-dashed border-primary-300 rounded-lg text-primary-600 hover:bg-primary-50">
                <SafeIcon icon={FiPlusCircle} className="w-5 h-5 mr-2" /><span>Add Job Item</span>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between w-full p-2 bg-primary-50 rounded-lg mb-2">
              <div className="flex items-center"><SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600 mr-2" /><span className="font-medium">Contact Information</span></div>
            </div>
            <div className="space-y-4 mt-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Address *</label>
                <AddressAutocomplete id="ai-address" value={formData.aiAddress || ''} onChange={(val) => onDataChange('aiAddress', val)} placeholder="Enter project address" required className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                <input type="text" value={formData.aiFullName || ''} onChange={(e) => onDataChange('aiFullName', e.target.value)} placeholder="Your full name" className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={14}
                  value={formData.aiPhone || ''}
                  onChange={handleAiPhoneChange}
                  placeholder="(980) 316-7792"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input type="email" value={formData.aiEmail || ''} onChange={(e) => onDataChange('aiEmail', e.target.value)} placeholder="your@email.com" className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>
              <div className="pt-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.aiConsentToText || false} onChange={(e) => onDataChange('aiConsentToText', e.target.checked)} className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" required />
                  <span className="text-sm text-gray-700">I agree to receive text messages from Handyman of South Charlotte. *</span>
                </label>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-800">Estimated Total:</span>
              <span className="text-xl font-bold text-primary-600">{calculateTotal()}</span>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onSubmit} disabled={!isFormValid} className={`w-full py-3 px-6 rounded-xl font-medium flex items-center justify-center ${isFormValid ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              <span>Submit Request</span>
              <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistantOrder


