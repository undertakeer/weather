import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./pages/home.jsx";



const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/' />
            </Routes>
        </BrowserRouter>
    )
}

export default App