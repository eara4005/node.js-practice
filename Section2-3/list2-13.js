const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const index_page = fs.readFileSync('./indexList2-12.ejs','utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start');

// --- メインプログラムはここまで ---

// --- getFromClientの処理 ---
function getFromClient(request,response){
    var content = ejs.render(index_page, {
        title:"変数を表示させる",
        content:"これはテンプレートを使ったサンプルページです。"
    });
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();
}