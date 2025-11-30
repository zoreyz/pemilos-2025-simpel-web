// PWA functionality
class PWAHelper {
  constructor() {
    this.deferredPrompt = null;
    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.addInstallPromptListener();
    this.addAppInstalledListener();
  }

  // Register Service Worker
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Listen for install prompt
  addInstallPromptListener() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallPromotion();
    });
  }

  // Show install promotion
  showInstallPromotion() {
    const installButton = document.getElementById('installButton');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.addEventListener('click', () => {
        this.installApp();
      });
    }
  }

  // Install app
  async installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        this.hideInstallPromotion();
      } else {
        console.log('User dismissed the install prompt');
      }
      
      this.deferredPrompt = null;
    }
  }

  // Hide install promotion
  hideInstallPromotion() {
    const installButton = document.getElementById('installButton');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  // Listen for app installed
  addAppInstalledListener() {
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.hideInstallPromotion();
    });
  }

  // Check if app is running in standalone mode
  isRunningStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
  }

  // Get PWA status
  getPWAStatus() {
    return {
      isStandalone: this.isRunningStandalone(),
      isInstallable: !!this.deferredPrompt,
      isOnline: navigator.onLine
    };
  }
}

// Initialize PWA
let pwaHelper;

document.addEventListener('DOMContentLoaded', () => {
  pwaHelper = new PWAHelper();
  
  // Add install button to footer if not exists
  if (!document.getElementById('installButton')) {
    const installButton = document.createElement('button');
    installButton.id = 'installButton';
    installButton.className = 'fixed bottom-24 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hidden';
    installButton.innerHTML = '<i class="bx bx-download text-xl"></i>';
    installButton.title = 'Install App';
    document.body.appendChild(installButton);
  }
});
