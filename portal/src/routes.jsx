import { lazy } from "react";
import SigninAndSignup from "./components/auth/user/SigninAndSignup";
import Home from "./components/pages/Home";



const VerifyEmail = lazy(() => import("./components/pages/VerifyEmail"))



export const privateRoutes = [
    {
        path: "/",
        element: () => <Home />
    },
    {
        path: "/home",
        element: () => <Home />
    },
]

export const publicRoutes = [
    {
        path: "/signup",
        element: () => <SigninAndSignup name={"container active"}/>
    },
    {
        path: "/auth/verify",
        element: () => <VerifyEmail />
    },
]