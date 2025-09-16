const express = require('express'); //package에 express 필요

const app = express();

app.use(express.urlencoded({extende: false}));//get,post와 달리 요청종류 신경안씀, urlencoded : 바디 파서를 설정하는 메서드

app.get('/currenttime', function(request, response) {//request : 들어오는 요청에 대한 추가 정보 제공, response : 응답을 준비하는 기능 제공, next : 함수 내부에서 사용가능한 함수
    response.send('<h1>' + new Date().toISOString() + '</h1>');  //send : 데이터로 보낼 매개변수 값으로 전달 가능(end와 비슷)
}); //localhost:3000/currenttime

app.get('/', function(request, response){
    response.send('<form action="store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>');
}); //localhost:3000/

app.post('/store-user', function(request, response){//위에서 store-user로 지정, post인이유도 동일(get으로 변경 가능)
    const userName = request.body.username;
    console.log(userName);
    response.send('<h1>Username stored!</h1>');
});

app.listen(3000);

