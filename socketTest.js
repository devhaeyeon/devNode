var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');
  var port = process.env.PORT || 5000;

app.listen(port);

function handler (req, res) {
  fs.readFile( 'htmlPage.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});