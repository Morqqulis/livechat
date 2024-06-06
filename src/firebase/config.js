import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyCDyrTC_UbKQw_FrHrs9OyP4LpXC1l4FTc',
    authDomain: 'live-chat-82c81.firebaseapp.com',
    projectId: 'live-chat-82c81',
    storageBucket: 'live-chat-82c81.appspot.com',
    messagingSenderId: '268540843119',
    appId: '1:268540843119:web:5849f668aaa3a11b75e99a',
    measurementId: 'G-6L32EH9XCB',
    databaseURL: 'https://live-chat-82c81-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getDatabase(app)

export { app, auth, db }
