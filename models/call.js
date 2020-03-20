module.exports = function (sequelize, DataTypes) {
  let Call = sequelize.define("Call", {
    call_utc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    call_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Call.associate = function (models) {
    Call.belongsTo(models.Event, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Call;
};