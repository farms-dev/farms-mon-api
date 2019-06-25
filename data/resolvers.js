'use strict'
const Sequelize = require('sequelize')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const Op = Sequelize.Op

const {
  SensorData,
  Sensors,
  Alerts,
  AlertTypes,
  AlertOperators,
  AlertLastChecks,
  Users
} = require('../models')
require('dotenv').config()

const resolvers = {
  Query: {
    async allSensorData () {
      const sensorData = await SensorData.all()
      return sensorData
    },

    async allSensors () {
      const sensors = await Sensors.all()
      return sensors
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
    },

    async lastSensorDataBySensor (_, { sensorId }) {
      const sensorData = await SensorData.findAll({
        where: { sensorId: sensorId },
        order: [['id', 'DESC']],
        limit: 1
      })
      return sensorData
    },

    async lastChecks () {
      const sensor = await Sensors.findAll({
        attributes: ['id', 'lastCheckId']
      })
      return sensor
    },

    async uncheckedDataSensor (_, { sensorId, lastCheckId }) {
      const sensorData = await SensorData.findAll({
        // attributes: ['id', 'lastCheckId']
        where: {
          sensorId: sensorId,
          id: {
            [Op.gt]: lastCheckId
          }
        }
      })
      return sensorData
    },

    async sensorDataPerDate (_, { sensorId, date }) {
      const sensorData = await SensorData.findAll({
        attributes: [
          'id',
          'data',
          // SQLite
          [Sequelize.literal("substr(date, 1, 4) || '-' || substr(date, 5, 2) || '-' || substr(date, 7, 2)"), 'date'],
          [Sequelize.literal("substr(time, 1, 2) || ':' || substr(time, 3, 2)"), 'time']
          // Mysql
          // [Sequelize.fn('date_format', Sequelize.col('date'), '%Y-%m-%d'), 'date'],
          // [Sequelize.fn('time_format', Sequelize.col('time'), '%H:%i'), 'time']
        ],
        where: {
          sensorId: sensorId,
          date: date
        }
      })
      console.log(sensorData)
      return sensorData
    },

    async uncheckedDataSensorByOperation (_, { sensorId, lastCheckId, operation, firtValue, secondValue, sent }) {
      let op = ''
      if (operation === '>') {
        op = { [Op.gt]: lastCheckId }
      }
      const sensorData = await SensorData.findAll({
        // attributes: ['id', 'lastCheckId']
        where: {
          sensorId: sensorId,
          id: op
        }
      })
      return sensorData
    },

    async alertBySensor (_, { sensorId }) {
      const alert = await Alerts.findAll({
        where: { sensorId: sensorId }
      })
      return alert
    },

    me: (_, __, { req }) => {
      if (!req.userId) {
        return null
      }

      return Users.findById(req.userId)
    }

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

    async addSensorDataServerTime (_, {
      sensorId,
      data
    }) {
      const now = new Date()
      const year = now.getFullYear()
      // TODO move this for a function
      const month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)
      const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
      const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
      const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
      const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      const synchronized = false

      let date = ''
      date = date.concat(year, month, day)
      let time = ''
      time = time.concat(hour, minute, second)

      console.log(date)
      console.log(time)

      const sensorData = await SensorData.create({
        sensorId,
        data,
        date,
        time,
        synchronized
      })
      return sensorData
    },

    async addSensors (_, {
      typeId,
      lastCheckId
    }) {
      const sensors = await Sensors.create({
        typeId,
        lastCheckId
      })
      return sensors
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
    },

    async register (_, { email, password }) {
      const hashedPassword = await bcrypt.hash(password, 10)
      await Users.create({
        email,
        password: hashedPassword
      })
      return true
    },

    async login (_, { email, password }, { res }) {
      const user = await Users.findOne({
        where: { email }
      })
      if (!user) {
        return null
      }

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        return null
      }

      const refreshToken = sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '7d'
        }
      )
      const accessToken = sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15min'
      })

      res.cookie('refresh-token', refreshToken)
      res.cookie('access-token', accessToken)

      user.logged = true
      await user.save()

      return user
    },

    async logout (_, __, { req, res }) {
      if (!req.userId) {
        return false
      }

      const user = await Users.findById(req.userId)
      if (!user) {
        return null
      }
      user.logged = false
      await user.save()

      res.clearCookie('access-token')
      res.clearCookie('refresh-token')

      return true
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
