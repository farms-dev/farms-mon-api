'use strict'

module.exports = (sequelize, DataTypes) => {
  var Weights = sequelize.define('Weights', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    stationId: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.DOUBLE
    },
    date: {
      type: DataTypes.DATE
    },
    time: {
      type: DataTypes.TIME
    }
  }, {
    timestamps: false
  })
  Weights.associate = function (models) {
    /* Polyline.belongsTo(models.LineType)
    Polyline.belongsToMany(models.Waypoint, { through: 'PolylinesWaypoints' })
    Polyline.hasMany(models.PolylinesWaypoints) */
  }
  return Weights
}
