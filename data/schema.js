'use strict'
const { gql } = require('apollo-server-express')

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = gql`
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
 
    setSynchronized (id: Int): Boolean
  }

  type Query {
    allSensorData: [SensorData],
    allSensors: [Sensors],
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
    sensorDataPerDate (
      sensorId: Int,
      date: String 
    ): [SensorData]
  }
`

module.exports = typeDefs
