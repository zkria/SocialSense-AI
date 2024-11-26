class SyncManager {
    constructor() {
        this.socket = new WebSocket('ws://your-domain/sync');
        this.initializeWebSocket();
    }

    initializeWebSocket() {
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.updateSyncUI(data);
        };
    }

    startSync() {
        fetch('/api/sync/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.showSyncStatus(data);
        });
    }

    updateSyncUI(data) {
        const statusElement = document.getElementById('sync-status');
        const progressBar = document.getElementById('sync-progress');
        
        statusElement.textContent = data.status;
        progressBar.style.width = `${data.progress}%`;
    }
} 