/**
 * Tailinekar - Premium Coming Soon & Landing Page Scripts
 * Handles Countdown Timer, Email Subscription, Sticky Navbar, Scrollspy, Contact Form, Particles
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPEWRITER EFFECT
  initTypewriterEffect();

  // 2. COUNTDOWN TIMER
  initCountdownTimer();

  // 3. EMAIL SUBSCRIPTION HANDLER
  initSubscriptionForm();

  // 4. CONTACT FORM HANDLER
  initContactForm();

  // 5. NAVBAR SCROLL & ACTIVE STATE
  initNavbarScroll();

  // 6. AMBIENT PARTICLES CANVAS
  initParticleCanvas();
});

/**
 * Infinite Looping Typewriter Effect for "COMING SOON"
 */
function initTypewriterEffect() {
  const textEl = document.getElementById('typewriter-text');
  if (!textEl) return;

  const phrase = "COMING SOON";
  let charIndex = 0;
  let isDeleting = false;

  function loop() {
    if (!isDeleting) {
      // Typing slowly & elegantly
      textEl.textContent = phrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === phrase.length) {
        // Pause when text is fully typed so user can read comfortably
        isDeleting = true;
        setTimeout(loop, 2400);
        return;
      }
      setTimeout(loop, 135); // Slower typing speed
    } else {
      // Deleting smoothly
      textEl.textContent = phrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Brief pause before retyping
        isDeleting = false;
        setTimeout(loop, 500);
        return;
      }
      setTimeout(loop, 75); // Deleting speed
    }
  }

  // Initial delay
  setTimeout(loop, 250);
}

/**
 * Countdown Timer
 * Sets target date (e.g. 30 days from current date)
 */
function initCountdownTimer() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Set target date 30 days ahead from today for a live demo experience
  let targetDate = localStorage.getItem('tailinekar_launch_target');
  if (!targetDate) {
    const launch = new Date();
    launch.setDate(launch.getDate() + 30);
    launch.setHours(launch.getHours() + 14);
    launch.setMinutes(launch.getMinutes() + 20);
    targetDate = launch.getTime();
    localStorage.setItem('tailinekar_launch_target', targetDate);
  } else {
    targetDate = parseInt(targetDate, 10);
    if (targetDate < new Date().getTime()) {
      const launch = new Date();
      launch.setDate(launch.getDate() + 30);
      targetDate = launch.getTime();
      localStorage.setItem('tailinekar_launch_target', targetDate);
    }
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/**
 * Toast Notification Helper
 */
function showToastNotification(message, type = 'success') {
  const toastEl = document.getElementById('notification-toast');
  const toastMessage = document.getElementById('toast-message-body');

  if (!toastEl) return;

  if (toastMessage) {
    toastMessage.innerHTML = type === 'success' 
      ? `<i class="bi bi-check-circle-fill text-warning me-2"></i> ${message}`
      : `<i class="bi bi-exclamation-triangle-fill text-danger me-2"></i> ${message}`;
  }

  if (window.bootstrap && bootstrap.Toast) {
    const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
    toast.show();
  } else {
    alert(message);
  }
}

/**
 * Email Subscription Form
 */
function initSubscriptionForm() {
  const form = document.getElementById('subscription-form');
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.getElementById('btn-submit-notify');

  if (!form || !emailInput || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToastNotification('Please enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Joining...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      emailInput.value = '';
      showToastNotification(`Welcome to Tailinekar! You're officially on the VIP launch list.`);
    }, 1000);
  });
}

/**
 * Contact Form Submission
 */
function initContactForm() {
  const form = document.getElementById('main-contact-form');
  const submitBtn = document.getElementById('btn-submit-contact');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToastNotification('Please fill in all contact fields.', 'error');
      return;
    }

    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Sending...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      form.reset();
      showToastNotification('Thank you! Your message has been sent to the Tailinekar concierge team.');
    }, 1100);
  });
}

/**
 * Navbar Scroll & Active Link Tracking
 */
function initNavbarScroll() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-item-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Toggle header background
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy active class
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu close on click
  const navbarCollapse = document.getElementById('navbarMenu');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/**
 * Ambient Canvas Particles
 */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  const particleCount = Math.min(Math.floor(window.innerWidth / 25), 45);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35 - 0.12;
      this.opacity = Math.random() * 0.5 + 0.15;
      this.color = Math.random() > 0.5 ? 'rgba(226, 183, 116, ' : 'rgba(255, 255, 255, ';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
        this.y = height + 5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.opacity + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
