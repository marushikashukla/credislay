// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-advance slides every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate corresponding dot
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
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
            question.addEventListener('click', () => this.toggleItem(item));
        });
    }
    
    toggleItem(item) {
        // Close all other items
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item) {
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
            
            card.addEventListener('mouseenter', () => {
                contentCard.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                contentCard.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Enhanced Contact Form Handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        
        // Enhanced validation
        if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (!this.isValidPhone(data.phone)) {
            this.showMessage('Please enter a valid phone number', 'error');
            return;
        }
        
        // Simulate form submission
        this.showMessage('Thank you for your application! We will contact you within 24 hours.', 'success');
        this.form.reset();
        
        // In a real application, you would send the data to a server here
        console.log('Application submitted:', data);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
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
            ${type === 'success' ? 'background: #D1FAE5; color: #065F46;' : 'background: #FEE2E2; color: #991B1B;'}
        `;
        
        this.form.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Enhanced smooth scrolling for contact form
function scrollToContactForm() {
    const contactSection = document.getElementById('contact');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = contactSection.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            // If scrolling to contact form, focus on first input
            if (targetId === '#contact') {
                setTimeout(() => {
                    const firstInput = document.querySelector('#contactForm input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 1000);
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
    
    // Initialize enhanced contact form
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
    if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});