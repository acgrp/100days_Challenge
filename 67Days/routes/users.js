const express = require('express');
const multer = require('multer');

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images');//null을 해야 multer에게 값이 전달된다..?, 
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storageConfig});//images 폴더로 사진 이동
const router = express.Router();

router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), function(req, res) { //input에서 파일에 들어갈 id가 image기 때문에 사용, single외에도 여러 종류 있음(배열 ...)
  const uploadImageFile = req.file;//file은 파일 경로와 같은 추가 파일정보를 제공하는 객체 (파일경로로 사진찾기)
  const userData = req.body;

  console.log(uploadImageFile);
  console.log(userData);

  res.redirect('/');
});

module.exports = router;

