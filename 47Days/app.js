const http = require('http');

function handleRequest(request, response) {

    if (request.url ==='/currenttime') {
        response.statusCode = 200; //success , 404 - error, 401 - error, 500 - error
        response.end('<h1>' + new Date().toISOString() + '</h1>');        
    } else if (request.url === '/') {
        response.statusCode = 200; //success , 404 - error, 401 - error, 500 - error
        response.end('<h1>Hello World!</h1>');
    }
    //localhost:3000/
}



const server = http.createServer(handleRequest);

server.listen(3000);



// 주소입력 => 서버에 요청 보내서 사이트를 반환
// 