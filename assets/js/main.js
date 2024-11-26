import { ThemeManager } from './components/theme/theme-toggle.js';
import { LanguageManager } from './components/language/language-switcher.js';

class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.languageManager = new LanguageManager();
        this.init();
    }

    init() {
        // تهيئة المكونات الأساسية
        this.initializeComponents();
        // إعداد Service Workers للعمل Offline
        this.setupServiceWorker();
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

export default App;
