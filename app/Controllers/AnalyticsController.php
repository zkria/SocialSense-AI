<?php
namespace App\Controllers;

use App\Traits\Cacheable;
use App\Services\LoggerService;

class AnalyticsController {
    use Cacheable;

    private $logger;

    public function __construct() {
        $this->logger = LoggerService::getInstance();
    }

    public function getHashtagAnalytics($hashtag) {
        $cacheKey = $this->cacheKey(__METHOD__, [$hashtag]);
        
        return $this->remember($cacheKey, function() use ($hashtag) {
            // تنفيذ تحليل الهاشتاج
            $analysis = $this->performHashtagAnalysis($hashtag);
            
            $this->logger->info('تم تحليل الهاشتاج', [
                'hashtag' => $hashtag
            ]);
            
            return $analysis;
        }, 1800); // تخزين مؤقت لمدة 30 دقيقة
    }

    public function getUserStats($userId) {
        $cacheKey = $this->cacheKey(__METHOD__, [$userId]);
        
        return $this->remember($cacheKey, function() use ($userId) {
            return $this->calculateUserStats($userId);
        }, 3600); // تخزين مؤقت لمدة ساعة
    }
} 