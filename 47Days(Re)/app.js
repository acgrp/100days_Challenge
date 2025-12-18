const fs = require('fs');//package.json에서 가져온 fs라는 패키지(파일 시스템)
const path = require('path');

// const http = require('http'); // Node에 내장 HTTP모듈을 불러와 http라는 이름으로 사용한다는 뜻
const express = require('express');// package.json에서 가져온 express라는 패키지

const app = express();

app.use(express.urlencoded({extended: false}));//원시 문자열과 파싱을 해주는 코드(원시 코드를 더 쓰기좋게 바꿔줌), extended: false는 문자열로 파싱(노드js기본 모듈) true는 객체로 파싱

app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
}); //localhost:3000/currenttime

app.get('/', function(req, res){
    res.send('<form action="/store-user" method="POST"><label>Your Name:</label><input type="text" name="username"><button>Submit</button></form>');// 상태코드가 없으면 자동으로 200으로 설정
})// action="/store-user" - 버튼 눌럿을때 데이터를 보낼 URL, method="POST" - HTTP POST방식으로 요청을 보낼 것이라는 의미, name="username"은 입력한 값이 서버에서 req.body.username으로 받을수 있게 함

app.post('/store-user', function(req, res){
    const userName = req.body.username;
    
    const filePath = path.join(__dirname, 'data', 'users.json');//data파일의 users.json파일을 가르킴, path.join이 상수를 저장

    const fileData = fs.readFileSync(filePath);//fs는 파일을 읽어서 반환하는 역할, Sync는 동기방식이라는 뜻(다 읽을때까지 대기), filePath를 읽어서 buffer타입으로 반환해 저장, 
    const existingUsers = JSON.parse(fileData);//JSON객체의 parse매서드 사용, 제이슨형태의 객체가 포한된 일부 텍스트를 원시 자바스크립트 객체 또는 배열로 변환할때 사용, fileData는 파일에서 읽은 텍스트 데이터

    existingUsers.push(userName);//배열 끝에 추가하는 매서드
    
    fs.writeFileSync(filePath, JSON.stringify(existingUsers));//existingUsers 배열을 JSON 문자열로 변환(JSON.stringify(existingUsers)), 그 문자열을 filePath 위치의 파일에 덮어쓰기(fs.writeFileSync) 기존 파일 내용은 사라지고, 새 JSON 데이터로 바뀜

    res.send('<h1>Username stored!</h1>');

});

app.get('/users', function(req, res){ // users 주소로 접근시
    const filePath = path.join(__dirname, 'data', 'users.json');//위 처럼 똑같이 배열로 모아두기

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    let html = '<h1>User List</h1><ul>'; //html을 새로 추가
    for(const user of existingUsers) { // 아까의 배열을 반복문에 넣어 이름별 li로 끊어서 표기
        html += '<li>' + user + '</li>';
    }
    html += '</ul>';//닫기
    res.send(html);//existingUsers기존 배열이 아닌 만든 html 배열을 반환
});


app.listen(3000);



// <node JS코드>
// function handleRequest(request, response){ // node가 이 함수를 호출하면서 요청 응답을 전달
//     if (request.url === '/currenttime') {// url은 localhost:3000이며 그 이후 /currenttime이 있을경우 이 방식사용
//         response.statusCode = 200;// 응답 http 상태코드를 200으로 설정(요청 성공)
//         response.end('<h1>' + new Date().toISOString() + '</h1>');// response.end로 해당 요청 처리를 마침, new Date()는 자바스크립트에서 현재 날짜와 시간을 담아 Date객체를 만듬, .toISOString()은 이 Date객체를 사람이 사용하기 좋은 문자열로 바꿈
//     } else if (request.url === '/') {//localhost:3000뒤에 아무것도 없는 상황을 가정
//         response.statusCode = 200; // 응답코드 200
//         response.end('<h1>Hello World!</h1>');// hello world으로 응답하고 종료
//     }
// }

// const server = http.createServer(handleRequest);// http서버 객체를 만들고 요청이 올때마다 handleRequeset를 호출

// server.listen(3000);//서버를 포트 3000에서 실행, 이제 접속하면 반응
