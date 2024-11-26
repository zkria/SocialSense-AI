<?php
namespace App\Services;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Formatter\LineFormatter;

class LoggerService {
    private $logger;
    private static $instance;

    private function __construct() {
        $this->logger = new Logger('SocialSense');
        $this->setupHandlers();
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function setupHandlers() {
        // تنسيق السجلات
        $dateFormat = "Y-m-d H:i:s";
        $output = "[%datetime%] %level_name%: %message% %context% %extra%\n";
        $formatter = new LineFormatter($output, $dateFormat);

        // سجل الأخطاء العامة
        $generalHandler = new RotatingFileHandler(
            storage_path('logs/general.log'),
            30, // الاحتفاظ بالسجلات لمدة 30 يوم
            Logger::INFO
        );
        $generalHandler->setFormatter($formatter);

        // سجل الأخطاء الحرجة
        $errorHandler = new StreamHandler(
            storage_path('logs/errors.log'),
            Logger::ERROR
        );
        $errorHandler->setFormatter($formatter);

        $this->logger->pushHandler($generalHandler);
        $this->logger->pushHandler($errorHandler);
    }

    public function info($message, array $context = []) {
        $this->logger->info($message, $context);
    }

    public function error($message, array $context = []) {
        $this->logger->error($message, $context);
    }

    public function warning($message, array $context = []) {
        $this->logger->warning($message, $context);
    }

    public function critical($message, array $context = []) {
        $this->logger->critical($message, $context);
    }
} 