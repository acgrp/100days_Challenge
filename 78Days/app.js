const path = require('path');

const express = require('express');

const db = require('./data/database');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(authRoutes);

db.connectToDatabase().then(function() {
    app.listen(3000);
}).catch(function(error) {  //then은 해당 프로미스가 성공할 경우 catch는 실패대비
    console.log('Failed to connect to the database!');
    console.log(error);
});
app.listen(3000);