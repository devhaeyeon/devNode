var connect = require('connect');
var port = process.env.PORT || 5000;

connect.createServer(connect.router(function (app) {

	app.get('/Product/:id'	,function (request,response,next){
		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
		response.end( '<h1>product page-'+request.params.id+'</h1>');
		//response.end();
	});

})).listen(port, function() {
  console.log("Listening on " + port);
});