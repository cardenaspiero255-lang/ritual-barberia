/* Utilidades sin dependencias. Compatible con navegador y pruebas Node.js. */
(function (root) {
  'use strict';
  function normalizeChilePhone(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    let digits = value.replace(/[\s()+.\-]/g, '');
    if (!/^\d+$/.test(digits)) return null;
    if (/^9\d{8}$/.test(digits)) digits = '56' + digits;
    return /^569\d{8}$/.test(digits) ? digits : null;
  }
  function buildWhatsAppUrl(value, message) {
    const phone = normalizeChilePhone(value);
    return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(String(message || '').slice(0, 1200))}` : null;
  }
  function formatCLP(value) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 'Consultar';
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
  }
  function buildMapUrl(value) {
    if (!value || typeof value !== 'string') return null;
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') return null;
      if (!['www.google.com', 'google.com', 'maps.google.com', 'maps.app.goo.gl'].includes(url.hostname)) return null;
      return url.href;
    } catch (_) { return null; }
  }
  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  const api = {normalizeChilePhone,buildWhatsAppUrl,formatCLP,buildMapUrl,escapeHTML};
  root.BarberUtils = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
