/**
 * Portfolio Website JavaScript
 * FullStack Developer • ML Researcher • Ethical Hacker • ICT Instructor • Physics Tutor
 */

// ============================================================================
// Initialize
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavigation();
    initParticles();
    initTypingEffect();
    initStatsCounter();
    initProjectFilters();
    initTeachingTabs();
    initContactForm();
    initScrollAnimations();
    initBackToTop();
    fetchGitHubStats();
    loadProjects();
});

// ============================================================================
// Custom Cursor
// ============================================================================

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .expertise-card, .project-card, .course-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(1.5)';
            follower.style.opacity = '0.8';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.opacity = '0.5';
        });
    });
}

// ============================================================================
// Navigation
// ============================================================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

// ============================================================================
// Particle Background
// ============================================================================

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawLines();
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

// ============================================================================
// Typing Effect
// ============================================================================

function initTypingEffect() {
    const element = document.querySelector('.hero-subtitle');
    if (!element) return;
    
    const texts = [
        'FullStack Developer • ML Researcher • Ethical Hacker',
        'ICT Instructor • Physics Tutor',
        'Building the Future Through Code & Science'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        element.textContent = currentText;
        
        if (!isDeleting && charIndex === fullText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    type();
}

// ============================================================================
// Stats Counter
// ============================================================================

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                let current = 0;
                const increment = count / 50;
                
                const updateCounter = () => {
                    if (current < count) {
                        current += increment;
                        target.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = count;
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ============================================================================
// Project Filters
// ============================================================================

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsContainer = document.getElementById('projects-container');
    
    if (!filterBtns.length || !projectsContainer) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (filter === 'all' || project.getAttribute('data-category') === filter) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// ============================================================================
// Load Projects
// ============================================================================

async function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    const projects = [
        {
            title: 'Neural Network Visualizer',
            description: 'Interactive web app for visualizing and training neural networks in real-time.',
            image: 'assets/images/projects/nn-visualizer.jpg',
            tech: ['React', 'TensorFlow.js', 'D3.js', 'WebGL'],
            category: 'ml',
            github: 'https://github.com/yourusername/neural-network-visualizer',
            demo: 'https://nn-visualizer.demo'
        },
        {
            title: 'SecureShare',
            description: 'End-to-end encrypted file sharing platform with zero-knowledge architecture.',
            image: 'assets/images/projects/secureshare.jpg',
            tech: ['Python', 'FastAPI', 'React', 'WebCrypto', 'PostgreSQL'],
            category: 'security',
            github: 'https://github.com/yourusername/secureshare',
            demo: 'https://secureshare.demo'
        },
        {
            title: 'EduPlatform LMS',
            description: 'Learning management system for online courses with real-time collaboration.',
            image: 'assets/images/projects/eduplatform.jpg',
            tech: ['Next.js', 'Node.js', 'WebRTC', 'MongoDB', 'Redis'],
            category: 'fullstack',
            github: 'https://github.com/yourusername/eduplatform',
            demo: 'https://eduplatform.demo'
        },
        {
            title: 'Physics Lab Simulator',
            description: 'Interactive physics simulations for high school and college students.',
            image: 'assets/images/projects/physics-sim.jpg',
            tech: ['Three.js', 'JavaScript', 'Canvas', 'WebGL'],
            category: 'education',
            github: 'https://github.com/yourusername/physics-lab-simulator',
            demo: 'https://physics-sim.demo'
        },
        {
            title: 'VulnScan',
            description: 'Automated vulnerability scanner for web applications with ML-based detection.',
            image: 'assets/images/projects/vulnscan.jpg',
            tech: ['Python', 'Scrapy', 'TensorFlow', 'OWASP ZAP API'],
            category: 'security',
            github: 'https://github.com/yourusername/vulnscan'
        },
        {
            title: 'CodeCollab',
            description: 'Real-time collaborative code editor with video chat and terminal sharing.',
            image: 'assets/images/projects/codecollab.jpg',
            tech: ['React', 'Socket.io', 'Ace Editor', 'WebRTC', 'Docker'],
            category: 'fullstack',
            github: 'https://github.com/yourusername/codecollab',
            demo: 'https://codecollab.demo'
        }
    ];
    
    container.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x200/1e293b/6366f1?text=${project.title}'">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>
                    ${project.demo ? `<a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// Teaching Tabs
// ============================================================================

function initTeachingTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// ============================================================================
// Contact Form
// ============================================================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// ============================================================================
// Toast Notifications
// ============================================================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--surface);
        color: var(--text-primary);
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#10b981' : '#6366f1'};
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================================================
// Scroll Animations
// ============================================================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .project-card, .research-card, .course-card, .stat-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================================================
// Back to Top Button
// ============================================================================

function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================================
// GitHub Stats
// ============================================================================

async function fetchGitHubStats() {
    const username = 'yourusername'; // Replace with your GitHub username
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        
        document.getElementById('github-repos').textContent = data.public_repos || 0;
        document.getElementById('github-followers').textContent = data.followers || 0;
        
        // Fetch total stars (approximate)
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposResponse.json();
        
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        document.getElementById('github-stars').textContent = totalStars;
        
        // Estimate contributions
        document.getElementById('github-contributions').textContent = '1.2k+';
    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
    }
}

// ============================================================================
// Smooth Scroll
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================================
// Add CSS Animations
// ============================================================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);