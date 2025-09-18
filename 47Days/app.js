const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({extende: false}));

app.get('/currenttime', function(request, response) {
    response.send('<h1>' + new Date().toISOString() + '</h1>'); 
}); 

app.get('/', function(request, response){
    response.send('<form action="store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>');
}); 

app.post('/store-user', function(request, response){
    const userName = request.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json');

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData); 

    existingUsers.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));
    console.log(userName);
    response.send('<h1>Username stored!</h1>');
});

app.listen(3000);