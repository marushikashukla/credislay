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
        
        // Auto-advance slides every 5 seconds
        this.autoAdvance = setInterval(() => this.nextSlide(), 5000);
    }
    
    showSlide(index) {
        if (!this.slides.length) return;
        
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate corresponding dot
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
        // Reset auto-advance timer
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
        // Close all other items
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
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

// FIXED: Enhanced Contact Form Handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation
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
        
        // Enhanced validation - CHECK ALL FIELDS
        let errors = [];
        
        // Check Name
        if (!name) {
            errors.push('Please enter your name');
            this.highlightField('name');
        } else if (name.length < 2) {
            errors.push('Name must be at least 2 characters');
            this.highlightField('name');
        } else {
            this.clearHighlight('name');
        }
        
        // Check Email
        if (!email) {
            errors.push('Please enter your email address');
            this.highlightField('email');
        } else if (!this.isValidEmail(email)) {
            errors.push('Please enter a valid email address (e.g., name@example.com)');
            this.highlightField('email');
        } else {
            this.clearHighlight('email');
        }
        
        // Check Phone - STRICT VALIDATION
        if (!phone) {
            errors.push('Please enter your phone number');
            this.highlightField('phone');
        } else if (!this.isValidPhone(phone)) {
            errors.push('Please enter a valid 10-digit phone number');
            this.highlightField('phone');
        } else {
            this.clearHighlight('phone');
        }
        
        // Check Message
        if (!message) {
            errors.push('Please enter your message');
            this.highlightField('message');
        } else if (message.length < 10) {
            errors.push('Message must be at least 10 characters');
            this.highlightField('message');
        } else {
            this.clearHighlight('message');
        }
        
        // If there are errors, show them
        if (errors.length > 0) {
            this.showMessage(errors.join('. '), 'error');
            return false;
        }
        
        // All validation passed - Submit the form
        this.submitForm({ name, email, phone, message });
        return false;
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
        // Strict validation: exactly 10 digits, no letters, no special chars except + and -
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/[\s\-+]/g, ''));
    }
    
    submitForm(data) {
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            this.showMessage('✓ Thank you for your application! Our team will contact you within 24 hours.', 'success');
            this.form.reset();
            
            // Store in localStorage as backup (optional)
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push({ ...data, timestamp: new Date().toISOString() });
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Clear highlights
            ['name', 'email', 'phone', 'message'].forEach(id => {
                this.clearHighlight(id);
            });
            
        }, 1000);
        
        // For actual API submission, use this code:
        /*
        fetch('https://your-api-endpoint.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            this.showMessage('✓ Thank you for your application! Our team will contact you within 24 hours.', 'success');
            this.form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        })
        .catch(error => {
            this.showMessage('❌ Failed to submit. Please try again or call us directly.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
        */
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
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
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement) messageElement.remove();
        }, 5000);
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Smooth scrolling for anchor links
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
            
            // Close mobile menu if open
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

// Image loading fallback
function handleImageError(img) {
    console.log('Image failed to load:', img.src);
    // You could set a placeholder image here if needed
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider
    new TestimonialSlider();
    
    // Initialize FAQ accordion
    new FAQAccordion();
    
    // Initialize products animation
    new ProductsAnimation();
    
    // Initialize contact form (FIXED)
    new ContactForm();
    
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
