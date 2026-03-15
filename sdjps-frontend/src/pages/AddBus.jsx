import { useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import { useNavigate } from "react-router-dom"

function AddBus() {

  const navigate = useNavigate()

  const [busNumber,setBusNumber] = useState("")
  const [driverName,setDriverName] = useState("")
  const [driverPhone,setDriverPhone] = useState("")
  const [capacity,setCapacity] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    try{

      await API.post("/transport/bus",{
        bus_number:busNumber,
        driver_name:driverName,
        driver_phone:driverPhone,
        capacity:capacity
      })

      alert("Bus added successfully")

      navigate("/transport")

    }catch(err){
      console.error(err)
    }

  }

  return(

    <AdminLayout>

      <h1 className="text-2xl font-bold mb-6">
        Add Bus
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-lg">

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Bus Number"
            className="w-full border p-3 rounded"
            value={busNumber}
            onChange={(e)=>setBusNumber(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Driver Name"
            className="w-full border p-3 rounded"
            value={driverName}
            onChange={(e)=>setDriverName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Driver Phone"
            className="w-full border p-3 rounded"
            value={driverPhone}
            onChange={(e)=>setDriverPhone(e.target.value)}
          />

          <input
            type="number"
            placeholder="Capacity"
            className="w-full border p-3 rounded"
            value={capacity}
            onChange={(e)=>setCapacity(e.target.value)}
            required
          />

          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
          >
            Save Bus
          </button>

        </form>

      </div>

    </AdminLayout>

  )

}

export default AddBus