var express = require('express');
var mysql      = require('mysql');
var app = express();
app.use(express.logger());

var connection = mysql.createConnection({
  host     : 'us-cdbr-east-04.cleardb.com', //변하지 않음.
  user     : 'b30e9317bebc55',
  password : '56bd55a0',
  database : 'heroku_e4b18fa76539562'
});

connection.connect();

app.get('/', function(request, response) {
  connection.query('SELECT * from t_users', function(err, rows, fields) {
      if (err) {
        console.log('error: ', err);
        throw err;
      }
      response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});