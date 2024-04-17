import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import "../styles/vehicleDetails.css"

const VehicleDetails = () => {
    const [showDetails, setShowDetails] = useState(false)
    const [vehicle, setVehicle] = useState({})
  
    const {user} = useOutletContext()
    const {id} = useParams()


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

  const formatPrice = (price) => {
    const formattedNum =  +price
     return formattedNum.toLocaleString()
  }


    return (
        <div className="vehicle-card" onClick={handleClick}>
            <h2 className="vehicle-details-header">{vehicle.make} - {vehicle.model}</h2>
            <p className="vehicle-details-display">Price:${formatPrice(vehicle.price)}</p>
            <p className="vehicle-details-display">Engine:{vehicle.engine}</p>
            <p className="vehicle-details-display">HorsePower:{vehicle.horsepower}hp</p>
            <p className="vehicle-details-display">Torque:{vehicle.torque}nm</p>
            <p className="vehicle-details-display">Exterior Color:{vehicle.exterior_color}</p>
            <p className="vehicle-details-display">Interior Color:{vehicle.interior_color}</p>
            <p className="vehicle-details-display">Year: {vehicle.year}</p>
            {showDetails && (
               <div className="vehicle-details">
                vin:{vehicle.vin}
               </div>
            )}

        </div>
    )
}

export default VehicleDetails