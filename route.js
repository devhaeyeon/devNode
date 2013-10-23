var connect = require('connect');
var rServer = connect.createServer();
 var port = process.env.PORT || 5000;

rServer.use('/Home/Index',function(request,response,next){
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write('<h1>Index Page</h1>');
    response.end();
});
 
rServer.use('/Home/About',function(request,response,next){
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write('<h1>Index Page</h1>');
    response.end();
});
 
rServer.listen(port, function() {
  console.log("Listening on " + port);
});
