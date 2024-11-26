<?php
namespace App\Services;

use Redis;

class PerformanceService {
    private $redis;
    
    public function __construct() {
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }
    
    public function cachePageData($key, $data, $ttl = 3600) {
        return $this->redis->setex($key, $ttl, serialize($data));
    }
    
    public function getPageData($key) {
        $data = $this->redis->get($key);
        return $data ? unserialize($data) : null;
    }
} 