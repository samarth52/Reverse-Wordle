const admin = require('firebase-admin')
const { ADMIN_CONFIG } = require('./envConfig')
const logger = require('./logger')

admin.initializeApp({
  credential: admin.credential.cert(ADMIN_CONFIG),
})

const auth = admin.auth()
auth
  .verifyIdToken('test')
  .then((decodedToken) => logger.info(decodedToken))
module.exports = auth
