import {useEffect,useState} from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

function AdminAnnouncements(){

const [announcements,setAnnouncements] = useState([])
const [message,setMessage] = useState("")
const [target,setTarget] = useState("students")

const fetchAnnouncements = async ()=>{

const res = await API.get("/announcements/admin-feed")
setAnnouncements(res.data)

}

const sendAnnouncement = async ()=>{

await API.post("/announcements",{
message,
target_type:target
})

setMessage("")
fetchAnnouncements()

}

useEffect(()=>{
fetchAnnouncements()
},[])

return(

<AdminLayout>

<div className="p-6 space-y-6">

<h1 className="text-2xl font-bold">
Announcements
</h1>

{/* SEND BOX */}

<div className="bg-white border rounded-xl p-5 shadow-sm space-y-3">

<select
value={target}
onChange={(e)=>setTarget(e.target.value)}
className="border p-2 rounded w-full"
>

<option value="students">All Students</option>
<option value="teachers">All Teachers</option>

</select>

<textarea
value={message}
onChange={(e)=>setMessage(e.target.value)}
className="border w-full p-3 rounded"
placeholder="Write announcement..."
/>

<button
onClick={sendAnnouncement}
className="bg-indigo-600 text-white px-5 py-2 rounded"
>
Send
</button>

</div>

{/* ANNOUNCEMENT FEED */}

<div className="space-y-4">

{announcements.map(a=>(
<div
key={a.id}
className="bg-white border p-4 rounded-xl shadow-sm"
>

<div className="flex justify-between">

<p className="font-semibold">
{a.users?.full_name}
</p>

{a.is_pinned && (
<span className="text-yellow-500 text-sm">
📌 pinned
</span>
)}

</div>

<p className="mt-2 text-gray-700">
{a.message}
</p>

<p className="text-xs text-gray-400 mt-2">
{new Date(a.created_at).toLocaleString()}
</p>

</div>
))}

</div>

</div>

</AdminLayout>

)

}

export default AdminAnnouncements