module.exports = function(sequelize, DataTypes) {
    let Locations = sequelize.define("Locations", {
      location_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location_state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location_zip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      angel_shot: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location_like: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location_dislike: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }},
      {timestamps: false
      });
      return Locations
    }