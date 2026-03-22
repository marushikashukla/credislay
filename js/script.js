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

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.autoAdvance = null;
        
        this.init();
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

// FAQ Accordion Functionality
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
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

// Products Section Animation
class ProductsAnimation {
    constructor() {
        this.productCards = document.querySelectorAll('.product-card');
        this.init();
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

// Contact Form with Mailto Email (Opens Email Client)
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
        
        // Get form data
        const name = document.getElementById('name')?.value?.trim() || '';
        const email = document.getElementById('email')?.value?.trim() || '';
        const phone = document.getElementById('phone')?.value?.trim() || '';
        const message = document.getElementById('message')?.value?.trim() || '';
        
        // Validation
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
        
        // Open email client with pre-filled details
        this.openEmailClient({ name, email, phone, message });
        return false;
    }
    
    openEmailClient(data) {
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Email...';
        
        // Create email content
        const subject = `New Contact Form Submission from ${data.name}`;
        const body = `Name: ${data.name}%0AEmail: ${data.email}%0APhone: ${data.phone}%0A%0AMessage:%0A${data.message}%0A%0A---%0ASubmitted from CrediSlay Website%0ADate: ${new Date().toLocaleString()}`;
        
        // Open default email client
        window.location.href = `mailto:contact@credislay.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Show success message
        this.showMessage('✓ Opening your email client. Please click Send to complete submission.', 'success');
        
        // Reset form
        this.form.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 2000);
        
        // Clear highlights
        ['name', 'email', 'phone', 'message'].forEach(id => {
            this.clearHighlight(id);
        });
        
        // Save to localStorage as backup
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
        if (existingMessage) {
            existingMessage.remove();
        }
        
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

// ============ FIX: Product "Get Started" Buttons ============
function handleProductCTA() {
    const productButtons = document.querySelectorAll('.product-cta');
    console.log('Found product buttons:', productButtons.length);
    
    productButtons.forEach((button, index) => {
        // Remove any existing click listeners to prevent duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Product button clicked:', index);
            
            const contactSection = document.getElementById('contact');
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80;
            
            if (contactSection) {
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error('Contact section not found!');
                // Fallback - try to find by class
                const fallbackContact = document.querySelector('.contact-form-section');
                if (fallbackContact) {
                    fallbackContact.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Fix all anchor links to contact section
function fixAllAnchorLinks() {
    const allAnchors = document.querySelectorAll('a[href="#contact"], a[href="#contact-form"], a[href="#contact-section"]');
    allAnchors.forEach(anchor => {
        // Skip if it's already a product-cta (handled separately)
        if (anchor.classList.contains('product-cta')) return;
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80;
            
            if (contactSection) {
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]:not(.product-cta)').forEach(anchor => {
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

// Animation on scroll
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

function handleImageError(img) {
    console.log('Image failed to load:', img.src);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Initialize all classes
    new TestimonialSlider();
    new FAQAccordion();
    new ProductsAnimation();
    new ContactForm();
    
    // Fix product CTA buttons
    handleProductCTA();
    fixAllAnchorLinks();
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.feature-card, .card, .process-step, .product-card, .mini-feature-card');
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
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
    
    console.log('All initializations complete');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && !e.target.closest('.nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Add fade-in animation CSS
const style = document.createElement('style');
style.textContent = `
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

console.log('Script loaded successfully');
