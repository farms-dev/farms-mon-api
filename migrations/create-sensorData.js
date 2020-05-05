'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SensorData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensorId: {
        type: Sequelize.INTEGER
      },
      data: {
        type: Sequelize.DOUBLE
      },
      date: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      synchronized: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SensorData')
  }
}
