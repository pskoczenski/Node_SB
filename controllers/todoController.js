var bodyParser = require('body-parser');

// ** MONGOOSE **
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connected")
});
//** SCHEMA **
var todoSchema = mongoose.schema({
  item: String
});
var Item = mongoose.model('Item', itemSchema);


var data = [];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  console.log("CONTROLLERS");

  app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);

  });

  app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !==req.params.item;
    })
    res.json(data);
  });
}
