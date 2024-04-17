import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/loginPage.css"

const URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToggleLogin, setUserId }) => {
  const [user, setUser] = useState({ username: "", password: ""});
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      console.log(`${URL}/api/auth/login`)
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();
           setUserId(data.user.user_id)
      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user.user_id);
        await setToggleLogin(true);
        navigate("/dashboard");
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "demo", password: "password" };
    postFetch(user);
  }

  return (
    <div className="login-container">
      <h1 className="login-header-h1">Login or Sign-Up</h1>
      <button onClick={handleDemoSignIn} className="login-btn">Demo User <span>(For developer use only !!!)</span></button>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            autoComplete="username"
            onChange={handleChange}
            className="login-form-input"
          />
        </label>

        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={handleChange}
            autoComplete="current-password"
            className="login-form-input"
          />
        </label>
        <button className="login-btn">Submit</button>
      </form>
      <p className="register-p">
        No Account? <Link to="/register" className="login-register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
