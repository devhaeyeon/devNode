// 모듈을 추출합니다.
var fs = require('fs');
var connect = require('connect');
var mysql = require('mysql');
var ejs = require('ejs');
var port = process.env.PORT || 5000;

// 데이터베이스와 연결합니다.
var client = mysql.createClient({
//	  host     : 'us-cdbr-east-04.cleardb.com', //변하지 않음.
	  user     : 'b30e9317bebc55',
	  password : '56bd55a0',
	  database : 'heroku_e4b18fa76539562'
});

// 서버를 생성합니다.
connect.createServer(connect.bodyParser(), connect.router(function (app) {
    // GET - /List
    app.get('/', function (request, response) {
        // List.htm 파일을 읽습니다.
        fs.readFile('List.htm', 'utf8', function (error, data) {
            // 데이터베이스 쿼리를 실행합니다.
            client.query('SELECT * FROM products', function (error, result) {
                // 응답합니다.
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(ejs.render(data, {
                    data: result
                }));
            });
        });
    });

    // GET - /DELETE/:id
    app.get('/Delete/:id', function (request, response) {
        // 데이터베이스 쿼리를 실행합니다.
        client.query('DELETE FROM products WHERE id=?', [request.params.id]);

        // 응답합니다.
        response.writeHead(302, { 'Location': '/' });
        response.end();
    });

    // GET - /INSERT
    app.get('/Insert', function (request, response) {
        // Insert.htm 파일을 읽습니다.
        fs.readFile('Insert.htm', 'utf8', function (error, data) {
            // 응답합니다.
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });
    });

    // POST - /INSERT
    app.post('/Insert', function (request, response) {
        // 변수를 선언합니다.
        var body = request.body;

        // 데이터베이스 쿼리를 실행합니다.
        client.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', [body.name, body.modelnumber, body.series]);

        // 응답합니다.
        response.writeHead(302, { 'Location': '/' });
        response.end();
    });

    // GET - /EDIT/:id
    app.get('/Edit/:id', function (request, response) {
        // Edit.htm 파일을 읽습니다.
        fs.readFile('Edit.htm', 'utf8', function (error, data) {
            // 데이터베이스 쿼리를 실행합니다.
            client.query('SELECT * FROM products WHERE id = ?', [request.params.id], function (error, result) {
                // 응답합니다.
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(ejs.render(data, {
                    data: result[0]
                }));
            });
        });
    });

    // POST - /EDIT
    app.post('/Edit', function (request, response) {
        // 변수를 선언합니다.
        var body = request.body

        // 데이터베이스 쿼리를 실행합니다.
        client.query('UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?', [
            body.name, body.modelnumber, body.series, request.params.id
        ]);

        // 응답합니다.
        response.writeHead(302, { 'Location': '/' });
        response.end();
    });
})).listen(port, function () {
    console.log('server running at http://127.0.0.1:52273');
});