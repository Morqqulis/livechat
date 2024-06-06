import { ErrorMessage } from '@hookform/error-message'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { auth } from '../../firebase/config'
import { handleGoogleSignIn, handleLogin } from '../../utils/auth'
import { signUpEmailValidation } from './../../utils/validation'
import Button from './Button'
import { useState } from 'react'
import Spinner from './Spinner'
import { Eye } from 'lucide-react'

const Form = ({ type }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()

        if (type === 'register') {
            setIsLoading(true)
            try {
                await createUserWithEmailAndPassword(auth, data.email, data.password)

                toast.success('Successfully created user', {
                    position: 'top-right',
                    autoClose: 1500,
                    onClose: setTimeout(() => navigate('/'), 1500)
                })
                reset()
            } catch (err) {
                console.log(err.message)
                toast.error('User already exists', {
                    position: 'top-right',
                    autoClose: 1500
                })
            } finally {
                setIsLoading(false)
            }
        }

        if (type === 'login') {
            setIsLoading(true)
            try {
                await handleLogin(data.email, data.password, () => navigate('/chat'))
                reset()
            } catch (err) {
                toast.error(err.message, {
                    position: 'top-right',
                    autoClose: 1500
                })
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <form className={`grid w-full max-w-[400px] gap-5`} onSubmit={handleSubmit(onSubmit)}>
            <label className={`grid w-full gap-1`}>
                <span>Email</span>
                <input
                    className={`myInput`}
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete={'email'}
                    {...register('email', {
                        value: watch('email'),
                        ...signUpEmailValidation
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <p className={`text-red-500`}>{message}</p>}
                />
            </label>
            <label className={`grid w-full gap-1`}>
                <span>Password</span>
                <div className={'relative'}>
                    <input
                        className={`myInput !pr-12`}
                        placeholder="Password"
                        autoComplete={'current-password'}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required={true}
                        {...register('password', {
                            value: watch('password'),
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            },
                            maxLength: {
                                value: 20,
                                message: 'Password must be at most 20 characters'
                            },
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
                                message:
                                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                            }
                        })}
                    />
                    <Eye
                        className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer duration-300 hover:text-red-500`}
                        onClick={handleShowPassword}
                    />
                </div>
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <p className={`text-red-500`}>{message}</p>}
                />
            </label>
            <Button
                className={`mt-5 flex items-center justify-center gap-3`}
                onClick={handleSubmit(onSubmit)}
                type="submit"
                text={`${type === 'login' && !isLoading ? 'Sign In' : type === 'register' && !isLoading ? 'Sign Up' : 'Loading...'}`}
            >
                {isLoading && <Spinner />}
            </Button>
            {type === 'login' && (
                <Button
                    className={`mt-5 flex items-center justify-center gap-3`}
                    type="button"
                    text={!isLoading ? 'Sign In with Google' : 'Loading...'}
                    onClick={() => handleGoogleSignIn(setTimeout(navigate('/chat'), 1000))}
                >
                    {isLoading && <Spinner />}
                </Button>
            )}
            <ToastContainer />
        </form>
    )
}

export default Form
