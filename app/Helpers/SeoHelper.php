<?php
namespace App\Helpers;

class SeoHelper {
    public static function generateSlug($title) {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
    }

    public static function generateBreadcrumbs($path) {
        $segments = explode('/', trim($path, '/'));
        $breadcrumbs = [];
        $currentPath = '';
        
        foreach ($segments as $segment) {
            $currentPath .= '/' . $segment;
            $breadcrumbs[] = [
                'title' => ucfirst($segment),
                'path' => $currentPath
            ];
        }
        
        return $breadcrumbs;
    }
} 