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
