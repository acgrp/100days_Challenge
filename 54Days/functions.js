function greetUser(greetingPrefix, userName = 'user') {
    //console.log(greetingPrefix + ' ' + userName);
    console.log(`${greetingPrefix} ${userName}!`);
}

greetUser('Hi', 'Jin');
greetUser('Hello');

function sumUp(...numbers) { //... : 자바 스크립트의 연산자(배열이 아닌걸 배열처럼 받아들임)
    let result = 0;

    for (const number of numbers){
        result += number;
    }

    return result;
};

const inputNumbers = [1, 4, 65, 23, 67];

console.log(sumUp(...inputNumbers));

console.log(sumUp);

