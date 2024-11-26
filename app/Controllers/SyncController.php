<?php
namespace App\Controllers;

use App\Services\SyncService;

class SyncController {
    private $syncService;

    public function __construct() {
        $this->syncService = new SyncService();
    }

    public function startSync() {
        $userId = auth()->id();
        return $this->syncService->syncSocialMedia($userId);
    }

    public function getSyncStatus($syncId) {
        return [
            'status' => 'in_progress',
            'progress' => 75,
            'last_update' => date('Y-m-d H:i:s')
        ];
    }
} 