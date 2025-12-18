const fs = require('fs');

function readFile() {
    let fileData;
    try {
        const fileData = fs.readFileSync('data.json'); //여기서 오류 발생시 함수 중단
    } catch {
        console.log('An error occurred!');
    }
    console.log(fileData);
    console.log('Hi there!');
}

readFile();

