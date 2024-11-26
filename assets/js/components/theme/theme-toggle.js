class ThemeToggle {
    constructor() {
        // العناصر الأساسية
        this.toggle = document.querySelector('.theme-toggle');
        this.sunIcon = document.querySelector('.sun-icon');
        this.moonIcon = document.querySelector('.moon-icon');
        
        // الإعدادات الافتراضية
        this.settings = {
            storageKey: 'selectedTheme',
            defaultTheme: 'light',
            animationDuration: 400,
            themes: {
                light: {
                    icon: 'sun',
                    label: 'تفعيل الوضع الداكن'
                },
                dark: {
                    icon: 'moon',
                    label: 'تفعيل الوضع الفاتح'
                }
            }
        };
        
        this.init();
    }

    init() {
        // التحقق من تفضيلات النظام
        this.checkSystemPreference();
        
        // تحميل الوضع المحفوظ
        this.loadSavedTheme();
        
        // إضافة مستمعي الأحداث
        this.addEventListeners();
    }

    checkSystemPreference() {
        // التحقق من تفضيل الوضع الداكن في النظام
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // الاستماع لتغييرات تفضيلات النظام
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem(this.settings.storageKey)) {
                this.setTheme(e.matches ? 'dark' : 'light', false);
            }
        });
        
        // تعيين الوضع الافتراضي بناءً على تفضيلات النظام
        if (!localStorage.getItem(this.settings.storageKey)) {
            this.setTheme(prefersDark.matches ? 'dark' : 'light', false);
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.settings.storageKey);
        if (savedTheme) {
            this.setTheme(savedTheme, false);
        }
    }

    addEventListeners() {
        // مستمع النقر
        this.toggle?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // مستمع لوحة المفاتيح
        this.toggle?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    setTheme(theme, animate = true) {
        if (!this.settings.themes[theme]) return;
        
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme');
        
        // تحديث السمة
        root.setAttribute('data-theme', theme);
        
        // تحديث زر التبديل
        if (this.toggle) {
            const { label } = this.settings.themes[theme];
            this.toggle.setAttribute('aria-label', label);
            this.toggle.setAttribute('title', label);
        }
        
        // إضافة تأثيرات حركية
        if (animate) {
            this.animateThemeChange(currentTheme, theme);
        }
        
        // حفظ الاختيار
        localStorage.setItem(this.settings.storageKey, theme);
        
        // إطلاق حدث تغيير الوضع
        this.dispatchThemeChangeEvent(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    animateThemeChange(oldTheme, newTheme) {
        // تأثير دوران الأيقونات
        if (this.sunIcon && this.moonIcon) {
            const duration = this.settings.animationDuration;
            
            if (newTheme === 'dark') {
                this.sunIcon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    this.moonIcon.style.transform = 'rotate(0)';
                }, duration / 2);
            } else {
                this.moonIcon.style.transform = 'rotate(-90deg)';
                setTimeout(() => {
                    this.sunIcon.style.transform = 'rotate(0)';
                }, duration / 2);
            }
        }
    }

    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChange', {
            detail: { theme }
        });
        document.dispatchEvent(event);
    }
}

// تصدير الفئة
export default ThemeToggle;

// إنشاء نسخة عند تحميل المستند
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});
