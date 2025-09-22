const path = require('path');//path는 노드js에 내장된것

const express = require('express');

const app = express();

app.get('/', function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlFilePath);
});

app.get('/restaurants',function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilePath); //sendFile : 응답으로 파일을 내보냄
});

app.get('/recommend',function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlFilePath); //sendFile : 응답으로 파일을 내보냄
});

app.get('/confirm',function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(htmlFilePath); //sendFile : 응답으로 파일을 내보냄
});

app.get('/about',function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlFilePath); //sendFile : 응답으로 파일을 내보냄
});

app.listen(3000); //특정 포트에서 들어오는 네트워크 트래픽에 대해 들어오는 요청의 수신을 시작

