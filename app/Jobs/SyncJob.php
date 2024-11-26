<?php
namespace App\Jobs;

class SyncJob {
    private $data;
    private $logger;

    public function __construct($data) {
        $this->data = $data;
        $this->logger = LoggerService::getInstance();
    }

    public function handle() {
        foreach ($this->data['platforms'] as $platform) {
            try {
                $this->syncPlatform($platform, $this->data['user_id']);
            } catch (\Exception $e) {
                $this->logger->error("خطأ في مزامنة {$platform}", [
                    'error' => $e->getMessage(),
                    'user_id' => $this->data['user_id']
                ]);
            }
        }
    }

    private function syncPlatform($platform, $userId) {
        // تنفيذ المزامنة لكل منصة
        switch ($platform) {
            case 'facebook':
                return $this->syncFacebook($userId);
            case 'twitter':
                return $this->syncTwitter($userId);
            case 'instagram':
                return $this->syncInstagram($userId);
        }
    }
} 