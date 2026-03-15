import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

const sendReminder = async (student_id) => {

  try {

    await API.post("/transport/reminder", {
      student_id
    })

    alert("Reminder sent")

  } catch (err) {

    console.error(err)

  }

}


function BusStudentsPage() {

  const { bus_id } = useParams()
  const [students,setStudents] = useState([])

  useEffect(()=>{

    const fetchStudents = async ()=>{

      try{

        const res = await API.get(`/transport/bus/${bus_id}/students`)
        setStudents(res.data)

      }catch(err){
        console.error(err)
      }

    }

    fetchStudents()

  },[bus_id])

  return(

    <AdminLayout>

      <h1 className="text-2xl font-bold mb-6">
        Bus Students
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-yellow-50 text-gray-700">

            <tr>

              <th className="p-3 text-left">Roll</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Pickup Address</th>
              <th className="p-3 text-left">Total Fee</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Remaining</th>
              <th className="p-3 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {students.map((s,i)=>(

              <tr key={i} className="border-t">

                <td className="p-3">{s.roll}</td>

                <td className="p-3 font-medium">
                  {s.name}
                </td>

                <td className="p-3">
                  {s.pickup_address}
                </td>

                <td className="p-3">
                  ₹{s.total_fee}
                </td>

                <td className="p-3 text-green-600">
                  ₹{s.paid_fee}
                </td>

                <td className="p-3 text-red-600">
                  ₹{s.remaining_fee}
                </td>

                <td className="p-3">

<button
 className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
 onClick={() => sendReminder(s.student_id)}
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

export default BusStudentsPage