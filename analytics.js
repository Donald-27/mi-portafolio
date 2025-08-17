
// Simple analytics for portfolio performance
class PortfolioAnalytics {
    constructor() {
        this.startTime = Date.now();
        this.interactions = [];
        this.pageViews = {};
    }

    trackPageView(section) {
        this.pageViews[section] = (this.pageViews[section] || 0) + 1;
        console.log(`📊 Analytics: ${section} viewed ${this.pageViews[section]} times`);
    }

    trackInteraction(action, element) {
        this.interactions.push({
            action,
            element,
            timestamp: Date.now(),
            timeOnSite: Date.now() - this.startTime
        });
        console.log(`🎯 User interaction: ${action} on ${element}`);
    }

    generateReport() {
        return {
            totalTimeOnSite: Date.now() - this.startTime,
            totalInteractions: this.interactions.length,
            mostViewedSection: Object.keys(this.pageViews).reduce((a, b) => 
                this.pageViews[a] > this.pageViews[b] ? a : b
            ),
            pageViews: this.pageViews,
            interactions: this.interactions
        };
    }
}

// Initialize analytics
const analytics = new PortfolioAnalytics();

// Track section views
const observeSections = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.id || entry.target.className;
            analytics.trackPageView(sectionName);
        }
    });
}, { threshold: 0.5 });

// Observe all main sections
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section[id]').forEach(section => {
        observeSections.observe(section);
    });
});
