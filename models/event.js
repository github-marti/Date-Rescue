module.exports = function (sequelize, DataTypes) {
  let Events = sequelize.define("Events", {
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
    shortid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Events.associate = function (models) {
    Events.hasOne(models.Call, {
      onDelete: 'cascade'
    });
  };

  Events.associate = function (models) {
    Events.hasOne(models.Text, {
      onDelete: 'cascade'
    });
  };
  return Events;
};