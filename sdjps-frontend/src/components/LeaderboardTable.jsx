import { useState } from "react"
import StudentMarksModal from "./StudentMarksModal"

function LeaderboardTable({students}){

const [student,setStudent] = useState(null)

return(

<div className="bg-white shadow rounded-xl">

<table className="w-full">

<thead className="bg-gray-100">

<tr>
<th className="p-3">Rank</th>
<th>Student</th>
<th>Score</th>
<th></th>
</tr>

</thead>

<tbody>

{students.map((s,i)=>(

<tr key={s.student_id} className="border-b">

<td className="p-3 font-bold">
{i+1}
</td>

<td>{s.full_name}</td>

<td>{s.final_score}%</td>

<td>

<button
onClick={()=>setStudent(s)}
className="text-blue-600"
>

View

</button>

</td>

</tr>

))}

</tbody>

</table>

{student && (
<StudentMarksModal
student={student}
close={()=>setStudent(null)}
/>
)}

</div>

)

}

export default LeaderboardTable