// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const earlyAccessForm = document.getElementById('early-access-form');
    
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const childAge = document.getElementById('child-age').value;
            const platform = document.getElementById('platform').value;
            
            // In a real implementation, this would send data to a server
            // For the prototype, we'll just show a success message
            
            // Hide the form
            earlyAccessForm.innerHTML = `
                <div class="success-message">
                    <img src="images/success-icon.png" alt="Success">
                    <h3>Thank You, ${name}!</h3>
                    <p>You've been added to our early access waiting list. We'll contact you at ${email} when BabyMood is ready for beta testing.</p>
                    <p>In the meantime, follow us on social media for updates on our progress.</p>
                    <div class="social-links">
                        <a href="#" class="social-link"><img src="images/icon-facebook.png" alt="Facebook"></a>
                        <a href="#" class="social-link"><img src="images/icon-twitter.png" alt="Twitter"></a>
                        <a href="#" class="social-link"><img src="images/icon-instagram.png" alt="Instagram"></a>
                    </div>
                </div>
            `;
            
            // Scroll to the success message
            window.scrollTo({
                top: earlyAccessForm.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (header && nav && !document.querySelector('.mobile-nav-toggle')) {
            const mobileNavToggle = document.createElement('button');
            mobileNavToggle.classList.add('mobile-nav-toggle');
            mobileNavToggle.innerHTML = '<span></span><span></span><span></span>';
            header.insertBefore(mobileNavToggle, nav);
            
            mobileNavToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.classList.toggle('active');
            });
            
            // Close mobile nav when clicking a link
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('active');
                    mobileNavToggle.classList.remove('active');
                });
            });
        }
    };
    
    // Call createMobileNav on load and resize
    if (window.innerWidth < 768) {
        createMobileNav();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            if (!document.querySelector('.mobile-nav-toggle')) {
                createMobileNav();
            }
        }
    });
    
    // Add styles for mobile nav
    const addMobileNavStyles = () => {
        if (!document.getElementById('mobile-nav-styles')) {
            const style = document.createElement('style');
            style.id = 'mobile-nav-styles';
            style.textContent = `
                @media (max-width: 768px) {
                    nav {
                        display: none;
                    }
                    
                    nav.active {
                        display: block;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background-color: white;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                    }
                    
                    nav.active ul {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    nav.active ul li {
                        margin: 10px 0;
                    }
                    
                    .mobile-nav-toggle {
                        display: block;
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 10px;
                    }
                    
                    .mobile-nav-toggle span {
                        display: block;
                        width: 25px;
                        height: 3px;
                        background-color: var(--dark-color);
                        margin: 5px 0;
                        transition: all 0.3s ease;
                    }
                    
                    .mobile-nav-toggle.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    
                    .mobile-nav-toggle.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-nav-toggle.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -7px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    addMobileNavStyles();
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentIndex = 0;
        const testimonials = testimonialSlider.children;
        const totalTestimonials = testimonials.length;
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('slider-dots');
        
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.parentNode.appendChild(dotsContainer);
        
        // Add slider navigation
        const prevButton = document.createElement('button');
        prevButton.classList.add('slider-nav', 'prev');
        prevButton.innerHTML = '&lt;';
        prevButton.addEventListener('click', prevSlide);
        
        const nextButton = document.createElement('button');
        nextButton.classList.add('slider-nav', 'next');
        nextButton.innerHTML = '&gt;';
        nextButton.addEventListener('click', nextSlide);
        
        testimonialSlider.parentNode.appendChild(prevButton);
        testimonialSlider.parentNode.appendChild(nextButton);
        
        // Add slider styles
        const sliderStyles = document.createElement('style');
        sliderStyles.textContent = `
            .testimonials {
                position: relative;
            }
            
            .slider-dots {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
            
            .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: var(--light-gray);
                margin: 0 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .dot.active {
                background-color: var(--primary-color);
            }
            
            .slider-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 10;
            }
            
            .slider-nav.prev {
                left: 10px;
            }
            
            .slider-nav.next {
                right: 10px;
            }
            
            @media (max-width: 768px) {
                .slider-nav {
                    display: none;
                }
            }
        `;
        document.head.appendChild(sliderStyles);
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            updateSlider();
        }
        
        function updateSlider() {
            // Update testimonial position
            testimonialSlider.scrollTo({
                left: testimonials[currentIndex].offsetLeft,
                behavior: 'smooth'
            });
            
            // Update dots
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Auto-advance slider every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Add success message styles
    const successStyles = document.createElement('style');
    successStyles.textContent = `
        .success-message {
            text-align: center;
            padding: 20px;
        }
        
        .success-message img {
            width: 60px;
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            color: var(--success-color);
            margin-bottom: 15px;
        }
        
        .success-message .social-links {
            justify-content: center;
            margin-top: 20px;
        }
    `;
    document.head.appendChild(successStyles);
});
