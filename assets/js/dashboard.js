class DashboardManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.initTheme();
        this.initLanguage();
        this.initSidebar();
        this.initSearch();
        this.initUserMenu();
    }

    initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        themeToggle?.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
            this.updateThemeUI();
        });
    }

    initLanguage() {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        this.updateTexts();
    }

    initSidebar() {
        // تفعيل القائمة الحالية
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    initSearch() {
        // اختصار لوحة المفاتيح للبحث
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.querySelector('.search-box input').focus();
            }
        });
    }

    initUserMenu() {
        const userButton = document.querySelector('.user-button');
        const userMenu = document.createElement('div');
        userMenu.className = 'user-dropdown';
        userMenu.hidden = true;

        userMenu.innerHTML = `
            <a href="/dashboard/profile" class="dropdown-item">
                <i class="fas fa-user"></i>
                <span data-i18n="profile">الملف الشخصي</span>
            </a>
            <a href="/logout" class="dropdown-item">
                <i class="fas fa-sign-out-alt"></i>
                <span data-i18n="logout">تسجيل الخروج</span>
            </a>
        `;

        userButton?.after(userMenu);

        userButton?.addEventListener('click', () => {
            const isExpanded = userButton.getAttribute('aria-expanded') === 'true';
            userButton.setAttribute('aria-expanded', !isExpanded);
            userMenu.hidden = isExpanded;
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                userMenu.hidden = true;
                userButton?.setAttribute('aria-expanded', 'false');
            }
        });
    }

    updateThemeUI() {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        const isDark = this.currentTheme === 'dark';

        sunIcon?.classList.toggle('hidden', !isDark);
        moonIcon?.classList.toggle('hidden', isDark);
        
        // تحديث الشعار
        const logoLight = document.querySelector('.logo-light');
        const logoDark = document.querySelector('.logo-dark');
        
        logoLight?.classList.toggle('hidden', isDark);
        logoDark?.classList.toggle('hidden', !isDark);
    }

    updateTexts() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (dashboardTranslations[this.currentLang][key]) {
                element.textContent = dashboardTranslations[this.currentLang][key];
            }
        });
    }
}

// تهيئة مدير لوحة التحكم
new DashboardManager(); 