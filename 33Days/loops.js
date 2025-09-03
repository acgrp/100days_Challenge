for (let i = 0; i < 10; i++) {
    console.log(i);
}

const users = ['max', 'Anna', 'Joel'];

for (const user of users) {  //for ... of (배열에 있는것들은 전부다 출력)
    console.log(user);
}

for (let i = 0; i < users.length; i++) {
    console.log(users[i]);
}

const loggedInUser = {
    name: 'jin',
    age:  26,
    inAdmin: true
};

for (const propertyName in loggedInUser) {
    console.log(propertyName);      // 배열의 종류를 가져옴
    console.log(loggedInUser[propertyName]); //배열의 값을 가져옴
}

let isF = false;

while (!isF) {
    isF = confirm('Do you want to quit?');
}

console.log('done')