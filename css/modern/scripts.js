// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor with shadow
    if (!document.querySelector('.cursor-dot') && !document.querySelector('.cursor-dot-outline')) {
        const cursorDot = document.createElement('div');
        const cursorDotOutline = document.createElement('div');
        const cursorShadow = document.createElement('div');
        
        cursorDot.classList.add('cursor-dot');
        cursorDotOutline.classList.add('cursor-dot-outline');
        cursorShadow.classList.add('cursor-shadow');
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorDotOutline);
        document.body.appendChild(cursorShadow);
        
        let mouseX = 0;
        let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        // Show cursor elements once page is loaded
        setTimeout(() => {
            cursorDot.style.opacity = '1';
            cursorDotOutline.style.opacity = '1';
            cursorShadow.style.opacity = '1';
        }, 500);
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update the shadow position
            cursorShadow.style.left = mouseX + 'px';
            cursorShadow.style.top = mouseY + 'px';
        });
        
        // Animate cursor movement
        const animate = () => {
            // Smooth animation for dot
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            
            // Slower follow for outline
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            
            // Position cursor elements
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            cursorDotOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Handle cursor over interactive elements
        const handleCursorOverInteractiveElements = () => {
            const interactiveElements = document.querySelectorAll('a, button, .link, .tech-item, .showcase-list, input, textarea, .theme-switcher');
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorDotOutline.style.borderColor = 'var(--accent-secondary)';
                    cursorShadow.style.width = '40px';
                    cursorShadow.style.height = '40px';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorDotOutline.style.borderColor = 'var(--accent-primary)';
                    cursorShadow.style.width = '30px';
                    cursorShadow.style.height = '30px';
                });
            });
        };
        
        // Initialize interactive elements handling
        setTimeout(handleCursorOverInteractiveElements, 1000);
        
        // Disable custom cursor on touch devices
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            cursorDot.style.display = 'none';
            cursorDotOutline.style.display = 'none';
            cursorShadow.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
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