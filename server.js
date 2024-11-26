const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// تعيين المجلد العام
app.use(express.static('public'));

// مسار الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// مسار تسجيل الدخول
app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/auth', 'login.html'));
});

// مسار التسجيل
app.get('/auth/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/auth', 'register.html'));
});

app.listen(port, () => {
    console.log(`الخادم يعمل على المنفذ ${port}`);
}); 