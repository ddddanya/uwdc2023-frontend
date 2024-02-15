import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Office from "./pages/Office";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/office" element={<Office />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
