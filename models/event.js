module.exports = function (sequelize, DataTypes) {
  let Event = sequelize.define("Event", {
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    event_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    event_location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    event_date_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    event_note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shortid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  Event.associate = function (models) {
    Event.hasOne(models.Call, {
      onDelete: 'cascade'
    });
  };

  Event.associate = function (models) {
    Event.hasOne(models.Text, {
      onDelete: 'cascade'
    });
  };
  
  return Event;
};