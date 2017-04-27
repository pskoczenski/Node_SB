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

// ** Mongo Client **
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/node_sb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});

// ** SERVER **
app.listen(3000, function () {
  console.log('Server fired up on port 3k!');
});
