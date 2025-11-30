// Offline functionality
class OfflineManager {
  constructor() {
    this.init();
  }

  init() {
    this.addOnlineListener();
    this.addOfflineListener();
    this.checkConnection();
  }

  addOnlineListener() {
    window.addEventListener('online', () => {
      this.hideOfflineNotification();
      this.showOnlineNotification();
      console.log('Connection restored');
    });
  }

  addOfflineListener() {
    window.addEventListener('offline', () => {
      this.showOfflineNotification();
      console.log('Connection lost');
    });
  }

  showOfflineNotification() {
    let notification = document.getElementById('offlineNotification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'offlineNotification';
      notification.className = 'offline-notification';
      notification.innerHTML = `
        <div class="container mx-auto px-4 flex items-center justify-center">
          <i class='bx bx-wifi-off mr-2'></i>
          <span>Anda sedang offline. Beberapa fitur mungkin tidak tersedia.</span>
        </div>
      `;
      document.body.appendChild(notification);
    }
    notification.classList.add('show');
  }

  hideOfflineNotification() {
    const notification = document.getElementById('offlineNotification');
    if (notification) {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }

  showOnlineNotification() {
    let notification = document.getElementById('onlineNotification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'onlineNotification';
      notification.className = 'offline-notification';
      notification.style.background = '#48bb78';
      notification.innerHTML = `
        <div class="container mx-auto px-4 flex items-center justify-center">
          <i class='bx bx-wifi mr-2'></i>
          <span>Koneksi internet telah pulih.</span>
        </div>
      `;
      document.body.appendChild(notification);
      notification.classList.add('show');
      
      setTimeout(() => {
        this.hideOnlineNotification();
      }, 3000);
    }
  }

  hideOnlineNotification() {
    const notification = document.getElementById('onlineNotification');
    if (notification) {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }

  checkConnection() {
    if (!navigator.onLine) {
      this.showOfflineNotification();
    }
  }

  // Cache management
  async clearOldCaches() {
    const cacheNames = await caches.keys();
    const currentCache = 'pemilos-2025-v1.0.0';
    
    return Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== currentCache) {
          return caches.delete(cacheName);
        }
      })
    );
  }
}

// Initialize offline manager
let offlineManager;

document.addEventListener('DOMContentLoaded', () => {
  offlineManager = new OfflineManager();
});
