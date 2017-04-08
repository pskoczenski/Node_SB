module.exports = function(app){
  console.log("CONTROLLERS")

  app.get('/todo', function(req, res){
    res.render('todo');
  });

  app.post('/todo', function(req, res){

  });

  app.delete('/todo', function(req, res){

  });
}
