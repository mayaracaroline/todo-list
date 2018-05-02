const Sequelize = require('sequelize');
const connection = require('../config/database');

const Task = connection.define('to_do', {
  item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.STRING(100),
  },
  completion_status: {
    type: Sequelize.BOOLEAN,

  },
  archieved_status: {
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true
});

Task.sync();

module.exports = Task;
