<?php
namespace App\Services;

class ChangeTrackingService {
    private $redis;

    public function __construct() {
        $this->redis = new \Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    public function trackChange($type, $data) {
        $changeId = uniqid('change_');
        $this->redis->hSet('changes', $changeId, json_encode([
            'type' => $type,
            'data' => $data,
            'timestamp' => time()
        ]));
        return $changeId;
    }

    public function getChanges($since) {
        $changes = [];
        $allChanges = $this->redis->hGetAll('changes');
        
        foreach ($allChanges as $id => $change) {
            $change = json_decode($change, true);
            if ($change['timestamp'] > $since) {
                $changes[$id] = $change;
            }
        }
        
        return $changes;
    }
} 