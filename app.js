var express = require('express');
var morgan = require('morgan');
var path = require('path');
var mysql = require('mysql');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
  secret : 'someRandomSecretValue',
  cookie : { kmaxAge: 1000 * 60 * 60 * 24 * 30},
  resave : true,
  saveUninitialized : true
}));

var pool = mysql.createPool({
  host : '127.0.0.1',
  user : 'root',
  password : 'nithya98',
  database  : 'hellobookworm'
});

function hash(input,salt){
  //create hash
  var hashed = crypto.pbkdf2Sync(input , salt, 100000, 512, 'sha512');
  return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/', function (req, res) {    
  res.sendFile(path.join(__dirname,'ui','index.html'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`app listening on port ${port}!`);
});

