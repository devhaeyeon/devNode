/*var express = require('express');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!!!!테스트2222');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
*/
//mongolab admin page
//https://www.mongolab.com/databases/heroku_app18606745#collections

//mongohq admin page(gui tool)
//https://partners.mongohq.com/app18606745-heroku-com/mongo/app18606745/collections/test

//mongohq => mongo db sample source
//http://support.mongohq.com/languages/nodejs.html
//http://uixkr.github.io/archives/717/

//예제
//http://devdoc.tistory.com/5

/****mongoDB
var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient
 
MongoClient.connect(process.env.MONGOHQ_URL, function(err, db) {
  // operate on the collection named "test"
  var collection = db.collection('test')
 
  // remove all records in collection (if any)
  console.log('removing documents...')
  collection.remove(function(err, result) {
    if (err) {
      return console.error(err)
    }
    console.log('collection cleared!')
    // insert two documents
    console.log('inserting new documents...')
    collection.insert([{name: 'tester'}, {name: 'coder'}], function(err,
docs) {
      if (err) {
        return console.error(err)
      }
      console.log('just inserted ', docs.length, ' new documents!')
      collection.find({}).toArray(function(err, docs) {
        if (err) {
          return console.error(err)
        }
        docs.forEach(function(doc) {
          console.log('found document: ', doc)
        })
      })
    })
  })
})
*/


var http		=		require('http');
var fs			=		require('fs');
var url			=		require('url');
var port = process.env.PORT || 5000;

http.createServer(function (request,response){

	var pathname=url.parse(request.url).pathname;
	if(pathname=='/')
	{
		fs.readFile('in.html',function(error,data){
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
		});
	}
	else if(pathname=='/OhterPage')
	{
		fs.readFile('in2.html',function(error,data){
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
		});
	}
}).listen(port, function() {
  console.log("Listening on " + port);
});

/*socket.io
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

function handler (req, res) {
    fs.readFile(__dirname + '/in.html',
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading in.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
}); 

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    }); 
});*/