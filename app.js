const express = require('express')
const app = express()
var path = require('path')

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/static',express.static('public'));
// app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Example app listening on port 3000!'))