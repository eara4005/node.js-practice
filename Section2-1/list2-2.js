const http = require('http');

var server = http.createServer(
    (request,response)=>{
        response.end('<html><head><body><h1>Hello</h1><p>Welcome to Node.js!</p></body></head></html>');
    }
);

server.listen(3000);