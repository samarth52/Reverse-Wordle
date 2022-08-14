import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth, uiConfig } from './utils/firebase-config'
import logger from './utils/logger'

const App = () => {
  logger.info('App')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
    })
    return () => unregisterAuthObserver()
  }, [])

  return (
    <>
      <h1>hi</h1>
      {
        isLoggedIn
          ? (
            <>
              {`${auth.currentUser.email} `}
              <button type="button" onClick={() => auth.signOut()}>Log Out</button>
            </>
          )
          : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      }
    </>
  )
}

export default App
