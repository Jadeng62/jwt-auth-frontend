import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

import "../styles/vehicleDetails.css"

const VehicleDetails = () => {
    const [showDetails, setShowDetails] = useState(false)
    const [vehicle, setVehicle] = useState({})
  
    const {user} = useOutletContext()
    const {id} = useParams()
    const navigate = useNavigate()


    const URL = import.meta.env.VITE_BASE_URL;
    const savedUserId = user.id || localStorage.getItem("user_id") 




 useEffect(() => { 
   if (savedUserId) {fetch(`${URL}/api/vehicles/singleVehicle/${id}`)
    .then((res) => res.json())
    .then((data) => setVehicle(data))
    };
  }, [savedUserId])


  const handleClick = () => {
    setShowDetails(!showDetails)
  }

  const handleDelete = (e) => {
    const options = {
      method: "DELETE",
      headers: {"Content-Type":"application/json"}
    }
        fetch(`${URL}/api/vehicles/${vehicle.vehicle_id}`, options)
          .then((res) => res.json())
          .then((data) => {
          navigate("/vehicles")
    })
    .catch((err) => console.error(err))
  }

  const handleView = () => {
    alert("Feature Coming Soon")
  }

  const formatPrice = (price) => {
    const formattedNum =  +price
     return formattedNum.toLocaleString()
  }


    return (
        <div className="vehicle-card" onClick={handleClick}>
            <h2 className="vehicle-details-header">{vehicle.make}  {vehicle.model}</h2>
            <div className="vehicle-details-display-container">
            <p className="vehicle-details-display"><span className="vehicle-details-display-span">Price:</span>${formatPrice(vehicle.price)} </p>
            <p className="vehicle-details-display"><span className="vehicle-details-display-span">Engine:</span>{vehicle.engine}</p>
            <p className="vehicle-details-display"><span className="vehicle-details-display-span">HorsePower:</span>{vehicle.horsepower}hp</p>
            <p className="vehicle-details-display"><span className="vehicle-details-display-span">Torque:</span>{vehicle.torque}nm</p>
            <p className="vehicle-details-display"><span className="vehicle-details-display-span">Exterior Color:</span>{vehicle.exterior_color}</p>
            <p className="vehicle-details-display"><span className="vehicle-details-display-span">Interior Color:</span>{vehicle.interior_color}</p>
            <p className="vehicle-details-display"><span className="vehicle-details-display-span">Year:</span>{vehicle.year}</p>
            </div>
            {showDetails && (
               <div className="vehicle-details show-container">
               <span className="show-details-info"><span className="show-details-info-vin">VIN#:</span>{vehicle.vin} </span>
                <button onClick={handleView} className="vehicle-details-btn service">View Vehicle Services</button>
                <button onClick={handleDelete} className="vehicle-details-btn danger">Remove Vehicle</button>
               </div>
            )}

        </div>
    )
}

export default VehicleDetails