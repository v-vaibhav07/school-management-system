import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

function ClassFeesPage(){

const { class_id } = useParams()

const [students,setStudents] = useState([])

useEffect(()=>{
fetchStudents()
},[])

const fetchStudents = async()=>{

const res = await API.get(`/fees/admin/class-students/${class_id}`)

setStudents(res.data)

}

const sendReminder = async(student_id)=>{

await API.post("/fees/admin/send-reminder",{
student_id
})

alert("Reminder Sent")

}

return(

<AdminLayout>

<h1 className="text-2xl font-bold mb-6">
Class Students Fees
</h1>

<div className="bg-white shadow rounded-xl p-5">

<table className="w-full">

<thead>

<tr className="border-b">

<th className="text-left py-2">Student</th>

<th className="text-left py-2">Paid</th>

<th className="text-left py-2">Remaining</th>

<th className="text-left py-2">Action</th>

</tr>

</thead>

<tbody>

{students.map(s=>(

<tr key={s.student_id} className="border-b">

<td className="py-2">
{s.student_name}
</td>

<td className="py-2 text-green-600">
₹{s.paid_fee}
</td>

<td className="py-2 text-red-500">
₹{s.remaining_fee}
</td>

<td>

<button
onClick={()=>sendReminder(s.student_id)}
className="bg-indigo-600 text-white px-3 py-1 rounded"
>

Send Reminder

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</AdminLayout>

)

}

export default ClassFeesPage