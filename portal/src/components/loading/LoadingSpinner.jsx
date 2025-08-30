import RefreshIcon from '@mui/icons-material/Refresh';

const LoadingSpinner = ({ loadingText }) => {
    return (
        <div className="flex justify-center items-center">
            <span className="mr-2">
                <p>{loadingText ? loadingText : "Just a moment..."}</p>
            </span>
            <div className="flex justify-center items-center">
                <RefreshIcon className='animate-spin'/>
            </div>
        </div>
    )
}

export default LoadingSpinner