/* Sitio ligero. No envía información a servidores ni usa cookies. */
(() => {
  'use strict';
  const config = window.BARBER_CONFIG || {};
  const U = window.BarberUtils;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
  const esc = U.escapeHTML;
  let toastTimeout;
  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => el.classList.remove('is-visible'), 5200);
  }
  const phone = U.normalizeChilePhone(config.whatsappPhone);
  function reserve(service) {
    const requested = service || 'una atención';
    const url = U.buildWhatsAppUrl(config.whatsappPhone, `${config.whatsappIntro || 'Hola, quisiera consultar disponibilidad para'} ${requested}.`);
    if (!url) {
      toast('Modo demostración: configura un WhatsApp chileno válido en config.js para habilitar las reservas.');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  function setText(selector, value) {
    if (typeof value !== 'string') return;
    $$(selector).forEach(node => node.textContent = value);
  }
  setText('[data-brand]', config.brand);
  setText('[data-brand-suffix]', config.brandSuffix);
  setText('#hero-eyebrow', config.eyebrow);
  setText('#hero-title', config.headline);
  // El título por defecto tiene énfasis editorial; conservarlo mientras no se personalice.
  if (config.headline === 'El corte es solo el comienzo.') {
    $('#hero-title').innerHTML = 'El corte es <em>solo el</em> comienzo<span class="accent-dot">.</span>';
  }
  setText('#hero-description', config.description);
  document.title = `${config.brand || 'Barber Studio'} — ${config.brandSuffix || 'Barbería'}${config.demo ? ' · Demo' : ''}`;
  const desc = $('meta[name="description"]');
  if (desc) desc.content = config.demo ? 'Sitio ficticio de demostración de barbería. Servicios y precios ilustrativos.' : String(config.description || '').slice(0, 160);
  if (!config.demo) {
    $('#demo-ribbon').hidden = true;
    const robots = $('meta[name="robots"]');
    if (robots) robots.content = 'index,follow';
    $('#prices-note').textContent = 'Los precios y la disponibilidad deben confirmarse con el negocio.';
    $('#footer-legal').textContent = 'Todos los derechos reservados.';
  }
  $('#year').textContent = new Date().getFullYear();

  const icons = {
    cut: '<path d="M7 5c0 2 1 3 3 4l9 9M17 5l-9 9"/><circle cx="6" cy="17" r="3"/><circle cx="18" cy="5" r="3"/>',
    beard: '<path d="M6 7c0-6 12-6 12 0v7c0 5-5 7-6 7s-6-2-6-7V7Z"/><path d="M9 13c1 2 5 2 6 0M9 9h.01M15 9h.01"/>',
    spark: '<path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z"/>',
    style: '<path d="M4 12c2-6 6-9 11-9 3 0 5 2 5 5 0 4-3 7-7 8-4 1-6 2-9 5"/><path d="M5 6c3 0 4 2 4 4"/>'
  };
  $('#services-grid').innerHTML = (Array.isArray(config.services) ? config.services : []).map((s, index) => {
    const icon = icons[s.icon] || icons.spark;
    return `<article class="service-card"><div class="service-top"><div class="service-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg></div><span class="service-num">0${index + 1}</span></div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><div class="service-meta"><span>${esc(s.duration || 'Duración a consultar')}</span><strong>${U.formatCLP(s.price)}</strong></div><button type="button" class="service-cta" data-service-index="${index}" aria-label="Consultar ${esc(s.name)} por WhatsApp">Consultar este servicio <span aria-hidden="true">↗</span></button></article>`;
  }).join('');
  $('#services-grid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-service-index]');
    if (!btn) return;
    const service = config.services[Number(btn.dataset.serviceIndex)];
    if (service) reserve(service.name);
  });
  $$('[data-book]').forEach(btn => btn.addEventListener('click', () => reserve('una hora')));

  $('#gallery-grid').innerHTML = (Array.isArray(config.gallery) ? config.gallery : []).map((item,index) => `<button type="button" class="gallery-item" data-gallery-index="${index}" aria-label="Ampliar ilustración: ${esc(item.title)}"><img loading="lazy" width="600" height="680" src="${esc(item.image)}" alt="${esc(item.title)}"><span class="gallery-overlay"><span><small>${esc(item.category)}</small><strong>${esc(item.title)}</strong></span><span class="gallery-open" aria-hidden="true">↗</span></span></button>`).join('');
  const modal = $('#lightbox');
  $('#gallery-grid').addEventListener('click',(event) => {
    const btn = event.target.closest('[data-gallery-index]');
    if (!btn) return;
    const item = config.gallery[Number(btn.dataset.galleryIndex)];
    if (!item || typeof modal.showModal !== 'function') return;
    $('#lightbox-image').src = item.image;
    $('#lightbox-image').alt = item.title;
    $('#lightbox-caption').textContent = `${item.title} · Ilustración de demostración`;
    modal.showModal();
  });
  modal.addEventListener('click',event => { if (event.target === modal) modal.close(); });

  const fullAddress = [config.address,config.city].filter(Boolean).join(', ');
  $('#address-display').textContent = fullAddress || 'Dirección por configurar';
  $('#phone-display').textContent = phone ? `+${phone.slice(0,2)} ${phone.slice(2,3)} ${phone.slice(3,7)} ${phone.slice(7)}` : 'WhatsApp por configurar';
  const hours = $('#hours-display');
  if (Array.isArray(config.hours) && config.hours.length) {
    hours.innerHTML = config.hours.map(item => `<div class="hours-row"><span>${esc(item.label)}</span><strong>${esc(item.value)}</strong></div>`).join('');
  }
  const mapUrl = U.buildMapUrl(config.mapsUrl);
  if (mapUrl && fullAddress) {
    $('#map-link').href = mapUrl;
    $('#map-link').hidden = false;
    $('#map-note').textContent = fullAddress;
  }
  if (typeof config.instagramUrl === 'string' && /^https:\/\/(www\.)?instagram\.com\//i.test(config.instagramUrl)) {
    $('#instagram-link').href = config.instagramUrl;
    $('#instagram-link').hidden = false;
  }

  const menuBtn = $('#menu-toggle');
  const menu = $('#main-nav');
  function closeMenu() { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','Abrir menú de navegación'); }
  menuBtn.addEventListener('click',() => {
    const opened = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(opened));
    menuBtn.setAttribute('aria-label',opened ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });
  menu.querySelectorAll('a,button').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event => {if(event.key === 'Escape') closeMenu();});
})();
