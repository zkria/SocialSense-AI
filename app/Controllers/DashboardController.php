<?php
namespace App\Controllers;

use App\Services\LoggerService;

class DashboardController {
    private $logger;

    public function __construct() {
        $this->logger = LoggerService::getInstance();
    }

    public function index() {
        try {
            // تحميل بيانات لوحة التحكم
            $this->logger->info('تم تحميل لوحة التحكم', [
                'user_id' => auth()->id(),
                'page' => 'dashboard'
            ]);
            
        } catch (\Exception $e) {
            $this->logger->error('فشل في تحميل لوحة التحكم', [
                'error' => $e->getMessage()
            ]);
        }
    }
} 