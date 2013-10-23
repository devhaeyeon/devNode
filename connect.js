var connect=require('connect');

var port = process.env.PORT || 5000;
var server = connect.createServer();


server.use(connect.query());
server.use(function (request,response){

		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
		response.end( '<h1>hello, connect module'+JSON.stringify(request.query)+'</h1>');

});

server.use(connect.errorHandler({

	stack:true;,
	message:true;,
	dump:true;

}));

server.listen(port, function() {
  console.log("Listening on " + port);
});

/*connect.createServer(connect.query(),function (request,response){

		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
		response.end( '<h1>hello, connect module'+JSON.stringify(request.query)+'</h1>');

}).listen(port, function() {
  console.log("Listening on " + port);
});*/


