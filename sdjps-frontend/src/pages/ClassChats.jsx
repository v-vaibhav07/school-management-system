import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import { useNavigate } from "react-router-dom"

function ClassChats(){

const [classes,setClasses] = useState([])
const [students,setStudents] = useState({})
const navigate = useNavigate()

useEffect(()=>{

loadClasses()

},[])

const loadClasses = async()=>{

const res = await API.get("/chat/classes")
setClasses(res.data)

}

// load students of class
const loadStudents = async(class_id)=>{

if(students[class_id]) return

const res = await API.get(`/chat/students/${class_id}`)

setStudents(prev=>({
...prev,
[class_id]:res.data
}))

}

// assign monitor
const assignMonitor = async(class_id,student_id)=>{

await API.post("/chat/assign-monitor",{
class_id,
student_id
})

loadClasses()

}

return(

<AdminLayout>

<h1 className="text-2xl font-bold mb-6">
Class Chats
</h1>

<div className="grid md:grid-cols-3 gap-6">

{classes.map((c)=>(

<div
key={c.id}
className="bg-white rounded-xl shadow p-5"
>

<h2 className="text-lg font-bold mb-2">

🏫 Class {c.class_name}

</h2>

<p className="text-gray-600">

👨‍🏫 Teacher: {c.teacher}

</p>

<p className="text-gray-600 mb-3">

👨‍🎓 Monitor: {c.monitor}

</p>

<select
className="w-full border p-2 rounded mb-3"
onClick={()=>loadStudents(c.id)}
onChange={(e)=>assignMonitor(c.id,e.target.value)}
>

<option>Select Monitor</option>

{students[c.id]?.map((s)=>(

<option key={s.id} value={s.id}>
{s.name}
</option>

))}

</select>

<button
onClick={()=>navigate(`/class-chat/${c.id}`)}
className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
>

Open Chat

</button>

</div>

))}

</div>

</AdminLayout>

)

}

export default ClassChats