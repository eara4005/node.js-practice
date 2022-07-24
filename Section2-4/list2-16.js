const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./indexList2-15.ejs','utf-8');
const style_css = fs.readFileSync('./styleList2-14.css','utf-8');

var server = http.createServer(getFromCliant);

server.listen(3000);
console.log("server start");

// --- ここまでメインプログラム ---

// --- getFromCliantの処理 ---
function getFromCliant(request, response){
    var url_parts = url.parse(request.url);  // requestからurl要素をパース

    // パースしたurlのpathnameでルーティング処理
    switch (url_parts.pathname){
        case '/':
            var content =  ejs.render(index_page,{
                title: "indexページ",
                content: "ページング処理を行って、Indexページにリダイレクトしました。"
            });
            response.writeHead(200,{'Content-Type':'text/html'});
            response.write(content);
            response.end();
            break;
        
        // cssの読み込み
        case '/styleList2-14.css':
            response.writeHead(200,{'Conten-Type':'text/css'});
            response.write(style_css);
            response.end();
            break;
        
        default:
            response.writeHead(200,{'Content-Type':'text/plain'});
            response.end('no page...');
            break;
    }
}