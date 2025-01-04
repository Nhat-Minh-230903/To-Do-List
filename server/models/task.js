module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'Users',
              key: 'id'
          }
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.TEXT
      },
      status: {
          type: DataTypes.STRING,
          defaultValue: 'pending'
      }
  }, {
      tableName: 'Tasks',
      timestamps: true
  });

  Task.associate = models => {
      Task.belongsTo(models.User, { foreignKey: 'user_id' });
      Task.hasMany(models.PomodoroSession, { foreignKey: 'task_id' });
  };

  return Task;
};
