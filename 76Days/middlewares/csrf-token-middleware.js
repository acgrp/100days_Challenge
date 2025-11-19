function addCSRFToken(req, res, next) {
    req.locals.csrfToken = req.csrfToken();
    next();
}

module.exports = addCSRFToken;