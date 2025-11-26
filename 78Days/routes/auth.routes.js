const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/signup', authController.getSignup);

router.post('/signup', authController.signup);//post는 서버에 등록(데이터가 서버에 저장될때, 글쓰기 수정 삭제등.. 변경의 용도), get은 서버에서 가져올때(URL만으로 확인되는 데이터 가져올때, 조회 용도)

router.get('/login', authController.getLogin);

module.exports = router;