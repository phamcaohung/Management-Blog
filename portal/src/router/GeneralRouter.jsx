import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SigninAndSignup from "../components/auth/user/SigninAndSignup";
import VerifyEmail from "../components/pages/VerifyEmail";
import Home from "../components/pages/Home";
import { useSelector } from "react-redux";
import Navbar from "../components/pages/Navbar";
import Profile from "../components/profile/Profile";
import SaveBlogs from "../components/saveBlog/SaveBlogs";
import NotificationModal from "../components/modals/NotificationModal";
import { useEffect } from "react";


const GeneralRouter = () => {
    const user = useSelector(store => store.auth?.user)
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    
    return (
        <div>
            <NotificationModal />
            {!user ? (
                <Routes>
                    <Route path="/signin" element={<SigninAndSignup name={"container"} />} />
                    <Route path="/auth/verify" element={<VerifyEmail />}/>
                    <Route path="*" element={<Navigate to="/signin" />} />
                </Routes>
            ) : (
                <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile/:userId" element={<Profile />} />
                        <Route path="/saved" element={<SaveBlogs />} />
                    </Routes>
                </>
            )}
        </div>
    )
}

export default GeneralRouter