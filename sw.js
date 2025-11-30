const CACHE_NAME = 'pemilos-2025-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/global.css',
  '/css/components.css',
  '/js/script.js',
  '/js/countdown.js',
  '/js/load-components.js',
  '/components/navbar.html',
  '/components/sidebar.html',
  '/components/footer.html',
  '/components/whatsapp-widget.html',
  '/sections/hero.html',
  '/sections/announcement.html',
  '/sections/twibbon.html',
  '/sections/candidates.html',
  '/sections/flyer.html',
  '/sections/how-to-vote.html',
  '/sections/timeline.html',
  '/sections/about.html',
  '/sections/question.html',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
