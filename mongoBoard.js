var connect = require('connect');
var fs = require('fs');
var ejs = require('ejs');
var db = require('mongojs').connect(process.env.MONGOHQ_URL, ['test']);
var port = process.env.PORT || 5000;


function get(path, cb){
    return function(req, res ,next){
     if(req.method != 'GET' || req.url != path) return next();
        cb(req, res, next);
    }
}

var app = connect()
    .use(get('/', function (req, res, next){
        fs.readFile('test.htm', 'utf8', function(error, data){
            db.test.find({}, function (error, cursor) { 
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(ejs.render(data, {
                    data : cursor
                })); 
            });
        });
    }))
    .use(get('/insert', function (req, res, next){
      fs.readFile('input.html', 'utf8', function (error, data) {
            // 응답합니다.
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }))

    .post('/insert', function (req, res, next){
		  var body = req.body;

				     db.test.insert([{name: body.name}], function(err,
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

				// 응답합니다.
				res.writeHead(302, { 'Location': '/' });
				res.end();
    }))
    .listen(port, function(){console.log("server start 127.0.0.1:"+port);});

