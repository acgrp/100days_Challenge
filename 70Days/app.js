const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const MongoDbStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDbStore({
  uri: 'mongodb://localhost:27017',
  databaseName:'auth-demo',
  collection: 'sessions'
});
app.set('view engine', 'ejs'); //HTML에서 JS코드를 사용하기 위한 코드(<%= 변수 %> 등등 )
app.set('views', path.join(__dirname, 'views')); //ejs파일이 저장된 폴더가 어디있는지 알려주는 설정< res.render('login') -> views/login.ejs >

app.use(express.static('public'));//public폴더 안의 파일을 웹에 그대로 보여줌
app.use(express.urlencoded({ extended: false }));//req.body를 읽을 수 있게 해주는 미들웨어

app.use(session({
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

app.use(demoRoutes);//이 코드덕에 demo.js에서 /login /signup /admin 사용 가능
app.use(function(error, req, res, next) {//express에서 자동으로 구분, 코드 중간에 에러가 발생하면 express가 이 미들웨어를 찾아서 실행함
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
