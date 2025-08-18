
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Analytics Dashboard - Kiprop Donald</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            --success-gradient: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
            --warning-gradient: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
            
            --text-primary: #ffffff;
            --text-secondary: #b8b8b8;
            --text-accent: #64ffda;
            --bg-primary: #0a0a0a;
            --bg-secondary: #1a1a1a;
            --bg-accent: #2a2a2a;
            
            --shadow-soft: 0 10px 40px rgba(0, 0, 0, 0.3);
            --shadow-glow: 0 0 30px rgba(100, 255, 218, 0.3);
            --border-radius: 20px;
            --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            overflow-x: hidden;
            min-height: 100vh;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
            animation: backgroundShift 20s ease-in-out infinite;
            z-index: -1;
        }

        @keyframes backgroundShift {
            0%, 100% { transform: translateX(0) translateY(0); }
            33% { transform: translateX(-30px) translateY(-30px); }
            66% { transform: translateX(30px) translateY(30px); }
        }

        .header {
            padding: 2rem;
            text-align: center;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header h1 {
            font-size: 2.5rem;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
        }

        .back-button {
            position: absolute;
            left: 2rem;
            top: 50%;
            transform: translateY(-50%);
            background: var(--primary-gradient);
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .back-button:hover {
            transform: translateY(-50%) translateY(-3px);
            box-shadow: var(--shadow-soft);
        }

        .dashboard {
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: var(--border-radius);
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--accent-gradient);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-glow);
            background: rgba(255, 255, 255, 0.1);
        }

        .stat-card:hover::before {
            transform: scaleX(1);
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
            margin-bottom: 1rem;
        }

        .stat-card:nth-child(1) .stat-icon { background: var(--accent-gradient); }
        .stat-card:nth-child(2) .stat-icon { background: var(--success-gradient); }
        .stat-card:nth-child(3) .stat-icon { background: var(--warning-gradient); }
        .stat-card:nth-child(4) .stat-icon { background: var(--secondary-gradient); }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .stat-label {
            color: var(--text-secondary);
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }

        .charts-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .chart-container {
            background: rgba(255, 255, 255, 0.05);
            border-radius: var(--border-radius);
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            height: 280px;
        }

        .chart-container canvas {
            height: 200px !important;
            max-height: 200px !important;
        }

        .chart-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--text-accent);
        }

        .insights-section {
            background: rgba(255, 255, 255, 0.05);
            border-radius: var(--border-radius);
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            margin-bottom: 3rem;
        }

        .insight-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .insight-item:last-child {
            border-bottom: none;
        }

        .insight-label {
            color: var(--text-secondary);
        }

        .insight-value {
            font-weight: 600;
            color: var(--text-accent);
        }

        .live-data {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .live-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: var(--border-radius);
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
        }

        .pulse {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(100, 255, 218, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(100, 255, 218, 0);
            }
        }

        .no-data {
            text-align: center;
            color: var(--text-secondary);
            font-style: italic;
            padding: 2rem;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }

            .back-button {
                position: static;
                transform: none;
                margin-bottom: 1rem;
            }

            .header {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .charts-section {
                grid-template-columns: 1fr;
            }

            .dashboard {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <a href="index.html" class="back-button">
            <i class="fas fa-arrow-left"></i>
            Back to Portfolio
        </a>
        <h1>📊 Portfolio Analytics</h1>
        <p>Real-time insights into portfolio interactions and user engagement</p>
    </header>

    <main class="dashboard">
        <!-- Key Metrics -->
        <section class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-mouse-pointer"></i>
                </div>
                <div class="stat-number" id="totalInteractions">0</div>
                <div class="stat-label">Total Interactions</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="stat-number" id="sectionsViewed">0</div>
                <div class="stat-label">Sections Viewed</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-number" id="sessionTime">0s</div>
                <div class="stat-label">Session Duration</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-rocket"></i>
                </div>
                <div class="stat-number" id="projectClicks">0</div>
                <div class="stat-label">Project Interactions</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-bars"></i>
                </div>
                <div class="stat-number" id="navClicks">0</div>
                <div class="stat-label">Navigation Clicks</div>
            </div>
        </section>

        <!-- Charts -->
        <section class="charts-section">
            <div class="chart-container">
                <h3 class="chart-title">📈 Section Views</h3>
                <canvas id="sectionChart" width="400" height="200"></canvas>
            </div>

            <div class="chart-container">
                <h3 class="chart-title">🎯 Interaction Types</h3>
                <canvas id="interactionChart" width="400" height="200"></canvas>
            </div>

            <div class="chart-container">
                <h3 class="chart-title">🚀 Project Interactions</h3>
                <canvas id="projectChart" width="400" height="200"></canvas>
            </div>

            <div class="chart-container">
                <h3 class="chart-title">🧭 Navigation Clicks</h3>
                <canvas id="navigationChart" width="400" height="200"></canvas>
            </div>
        </section>

        <!-- Key Insights -->
        <section class="insights-section">
            <h3 class="chart-title">🔍 Key Insights</h3>
            <div id="insights">
                <div class="insight-item">
                    <span class="insight-label">Most Viewed Section</span>
                    <span class="insight-value" id="topSection">None</span>
                </div>
                <div class="insight-item">
                    <span class="insight-label">Most Clicked Project</span>
                    <span class="insight-value" id="topProject">None</span>
                </div>
                <div class="insight-item">
                    <span class="insight-label">Average Time per Section</span>
                    <span class="insight-value" id="avgTimePerSection">0s</span>
                </div>
                <div class="insight-item">
                    <span class="insight-label">Scroll Completion</span>
                    <span class="insight-value" id="scrollCompletion">0%</span>
                </div>
                <div class="insight-item">
                    <span class="insight-label">Most Used Nav Tab</span>
                    <span class="insight-value" id="topNavTab">None</span>
                </div>
            </div>
        </section>

        <!-- Live Session Data -->
        <section class="live-data">
            <div class="live-card pulse">
                <h3 class="chart-title">🔴 Current Session <span id="liveIndicator" style="color: #10b981; font-size: 0.8em;">● LIVE</span></h3>
                <div id="currentSession">
                    <div class="insight-item">
                        <span class="insight-label">Session ID</span>
                        <span class="insight-value" id="sessionId">-</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">Current Section</span>
                        <span class="insight-value" id="currentSection">-</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">Last Interaction</span>
                        <span class="insight-value" id="lastInteraction">-</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">Last Update</span>
                        <span class="insight-value" id="lastUpdate">-</span>
                    </div>
                </div>
            </div>

            <div class="live-card">
                <h3 class="chart-title">📱 Device Info</h3>
                <div id="deviceInfo">
                    <div class="insight-item">
                        <span class="insight-label">Screen Size</span>
                        <span class="insight-value" id="screenSize">-</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">Viewport</span>
                        <span class="insight-value" id="viewport">-</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">User Agent</span>
                        <span class="insight-value" id="userAgent">-</span>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script>
        class AnalyticsDashboard {
            constructor() {
                this.charts = {};
                this.updateInterval = null;
                this.initialize();
            }

            initialize() {
                this.loadStoredData();
                this.createCharts();
                this.startRealTimeUpdates();
                console.log('📊 Analytics Dashboard initialized');
            }

            loadStoredData() {
                try {
                    const stored = localStorage.getItem('portfolioAnalytics');
                    this.data = stored ? JSON.parse(stored) : null;
                    
                    if (this.data) {
                        this.updateMetrics();
                        this.updateInsights();
                        this.updateLiveData();
                    } else {
                        this.showNoDataMessage();
                    }
                } catch (error) {
                    console.warn('Failed to load analytics data:', error);
                    this.showNoDataMessage();
                }
            }

            updateMetrics() {
                if (!this.data) return;

                document.getElementById('totalInteractions').textContent = this.data.interactions?.length || 0;
                document.getElementById('sectionsViewed').textContent = Object.keys(this.data.sectionViews || {}).length;
                document.getElementById('sessionTime').textContent = this.formatTime(this.data.totalSessionTime || 0);
                document.getElementById('projectClicks').textContent = Object.values(this.data.projectInteractions || {}).reduce((a, b) => a + b, 0);
                document.getElementById('navClicks').textContent = Object.values(this.data.navigationClicks || {}).reduce((a, b) => a + b, 0);
            }

            updateInsights() {
                if (!this.data) return;

                const sectionViews = this.data.sectionViews || {};
                const projectInteractions = this.data.projectInteractions || {};
                const timeSpentPerSection = this.data.timeSpentPerSection || {};

                // Most viewed section
                const topSection = Object.keys(sectionViews).reduce((a, b) => 
                    sectionViews[a] > sectionViews[b] ? a : b, 'None');
                document.getElementById('topSection').textContent = topSection;

                // Most clicked project
                const topProject = Object.keys(projectInteractions).reduce((a, b) => 
                    projectInteractions[a] > projectInteractions[b] ? a : b, 'None');
                document.getElementById('topProject').textContent = topProject || 'None';

                // Average time per section
                const totalTime = Object.values(timeSpentPerSection).reduce((a, b) => a + b, 0);
                const avgTime = totalTime / Math.max(Object.keys(timeSpentPerSection).length, 1);
                document.getElementById('avgTimePerSection').textContent = this.formatTime(avgTime);

                // Scroll completion
                const scrollMilestones = this.data.interactions?.filter(i => 
                    i.category === 'engagement' && i.action === 'scroll_milestone') || [];
                const maxScroll = Math.max(...scrollMilestones.map(s => s.details?.percentage || 0), 0);
                document.getElementById('scrollCompletion').textContent = `${maxScroll}%`;

                // Most used nav tab
                const navigationClicks = this.data.navigationClicks || {};
                const topNavTab = Object.keys(navigationClicks).reduce((a, b) => 
                    navigationClicks[a] > navigationClicks[b] ? a : b, 'None');
                document.getElementById('topNavTab').textContent = topNavTab || 'None';
            }

            updateLiveData() {
                if (!this.data) return;

                document.getElementById('sessionId').textContent = this.data.sessionId?.substring(0, 12) + '...' || '-';
                document.getElementById('currentSection').textContent = this.data.currentSection || 'Home';
                
                const lastInteraction = this.data.interactions?.[this.data.interactions.length - 1];
                if (lastInteraction) {
                    document.getElementById('lastInteraction').textContent = lastInteraction.action.replace('_', ' ');
                    
                    // Show time since last interaction
                    const timeSince = Math.floor((Date.now() - lastInteraction.timestamp) / 1000);
                    document.getElementById('lastUpdate').textContent = timeSince < 60 ? 
                        `${timeSince}s ago` : `${Math.floor(timeSince / 60)}m ago`;
                } else {
                    document.getElementById('lastInteraction').textContent = 'No interactions yet';
                    document.getElementById('lastUpdate').textContent = 'Waiting...';
                }

                // Device info
                document.getElementById('screenSize').textContent = `${screen.width}x${screen.height}`;
                document.getElementById('viewport').textContent = `${window.innerWidth}x${window.innerHeight}`;
                document.getElementById('userAgent').textContent = navigator.userAgent.substring(0, 30) + '...';
                
                // Update live indicator
                const indicator = document.getElementById('liveIndicator');
                if (indicator) {
                    indicator.style.opacity = '0.5';
                    setTimeout(() => indicator.style.opacity = '1', 100);
                }
            }

            createCharts() {
                this.createSectionChart();
                this.createInteractionChart();
                this.createProjectChart();
                this.createNavigationChart();
            }

            createSectionChart() {
                const ctx = document.getElementById('sectionChart').getContext('2d');
                const sectionViews = this.data?.sectionViews || {};
                
                this.charts.section = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(sectionViews).length ? Object.keys(sectionViews) : ['No Data'],
                        datasets: [{
                            data: Object.keys(sectionViews).length ? Object.values(sectionViews) : [1],
                            backgroundColor: [
                                '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'
                            ],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { 
                                    color: '#b8b8b8', 
                                    padding: 8, 
                                    usePointStyle: true,
                                    font: { size: 11 }
                                }
                            }
                        }
                    }
                });
            }

            createInteractionChart() {
                const ctx = document.getElementById('interactionChart').getContext('2d');
                const interactions = this.data?.interactions || [];
                
                const categories = {};
                interactions.forEach(i => {
                    categories[i.category] = (categories[i.category] || 0) + 1;
                });

                this.charts.interaction = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(categories).length ? Object.keys(categories) : ['No Data'],
                        datasets: [{
                            label: 'Interactions',
                            data: Object.keys(categories).length ? Object.values(categories) : [0],
                            backgroundColor: '#3b82f6',
                            borderColor: '#1e40af',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: { display: false } 
                        },
                        scales: {
                            y: { 
                                beginAtZero: true, 
                                ticks: { color: '#b8b8b8', font: { size: 10 } }, 
                                grid: { color: 'rgba(255, 255, 255, 0.1)' } 
                            },
                            x: { 
                                ticks: { color: '#b8b8b8', font: { size: 10 } }, 
                                grid: { color: 'rgba(255, 255, 255, 0.1)' } 
                            }
                        }
                    }
                });
            }

            createProjectChart() {
                const ctx = document.getElementById('projectChart').getContext('2d');
                const projectInteractions = this.data?.projectInteractions || {};

                this.charts.project = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: Object.keys(projectInteractions).length ? Object.keys(projectInteractions) : ['No Data'],
                        datasets: [{
                            label: 'Clicks',
                            data: Object.keys(projectInteractions).length ? Object.values(projectInteractions) : [0],
                            backgroundColor: '#10b981',
                            borderColor: '#059669',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { 
                                beginAtZero: true, 
                                ticks: { color: '#b8b8b8', font: { size: 10 } }, 
                                grid: { color: 'rgba(255, 255, 255, 0.1)' } 
                            },
                            x: { 
                                ticks: { color: '#b8b8b8', font: { size: 10 } }, 
                                grid: { color: 'rgba(255, 255, 255, 0.1)' } 
                            }
                        }
                    }
                });
            }

            createNavigationChart() {
                const ctx = document.getElementById('navigationChart').getContext('2d');
                const navigationClicks = this.data?.navigationClicks || {};

                this.charts.navigation = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(navigationClicks).length ? Object.keys(navigationClicks) : ['No Data'],
                        datasets: [{
                            data: Object.keys(navigationClicks).length ? Object.values(navigationClicks) : [1],
                            backgroundColor: ['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#10b981'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { 
                                    color: '#b8b8b8', 
                                    padding: 8, 
                                    usePointStyle: true,
                                    font: { size: 11 }
                                }
                            }
                        }
                    }
                });
            }

            startRealTimeUpdates() {
                this.updateInterval = setInterval(() => {
                    this.loadStoredData();
                    this.updateCharts();
                }, 2000); // Update every 2 seconds for real-time feel
                
                // Also listen for storage changes (when data is updated from other tabs)
                window.addEventListener('storage', (e) => {
                    if (e.key === 'portfolioAnalytics') {
                        this.loadStoredData();
                        this.updateCharts();
                    }
                });
            }

            updateCharts() {
                if (!this.data) return;

                // Update section chart
                const sectionViews = this.data.sectionViews || {};
                if (this.charts.section) {
                    const labels = Object.keys(sectionViews);
                    const data = Object.values(sectionViews);
                    
                    this.charts.section.data.labels = labels.length ? labels : ['No Data'];
                    this.charts.section.data.datasets[0].data = data.length ? data : [1];
                    this.charts.section.update('none'); // Use 'none' for instant updates
                }

                // Update interaction chart
                const interactions = this.data.interactions || [];
                const categories = {};
                interactions.forEach(i => {
                    categories[i.category] = (categories[i.category] || 0) + 1;
                });
                if (this.charts.interaction) {
                    const labels = Object.keys(categories);
                    const data = Object.values(categories);
                    
                    this.charts.interaction.data.labels = labels.length ? labels : ['No Data'];
                    this.charts.interaction.data.datasets[0].data = data.length ? data : [0];
                    this.charts.interaction.update('none');
                }

                // Update project chart
                const projectInteractions = this.data.projectInteractions || {};
                if (this.charts.project) {
                    const labels = Object.keys(projectInteractions);
                    const data = Object.values(projectInteractions);
                    
                    this.charts.project.data.labels = labels.length ? labels : ['No Data'];
                    this.charts.project.data.datasets[0].data = data.length ? data : [0];
                    this.charts.project.update('none');
                }

                // Update navigation chart
                const navigationClicks = this.data.navigationClicks || {};
                if (this.charts.navigation) {
                    const labels = Object.keys(navigationClicks);
                    const data = Object.values(navigationClicks);
                    
                    this.charts.navigation.data.labels = labels.length ? labels : ['No Data'];
                    this.charts.navigation.data.datasets[0].data = data.length ? data : [1];
                    this.charts.navigation.update('none');
                }
            }

            showNoDataMessage() {
                document.querySelector('.dashboard').innerHTML = `
                    <div class="no-data">
                        <h2>📊 No Analytics Data Available</h2>
                        <p>Visit your portfolio to start generating analytics data!</p>
                        <a href="index.html" class="back-button" style="position: static; transform: none; margin-top: 1rem;">
                            <i class="fas fa-arrow-left"></i>
                            Go to Portfolio
                        </a>
                    </div>
                `;
            }

            formatTime(milliseconds) {
                const seconds = Math.floor(milliseconds / 1000);
                if (seconds < 60) return `${seconds}s`;
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                return `${minutes}m ${remainingSeconds}s`;
            }
        }

        // Initialize dashboard when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new AnalyticsDashboard();
            console.log('📊 Analytics Dashboard loaded - showing real portfolio data');
        });
    </script>
</body>
</html>
