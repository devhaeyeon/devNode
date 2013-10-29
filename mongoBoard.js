var connect = require('connect');
var fs = require('fs');
var ejs = require('ejs');
var db = require('mongojs').connect(process.env.MONGOHQ_URL, ['haeyeon']);

var port = process.env.PORT || 5000;

function get(path, cb){								//get 방식 데이터 처리
    return function(req, res ,next){
     if(req.method != 'GET' || req.url != path) return next();
        cb(req, res, next);
    }
}

function post(path, cb){							//post방식 데이터 처리
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


formValues = function(data){		//입력 폼값 데이터 받기
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
    .use(get('/', function (req, res, next){											//DB 출력
        fs.readFile('test.htm', 'utf8', function(error, data){
            db.haeyeon.find({}, function (error, cursor) { 
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(ejs.render(data, {
                    data : cursor
                })); 
            });
        });
    }))
    .use(get('/delete/:id', function (req, res, next){										//DB 삭제
        // 데이터베이스 쿼리를 실행합니다.
		 db.haeyeon.remove({id:req.params.id},function(err, result) {
			if (err) {
			  return console.error(err)
			}
		 });
        // 응답합니다.
        response.writeHead(302, { 'Location': '/' });
        response.end();
    }))
	 .use(post('/modify/:id', function (req, res, next){										//DB 수정
        // 데이터베이스 쿼리를 실행합니다.
		 db.haeyeon.update({name:'req.body.name'},function(err, result) {
			if (err) {
			  return console.error(err)
			}
		 });
        // 응답합니다.
        response.writeHead(302, { 'Location': '/' });
        response.end();
    }))
    .use(get('/modify', function (req, res, next){											//DB 수정 페이지
      fs.readFile('edit2.html', 'utf8', function (error, data) {
            // 응답합니다.
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    }))
	.use(get('/insert', function (req, res, next){											//DB 입력 페이지
      fs.readFile('input.html', 'utf8', function (error, data) {
            // 응답합니다.
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    }))
    .use(post('/insert', function (req, res){												//DB 추가
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
						 db.haeyeon.insert({name: username}, function(err,
						docs) {
							  if (err) {
								return console.error(err)
							  }
							  console.log('just inserted ', docs.length, ' new documents!')
							  db.haeyeon.find({}).toArray(function(err, docs) {
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

