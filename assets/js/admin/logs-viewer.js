class LogViewer {
    constructor() {
        this.initializeFilters();
        this.setupRealTimeUpdates();
    }

    initializeFilters() {
        document.getElementById('logLevel').addEventListener('change', this.filterLogs.bind(this));
        document.getElementById('dateFilter').addEventListener('change', this.filterLogs.bind(this));
    }

    filterLogs() {
        const level = document.getElementById('logLevel').value;
        const date = document.getElementById('dateFilter').value;
        
        fetch(`/api/logs?level=${level}&date=${date}`)
            .then(response => response.json())
            .then(logs => this.updateLogsTable(logs));
    }

    setupRealTimeUpdates() {
        // تحديث السجلات في الوقت الفعلي باستخدام WebSocket
        const ws = new WebSocket('ws://your-domain/logs');
        
        ws.onmessage = (event) => {
            const log = JSON.parse(event.data);
            this.prependLogEntry(log);
        };
    }

    showDetails(context) {
        // عرض تفاصيل السجل في نافذة منبثقة
        const modal = new Modal();
        modal.show('تفاصيل السجل', JSON.stringify(context, null, 2));
    }
} 