const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // sql에 있는 주소
    database: 'blog', //sql에 있는 테이블
    user: 'root', // sql에 있는 이름
    password: 'test1234' //sql 파일 비밀번호
});

module.exports = pool;