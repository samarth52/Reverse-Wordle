import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBnPbaHERKfkHYSZP0vzY8s2Bsgq67Sw34',
  authDomain: 'reverse-wordle.firebaseapp.com',
  projectId: 'reverse-wordle',
  storageBucket: 'reverse-wordle.appspot.com',
  messagingSenderId: '31377035831',
  appId: '1:31377035831:web:74d47bfd521cf1faa5a5b2',
}

firebase.initializeApp(firebaseConfig)

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export default uiConfig
