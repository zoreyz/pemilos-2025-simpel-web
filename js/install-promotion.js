// Install Promotion Manager
class InstallPromotion {
  constructor() {
    this.promotionShown = false;
    this.init();
  }

  init() {
    this.checkAndShowPromotion();
    this.addEventListeners();
  }

  checkAndShowPromotion() {
    // Show promotion after 30 seconds if not installed
    setTimeout(() => {
      if (!this.isAppInstalled() && !this.promotionShown) {
        this.showPromotion();
      }
    }, 30000);
  }

  isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
  }

  showPromotion() {
    const promotion = document.getElementById('installPromotion');
    if (promotion && !this.isAppInstalled()) {
      promotion.classList.remove('hidden');
      this.promotionShown = true;
      
      // Auto hide after 15 seconds
      setTimeout(() => {
        this.hidePromotion();
      }, 15000);
    }
  }

  hidePromotion() {
    const promotion = document.getElementById('installPromotion');
    if (promotion) {
      promotion.classList.add('hidden');
    }
  }

  addEventListeners() {
    // Install accept
    const installAccept = document.getElementById('installAccept');
    if (installAccept) {
      installAccept.addEventListener('click', () => {
        if (window.pwaHelper && window.pwaHelper.deferredPrompt) {
          window.pwaHelper.installApp();
        }
        this.hidePromotion();
      });
    }

    // Install decline
    const installDecline = document.getElementById('installDecline');
    if (installDecline) {
      installDecline.addEventListener('click', () => {
        this.hidePromotion();
        // Don't show again for 7 days
        this.setDismissed();
      });
    }

    // Install close
    const installClose = document.getElementById('installClose');
    if (installClose) {
      installClose.addEventListener('click', () => {
        this.hidePromotion();
        this.setDismissed();
      });
    }
  }

  setDismissed() {
    const dismissedUntil = new Date();
    dismissedUntil.setDate(dismissedUntil.getDate() + 7);
    localStorage.setItem('installPromotionDismissed', dismissedUntil.toISOString());
  }

  shouldShowPromotion() {
    const dismissedUntil = localStorage.getItem('installPromotionDismissed');
    if (!dismissedUntil) return true;
    
    const dismissedDate = new Date(dismissedUntil);
    return new Date() > dismissedDate;
  }
}

// Initialize install promotion
let installPromotion;

document.addEventListener('DOMContentLoaded', () => {
  installPromotion = new InstallPromotion();
});
