document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const darkModeToggle = document.getElementById('darkModeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const replayBtn = document.getElementById('replayBtn');
  const progressBar = document.getElementById('progress');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const setTheme = (isDark) => {
    html.classList.toggle('dark', isDark);
    if (themeIcon) {
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
    if (darkModeToggle) {
      darkModeToggle.setAttribute('aria-pressed', String(isDark));
    }
    localStorage.setItem('freshfold-theme', isDark ? 'dark' : 'light');
  };

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('freshfold-theme');
  setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const isDark = !html.classList.contains('dark');
      setTheme(isDark);
    });
  }

  if (menuToggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  const heroItems = document.querySelectorAll('.hero-item');
  const revealHero = () => {
    if (!heroItems.length) return;

    if (window.gsap) {
      gsap.set(heroItems, { opacity: 0, y: 24 });
      gsap.to(heroItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
      });
      return;
    }

    heroItems.forEach((item) => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    });
  };

  if (replayBtn) {
    replayBtn.addEventListener('click', revealHero);
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    });
  } else {
    document.querySelectorAll('.reveal').forEach((section) => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    });
  }

  if (progressBar) {
    const updateProgressBar = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    updateProgressBar();
    window.addEventListener('scroll', updateProgressBar, { passive: true });
    window.addEventListener('resize', updateProgressBar);
  }

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();

      formFeedback.classList.add('hidden');
      formFeedback.classList.remove('text-red-500');
      formFeedback.classList.remove('text-green-600');

      if (!name || !email || !message) {
        formFeedback.textContent = 'Please complete all fields before sending your message.';
        formFeedback.classList.remove('hidden');
        formFeedback.classList.add('text-red-500');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.classList.remove('hidden');
        formFeedback.classList.add('text-red-500');
        return;
      }

      formFeedback.textContent = `Thanks, ${name}! Your message has been sent successfully.`;
      formFeedback.classList.remove('hidden');
      formFeedback.classList.add('text-green-600');
      contactForm.reset();
    });
  }

  revealHero();
});
