import { Route, Routes } from "react-router-dom"
import GeneralRouter from "./router/GeneralRouter";

function App() {
    return (
        <Routes>
            <Route path='/*' element={<GeneralRouter/>}></Route>
            {/* <Route path='/admin/*' element={<AdminRouter/>}></Route> */}
        </Routes>  
    )
}

export default App
