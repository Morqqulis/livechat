import ReactDOM from 'react-dom/client'

import Provider from './components/providers/index.jsx'
import SignIn from './pages/Login.jsx'
import './styles/index.scss'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider>
        <SignIn />
        <ToastContainer />
    </Provider>
)
