import { Alert } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hideNotification } from "../../redux/actions/notificationAction"


const NotificationModal = () => {
    const notification = useSelector(store => store.notification)

    const dispacth = useDispatch()

    const handleClose = () => {
        dispacth(hideNotification())
    }

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                dispacth(hideNotification())
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [notification, dispacth])

    return (
        <>
            {notification.message &&
                <div
                    className={`
                    fixed top-0 left-1/2 -translate-x-1/2 mt-5 transition-all duration-500
                    z-2000 ${notification ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} 
                `}
                >
                    <Alert
                        severity={notification.severity}
                        className="w-[600px] flex justify-center items-center"
                        sx={{
                            ".MuiAlert-icon .MuiSvgIcon-root": {
                                fontSize: 40
                            }
                        }}
                    >
                        <div className="flex justify-center items-center">
                            <h3 className="mr-5 text-center text-xl">
                                {notification.message}
                            </h3>
                            <button
                                onClick={handleClose}
                                className={`cursor-pointer font-bold  ${notification.severity === "error" ? 'bg-red-300 hover:bg-red-500' : 'bg-green-300 hover:bg-green-500'}`}
                            >
                                OK
                            </button>
                        </div>
                    </Alert>
                </div>
            }
        </>
    )
}

export default NotificationModal