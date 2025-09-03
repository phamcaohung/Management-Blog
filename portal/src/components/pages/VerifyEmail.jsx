import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../config/apiConfig";
import { TextField } from "@mui/material";
import LoadingSpinner from "../loading/LoadingSpinner";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notificationAction";


const VerifyEmail = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const codeFromUrl = searchParams.get("code")
    const emailFromUrl = searchParams.get("email")
    const email = location.state ? location.state : emailFromUrl
    const dispatch = useDispatch()

    const [code, setCode] = useState(codeFromUrl ? codeFromUrl : "")
    const [loading, setLoading] = useState(false)
    const [verifyEmail, setVerifyEmail] = useState(false)

    const handleVerify = useCallback(async () => {
        try {
            setLoading(true)
            const res = await API.get(`/users/auth/verify?code=${code}&email=${email}`)
            if (res.status === 200) {
                dispatch(showNotification(
                    res.message, 
                    res.message === 'Email verification process was successful' ? 'success' : 'error'
                ))
                setNotification(res.message)
                setVerifyEmail(true)
                setCode("")
                setLoading(false)
            }
        } catch (e) {
            dispatch(showNotification("Verification failed", "error"))
            setLoading(false)
        }
    }, [code, email, navigate, setLoading])

    useEffect(() => {
        if (codeFromUrl && emailFromUrl) {
            handleVerify()
        }
    }, [codeFromUrl, emailFromUrl, handleVerify])

    return (
        <div className="flex justify-center items-center h-[100vh] bg-[#111827] bg-gradient-to-r from-[#111827] to-[#aeafb5]">
            <div className="bg-white rounded-2xl w-[800px] h-[550px] flex items-center justify-center">
                <div className="px-20">
                    {verifyEmail ? (
                        <>
                            <h1 className="text-green-600">
                                Congratulations!
                            </h1>
                            <p className="text-gray-600 my-5">
                                Your email has been verified and your account has been created
                                successfully.
                            </p>
                            <button
                                onClick={() => navigate("/signin")}
                                className="w-full bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                            >
                                <p className="text-white font-semibold cursor-pointer">Login Now</p>
                            </button>
                        </>
                    ) : (
                        <>
                            <h1>Verify your email address</h1>
                            {!codeFromUrl && !emailFromUrl && (
                                <p className="my-5">
                                    A verification code was sent to your email address. Please either
                                    <span className="font-bold"> follow </span>
                                    the link in the email or
                                    <span className="font-bold"> enter </span>
                                    the code below.
                                </p>
                            )}
                            <div className="my-5">
                                <TextField
                                    required
                                    value={code}
                                    label="Code"
                                    onChange={(e) => setCode(e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <button
                                disabled={loading}
                                className="bg-black text-white hover:bg-blue-400 hover:text-black cursor-pointer"
                                onClick={handleVerify}
                            >
                                {loading ? (
                                    <LoadingSpinner loadingText={"Verifying..."} />
                                ) : (
                                    <p className="font-semibold">Verify</p>
                                )}
                            </button>
                            <button
                                className="ml-4 rounded-lg text-gray-800 hover:bg-red-400 hover:text-white cursor-pointer"
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >
                                <p className="font-semibold">Cancel</p>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
