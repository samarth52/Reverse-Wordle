const admin = require('firebase-admin')
const { ADMIN_CONFIG } = require('./envConfig')
const logger = require('./logger')

admin.initializeApp({
  credential: admin.credential.cert(ADMIN_CONFIG),
})

const auth = admin.auth()

const decodeIdToken = async (idToken) => {
  const decodedToken = await auth.verifyIdToken(idToken)
  logger.info(decodedToken)
  return decodedToken.user_id
}

module.exports = decodeIdToken
