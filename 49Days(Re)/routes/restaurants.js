const express = require('express');

const resData = require('../util/restaurant-data');  //다른 패키지와 달리 내가 만든것은 경로를 지정해야함(같은 파일은 - ./ ), 확장자인 .js같은 문구는 제거

const router = express.Router();

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';
  
  if(order !== 'asc' && order !== 'desc'){
    order = 'asc';
  }

  if(order === 'desc'){
    nextOrder = 'asc';
  }

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort(function(resA, resB) { // sort 메서드는 데이터를 자동으로 정렬함
    if (
        (order === 'asc' && resA.name > resB.name)||
        (order === 'desc' && resB.name > resA.name)){ //배열의 순서를 바꿀지 말지 정하는 것
        return 1;
    }
     return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder
  });
});

router.get('/restaurants/:id', function(req, res){
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants){
    if (restaurant.id === restaurantId){
      return res.render('restaurants-detail', { restaurant: restaurant });
    } 
  }

  res.status(404).render('404');
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body; //폼 데이터를 restaurant로 저장
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurant); // 새로운 데이터를 배열 끝에 추가

  resData.storedRestaurants(restaurants);

  res.redirect("/confirm"); // 클라이언트를 /confirm페이지로 이동, 서버가 해당 페이지를 띄우도록 한다
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;