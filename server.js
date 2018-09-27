'use strict'
// TODO replace it to ES6
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./data/schema')
require('dotenv').config()

const PORT = 4000

const app = express()
app.use('*', cors({ origin: process.env.ORIGIN }))

app.use('/api', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: 'api' }))

app.listen(process.env.PORT || PORT, () => {
  console.log(`GraphiQL is running on .../graphiql`)
  console.log(process.env.ORIGIN)
})
