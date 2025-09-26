const fs = require('fs');  //Node에서 제공하는 파일 조작도구를 가져옴, fradFileSync/writeFileSync 를 사용할때 필요
const path = require('path');  //파일 경로를 운영체제에 맞게 만들어주는 경로 도구를 가져옴, path.join으로 data/users.join같은 경로 제작시 필요

const express = require('express');  //웹서버를 쉽게 만드는 express라는 것을 가져오기

const app = express(); // express로 만든 서버 객체를 app에 담음

app.use(express.urlencoded({extended: false})); // 브라우저 폼이 보낸 데이터를 requst.body로 읽을 수 있게 해주는 것

app.get('/currenttime', function(request, response) { // 사용자가 localhost/currenttime에 접속시 실행될 처리함수 등록
    response.send('<h1>' + new Date().toISOString() + '</h1>'); // 현재시간을 new Date().toString()로 문자열 만들고, <h1>으로 감싸서 브라우저에 출력
}); 

app.get('/', function(request, response){ // localhost에 접속 했을때 실행될 처리 함수 등록
    response.send('<form action="store-user" method="POST"><label>Your Name: </label><input type="text" name="username"><button>Submit</button></form>'); // 해당 폼을 브라우저에 내보냄, 입력된 값은 서버에 전송
}); 

app.post('/store-user', function(request, response){ // 사용자가 localhost/store-user로 보내졌을때 실행되는 함수(이름을 입력하면 실행)
    const userName = request.body.username; // 변수에 값 넣기

    const filePath = path.join(__dirname, 'data', 'users.json'); // filePath에 있는 파일을 블로킹방식으로? 읽어온다

    const fileData = fs.readFileSync(filePath); // fileData에 있는 파일을 블로킹방식으로? 읽어온다
    const existingUsers = JSON.parse(fileData); // 파일에 적힌 JSON 문자열을 자바스크립트 배열로 바꿈

    existingUsers.push(userName); // 읽어온 사용자 리스트를 배열에 추가

    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // 수정된 배열을 JSON 문자열로 바꿔서 파일에 저장
    console.log(userName); // 서버콘솔에 저장한 사용자 이름을 출력 (터미널에 이름 출력)
    response.send('<h1>Username stored!</h1>'); // 브라우저에 저장완료라고 응답
});

app.get('/users', function(request,response){ //사용자가 /users주소로 접속하면 아래 코드 실행
    const filePath = path.join(__dirname, 'data', 'users.json'); // __dirname : 현재 폴더 기준으로 파일 경로를 안전하게 만듬, users.json경로의 파일에서 사용자 목록을 읽어옴

    const fileData = fs.readFileSync(filePath); // fs.readFileSync() : 파일을 동기 방식으로 읽어옴, fileData에 저장
    const existingUsers = JSON.parse(fileData); // JSON.parse() : 파일에 저장된 JSON 문자열을 실제 자바스크립트배열로 변환, 배열로 만들어 둔다는 뜻

    let responseData = '<ul>'; // <ul>을 시작해둠 이후 li추가 예정

    for (const user of existingUsers) { // 반목문 시작
        responseData += '<li>' + user + '</li>'// <ul>에 li을 씌워 user를 계속 추가
    }

    responseData += '</ul>'; // 반복 후에는 </ul>로 닫기

    response.send(existingUsers); // 반복해둔 값을 출력
});

app.listen(3000); // 3000번 포트에서 실행