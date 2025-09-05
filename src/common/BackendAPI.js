const API_BASE = (import.meta && import.meta.env && import.meta.env.VITE_BACKEND_BASE_URL) || '';

const apiUrl = (path) => {
  if (!API_BASE) return path; // assume same-origin proxy under /api
  return API_BASE.replace(/\/$/, '') + path;
};

export const sendSms = async ({ to, text, subject }) => {
  const res = await fetch(apiUrl('/api/send-sms'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, text, subject }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`sendSms failed: ${res.status} ${t}`);
  }
  return res.json().catch(() => ({}));
};

export const sendTelegram = async (text) => {
  const res = await fetch(apiUrl('/api/send-telegram'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`sendTelegram failed: ${res.status} ${t}`);
  }
  return res.json().catch(() => ({}));
};

export const sendTelegramWithPhotos = async (photos = [], caption = '') => {
  const fd = new FormData();
  fd.append('text', caption || '');
  let appended = 0;
  const list = Array.isArray(photos) ? photos.slice(0, 10) : [];
  for (let idx = 0; idx < list.length && appended < 10; idx += 1) {
    const p = list[idx];
    if (!p) continue;
    if (p.file instanceof File) {
      fd.append('files', p.file, p.name || `photo-${idx}.jpg`);
      appended += 1;
      continue;
    }
    if (p.url && typeof p.url === 'string' && p.url.startsWith('blob:')) {
      try {
        const resp = await fetch(p.url);
        const blob = await resp.blob();
        fd.append('files', blob, p.name || `photo-${idx}.jpg`);
        appended += 1;
      } catch (err) {
        console.warn('Failed to append blob URL photo', err);
      }
    }
  }
  if (appended === 0) return sendTelegram(caption || '');
  const res = await fetch(apiUrl('/api/send-telegram-upload'), { method: 'POST', body: fd });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`sendTelegramWithPhotos failed: ${res.status} ${t}`);
  }
  return res.json().catch(() => ({}));
};

export const sendTelegramDocument = async (blob, filename = 'dialog.txt', caption = '') => {
  const fd = new FormData();
  if (caption) fd.append('caption', caption);
  fd.append('document', blob, filename);
  const res = await fetch(apiUrl('/api/send-document'), { method: 'POST', body: fd });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`sendTelegramDocument failed: ${res.status} ${t}`);
  }
  return res.json().catch(() => ({}));
};

export const storeRequest = async (payload) => {
  const res = await fetch(apiUrl('/api/store-request'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`storeRequest failed: ${res.status} ${t}`);
  }
  return res.json().catch(() => ({}));
};

export const uploadPhotos = async ({ requestId, origin, files, sessionId }) => {
  if (!requestId || !Array.isArray(files) || files.length === 0) return { ok: true, uploaded: 0 };
  const fd = new FormData();
  fd.append('request_id', String(requestId));
  if (origin) fd.append('origin', String(origin));
  if (sessionId) fd.append('session_id', String(sessionId));
  let appended = 0;
  files.forEach((p, idx) => {
    const file = p && p.file instanceof File ? p.file : null;
    if (file) {
      fd.append('files', file, p.name || `photo-${idx}.jpg`);
      appended += 1;
    }
  });
  if (appended === 0) return { ok: true, uploaded: 0 };
  const res = await fetch(apiUrl('/api/upload'), { method: 'POST', body: fd });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`uploadPhotos failed: ${res.status} ${t}`);
  }
  return res.json().catch(() => ({}));
};

export const aiEnsureRequest = async ({ sessionId, source = 'website' }) => {
  const res = await fetch(apiUrl('/api/ai/ensure-request'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, source }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`aiEnsureRequest failed: ${res.status} ${t}`);
  }
  return res.json().catch(() => ({}));
};

export const aiIngestMessage = async ({ sessionId, sender, content = '', photosCount = 0, storagePaths = null }) => {
  const payload = { session_id: sessionId, sender, content, photos_count: Number(photosCount) || 0 };
  if (Array.isArray(storagePaths) && storagePaths.length > 0) payload.storage_paths = storagePaths;
  const res = await fetch(apiUrl('/api/ai/ingest-message'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`aiIngestMessage failed: ${res.status} ${t}`);
  }
  return res.json().catch(() => ({}));
};


