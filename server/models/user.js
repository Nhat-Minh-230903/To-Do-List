const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {
      tableName: 'Users',
      timestamps: true,
      createdAt: 'created_at', // Đặt tên tùy chỉnh cho createdAt
      updatedAt: 'updated_at',  // Đặt tên tùy chỉnh cho updatedAt
      hooks: {
        beforeCreate: (user, options) => {
          // Lấy thời gian hiện tại mà không có phần múi giờ
          const currentTime = new Date();
          // Loại bỏ thông tin múi giờ
          const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' '); // yyyy-mm-dd hh:mm:ss
          user.created_at = formattedTime; // Lưu vào created_at
          user.updated_at = formattedTime; // Cùng thời gian cho updated_at
        },
        beforeUpdate: (user, options) => {
          // Cập nhật thời gian updated_at trước khi lưu
          const currentTime = new Date();
          const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' '); // yyyy-mm-dd hh:mm:ss
          user.updated_at = formattedTime;
        }
      }
  });

  User.associate = models => {
      User.hasMany(models.Task, { foreignKey: 'user_id' });
      User.hasMany(models.PomodoroSession, { foreignKey: 'user_id' });
  };

  return User;
};
