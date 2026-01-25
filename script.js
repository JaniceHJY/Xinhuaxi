// Language switching for pretty directory URLs + small UI helpers
(function () {
  // pages supported (key = page id used in URLs, value = same)
  var pages = ["", "products", "about", "contact"];

  function getPathSegments() {
    var path = location.pathname || "/";
    // remove leading/trailing slashes
    path = path.replace(/^\/+|\/+$/g, "");
    var segs = path.split("/");
    if (segs.length === 1 && segs[0] === "") return [];
    return segs;
  }

  function currentLangAndPage() {
    var segs = getPathSegments();
    if (segs[0] === "zh") {
      // zh site: page is second segment or root
      var page = segs[1] || "";
      return { lang: "zh", page: pages.indexOf(page) >= 0 ? page : "" };
    } else {
      var page = segs[0] || "";
      return { lang: "en", page: pages.indexOf(page) >= 0 ? page : "" };
    }
  }

  function buildPath(lang, page) {
    // lang: 'en' or 'zh', page: '' | 'products' | 'about' | 'contact'
    var base = lang === "zh" ? "zh/" : "";
    return base + (page ? page + "/" : "");
  }

  // Helpers for the menu
  document.addEventListener("DOMContentLoaded", function () {
    // year
    var yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    var langToggle = document.getElementById("lang-toggle");
    var langMenu = document.getElementById("lang-menu");
    if (langToggle && langMenu) {
      langToggle.addEventListener("click", function () {
        var open = langMenu.style.display === "block";
        langMenu.style.display = open ? "none" : "block";
        langToggle.setAttribute("aria-expanded", String(!open));
        langMenu.setAttribute("aria-hidden", String(open));
      });

      Array.prototype.forEach.call(langMenu.querySelectorAll("button[data-lang]"), function (btn) {
        btn.addEventListener("click", function () {
          var targetLang = btn.getAttribute("data-lang");
          var target = btn.getAttribute("data-target");

          // If a data-target is provided, use that; else map counterpart
          if (!target) {
            var info = currentLangAndPage();
            target = buildPath(targetLang, info.page);
          }

          // store preference
          try { localStorage.setItem("preferredLang", targetLang); } catch (e) {}

          // navigate (relative)
          location.href = target;
        });
      });

      // close menu on outside click
      document.addEventListener("click", function (e) {
        if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
          langMenu.style.display = "none";
          langToggle.setAttribute("aria-expanded", "false");
          langMenu.setAttribute("aria-hidden", "true");
        }
      });
    }

    // On load, respect stored preference and redirect to counterpart if needed
    try {
      var pref = localStorage.getItem("preferredLang");
      if (pref && (pref === "en" || pref === "zh")) {
        var info = currentLangAndPage();
        if (pref !== info.lang) {
          var target = buildPath(pref, info.page);
          // Only redirect if not already on the target
          var normalized = location.pathname.replace(/^\/+|\/+$/g, "") + (location.pathname.endsWith("/") ? "/" : "/");
          var targetNormalized = target.replace(/^\/+|\/+$/g, "") + "/";
          if (normalized.indexOf(targetNormalized) === -1) {
            location.href = target;
          }
        }
      }
    } catch (e) {
      // ignore storage errors
    }
  });
})();