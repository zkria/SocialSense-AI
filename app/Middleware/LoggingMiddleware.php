<?php
namespace App\Middleware;

use App\Services\LoggerService;

class LoggingMiddleware {
    private $logger;

    public function __construct() {
        $this->logger = LoggerService::getInstance();
    }

    public function handle($request, $next) {
        // تسجيل بداية الطلب
        $this->logger->info('Request started', [
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'ip' => $request->ip(),
            'user_id' => auth()->id() ?? 'guest'
        ]);

        try {
            $response = $next($request);
            
            // تسجيل نهاية الطلب الناجح
            $this->logger->info('Request completed', [
                'status' => $response->status()
            ]);

            return $response;
        } catch (\Exception $e) {
            // تسجيل الأخطاء
            $this->logger->error('Request failed', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);

            throw $e;
        }
    }
} 