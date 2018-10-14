'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type SensorData {
    id: ID!
    sensorId: Int
    data: Float
    date: String
    time: String
    synchronized: Boolean
  }

  type Alerts {
    id: ID!
    sensorId: Int
    typeId: Int
    operatorId: Int
    firstValue: Float
    secondValue: Float
    sent: Boolean
    enable: Boolean
  }

  type AlertTypes {
    id: ID!
    type: String
  }

  type AlertOperators {
    id: ID!
    operator: String
    twoValues: Boolean
  }

  type AlertLastChecks {
    id: ID!
    sensorTypeId: Int
    sensorDataId: Int
  }

  type Mutation {
    addSensorData (
      sensorId: Int,
      data: Float,
      date: String,
      time: String,
      synchronized: Boolean
    ): SensorData

    addAlert (
      sensorId: Int,
      typeId: Int,
      operatorId: Int,
      firstValue: Float,
      secondValue: Float,
      sent: Boolean,
      enable: Boolean
    ): Alerts

    addAlertType (
      type: String
    ): AlertTypes

    addAlertOperator (
      operator: String,
      twoValues: Boolean
    ): AlertOperators

    addAlertLastCheck (
      sensorDataId: Int,
      sensorTypeId: Int
    ): AlertLastChecks

    setSynchronized (id: Int): Boolean
  }

  type Query {
    allSensorData: [SensorData],
    allAlerts: [Alerts],
    allAlertTypes: [AlertTypes],
    allAlertOperators: [AlertOperators],
    allAlertLastChecks: [AlertLastChecks],
    allSensorDataNoSynchronized: [SensorData],
    lastSensorData: [SensorData]

    lastMinuteSensorData (
      date: String,
      time: String,
      operator: String,
      firstValue: Float,
      secondValue: Float
    ): SensorData
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
