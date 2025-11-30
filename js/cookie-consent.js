// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.cookieName = 'pemilos_cookie_consent';
        this.consent = this.getConsent();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showBannerIfNeeded();
        this.applyConsent();
    }

    setupEventListeners() {
        // Cookie Banner Elements
        const acceptAll = document.getElementById('acceptAll');
        const acceptNecessary = document.getElementById('acceptNecessary');
        const cookieClose = document.getElementById('cookieClose');
        const cookieBanner = document.getElementById('cookieConsent');

        // Settings Modal Elements
        const openSettings = document.getElementById('openSettings');
        const closeSettings = document.getElementById('closeSettings');
        const saveSettings = document.getElementById('saveSettings');
        const resetSettings = document.getElementById('resetSettings');
        const cookieSettings = document.getElementById('cookieSettings');

        // Banner Actions
        if (acceptAll) {
            acceptAll.addEventListener('click', () => {
                this.setConsent(true, true, true);
                this.hideBanner();
                this.showToast('Preferensi cookie telah disimpan', 'success');
            });
        }

        if (acceptNecessary) {
            acceptNecessary.addEventListener('click', () => {
                this.setConsent(true, false, false);
                this.hideBanner();
                this.showToast('Hanya cookie penting yang diaktifkan', 'info');
            });
        }

        if (cookieClose) {
            cookieClose.addEventListener('click', () => {
                this.hideBanner();
                // Set necessary only if no consent exists
                if (!this.consent) {
                    this.setConsent(true, false, false);
                }
            });
        }

        // Settings Modal Actions
        if (saveSettings) {
            saveSettings.addEventListener('click', () => {
                const analytics = document.getElementById('analyticsSettings').checked;
                const preference = document.getElementById('preferenceSettings').checked;
                
                this.setConsent(true, analytics, preference);
                this.hideSettings();
                this.hideBanner();
                this.showToast('Pengaturan cookie telah disimpan', 'success');
            });
        }

        if (closeSettings) {
            closeSettings.addEventListener('click', () => {
                this.hideSettings();
            });
        }

        if (resetSettings) {
            resetSettings.addEventListener('click', () => {
                this.resetSettings();
            });
        }

        // Close modal when clicking outside
        if (cookieSettings) {
            cookieSettings.addEventListener('click', (e) => {
                if (e.target === cookieSettings) {
                    this.hideSettings();
                }
            });
        }

        // Open settings from anywhere (add this button somewhere in your UI)
        this.addSettingsButton();
    }

    addSettingsButton() {
        // Add cookie settings button to footer or somewhere accessible
        const existingButton = document.getElementById('openCookieSettings');
        if (!existingButton) {
            const settingsBtn = document.createElement('button');
            settingsBtn.id = 'openCookieSettings';
            settingsBtn.className = 'hidden'; // Initially hidden
            settingsBtn.innerHTML = '<i class="bx bx-cog mr-1"></i>Pengaturan Cookie';
            settingsBtn.addEventListener('click', () => this.showSettings());
            
            // Add to footer or create a floating button
            const footer = document.querySelector('footer');
            if (footer) {
                const container = document.createElement('div');
                container.className = 'text-center mt-4';
                container.appendChild(settingsBtn);
                footer.appendChild(container);
            }
        }
    }

    showBannerIfNeeded() {
        if (!this.consent) {
            setTimeout(() => {
                this.showBanner();
            }, 2000); // Show after 2 seconds
        }
    }

    showBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('translate-y-full');
            banner.classList.add('translate-y-0');
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('translate-y-0');
            banner.classList.add('translate-y-full');
        }
    }

    showSettings() {
        const modal = document.getElementById('cookieSettings');
        const analytics = document.getElementById('analyticsSettings');
        const preference = document.getElementById('preferenceSettings');

        if (modal && analytics && preference) {
            // Set current values
            analytics.checked = this.consent?.analytics || false;
            preference.checked = this.consent?.preference || false;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    hideSettings() {
        const modal = document.getElementById('cookieSettings');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    resetSettings() {
        document.getElementById('analyticsSettings').checked = false;
        document.getElementById('preferenceSettings').checked = false;
    }

    setConsent(necessary, analytics, preference) {
        const consent = {
            necessary: necessary,
            analytics: analytics,
            preference: preference,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };

        this.consent = consent;
        this.saveConsent(consent);
        this.applyConsent();
        
        // Show settings button after consent
        const settingsBtn = document.getElementById('openCookieSettings');
        if (settingsBtn) {
            settingsBtn.classList.remove('hidden');
        }
    }

    getConsent() {
        try {
            const cookie = this.getCookie(this.cookieName);
            if (cookie) {
                return JSON.parse(cookie);
            }
        } catch (error) {
            console.warn('Error reading cookie consent:', error);
        }
        return null;
    }

    saveConsent(consent) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry
        
        document.cookie = `${this.cookieName}=${JSON.stringify(consent)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    applyConsent() {
        if (!this.consent) return;

        // Apply analytics consent
        if (this.consent.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Apply preference consent
        if (this.consent.preference) {
            this.enablePreferences();
        } else {
            this.disablePreferences();
        }

        // Necessary cookies are always enabled
        this.enableNecessary();
    }

    enableNecessary() {
        // Essential functionality that always runs
        console.log('Necessary cookies enabled');
    }

    enableAnalytics() {
        // Initialize analytics tools (Google Analytics, etc.)
        console.log('Analytics cookies enabled');
        
        // Example: Initialize Google Analytics
        // gtag('config', 'GA_MEASUREMENT_ID', { anonymize_ip: true });
        
        // Track page view
        this.trackPageView();
    }

    disableAnalytics() {
        // Disable analytics tracking
        console.log('Analytics cookies disabled');
        
        // Example: Disable Google Analytics
        // window['ga-disable-GA_MEASUREMENT_ID'] = true;
    }

    enablePreferences() {
        // Apply user preferences
        console.log('Preference cookies enabled');
        
        // Example: Apply theme preferences, language settings, etc.
        this.applyUserPreferences();
    }

    disablePreferences() {
        // Clear preference data
        console.log('Preference cookies disabled');
        
        // Example: Clear local storage for preferences
        // localStorage.removeItem('userPreferences');
    }

    trackPageView() {
        // Simple analytics tracking (replace with your analytics tool)
        const data = {
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            referrer: document.referrer
        };
        
        console.log('Page view tracked:', data);
        
        // You can send this to your analytics endpoint
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(data) });
    }

    applyUserPreferences() {
        // Apply saved user preferences
        // This is where you'd apply theme, language, etc.
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        }`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('translate-x-full');
            toast.classList.add('translate-x-0');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('translate-x-0');
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Public method to check consent status
    hasConsent(type) {
        if (!this.consent) return false;
        return this.consent[type] || false;
    }

    // Public method to update consent
    updateConsent(updates) {
        const newConsent = { ...this.consent, ...updates };
        this.setConsent(
            newConsent.necessary,
            newConsent.analytics,
            newConsent.preference
        );
    }
}

// Initialize cookie consent
const cookieConsent = new CookieConsent();

// Make it globally available
window.cookieConsent = cookieConsent;

// Helper function to open cookie settings
function openCookieSettings() {
    cookieConsent.showSettings();
}

// Auto-hide banner after 30 seconds if no interaction
setTimeout(() => {
    if (!cookieConsent.consent) {
        const banner = document.getElementById('cookieConsent');
        if (banner && !banner.classList.contains('translate-y-full')) {
            cookieConsent.hideBanner();
            cookieConsent.setConsent(true, false, false); // Set necessary only
        }
    }
}, 30000);
