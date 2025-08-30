import { Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../redux/actions/authAction";
import LoadingSpinner from "../loading/LoadingSpinner";
import { useState } from "react";


const AuthModal = ({ isModalOpen, setIsModalOpen, pendingData, setClassName }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleSignUp = async (verify) => {
        setLoading(true)
        await dispatch(signUp(pendingData, navigate, verify))
        setLoading(false)
        handleCloseModal()
        setClassName("container")
    }

    return (
        <Modal open={isModalOpen} onClose={() => handleCloseModal(false)}>
            <div className="bg-white p-8 rounded-xl max-w-lg w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h6 className="text-3xl font-bold mb-4 text-black text-center">
                    Email Verification
                </h6>
                <p className="mb-3 font-semibold">
                    To help protect your account, would you like to enable email verification?
                </p>
                <ul className="list-disc list-inside mb-6 text-xl">
                    <li>If you choose Yes, we will send you a verification email. You’ll need to confirm it before signing in.</li>
                    <li>If you choose No, you can sign in immediately, but your account will be less secure.</li>
                </ul>
                <div className="flex justify-end">
                    <button
                        onClick={() => handleSignUp(false)}
                        className="bg-black text-white font-semibold text-lg cursor-pointer mr-5"
                    >
                        No, thanks
                    </button>
                    <button
                        onClick={() => handleSignUp(true)}
                        className="text-black cursor-pointer hover:underline border border-black"
                    >

                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <p className="font-semibold text-lg">Yes, enable</p>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default AuthModal