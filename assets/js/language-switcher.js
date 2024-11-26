import { FLAGS } from './utils/icons.js';
import { translations } from './i18n/translations.js';

class LanguageManager {
    constructor(options = {}) {
        this.options = {
            defaultLang: 'ar',
            supportedLangs: ['ar', 'en'],
            storageKey: 'preferred_language',
            ...options
        };

        this.translations = translations;
        this.currentLang = this.getInitialLanguage();
        this.elements = {};
        
        this.init();
    }

    getInitialLanguage() {
        // التحقق من اللغة المخزنة
        const savedLang = localStorage.getItem(this.options.storageKey);
        if (savedLang && this.options.supportedLangs.includes(savedLang)) {
            return savedLang;
        }

        // التحقق من لغة المتصفح
        const browserLang = navigator.language.split('-')[0];
        if (this.options.supportedLangs.includes(browserLang)) {
            return browserLang;
        }

        return this.options.defaultLang;
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupKeyboardNavigation();
        this.updateUI();
        this.applyLanguageDirection();
    }

    cacheElements() {
        this.elements = {
            toggle: document.querySelector('[data-lang-toggle]'),
            menu: document.querySelector('[data-lang-menu]'),
            options: document.querySelectorAll('[data-lang-option]'),
            currentFlag: document.querySelector('[data-current-flag]'),
            currentLang: document.querySelector('[data-current-lang]')
        };
    }

    bindEvents() {
        // تبديل القائمة
        this.elements.toggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // خيارات اللغة
        this.elements.options?.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.dataset.langOption;
                this.switchLanguage(lang);
                this.closeMenu();
            });
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', () => this.closeMenu());

        // مراقبة تغييرات التخزين
        window.addEventListener('storage', (e) => {
            if (e.key === this.options.storageKey) {
                this.handleStorageChange(e.newValue);
            }
        });
    }

    setupKeyboardNavigation() {
        this.elements.menu?.addEventListener('keydown', (e) => {
            const options = Array.from(this.elements.options);
            const currentIndex = options.indexOf(document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % options.length;
                    options[nextIndex]?.focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
                    options[prevIndex]?.focus();
                    break;
                case 'Escape':
                    this.closeMenu();
                    this.elements.toggle?.focus();
                    break;
            }
        });
    }

    toggleMenu() {
        const isExpanded = this.elements.toggle?.getAttribute('aria-expanded') === 'true';
        this.elements.toggle?.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            this.elements.menu?.classList.add('open');
            this.elements.menu?.querySelector('[data-lang-option]')?.focus();
        } else {
            this.closeMenu();
        }
    }

    closeMenu() {
        this.elements.toggle?.setAttribute('aria-expanded', 'false');
        this.elements.menu?.classList.remove('open');
    }

    async switchLanguage(lang) {
        if (!this.options.supportedLangs.includes(lang)) return;

        try {
            // تحميل ملفات الترجمة عند الطلب
            if (!this.translations[lang]) {
                this.translations[lang] = await this.loadTranslations(lang);
            }

            this.currentLang = lang;
            localStorage.setItem(this.options.storageKey, lang);
            
            this.updateUI();
            this.applyLanguageDirection();
            this.dispatchLanguageEvent();
            
        } catch (error) {
            console.error('فشل في تحميل الترجمات:', error);
        }
    }

    async loadTranslations(lang) {
        const response = await fetch(`/assets/i18n/${lang}.json`);
        if (!response.ok) throw new Error(`فشل في تحميل ترجمات ${lang}`);
        return response.json();
    }

    updateUI() {
        // تحديث الأيقونة والنص
        if (this.elements.currentFlag) {
            this.elements.currentFlag.src = FLAGS[this.currentLang];
            this.elements.currentFlag.alt = this.translations[this.currentLang].languageName;
        }

        if (this.elements.currentLang) {
            this.elements.currentLang.textContent = this.translations[this.currentLang].languageName;
        }

        // تحديث جميع النصوص
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    applyLanguageDirection() {
        const dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = dir;
        document.body.classList.toggle('rtl', dir === 'rtl');
    }

    getTranslation(key) {
        return key.split('.').reduce((obj, k) => obj?.[k], this.translations[this.currentLang]);
    }

    dispatchLanguageEvent() {
        const event = new CustomEvent('languageChanged', {
            detail: {
                language: this.currentLang,
                direction: document.documentElement.dir
            }
        });
        document.dispatchEvent(event);
    }

    handleStorageChange(newLang) {
        if (newLang && newLang !== this.currentLang) {
            this.switchLanguage(newLang);
        }
    }
}

export default LanguageManager; 