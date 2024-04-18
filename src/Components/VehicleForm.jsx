import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import "../styles/vehicleForm.css"

const VehicleForm = ({toggleForm, setToggleForm, setAddedVehicle}) => {
    const { user } = useOutletContext();
    
    const [newVehicle, setNewVehicle] = useState({
        user_id: localStorage.getItem("user_id"),
        make: "",
        model: "",
        year: "",
        vin: "",
        engine: "",
        horsepower: "",
        price: "",
        exterior_color: "",
        interior_color: "",
        custom: "",
        torque: "",
        img: ""
    })

    const URL = import.meta.env.VITE_BASE_URL



    const handleChange = (e) => {
        setNewVehicle({...newVehicle, [e.target.id]: e.target.value})
    }

    const handleCancel = () => {
        setNewVehicle({
            user_id: localStorage.getItem("user_id"),
            make: "",
            model: "",
            year: "",
            vin: "",
            engine: "",
            horsepower: "",
            price: "",
            exterior_color: "",
            interior_color: "",
            custom: "",
            torque: "",
            img: ""
        });

       setToggleForm(!toggleForm)
    } 

    const handleSubmit = (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            body: JSON.stringify(newVehicle),
            headers: {"Content-Type":"application/json"}
        }
        fetch(`${URL}/api/vehicles`, options)
        .then((res) => res.json())
        .then((data) => {
           setAddedVehicle(data)
        });

        setNewVehicle({
            user_id: localStorage.getItem("user_id"),
            make: "",
            model: "",
            year: "",
            vin: "",
            engine: "",
            horsepower: "",
            price: "",
            exterior_color: "",
            interior_color: "",
            custom: "",
            torque: "",
            img: ""
        });

       setToggleForm(!toggleForm)
    }


   if (!toggleForm) return null;

    return (
    <div className="vehicle-form-container">
      <form onSubmit={handleSubmit} className="vehicle-form">
      <h3 className="vehicle-form-header-h1">Add your vehicle details</h3>
        <label htmlFor="make">
          <input
            id="make"
            value={newVehicle.make}
            type="text"
            required
            placeholder="Vehicle Make"
            onChange={handleChange}
            className="vehicle-form-input"
          />
        </label>

        <label htmlFor="model">
          <input
            id="model"
            required
            value={newVehicle.model}
            type="text"
            placeholder="Vehicle Model"
            onChange={handleChange}
            className="vehicle-form-input"
          />
        </label>
        
        <label htmlFor="year">
            <input 
            id="year"
            required
            value={newVehicle.year}
            type="number"
            placeholder="Enter Year"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="vin">
            <input 
            id="vin"
            required
            value={newVehicle.vin}
            type="text"
            placeholder="Enter Vin #"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="engine">
            <input 
            id="engine"
            required
            value={newVehicle.engine}
            type="text"
            placeholder="Enter Engine type"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="horsepower">
            <input 
            id="horsepower"
            value={newVehicle.horsepower}
            type="text"
            placeholder="Enter HorsePower(If Known)"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="price">
            <input 
            id="price"
            required
            value={newVehicle.price}
            type="number"
            placeholder="Enter Amount"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="exterior_color">
            <input 
            id="exterior_color"
            required
            value={newVehicle.exterior_color}
            type="text"
            placeholder="Enter Exterior Color"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="interior_colorr">
            <input 
            id="interior_color"
            required
            value={newVehicle.interior_color}
            type="text"
            placeholder="Enter Interior Color"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="custom">
            <input 
            id="custom"
            value={newVehicle.custom}
            type="text"
            placeholder="Enter any custom mods or packages"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="torque"> 
            <input 
            id="torque"
            value={newVehicle.torque}
            type="number"
            placeholder="Enter Newton Meters of Torque(If Known)"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <label htmlFor="img">
            <input 
            id="img"
            value={newVehicle.img}
            type="text"
            placeholder="Enter a photo of vehicle"
            onChange={handleChange}
            className="vehicle-form-input"
            />
        </label>

        <div className="vehicle-form-btn-container">
        <button onClick={handleSubmit} className="vehicle-form-btn">Submit</button>
        <button onClick={handleCancel} className="vehicle-form-btn danger">Cancel</button>
        </div>
      </form>
    </div>
    )
}

export default VehicleForm