const express = require('express');

const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/products', adminController.getProducts);// app.js에서 admin 자동추가

router.get('/products/new', adminController.getNewProduct);

module.exports = router;