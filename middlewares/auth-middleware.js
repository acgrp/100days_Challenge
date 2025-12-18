async function auth(req, res, next) {//세션이 쿠키와 연결된거였나 아마...
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }

  res.locals.isAuth = isAuth;

  next();
}

module.exports = auth;//다른파일에서 사용할수 있도록 하는것