(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-language-toggle]');
  const saved = localStorage.getItem('seasoned-site-language');
  const initial = saved || (navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en');

  function applyLanguage(language) {
    root.lang = language;
    document.querySelectorAll('[data-copy-nl]').forEach((element) => {
      element.textContent = element.dataset[language === 'nl' ? 'copyNl' : 'copyEn'];
    });
    document.querySelectorAll('[data-image-nl]').forEach((image) => {
      image.src = image.dataset[language === 'nl' ? 'imageNl' : 'imageEn'];
      const alt = image.dataset[language === 'nl' ? 'altNl' : 'altEn'];
      if (alt) image.alt = alt;
    });
    if (toggle) {
      toggle.textContent = language === 'nl' ? 'EN' : 'NL';
      toggle.setAttribute('aria-label', language === 'nl' ? 'Switch to English' : 'Wissel naar Nederlands');
    }
    localStorage.setItem('seasoned-site-language', language);
  }

  applyLanguage(initial);
  toggle?.addEventListener('click', () => applyLanguage(root.lang === 'nl' ? 'en' : 'nl'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
})();
