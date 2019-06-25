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

  type Sensors {
    id: ID!
    typeId: Int
    lastCheckId: Int
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

  type Users {
    id: ID!
    email: String
  }

  type Mutation {
    addSensorData (
      sensorId: Int,
      data: Float,
      date: String,
      time: String,
      synchronized: Boolean
    ): SensorData

    addSensorDataServerTime (
      sensorId: Int,
      data: Float
    ): SensorData

    addSensors (
      typeId: Int,
      lastCheckId: Int
    ): Sensors
 
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

    register(
      email: String!, 
      password: String!
    ): Boolean!

    login(
      email: String!, 
      password: String!
    ): Users

    logout: Boolean!

    setSynchronized (id: Int): Boolean
  }

  type Query {
    allSensorData: [SensorData],
    allSensors: [Sensors],
    allAlerts: [Alerts],
    allAlertTypes: [AlertTypes],
    allAlertOperators: [AlertOperators],
    allAlertLastChecks: [AlertLastChecks],
    allSensorDataNoSynchronized: [SensorData],
    lastSensorData: [SensorData],
    lastSensorDataBySensor (sensorId: Int): [SensorData],
    lastChecks: [Sensors],
    uncheckedDataSensor (
      sensorId: Int,
      lastCheckId: Int
    ): [SensorData],
    uncheckedDataSensorByOperation (
      sensorId: Int,
      lastCheckId: Int,
      operation: String,
      firtValue: Float,
      secondValue: Float,
      sent: Boolean 
    ): [SensorData],
    alertBySensor (sensorId: Int): [Alerts],
    sensorDataPerDate (
      sensorId: Int,
      date: String 
    ): [SensorData],
    me: Users
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
