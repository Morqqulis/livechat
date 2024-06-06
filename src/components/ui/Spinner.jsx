import { Discuss } from 'react-loader-spinner'

const Spinner = ({ size }) => {
    return (
        <Discuss
            visible={true}
            height={size || 40}
            width={size || 40}
            ariaLabel="discuss-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-discuss"
            color="#ffffff"
            backgroundColor="#ffffff"
        />
    )
}

export default Spinner
