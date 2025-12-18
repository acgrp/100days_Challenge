const express = require('express');

const authControllers = require('../controllers/auth-controller')

const router = express.Router();

router.get('/signup', authControllers.getsignup);

router.get('/login', authControllers.getlogin);

router.post('/signup', authControllers.checklogin);

router.post('/login', authControllers.findlogin);

router.post('/logout', authControllers.redir);

router.get('401', authControllers.get401);

module.exports = router;
