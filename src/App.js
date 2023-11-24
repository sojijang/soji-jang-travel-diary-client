import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import CountrySelection from "./pages/CountrySelection/CountrySelection";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";
import Map from "./pages/Map/Map";
import Footer from "./components/Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setCurrentUser(jwtDecode(storedToken).id);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountrySelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/calendar"
            element={<Calendar currentUser={currentUser} />}
          />
          <Route path="/map" element={<Map currentUser={currentUser} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
