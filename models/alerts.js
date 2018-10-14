'use strict'

module.exports = (sequelize, DataTypes) => {
  var Alerts = sequelize.define('Alerts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sensorId: {
      type: DataTypes.INTEGER
    },
    typeId: {
      type: DataTypes.INTEGER
    },
    operatorId: {
      type: DataTypes.INTEGER
    },
    firstValue: {
      type: DataTypes.DOUBLE
    },
    secondValue: {
      type: DataTypes.DOUBLE
    },
    sent: {
      type: DataTypes.BOOLEAN
    },
    enable: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false
  })
  Alerts.associate = function (models) {
    /* Polyline.belongsTo(models.LineType)
    Polyline.belongsToMany(models.Waypoint, { through: 'PolylinesWaypoints' })
    Polyline.hasMany(models.PolylinesWaypoints) */
  }
  return Alerts
}
