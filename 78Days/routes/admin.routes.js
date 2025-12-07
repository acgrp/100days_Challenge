const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/products', adminController.getProducts);// app.js에서 admin 자동추가

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdataProduct);

router.post('/products/:id', imageUploadMiddleware, adminController.updataProduct); 

router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
