import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Items from "./pages/Items";
import Quests from "./pages/Quests";
import Navbar from "./components/Navbar";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  console.log("Token stocké :", token);


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> : <Login setToken={setToken} />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/profile" /> : <Register setToken={setToken} />}
        />
        <Route
          path="/profile"
          element={
            token ? (
              <>
                <Navbar onLogout={handleLogout} />
                <Profile token={token}/>
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/items"
          element={
            token ? (
              <>
                <Navbar onLogout={handleLogout} />
                <Items token={token}/>
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/quests"
          element={
            token ? (
              <>
                <Navbar onLogout={handleLogout} />
                <Quests token= {token} />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
