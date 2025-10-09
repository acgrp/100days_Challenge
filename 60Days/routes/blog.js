const express = require('express');

const db = require('../data/database');

const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
    const query = `SELECT posts.*, authors.name AS author_name FROM posts INNER JOIN authors ON posts.author_id = authors.id`;
    const [posts] = await db.query(query);//SQL을 실행하고 그 결과를 post에 배열로 돌려줌
    res.render('posts-list', {posts: posts });//posts-list파일에 posts에 배열 posts가 접근할수 있도록 전달
});

router.get('/new-post', async function(req, res) {//authors에 sql authors정보를 배열로 넣음
    const [authors] = await db.query('SELECT * FROM authors');//비동기 작업을 처리하기 위해 then이나 catch도 사용가능 (promise패키지 사용)
    //쿼리에서 가져오는 정보는 배열이다
    res.render('create-post', {authors: authors});// 배열 정보를 create-post 파일에서 label선택지로 보여줌
});

router.post('/posts', async function(req, res) {
    const data = [//웹에서 입력한 정보 받을 그릇 만들기
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author
    ];
    await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?)', [data,]);//sql에 어느부분에 정보를 보낼지 지정
    res.redirect('/posts'); //보내기
});

module.exports = router;