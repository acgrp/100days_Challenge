console.log('--- starting attacker-site app.js ---');
console.log('cwd:', process.cwd());

const path = require('path');

const express = require('express');

const demoRoutes = require('./routes/demo');

// This site doesn't have to use ExpressJS / NodeJS
// It could also be a simple static site (i.e. just HTML + CSS)

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('transaction'); // views/transaction.ejs 파일을 렌더
});

app.use(demoRoutes);

app.listen(8000, () => {
  console.log('Attacker site: listening on port 8000');
});