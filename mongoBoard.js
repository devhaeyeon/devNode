var connect = require('connect');
var fs = require('fs');
var ejs = require('ejs');
var port = process.env.PORT || 5000;
var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

var db = mongodb.connect('app18606745', 'test');

function get(path, cd) {
    return function (req, res, next) {
        if (req.method != 'GET' || req.url != path)
            return next();
        cd(req, res, next);
    }
}
var app = connect()
    .use(get('/', function (req, res, next) {
        fs.readFile('input.html', 'utf8', function (error, data) {
            db.test.find({}, { name: 1 }, function (error, cursor) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(ejs.render(data, { data: cursor }));
            });
        });
    })).listen(port, function () { console.log("서버 연결 : 3000") });
 