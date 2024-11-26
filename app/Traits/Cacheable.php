<?php
namespace App\Traits;

use App\Services\CacheService;

trait Cacheable {
    private $cache;
    
    protected function getCacheInstance() {
        if (!$this->cache) {
            $this->cache = CacheService::getInstance();
        }
        return $this->cache;
    }

    protected function cacheKey($method, $params = []) {
        return sprintf(
            '%s:%s:%s',
            get_class($this),
            $method,
            md5(serialize($params))
        );
    }

    protected function remember($key, $callback, $ttl = 3600) {
        $cache = $this->getCacheInstance();
        $value = $cache->get($key);

        if ($value !== null) {
            return $value;
        }

        $value = $callback();
        $cache->set($key, $value, $ttl);
        return $value;
    }
} 