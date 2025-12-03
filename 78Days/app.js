const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const productsRoutes = require('./routes/products.route');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false})); //false는 일반 제출만 지원

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(errorHandlerMiddleware);
('checkAuthStatus')

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

db.connectToDatabase().then(function() {
    app.listen(3000);
}).catch(function(error) {  //then은 해당 프로미스가 성공할 경우 catch는 실패대비
    console.log('Failed to connect to the database!');
    console.log(error);
});
