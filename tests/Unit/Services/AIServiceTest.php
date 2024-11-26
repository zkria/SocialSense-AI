<?php
namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\AIService;

class AIServiceTest extends TestCase {
    private $aiService;

    protected function setUp(): void {
        parent::setUp();
        $this->aiService = new AIService();
    }

    public function testContentGeneration() {
        $prompt = 'اكتب منشور عن التكنولوجيا';
        $result = $this->aiService->generateContent($prompt);

        $this->assertIsString($result);
        $this->assertNotEmpty($result);
    }

    public function testAutoReply() {
        $message = 'ما هي ساعات العمل؟';
        $reply = $this->aiService->generateAutoReply($message);

        $this->assertIsString($reply);
        $this->assertNotEmpty($reply);
    }

    public function testHashtagRecommendations() {
        $content = 'منشور عن التكنولوجيا والذكاء الاصطناعي';
        $hashtags = $this->aiService->recommendHashtags($content);

        $this->assertIsArray($hashtags);
        $this->assertGreaterThan(0, count($hashtags));
    }
} 