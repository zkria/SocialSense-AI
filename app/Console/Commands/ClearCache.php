<?php
namespace App\Console\Commands;

class ClearCache {
    public function handle() {
        $cache = CacheService::getInstance();
        $cache->clear();
        
        LoggerService::getInstance()->info('تم تنظيف الذاكرة المؤقتة');
    }
} 