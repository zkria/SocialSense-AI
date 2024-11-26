<!-- تحميل CSS الأساسي بشكل مباشر -->
<link rel="stylesheet" href="/assets/css/critical.css">

<!-- تحميل CSS الإضافي بشكل متأخر -->
<link rel="preload" href="/assets/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- تحميل JavaScript بشكل متأخر -->
<script defer src="/assets/js/main.js"></script>
<script type="module" src="/assets/js/components/lazy-components.js"></script> 