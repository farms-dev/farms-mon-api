'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Weights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stationId: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.DOUBLE
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.TIME
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Weights')
  }
}
