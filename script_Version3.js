// Language switching + small UI helpers
(function () {
  // Map of pages to their translations (relative paths)
  var pageMap = {
    "index.html": "es/index.html",
    "products.html": "es/products.html",
    "about.html": "es/about.html",
    "contact.html": "es/contact.html",
    "": "es/index.html" // root -> index
  };

  function isESPath(path) {
    return path.indexOf('/es/') === 0 || path.indexOf('es/') === 0;
  }

  function currentPageName() {
    var p = location.pathname || "";
    // If served from root with index, normalize
    var segments = p.split('/');
    var last = segments.pop() || segments.pop(); // handle trailing slash
    if (!last || last === "") return "index.html";
    return last;
  }

  function findCounterpart(targetLang) {
    var current = currentPageName();
    if (targetLang === 'es') {
      return pageMap[current] || "es/index.html";
    } else { // english
      // reverse lookup
      for (var k in pageMap) {
        if (pageMap[k] === current || (("es/" + current) === pageMap[k])) {
          return k;
        }
      }
      return "index.html";
    }
  }

  // Lang menu interactions
  document.addEventListener('DOMContentLoaded', function () {
    // year
    var yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    var langToggle = document.getElementById('lang-toggle');
    var langMenu = document.getElementById('lang-menu');
    if (langToggle && langMenu) {
      langToggle.addEventListener('click', function () {
        var open = langMenu.style.display === 'block';
        langMenu.style.display = open ? 'none' : 'block';
        langToggle.setAttribute('aria-expanded', String(!open));
        langMenu.setAttribute('aria-hidden', String(open));
      });

      // clicking an item
      Array.prototype.forEach.call(langMenu.querySelectorAll('button[data-lang]'), function (btn) {
        btn.addEventListener('click', function () {
          var lang = btn.getAttribute('data-lang');
          var target = btn.getAttribute('data-target');

          // If target provided, go there; otherwise map counterpart
          if (!target) {
            target = findCounterpart(lang);
          }

          // remember preference
          try { localStorage.setItem('preferredLang', lang); } catch (e) {}

          // navigate relative to current path
          location.href = target;
        });
      });

      // close menu on outside click
      document.addEventListener('click', function (e) {
        if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
          langMenu.style.display = 'none';
          langToggle.setAttribute('aria-expanded', 'false');
          langMenu.setAttribute('aria-hidden', 'true');
        }
      });
    }

    // on load, if user has a preference and is on other language, optionally redirect
    try {
      var pref = localStorage.getItem('preferredLang');
      if (pref) {
        var currentIsES = isESPath(location.pathname);
        if (pref === 'es' && !currentIsES) {
          // redirect to counterpart
          var target = findCounterpart('es');
          if (target && !location.pathname.endsWith(target)) {
            location.href = target;
          }
        } else if (pref === 'en' && currentIsES) {
          var t = findCounterpart('en');
          if (t && !location.pathname.endsWith(t)) {
            location.href = t;
          }
        }
      }
    } catch (e) {
      // ignore storage errors
    }
  });
})();