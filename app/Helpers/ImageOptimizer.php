<?php
namespace App\Helpers;

class ImageOptimizer {
    public static function optimize($imagePath, $options = []) {
        $defaults = [
            'quality' => 85,
            'width' => null,
            'height' => null,
            'format' => 'webp'
        ];
        
        $options = array_merge($defaults, $options);
        
        // إنشاء نسخ مختلفة للصورة
        return [
            'original' => $imagePath,
            'webp' => self::convertToWebP($imagePath, $options['quality']),
            'thumbnail' => self::createThumbnail($imagePath, 150, 150)
        ];
    }
} 