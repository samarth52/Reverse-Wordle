/* eslint-disable no-console */
import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import uiConfig from './utils/firebase-config'

const App = () => {
  console.log('here')
  return (
    <>
      <h1>hi</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  )
}

export default App
