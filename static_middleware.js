var connect = require('connect');
var port = process.env.PORT || 5000;
var server = connect.createServer();
server.use(connect.router(function (app){

}));

server.use(connect.static(__dirname+'/res'));

server.listen(port, function() {
  console.log("Listening on " + port);
});