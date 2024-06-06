// eslint-disable-next-line react/prop-types
const Button = ({ text, className, children, ...props }) => {
    return (
        <button className={`rounded-xl bg-blue-500 px-4 py-2 ${className}`} {...props}>
            {text}
            {children}
        </button>
    )
}

export default Button
