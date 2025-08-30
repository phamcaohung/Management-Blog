import { Alert } from "@mui/material"
import { useEffect, useState } from "react"


const NotificationModal = ({ notification, severity, setNotification }) => {
    const [visible, setVisible] = useState(false)

    const handleClose = () => {
        setVisible(false)
        setNotification(null)
    }

    useEffect(() => {
        if (notification) {
            setVisible(true)
            const timer = setTimeout(() => setVisible(false), 10 * 1000)
            return () => clearTimeout(timer)
        } else 
            setVisible(false)
    }, [notification])

    return (
        <div
            className={`
                    fixed top-0 left-1/2 -translate-x-1/2 mt-5 transition-all duration-500
                    z-50 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} 
                `}
        >
            <Alert
                severity={severity}
                className="w-[600px] flex justify-center items-center"
                sx={{
                    ".MuiAlert-icon .MuiSvgIcon-root": {
                        fontSize: 40
                    }
                }}
            >
                <div className="flex justify-center items-center">
                    <h3 className="mr-5 text-center text-xl">
                        {notification}
                    </h3>
                    <button
                        onClick={handleClose}
                        className={`cursor-pointer font-bold  ${severity === "error" ? 'bg-red-300 hover:bg-red-500' : 'bg-green-300 hover:bg-green-500' }`}
                    >
                        OK
                    </button>
                </div>
            </Alert>
        </div>
    )
}

export default NotificationModal