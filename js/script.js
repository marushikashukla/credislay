// ============================================
// CREDISLAY - MODERN FINTECH WEBSITE 2026
// Enhanced Interactions & Animations
// ============================================

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ============================================
// TESTIMONIAL SLIDER
// ============================================
class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.autoAdvance = null;
        
        if (this.slides.length) {
            this.init();
        }
    }
    
    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        if (this.dots.length) {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
        }
        
        this.autoAdvance = setInterval(() => this.nextSlide(), 5000);
    }
    
    showSlide(index) {
        if (!this.slides.length) return;
        
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        if (this.slides[index]) this.slides[index].classList.add('active');
        if (this.dots[index]) this.dots[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        let nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
        if (this.autoAdvance) {
            clearInterval(this.autoAdvance);
            this.autoAdvance = setInterval(() => this.nextSlide(), 5000);
        }
    }
}

// ============================================
// FAQ ACCORDION
// ============================================
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        if (this.faqItems.length) {
            this.init();
        }
    }
    
    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => this.toggleItem(item));
            }
        });
    }
    
    toggleItem(item) {
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    }
}

// ============================================
// PRODUCTS ANIMATION
// ============================================
class ProductsAnimation {
    constructor() {
        this.productCards = document.querySelectorAll('.product-card');
        if (this.productCards.length) {
            this.init();
        }
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        this.productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    setupHoverEffects() {
        this.productCards.forEach(card => {
            const contentCard = card.querySelector('.content-card');
            if (contentCard) {
                card.addEventListener('mouseenter', () => {
                    contentCard.style.transform = 'translateY(-8px) scale(1.02)';
                });
                card.addEventListener('mouseleave', () => {
                    contentCard.style.transform = 'translateY(0) scale(1)';
                });
            }
        });
    }
}

// ============================================
// CONTACT FORM WITH MAILTO
// ============================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value?.trim() || '';
        const email = document.getElementById('email')?.value?.trim() || '';
        const phone = document.getElementById('phone')?.value?.trim() || '';
        const message = document.getElementById('message')?.value?.trim() || '';
        
        let errors = [];
        
        if (!name) {
            errors.push('Please enter your name');
            this.highlightField('name');
        } else if (name.length < 2) {
            errors.push('Name must be at least 2 characters');
            this.highlightField('name');
        } else {
            this.clearHighlight('name');
        }
        
        if (!email) {
            errors.push('Please enter your email address');
            this.highlightField('email');
        } else if (!this.isValidEmail(email)) {
            errors.push('Please enter a valid email address');
            this.highlightField('email');
        } else {
            this.clearHighlight('email');
        }
        
        if (!phone) {
            errors.push('Please enter your phone number');
            this.highlightField('phone');
        } else if (!this.isValidPhone(phone)) {
            errors.push('Please enter a valid 10-digit phone number');
            this.highlightField('phone');
        } else {
            this.clearHighlight('phone');
        }
        
        if (!message) {
            errors.push('Please enter your message');
            this.highlightField('message');
        } else if (message.length < 10) {
            errors.push('Message must be at least 10 characters');
            this.highlightField('message');
        } else {
            this.clearHighlight('message');
        }
        
        if (errors.length > 0) {
            this.showMessage(errors.join('. '), 'error');
            return false;
        }
        
        this.openEmailClient({ name, email, phone, message });
        return false;
    }
    
    openEmailClient(data) {
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Email...';
        
        const subject = `New Contact Form Submission from ${data.name}`;
        const body = `Name: ${data.name}%0AEmail: ${data.email}%0APhone: ${data.phone}%0A%0AMessage:%0A${data.message}%0A%0A---%0ASubmitted from CrediSlay Website%0ADate: ${new Date().toLocaleString()}`;
        
        window.location.href = `mailto:contact@credislay.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        this.showMessage('✓ Opening your email client. Please click Send to complete submission.', 'success');
        this.form.reset();
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 2000);
        
        ['name', 'email', 'phone', 'message'].forEach(id => {
            this.clearHighlight(id);
        });
        
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    }
    
    highlightField(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#dc3545';
            field.style.borderWidth = '2px';
        }
    }
    
    clearHighlight(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '';
            field.style.borderWidth = '';
        }
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/[\s\-+]/g, ''));
    }
    
    showMessage(message, type) {
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 12px 16px;
            margin-top: 16px;
            border-radius: 8px;
            font-size: 14px;
            text-align: center;
            animation: fadeIn 0.3s ease;
        `;
        
        if (type === 'success') {
            messageElement.style.backgroundColor = '#D1FAE5';
            messageElement.style.color = '#065F46';
            messageElement.style.border = '1px solid #34D399';
        } else {
            messageElement.style.backgroundColor = '#FEE2E2';
            messageElement.style.color = '#991B1B';
            messageElement.style.border = '1px solid #F87171';
        }
        
        this.form.appendChild(messageElement);
        
        setTimeout(() => {
            if (messageElement) messageElement.remove();
        }, 5000);
        
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ============================================
// RIPPLE EFFECT FOR BUTTONS
// ============================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
    
    button.appendChild(ripple);
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetText = counter.innerText;
                const target = parseInt(targetText);
                
                if (!isNaN(target)) {
                    let current = 0;
                    const increment = target / 50;
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            if (current > target) current = target;
                            counter.innerText = Math.floor(current) + (targetText.includes('+') ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    updateCounter();
                }
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ============================================
// 3D CARD HOVER EFFECT
// ============================================
function init3DCards() {
    const cards = document.querySelectorAll('.card, .feature-card, .product-card, .mini-feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const statsBar = document.querySelector('.stats-bar');
        
        if (heroContent && scrolled < 800) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - scrolled / 800;
        }
        
        if (statsBar && scrolled < 600) {
            statsBar.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// ============================================
// DYNAMIC BACKGROUND GRADIENT
// ============================================
function initDynamicGradient() {
    let hue = 0;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        setInterval(() => {
            if (window.scrollY < 100) {
                hue = (hue + 0.5) % 360;
                hero.style.background = `linear-gradient(135deg, 
                    hsl(${hue}, 60%, 8%) 0%, 
                    hsl(${hue + 20}, 50%, 12%) 30%, 
                    hsl(${hue + 40}, 40%, 10%) 70%,
                    hsl(${hue + 20}, 50%, 8%) 100%)`;
            }
        }, 100);
    }
}

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.6s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 60px;
        height: 60px;
        border: 3px solid rgba(0, 122, 255, 0.2);
        border-top-color: #007AFF;
        border-right-color: #00D4FF;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
    
    preloader.appendChild(loader);
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }, 500);
    });
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
function showWelcomeMessage() {
    console.log('%c🚀 CrediSlay v2026 | Fintech Redefined', 'color: #007AFF; font-size: 18px; font-weight: bold;');
    console.log('%c✨ Smarter Business Credit, Simplified.', 'color: #00D4FF; font-size: 14px;');
    console.log('%c⚡ Powered by Innovation | Built for Growth', 'color: #FFFFFF; font-size: 12px;');
}

// ============================================
// ADD RIPPLE STYLES
// ============================================
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 CrediSlay - Initializing...');
    
    // Initialize all classes
    new TestimonialSlider();
    new FAQAccordion();
    new ProductsAnimation();
    new ContactForm();
    
    // Initialize enhancements
    animateNumbers();
    init3DCards();
    initParallax();
    initDynamicGradient();
    addRippleStyles();
    showWelcomeMessage();
    
    // Add ripple effect to buttons
    document.querySelectorAll('.cta-button, .submit-btn, .product-cta, .learn-more, .footer-cta, .slider-btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.feature-card, .card, .process-step, .product-card, .mini-feature-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .card, .mini-feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Image error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            console.log('Image failed to load:', img.src);
        });
    });
    
    console.log('✅ All systems operational. CrediSlay is ready!');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && !e.target.closest('.nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Preloader - Start after DOM loads
window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
});

// Add fade-in animation keyframes if not exists
if (!document.querySelector('#fadeInKeyframes')) {
    const style = document.createElement('style');
    style.id = 'fadeInKeyframes';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}
