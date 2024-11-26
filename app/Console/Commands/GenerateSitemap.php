<?php
namespace App\Console\Commands;

class GenerateSitemap {
    public function handle() {
        $sitemap = new XMLWriter();
        $sitemap->openMemory();
        $sitemap->startDocument('1.0', 'UTF-8');
        $sitemap->startElement('urlset');
        $sitemap->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        
        // إضافة الصفحات الديناميكية
        $pages = $this->getAllPages();
        foreach ($pages as $page) {
            $sitemap->startElement('url');
            $sitemap->writeElement('loc', $page['url']);
            $sitemap->writeElement('lastmod', $page['updated_at']);
            $sitemap->writeElement('changefreq', 'daily');
            $sitemap->writeElement('priority', '0.8');
            $sitemap->endElement();
        }
        
        $sitemap->endElement();
        return $sitemap->outputMemory();
    }
} 