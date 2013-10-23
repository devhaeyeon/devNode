var port = process.env.PORT || 5000;
var connect = require('connect');
var fs = require('fs');

var id='haeyeon';
var pw='1234';

var server = connect.createSErver();

server.use(connect.cookieParser());
server.use(connect.bodyParser());
server.use(connect.router(function (app){

	app.get('/Login',function(request,response){
		if(request.cookies.auth=='true'){
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end('<h1>login success</h1>');
		}else{
			fs.readFile('Login.html',function(error,data){
				response.writeHead(200,{'Content-Type':'text/html'});
				response.end(data);
			});
		}
	});

	app.post('/Login',function(request,response){
		if(request.body.id==id && request.body.pw==pw){
			response.writeHead(302,{'Location':'/Login',
				'Set-Cookie':['auth=true']
			});
			response.end();
		}else{
			fs.readFile('Login.html',function(error,data){
				response.writeHead(200,{'Content-Type':'text/html'});
				response.end('<h1>login fail</h1>');
			});
		}
	});

server.listen(port, function() {
  console.log("Listening on " + port);
});