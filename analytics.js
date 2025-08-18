
// Portfolio Analytics - Real User Interaction Tracking
class PortfolioAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.visitorId = this.getOrCreateVisitorId();
        this.sessionStart = Date.now();
        this.interactions = [];
        this.sectionViews = {};
        this.navigationClicks = {};
        this.projectInteractions = {};
        this.timeSpentPerSection = {};
        this.currentSection = null;
        this.sectionStartTime = null;
        
        this.initialize();
        console.log('📊 Portfolio Analytics initialized - tracking real interactions only');
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getOrCreateVisitorId() {
        let visitorId = localStorage.getItem('portfolioVisitorId');
        if (!visitorId) {
            visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('portfolioVisitorId', visitorId);
        }
        return visitorId;
    }

    initialize() {
        // Track initial page load
        this.trackEvent('page_load', 'portfolio_visit', {
            url: window.location.href,
            referrer: document.referrer,
            timestamp: this.sessionStart
        });

        // Set up all tracking
        this.setupNavigationTracking();
        this.setupSectionTracking();
        this.setupProjectTracking();
        this.setupContactFormTracking();
        this.setupScrollTracking();
        this.setupTimeTracking();
        this.setupInteractiveElementTracking();
        
        // Auto-save and sync
        this.setupAutoSave();
        
        // Save data on page unload
        window.addEventListener('beforeunload', () => {
            this.saveSessionData();
        });
    }

    trackEvent(category, action, details = {}) {
        const event = {
            category,
            action,
            details,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            visitorId: this.visitorId,
            sessionTime: Date.now() - this.sessionStart
        };

        this.interactions.push(event);
        console.log(`🎯 ${category}: ${action}`, details);
        
        // Keep only last 500 interactions to prevent memory issues
        if (this.interactions.length > 500) {
            this.interactions = this.interactions.slice(-250);
        }
    }

    setupNavigationTracking() {
        // Track navigation menu clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = link.getAttribute('href');
                const linkText = link.textContent.trim();
                
                this.navigationClicks[linkText] = (this.navigationClicks[linkText] || 0) + 1;
                
                this.trackEvent('navigation', 'nav_click', {
                    target: target,
                    linkText: linkText,
                    totalClicks: this.navigationClicks[linkText]
                });
            });
        });

        // Track mobile menu usage
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                this.trackEvent('navigation', 'mobile_menu_toggle');
            });
        }
    }

    setupSectionTracking() {
        // Track when users enter different sections
        const sections = document.querySelectorAll('section[id], .hero');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id || entry.target.className.split(' ')[0];
                
                if (entry.isIntersecting) {
                    // User entered section
                    if (this.currentSection && this.sectionStartTime) {
                        // Calculate time spent in previous section
                        const timeSpent = Date.now() - this.sectionStartTime;
                        this.timeSpentPerSection[this.currentSection] = 
                            (this.timeSpentPerSection[this.currentSection] || 0) + timeSpent;
                    }
                    
                    this.currentSection = sectionId;
                    this.sectionStartTime = Date.now();
                    this.sectionViews[sectionId] = (this.sectionViews[sectionId] || 0) + 1;
                    
                    this.trackEvent('section', 'section_view', {
                        sectionId: sectionId,
                        viewCount: this.sectionViews[sectionId]
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    setupProjectTracking() {
        // Track project card interactions
        document.querySelectorAll('.project-card').forEach((card, index) => {
            const projectTitle = card.querySelector('.project-title')?.textContent || `Project ${index + 1}`;
            
            // Track project views (hover)
            card.addEventListener('mouseenter', () => {
                this.trackEvent('project', 'project_hover', {
                    projectTitle: projectTitle,
                    projectIndex: index
                });
            });

            // Track project link clicks
            card.querySelectorAll('.project-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    const linkType = link.textContent.includes('GitHub') ? 'github' :
                                   link.textContent.includes('Live') ? 'demo' : 'other';
                    
                    this.projectInteractions[projectTitle] = 
                        (this.projectInteractions[projectTitle] || 0) + 1;
                    
                    this.trackEvent('project', 'project_link_click', {
                        projectTitle: projectTitle,
                        linkType: linkType,
                        url: link.href,
                        totalInteractions: this.projectInteractions[projectTitle]
                    });
                });
            });
        });
    }

    setupContactFormTracking() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            // Track form field focus
            contactForm.querySelectorAll('input, textarea').forEach(field => {
                field.addEventListener('focus', () => {
                    this.trackEvent('contact', 'form_field_focus', {
                        fieldName: field.name || field.id,
                        fieldType: field.type || field.tagName.toLowerCase()
                    });
                });
            });

            // Track form submission
            contactForm.addEventListener('submit', () => {
                this.trackEvent('contact', 'form_submit', {
                    formType: 'contact_form'
                });
            });
        }

        // Track contact info clicks
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', () => {
                const contactType = item.querySelector('h4')?.textContent || 'unknown';
                this.trackEvent('contact', 'contact_info_click', {
                    contactType: contactType
                });
            });
        });
    }

    setupScrollTracking() {
        let maxScroll = 0;
        const scrollMilestones = [25, 50, 75, 100];
        const reachedMilestones = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                scrollMilestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
                        reachedMilestones.add(milestone);
                        this.trackEvent('engagement', 'scroll_milestone', {
                            percentage: milestone,
                            maxScroll: scrollPercent
                        });
                    }
                });
            }
        });
    }

    setupTimeTracking() {
        // Track total time on site every 30 seconds
        setInterval(() => {
            const timeOnSite = Math.floor((Date.now() - this.sessionStart) / 1000);
            this.trackEvent('engagement', 'time_milestone', {
                timeOnSite: timeOnSite,
                currentSection: this.currentSection
            });
        }, 30000);
    }

    setupInteractiveElementTracking() {
        // Track hero button clicks
        document.querySelectorAll('.hero .btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackEvent('engagement', 'hero_button_click', {
                    buttonText: btn.textContent.trim(),
                    buttonHref: btn.href
                });
            });
        });

        // Track interactive feature clicks
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                const featureTitle = card.querySelector('.feature-title')?.textContent || 'unknown';
                this.trackEvent('interactive', 'feature_click', {
                    featureTitle: featureTitle
                });
            });
        });

        // Track social media clicks
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', () => {
                const platform = this.detectSocialPlatform(link.href);
                this.trackEvent('social', 'social_click', {
                    platform: platform,
                    url: link.href
                });
            });
        });

        // Track blog article clicks
        document.querySelectorAll('.blog-link').forEach(link => {
            link.addEventListener('click', () => {
                const articleTitle = link.closest('.blog-card')?.querySelector('.blog-title')?.textContent || 'unknown';
                this.trackEvent('content', 'blog_click', {
                    articleTitle: articleTitle,
                    url: link.href
                });
            });
        });

        // Track resume/CV downloads
        document.querySelectorAll('a[href*="resume"], a[href*="cv"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('conversion', 'resume_download', {
                    linkText: link.textContent.trim()
                });
            });
        });
    }

    detectSocialPlatform(url) {
        if (url.includes('github')) return 'github';
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('twitter') || url.includes('x.com')) return 'twitter';
        if (url.includes('whatsapp') || url.includes('wa.me')) return 'whatsapp';
        if (url.includes('mailto:')) return 'email';
        if (url.includes('tel:')) return 'phone';
        return 'other';
    }

    setupAutoSave() {
        // Save data every 30 seconds
        setInterval(() => {
            this.saveSessionData();
        }, 30000);

        // Send data to backend every minute
        setInterval(() => {
            this.syncWithBackend();
        }, 60000);
    }

    saveSessionData() {
        try {
            const sessionData = {
                sessionId: this.sessionId,
                visitorId: this.visitorId,
                sessionStart: this.sessionStart,
                lastUpdate: Date.now(),
                interactions: this.interactions,
                sectionViews: this.sectionViews,
                navigationClicks: this.navigationClicks,
                projectInteractions: this.projectInteractions,
                timeSpentPerSection: this.timeSpentPerSection,
                totalSessionTime: Date.now() - this.sessionStart
            };

            localStorage.setItem('portfolioAnalytics', JSON.stringify(sessionData));
            console.log('💾 Analytics data saved');
        } catch (error) {
            console.warn('Failed to save analytics data:', error);
        }
    }

    async syncWithBackend() {
        try {
            const reportData = this.generateReport();
            const response = await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportData)
            });
            
            if (response.ok) {
                console.log('📊 Analytics synced with backend');
            }
        } catch (error) {
            console.debug('Backend sync failed (offline mode):', error);
        }
    }

    generateReport() {
        const sessionTime = Date.now() - this.sessionStart;
        
        return {
            sessionInfo: {
                sessionId: this.sessionId,
                visitorId: this.visitorId,
                sessionStart: this.sessionStart,
                sessionDuration: sessionTime,
                totalInteractions: this.interactions.length
            },
            engagement: {
                sectionViews: this.sectionViews,
                timeSpentPerSection: this.timeSpentPerSection,
                mostViewedSection: this.getMostViewedSection(),
                navigationClicks: this.navigationClicks,
                totalScrollEvents: this.interactions.filter(i => i.category === 'engagement' && i.action === 'scroll_milestone').length
            },
            projects: {
                projectInteractions: this.projectInteractions,
                mostInteractedProject: this.getMostInteractedProject()
            },
            conversions: {
                contactFormInteractions: this.interactions.filter(i => i.category === 'contact').length,
                resumeDownloads: this.interactions.filter(i => i.category === 'conversion').length,
                socialClicks: this.interactions.filter(i => i.category === 'social').length
            },
            technicalInfo: {
                userAgent: navigator.userAgent,
                screenResolution: `${screen.width}x${screen.height}`,
                viewportSize: `${window.innerWidth}x${window.innerHeight}`,
                referrer: document.referrer,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            allInteractions: this.interactions
        };
    }

    getMostViewedSection() {
        return Object.keys(this.sectionViews).reduce((a, b) => 
            this.sectionViews[a] > this.sectionViews[b] ? a : b, null);
    }

    getMostInteractedProject() {
        return Object.keys(this.projectInteractions).reduce((a, b) => 
            this.projectInteractions[a] > this.projectInteractions[b] ? a : b, null);
    }

    // Public methods for debugging
    getSessionSummary() {
        return {
            sessionDuration: Math.floor((Date.now() - this.sessionStart) / 1000),
            totalInteractions: this.interactions.length,
            sectionsViewed: Object.keys(this.sectionViews).length,
            projectsInteracted: Object.keys(this.projectInteractions).length,
            mostViewedSection: this.getMostViewedSection()
        };
    }

    exportData() {
        const data = this.generateReport();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio_analytics_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('📊 Analytics data exported');
    }

    clearData() {
        localStorage.removeItem('portfolioAnalytics');
        localStorage.removeItem('portfolioVisitorId');
        console.log('🧹 Analytics data cleared');
    }
}

// Initialize analytics only on portfolio page (not dashboard)
if (typeof window !== 'undefined') {
    const isAnalyticsDashboard = window.location.pathname.includes('analytics.html') || 
                                document.title.includes('Analytics Dashboard');
    
    if (!isAnalyticsDashboard) {
        window.portfolioAnalytics = new PortfolioAnalytics();
        
        // Global debugging functions
        window.getAnalyticsReport = () => window.portfolioAnalytics.generateReport();
        window.getSessionSummary = () => window.portfolioAnalytics.getSessionSummary();
        window.exportAnalytics = () => window.portfolioAnalytics.exportData();
        window.clearAnalytics = () => window.portfolioAnalytics.clearData();
        
        console.log('📊 Portfolio Analytics ready! Debug with:');
        console.log('- window.getSessionSummary()');
        console.log('- window.getAnalyticsReport()');
        console.log('- window.exportAnalytics()');
    } else {
        console.log('📊 Analytics Dashboard - tracking disabled');
    }
}
