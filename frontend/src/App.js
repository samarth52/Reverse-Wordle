import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import uiConfig from './utils/firebase-config'
import logger from './utils/logger'

const App = () => {
  logger.info('App')
  return (
    <>
      <h1>hi</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  )
}

export default App
