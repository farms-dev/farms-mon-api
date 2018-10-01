'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Weights {
    id: ID!
    stationId: Int
    weight: Float
    date: String
    time: String
    synchronized: Boolean
  }

  type Mutation {
    addWeight (
      stationId: Int,
      weight: Float,
      date: String,
      time: String,
      synchronized: Boolean
    ): Weights

    setSynchronized (id: Int): Boolean
  }

  type Query {
    allWeights: [Weights],
    allWeightsNoSynchronized: [Weights],
    lastWeight: [Weights]
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
