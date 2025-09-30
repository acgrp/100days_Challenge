const path = require("path"); //노드js 에서 제공하는 내장모듈로, 파일경로나 디렉토리 경로를 다룰때 쓰는 도구

const express = require("express");
const uuid = require('uuid');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public")); //public 폴더를 사용한다는 코드(html에 css에 대한 링크가 걸려있으므로 연결됨)
app.use(express.urlencoded({ extended: false })); //파싱 코드 입력된 값을 저장하기 위해 필요

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

app.use(function(req, res) {
  res.status(404).render('404');
});

app.use(function(error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);
