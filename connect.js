var connect=require('connect');

var port = process.env.PORT || 5000;

connect.createServer(connect.query(),function (request,response){

		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
		response.end( '<h1>hello, connect module</h1>');

}).listen(port, function() {
  console.log("Listening on " + port);
});