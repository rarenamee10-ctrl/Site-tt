document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     MOBILE MENU
  --------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const navMobile = document.getElementById('navMobile');

  menuToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------
     FAQ ACCORDION
  --------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-q');
    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
    });
  });

  /* ---------------------------------------------------
     TELEGRAM BUY BUTTONS
     Opens Telegram with a prefilled draft message where supported.
  --------------------------------------------------- */
  const TELEGRAM_USERNAME = 'tiktok4kq';
  const DRAFT_MESSAGE = 'Сәлем, мен сенің методыңды сатып аламын.\nЗдравствуйте, я куплю ваш метод.';

  function buildTelegramUrl() {
    const encoded = encodeURIComponent(DRAFT_MESSAGE);
    return `https://t.me/${TELEGRAM_USERNAME}?text=${encoded}`;
  }

  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.setAttribute('href', buildTelegramUrl());
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });

  /* ---------------------------------------------------
     HEADER SHADOW ON SCROLL (subtle)
  --------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.boxShadow = y > 12 ? '0 8px 30px rgba(0,0,0,0.35)' : 'none';
    lastScroll = y;
  }, { passive: true });

});
