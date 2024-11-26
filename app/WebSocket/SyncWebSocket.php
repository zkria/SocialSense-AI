<?php
namespace App\WebSocket;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class SyncWebSocket implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);
        
        foreach ($this->clients as $client) {
            if ($client !== $from) {
                $client->send(json_encode([
                    'type' => 'sync_update',
                    'data' => $data
                ]));
            }
        }
    }
} 