# Node.js超入門
```js list2-1.js
const http = require('http');

var server = http.createServer(
    (request,response)=>{
        response.end("Hello Node.js!");
    }
);

server.listen(3000);
```
## プログラムの流れを整理する
Node.jsのプログラムの流れは、整理すると以下のようになる。  
1. インターネットアクセスをする「http」というオブジェクトを読み込む
1. httpから、サーバーのオブジェクトを作成する
1. サーバーオブジェクトを待ち受けにする

※httpオブジェクトは、Nodeに用意されているオブジェクト  
<hr>
<br>

### 「待ち受け」って何？
- サーバーに外部からアクセスしてくるのをずっと待ち続ける状態にするもの  
<hr>
<br>

## requireとモジュールシステム
まず、最初に行うのは、「http」オブジェクトのロード
```
const http = require('http');
```
 - requireというメソッドを実行→Node.jsのモジュールローディングシステムを利用するもの。  
 - Node.jsはオブジェクトをモジュール化しておいて、必要に応じてそれらをロードし、利用できようにしている。  
 →その「モジュールのロードを行なっているのが、requireメソッド。  

以下のように利用する。  
```
変数 = require(ID);
```
- 引数には、読み込むモジュールを示すIDを用意する。  
- 指定したIDのモジュールがロードされ、変数にオブジェクトとして設定される。  

<hr>
<br>

### httpモジュールとは
- httpアクセスのための機能をまとめ、提供するもの。
- Node.jsのプログラムの最も中心的な機能。

## サーバーオブジェクトの作成
- 「http.createServer」というオブジェクトが用意されている。
以下のメソッドで作成可能。
```
変数 = http.ctrateServer( 関数 );
```
- 上記のメソッドで、httpオブジェクトにある「createServer」メソッドを呼び出し。
- 関数を引数として設定しておく。

設定しておく関数
```
(response,request) => {
    // 実行する処理
}
```
- 引数の役割
    - クライアントからサーバーへの要求
    - サーバーからクライアントへの返信  

それぞれを管理するための関数。  
createServerでは、必ずこの２つの引数を持った関数を用意しなければいけない。  


関数内に処理を記述する   
→ 「サーバーにアクセスされたら、必ずこの処理を実行する」ことが可能になる。

<hr>
<br>

### requestとresponse
```
(request,response) => {
    response.end('Hello Node.js!')
}
```
- 引数で渡されたresponseという変数の「end」メソッドを実行している。  
→ reqponseというのは、サーバーからクライアントへの返信に関するオブジェクト。  

- 「end」メソッドは、クライアントへの返信を終了するメソッド。  
→ 引数にテキストが用意してあると、そのテキストを出力してクライアントへの出力を終了する。

<hr>  
<br>

### リクエストとレスポンス
requestとresponseという引数には、以下のようなオブジェクトが収められている。
|名称|説明| 
|----|----|
|http.CliantRequest|request引数に入っているオブジェクト。<br>クライアントから送られてきた情報を管理するためのもの。|  
|http.ServerResponse|response引数に入っているオブジェクト。<br>サーバーから送信される情報を管理するためのもの。|
||  

- サーバーのプログラムというのは常に「クライアントから送られてきた情報」と「サーバーから送り返す情報」の２つを意識しなければいけない。  
→ その２つを管理するのが、このオブジェクト。  

<hr>
<br>

### 「待ち受け」について
createServerで作成したhttp.Serverオブジェクトを待ち受け状態にする。
```
server.listen(3000);
```
- 引数に「待ち受けるポート番号」を指定。
- 番号を変更 → アクセスする際にしてするポート番号の変更が可能になる。  

<hr>
<br>

## HTMLを出力するには？
list2-1.jsを書き換える。
``` js list2-2.js
const http = require('http');

var server = http.createServer(
    (request,response)=>{
        response.end('<html><head><body><h1>Hello</h1><p>Welcome to Node.js!</p></body></head></html>');
    }
);

server.listen(3000);
```
<hr>
<br>

## ヘッダー情報の設定  
- Webでは、さまざまな情報がテキストデータとして送られる  
→ 受け取ったWebブラウザで、どのような種類のテキストデータなのかを明確にするために設定する必要がある。  
→ 「ヘッダー情報」でテキストデータの種類を明確にする。  

### ヘッダーは、見えないデータ  
- ヘッダー情報は、サーバー・クライアント間のやりとりにて送られる「見えない」情報。  
→ アクセスに関する情報のやりとりを行う。  
→ 情報をもとに「どんなデータが送られてくるか」を解釈して処理する。  

### ヘッダー情報の設定方法
- HTMLの`<head>`内にタグを用意する  
→ タグとして必要な情報を記述しておくと、ヘッダー情報として扱われる。  
- http.ServerResponseメソッドを使う  
→ サーバーからの送信情報を管理するhttp.ServerResponseメソッドには、ヘッダー情報を扱うためのメソッドが用意されている。

#### ヘッダー情報の設定
``` js
response.setHeader( 名前, 値);
```

#### ヘッダー情報の取得
``` js
変数 = response.getHeader( 名前 );
```

#### ヘッダー情報の出力
``` js
response.writeHead( コード番号, メッセージ);
```

- ヘッダー情報は、名前と値がセットになっている。  
→ 名前を指定して、値を取得したり、設定したりする。  

- writeHead...ヘッダー情報をテキストで用意して、直接書き出すもの。  
コード番号...ステータスコードを設定可能。

## HTMLで日本語を表示する
``` js list2-3.js
const http = require('http');

var server = http.createServer(
    (request,response) => {
        response.setHeader('Content-Type','text/html');
        response.write('<!DOCTYPEs html><html lang="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title></head>');
        response.write('<body><h1>Hello Node.js</h1>');
        response.write('<p>This is Node.js sample page.</p>');
        response.write('<p>これは、Node.jsのサンプルページです。</p>');
        response.write('</body></html>');
        response.end();
    }
);
server.listen(3000);
console.log('Server Start');
```

### ヘッダー情報の出力を確認
```js
response.setHeader('Content-Type','text/html');
```
- 「Content-Type」という、コンテンツの種類を設定。
- 「text/html」→ 「テキストデータで、HTML形式のもの」であることを示す。

### writeでコンテンツを出力
```js
response.write('<!DOCTYPEs html><html lang="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title></head>');
        ...
```
- write : 引数のテキストを出力する。
- endとは違い、何度も続けて書き出しができる。
