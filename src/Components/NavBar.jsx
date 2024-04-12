import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/nav.css"

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <div className="nav-container">
      <h1>
        <Link className="nav-link nav-header-h1" to="/">
         Service & Ownership
        </Link>
      </h1>
      <div className="nav-items-container">
      <div>
        <ul className="nav-ul">
          <Link to="/vehicles" className="nav-link">
            <li className="nav-li">My Vehicles</li>
          </Link>
        </ul>
      </div>
      {!toggleLogin ? (
        <Link to={"/login"} className="nav-link nav-login-container">
          <span className="nav-btn-login">Login</span>
        </Link>
      ) : (
        <div className="nav-login-container">
          {user && <span className="nav-username-display">Hello, {user.username.toUpperCase()} | </span>}
          <Link onClick={handleLogout} className="nav-link">
            <span className="nav-btn-logout">Logout</span>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default NavBar;
