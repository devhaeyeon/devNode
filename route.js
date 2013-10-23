var connect = require('connect');
var port = process.env.PORT || 5000;
var server = connect.createServer();

connect.createServer(connect.router(function (app) {

	app.get('/Product/:id'	,function (request,response,next){
		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
		response.write( '<h1>product page-'+request.params.id+'</h1>');
		response.end();
	});

	app.all('*'	,function (request,response,next){
		throw new Error('page not found');
	});

})).listen(port, function() {
  console.log("Listening on " + port);
});