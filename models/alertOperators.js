'use strict'

module.exports = (sequelize, DataTypes) => {
  var AlertOperators = sequelize.define('AlertOperators', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    operator: {
      type: DataTypes.STRING
    },
    twoValues: {
      type: DataTypes.DOUBLE
    }
  }, {
    timestamps: false
  })
  AlertOperators.associate = function (models) {
    /* Polyline.belongsTo(models.LineType)
    Polyline.belongsToMany(models.Waypoint, { through: 'PolylinesWaypoints' })
    Polyline.hasMany(models.PolylinesWaypoints) */
  }
  return AlertOperators
}
