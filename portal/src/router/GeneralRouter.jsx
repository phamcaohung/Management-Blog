import { Navigate, Route, Routes } from "react-router-dom";
import SigninAndSignup from "../components/auth/user/SigninAndSignup";
import VerifyEmail from "../components/pages/VerifyEmail";
import Home from "../components/pages/Home";
import { useSelector } from "react-redux";
import Navbar from "../components/pages/Navbar";
import Profile from "../components/profile/Profile";
import SaveBlogs from "../components/saveBlog/SaveBlogs";




const GeneralRouter = () => {
    const user = useSelector(store => store.auth?.user)
    
    return (
        <div>
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
                        <Route path="/save" element={<SaveBlogs />} />
                    </Routes>
                </>
            )}
        </div>
    )
}

export default GeneralRouter