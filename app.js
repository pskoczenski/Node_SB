// ** MODULES **
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const todoController = require('./controllers/todoController.js');
const $ = require('jQuery');


const app = express();

// ** MIDDLEWARE **
// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
// app.use(express.static('./public'));
app.use(express.static('public'))

// ** ROUTES **
// Root
app.get('/', function(req, res) {
  var title = "ToDo";
  res.render('index', {
    title: title
  })
});

// ** FIRE CONTROLLERS **
todoController(app);

// ** SERVER **
app.listen(3000, function () {
  console.log('Server fired up on port 3k!');
});
