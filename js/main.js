const PORTFOLIO = [
  { file: 'assets/images/portfolio/agencia-viagens-01.png', cat: 'viagens',    label: 'Agência de Viagens',  title: 'Hellotur — Post Institucional' },
  { file: 'assets/images/portfolio/agencia-viagens-02.png', cat: 'viagens',    label: 'Agência de Viagens',  title: 'Hellotur — Conteúdo Estratégico' },
  { file: 'assets/images/portfolio/agencia-viagens-03.png', cat: 'viagens',    label: 'Agência de Viagens',  title: 'Hellotur — Social Media' },
  { file: 'assets/images/portfolio/agencia-viagens-04.png', cat: 'viagens',    label: 'Agência de Viagens',  title: 'Hellotur — Design de Post' },
  { file: 'assets/images/portfolio/agencia-viagens-05.png', cat: 'viagens',    label: 'Agência de Viagens',  title: 'Hellotur — Campanha' },
  { file: 'assets/images/portfolio/agencia-viagens-06.png', cat: 'viagens',    label: 'Agência de Viagens',  title: 'Hellotur — Promoção' },
  { file: 'assets/images/portfolio/agencia-viagens-07.png', cat: 'viagens',    label: 'Agência de Viagens',  title: 'Hellotur — Story' },
  { file: 'assets/images/portfolio/clinica-infantil-01.png', cat: 'clinica',   label: 'Clínica Infantil',    title: 'GiroSol — Post Institucional' },
  { file: 'assets/images/portfolio/clinica-infantil-02.png', cat: 'clinica',   label: 'Clínica Infantil',    title: 'GiroSol — Conteúdo Educativo' },
  { file: 'assets/images/portfolio/clinica-infantil-03.png', cat: 'clinica',   label: 'Clínica Infantil',    title: 'GiroSol — Social Media' },
  { file: 'assets/images/portfolio/clinica-infantil-04.png', cat: 'clinica',   label: 'Clínica Infantil',    title: 'GiroSol — Design' },
  { file: 'assets/images/portfolio/clinica-infantil-05.png', cat: 'clinica',   label: 'Clínica Infantil',    title: 'GiroSol — Campanha' },
  { file: 'assets/images/portfolio/salao-curvaturas-01.png', cat: 'salao',     label: 'Salão de Curvaturas', title: 'Pretame — Social Media' },
  { file: 'assets/images/portfolio/salao-curvaturas-02.png', cat: 'salao',     label: 'Salão de Curvaturas', title: 'Pretame — Design de Post' },
  { file: 'assets/images/portfolio/laboratorio-01.png',      cat: 'laboratorio', label: 'Laboratório',       title: 'Laboratório — Post Estratégico' },
  { file: 'assets/images/portfolio/laboratorio-02.png',      cat: 'laboratorio', label: 'Laboratório',       title: 'Laboratório — Conteúdo' },
  { file: 'assets/images/portfolio/laboratorio-03.png',      cat: 'laboratorio', label: 'Laboratório',       title: 'Laboratório — Design' },
  { file: 'assets/images/portfolio/identidade-visual-01.png', cat: 'identidade', label: 'Identidade Visual', title: 'Leve-se — Identidade Visual' },
  { file: 'assets/images/portfolio/identidade-visual-02.png', cat: 'identidade', label: 'Identidade Visual', title: 'Leve-se — Mockup de Marca' },
];

// ── Static images ──
document.getElementById('about-img-1').src = 'assets/images/portfolio/agencia-viagens-01.png';
document.getElementById('about-img-2').src = 'assets/images/portfolio/clinica-infantil-01.png';
document.getElementById('about-img-3').src = 'assets/images/portfolio/salao-curvaturas-01.png';
document.getElementById('audience-img').src = 'assets/images/portfolio/identidade-visual-01.png';

// ── Portfolio grid ──
const grid = document.getElementById('portfolio-grid');
let currentIdx = 0;

function renderGrid(filter) {
  grid.innerHTML = '';
  PORTFOLIO.forEach((item, i) => {
    const show = filter === 'all' || item.cat === filter;
    const el = document.createElement('div');
    el.className = 'portfolio-item' + (show ? '' : ' hidden');
    el.dataset.index = i;
    el.innerHTML = `
      <img src="${item.file}" alt="${item.title}" loading="lazy" />
      <div class="portfolio-overlay">
        <div class="portfolio-overlay-content">
          <div class="tag">${item.label}</div>
          <h4>${item.title}</h4>
        </div>
      </div>
    `;
    el.addEventListener('click', () => openLightbox(i));
    grid.appendChild(el);
  });
}

renderGrid('all');

// ── Filter buttons ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.filter);
  });
});

// ── Lightbox ──
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');

function openLightbox(idx) {
  currentIdx = idx;
  lbImg.src = PORTFOLIO[idx].file;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.getElementById('lb-prev').addEventListener('click', () => {
  currentIdx = (currentIdx - 1 + PORTFOLIO.length) % PORTFOLIO.length;
  lbImg.src = PORTFOLIO[currentIdx].file;
});

document.getElementById('lb-next').addEventListener('click', () => {
  currentIdx = (currentIdx + 1) % PORTFOLIO.length;
  lbImg.src = PORTFOLIO[currentIdx].file;
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') document.getElementById('lb-prev').click();
  if (e.key === 'ArrowRight') document.getElementById('lb-next').click();
});

// ── Sticky nav ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Scroll animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Counter animation ──
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => statObserver.observe(el));
