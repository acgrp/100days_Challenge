const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `SELECT posts.*, authors.name AS author_name FROM posts INNER JOIN authors ON posts.author_id = authors.id`;
  const [posts] = await db.query(query); //SQL을 실행하고 그 결과를 post에 배열로 돌려줌
  res.render("posts-list", { posts: posts }); //posts-list파일에 posts에 배열 posts가 접근할수 있도록 전달
});

router.get("/new-post", async function (req, res) {
  //authors에 sql authors정보를 배열로 넣음
  const [authors] = await db.query("SELECT * FROM authors"); //비동기 작업을 처리하기 위해 then이나 catch도 사용가능 (promise패키지 사용)
  //쿼리에서 가져오는 정보는 배열이다
  res.render("create-post", { authors: authors }); // 배열 정보를 create-post 파일에서 label선택지로 보여줌
});

router.post("/posts", async function (req, res) {
  const data = [
    //웹에서 입력한 정보 받을 그릇 만들기
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [data]
  ); //sql에 어느부분에 정보를 보낼지 지정
  res.redirect("/posts"); //보내기
});

router.get("/posts/:id", async function (req, res) {
  //URL의 /posts/뒤에 오는 값을 변수처럼 취급(req.params.id = 5가 됨)
  const query = `
        SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts 
        INNER JOIN authors ON posts.author_id = authors.id
        WHERE posts.id = ?
    `;

  const [posts] = await db.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404"); // 404상태를 알리고 404파일을 랜더링함, return문이 없으면 47번 줄도 실행
  }

  const postData = {
    ...posts[0], //스프레드 연산자 객체를 한번에 복사하는 것, ...은 이 객체안의 모든 속성을 복사해서 여기 넣어라 뜻
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString("en-US", {//date: posts[0].date.toISOString(),를 사람이 보기 좋게 바꾼버전
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  

  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async function (req, res) {
  const query = `
    SELECT * FROM posts WHERE id = ?
    `;
  const [posts] = await db.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:id/edit", async function (req, res) {
  const query = `
        UPDATE posts SET title = ?, summary = ?, body = ?
        WHERE id = ?
    `;

  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);

  res.redirect('/posts');
});

router.post('/posts/:id/delete', async function(req, res){
    await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.redirect('/posts');
});

module.exports = router;
