
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const Todo = require('./server/models/todo');

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/todo', (req, res) => {
  Todo.findAll({
    where: { archieved_status: 0 },
    attributes: [
      'item_id',
      'description',
      'completion_status',
    ],
  }).then(response => (
    res.send(response.map(item => item.dataValues))
  ));
});

app.post('/todo/create', (req, res) => {
  Todo.create({
    description: req.body.description,
  }).then((response) => {
    res.send(response);
  });
});

app.put('/todo/update/:item_id', (req, res) => {
  const status = req.body.checked;
  Todo.update({
    completion_status: status,
  }, {
    where: {
      item_id: req.params.item_id,
    },
  });

  res.status(200).send({
    updated: true,
  });
});

app.put('/todo/archiv/:item_id', (req, res) => {
  const status = req.body.checked;

  Todo.update({
    archieved_status: status,
  }, {
    where: {
      item_id: req.params.item_id,
    },
  });

  res.status(200).send({
    updated: true,
  });
});

app.listen(3000, () => console.log('App listening on port 3000!'));

