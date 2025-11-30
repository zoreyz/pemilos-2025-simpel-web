// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Sidebar Toggle
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking on a link
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    });
}

// Alert Banner
function initAlertBanner() {
    const officialAlert = document.getElementById('officialAlert');
    const closeAlert = document.getElementById('closeAlert');
    
    if (closeAlert) {
        closeAlert.addEventListener('click', () => {
            officialAlert.style.display = 'none';
        });
    }
}

// WhatsApp Floating Button
function initWhatsAppWidget() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const closePopup = document.getElementById('closePopup');
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', () => {
            whatsappPopup.classList.toggle('active');
        });
    }
    
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            whatsappPopup.classList.remove('active');
        });
    }
}

// Timeline Interaction
function initTimeline() {
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.addEventListener('click', () => {
            const details = item.querySelector('.timeline-details');
            details.classList.toggle('hidden');
            item.classList.toggle('active');
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initAlertBanner();
    initWhatsAppWidget();
    initTimeline();
    initSmoothScrolling();
});
