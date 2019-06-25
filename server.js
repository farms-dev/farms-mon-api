'use strict'
// TODO replace it to ES6
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./data/schema')
const cookieParser = require('cookie-parser')
const { verify } = require('jsonwebtoken')
const { createTokens } = require('./auth')
const { Users } = require('./models')

require('dotenv').config()

const PORT = 4000

const app = express()
app.use('*', cors({ origin: process.env.ORIGIN }))
app.use(cookieParser())

app.use(async (req, res, next) => {
  const refreshToken = req.cookies['refresh-token']
  const accessToken = req.cookies['access-token']
  if (!refreshToken && !accessToken) {
    return next()
  }

  try {
    const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    req.userId = data.userId
    return next()
  } catch (error) {}

  if (!refreshToken) {
    return next()
  }

  let data

  try {
    data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  } catch (error) {
    return next()
  }

  const user = await Users.findById(data.userId)
  // token has been invalidated
  if (!user || !user.logged) {
    return next()
  }

  const tokens = createTokens(user)

  res.cookie('refresh-token', tokens.refreshToken)
  res.cookie('access-token', tokens.accessToken)
  req.userId = user.id

  next()
})

app.use('/api', [bodyParser.json(), cookieParser()], graphqlExpress((req, res) => ({ schema, context: { req, res } })))
app.use('/graphiql', graphiqlExpress({ endpointURL: 'api' }))

app.listen(process.env.PORT || PORT, () => {
  console.log(`GraphiQL is running on .../graphiql`)
  console.log(process.env.ORIGIN)
})
