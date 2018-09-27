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
  }

  type Mutation {
    addWeight (
      stationId: Int,
      weight: Float,
      date: String,
      time: String
    ): Weights
  }

  type Query {
    allWeights: [Weights]
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
