document.addEventListener('DOMContentLoaded', function () {
  const DEADLINE = new Date('2026-06-28T23:59:00+05:30');

  function updateCountdown() {
    const now  = new Date();
    const diff = DEADLINE - now;

    if (diff <= 0) {
      const wrapper = document.getElementById('countdown-wrapper');
      if (wrapper) {
        wrapper.innerHTML = '<div class="countdown-label">Early Bird Price Has Ended</div>';
      }
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(minutes);
    if (sEl) sEl.textContent = pad(seconds);
  }

  // Inject the countdown HTML into the hero card after the card-deadline div
  const deadlineEl = document.querySelector('.card-deadline');
  if (deadlineEl) {
    const wrapper = document.createElement('div');
    wrapper.className = 'countdown-wrapper';
    wrapper.id = 'countdown-wrapper';
    wrapper.innerHTML = `
      <div class="countdown-label">⏳ Early Bird Closes In</div>
      <div class="countdown-timer">
        <div class="countdown-block">
          <div class="countdown-num" id="cd-days">00</div>
          <div class="countdown-unit">Days</div>
        </div>
        <div class="countdown-sep">:</div>
        <div class="countdown-block">
          <div class="countdown-num" id="cd-hours">00</div>
          <div class="countdown-unit">Hrs</div>
        </div>
        <div class="countdown-sep">:</div>
        <div class="countdown-block">
          <div class="countdown-num" id="cd-mins">00</div>
          <div class="countdown-unit">Min</div>
        </div>
        <div class="countdown-sep">:</div>
        <div class="countdown-block">
          <div class="countdown-num" id="cd-secs">00</div>
          <div class="countdown-unit">Sec</div>
        </div>
      </div>
    `;
    deadlineEl.insertAdjacentElement('afterend', wrapper);
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
// ────────────────────────────────────────── REVEAL ANIMATION ON SCROLL Elements with the "reveal" class will fade in when they enter the viewport// ──────────────────────────────────────────
  const revealTargets = document.querySelectorAll(
    '.outcome-card, .timeline-item, .faculty-card, .testi-card, .who-card, .freelancing-points li'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger children inside grids for a nicer cascade
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          siblings.forEach((sib, i) => {
            setTimeout(() => sib.classList.add('visible'), i * 80);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach(el => observer.observe(el));


  /* ────────────────────────────────────────── STICKY MOBILE CTA BAR Shows a fixed bottom bar on mobile with an enroll button after user scrolls past hero ────────────────────────────────────────── */
  const mobileBar = document.createElement('div');
  mobileBar.className = 'mobile-cta-bar';
  mobileBar.innerHTML = `
    <span>6-Month Course · <strong>₹24,999</strong></span>
    <a href="#enroll">Enroll Now →</a>
  `;
  document.body.appendChild(mobileBar);

  const heroSection = document.querySelector('.hero');

  const scrollWatcher = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        mobileBar.style.display = 'flex';
      } else {
        mobileBar.style.display = 'none';
      }
    },
    { threshold: 0 }
  );

  if (heroSection) scrollWatcher.observe(heroSection);


  /* ────────────────────────────────────────── SMOOTH SCROLL for all anchor links (fallback for older browsers) ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ────────────────────────────────────────── FAQ ACCORDION — close others when opening Native <details> elements already work,this adds the "only one open at a time" UX ────────────────────────────────────────── */
  const allDetails = document.querySelectorAll('details');

  allDetails.forEach(detail => {
    detail.addEventListener('toggle', function () {
      if (this.open) {
        allDetails.forEach(other => {
          if (other !== this && other.open) {
            other.open = false;
          }
        });
      }
    });
  });


  /* ────────────────────────────────────────── NAV ENROLL BUTTON — highlight after scroll After scrolling 300px, make nav CTA pulse once ────────────────────────────────────────── */
  const navCta = document.querySelector('.nav-cta');
  let pulsed = false;

  window.addEventListener('scroll', function () {
    if (!pulsed && window.scrollY > 300 && navCta) {
      navCta.style.transition = 'box-shadow 0.3s';
      navCta.style.boxShadow = '0 0 0 4px rgba(200,147,42,0.4)';
      setTimeout(() => {
        navCta.style.boxShadow = '0 0 0 0 rgba(200,147,42,0)';
      }, 800);
      pulsed = true;
    }
  }, { passive: true });

});