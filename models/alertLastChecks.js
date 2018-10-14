'use strict'

module.exports = (sequelize, DataTypes) => {
  var AlertLastChecks = sequelize.define('AlertLastChecks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sensorTypeId: {
      type: DataTypes.INTEGER
    },
    sensorDataId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  })
  AlertLastChecks.associate = function (models) {
    /* Polyline.belongsTo(models.LineType)
    Polyline.belongsToMany(models.Waypoint, { through: 'PolylinesWaypoints' })
    Polyline.hasMany(models.PolylinesWaypoints) */
  }
  return AlertLastChecks
}
