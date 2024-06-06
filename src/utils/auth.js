import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../firebase/config'

const provider = new GoogleAuthProvider()
// Auth with email and password

export const handleLogin = async (email, password, navigate) => {
    if (!email || !password) {
        toast.error('Please enter email and password', {
            position: 'top-right',
            autoClose: 1500
        })
    }
    try {
        await signInWithEmailAndPassword(auth, email, password)

        toast.success('Successfully logged in', {
            position: 'top-right',
            autoClose: 1500,
            onClose: navigate
        })
        
    } catch (error) {
        toast.error(`Invalid Email or Password`, {
            position: 'top-right',
            autoClose: 1500
        })
        console.log(error.message)
    }
}

// Google Auth

export const handleGoogleSignIn = async navigate => {
    try {
        await signInWithPopup(auth, provider)
        toast.success('Successfully signed in with Google!', {
            position: 'top-right',
            autoClose: 500,
            onClose: navigate
        })
    } catch (error) {
        toast.error('Error signing in with Google', {
            position: 'top-right',
            autoClose: 500
        })
    }
}

// SignOut
export const handleSignOut = async () => {
    try {
        signOut(auth)
        toast.success('Successfully signed out', {
            position: 'top-right',
            autoClose: 500
        })
    } catch (error) {
        console.log(error.message)
        toast.error('Error signing out', {
            position: 'top-right',
            autoClose: 500
        })
    }
}
