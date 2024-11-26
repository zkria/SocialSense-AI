class NotificationComponent {
    constructor() {
        this.socket = new WebSocket('ws://your-domain/notifications');
        this.notifications = [];
        this.unreadCount = 0;
        this.initializeWebSocket();
        this.requestNotificationPermission();
    }

    initializeWebSocket() {
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'notification') {
                this.handleNewNotification(data.data);
            }
        };
    }

    async requestNotificationPermission() {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            this.setupPushNotifications();
        }
    }

    handleNewNotification(notification) {
        this.notifications.unshift(notification);
        this.unreadCount++;
        this.updateUI();
        this.showPushNotification(notification);
    }

    updateUI() {
        // تحديث عداد الإشعارات غير المقروءة
        document.getElementById('notification-count').textContent = this.unreadCount;
        
        // تحديث قائمة الإشعارات
        const container = document.getElementById('notifications-list');
        container.innerHTML = this.notifications
            .map(notif => this.renderNotification(notif))
            .join('');
    }

    renderNotification(notification) {
        return `
            <div class="notification ${notification.read ? 'read' : 'unread'}">
                <div class="notification-content">
                    ${notification.content}
                </div>
                <div class="notification-time">
                    ${this.formatTime(notification.created_at)}
                </div>
            </div>
        `;
    }
} 