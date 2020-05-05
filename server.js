'use strict'
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./data/schema')
const resolvers = require('./data/resolvers')
require('dotenv').config()

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

const app = express()
apollo.applyMiddleware({ app })

var server = app

apollo.installSubscriptionHandlers(server)

server.listen({ port: process.env.PORT }, () =>
  console.log(
    'Server ready at',
    `http://${process.env.HOSTNAME}:${process.env.PORT}${apollo.graphqlPath}`
  )
)
