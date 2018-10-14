'use strict'

module.exports = (sequelize, DataTypes) => {
  var AlertTypes = sequelize.define('AlertTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  AlertTypes.associate = function (models) {
    /* Polyline.belongsTo(models.LineType)
    Polyline.belongsToMany(models.Waypoint, { through: 'PolylinesWaypoints' })
    Polyline.hasMany(models.PolylinesWaypoints) */
  }
  return AlertTypes
}
