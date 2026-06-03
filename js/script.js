jQuery(document).ready(function() {
  // intentionally empty
});

// ── LIGHTBOX ──
const overlay = document.createElement('div');
overlay.className = 'lightbox-overlay';
overlay.innerHTML = `<span class="lightbox-close">✕</span><img>`;
document.body.appendChild(overlay);

const lightboxImg = overlay.querySelector('img');

// define closeLightbox FIRST before anything calls it
function closeLightbox() {
  overlay.classList.remove('active');
  document.body.classList.remove('lightbox-open');
}

// prevent click on lightbox image from closing
lightboxImg.addEventListener('click', e => {
  e.stopPropagation();
});

// close on overlay background click
overlay.addEventListener('click', e => {
  if (e.target !== lightboxImg) closeLightbox();
});

// close button
overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

// direct img triggers
document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    overlay.classList.add('active');
    document.body.classList.add('lightbox-open');
  });
});

// illus-item wrapper triggers
document.querySelectorAll('.illus-item').forEach(item => {
  item.style.cursor = 'zoom-in';
  item.addEventListener('click', () => {
    if (overlay.classList.contains('active')) return;
    const img = item.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    overlay.classList.add('active');
    document.body.classList.add('lightbox-open');
  });
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger-menu');
const mobileLinks = document.getElementById('mobile-nav-links');
const closeBtn = document.getElementById('nav-close');

if (hamburger && mobileLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileLinks.classList.toggle('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileLinks.classList.remove('open');
    });
  }

  mobileLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileLinks.classList.remove('open');
    });
  });
}

// ── ESCAPE KEY ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    if (hamburger && mobileLinks) {
      hamburger.classList.remove('open');
      mobileLinks.classList.remove('open');
    }
  }
});

// ── CUSTOM CURSOR ──
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = `
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(50,50)">
      <ellipse cx="0" cy="-22" rx="13" ry="20" fill="#0B1215" transform="rotate(0)"/>
      <ellipse cx="0" cy="-22" rx="13" ry="20" fill="#0B1215" transform="rotate(60)"/>
      <ellipse cx="0" cy="-22" rx="13" ry="20" fill="#0B1215" transform="rotate(120)"/>
      <ellipse cx="0" cy="-22" rx="13" ry="20" fill="#0B1215" transform="rotate(180)"/>
      <ellipse cx="0" cy="-22" rx="13" ry="20" fill="#0B1215" transform="rotate(240)"/>
      <ellipse cx="0" cy="-22" rx="13" ry="20" fill="#0B1215" transform="rotate(300)"/>
      <circle cx="0" cy="0" r="12" fill="#0B1215"/>
    </g>
  </svg>`;
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  const speed = 0.35;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

// enhance project links with category tags
const projects = [
  { selector: 'a[href="bearlyawake.html"]', category: 'Branding' },
  { selector: 'a[href="modesto.html"]', category: 'Print' },
  { selector: 'a[href="humm.html"]', category: 'Packaging' },
  { selector: 'a[href="peers.html"]', category: 'Print · Merch' },
  { selector: 'a[href="peachkids.html"]', category: 'Packaging' },
  { selector: 'a[href="tandem.html"]', category: 'UI/UX' },
  { selector: 'a[href="endfair.html"]', category: 'Print' },
  { selector: 'a[href="unsplash.html"]', category: 'UI/UX' },
  { selector: 'a[href="plantpositivty.html"]', category: 'Print' },
];

projects.forEach(({ selector, category }) => {
  const link = document.querySelector(selector);
  if (!link) return;
  link.innerHTML = `
    <div class="project-overlay">
      <span class="project-category">${category}</span>
      <span class="project-title">${link.querySelector('h2') ? link.querySelector('h2').textContent : ''}</span>
    </div>`;
});

// scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project_link').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.02}s`;
  observer.observe(el);
});

// ── ILLUSTRATION GRID FADE IN ──
const illustItems = document.querySelectorAll('.illus-item');
if (illustItems.length > 0) {
  const illustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        illustObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  illustItems.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.02}s`;
    illustObserver.observe(el);
  });
}

console.log(document.querySelectorAll('.lightbox-trigger').length);

document.querySelectorAll('nav a').forEach(link => {
  if (link.href === window.location.href) {
    link.style.textDecoration = 'underline';
  }
});

// ── MOBILE COLOR SWATCH TAP ──
if (window.matchMedia('(pointer: coarse)').matches) {
  document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const info = swatch.querySelector('.swatch-info');
      const isVisible = info.style.opacity === '1';
      
      // close all others first
      document.querySelectorAll('.swatch-info').forEach(el => {
        el.style.opacity = '0';
      });

      // toggle this one
      if (!isVisible) {
        info.style.opacity = '1';
      }
    });
  });
}
