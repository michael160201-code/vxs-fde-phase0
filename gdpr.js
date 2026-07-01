(function() {
  var STORAGE_KEY = 'vxs_cookie_consent';
  var GA_ID = 'G-516HY5Q3H3';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function loadGA() {
    if (document.querySelector('script[src*="googletagmanager"]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  ready(function() {
    var consent = localStorage.getItem(STORAGE_KEY);

    if (consent === 'accepted') {
      loadGA();
      return;
    }
    if (consent === 'essential') {
      return;
    }

    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.innerHTML = '<div style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#0e2a47;border-top:1px solid rgba(255,255,255,0.12);padding:16px 24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;font-family:Segoe UI,Arial,sans-serif;font-size:13px;color:#d9e2ec;line-height:1.5;box-shadow:0 -4px 24px rgba(0,0,0,0.24)"><span style="max-width:620px">This site uses analytics cookies only after consent to understand content performance. These cookies are separate from the manual-review, aggregation, and public-case choices inside the intake form.</span><span style="display:flex;gap:8px;flex-shrink:0"><button id="cookieAccept" style="background:#00a9c6;color:#0e2a47;border:none;padding:8px 18px;font-family:Consolas,monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;cursor:pointer;border-radius:2px;white-space:nowrap">Accept</button><button id="cookieDecline" style="background:transparent;color:#d9e2ec;border:1px solid rgba(255,255,255,0.24);padding:8px 18px;font-family:Consolas,monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;cursor:pointer;border-radius:2px;white-space:nowrap">Essential Only</button></span></div>';
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function() {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      banner.remove();
      loadGA();
    });

    document.getElementById('cookieDecline').addEventListener('click', function() {
      localStorage.setItem(STORAGE_KEY, 'essential');
      banner.remove();
    });
  });
})();
