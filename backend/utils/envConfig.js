require('dotenv').config()

const { PORT, NODE_ENV } = process.env

let ADMIN_CONFIG
if (NODE_ENV === 'PROD') {
  ADMIN_CONFIG = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }
} else if (NODE_ENV === 'DEV') {
  ADMIN_CONFIG = {
    projectId: process.env.TEST_FIREBASE_PROJECT_ID,
    privateKey: process.env.TEST_FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.TEST_FIREBASE_CLIENT_EMAIL,
  }
}

ADMIN_CONFIG.privateKey = ADMIN_CONFIG.privateKey.split('\\n').join('\n')

module.exports = {
  PORT,
  ADMIN_CONFIG,
}
