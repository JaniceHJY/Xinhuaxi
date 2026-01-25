// Small JS for header nav toggle and dynamic year
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');

  navToggle.addEventListener('click', function () {
    siteNav.classList.toggle('open');
    var expanded = siteNav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // Insert current year in footer
  var yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});