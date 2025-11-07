const express = require('express');

const Post = require('../models/post');

const router = express.Router();//이게 정확히 뭐할때 쓰는거지?

router.get('/', function (req, res) {
  res.render('welcome', { csrfToken: req.csrfToken() });//홈페이지 렌더링 하면서 토큰 전달
});

router.get('/admin', async function (req, res){
  if(!req.session.isAuthenticated) {
    return res.status(401).render('401');
  }
  const posts = await Post.fetchAll();

  res.render('admin', {
    posts: posts,
    csrfToken: req.csrfToken(),
    inputData: { hasError: false, title: '', content: '' }
  });
});

router.post('/posts', async function (req, res) {//post시 입력값 체크하고 newpost를 posts에 넣는다...?
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === '' ||
    enteredContent.trim() === ''
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect('/admin');
    return; 
  }

  const post = new Post(enteredTitle, enteredContent);
  await post.save();

  res.redirect('/admin');
});

router.get('/posts/:id/edit', async function (req, res) {//edit요청시, 수정 페이지 열기
  const post = new Post(null, null, req.params.id);
  await post.fetch();

  if (!post.title || !post.content) {
    return res.render('404'); // 404.ejs is missing at this point - it will be added later!
  }

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: post.title,
      content: post.content,
    };
  }

  req.session.inputData = null;

  res.render('single-post', {
    post: post,
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
});

router.post('/posts/:id/edit', async function (req, res) {//edit 반환시... 위에랑 비슷한거같은데 모르겠다
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === '' ||
    enteredContent.trim() === ''
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect(`/posts/${req.params.id}/edit`);
    return; 
  }

  const post = new Post(enteredTitle, enteredContent, req.params.id);
  await post.save();

  res.redirect('/admin');
});

router.post('/posts/:id/delete', async function (req, res) {
  const post = new Post(null, null, req.params.id);
  await post.delete();
  res.redirect('/admin');
});

module.exports = router;
