const { sign } = require('jsonwebtoken')
require('dotenv').config()

const createTokens = (user) => {
  const refreshToken = sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d'
    }
  )
  const accessToken = sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15min'
  })

  return { refreshToken, accessToken }
}

module.exports = createTokens
