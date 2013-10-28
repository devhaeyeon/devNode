var connect = require('connect');
var fs = require('fs');
var ejs = require('ejs');
var db = require('mongojs').connect(process.env.MONGOHQ_URL, ['test']);

function get(path, cb){
    return function(req, res ,next){
     if(req.method != 'GET' || req.url != path) return next();
        cb(req, res, next);
    }
}

var app = connect()
    .use(get('/', function (req, res, next){
        fs.readFile('test.htm', 'utf8', function(error, data){
            db.test.find({},  {name:1, score:1, _id:0}, function (error, cursor) { 
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(ejs.render(data, {
                    data : cursor
                })); 
            });
        });
    }))
    .listen(8080, function(){console.log("server start 127.0.0.1:8080");});