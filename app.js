var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var logger = function(req, res, next) {
  console.log('Server Log...');
  next();
}

app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  var title = "Sandbox";
  res.render('index', {
    title: title
  })
  //res.send('Hello')
});

app.listen(3000, function () {
  console.log('Server fired up on port 3k!')
});
