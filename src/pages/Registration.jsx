import { Link } from 'react-router-dom'
import Form from '../components/ui/Form'

const Registration = () => {
    return (
        <main>
            <section>
                <div className="container myflex">
                    <h1 className={`mb-5 text-5xl`}>Sign Up</h1>
                    <div className={`flex items-center gap-2.5`}>
                        <span>Allready have an account?</span>
                        <Link className={`text-blue-500`} to="/">
                            Sign In
                        </Link>
                    </div>
                    
                    <Form type="register" />
                </div>
            </section>
        </main>
    )
}

export default Registration
