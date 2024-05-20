import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword.js";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Logout from "./auth/Logout";


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/" exact element={<About />} />
        <Route path="/services" exact element={<Service />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* <Route path="/newHome" element={<newHome />} /> */}
        {/* <Route path="/res" element={<ResponsiveDrawer />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
