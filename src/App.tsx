import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Courses from "./pages/Courses";
import LessonsCourse from "./pages/LessonsCourse";

function App() {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Courses loading={"loading"} />} />
                <Route path="details/:id" element={<LessonsCourse />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
