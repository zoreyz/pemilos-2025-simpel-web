# Website Pemilos 2025 - OSIM MTSN 3 Tulungagung

Website resmi Pemilihan OSIM MTSN 3 Tulungagung 2025 dengan fitur PWA (Progressive Web App).

## Fitur

- ✅ Responsive Design
- ✅ PWA (Progressive Web App)
- ✅ Offline Support
- ✅ Installable
- ✅ Fast Loading
- ✅ Modern UI/UX

## Struktur Folder

```

pemilos-2025/
├──index.html
├──manifest.json
├──sw.js
├──.htaccess
├──robots.txt
├──sitemap.xml
├──css/
│├── global.css
│├── components.css
│└── pwa.css
├──js/
│├── script.js
│├── countdown.js
│├── pwa.js
│├── offline.js
│├── install-promotion.js
│└── load-components.js
├──components/
│├── navbar.html
│├── sidebar.html
│├── footer.html
│├── whatsapp-widget.html
│└── install-promotion.html
├──sections/
│├── hero.html
│├── announcement.html
│├── twibbon.html
│├── candidates.html
│├── flyer.html
│├── how-to-vote.html
│├── timeline.html
│├── about.html
│└── question.html
├──icons/ (untuk favicon dan app icons)
└──screenshots/ (untuk app store screenshots)

```

## Setup

1. Upload semua file ke hosting
2. Pastikan HTTPS aktif (wajib untuk PWA)
3. Update URL di `manifest.json` dan `sitemap.xml`
4. Generate icons dan simpan di folder `icons/`

## PWA Features

- **Installable**: User bisa install website sebagai app
- **Offline Support**: Bisa diakses tanpa internet
- **Fast**: Loading cepat dengan service worker
- **Responsive**: Tampilan optimal di semua device

## Browser Support

- Chrome 40+
- Firefox 44+
- Safari 11.1+
- Edge 17+

## Development

Untuk development, pastikan:
- Server lokal support HTTPS (untuk PWA testing)
- Service worker terdaftar dengan benar
- Manifest.json terakses

## License

© 2025 Panitia Pemilihan OSIM MTSN 3 Tulungagung
