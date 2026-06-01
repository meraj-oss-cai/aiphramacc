// ==================== HAMBURGER MENU ====================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // ==================== SCROLL ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animations to elements
    const animateElements = document.querySelectorAll(
        '.feature, .highlight, .role-card, .pricing-card, .testimonial, ' +
        '.differentiator, .value, .team-member, .milestone, .partner, ' +
        '.faq-item, .contact-info-item'
    );

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==================== DOWNLOAD FUNCTION ====================
    window.downloadAIPharmAccount = function() {
        // Google Drive download link
        const downloadLink = 'https://drive.google.com/file/d/1Xcnq_mvWKxgJjkIMPn2hSuX_F1tchz7S/view?usp=sharing';

        // Open download link in new tab
        window.open(downloadLink, '_blank');

        console.log('Download started from Google Drive');
    };

    // Attach download handler to all "Start Free" and "Start Now" buttons
    document.querySelectorAll('a[href="contact.html"]').forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('start') || buttonText.includes('free')) {
            button.addEventListener('click', function(e) {
                // Check if this is specifically a download button
                if (this.getAttribute('data-action') === 'download') {
                    e.preventDefault();
                    window.downloadAIPharmAccount();
                }
            });
        }
    });

    // ==================== CONTACT FORM ====================
    window.handleContactForm = function(event) {
        event.preventDefault();

        const form = event.target;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Show success message
        alert(`Thank you for reaching out, ${name}!\n\nWe've received your message and will get back to you within 24 hours at ${email}.\n\nBest regards,\nCloudAiSoft Team`);

        // Clear form
        form.reset();

        // In a real application, you would send this data to a backend server
        console.log({
            name,
            email,
            company,
            subject,
            message,
            timestamp: new Date()
        });
    };

    // ==================== HEADER SCROLL EFFECT ====================
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ==================== FLOATING ELEMENTS ====================
    const floatingElements = document.querySelectorAll('.product-demo');
    floatingElements.forEach(element => {
        element.classList.add('float');
    });

    // ==================== FEATURE HOVER EFFECTS ====================
    const features = document.querySelectorAll('.feature, .tech-item, .value');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ==================== ACTIVE NAV LINK ====================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.style.color = 'var(--primary)';
                link.style.fontWeight = 'bold';
            } else {
                link.style.color = 'var(--text)';
                link.style.fontWeight = '500';
            }
        });
    }

    setActiveNavLink();

    // ==================== COUNTING ANIMATIONS ====================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .stat-box-number');

        counters.forEach(counter => {
            if (counter.textContent.includes('+')) {
                // Skip counters that end with +
                return;
            }

            const finalValue = parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));
            const duration = 2000;
            const steps = 60;
            const stepValue = finalValue / steps;
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const currentValue = (stepValue * currentStep).toFixed(1);

                if (currentStep < steps) {
                    counter.textContent = currentValue;
                } else {
                    counter.textContent = finalValue;
                    clearInterval(timer);
                }
            }, duration / steps);
        });
    }

    // Trigger counter animation when stats are in view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsBoxes = document.querySelectorAll('.stats, .stats-box');
    statsBoxes.forEach(box => statsObserver.observe(box));

    // ==================== FORM VALIDATION ====================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!email.includes('@')) {
                alert('Please enter a valid email address');
                e.preventDefault();
                return;
            }

            if (message.trim().length < 10) {
                alert('Message must be at least 10 characters long');
                e.preventDefault();
                return;
            }
        });
    }

    // ==================== TESTIMONIAL CAROUSEL (OPTIONAL) ====================
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 3) {
        let currentTestimonial = 0;

        function rotateTestimonials() {
            testimonials.forEach((t, index) => {
                t.style.display = index === currentTestimonial ? 'block' : 'none';
            });
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }

        // Rotate every 5 seconds if there are many testimonials
        // setInterval(rotateTestimonials, 5000);
    }

    // ==================== BACK TO TOP BUTTON ====================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff006e, #7c3aed);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(255, 0, 110, 0.3);
        transition: all 0.3s;
        z-index: 999;
    `;

    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopButton.addEventListener('mouseover', () => {
        backToTopButton.style.transform = 'scale(1.1)';
    });

    backToTopButton.addEventListener('mouseout', () => {
        backToTopButton.style.transform = 'scale(1)';
    });
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + / to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // Add search functionality here if needed
    }

    // Esc to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    }
});
