import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import axios from 'axios'

import logger from './logger'
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from './config'

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: async (authResult) => {
      logger.info('in callback (authResult)', authResult)
      logger.info('in callback (idToken):', authResult.user.multiFactor.user.accessToken)
      if (authResult.additionalUserInfo.isNewUser) {
        axios.post('/api/user/signup', {
          idToken: authResult.user.multiFactor.user.accessToken,
        })
      }
    },
  },
}

export {
  auth,
  uiConfig,
}
