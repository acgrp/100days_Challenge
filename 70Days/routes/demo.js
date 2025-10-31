const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredComfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    enteredEmail.includes("@")
  ) {
    console.log("Incorrect data");
    return res.redirect("/signup");
    
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail }); 

    if (existingUser) {
      console.log('User exists already');
      return res.redirect('/signup');
    }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    console.log("사용자를 찾을 수 없습니다.");
    return res.redirect("/login");
  }

  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    console.log("암호가 일치하지 않습니다.");
    return res.redirect("/login");
  }
  req.session.user = { id: existingUser._id.toString(), email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function() { //해당 데이터를 데이터베이스에 강제 저장

    res.redirect("/admin");
  });
    

});

router.get("/admin", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render('401');
  }
  res.render("admin");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

module.exports = router;
