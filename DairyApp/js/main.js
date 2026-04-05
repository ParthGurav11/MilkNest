/**
 * Green Valley Dairy — main scripts
 * Mobile navigation, Google Maps loader, smooth scroll enhancements.
 */

(function () {
  'use strict';

  // ——— Mobile navigation ———
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function closeNav() {
    navToggle?.setAttribute('aria-expanded', 'false');
    navMenu?.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    navToggle?.setAttribute('aria-expanded', 'true');
    navMenu?.classList.add('is-open');
    document.body.classList.add('nav-open');
  }

  navToggle?.addEventListener('click', function () {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    if (open) closeNav();
    else openNav();
    navToggle.setAttribute(
      'aria-label',
      navToggle.getAttribute('aria-expanded') === 'true' ? 'Close menu' : 'Open menu'
    );
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 768px)').matches) closeNav();
    });
  });

  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 769px)').matches) closeNav();
  });

  // ——— WhatsApp (wa.me links from config) ———
  function initWhatsAppLinks() {
    const cfg = window.DAIRY_CONFIG || {};
    const digits = String(cfg.whatsappPhoneE164 || '').replace(/\D/g, '');
    const contactCard = document.getElementById('whatsapp-contact-card');
    const footerItem = document.getElementById('whatsapp-footer-item');
    const links = document.querySelectorAll('a.whatsapp-link');

    if (!digits) {
      if (contactCard) contactCard.hidden = true;
      if (footerItem) footerItem.hidden = true;
      links.forEach(function (a) {
        a.removeAttribute('href');
        a.setAttribute('aria-disabled', 'true');
        a.addEventListener('click', function (e) {
          e.preventDefault();
        });
      });
      return;
    }

    let url = 'https://wa.me/' + digits;
    const prefill = cfg.whatsappPrefillMessage;
    if (prefill && String(prefill).trim()) {
      url += '?text=' + encodeURIComponent(String(prefill).trim());
    }

    links.forEach(function (a) {
      a.href = url;
    });
  }

  initWhatsAppLinks();

  // ——— Google Maps (loads only when API key is set) ———
  const cfg = window.DAIRY_CONFIG || {};
  const mapEl = document.getElementById('map');
  const mapFallback = document.getElementById('map-fallback');

  function showMapFallback() {
    if (mapEl) mapEl.style.display = 'none';
    if (mapFallback) mapFallback.hidden = false;
  }

  window.initDairyMap = function () {
    if (!mapEl || typeof google === 'undefined' || !google.maps) {
      showMapFallback();
      return;
    }
    mapEl.style.removeProperty('display');
    const center = cfg.mapCenter || { lat: 40.7128, lng: -74.006 };
    const map = new google.maps.Map(mapEl, {
      center: center,
      zoom: 14,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });
    new google.maps.Marker({
      position: center,
      map: map,
      title: cfg.address || 'Our dairy',
    });
    if (mapFallback) mapFallback.hidden = true;
  };

  function loadGoogleMaps() {
    const key = cfg.googleMapsApiKey;
    if (!key || key === 'YOUR_GOOGLE_MAPS_API_KEY' || !mapEl) {
      showMapFallback();
      return;
    }
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=' +
      encodeURIComponent(key) +
      '&callback=initDairyMap';
    script.async = true;
    script.defer = true;
    script.onerror = function () {
      showMapFallback();
    };
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGoogleMaps);
  } else {
    loadGoogleMaps();
  }
})();
