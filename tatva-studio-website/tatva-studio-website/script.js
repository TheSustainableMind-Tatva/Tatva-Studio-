// ===== TATVA STUDIO — site interactions =====

document.addEventListener('DOMContentLoaded', () => {

  /* ---- header scroll state ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');
  const setActive = () => {
    let current = '';
    const y = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(sec => {
      if (y >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- work accordion ---- */
  document.querySelectorAll('.work-item').forEach(item => {
    const head = item.querySelector('.work-head');
    const body = item.querySelector('.work-body');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.work-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.work-body').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      body.style.maxHeight = !isOpen ? body.scrollHeight + 'px' : null;
    });
  });
  // open first work item by default
  const firstWork = document.querySelector('.work-item');
  if (firstWork) {
    firstWork.classList.add('open');
    const body = firstWork.querySelector('.work-body');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
  window.addEventListener('resize', () => {
    document.querySelectorAll('.work-item.open .work-body').forEach(b => {
      b.style.maxHeight = b.scrollHeight + 'px';
    });
  });

  /* ---- current year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
