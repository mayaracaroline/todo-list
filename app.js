const express = require('express');
const app = express();
const path = require('path');
const Todo = require('./server/src/models/todo');

app.get('/',function(req,res){
 console.log(__dirname);
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/static',express.static('public'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))
