class SyncNotifications {
    constructor() {
        this.permission = Notification.permission;
        this.requestPermission();
    }

    async requestPermission() {
        if (this.permission !== 'granted') {
            this.permission = await Notification.requestPermission();
        }
    }

    showNotification(title, options = {}) {
        if (this.permission === 'granted') {
            return new Notification(title, {
                icon: '/assets/images/sync-icon.png',
                ...options
            });
        }
    }
}

const notifications = new SyncNotifications(); 