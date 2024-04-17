import { useState, useEffect } from "react"
import { useOutletContext, useNavigate} from "react-router-dom";
import VehicleForm from "./VehicleForm";

import "../styles/MyVehicles.css"





const MyVehicle = () => {
    const [userVehicles, setUserVehicles] = useState([])
    const [toggleForm, setToggleForm] = useState(false)
    const [addedVehicle, setAddedVehicle] = useState({

    })


    const URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()
    const {user} = useOutletContext()

    
    useEffect(() => {
      const user_id = localStorage.getItem("user_id")
        const token = localStorage.getItem("token");
        if (user) {
            fetch(`${URL}/api/vehicles/${user_id}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
        .then((res) => res.json())
        .then((data) => setUserVehicles(data))
         
       };
      }, [addedVehicle])


      const handleVehicleDetails = (id) => {
        navigate(`/vehicles/${id}`)

      }

      const handleAddNew = () => {
        setToggleForm(!toggleForm)
        console.log(toggleForm)
      }





    return (
        <div>
             {toggleForm && <VehicleForm
              toggleForm={toggleForm}
              setToggleForm={setToggleForm}
              setAddedVehicle={setAddedVehicle}
              />}
            <h2 className="myVehicles-header">Here is all of your saved luxury vehicles</h2>
            <ul className="myVehicles-ul">
                {userVehicles.length > 0 ? (
                     userVehicles.map((vehicle) => (
                        <img src="https://klar-rent.com/uploads/images/cars/img-placeholder.jpg"
                        alt="vehicle img here"
                        className="myVehicles-img"
                        onClick={() => handleVehicleDetails(vehicle.vehicle_id)}
                        key={vehicle.vehicle_id}></img>
                     ))
                ) : (
                    <li className="myVehicles-li-flag"> Sorry you don't have any vehicles, Add some here</li>
                )
               
                }
          </ul>
          <button
           className="myVehicles-create-btn"
           onClick={() => handleAddNew()}
          >
            Add New
          </button>
        </div>
    )
}


export default MyVehicle