<?php
namespace Tests;

use PHPUnit\Framework\TestCase as BaseTestCase;
use App\Services\LoggerService;
use App\Services\CacheService;

class TestCase extends BaseTestCase {
    protected $logger;
    protected $cache;

    protected function setUp(): void {
        parent::setUp();
        $this->logger = LoggerService::getInstance();
        $this->cache = CacheService::getInstance();
    }

    protected function tearDown(): void {
        $this->cache->clear();
        parent::tearDown();
    }
} 