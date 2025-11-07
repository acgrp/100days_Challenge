const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const sessionConfig = require('./config/session')
const db = require('./data/database');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const authMiddleware = require('./middlewares/auth-middleware');

const mongoDbSessionStore = sessionConfig.createSessionStore(session);

const app = express();

app.set('view engine', 'ejs');//HTML 안에 js코드를 넣을 수 있는 템플릿 엔진(<%  %> 이런거 사용가능)
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));//public이란 폴더에서 가져온다는 뜻이고
app.use(express.urlencoded({ extended: false }));//form으로 전송된 POST데이터를 해석해주는 미들웨어

app.use(session(sessionConfig.createSessionConfig(mongoDbSessionStore)));
app.use(csrf());//csrf공격을 방지하기 위한 미들웨어(모든 POST요청에 숨겨진 토큰을 요구)()

app.use(authMiddleware);//그냥 실행x, 요청되어야 실행

app.use(blogRoutes);//blog파일을 쓴다는 뜻
app.use(authRoutes);//auth파일을 쓴다는 뜻

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {//database파일에 connectToDatabase()가 완료되면 3000에서 실행
  app.listen(3000);
});
