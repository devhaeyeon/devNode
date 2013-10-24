var port = process.env.PORT || 5000;

// 모듈을 추출합니다.
var connect = require('connect');

// 서버를 생성합니다.
var server = connect.createServer();

// 미들웨어를 사용합니다.
server.use(connect.cookieParser());
server.use(connect.session({secret:'string'}));
server.use(function (request, response) {
    // 변수를 선언합니다.
    var output = '';
    output += '<h1>Cookies: ' + JSON.stringify(request.cookies) + '</h1>';
    output += '<h1>Session: ' + JSON.stringify(request.session)) + '</h1>';

    // 세션을 생성합니다.
    request.session.now = (new Date()).toUTCString();

    // 응답합니다.
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(output);
});
// 서버를 실행합니다.
server.listen(port, function() {
  console.log("Listening on " + port);
});