const Sequelize = require('sequelize');
const sequelize = new Sequelize('todolist', 'mayara', 'arayam20', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// Or you can simply use a connection uri
const connection = new Sequelize('mysql://mayara:arayam20@localhost:3306/todolist');

module.exports = connection;
