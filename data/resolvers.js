'use strict'
// var Sequelize = require('sequelize')

const {
  Weights
} = require('../models')
require('dotenv').config()

const resolvers = {
  Query: {
    async allWeights () {
      const weights = await Weights.all()
      return weights
    }
  },

  Mutation: {
    async addWeight (_, {
      stationId,
      weight,
      date,
      time
    }) {
      const weights = await Weights.create({
        stationId,
        weight,
        date,
        time
      })
      return weights
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
