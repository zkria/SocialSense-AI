<?php
namespace App\Services;

use Redis;
use LoggerService;

class CacheService {
    private $redis;
    private $logger;
    private static $instance;
    
    private function __construct() {
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
        $this->logger = LoggerService::getInstance();
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function get($key) {
        try {
            $value = $this->redis->get($key);
            return $value ? json_decode($value, true) : null;
        } catch (\Exception $e) {
            $this->logger->error('خطأ في استرجاع البيانات من الذاكرة المؤقتة', [
                'key' => $key,
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    public function set($key, $value, $ttl = 3600) {
        try {
            $this->redis->setex($key, $ttl, json_encode($value));
            return true;
        } catch (\Exception $e) {
            $this->logger->error('خطأ في تخزين البيانات في الذاكرة المؤقتة', [
                'key' => $key,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    public function delete($key) {
        return $this->redis->del($key);
    }

    public function clear() {
        return $this->redis->flushAll();
    }
} 