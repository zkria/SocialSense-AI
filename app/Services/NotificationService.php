<?php
namespace App\Services;

class NotificationService {
    private $redis;
    private $logger;
    private $websocket;

    public function __construct() {
        $this->redis = new \Redis();
        $this->redis->connect('127.0.0.1', 6379);
        $this->logger = LoggerService::getInstance();
        $this->websocket = new WebSocketService();
    }

    public function send($userId, $notification) {
        try {
            // تخزين الإشعار
            $notificationId = $this->storeNotification($userId, $notification);
            
            // إرسال عبر WebSocket
            $this->websocket->broadcast("user.{$userId}", [
                'type' => 'notification',
                'data' => $notification
            ]);

            // إرسال Push Notification
            $this->sendPushNotification($userId, $notification);

            return $notificationId;
        } catch (\Exception $e) {
            $this->logger->error('فشل في إرسال الإشعار', [
                'error' => $e->getMessage(),
                'user_id' => $userId
            ]);
            throw $e;
        }
    }

    private function storeNotification($userId, $notification) {
        $id = uniqid('notif_');
        $this->redis->hSet(
            "notifications:{$userId}",
            $id,
            json_encode([
                'id' => $id,
                'data' => $notification,
                'read' => false,
                'created_at' => time()
            ])
        );
        return $id;
    }
} 