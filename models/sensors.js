'use strict'

module.exports = (sequelize, DataTypes) => {
  var Sensors = sequelize.define('Sensors', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER
    },
    lastCheckId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  })
  Sensors.associate = function (models) {}
  return Sensors
}
