// Modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var fs = require('fs');

var app = express();

// ** MIDDLEWARE **
// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// ** ROUTES **
// var routes = require('./routes.js')

// Root
app.get('/', function(req, res) {
  var title = "Sandbox";
  res.render('index', {
    title: title
  })
});

// USERS
// Post => users/new
app.post('/users/new', function(req, res){

  req.checkBody('email', "Email is Required").notEmpty();
  req.checkBody('username', "Username is Required").notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('index', {
      errors: errors
    });
    console.log("Fields not valid")
  }else{
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email
    }
    console.log("Success!")
    console.log(newUser)
    res.render('users/new')
  };
})

// GET => /users/new
app.get('/users/new', function(req, res){
  res.render('users/new')
})

// ** SERVER **
app.listen(3000, function () {
  console.log('Server fired up on port 3k!')
});
