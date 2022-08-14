const admin = require('firebase-admin')
const { ADMIN_CONFIG } = require('./envConfig')

admin.initializeApp({
  credential: admin.credential.cert(ADMIN_CONFIG),
})

const auth = admin.auth()
module.exports = auth
