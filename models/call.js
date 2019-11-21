module.exports = function(sequelize, DataTypes) {
    let Call = sequelize.define("Call", {
      call_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }},
        call_type: {
            type: DataTypes.STRING,
            allowNull: false,

        },
      });

      Call.associate = function(models) {
          Call.belongsTo(models.Events, {
              foriegnKey: {
                  allowNull: false
              }
          });
      };
    return Call;
  };