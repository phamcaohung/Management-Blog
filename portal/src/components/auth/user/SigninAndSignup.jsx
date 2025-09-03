import { useEffect, useState } from "react"
import './SigninAndSignup.css'
import { Avatar, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, signIn } from "../../../redux/actions/authAction";
import AuthModal from "../../modals/AuthModal";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from "../../pages/CustomStyle";
import { hideNotification, showNotification } from "../../../redux/actions/notificationAction";

const SigninAndSignup = ({ name }) => {
    const signInError = useSelector(store => store.auth?.signInError)
    const [className, setClassName] = useState(name)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [pendingData, setPendingData] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]

        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/jpg"
        ) {
            setAvatar(null)
            dispatch(showNotification("Please upload a valid image file (jpeg, jpg, png)", "error"))
        } else if (file.size > 10 * 1024 * 1024) {
            setAvatar(null)
            dispatch(showNotification("Please upload an image file less than 10MB", "error"))
        } else {
            setAvatar(file)
            dispatch(hideNotification())
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/
        if(!passwordRegex.test(formData.get("password")))
            return dispatch(showNotification("Password must contain letters and numbers", "error"))

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            avatar: avatar
        }
        setPendingData(data)
        setIsModalOpen(true)
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        dispatch(signIn(data, navigate))
    }

    useEffect(() => {
        if (signInError) {
            dispatch(showNotification(signInError, "error"))
            dispatch(clearError())
        }
    }, [signInError, dispatch])

    return (
        <div className="signin-and-signup">
            <div className={className}>
                <div className="form-container sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Sign Up</h1>
                        <TextField
                            required
                            margin="normal"
                            name="name"
                            label="Name"
                            fullWidth
                        />
                        <div className="flex justify-between w-full items-center my-2">
                            <Avatar 
                                sx={{
                                    width: 150,
                                    height: 150
                                }}
                                src={avatar ? URL.createObjectURL(avatar) : ""}
                                alt=""
                            />

                            <Button
                                startIcon={<CloudUploadIcon />}
                                component="label"
                                onChange={handleAvatarChange}
                                sx={{
                                    paddingY: 2,
                                    paddingX: 4,
                                    backgroundColor: "black",
                                    color: "white",
                                    fontWeight: 600,
                                    borderRadius: 3
                                }}
                            >
                                Upload Avatar
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </div>
                        <TextField
                            required
                            type="email"
                            margin="normal"
                            name="email"
                            label="Email"
                            fullWidth
                        />
                        <TextField
                            required
                            margin="normal"
                            name="password"
                            label="password"
                            fullWidth
                            type="password"
                        />
                        <button>Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <TextField
                            margin="normal"
                            required
                            name="email"
                            label="Email"
                            fullWidth
                            type="email"
                        />
                        <TextField
                            margin="normal"
                            name="password"
                            label="password"
                            fullWidth
                            type="password"
                            required
                        />
                        <button>Sign In</button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <button onClick={() => setClassName("container")}>
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <button onClick={() => setClassName("container active")}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AuthModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                pendingData={pendingData}
                setClassName={setClassName}
            />
        </div>
    )
}

export default SigninAndSignup