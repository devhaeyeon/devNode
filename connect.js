var http			=		require('http');
var jade			=		require('jade');
var fs				=		require('fs');
var port = process.env.PORT || 5000;

http.createServer(function (request,response){

		fs.readFile('jadepage.jade','utf-8',function(error,data){
		var fn=jade.compile(data);
		response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
		response.end( fn({
				name : 'haeyeon',
				description:'해연22'
		}));
		});

}).listen(port, function() {
  console.log("Listening on " + port);
});