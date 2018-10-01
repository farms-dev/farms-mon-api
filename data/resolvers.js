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
    },

    async allWeightsNoSynchronized () {
      const weights = await Weights.findAll({
        where: { synchronized: false },
        order: [['id', 'ASC']]
      })
      return weights
    },

    async lastWeight () {
      const weights = await Weights.findAll({
        order: [['id', 'DESC']],
        limit: 1
      })
      return weights
    }

  },

  Mutation: {
    async addWeight (_, {
      stationId,
      weight,
      date,
      time,
      synchronized
    }) {
      const weights = await Weights.create({
        stationId,
        weight,
        date,
        time,
        synchronized
      })
      return weights
    },

    async setSynchronized (_, { id }) {
      let result = false
      let weight = await Weights.findById(id)

      if (weight != null) {
        Weights.update({ synchronized: true }, {
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
