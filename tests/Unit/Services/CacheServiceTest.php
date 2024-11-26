<?php
namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\CacheService;

class CacheServiceTest extends TestCase {
    private $cache;

    protected function setUp(): void {
        parent::setUp();
        $this->cache = CacheService::getInstance();
    }

    public function testSetAndGet() {
        $key = 'test_key';
        $value = ['data' => 'test_value'];
        
        $this->cache->set($key, $value, 60);
        $result = $this->cache->get($key);
        
        $this->assertEquals($value, $result);
    }

    public function testExpiration() {
        $key = 'expiring_key';
        $value = 'test_value';
        
        $this->cache->set($key, $value, 1);
        sleep(2);
        
        $result = $this->cache->get($key);
        $this->assertNull($result);
    }

    public function testDelete() {
        $key = 'delete_test';
        $this->cache->set($key, 'value');
        
        $this->cache->delete($key);
        $result = $this->cache->get($key);
        
        $this->assertNull($result);
    }
} 