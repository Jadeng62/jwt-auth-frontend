import { useState, useEffect } from "react";
import { useOutletContext, useNavigate} from "react-router-dom";

import "../styles/dashboard.css"

const Dashboard = ({ handleLogout}) => {


  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate()

  const handleClick = (e) => {
    navigate("/vehicles")
  }


  return (<>
    <div className="dashboard">
      {user && (
        <h1 className="dashbord-header-h1">
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}
    </div>
    <div className="dashboard-cards-container">
        <div className="dashboard-card one">
          <h5 className="dashboard-card-h5">Coming Soon ...</h5>
        </div>
        <div className="dashboard-card two">
          <h5 className="dashboard-card-h5" onClick={() => handleClick()}>My Vehicles</h5>
        </div>
        <div className="dashboard-card three">
          <h5 className="dashboard-card-h5">Coming Soon...</h5>
        </div>
    </div>
    </>
  );
};

export default Dashboard;
