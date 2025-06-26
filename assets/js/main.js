document.addEventListener('DOMContentLoaded', function() {
    
    const faqData = [
        { question: "What should I do if my Form 5 has an SLAS discount or missing fees?", answer: "This is a critical issue that halts the process. <strong>1) If SLAS discount is present:</strong> Go to the Office of the University Registrar (OUR) and request a corrected Form 5 showing the full tuition. <strong>2) If fees are missing:</strong> Go to the Information Management Service (IMS) to have them update your assessment before generating a new Form 5." },
        { question: "There are rumors about moving to Landbank for stipends. Is this true?", answer: "CHED has partnered with Landbank for other national scholarship programs like the Tertiary Education Subsidy (TES)³. While there is no official memo yet for the MSRS program specifically, this could be a future development. Scholars should ensure their contact information is always updated to avoid issues if a transition to a new bank is announced." },
        { question: "Are LU6 midyear/summer electives covered by the scholarship?", answer: "Currently, this is not clear. Per internal communications, the MSRS guidelines primarily cover the standard first and second semesters. The coverage of midyear/summer term fees and allowances is still pending clarification from CHED. Scholars should be prepared to potentially shoulder these costs." },
        { question: "Why is the post-stipend liquidation process so important?", answer: "This is the most critical step to prevent future delays. CHED will not process the *next* semester's stipend until UPCM submits proof (the liquidation report) that the *last* one was fully paid out and documented³. Your timely submission of requirements (ID copies, Form 5, payroll signature) is essential for this report. A delay from one scholar directly delays the next stipend for everyone." },
        { question: "What is the Return Service Obligation (RSO)?", answer: "For every year of scholarship availed, you must render one year of service in a government public health office or hospital after passing the board exams. This is mandated by R.A. 11509, the 'Doktor Para sa Bayan Act'." }
    ];

    function initFaqs() {
        const container = document.getElementById('faq-container');
        if (!container) return;
        container.innerHTML = faqData.map(faq => `
            <details class="faq-item bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <summary class="w-full flex justify-between items-center text-left p-5 cursor-pointer list-none">
                    <h4 class="font-semibold text-md text-gray-800">${faq.question}</h4>
                    <span class="faq-arrow text-gray-500 text-xl transition-transform">▼</span>
                </summary>
                <div class="faq-answer px-5 pb-5 border-t border-gray-200 text-gray-600 leading-relaxed">
                    <p>${faq.answer}</p>
                </div>
            </details>`).join('');
    }

    function initSurveyCharts() {
        const copingCanvas = document.getElementById('copingChart');
        if(copingCanvas && !Chart.getChart(copingCanvas)) { // Check if chart already exists
            new Chart(copingCanvas.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Borrowed from Family/Friends', 'Reduced Food Budget', 'Delayed Rent/Bills', 'Took Formal Loan', 'Sold Belongings'],
                    datasets: [{
                        label: '% of Scholars',
                        data: [85, 78, 62, 25, 15], // Placeholder data
                        backgroundColor: 'rgba(123, 17, 19, 0.7)',
                        borderColor: 'rgba(123, 17, 19, 1)',
                        borderWidth: 1
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', scales: { x: { beginAtZero: true, max: 100 } }, plugins: { legend: { display: false }, title: { display: true, text: 'How Scholars Cover Expenses During Delays' } } }
            });
        }

        const impactCanvas = document.getElementById('impactChart');
        if(impactCanvas && !Chart.getChart(impactCanvas)) { // Check if chart already exists
            new Chart(impactCanvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Experienced Significant Stress/Anxiety', 'Academic Performance Negatively Impacted', 'Considered Dropping Out'],
                    datasets: [{ data: [92, 75, 30], backgroundColor: ['rgba(1, 68, 33, 0.7)', 'rgba(217, 119, 6, 0.7)', 'rgba(220, 38, 38, 0.6)'], borderColor: ['#FFFFFF'], borderWidth: 2 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Impact on Scholars' } } }
            });
        }
    }

    const mainNav = document.getElementById('main-nav');
    const navButtons = document.querySelectorAll('.main-nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sections = document.querySelectorAll('main > section');

    function showSection(targetId) {
        if (!targetId || !document.getElementById(targetId)) {
            targetId = 'home';
        }
        
        sections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });

        navButtons.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`);
        });
        
        if(window.history.pushState) {
            window.history.pushState(null, null, `#${targetId}`);
        } else {
            window.location.hash = `#${targetId}`;
        }

        if (targetId === 'survey') {
            initSurveyCharts();
        }
    }
    
    mainNav.addEventListener('click', (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            showSection(targetId);
            if (window.innerWidth < 1024) { mainNav.classList.add('hidden'); }
        }
    });

    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    mobileMenuButton.addEventListener('click', () => {
        mainNav.classList.toggle('hidden');
    });

    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        showSection(hash || 'home');
    });
    
    // Initial load
    initFaqs();
    const initialHash = window.location.hash.substring(1);
    showSection(initialHash || 'home');
});