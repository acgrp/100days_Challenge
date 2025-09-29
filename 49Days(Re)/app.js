const fs = require("fs"); //파일 읽기, 불러오기에 필요

const path = require("path"); //노드js 에서 제공하는 내장모듈로, 파일경로나 디렉토리 경로를 다룰때 쓰는 도구

const express = require("express");
const uuid = require('uuid');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public")); //public 폴더를 사용한다는 코드(html에 css에 대한 링크가 걸려있으므로 연결됨)
app.use(express.urlencoded({ extended: false })); //파싱 코드 입력된 값을 저장하기 위해 필요

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get('/restaurants/:id', function(req, res){
  const restaurantId = req.params.id;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants){
    if (restaurant.id === restaurantId){
      return res.render('restaurants-detail', { restaurant: restaurant });
    } 
  }

  res.status(404).render('404');
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body; //폼 데이터를 restaurant로 저장
  restaurant.id = uuid.v4();
  const restaurants = getStoredRestaurants();

  storedRestaurants.push(restaurant); // 새로운 데이터를 배열 끝에 추가

  storedRestaurants(restaurants);

  res.redirect("/confirm"); // 클라이언트를 /confirm페이지로 이동, 서버가 해당 페이지를 띄우도록 한다
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function(req, res) {
  res.status(404).render('404');
});

app.use(function(error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);
