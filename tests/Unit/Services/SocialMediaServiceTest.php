<?php
namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\SocialMediaService;

class SocialMediaServiceTest extends TestCase {
    private $socialMediaService;

    protected function setUp(): void {
        parent::setUp();
        $this->socialMediaService = new SocialMediaService();
    }

    public function testCreatePost() {
        $postData = [
            'content' => 'اختبار المنشور',
            'platform' => 'twitter',
            'schedule_time' => null
        ];

        $result = $this->socialMediaService->createPost($postData);
        
        $this->assertTrue($result['success']);
        $this->assertArrayHasKey('post_id', $result);
    }

    public function testSchedulePost() {
        $scheduleData = [
            'content' => 'منشور مجدول',
            'platform' => 'facebook',
            'schedule_time' => '2024-03-20 15:00:00'
        ];

        $result = $this->socialMediaService->schedulePost($scheduleData);
        
        $this->assertTrue($result['success']);
        $this->assertEquals(
            $scheduleData['schedule_time'], 
            $result['scheduled_time']
        );
    }

    public function testInvalidPostContent() {
        $this->expectException(\InvalidArgumentException::class);
        
        $postData = [
            'content' => '', // محتوى فارغ
            'platform' => 'twitter'
        ];

        $this->socialMediaService->createPost($postData);
    }
} 