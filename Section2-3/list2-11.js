const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

// readFileSync -> 同期処理
// ファイルの読み込みが終了するまで、次の処理は行わない。
const indes_page = fs.readFileSync('./indexList2-10.ejs','utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start');

// --- ここまでメインプログラム ---

// --- createServerの処理 ---
function getFromClient(request,response){

    // ejsモジュールのrenderメソッドでレンダリング
    var content = ejs.render(indes_page); 

    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();
}