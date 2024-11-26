<?php
namespace Tests\Integration;

use Tests\TestCase;
use App\Services\SocialMediaService;
use App\Services\AIService;
use App\Services\AnalyticsService;

class SocialMediaIntegrationTest extends TestCase {
    private $socialMedia;
    private $ai;
    private $analytics;

    protected function setUp(): void {
        parent::setUp();
        $this->socialMedia = new SocialMediaService();
        $this->ai = new AIService();
        $this->analytics = new AnalyticsService();
    }

    public function testCompletePostingFlow() {
        // توليد المحتوى
        $prompt = 'اكتب عن التكنولوجيا';
        $content = $this->ai->generateContent($prompt);

        // إضافة الهاشتاجات
        $hashtags = $this->ai->recommendHashtags($content);
        $fullContent = $content . ' ' . implode(' ', $hashtags);

        // تحليل أفضل وقت للنشر
        $bestTime = $this->analytics->getBestPostingTime();

        // جدولة المنشور
        $result = $this->socialMedia->schedulePost([
            'content' => $fullContent,
            'schedule_time' => $bestTime
        ]);

        $this->assertTrue($result['success']);
    }
} 