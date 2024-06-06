import { push, ref, set } from 'firebase/database'
import { auth, db } from '../firebase/config'
import notification from '../assets/notification.mp3'

export const sendMessage = async message => {
    if (!message) return
    const getDate = new Date()
    const time = `${getDate.getHours()}:${getDate.getMinutes()}:${getDate.getSeconds()}`
    const audio = new Audio(notification)

    try {
        const author = auth.currentUser.displayName || auth.currentUser.email

        const messageObj = {
            id: Date.now(),
            message,
            author,
            time
        }
        console.log(messageObj)
        await push(ref(db, `messages/`), messageObj)
        audio.play()
    } catch (error) {
        console.log(error.message)
    }
}
