import { useState, useEffect } from "react";
import { useOutletContext, useParams} from "react-router-dom";

const Dashboard = ({ handleLogout}) => {


  const { user } = useOutletContext(); // Access user data provided by the Outlet's context


  return (
    <div className="dashboard">
      {user && (
        <h1 className="dashbord-header-h1">
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
