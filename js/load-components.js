// Component loader dengan error handling
async function loadComponent(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        
        // Re-initialize components after loading
        if (typeof initSidebar === 'function') initSidebar();
        if (typeof initAlertBanner === 'function') initAlertBanner();
        if (typeof initWhatsAppWidget === 'function') initWhatsAppWidget();
        if (typeof initTimeline === 'function') initTimeline();
        if (typeof initSmoothScrolling === 'function') initSmoothScrolling();
        
    } catch (error) {
        console.error('Error loading component:', error);
        document.getElementById(containerId).innerHTML = `<div class="text-red-500 text-center p-4">Error loading component: ${filePath}</div>`;
    }
}

// Load all components
document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadComponent('sidebar-container', 'components/sidebar.html');
    loadComponent('navbar-container', 'components/navbar.html');
    loadComponent('whatsapp-container', 'components/whatsapp-widget.html');
    
    // Load sections
    loadComponent('hero-section', 'sections/hero.html');
    loadComponent('announcement-section', 'sections/announcement.html');
    loadComponent('twibbon-section', 'sections/twibbon.html');
    loadComponent('candidates-section', 'sections/candidates.html');
    loadComponent('flyer-section', 'sections/flyer.html');
    loadComponent('how-to-vote-section', 'sections/how-to-vote.html');
    loadComponent('timeline-section', 'sections/timeline.html');
    loadComponent('about-section', 'sections/about.html');
    loadComponent('question-section', 'sections/question.html');
    loadComponent('footer-section', 'components/footer.html');
});
