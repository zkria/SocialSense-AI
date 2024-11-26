<?php
namespace App\Controllers;

use App\Services\NotificationService;

class NotificationController {
    private $notificationService;

    public function __construct() {
        $this->notificationService = new NotificationService();
    }

    public function getNotifications() {
        $userId = auth()->id();
        return $this->notificationService->getUserNotifications($userId);
    }

    public function markAsRead($notificationId) {
        $userId = auth()->id();
        return $this->notificationService->markAsRead($userId, $notificationId);
    }

    public function getUnreadCount() {
        $userId = auth()->id();
        return $this->notificationService->getUnreadCount($userId);
    }
} 