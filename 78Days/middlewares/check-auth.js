function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    res.locals.isAuth = false;
    res.locals.isAdmin = false;
    return next();
  }

  res.locals.isAuth = true;
  res.locals.uid = uid;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuthStatus;
