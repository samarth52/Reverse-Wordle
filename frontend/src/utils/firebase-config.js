import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from './config'
import logger from './logger'

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

logger.info(firebaseConfig)
firebase.initializeApp(firebaseConfig)

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export default uiConfig
