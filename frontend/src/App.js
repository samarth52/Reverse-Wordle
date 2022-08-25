import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth, uiConfig } from './utils/firebase-config'
import logger from './utils/logger'

const App = () => {
  logger.info('App')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [shareMessage, setShareMessage] = useState('')

  const handleChange = (event) => {
    setShareMessage(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    logger.info(shareMessage)
    axios.post('/api/wordle', { shareMessage })
  }

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
    })
    return () => unregisterAuthObserver()
  }, [])

  auth.currentUser?.getIdToken().then((idToken) => {
    logger.info('in App.js', idToken)
  })

  return (
    <>
      <h1>hi</h1>
      {
        isLoggedIn
          ? (
            <>
              {`${auth.currentUser.email} `}
              <button type="button" onClick={() => auth.signOut()}>Log Out</button>
              <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange} value={shareMessage} placeholder="enter guess" />
                <button type="submit">Submit</button>
              </form>
            </>
          )
          : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      }
    </>
  )
}

export default App
