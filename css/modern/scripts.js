// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor glow effect
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);
    
    // Track mouse position for glow
    document.addEventListener('mousemove', (e) => {
        // Update the glow position with a slight delay (no easing)
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    
    // Handle hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .link, .tech-item, .showcase-list, input, textarea, .theme-switcher');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '300px';
            cursorGlow.style.height = '300px';
            cursorGlow.style.opacity = '0.9';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '200px';
            cursorGlow.style.height = '200px';
            cursorGlow.style.opacity = '0.7';
        });
    });
    
    // Disable glow on touch devices
    if ('ontouchstart' in window) {
        cursorGlow.style.display = 'none';
    }

    // Initialize preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Theme Switching
    const themeSwitcher = document.getElementById('theme-switcher');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    // Theme switcher click event
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            let theme = document.body.getAttribute('data-theme');
            
            if (theme === 'dark') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                updateThemeIcon('light');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon('dark');
            }
        });
    }

    function updateThemeIcon(theme) {
        if (!themeSwitcher) return;
        
        // Update icon based on theme
        if (theme === 'dark') {
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
            themeSwitcher.title = 'Switch to Light Mode';
        } else {
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
            themeSwitcher.title = 'Switch to Dark Mode';
        }
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animation to elements with .animate class
    const animateElements = document.querySelectorAll('.animate');
    
    if (animateElements.length > 0) {
        const observerOptions = {
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Mobile navigation toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.querySelector('.nav-pills');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            mobileMenuButton.classList.toggle('active');
        });
    }
});