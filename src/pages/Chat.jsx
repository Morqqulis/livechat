import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref, remove } from 'firebase/database'
import { SendHorizontal, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import { auth, db } from '../firebase/config'
import { handleSignOut } from '../utils/auth'
import { sendMessage } from '../utils/message'

const Chat = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [messageList, setMessageList] = useState({})
    const { register, handleSubmit, reset } = useForm()
    const navigation = useNavigate()
    const messagesEndRef = useRef(null)

    const handleQuit = () => {
        handleSignOut()
        navigation('/')
    }

    const fetchMessages = async () => {
        setIsLoading(true)
        const messageRef = ref(db, 'messages')
        onValue(messageRef, data => {
            const messagesData = data.val()
            setMessageList(messagesData)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => !currentUser && navigation('/'))
        fetchMessages()
    }, [auth])

    useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messageList])

    const onSubmit = (data, e) => {
        e.preventDefault()
        if (!data.message) return

        sendMessage(data.message)
        fetchMessages()
        reset()
    }

    const removeMessage = async index => {
        const id = Object.keys(messageList)[index]
        await remove(ref(db, `messages/${id}`))
        fetchMessages()
    }

    return (
        <section>
            <div className="container myflex">
                <h1 className={`mb-10 text-5xl font-bold`}>Chat</h1>

                {isLoading ? (
                    <Spinner size={150} />
                ) : (
                    <>
                        <div className={`flex min-h-[80vh] w-full flex-col gap-5`}>
                            {messageList &&
                                Object.values(messageList).map((item, index) => (
                                    <div
                                        className={`grid w-full max-w-[50%] odd:ml-auto odd:justify-end even:mr-auto`}
                                        key={index}
                                    >
                                        <div
                                            className={`grid rounded-xl ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex max-w-[150px] items-center justify-between gap-2`}>
                                                <span className={`text-xs text-red-500`}>{item.time}</span>
                                                <Trash2
                                                    className={`cursor-pointer duration-300 hover:text-red-500`}
                                                    size={16}
                                                    onClick={() => removeMessage(index)}
                                                />
                                            </div>

                                            <h2 className={`text-xl text-green-500`}>{item.author}</h2>
                                        </div>
                                        <p className={`w-full`}>{item.message}</p>
                                    </div>
                                ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className={`w-full py-10`} onSubmit={handleSubmit(onSubmit)}>
                            <div className={`relative flex w-full items-center gap-2`}>
                                <Button
                                    className={`whitespace-nowrap bg-red-600 py-4`}
                                    text="Sign Out"
                                    onClick={handleQuit}
                                    type="button"
                                />
                                <label className={`w-full`}>
                                    <input
                                        className={`myInput w-full rounded-xl pr-[50px]`}
                                        placeholder="Message"
                                        required
                                        name={'message'}
                                        autoFocus
                                        type="text"
                                        min={{
                                            value: 2,
                                            message: 'Message must be at least 3 characters'
                                        }}
                                        {...register('message')}
                                    />
                                </label>
                                <SendHorizontal
                                    className={`-translate-x-[50px]`}
                                    size={40}
                                    onClick={handleSubmit(onSubmit)}
                                />
                            </div>
                        </form>
                    </>
                )}
            </div>
        </section>
    )
}

export default Chat
