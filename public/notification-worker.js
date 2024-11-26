self.addEventListener('push', function(event) {
    const data = event.data.json();
    
    const options = {
        body: data.content,
        icon: '/assets/images/notification-icon.png',
        badge: '/assets/images/badge-icon.png',
        data: data
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
}); 