<?php
namespace App\Controllers;

class LogViewController {
    public function index() {
        $logs = $this->parseLogs();
        return view('admin.logs.index', compact('logs'));
    }

    private function parseLogs() {
        $path = storage_path('logs/general.log');
        $logs = [];
        
        if (file_exists($path)) {
            $content = file_get_contents($path);
            $lines = explode("\n", $content);
            
            foreach ($lines as $line) {
                if (!empty($line)) {
                    $logs[] = $this->parseLogLine($line);
                }
            }
        }
        
        return array_reverse($logs);
    }

    private function parseLogLine($line) {
        // تحليل سطر السجل وتحويله إلى كائن
        preg_match('/\[(.*?)\] (\w+): (.*?)(\{.*\})?$/', $line, $matches);
        
        return [
            'datetime' => $matches[1] ?? '',
            'level' => $matches[2] ?? '',
            'message' => $matches[3] ?? '',
            'context' => isset($matches[4]) ? json_decode($matches[4], true) : []
        ];
    }
} 