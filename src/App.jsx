import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import MyVehicle from "./Components/MyVehicles";



// Preset user pswd : bcrypt_hash_of_password

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);
  const [userId, setUserId] = useState(null)
   
  useEffect(() => {
   if (localStorage.getItem("user_id")) {
    setUserId(localStorage.getItem("user_id"))
   }
  },[])

  async function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    
    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} setUserId={setUserId}/>}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />

        <Route element={<ProtectedRoute />}>
         <Route path="/vehicles" element={<MyVehicle />}/>
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} userId={userId}/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
