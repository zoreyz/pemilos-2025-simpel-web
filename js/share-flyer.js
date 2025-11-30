// Flyer Share Functionality
class FlyerShare {
    constructor() {
        this.flyerUrl = 'https://pemilos.ossnega.web.id/assets/flayerp.webp';
        this.shareText = '🎉 Ayo ikut berpartisipasi dalam Pemilihan OSIM MTSN 3 Tulungagung 2025! \n\nPemilos 2025 - "Bersatu Maju, Wujudkan Prestasi Gemilang" \n\n#Pemilos2025 #OSIMMTSN3Tulungagung #OSSnega';
        this.hashtags = 'Pemilos2025,OSIMMTSN3Tulungagung,OSSnega';
    }

    // Download flyer
    downloadFlyer() {
        const link = document.createElement('a');
        link.href = this.flyerUrl;
        link.download = 'Flyer-Pemilos-2025-OSIM-MTSN-3-Tulungagung.webp';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast('Flyer berhasil didownload!', 'success');
    }

    // Share to WhatsApp
    shareToWhatsApp() {
        const text = encodeURIComponent(this.shareText);
        const url = `https://wa.me/?text=${text} ${this.flyerUrl}`;
        window.open(url, '_blank');
    }

    // Share as WhatsApp Status (Guide)
    shareAsWhatsAppStatus() {
        this.showModal(
            'Bagikan ke WhatsApp Status',
            `
            <div class="text-center">
                <div class="bg-green-100 p-4 rounded-lg mb-4">
                    <i class='bx bxl-whatsapp text-4xl text-green-500 mb-2'></i>
                    <p class="text-green-700 font-medium">Ikuti langkah-langkah berikut:</p>
                </div>
                <ol class="text-left list-decimal list-inside space-y-2 text-gray-700 mb-4">
                    <li>Download flyer dengan menekan tombol download</li>
                    <li>Buka aplikasi WhatsApp</li>
                    <li>Pergi ke tab "Status"</li>
                    <li>Pilih flyer dari gallery Anda</li>
                    <li>Tambahkan caption dan bagikan</li>
                </ol>
                <button onclick="flyerShare.downloadFlyer()" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    <i class='bx bx-download mr-2'></i> Download Flyer
                </button>
            </div>
            `
        );
    }

    // Share to Instagram
    shareToInstagram() {
        // Instagram doesn't support direct sharing, so we guide users
        this.showModal(
            'Bagikan ke Instagram',
            `
            <div class="text-center">
                <div class="bg-pink-100 p-4 rounded-lg mb-4">
                    <i class='bx bxl-instagram text-4xl text-pink-500 mb-2'></i>
                    <p class="text-pink-700 font-medium">Ikuti langkah-langkah berikut:</p>
                </div>
                <ol class="text-left list-decimal list-inside space-y-2 text-gray-700 mb-4">
                    <li>Download flyer dengan menekan tombol download</li>
                    <li>Buka aplikasi Instagram</li>
                    <li>Buat post baru atau story</li>
                    <li>Pilih flyer dari gallery Anda</li>
                    <li>Gunakan hashtag: #Pemilos2025 #OSIMMTSN3Tulungagung</li>
                    <li>Tag @ossnega dalam post/story Anda</li>
                </ol>
                <button onclick="flyerShare.downloadFlyer()" class="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    <i class='bx bx-download mr-2'></i> Download Flyer
                </button>
            </div>
            `
        );
    }

    // Share as Instagram Story (Guide)
    shareAsInstagramStory() {
        this.showModal(
            'Bagikan ke Instagram Story',
            `
            <div class="text-center">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg mb-4 text-white">
                    <i class='bx bxl-instagram text-4xl mb-2'></i>
                    <p class="font-medium">Cara share ke Instagram Story:</p>
                </div>
                <ol class="text-left list-decimal list-inside space-y-2 text-gray-700 mb-4">
                    <li>Download flyer terlebih dahulu</li>
                    <li>Buka Instagram → Ketuk "+" untuk buat Story</li>
                    <li>Pilih flyer dari gallery Anda</li>
                    <li>Tambahkan sticker lokasi "MTsN 3 Tulungagung"</li>
                    <li>Tambahkan mention @ossnega</li>
                    <li>Gunakan hashtag #Pemilos2025</li>
                    <li>Bagikan ke story Anda</li>
                </ol>
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="flyerShare.downloadFlyer()" class="bg-pink-500 hover:bg-pink-600 text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm">
                        <i class='bx bx-download mr-1'></i> Download
                    </button>
                    <button onclick="window.open('https://www.instagram.com/ossnega/', '_blank')" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm">
                        <i class='bx bxl-instagram mr-1'></i> Follow @ossnega
                    </button>
                </div>
            </div>
            `
        );
    }

    // Share to Twitter
    shareToTwitter() {
        const text = encodeURIComponent('🎉 Ayo ikut Pemilihan OSIM MTSN 3 Tulungagung 2025!');
        const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(this.flyerUrl)}&hashtags=${this.hashtags}`;
        window.open(url, '_blank', 'width=600,height=400');
    }

    // Share to Facebook
    shareToFacebook() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.flyerUrl)}&quote=${encodeURIComponent(this.shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
    }

    // Copy flyer URL
    copyFlyerUrl() {
        const urlInput = document.getElementById('flyerUrl');
        urlInput.select();
        urlInput.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(urlInput.value).then(() => {
            const copyButton = document.getElementById('copyButton');
            const originalText = copyButton.innerHTML;
            
            copyButton.innerHTML = '<i class="bx bx-check mr-1"></i> Copied!';
            copyButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
            copyButton.classList.add('bg-green-500', 'hover:bg-green-600');
            
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.classList.remove('bg-green-500', 'hover:bg-green-600');
                copyButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
            }, 2000);
            
            this.showToast('Link berhasil disalin!', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            this.showToast('Gagal menyalin link', 'error');
        });
    }

    // Native Share API (for mobile devices)
    nativeShare() {
        if (navigator.share) {
            navigator.share({
                title: 'Flyer Pemilos 2025 - OSIM MTSN 3 Tulungagung',
                text: this.shareText,
                url: this.flyerUrl,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing:', error));
        } else {
            this.showToast('Browser tidak mendukung native share', 'error');
        }
    }

    // Show modal with custom content
    showModal(title, content) {
        // Remove existing modal if any
        const existingModal = document.getElementById('shareModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'shareModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-md w-full mx-auto animate-scale-in">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold text-gray-800">${title}</h3>
                        <button onclick="this.closest('#shareModal').remove()" class="text-gray-500 hover:text-gray-700">
                            <i class='bx bx-x text-xl'></i>
                        </button>
                    </div>
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Show toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        }`;
        toast.textContent = message;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
            toast.classList.add('translate-x-0');
        }, 100);

        // Remove after 3 seconds
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
}

// Initialize flyer share
const flyerShare = new FlyerShare();

// Global functions for onclick events
function downloadFlyer() { flyerShare.downloadFlyer(); }
function shareToWhatsApp() { flyerShare.shareToWhatsApp(); }
function shareAsWhatsAppStatus() { flyerShare.shareAsWhatsAppStatus(); }
function shareToInstagram() { flyerShare.shareToInstagram(); }
function shareAsInstagramStory() { flyerShare.shareAsInstagramStory(); }
function shareToTwitter() { flyerShare.shareToTwitter(); }
function shareToFacebook() { flyerShare.shareToFacebook(); }
function copyFlyerUrl() { flyerShare.copyFlyerUrl(); }
function nativeShare() { flyerShare.nativeShare(); }

// Add native share button for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    if (navigator.share) {
        const shareButtons = document.querySelector('.share-buttons');
        if (shareButtons) {
            const nativeShareBtn = document.createElement('button');
            nativeShareBtn.className = 'share-btn bg-purple-500';
            nativeShareBtn.innerHTML = '<i class="bx bx-share-alt mr-1"></i> Share';
            nativeShareBtn.onclick = nativeShare;
            shareButtons.appendChild(nativeShareBtn);
        }
    }
});
