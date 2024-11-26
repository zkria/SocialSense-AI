class ThemeManager {
    constructor() {
        this.themes = {
            light: {
                icon: 'fa-moon',
                label: {
                    ar: 'الوضع الداكن',
                    en: 'Dark Mode'
                }
            },
            dark: {
                icon: 'fa-sun',
                label: {
                    ar: 'الوضع الفاتح',
                    en: 'Light Mode'
                }
            }
        };

        this.currentTheme = this.getInitialTheme();
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.init();
    }

    getInitialTheme() {
        // التحقق من الثيم المخزن محلياً
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        // التحقق من تفضيلات النظام
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    init() {
        this.bindEvents();
        this.updateUI();
        this.observeSystemTheme();
    }

    bindEvents() {
        // مراقبة زر تبديل الثيم
        const themeToggles = document.querySelectorAll('[data-theme-toggle]');
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.toggleTheme());
            
            // إضافة aria-label
            this.updateToggleLabel(toggle);
        });

        // مراقبة تغيير اللغة
        document.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.language;
            this.updateAllLabels();
        });
    }

    observeSystemTheme() {
        // مراقبة تغيير ثيم النظام
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.updateUI();
            }
        });
    }

    toggleTheme() {
        // تبديل الثيم مع تأثير انتقالي
        document.documentElement.classList.add('theme-transition');
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem('theme', this.currentTheme);
        this.updateUI();

        // إزالة صف الانتقال
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    }

    updateUI() {
        // تحديث سمة الثيم
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // تحديث جميع الأيقونات
        this.updateThemeIcons();
        
        // تحديث الشعارات
        this.updateLogos();
        
        // تحديث النصوص
        this.updateAllLabels();
        
        // إطلاق حدث تغيير الثيم
        this.dispatchThemeEvent();
    }

    updateThemeIcons() {
        const icons = document.querySelectorAll('[data-theme-icon]');
        icons.forEach(icon => {
            const newIcon = this.themes[this.currentTheme].icon;
            icon.className = `fas ${newIcon}`;
        });
    }

    updateLogos() {
        const logos = document.querySelectorAll('[data-logo]');
        logos.forEach(logo => {
            if (logo.tagName === 'IMG') {
                const newSrc = `/assets/images/logo-${this.currentTheme}.svg`;
                this.preloadImage(newSrc).then(() => {
                    logo.src = newSrc;
                });
            }
        });
    }

    updateToggleLabel(toggle) {
        const label = this.themes[this.currentTheme].label[this.currentLang];
        toggle.setAttribute('aria-label', label);
        toggle.title = label;
    }

    updateAllLabels() {
        const toggles = document.querySelectorAll('[data-theme-toggle]');
        toggles.forEach(toggle => this.updateToggleLabel(toggle));
    }

    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = reject;
            img.src = src;
        });
    }

    dispatchThemeEvent() {
        const event = new CustomEvent('themeChanged', {
            detail: {
                theme: this.currentTheme
            }
        });
        document.dispatchEvent(event);
    }
}

// إضافة CSS للانتقالات
const style = document.createElement('style');
style.textContent = `
    .theme-transition,
    .theme-transition * {
        transition: background-color 0.3s ease,
                    color 0.3s ease,
                    border-color 0.3s ease,
                    box-shadow 0.3s ease !important;
    }

    @media (prefers-reduced-motion: reduce) {
        .theme-transition,
        .theme-transition * {
            transition: none !important;
        }
    }
`;
document.head.appendChild(style);

// تهيئة مدير الثيم
const themeManager = new ThemeManager();

// تصدير للاستخدام في الوحدات الأخرى
export default themeManager; 