<?php
namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\AnalyticsService;

class AnalyticsServiceTest extends TestCase {
    private $analyticsService;

    protected function setUp(): void {
        parent::setUp();
        $this->analyticsService = new AnalyticsService();
    }

    public function testHashtagAnalysis() {
        $hashtag = 'تجربة';
        $result = $this->analyticsService->analyzeHashtag($hashtag);

        $this->assertArrayHasKey('popularity', $result);
        $this->assertArrayHasKey('engagement_rate', $result);
        $this->assertArrayHasKey('peak_times', $result);
    }

    public function testPeakTimeAnalysis() {
        $userId = 1;
        $result = $this->analyticsService->analyzePeakTimes($userId);

        $this->assertIsArray($result);
        $this->assertCount(24, $result); // ساعات اليوم
        $this->assertArrayHasKey('best_time', $result);
    }

    public function testEngagementMetrics() {
        $postId = 1;
        $metrics = $this->analyticsService->getEngagementMetrics($postId);

        $this->assertArrayHasKey('likes', $metrics);
        $this->assertArrayHasKey('shares', $metrics);
        $this->assertArrayHasKey('comments', $metrics);
        $this->assertIsNumeric($metrics['engagement_rate']);
    }
} 