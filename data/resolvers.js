'use strict'
// var Sequelize = require('sequelize')
// const Op = Sequelize.Op

const {
  SensorData,
  Alerts,
  AlertTypes,
  AlertOperators,
  AlertLastChecks
} = require('../models')
require('dotenv').config()

const resolvers = {
  Query: {
    async allSensorData () {
      const sensorData = await SensorData.all()
      return sensorData
    },

    async allAlerts () {
      const alerts = await Alerts.all()
      return alerts
    },

    async allAlertTypes () {
      const alertTypes = await AlertTypes.all()
      return alertTypes
    },

    async allAlertOperators () {
      const alertOperator = await AlertOperators.all()
      return alertOperator
    },

    async allAlertLastChecks () {
      const alertLastCheck = await AlertLastChecks.all()
      return alertLastCheck
    },

    async allSensorDataNoSynchronized () {
      const sensorData = await SensorData.findAll({
        where: { synchronized: false },
        order: [['id', 'ASC']]
      })
      return sensorData
    },

    async lastSensorData () {
      const sensorData = await SensorData.findAll({
        order: [['id', 'DESC']],
        limit: 1
      })
      return sensorData
    } /* ,

    async lastMinuteSensorData (_, {
      time,
      operator,
      firstValue,
      secondValue
    }) {
      let where = ''

      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()

      const hour = today.getHours() > 9 ? today.getHours() : '0' + today.getHours()
      const minute = today.getMinutes() > 9 : today.geteMinutes : '0' + today.getMinutes()

      const date = year + month + day
      const fisrtTime = hour + minute +
      const secondTime = hour + minute

      if (operator === '>=') {
        where = { where: {
          date: date,
          time: time,
          data: {
            [Op.gte]: firstValue
          },
          order: [['id']],
          limit: 1
        }}
      }
      const sensorData = await SensorData.findAll(where)
      return sensorData
    } */
  },

  Mutation: {
    async addSensorData (_, {
      sensorId,
      data,
      date,
      time,
      synchronized
    }) {
      const sensorData = await SensorData.create({
        sensorId,
        data,
        date,
        time,
        synchronized
      })
      return sensorData
    },

    async addAlert (_, {
      sensorId,
      typeId,
      operatorId,
      firstValue,
      secondValue,
      sent,
      enable
    }) {
      const alert = await Alerts.create({
        sensorId,
        typeId,
        operatorId,
        firstValue,
        secondValue,
        sent,
        enable
      })
      return alert
    },

    async addAlertType (_, {
      type
    }) {
      const alertType = await AlertTypes.create({
        type
      })
      return alertType
    },

    async addAlertOperator (_, {
      operator,
      twoValues
    }) {
      const alertOperator = await AlertOperators.create({
        operator,
        twoValues
      })
      return alertOperator
    },

    async addAlertLastCheck (_, {
      sensorTypeId,
      sensorDataId
    }) {
      const alertLastCheck = await AlertLastChecks.create({
        sensorTypeId,
        sensorDataId
      })
      return alertLastCheck
    },

    async setSynchronized (_, { id }) {
      let result = false
      let sensorData = await SensorData.findById(id)

      if (sensorData != null) {
        SensorData.update({ synchronized: true }, {
          where: { id: id }
        }).then(
          result = true
        )
      }
      return result
    }
  }

  /* Polyline: {
    async waypoint (polyline) {
      const waypoint = await polyline.getWaypoints()
      return waypoint
    }
  } */
}

module.exports = resolvers
