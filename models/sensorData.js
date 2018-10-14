'use strict'

module.exports = (sequelize, DataTypes) => {
  var SensorData = sequelize.define('SensorData', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sensorId: {
      type: DataTypes.INTEGER
    },
    data: {
      type: DataTypes.DOUBLE
    },
    date: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.STRING
    },
    synchronized: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false
  })
  SensorData.associate = function (models) {
    /* Polyline.belongsTo(models.LineType)
    Polyline.belongsToMany(models.Waypoint, { through: 'PolylinesWaypoints' })
    Polyline.hasMany(models.PolylinesWaypoints) */
  }
  return SensorData
}
