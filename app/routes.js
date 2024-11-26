const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');

// مسارات المصادقة
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/register', authController.registerPage);
router.post('/register', authController.register);

module.exports = router; 