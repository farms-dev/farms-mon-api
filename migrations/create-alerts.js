'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AlertOperators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      operator: {
        type: Sequelize.STRING
      },
      twoValues: {
        type: Sequelize.DOUBLE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AlertOperators')
  }
}
