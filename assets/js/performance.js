// Intersection Observer للتحميل المتأخر
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
};

// تحسين First Contentful Paint
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    prefetchCriticalPages();
}); 