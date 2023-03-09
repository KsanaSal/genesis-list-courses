import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";

function App() {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Characters loading={"loading"} />} />
                <Route
                    path="details/:id"
                    element={<CharacterDetails />}
                ></Route>
            </Route>
        </Routes>
    );
}

export default App;
