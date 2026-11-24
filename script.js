/**
 * ===================================================================
 * PORTFOLIO JAVASCRIPT - ASHWINI S. GUDEKAR
 * High Performance, Interactive, Light Blue Spotlight & Fluid UX
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initSpotlight();
    initCursorGlow();
    initNavbarScroll();
    initMobileNav();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
});

/* ===== 1. TYPEWRITER EFFECT ===== */
function initTypewriter() {
    const roleText = document.getElementById('roleText');
    if (!roleText) return;

    const roles = [
        'Computational Biologist',
        'Single-Cell Genomics Enthusiast',
        'M.Tech Researcher @ IIIT Delhi',
        'Clinical NLP & Healthcare AI Dev',
        'Former CSIR-NCL Research Fellow',
        'Deep Learning Practitioner'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function tick() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2200; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before new word
        }

        setTimeout(tick, typingSpeed);
    }

    setTimeout(tick, 800);
}

/* ===== 2. SPOTLIGHT EFFECT ON GLASS CARDS ===== */
function initSpotlight() {
    const cards = document.querySelectorAll('.glass-card, .skill-pill, .pipeline-step');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ===== 3. AMBIENT CURSOR GLOW ===== */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow || window.innerWidth <= 991) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderGlow() {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;

        cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        requestAnimationFrame(renderGlow);
    }

    requestAnimationFrame(renderGlow);
}

/* ===== 4. NAVBAR SCROLL & ACTIVE LINK SCROLLSPY ===== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link scrollspy
        const scrollPosition = window.scrollY + 120;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
}

/* ===== 5. MOBILE NAVIGATION DRAWER ===== */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

/* ===== 6. PROJECT FILTER TABS ===== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96) translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ===== 7. DEEP DIVE PROJECT MODAL ===== */
const projectDetailsData = {
    clinscribe: {
        title: 'ClinScribe AI',
        subtitle: 'Clinical Speech-to-Insight & Automated Documentation System',
        period: 'Sept 2026 – Oct 2026',
        category: 'Clinical NLP & Healthcare AI',
        demoUrl: 'https://clinscribe-ai.onrender.com/',
        githubUrl: 'https://github.com/ashwini25177',
        architecture: [
            'ASR Module: OpenAI Whisper fine-tuned for clinical acoustics and physician-patient dialogue.',
            'NER & Extraction: BioBERT model fine-tuned for extracting diseases, symptoms, anatomical sites, and dosage frequencies.',
            'Summarization: Google Flan-T5 adapted for clinical abstraction to synthesize conversation into SOAP format.',
            'Standards Compliance: Maps extracted medical entities into HL7 FHIR R4-compliant JSON schemas.',
            'Deployment & Backend: Docker containerized FastAPI backend with Pydantic v2 schemas and GitHub Actions CI/CD pipeline.'
        ],
        results: 'Dramatically reduces physician charting burden while providing rigorous neural-to-regex fallback inference to prevent diagnostic omission.'
    },
    med7: {
        title: 'Med7-Plus',
        subtitle: 'Clinical Information Extraction & Medication NER System',
        period: 'May 2026 – June 2026',
        category: 'Clinical NLP & Information Extraction',
        demoUrl: 'https://med7-plus-nckaxmnqqydo8tctraasik.streamlit.app/',
        githubUrl: 'https://github.com/ashwini25177',
        architecture: [
            'Core Engine: Extended the Med7 clinical NLP framework for high-precision 7-category medication entity tagging.',
            'Negation & Context: NegEx rule-based context matching to classify medications as current, discontinued, or negated.',
            'RxNorm Mapping: Automated standardization of drug names against standard RxNorm concept unique identifiers (CUIs).',
            'FHIR Export: Generates structured HL7 FHIR R4 MedicationStatement resources.',
            'Interactive Dashboard: Streamlit interactive interface with visual entity highlighting and CSV/JSON export.'
        ],
        results: 'Achieved high strict and lenient F1 scores across challenging synthetic clinical notes with zero runtime crashes.'
    },
    humancellai: {
        title: 'HumanCellAI',
        subtitle: 'Citation-Grounded RAG System for Single-Cell Biology Research',
        period: 'Feb 2026 – Mar 2026',
        category: 'Bioinformatics & RAG',
        demoUrl: 'https://humancellai-wcyemmuhdq82jxnfarjuve.streamlit.app/',
        githubUrl: 'https://github.com/ashwini25177/HumanCellAI',
        architecture: [
            'Literature Corpus: Indexed extensive scientific literature on cardiogenesis, scRNA-seq, spatial transcriptomics, and trajectory algorithms.',
            'FAISS Vector Store: Dense passage embeddings generated using bio-specific embedding models.',
            'Cross-Encoder Reranker: Multi-stage reranking pipeline to prioritize the most contextually relevant evidence snippets.',
            'Evidence Grounding: Prompt-engineered local LLM requiring strict inline citation citations with source DOI links.',
            'Deployment: Hosted on Streamlit Community Cloud with interactive evidence source inspection pane.'
        ],
        results: 'Mitigates LLM hallucinations in complex biological reasoning and provides instant citation tracing for research queries.'
    },
    gm12878: {
        title: 'Gene Expression Prediction in GM12878',
        subtitle: 'Integrating Transcription Factor Motifs and Epigenomic Features',
        period: 'Computational Genomics',
        category: 'Machine Learning & Genomics',
        demoUrl: null,
        githubUrl: 'https://github.com/ashwini25177/Gene-Expression-Prediction-from-TF-Motif-and-Epigenomic-Features-in-GM12878',
        architecture: [
            'Data Intersection: Intersected ENCODE ChIP-seq enhancer peaks with JASPAR 2024 motif position weight matrices (PWMs).',
            'Feature Matrix: Linked promoter windows and distal regulatory elements to RNA-seq expression values in GM12878 cell lines.',
            'Model Evaluation: Compared LASSO regularized regression, Multi-Layer Perceptrons, Branched Deep Neural Networks, and XGBoost.',
            'Feature Ablation: Discovered that combinatorial sequence and histone modifications account for over 70% of predictive variance.'
        ],
        results: 'XGBoost achieved the highest test R2 score, outperforming linear baselines and highlighting dominant TF regulatory pairs.'
    },
    calpain: {
        title: 'Drug Screening Against Calpain-1',
        subtitle: 'Virtual Screening via Molecular Docking & MD Simulation',
        period: 'CADD / Structural Biology',
        category: 'Chemoinformatics & Molecular Modeling',
        demoUrl: null,
        githubUrl: 'https://github.com/ashwini25177/calpain-molecular-docking',
        architecture: [
            'Target Preparation: Structural refinement and active site grid definition of Calpain-1 (PDB ID).',
            'Compound Screening: Automated structure-based virtual screening of curated libraries with AutoDock Vina.',
            'ADMET & Drug-likeness: Filtered through Lipinski Rule of 5 and pharmacokinetic profile metrics.',
            'GROMACS MD: 100ns all-atom molecular dynamics simulation in explicit solvent to calculate RMSD, RMSF, and binding stability.'
        ],
        results: 'Discovered novel hit compound exhibiting -9.4 kcal/mol affinity, maintaining stable hydrogen bonding throughout the 100ns simulation.'
    },
    zinbvae: {
        title: 'ZINB-VAE for scRNA-seq Denoising',
        subtitle: 'Zero-Inflated Negative Binomial Autoencoder for Sparse Count Data',
        period: 'Deep Generative Modeling',
        category: 'scRNA-seq & Deep Learning',
        demoUrl: null,
        githubUrl: 'https://github.com/ashwini25177/zinb-vae-scrna-seq',
        architecture: [
            'Statistical Model: Parameterized Zero-Inflated Negative Binomial distribution to handle dropout excess zeros and overdispersion.',
            'Neural Architecture: Encoder-decoder variational framework built from scratch in PyTorch.',
            'KL Annealing: Dynamic scheduling of KL divergence penalty to avoid posterior collapse during training.',
            'Latent Space Analysis: Extracted 32-dimensional invariant latent embeddings for clustering and visualization.'
        ],
        results: 'Significantly outperformed standard MSE autoencoders and PCA on expression imputation benchmark datasets.'
    },
    fetalbrain: {
        title: 'Cross-Species Fetal Brain Alignment',
        subtitle: 'Single-Cell Transcriptomics & Temporal Neurodevelopmental Mapping',
        period: 'Developmental Biology',
        category: 'Comparative Genomics',
        demoUrl: null,
        githubUrl: 'https://github.com/ashwini25177',
        architecture: [
            'Dataset Integration: Normalized and harmonized human and mouse fetal brain single-cell transcriptomic profiles.',
            'Pathway Scoring: Implemented UniPath pathway scoring to translate individual gene expressions into biological pathway activations.',
            'Trajectory Inference: Mapped continuous pseudo-time developmental trajectories of radial glia into mature neural lineages.'
        ],
        results: 'Identified key conserved neurogenesis checkpoints alongside species-divergent cortical expansion programs.'
    }
};

function openProjectModal(projectId) {
    const project = projectDetailsData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    if (!modal || !modalContent) return;

    let actionButtonsHtml = '';
    if (project.demoUrl) {
        actionButtonsHtml += `
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fas fa-arrow-up-right-from-square"></i> Launch Live Application
            </a>
        `;
    }
    if (project.githubUrl) {
        actionButtonsHtml += `
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <i class="fab fa-github"></i> View GitHub Source
            </a>
        `;
    }

    modalContent.innerHTML = `
        <div class="badge badge-accent" style="margin-bottom: 12px;">${project.category}</div>
        <h3>${project.title}</h3>
        <p class="modal-tagline">${project.subtitle} • <span style="color: var(--text-muted);">${project.period}</span></p>

        <div class="modal-section">
            <h4><i class="fas fa-microchip"></i> System Architecture & Methodology</h4>
            <ul>
                ${project.architecture.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h4><i class="fas fa-chart-line"></i> Outcomes & Impact</h4>
            <p>${project.results}</p>
        </div>

        <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 26px; padding-top: 20px; border-top: 1px solid rgba(14, 165, 233, 0.2);">
            ${actionButtonsHtml}
        </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    if (!modal) return;

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ===== 8. CONTACT FORM SUBMISSION ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!submitBtn) return;
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Message...</span> <i class="fas fa-spinner fa-spin"></i>`;

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = `<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. Ashwini will get back to you soon.`;
                }
                form.reset();
            } else {
                throw new Error('Form submission failed.');
            }
        } catch (error) {
            if (formStatus) {
                formStatus.className = 'form-status error';
                formStatus.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Oops! There was an issue sending your message. Please reach out directly at <a href="mailto:ashwini25177@iiitd.ac.in" style="color: inherit; text-decoration: underline;">ashwini25177@iiitd.ac.in</a>.`;
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.display = 'none';
                }
            }, 8000);
        }
    });
}

/* ===== 9. SCROLL REVEAL / INTERSECTION OBSERVER ===== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedItems = document.querySelectorAll(
        '.glass-card, .timeline-item, .pillar-card, .stat-card, .award-card, .funfact-card, .skill-category, .leadership-card'
    );

    animatedItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

/* ===== 10. BACK TO TOP BUTTON ===== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 380) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== 11. SMOOTH SCROLL FOR ANCHORS ===== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
