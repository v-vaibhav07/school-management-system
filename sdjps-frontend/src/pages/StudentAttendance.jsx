import { useEffect, useState } from "react"
import API from "../services/api"

function StudentAttendance() {

  const [attendance, setAttendance] = useState([])

  const fetchAttendance = async () => {

    const res = await API.get("/student/attendance")

    setAttendance(res.data)

  }

  useEffect(() => {

    fetchAttendance()

  }, [])

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Attendance
      </h1>

      <table className="w-full bg-white shadow">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>

        </thead>

        <tbody>

          {attendance.map((a) => (

            <tr key={a.id}>

              <td className="p-3">
                {a.date}
              </td>

              <td className="p-3">
                {a.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default StudentAttendance