// UPCM MSRS Scholars Guide Logic

window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('.main-nav-link');
  const nav = document.getElementById('main-nav');
  const mobileBtn = document.getElementById('mobile-menu-button');
  const header = document.getElementById('main-header');

  function showSection(id = 'home') {
    sections.forEach(sec => sec.classList.toggle('active', sec.id === id));
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    history.replaceState(null, '', `#${id}`);
    if (id === 'survey') initSurveyCharts();
  }

  nav?.addEventListener('click', e => {
    if (e.target.matches('a.main-nav-link')) {
      e.preventDefault();
      const id = e.target.getAttribute('href').substring(1);
      showSection(id);
      nav.classList.add('hidden');
      mobileBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  mobileBtn?.addEventListener('click', () => {
    const expanded = nav.classList.toggle('hidden');
    mobileBtn.setAttribute('aria-expanded', !expanded);
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow-lg', window.scrollY > 10);
  });

  window.addEventListener('popstate', () => {
    const hash = location.hash.replace('#', '') || 'home';
    showSection(hash);
  });

  showSection(location.hash.replace('#', '') || 'home');
  initFaqs();
});

function initFaqs() {
  const faqs = [
    {
      q: 'What if my Form 5 shows SLAS discount or missing fees?',
      a: 'Go to OUR for corrected Form 5 (remove SLAS). Visit IMS to update fees before printing new Form 5.'
    },
    {
      q: 'Is Landbank replacing DBP for stipends?',
      a: 'No official memo yet for MSRS, but CHED uses Landbank for other programs. Stay updated via SRO or CHEDRO.'
    },
    {
      q: 'Are LU6/summer electives covered?',
      a: 'Currently unclear. MSRS only covers standard semesters. Confirm with SRO if needed.'
    },
    {
      q: 'Why is post-stipend liquidation crucial?',
      a: 'CHED cannot release next semester’s stipend without liquidation from the last. Delays from one = delay for all.'
    },
    {
      q: 'What is the Return Service Obligation (RSO)?',
      a: '1 year of gov’t service per year of scholarship, per R.A. 11509 (Doktor Para sa Bayan Act).'
    }
  ];
  const container = document.getElementById('faq-container');
  if (!container) return;
  container.innerHTML = faqs.map(faq => `
    <details class="faq-item bg-gray-50 border border-gray-200 rounded-lg">
      <summary class="flex justify-between items-center cursor-pointer p-5">
        <h4 class="font-semibold text-md">${faq.q}</h4>
        <span class="faq-arrow text-xl">▼</span>
      </summary>
      <div class="px-5 pb-5 border-t border-gray-200 text-gray-600">
        ${faq.a}
      </div>
    </details>
  `).join('');
}

function initSurveyCharts() {
  const charts = [
    {
      id: 'impactChart',
      type: 'bar',
      labels: ['Stress/Anxiety','Borrowed from Family','Academic Impact','Skipped Meals','Delayed Rent','Delayed Materials'],
      data: [91.7, 83.3, 75.0, 66.7, 50.0, 50.0],
      bg: 'rgba(123, 17, 19, 0.7)',
      br: 'rgba(123, 17, 19, 1)',
      opts: { indexAxis: 'y', plugins: { legend: { display: false } } }
    },
    {
      id: 'relianceChart',
      type: 'doughnut',
      labels: ['Fully (100%)', 'Mostly (>50%)', 'Partially (<50%)'],
      data: [58.3, 25.0, 16.7],
      bg: ['#7B1113', '#014421', '#FBBF24'],
      opts: { plugins: { legend: { position: 'bottom' } } }
    },
    {
      id: 'livingChart',
      type: 'pie',
      labels: ['Renting', 'With Family'],
      data: [58.3, 41.7],
      bg: ['#014421', '#F59E0B'],
      opts: { plugins: { legend: { position: 'bottom' } } }
    }
  ];

  charts.forEach(({ id, type, labels, data, bg, br, opts }) => {
    const el = document.getElementById(id);
    if (!el || Chart.getChart(el)) return;
    new Chart(el.getContext('2d'), {
      type,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bg,
          borderColor: br,
          borderWidth: br ? 1 : 0
        }]
      },
      options: Object.assign({
        responsive: true,
        maintainAspectRatio: false,
        scales: type === 'bar' ? {
          x: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } }
        } : {}
      }, opts)
    });
  });
}
