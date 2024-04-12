import { useState, useEffect } from "react";
import { useOutletContext, useParams} from "react-router-dom";

const Dashboard = ({ handleLogout, userId }) => {
  const [userVehicles, setUserVehicles] = useState([])
  const [newUserVehicle, setNewUserVehicle] = useState({
    "make": "",
    "model": "",
    "year": null,
    "vin": "",
  })


  const URL = import.meta.env.VITE_BASE_URL;
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  // console.log(`user is:`, userId)
const savedUserId = userId || localStorage.getItem("user_id") 

  useEffect(() => {
    if (savedUserId) {fetch(`${URL}/api/vehicles/${savedUserId}`)
    .then((res) => res.json())
    .then((data) => setUserVehicles(data))
   };
  }, [userId, savedUserId])





  return (
    <div className="dashboard">
      {user && (
        <h1 className="dashbord-header-h1">
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}
         <ul className="dashboard-ul">
        {userVehicles.length > 0 && userVehicles.map((vehicle) => (
        <li key={vehicle.vehicle_id} className="dashboard-li">{vehicle.make} - {vehicle.model}</li>
        
        ))}
          </ul>
      <button onClick={handleLogout} className="dashboard-logout-btn">Logout</button>
    </div>
  );
};

export default Dashboard;
