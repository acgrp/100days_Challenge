const express = require('express');
const bcrypt = require('bcryptjs');//비밀번호를 단방향 암호화(hash) 하는 라이브러리입니다.

const db = require('../data/database');

const router = express.Router();//이게 정확히 뭐할때 쓰는거지?

router.get('/signup', function (req, res) {
  let sessionInputData = req.session.inputData;//새로운 계정 정보를 여기에 저장

  if (!sessionInputData) {//그 정보가 없으면 공간 생성
    sessionInputData = {
      hasError: false,
      email: '',
      confirmEmail: '',
      password: '',
    };
  }

  req.session.inputData = null;//적었던 칸은 지우고

  res.render('signup', {//signup 신호와 정보랑 토큰 반환
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
});

router.get('/login', function (req, res) {//login 신호가 오면
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      password: '',
    };
  }

  req.session.inputData = null;
  res.render('login', { //login 신호와 정보, 토큰 반환
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
});

router.post('/signup', async function (req, res) {//signup 하고나서 email, password 저장
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  if ( // 각종 조건들을 충족하는지 검사
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim().length < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes('@')
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {//save가 오면 signup 반환
      res.redirect('/signup');
    });
    return;
  }

  const existingUser = await db//음 이 과정이랑 이 아래 코드는 뭐지?
    .getDb()
    .collection('users')
    .findOne({ email: enteredEmail });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'User exists already!',
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect('/signup');
    });
    return;
  }//여기까지 뭐지?

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);//비밀번호를 저장할때 hash로 변환

  const user = {//변환한걸 유저에게 저장
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection('users').insertOne(user);//뭔지 모르겠네?

  res.redirect('/login');//login 호출
});

router.post('/login', async function (req, res) {//login이 호출되면 작동하는건 알겠는데 뜻을 정확히 다 모르겟네?
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db//내가 로그인하려고 친 정보?
    .getDb()
    .collection('users')
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log you in - please check your credentials!',
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect('/login');
    });
    return;
  }

  const passwordsAreEqual = await bcrypt.compare(//bcrypt.compara(입력한비번, DB비번)으로 검증
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log you in - please check your credentials!',
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect('/login');
    });
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect('/admin');
  });
});

router.post('/logout', function (req, res) {//logout시 세션 다 달려버리고 초기화면
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

module.exports = router;
