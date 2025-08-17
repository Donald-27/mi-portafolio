
// Enhanced Portfolio Analytics - Real Data Tracking
class PortfolioAnalytics {
    constructor() {
        this.startTime = Date.now();
        this.interactions = [];
        this.pageViews = {};
        this.sessionId = this.generateSessionId();
        this.visitorId = this.getOrCreateVisitorId();
        
        // Load existing data
        this.loadStoredData();
        
        // Initialize tracking
        this.initializeTracking();
        
        // Send data to backend every 30 seconds
        this.initializeBackendSync();
        
        console.log('📊 Portfolio Analytics initialized with real tracking');
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

    loadStoredData() {
        try {
            const stored = localStorage.getItem('portfolioSessionData');
            if (stored) {
                const data = JSON.parse(stored);
                this.pageViews = {}; // Start fresh for current session
                this.interactions = []; // Start fresh for current session
                
                // Store historical data but start fresh session tracking
                if (!data.previousSession) {
                    data.previousSession = {
                        views: data.totalViews || 0,
                        interactions: data.totalInteractions || 0,
                        duration: data.lastSessionDuration || 0,
                        sessions: data.totalSessions || 0
                    };
                }
                
                // Increment session count
                data.totalSessions = (data.totalSessions || 0) + 1;
                data.lastSession = Date.now();
                
                // Update cumulative data
                data.allTimeViews = (data.allTimeViews || 0) + (data.totalViews || 0);
                data.allTimeInteractions = (data.allTimeInteractions || 0) + (data.totalInteractions || 0);
                
                localStorage.setItem('portfolioSessionData', JSON.stringify(data));
            } else {
                // First time visitor
                const initialData = {
                    totalSessions: 1,
                    totalViews: 0,
                    totalInteractions: 0,
                    allTimeViews: 0,
                    allTimeInteractions: 0,
                    sessionTimes: [],
                    sectionViews: {},
                    interactions: [],
                    lastSession: Date.now(),
                    firstVisit: Date.now(),
                    previousSession: {
                        views: 0,
                        interactions: 0,
                        duration: 0,
                        sessions: 0
                    }
                };
                localStorage.setItem('portfolioSessionData', JSON.stringify(initialData));
            }
        } catch (error) {
            console.warn('Failed to load stored analytics data:', error);
        }
    }

    initializeTracking() {
        // Track actual portfolio visit (someone opening the link)
        this.trackPortfolioVisit();
        
        // Track page load with detailed info
        this.trackPageView('portfolio_loaded');
        this.trackInteraction('session_start', `${window.location.href}`, {
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
        });

        // Track scroll depth
        this.initializeScrollTracking();

        // Track clicks
        this.initializeClickTracking();

        // Track time on page
        this.initializeTimeTracking();

        // Track page visibility
        this.initializeVisibilityTracking();

        // Track form interactions
        this.initializeFormTracking();

        // Track mouse movement patterns (simplified)
        this.initializeMouseTracking();

        // Save data before page unload
        window.addEventListener('beforeunload', () => {
            this.trackInteraction('session_end', 'page_unload');
            this.saveSessionData();
        });

        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveSessionData();
        }, 30000);
    }

    initializeScrollTracking() {
        let maxScroll = 0;
        let scrollMilestones = [25, 50, 75, 90, 100];
        let reachedMilestones = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track scroll milestones
                scrollMilestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
                        reachedMilestones.add(milestone);
                        this.trackInteraction('scroll_milestone', `${milestone}% scrolled`);
                    }
                });
            }
        });
    }

    initializeClickTracking() {
        document.addEventListener('click', (event) => {
            const element = event.target;
            let elementInfo = '';

            // Get meaningful element information
            if (element.id) {
                elementInfo = `#${element.id}`;
            } else if (element.className) {
                elementInfo = `.${element.className.split(' ')[0]}`;
            } else if (element.tagName) {
                elementInfo = element.tagName.toLowerCase();
            }

            // Special tracking for important elements
            if (element.matches('a[href]')) {
                const href = element.getAttribute('href');
                this.trackInteraction('link_click', `${elementInfo} -> ${href}`);
            } else if (element.matches('button') || element.closest('button')) {
                const button = element.matches('button') ? element : element.closest('button');
                const buttonText = button.textContent.trim().substring(0, 30);
                this.trackInteraction('button_click', `${buttonText}`);
            } else if (element.matches('.project-card') || element.closest('.project-card')) {
                const projectCard = element.matches('.project-card') ? element : element.closest('.project-card');
                const projectTitle = projectCard.querySelector('.project-title, h3, h4')?.textContent || 'Unknown Project';
                this.trackInteraction('project_view', projectTitle);
            } else if (element.matches('.nav-link, nav a') || element.closest('.nav-link, nav a')) {
                const navLink = element.matches('.nav-link, nav a') ? element : element.closest('.nav-link, nav a');
                const navText = navLink.textContent.trim();
                this.trackInteraction('navigation', navText);
            } else {
                this.trackInteraction('click', elementInfo);
            }
        });
    }

    initializeFormTracking() {
        // Track contact form interactions
        document.addEventListener('focus', (event) => {
            if (event.target.matches('input, textarea, select')) {
                const fieldName = event.target.name || event.target.id || event.target.type;
                this.trackInteraction('form_field_focus', `Contact form - ${fieldName}`);
            }
        });

        document.addEventListener('submit', (event) => {
            if (event.target.matches('form')) {
                this.trackInteraction('form_submit', 'Contact form submitted');
            }
        });
    }

    initializeMouseTracking() {
        let mouseMovements = 0;
        let lastMouseTime = Date.now();

        document.addEventListener('mousemove', () => {
            const now = Date.now();
            if (now - lastMouseTime > 100) { // Throttle to every 100ms
                mouseMovements++;
                lastMouseTime = now;

                // Track significant mouse activity
                if (mouseMovements % 50 === 0) {
                    this.trackInteraction('mouse_activity', `${mouseMovements} movements`);
                }
            }
        });

        // Track clicks with more detail
        document.addEventListener('click', (event) => {
            const rect = event.target.getBoundingClientRect();
            this.trackInteraction('detailed_click', event.target.tagName, {
                x: event.clientX,
                y: event.clientY,
                elementType: event.target.tagName,
                elementClass: event.target.className,
                elementId: event.target.id
            });
        });
    }

    initializeTimeTracking() {
        // Track time spent in each section
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id || 
                                    entry.target.className.split(' ')[0] || 
                                    entry.target.getAttribute('data-section') ||
                                    'unknown_section';
                    this.trackPageView(sectionId);
                    this.currentSection = sectionId;
                    this.sectionStartTime = Date.now();
                } else if (this.currentSection === (entry.target.id || entry.target.className.split(' ')[0])) {
                    // User left this section
                    const timeSpent = Date.now() - (this.sectionStartTime || Date.now());
                    if (timeSpent > 2000) { // Only track if spent more than 2 seconds
                        this.trackInteraction('time_spent', `${this.currentSection}:${Math.round(timeSpent/1000)}s`);
                    }
                }
            });
        }, { threshold: 0.5 });

        // Observe all main sections
        const sectionsToObserve = document.querySelectorAll('section[id], .hero, .about, .projects, .experience, .contact, .skills, header, main');
        sectionsToObserve.forEach(section => {
            sectionObserver.observe(section);
        });

        // If no sections found, observe main content areas
        if (sectionsToObserve.length === 0) {
            const fallbackSections = document.querySelectorAll('div[class*="section"], div[class*="container"], main, article');
            fallbackSections.forEach(section => {
                sectionObserver.observe(section);
            });
        }
    }

    initializeVisibilityTracking() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackInteraction('page_hidden', 'user_switched_tab');
            } else {
                this.trackInteraction('page_visible', 'user_returned_tab');
            }
        });
    }

    initializeBackendSync() {
        // Send data to backend every 30 seconds
        setInterval(() => {
            this.syncWithBackend();
        }, 30000);

        // Also sync when page becomes visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.syncWithBackend();
            }
        });
    }

    async syncWithBackend() {
        try {
            const data = this.generateReport();
            const response = await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                console.log('📊 Analytics data synced with backend');
            }
        } catch (error) {
            // Silently handle backend sync errors
            console.debug('Backend sync failed, using local storage only:', error);
        }
    }

    trackPageView(section) {
        this.pageViews[section] = (this.pageViews[section] || 0) + 1;
        
        // Update stored data
        this.updateStoredSectionViews();
        
        console.log(`📊 Section viewed: ${section} (${this.pageViews[section]} times)`);
        
        // Notify analytics dashboard if it exists
        this.notifyDashboard();
    }

    trackPortfolioVisit() {
        // Track actual portfolio visits (when someone opens the link)
        const stored = JSON.parse(localStorage.getItem('portfolioSessionData') || '{}');
        stored.totalPortfolioViews = (stored.totalPortfolioViews || 0) + 1;
        stored.allPortfolioVisits = stored.allPortfolioVisits || [];
        stored.allPortfolioVisits.push({
            timestamp: Date.now(),
            sessionId: this.sessionId,
            visitorId: this.visitorId,
            referrer: document.referrer,
            userAgent: navigator.userAgent
        });
        
        // Keep only last 100 visits for storage efficiency
        if (stored.allPortfolioVisits.length > 100) {
            stored.allPortfolioVisits = stored.allPortfolioVisits.slice(-100);
        }
        
        localStorage.setItem('portfolioSessionData', JSON.stringify(stored));
        console.log(`📊 Portfolio visit tracked: ${stored.totalPortfolioViews} total visits`);
    }

    trackInteraction(action, element, metadata = {}) {
        const interaction = {
            action,
            element,
            timestamp: Date.now(),
            timeOnSite: Date.now() - this.startTime,
            sessionId: this.sessionId,
            visitorId: this.visitorId,
            url: window.location.href,
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            ...metadata
        };

        this.interactions.push(interaction);
        
        // Limit interactions to prevent memory issues
        if (this.interactions.length > 1000) {
            this.interactions = this.interactions.slice(-500);
        }

        // Update stored data
        this.updateStoredInteractions();
        
        console.log(`🎯 Interaction tracked: ${action} on ${element}`);
        
        // Notify analytics dashboard if it exists
        this.notifyDashboard();
    }

    updateStoredSectionViews() {
        try {
            const stored = JSON.parse(localStorage.getItem('portfolioSessionData') || '{}');
            stored.sectionViews = this.pageViews;
            stored.totalViews = Object.values(this.pageViews).reduce((a, b) => a + b, 0);
            localStorage.setItem('portfolioSessionData', JSON.stringify(stored));
        } catch (error) {
            console.warn('Failed to update stored section views:', error);
        }
    }

    updateStoredInteractions() {
        try {
            const stored = JSON.parse(localStorage.getItem('portfolioSessionData') || '{}');
            stored.interactions = this.interactions;
            stored.totalInteractions = this.interactions.length;
            localStorage.setItem('portfolioSessionData', JSON.stringify(stored));
        } catch (error) {
            console.warn('Failed to update stored interactions:', error);
        }
    }

    saveSessionData() {
        try {
            const sessionDuration = Date.now() - this.startTime;
            const stored = JSON.parse(localStorage.getItem('portfolioSessionData') || '{}');
            
            // Store previous session data for comparison
            stored.previousSession = {
                views: stored.totalViews || 0,
                interactions: stored.totalInteractions || 0,
                duration: stored.lastSessionDuration || 0,
                sessions: stored.totalSessions || 1
            };
            
            // Add current session time to session times array
            stored.sessionTimes = stored.sessionTimes || [];
            stored.sessionTimes.push(sessionDuration);
            
            // Keep only last 50 sessions
            if (stored.sessionTimes.length > 50) {
                stored.sessionTimes = stored.sessionTimes.slice(-50);
            }
            
            stored.lastSessionDuration = sessionDuration;
            stored.sectionViews = this.pageViews;
            stored.interactions = this.interactions;
            stored.totalInteractions = this.interactions.length;
            stored.totalViews = Object.values(this.pageViews).reduce((a, b) => a + b, 0);
            
            localStorage.setItem('portfolioSessionData', JSON.stringify(stored));
            console.log('💾 Session data saved');

            // Also send final data to backend
            this.syncWithBackend();
        } catch (error) {
            console.warn('Failed to save session data:', error);
        }
    }

    notifyDashboard() {
        // Try to update analytics dashboard if it's open
        try {
            if (window.analyticsDashboard) {
                window.analyticsDashboard.updateFromPortfolio();
            }
            
            // Also try to send message to analytics window if opened separately
            if (window.opener && window.opener.analyticsDashboard) {
                window.opener.analyticsDashboard.updateFromPortfolio();
            }

            // Post message to any open analytics windows
            if (typeof BroadcastChannel !== 'undefined') {
                const channel = new BroadcastChannel('portfolio_analytics');
                channel.postMessage({
                    type: 'UPDATE_ANALYTICS',
                    data: this.generateReport()
                });
            }
        } catch (error) {
            // Dashboard not available, that's okay
        }
    }

    generateReport() {
        const currentTime = Date.now();
        const sessionDuration = currentTime - this.startTime;
        const stored = JSON.parse(localStorage.getItem('portfolioSessionData') || '{}');
        
        const report = {
            sessionId: this.sessionId,
            visitorId: this.visitorId,
            totalTimeOnSite: sessionDuration,
            totalInteractions: this.interactions.length,
            totalPageViews: Object.values(this.pageViews).reduce((a, b) => a + b, 0),
            totalPortfolioViews: stored.totalPortfolioViews || 0,
            mostViewedSection: this.getMostViewedSection(),
            pageViews: { ...this.pageViews },
            interactions: [...this.interactions],
            sessionStartTime: this.startTime,
            currentTime: currentTime,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language
        };

        return report;
    }

    getMostViewedSection() {
        if (Object.keys(this.pageViews).length === 0) return null;
        
        return Object.keys(this.pageViews).reduce((a, b) => 
            this.pageViews[a] > this.pageViews[b] ? a : b
        );
    }

    getDetailedAnalytics() {
        const stored = JSON.parse(localStorage.getItem('portfolioSessionData') || '{}');
        const currentReport = this.generateReport();
        
        return {
            current: currentReport,
            historical: {
                totalSessions: stored.totalSessions || 1,
                averageSessionTime: this.calculateAverageSessionTime(stored.sessionTimes || []),
                totalHistoricalViews: stored.totalViews || 0,
                totalHistoricalInteractions: stored.totalInteractions || 0,
                firstVisit: stored.firstVisit || Date.now(),
                lastSession: stored.lastSession || Date.now(),
                returnVisitor: (stored.totalSessions || 1) > 1
            }
        };
    }

    calculateAverageSessionTime(sessionTimes) {
        if (sessionTimes.length === 0) return 0;
        const sum = sessionTimes.reduce((a, b) => a + b, 0);
        return Math.round(sum / sessionTimes.length);
    }

    // Method to export data for analysis
    exportData() {
        const data = this.getDetailedAnalytics();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio_analytics_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('📊 Analytics data exported');
    }

    // Method to clear all data (for testing)
    clearAllData() {
        localStorage.removeItem('portfolioSessionData');
        localStorage.removeItem('portfolioVisitorId');
        this.pageViews = {};
        this.interactions = [];
        console.log('🧹 All analytics data cleared');
    }
}

// Initialize analytics when script loads (only on portfolio pages, not analytics dashboard)
if (typeof window !== 'undefined') {
    // Check if we're on the analytics dashboard page
    const isAnalyticsDashboard = window.location.pathname.includes('analytics.html') || 
                                document.title.includes('Analytics Dashboard') ||
                                document.querySelector('.dashboard');
    
    if (!isAnalyticsDashboard) {
        window.portfolioAnalytics = new PortfolioAnalytics();
        console.log('📊 Portfolio Analytics ready! Use window.getAnalyticsReport() to see data');
    } else {
        console.log('📊 Analytics Dashboard detected - tracking disabled to prevent false data');
    }
    
    // Make debugging functions globally accessible regardless of page
    window.getAnalyticsReport = () => {
        if (window.portfolioAnalytics) {
            return window.portfolioAnalytics.generateReport();
        } else {
            return JSON.parse(localStorage.getItem('portfolioSessionData') || '{}');
        }
    };
    window.exportAnalytics = () => {
        if (window.portfolioAnalytics) {
            return window.portfolioAnalytics.exportData();
        } else {
            console.log('Analytics not active on this page');
        }
    };
    window.clearAnalytics = () => {
        if (window.portfolioAnalytics) {
            return window.portfolioAnalytics.clearAllData();
        } else {
            localStorage.removeItem('portfolioSessionData');
            localStorage.removeItem('portfolioVisitorId');
            console.log('🧹 Analytics data cleared from storage');
        }
    };
}
