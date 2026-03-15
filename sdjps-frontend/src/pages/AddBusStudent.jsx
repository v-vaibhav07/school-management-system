import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import { useNavigate } from "react-router-dom"

function AddBusStudent(){

const navigate = useNavigate()

const [students,setStudents] = useState([])
const [buses,setBuses] = useState([])

const [studentId,setStudentId] = useState("")
const [busId,setBusId] = useState("")
const [pickupAddress,setPickupAddress] = useState("")

useEffect(()=>{

loadStudents()
loadBuses()

},[])

const loadStudents = async()=>{

const res = await API.get("/student")
setStudents(res.data)

}

const loadBuses = async()=>{

const res = await API.get("/transport/buses")
setBuses(res.data)

}

const handleSubmit = async(e)=>{

e.preventDefault()

try{

await API.post("/transport/bus-student",{

student_id:studentId,
bus_id:busId,
pickup_address:pickupAddress

})

alert("Student assigned to bus")

navigate("/transport")

}catch(err){

console.error(err)

}

}

return(

<AdminLayout>

<h1 className="text-2xl font-bold mb-6">
Assign Student To Bus
</h1>

<div className="bg-white p-6 rounded-xl shadow max-w-lg">

<form onSubmit={handleSubmit} className="space-y-4">

<select
className="w-full border p-3 rounded"
value={studentId}
onChange={(e)=>setStudentId(e.target.value)}
required

>

<option value="">Select Student</option>

{students.map((s)=>(
<option key={s.id} value={s.id}>
{s.users.full_name}
</option>
))}

</select>

<select
className="w-full border p-3 rounded"
value={busId}
onChange={(e)=>setBusId(e.target.value)}
required

>

<option value="">Select Bus</option>

{buses.map((b)=>(

<option key={b.id} value={b.id}>
{b.bus_number}
</option>
))}

</select>

<input
type="text"
placeholder="Pickup Address"
className="w-full border p-3 rounded"
value={pickupAddress}
onChange={(e)=>setPickupAddress(e.target.value)}
required
/>

<button
className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"

>

Assign Bus

</button>

</form>

</div>

</AdminLayout>

)

}

export default AddBusStudent
