// Results Page Interactive Features
class ResultsPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupChartInteractions();
        this.setupDataExport();
        this.setupRealTimeSimulation();
    }

    setupChartInteractions() {
        // Add click handlers to chart segments
        const chartSegments = document.querySelectorAll('[class*="border-blue-600"], [class*="border-purple-600"], [class*="border-green-600"]');
        
        chartSegments.forEach(segment => {
            segment.addEventListener('click', () => {
                this.showSegmentDetails(segment);
            });
            
            segment.addEventListener('mouseenter', () => {
                segment.style.transform = 'scale(1.05)';
                segment.style.transition = 'transform 0.3s ease';
            });
            
            segment.addEventListener('mouseleave', () => {
                segment.style.transform = 'scale(1)';
            });
        });
    }

    showSegmentDetails(segment) {
        // Get data based on segment color
        let paslonData = {};
        
        if (segment.classList.contains('border-blue-600')) {
            paslonData = {
                name: 'Paslon 01 - Ayum & Naufal',
                votes: 480,
                percentage: '41.7%',
                color: 'blue'
            };
        } else if (segment.classList.contains('border-purple-600')) {
            paslonData = {
                name: 'Paslon 03 - Satria & Melisya',
                votes: 380,
                percentage: '33.0%',
                color: 'purple'
            };
        } else if (segment.classList.contains('border-green-600')) {
            paslonData = {
                name: 'Paslon 02 - Fatimah & Fahri',
                votes: 290,
                percentage: '25.2%',
                color: 'green'
            };
        }

        // Show modal or tooltip with details
        this.showDetailModal(paslonData);
    }

    showDetailModal(data) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="glassmorphism rounded-2xl p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-${data.color}-800">Detail ${data.name}</h3>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-gray-500 hover:text-gray-700">
                        <i class='bx bx-x text-2xl'></i>
                    </button>
                </div>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span>Total Suara:</span>
                        <span class="font-bold">${data.votes} suara</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Persentase:</span>
                        <span class="font-bold">${data.percentage}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Status:</span>
                        <span class="font-bold ${data.color === 'blue' ? 'text-green-600' : 'text-gray-600'}">
                            ${data.color === 'blue' ? 'Pemenang' : 'Runner Up'}
                        </span>
                    </div>
                </div>
                <div class="mt-6 text-center">
                    <button onclick="this.closest('.fixed').remove()" class="bg-${data.color}-600 hover:bg-${data.color}-700 text-white px-6 py-2 rounded-lg transition-colors">
                        Tutup
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    setupDataExport() {
        // Add export functionality
        const exportBtn = document.createElement('button');
        exportBtn.className = 'fixed bottom-4 left-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40';
        exportBtn.innerHTML = '<i class="bx bx-download"></i>';
        exportBtn.title = 'Export Data';
        exportBtn.addEventListener('click', () => this.exportData());
        
        document.body.appendChild(exportBtn);
    }

    exportData() {
        const data = {
            totalVoters: 1200,
            validVotes: 1150,
            invalidVotes: 50,
            participationRate: '95.8%',
            results: [
                { paslon: '01', votes: 480, percentage: '41.7%' },
                { paslon: '03', votes: 380, percentage: '33.0%' },
                { paslon: '02', votes: 290, percentage: '25.2%' }
            ],
            timestamp: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `hasil-pemilos-2025-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showToast('Data berhasil di-export', 'success');
    }

    setupRealTimeSimulation() {
        // Simulate real-time data updates (for demo purposes)
        setInterval(() => {
            this.updateLiveData();
        }, 15000);
    }

    updateLiveData() {
        // Simulate minor data fluctuations
        const elements = document.querySelectorAll('.animated-number');
        elements.forEach(el => {
            const original = el.textContent;
            const number = parseInt(original.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                const fluctuation = Math.floor(Math.random() * 5) - 2; // -2 to +2
                const newNumber = Math.max(0, number + fluctuation);
                
                el.style.color = '#10B981';
                setTimeout(() => {
                    el.style.color = '';
                }, 1000);
            }
        });
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
}

// Initialize results page
document.addEventListener('DOMContentLoaded', () => {
    new ResultsPage();
});

// Utility function for number formatting
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// Utility function for percentage calculation
function calculatePercentage(part, total) {
    return ((part / total) * 100).toFixed(1);
}
