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

function post(path, cb){
    return function(req, res ,next){
     if(req.method != 'POST' ){
	return next();
      }else if( req.url != path){
	var ret = compareUrl(req.url,path);
	if(ret == "-1"){
		return next();
	}
      }	
      cb(req, res, next);
    }
}


formValues = function(data){
    var splits = data.split('&');
    var hash = [];
    console.log(splits.length);
    for (i = 0; i < splits.length; i++)
    {
        var iSplit = splits[i].split('=');
        hash[iSplit[0]] = iSplit[1];
    }
    return hash;
}

//http://uiandwe.tistory.com/837
//http://uiandwe.tistory.com/category/web/Node.js
//http://blog.thekfactor.info/posts/an-introduction-to-node-js-and-handling-post-requests/


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

    .use(post('/insert', function (req, res){
					var body = "";
					  req.on('data', function (chunk) {
						body += chunk;
					  });
					  req.on('end', function () {
						console.log('POSTed: ' + body);
					 
						if (body != '')
						{
							var hash = formValues(body);	
							var username=hash["username"];
						 db.test.insert({name: username}, function(err,
						docs) {
							  if (err) {
								return console.error(err)
							  }
							  console.log('just inserted ', docs.length, ' new documents!')
							  db.test.find({}).toArray(function(err, docs) {
								if (err) {
								  return console.error(err)
								}
								docs.forEach(function(doc) {
								  console.log('found document: ', doc)
								})
							  })
							})
						}
					});
				    

				// 응답합니다.
				res.writeHead(302, { 'Location': '/' });
				res.end();
    }))
    .listen(port, function(){console.log("server start 127.0.0.1:"+port);});

