import LanguageManager from './language-switcher.js';
import ThemeManager from './theme-toggle.js';

class App {
    constructor() {
        // تهيئة مديري اللغة والثيم
        this.managers = {
            language: new LanguageManager({
                defaultLang: 'ar',
                supportedLangs: ['ar', 'en'],
                storageKey: 'app_language'
            }),
            theme: new ThemeManager()
        };

        this.init();
    }

    init() {
        // إعداد مستمعي الأحداث
        this.setupEventListeners();
    }

    setupEventListeners() {
        // الاستماع لتغييرات اللغة
        document.addEventListener('languageChanged', (e) => {
            console.log('تم تغيير اللغة إلى:', e.detail.language);
            // تحديث اتجاه الصفحة
            document.dir = e.detail.direction;
            // تحديث العناصر الأخرى حسب الحاجة
        });

        // الاستماع لتغييرات الثيم
        document.addEventListener('themeChanged', (e) => {
            console.log('تم تغيير الثيم إلى:', e.detail.theme);
        });
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

export default App;
