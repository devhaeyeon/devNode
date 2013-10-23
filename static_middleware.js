var connect = require('connect');
var port = process.env.PORT || 5000;
var server = connect.createServer();

connect.createServer(connect.static(__dirname+'/res/'),function (request,response){

		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
		response.end( '<img src="/Penguins.jpg" width="100%"/>');

}).listen(port, function() {
  console.log("Listening on " + port);
});