import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Form from '../components/ui/Form'

const Login = () => {
    return (
        <section>
            <div className="container flex flex-col items-center justify-center min-h-screen">
                <h1 className={`mb-5 text-center text-5xl`}>Welcome To Live Chat</h1>
                <div className={`mb-10 flex items-center gap-2.5`}>
                    <span>New to this site?</span>
                    <Link className={`text-blue-500`} to="/sign-up">
                        Sign Up
                    </Link>
                </div>
                <Form type="login" />
            </div>
        </section>
    )
}

export default Login
