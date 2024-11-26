class LanguageSwitcher {
    constructor() {
        // العناصر الأساسية
        this.switcher = document.querySelector('.lang-switcher');
        this.currentLang = document.querySelector('.current-lang');
        this.dropdown = document.querySelector('.lang-dropdown');
        this.options = document.querySelectorAll('.lang-option');
        
        // الإعدادات الافتراضية
        this.settings = {
            defaultLang: 'ar',
            storageKey: 'selectedLanguage',
            animationDuration: 200,
            languages: {
                ar: {
                    name: 'العربية',
                    dir: 'rtl',
                    flag: '🇸🇦'
                },
                en: {
                    name: 'English',
                    dir: 'ltr',
                    flag: '🇺🇸'
                }
            }
        };
        
        this.init();
    }

    init() {
        // تهيئة اللغة الحالية
        this.loadSavedLanguage();
        
        // إضافة مستمعي الأحداث
        this.addEventListeners();
        
        // تحديث واجهة المستخدم
        this.updateUI();
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem(this.settings.storageKey);
        if (savedLang && this.settings.languages[savedLang]) {
            this.setLanguage(savedLang, false);
        } else {
            this.setLanguage(this.settings.defaultLang, false);
        }
    }

    addEventListeners() {
        // مستمع النقر على زر اللغة
        this.switcher?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // مستمع النقر خارج القائمة
        document.addEventListener('click', () => {
            this.closeDropdown();
        });

        // مستمعي خيارات اللغة
        this.options?.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = e.currentTarget.dataset.lang;
                this.setLanguage(lang);
                this.closeDropdown();
            });
        });

        // مستمع مفاتيح لوحة المفاتيح
        this.switcher?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleDropdown();
            }
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });
    }

    setLanguage(lang, animate = true) {
        if (!this.settings.languages[lang]) return;
        
        const langData = this.settings.languages[lang];
        
        // تحديث اتجاه الصفحة
        document.documentElement.setAttribute('dir', langData.dir);
        document.documentElement.setAttribute('lang', lang);
        
        // تحديث النص
        if (this.currentLang) {
            this.currentLang.textContent = langData.name;
            
            // إضافة تأثير حركي
            if (animate) {
                this.animateLanguageChange();
            }
        }
        
        // حفظ الاختيار
        localStorage.setItem(this.settings.storageKey, lang);
        
        // إطلاق حدث تغيير اللغة
        this.dispatchLanguageChangeEvent(lang);
        
        // تحديث واجهة المستخدم
        this.updateUI();
    }

    toggleDropdown() {
        if (this.dropdown) {
            const isOpen = this.dropdown.classList.contains('show');
            if (isOpen) {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        }
    }

    openDropdown() {
        this.dropdown?.classList.add('show');
        this.switcher?.setAttribute('aria-expanded', 'true');
    }

    closeDropdown() {
        this.dropdown?.classList.remove('show');
        this.switcher?.setAttribute('aria-expanded', 'false');
    }

    animateLanguageChange() {
        if (!this.currentLang) return;
        
        this.currentLang.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.currentLang.style.transform = '';
        }, this.settings.animationDuration);
    }

    dispatchLanguageChangeEvent(lang) {
        const event = new CustomEvent('languageChange', {
            detail: { language: lang }
        });
        document.dispatchEvent(event);
    }

    updateUI() {
        // تحديث الفئات النشطة
        this.options?.forEach(option => {
            const isActive = option.dataset.lang === localStorage.getItem(this.settings.storageKey);
            option.classList.toggle('active', isActive);
            option.setAttribute('aria-selected', isActive);
        });
    }
}

// تصدير الفئة
export default LanguageSwitcher;

// إنشاء نسخة عند تحميل المستند
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
