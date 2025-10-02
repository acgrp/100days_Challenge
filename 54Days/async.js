const fs = require('fs/promises');//promise버전 사용(내장되어 있음)

async function readFile() {//async를 사용하면 프로미스로 반환
    let fileData;
    
    // fileData = fs.readFile('data.txt', function() {
    //     console.log('File parsing done!');
    //     console.log(fileData.toString());
    // }); 
    try { //async await 사용하면 try catch 가능
        fileData = await fs.readFile('data.txt');
    } catch (error) {
        console.log(error);
    }

    // .then(function(fileData) {//더이상 콜백하지않음, fs에서 가져오므로 프로미스가 결과가 됨, then 매서드도 프로미스에 가진 객체여서 가능 + 비동기 작업에는 try catch 불가능
    console.log('File parsing done!');
    console.log(fileData.toString());
    // return anotherAsyncOperation;
    console.log('Hi there!');
}

readFile();