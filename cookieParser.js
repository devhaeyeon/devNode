var connect=require('connect');

var port = process.env.PORT || 5000;
var server = connect.createServer();


connect.createServer(connect.cookieParser(),connect.router(function(app){

	app.get('/setcookie',	function (request,response)
	{
		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8',
		'Set-Cookie':['breakfast = toast','dinner=lunch']	
		});
		response.end( '<a href="/getcookie">to get cookie</a>');
	});

	app.get('/getcookie',	function (request,response)
	{
		var output =JSON.stringify(request.cookies);
		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
		response.end( '<h1>'+output+'</h1>');
	});

})).listen(port, function() {
  console.log("Listening on " + port);
});