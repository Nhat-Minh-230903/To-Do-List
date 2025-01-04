const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Định nghĩa các model
const User = require('./user')(sequelize, Sequelize);
const Task = require('./task')(sequelize, Sequelize);
const Session = require('./session')(sequelize, Sequelize);

// Định nghĩa mối quan hệ giữa các bảng
User.hasMany(Task);
Task.belongsTo(User);

User.hasMany(Session);
Session.belongsTo(User);

// Xuất các model để sử dụng ở nơi khác
module.exports = {
  User,
  Task,
  Session,
};
