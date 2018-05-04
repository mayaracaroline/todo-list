const express = require('express');
const app = express();
const path = require('path');
const Todo = require('./server/src/models/todo');

app.get('/',function(req,res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/static',express.static('public'));

app.post('/todo/create',function(req,res){
  const body = req.body;
  Todo.create(body);
  res.send()
});

// app.get('/todo/:id', function(req,res) {
  // console.log('Log do todo')
  // res.send( {color: 'red'});
  // console.log(req.query.description);

  // console.log(req.params)
  // console.log(req.query)
// });

app.get('/todo', function(req,res) {
  Todo.findAll({
    attributes: ['item_id','description', 'completion_status']
  }).then( response => {
     const todos = response.map((item) => {
      return item.dataValues;
     })
    res.send(todos);
  });
});

app.get('/todo/create', (req,res) => {

})
//
app.post('/todo', function(req,res) {
  console.log('caiu no post');
  console.log(req.query);
  console.log(req.params);
  res.send({
    id: 1,
    description: 'Item',
    completion_status: false,
    archived_status: false
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
