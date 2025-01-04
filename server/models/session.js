module.exports = (sequelize, DataTypes) => {
  const PomodoroSession = sequelize.define('PomodoroSession', {
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
      task_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'Tasks',
              key: 'id'
          }
      },
      start_time: {
          type: DataTypes.DATE,
          allowNull: false
      },
      end_time: {
          type: DataTypes.DATE,
          allowNull: false
      },
      session_duration: {
          type: DataTypes.INTEGER,  // Duration in minutes
          allowNull: false
      },
      status: {
          type: DataTypes.STRING,
          defaultValue: 'active'
      }
  }, {
      tableName: 'PomodoroSessions',
      timestamps: true
  });

  PomodoroSession.associate = models => {
      PomodoroSession.belongsTo(models.User, { foreignKey: 'user_id' });
      PomodoroSession.belongsTo(models.Task, { foreignKey: 'task_id' });
  };

  return PomodoroSession;
};
