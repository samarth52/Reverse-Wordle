import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth, uiConfig } from './utils/firebase-config'
import logger from './utils/logger'

const App = () => {
  logger.info('App')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [shareMessage, setShareMessage] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleMessageChange = (event) => {
    setShareMessage(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (name && shareMessage) {
      const toSend = {
        idToken: await auth.currentUser.getIdToken(),
        name,
        shareMessage,
      }
      logger.info(toSend)
      axios.post('/api/wordle', toSend)
    } else {
      logger.info('missing params')
    }
  }

  const handleClick = async (event) => {
    event.preventDefault()
    axios.post(
      '/api/wordle/deleteAll',
      {
        idToken: await auth.currentUser.getIdToken(),
        name,
      },
    )
  }

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
    })
    return () => unregisterAuthObserver()
  }, [])

  // auth.currentUser?.getIdToken().then((idToken) => {
  //   logger.info('in App.js', idToken)
  // })

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
                <input onChange={handleNameChange} value={name} placeholder="enter name" />
                <br />
                <textarea onChange={handleMessageChange} value={shareMessage} placeholder="enter guess" />
                <button type="submit">Submit</button>
              </form>
              <button type="button" onClick={handleClick}>Delete Guesses</button>
            </>
          )
          : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      }
    </>
  )
}

export default App
