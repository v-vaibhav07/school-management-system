import { useEffect, useState } from "react"
import API from "../services/api"

function StudentMarksModal({student,close}){

const [marks,setMarks] = useState([])

useEffect(()=>{

fetchMarks()

},[])

const fetchMarks = async()=>{

// const res = await API.get(`/marks?studentId=${student.student_id}`)
// const res = await API.get(`/marks?studentId=${student.student_id}&examId=${student.exam_id}`)
const res = await API.get(
`/leaderboard/marks?studentId=${student.student_id}&examId=${student.exam_id}`
)
setMarks(res.data)

}

return(

<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl w-96">

<h2 className="text-lg font-bold mb-4">
{student.full_name}
</h2>

{marks.map(m=>(
<div key={m.id} className="flex justify-between border-b py-2">

<span>{m.subject}</span>

<span>{m.marks_obtained}</span>

</div>
))}

<button
onClick={close}
className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
>

Close

</button>

</div>

</div>

)

}

export default StudentMarksModal