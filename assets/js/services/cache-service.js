class CacheService {
    constructor() {
        this.storage = window.localStorage;
    }

    get(key) {
        try {
            const item = this.storage.getItem(key);
            if (!item) return null;

            const { value, expiry } = JSON.parse(item);
            if (expiry && Date.now() > expiry) {
                this.delete(key);
                return null;
            }
            return value;
        } catch {
            return null;
        }
    }

    set(key, value, ttl = 3600) {
        const item = {
            value,
            expiry: ttl ? Date.now() + (ttl * 1000) : null
        };
        this.storage.setItem(key, JSON.stringify(item));
    }

    delete(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
}

// استخدام التخزين المؤقت في الواجهة
const cache = new CacheService();

async function fetchAnalytics(userId) {
    const cacheKey = `analytics_${userId}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
        return cachedData;
    }

    const response = await fetch(`/api/analytics/${userId}`);
    const data = await response.json();
    
    cache.set(cacheKey, data, 300); // تخزين لمدة 5 دقائق
    return data;
} 