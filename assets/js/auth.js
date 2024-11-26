class AuthForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.querySelector('.password-toggle');
        
        this.initializeForm();
    }

    initializeForm() {
        // التحقق من صحة النموذج
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // إظهار/إخفاء كلمة المرور
        this.passwordToggle.addEventListener('click', () => this.togglePassword());
        
        // التحقق المباشر من البريد الإلكتروني
        this.emailInput.addEventListener('blur', () => this.validateEmail());
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            try {
                const formData = new FormData(this.form);
                const response = await this.submitForm(formData);
                
                if (response.success) {
                    this.showSuccess('تم تسجيل الدخول بنجاح');
                    window.location.href = '/dashboard';
                }
            } catch (error) {
                this.showError('حدث خطأ أثناء تسجيل الدخول');
            }
        }
    }

    validateEmail() {
        const email = this.emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            this.showInputError(this.emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
        }
        
        this.clearInputError(this.emailInput);
        return true;
    }

    togglePassword() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        
        const icon = this.passwordToggle.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    }

    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-error';
        alert.textContent = message;
        
        this.form.insertBefore(alert, this.form.firstChild);
        setTimeout(() => alert.remove(), 5000);
    }

    showSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.textContent = message;
        
        this.form.insertBefore(alert, this.form.firstChild);
        setTimeout(() => alert.remove(), 5000);
    }
}

class AuthManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.initTheme();
        this.initLanguage();
        this.initForm();
    }

    initTheme() {
        const themeToggle = document.querySelector('[data-theme-toggle]');
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
            this.updateLogo();
        });
    }

    initLanguage() {
        const langToggle = document.querySelector('[data-lang-toggle]');
        const langMenu = document.querySelector('.lang-menu');
        
        langToggle.addEventListener('click', () => {
            const isExpanded = langToggle.getAttribute('aria-expanded') === 'true';
            langToggle.setAttribute('aria-expanded', !isExpanded);
            langMenu.hidden = isExpanded;
        });

        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchLanguage(btn.dataset.lang);
            });
        });

        this.updateTexts();
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        this.updateTexts();
    }

    updateTexts() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (translations[this.currentLang][key]) {
                element.textContent = translations[this.currentLang][key];
            }
        });
    }

    updateLogo() {
        const logo = document.querySelector('[data-logo]');
        logo.src = `/assets/images/logo-${this.currentTheme}.svg`;
    }

    initForm() {
        // تهيئة نموذج تسجيل الدخول
        const form = new AuthForm();
    }
}

// تهيئة المدير
new AuthManager(); 