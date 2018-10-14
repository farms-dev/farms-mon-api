'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensorId: {
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER
      },
      operatorId: {
        type: Sequelize.INTEGER
      },
      firstValue: {
        type: Sequelize.DOUBLE
      },
      secondValue: {
        type: Sequelize.DOUBLE
      },
      sent: {
        type: Sequelize.BOOLEAN
      },
      enable: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Alerts')
  }
}
