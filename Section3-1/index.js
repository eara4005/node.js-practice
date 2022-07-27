// クエリパラメータの表示
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring'); // 

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

var server = http.createServer(getFromCliant);

server.listen(3000);
console.log("server start");

// --- ここまでメインログラム ---

// --- getFromCliantの処理 ---
function getFromCliant(request, response) {
    var url_parts = url.parse(request.url, true); // 第二引数をtrueに設定

    // swithでルーティング
    switch (url_parts.pathname) {

        case '/': //indexのアクセス処理
            response_index(request, response); //indexの処理
            break;

        case '/other':
            response_other(request, response); // otherの処理
            break;

        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('no data...');
            break;
    }
}

// 追加するデータ用変数
var data = { msg: 'no message ...' };

// indexのアクセス処理
function response_index(request, response) {
    // postアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        // データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了のイベント処理
        request.on('end', () => {
            data = qs.parse(body); //データのパース

            //クッキー情報の保存
            setCookie('msg',data.msg,response);
            write_index(request, response);
        });
    } else {
        write_index(request,response);
    }
}

// indexの表示作成
function write_index(request,response){
    var msg = "※伝言を受信します。"
    var content = ejs.render(index_page,{
        title: "Index",
        content: msg,
        data:data,
    });
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();

// クッキーの値を設定
function setCookie(key,value,response){
    var cookie = escape(value);
    response.setHeader('Set-Cookie');
}
}