
// Portfolio Analytics System - Real-time data collection and tracking
class PortfolioAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.data = this.initializeData();
        this.currentSection = 'home';
        this.lastSectionTime = Date.now();
        this.scrollPercentage = 0;
        this.isActive = true;
        
        this.initialize();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    initializeData() {
        return {
            sessionId: this.sessionId,
            startTime: Date.now(),
            interactions: [],
            sectionViews: {},
            projectInteractions: {},
            navigationClicks: {},
            timeSpentPerSection: {},
            totalSessionTime: 0,
            currentSection: 'home',
            scrollMilestones: [],
            deviceInfo: {
                userAgent: navigator.userAgent,
                screenWidth: screen.width,
                screenHeight: screen.height,
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
                language: navigator.language,
                platform: navigator.platform
            }
        };
    }

    initialize() {
        this.setupEventListeners();
        this.trackPageLoad();
        this.startSessionTimer();
        this.trackVisibility();
        console.log('📊 Portfolio Analytics initialized - Session:', this.sessionId);
    }

    setupEventListeners() {
        // Track scroll events and section visibility
        window.addEventListener('scroll', this.throttle(() => {
            this.trackScroll();
            this.trackSectionViews();
        }, 500));

        // Track clicks on projects
        document.addEventListener('click', (e) => {
            this.trackClicks(e);
        });

        // Track navigation usage
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackNavigation(e.target.textContent.trim());
            });
        });

        // Track contact form interactions
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                this.trackInteraction('form', 'contact_form_submit');
            });
        }

        // Track resume download
        const resumeButtons = document.querySelectorAll('[onclick*="downloadResume"], .download-resume-btn');
        resumeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackInteraction('download', 'resume_download');
            });
        });

        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseTracking();
            } else {
                this.resumeTracking();
            }
        });

        // Track window focus/blur
        window.addEventListener('focus', () => this.resumeTracking());
        window.addEventListener('blur', () => this.pauseTracking());

        // Save data before page unload
        window.addEventListener('beforeunload', () => {
            this.saveData();
        });
    }

    trackPageLoad() {
        this.trackInteraction('page', 'page_load', {
            url: window.location.href,
            referrer: document.referrer,
            timestamp: Date.now()
        });
    }

    trackScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        this.scrollPercentage = Math.max(this.scrollPercentage, scrollPercent);

        // Track scroll milestones
        const milestones = [25, 50, 75, 90, 100];
        milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !this.data.scrollMilestones.includes(milestone)) {
                this.data.scrollMilestones.push(milestone);
                this.trackInteraction('engagement', 'scroll_milestone', {
                    percentage: milestone,
                    timestamp: Date.now()
                });
            }
        });
    }

    trackSectionViews() {
        const sections = document.querySelectorAll('section[id]');
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollTop;
            const sectionBottom = sectionTop + rect.height;
            
            // Check if section is in viewport (at least 30% visible)
            if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
                const sectionId = section.id || 'unknown';
                
                if (this.currentSection !== sectionId) {
                    // Track time spent in previous section
                    if (this.currentSection) {
                        const timeSpent = Date.now() - this.lastSectionTime;
                        this.data.timeSpentPerSection[this.currentSection] = 
                            (this.data.timeSpentPerSection[this.currentSection] || 0) + timeSpent;
                    }
                    
                    // Update current section
                    this.currentSection = sectionId;
                    this.lastSectionTime = Date.now();
                    this.data.currentSection = sectionId;
                    
                    // Increment section view count
                    this.data.sectionViews[sectionId] = (this.data.sectionViews[sectionId] || 0) + 1;
                    
                    this.trackInteraction('navigation', 'section_view', {
                        section: sectionId,
                        timestamp: Date.now()
                    });
                    
                    console.log(`📍 Section viewed: ${sectionId}`);
                }
            }
        });
    }

    trackClicks(event) {
        const target = event.target.closest('a, button, .project-card, .project-link');
        if (!target) return;

        let category = 'click';
        let action = 'generic_click';
        let details = { timestamp: Date.now() };

        // Track project interactions
        const projectCard = target.closest('.project-card');
        if (projectCard) {
            const projectTitle = projectCard.querySelector('.project-title, h3')?.textContent?.trim();
            if (projectTitle) {
                category = 'project';
                action = 'project_click';
                details.project = projectTitle;
                this.data.projectInteractions[projectTitle] = 
                    (this.data.projectInteractions[projectTitle] || 0) + 1;
                console.log(`🚀 Project clicked: ${projectTitle}`);
            }
        }

        // Track external links
        if (target.href && (target.href.includes('github.com') || target.href.includes('netlify.app') || target.href.includes('http'))) {
            category = 'external';
            action = 'external_link_click';
            details.url = target.href;
            details.text = target.textContent?.trim();
        }

        // Track social links
        if (target.href && (target.href.includes('linkedin.com') || target.href.includes('twitter.com') || target.href.includes('mailto:'))) {
            category = 'social';
            action = 'social_link_click';
            details.platform = this.extractPlatform(target.href);
        }

        this.trackInteraction(category, action, details);
    }

    trackNavigation(navText) {
        const cleanText = navText.toLowerCase().replace(/\s+/g, '_');
        this.data.navigationClicks[cleanText] = (this.data.navigationClicks[cleanText] || 0) + 1;
        
        this.trackInteraction('navigation', 'nav_click', {
            nav_item: cleanText,
            timestamp: Date.now()
        });
        
        console.log(`🧭 Navigation clicked: ${cleanText}`);
    }

    trackInteraction(category, action, details = {}) {
        const interaction = {
            id: this.generateInteractionId(),
            category,
            action,
            timestamp: Date.now(),
            details: {
                ...details,
                currentSection: this.currentSection,
                scrollPercentage: this.scrollPercentage,
                sessionTime: Date.now() - this.startTime
            }
        };

        this.data.interactions.push(interaction);
        this.saveData();
    }

    generateInteractionId() {
        return 'int_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    extractPlatform(url) {
        if (url.includes('linkedin.com')) return 'linkedin';
        if (url.includes('twitter.com')) return 'twitter';
        if (url.includes('github.com')) return 'github';
        if (url.includes('mailto:')) return 'email';
        return 'other';
    }

    startSessionTimer() {
        setInterval(() => {
            if (this.isActive) {
                this.data.totalSessionTime = Date.now() - this.startTime;
                this.saveData();
            }
        }, 5000); // Save every 5 seconds
    }

    trackVisibility() {
        // Track when user is actively viewing the page
        let isVisible = !document.hidden;
        let lastVisibilityChange = Date.now();

        document.addEventListener('visibilitychange', () => {
            const now = Date.now();
            if (!document.hidden && !isVisible) {
                // Page became visible
                isVisible = true;
                lastVisibilityChange = now;
                this.trackInteraction('engagement', 'page_visible');
            } else if (document.hidden && isVisible) {
                // Page became hidden
                isVisible = false;
                const visibleTime = now - lastVisibilityChange;
                this.trackInteraction('engagement', 'page_hidden', { visibleTime });
            }
        });
    }

    pauseTracking() {
        this.isActive = false;
        this.trackInteraction('session', 'pause_tracking');
    }

    resumeTracking() {
        this.isActive = true;
        this.trackInteraction('session', 'resume_tracking');
    }

    saveData() {
        try {
            localStorage.setItem('portfolioAnalytics', JSON.stringify(this.data));
        } catch (error) {
            console.warn('Failed to save analytics data:', error);
        }
    }

    // Utility function to throttle events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Public method to get current analytics data
    getAnalyticsData() {
        return { ...this.data };
    }

    // Public method to export data (for debugging)
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-analytics-${this.sessionId}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioAnalytics = new PortfolioAnalytics();
    
    // Expose for debugging
    window.getAnalyticsData = () => window.portfolioAnalytics.getAnalyticsData();
    window.exportAnalytics = () => window.portfolioAnalytics.exportData();
    
    console.log('📊 Analytics system ready! Use getAnalyticsData() or exportAnalytics() in console for debugging.');
});
