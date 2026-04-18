/* ============================================================
   PORTFOLIO WEBSITE — script.js
   Frido Ilham Prianggoro
   ============================================================ */

// ── Project data ─────────────────────────────────────────────
const projects = [
  {
    title: "ITS Project Drone LiDar Survey",
    tag: "Survey & Mapping",
    meta: "Jun 2025 – Jul 2025 · ITS Surabaya, Jawa Timur",
    images: ["images/lidar1.jpeg","images/lidar2.jpeg","images/lidar3.jpeg"],
    desc: "Proyek pemetaan lahan kampus Institut Teknologi Sepuluh Nopember (ITS) menggunakan drone LiDar. Lokasi yang dipetakan mencakup area Sukolilo, Cokroaminoto, dan Buncitan. Data hasil survey drone diolah menggunakan aplikasi Trimble Business Center untuk menghasilkan surface kontur dengan akurasi tinggi.",
    chips: ["Trimble Business Center","Drone LiDar","Surface Kontur","GIS","Pemetaan Lahan"]
  },
  {
    title: "Magang Proyek Irigasi Pidekso Tahap 1, Wonogiri",
    tag: "Quality Control",
    meta: "Jul 2025 – Nov 2025 · Kec. Giriwoyo, Wonogiri · PT. Basuki Rahmanta Putra",
    images: ["images/irigasi1.jpeg","images/irigasi2.jpeg","images/irigasi3.jpeg","images/irigasi4.jpeg","images/irigasi5.jpeg","images/irigasi6.jpeg"],
    desc: "Magang sebagai Asisten Quality Control pada proyek pembangunan jaringan irigasi Pidekso Tahap 1 di Kecamatan Giriwoyo, Wonogiri. Tugas meliputi pengawasan metode kerja, pengujian kepadatan tanah (Sandcone), pengujian tekanan beton, pengujian material (agregat dan baja), serta penyusunan laporan pengujian.",
    chips: ["Quality Control","Sandcone Test","Uji Tekan Beton","Pengujian Material","Jaringan Irigasi"]
  },
  {
    title: "Magang Proyek JLS Lot. 1A, Tulungagung",
    tag: "Surveying",
    meta: "Jan 2025 – Feb 2025 · Ngrejo, Kec. Tanggunggunung, Kab. Tulungagung",
    images: ["images/jls1.jpeg","images/jls2.jpeg","images/jls3.jpeg","images/jls4.jpeg"],
    desc: "Magang sebagai Asisten Surveyor pada proyek pembangunan Jalan Lintas Selatan (JLS) Lot. 1a, STA.400–STA.600, Ngrejo, Kecamatan Tanggunggunung, Kabupaten Tulungagung. Kegiatan meliputi stake out titik koordinat galian menggunakan Total Station dan pengawasan metode kerja kontraktor.",
    chips: ["Stake Out","Total Station","Koordinat Galian","Pengawasan Metode Kerja","Jalan Nasional"]
  },
  {
    title: "KKN Tematik Pompa Hidram Jember",
    tag: "KKN Tematik",
    meta: "Jul 2024 – Okt 2024 · Desa Sanenrejo, Jember, Jawa Timur",
    images: ["images/kkn1.jpeg", "images/kkn2.jpeg", "images/kkn3.jpeg"],
    desc: "Proyek KKN Tematik ITS dengan fokus pengembangan pompa hidram portabel sebagai solusi distribusi air untuk petani Desa Sanenrejo, Jember. Pompa hidram dibuat dari bahan pipa paralon dengan biaya terjangkau dan berhasil diuji coba langsung di lapangan.",
    chips: ["Pompa Hidram","Distribusi Air","Pipa Paralon","Pertanian Berkelanjutan","ITS KKN"]
  }
];

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}

// ── Hamburger ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.classList.remove('active');
  });
});

// ═══════════════════════════════════════════════════════════════
//  CARD CAROUSEL — autoplay, pauses on hover, resumes after
// ═══════════════════════════════════════════════════════════════
const cardCarousels = [];

function initCardCarousels() {
  document.querySelectorAll('.carousel').forEach((el, carouselIdx) => {
    const slides = el.querySelectorAll('.carousel-slide');
    const dots   = el.querySelectorAll('.cdot');
    const counter = el.querySelector('.carousel-counter');
    const total  = slides.length;
    if (total <= 1) return; // single image — nothing to do

    let current = 0;
    let timer   = null;
    let paused  = false;

    function goTo(idx) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (idx + total) % total;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      counter.textContent = `${current + 1} / ${total}`;
    }

    function next() { goTo(current + 1); }

    function startAuto() {
      if (timer) return;
      timer = setInterval(next, 3000);
    }
    function stopAuto() {
      clearInterval(timer);
      timer = null;
    }

    // Pause on card hover
    const card = el.closest('.project-card');
    card.addEventListener('mouseenter', () => { paused = true; stopAuto(); });
    card.addEventListener('mouseleave', () => { paused = false; startAuto(); });

    // Pause when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAuto();
      else if (!paused) startAuto();
    });

    startAuto();

    cardCarousels[carouselIdx] = { goTo, current: () => current };
  });
}

document.addEventListener('DOMContentLoaded', initCardCarousels);

// ═══════════════════════════════════════════════════════════════
//  MODAL — manual gallery with prev/next + dots + swipe
// ═══════════════════════════════════════════════════════════════
const modalOverlay   = document.getElementById('modalOverlay');
const modalTrack     = document.getElementById('modalGalleryTrack');
const mgalPrev       = document.getElementById('mgalPrev');
const mgalNext       = document.getElementById('mgalNext');
const mgalCounter    = document.getElementById('mgalCounter');
const mgalDots       = document.getElementById('mgalDots');
const modalTag       = document.getElementById('modalTag');
const modalTitle     = document.getElementById('modalTitle');
const modalMeta      = document.getElementById('modalMeta');
const modalDesc      = document.getElementById('modalDesc');
const modalChips     = document.getElementById('modalChips');

let modalImages   = [];
let modalCurrent  = 0;

function renderModalGallery() {
  const total = modalImages.length;

  // Build imgs
  modalTrack.innerHTML = modalImages.map((src, i) =>
    `<img src="${src}" alt="Foto ${i+1}" class="${i === modalCurrent ? 'active' : ''}" />`
  ).join('');

  // Dots
  mgalDots.innerHTML = modalImages.map((_, i) =>
    `<span class="cdot ${i === modalCurrent ? 'active' : ''}" onclick="modalGoTo(${i})"></span>`
  ).join('');

  // Counter
  mgalCounter.textContent = `${modalCurrent + 1} / ${total}`;
  mgalPrev.disabled = modalCurrent === 0;
  mgalNext.disabled = modalCurrent === total - 1;

  // Hide nav if only 1 image
  const showNav = total > 1;
  mgalPrev.style.display = showNav ? 'flex' : 'none';
  mgalNext.style.display = showNav ? 'flex' : 'none';
  mgalDots.style.display = showNav ? 'flex' : 'none';
}

function modalGoTo(idx) {
  const imgs = modalTrack.querySelectorAll('img');
  const dots = mgalDots.querySelectorAll('.cdot');
  imgs[modalCurrent].classList.remove('active');
  dots[modalCurrent].classList.remove('active');
  modalCurrent = Math.max(0, Math.min(idx, modalImages.length - 1));
  imgs[modalCurrent].classList.add('active');
  dots[modalCurrent].classList.add('active');
  mgalCounter.textContent = `${modalCurrent + 1} / ${modalImages.length}`;
  mgalPrev.disabled = modalCurrent === 0;
  mgalNext.disabled = modalCurrent === modalImages.length - 1;
}

function modalPrev() { modalGoTo(modalCurrent - 1); }
function modalNext() { modalGoTo(modalCurrent + 1); }

// Keyboard arrow navigation
document.addEventListener('keydown', e => {
  if (!modalOverlay.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  modalPrev();
  if (e.key === 'ArrowRight') modalNext();
  if (e.key === 'Escape')     closeModal();
});

// Touch swipe in modal
let swipeStartX = 0;
modalTrack.addEventListener('touchstart', e => {
  swipeStartX = e.touches[0].clientX;
}, { passive: true });
modalTrack.addEventListener('touchend', e => {
  const diff = swipeStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    diff > 0 ? modalNext() : modalPrev();
  }
});

function openModal(index) {
  const p = projects[index];
  modalImages  = p.images;
  modalCurrent = 0;

  renderModalGallery();

  modalTag.textContent   = p.tag;
  modalTitle.textContent = p.title;
  modalMeta.textContent  = p.meta;
  modalDesc.textContent  = p.desc;
  modalChips.innerHTML   = p.chips.map(c => `<span>${c}</span>`).join('');

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { modalTrack.innerHTML = ''; }, 350);
}

// ── Scroll reveal ─────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll([
    '.about-grid > *', '.skill-card', '.project-card',
    '.approach-card',  '.contact-card', '.achievement-item',
    '.achievements', '.hero-text', '.hero-image-wrap',
    '.section-title', '.section-sub'
  ].join(','));

  els.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.children);
      const delay = Math.min(siblings.indexOf(entry.target) * 80, 400);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);

// ── Touch devices: tap card opens modal ───────────────────────
if (window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.addEventListener('click', e => {
      if (!e.target.classList.contains('btn-view')) openModal(i);
    });
  });
}

// ── Smooth scroll ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// ── Hero entrance ─────────────────────────────────────────────
window.addEventListener('load', () => {
  document.querySelector('.hero-text')?.classList.add('visible');
  setTimeout(() => document.querySelector('.hero-image-wrap')?.classList.add('visible'), 200);
});
