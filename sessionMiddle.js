var connect=require('connect');
var server=connect.createServer();
var port = process.env.PORT || 5000;

server.use(connect.cookieParser());
server.use(connect.session());
server.use(function (request,response){

	var output='';
	output +='<p>cookies:'+JSON.stringify(request.cookies)+'</p>';
	output +='<h1>cookies:'+JSON.stringify(request.session)+'</h1>';

	request.session.now=(new Date()).toUTCString();

	response.writeHead(200, {'Content-Type':'text/html'});
	response.end(output);


});

server.listen(port,function(){

	console.log('server running '+port+);


});