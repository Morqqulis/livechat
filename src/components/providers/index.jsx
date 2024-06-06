import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Chat from '../../pages/Chat'
import SignIn from '../../pages/Login'
import SignUp from '../../pages/Registration'

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        path: '/chat',
        element: <Chat />
    }
])
// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
    return (
        <RouterProvider className={`wrapper`} router={router}>
            {children}

            
        </RouterProvider>
    )
}

export default Provider
