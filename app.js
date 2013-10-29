// 모듈을 추출합니다.
var fs = require('fs');
var connect = require('connect');
var ejs = require('ejs');
var db = require('mongojs').connect(process.env.MONGOHQ_URL, ['board']);
var map = require('./Map.js');
var port = process.env.PORT || 5000;

// i = req.url , j = path
function compareUrl(i, j){
	var array_str_div_i = new Array();
	var array_str_div_j = new Array();
	array_str_div_i = i.split('/');
	array_str_div_j = j.split('/');
	var array_ret = new Array();
	if(array_str_div_i.length != array_str_div_j.length){
		return -1;
	}
	for(var temp in array_str_div_i) {
		if(array_str_div_j[temp].indexOf(":") == -1){
			if(array_str_div_i[temp] != array_str_div_j[temp]){
				return -1;
			}
		}else{
			array_ret.push([array_str_div_j[temp],array_str_div_i[temp]]);
		}
	}
	return array_ret;
}


function get(path, cb){
    return function(req, res ,next){
     if(req.method != 'GET' ){
	return next();
      }else if( req.url != path){
	var ret = compareUrl(req.url,path);
	if(ret == "-1"){
		return next();
	}else{
		
		var map = new Map();
		for(var temp in ret) {
			if(typeof ret[temp][0] ==  "undefined" ){}
			else{
			  map.put(ret[temp][0].replace(':',''), ret[temp][1]);
			}
		}
		req.body = map;
	}
      }	
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



var app = connect();

    // GET - /List
    app.use(get('/', function (request, response) {
        // List.htm 파일을 읽습니다.
        fs.readFile('List.htm', 'utf8', function (error, data) {
            // 데이터베이스 쿼리를 실행합니다.
               db.test.find({},{name:1, score:1, _id:0}, function (error, result) {
                // 응답합니다.
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(ejs.render(data, {
                    data: result
                }));
            });
        });
    }));

    // GET - /INSERT
    app.use(get('/Insert', function (request, response) {
        // Insert.htm 파일을 읽습니다.
        fs.readFile('Insert.htm', 'utf8', function (error, data) {
            // 응답합니다.
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });
    }));


  // POST - /INSERT
    app.use(connect.bodyParser())
	.use(post('/Insert', function (req, res) {
        // 변수를 선언합니다.
	
        var body = req.body;
        // 데이터베이스 쿼리를 실행합니다.
	var temp = {"name":body.name,"score":body.score};

	db.test.save(temp, function(error, data){
		 // 응답합니다.
		res.writeHead(302, { 'Location': '/' });
		res.end();
	});
    }));

 // GET - /EDIT/:id

     app.use(get('/Edit/:id', function (req, res) {
	//var array_ret = divString(req.url, '/Edit/:id' );
	//console.log("/Edit/:id - req.body.get(id) : "+req.body.get("id"));
	var body = req.body;
	//console.log(array_ret[0]);
        // Edit.htm 파일을 읽습니다.
        fs.readFile('Edit.htm', 'utf8', function (error, data) {
            // 데이터베이스 쿼리를 실행합니다.
		db.test.find({"name":body.get("id")},{name:1, score:1, _id:0}, function (error, result) {
		        // 응답합니다.
		        res.writeHead(200, { 'Content-Type': 'text/html' });
		        res.end(ejs.render(data, {
		            data: result
		        }));
		});
        });
    }));
	
    // POST - /EDIT
    app.use(post('/Edit/:id', function (req, res) {
        // 변수를 선언합니다.
        var body = req.body
	db.test.update({"name":body.name},{$set:{"score":body.score},}, function(error, data){ // 응답합니다.
        res.writeHead(302, { 'Location': '/' });
        res.end();});
    }));

	 // GET - /DELETE/:id
    app.use(get('/Delete/:id', function (req, res) {
        // 데이터베이스 쿼리를 실행합니다.
	var body = req.body;
        //console.log("delete body.get(id) : " + body.get("id"));
	db.test.remove({"name":body.get("id")},1, function(error, data){
		// 응답합니다.
		res.writeHead(302, { 'Location': '/' });
		res.end();
	});
    }));
app.listen(port, function () {
    console.log('server running at http://127.0.0.1:8080');
});

