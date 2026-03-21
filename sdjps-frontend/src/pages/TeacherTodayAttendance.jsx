import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function TeacherTodayAttendance() {

  const { classId } = useParams()
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await API.get(`/teacher/attendance/today/${classId}/list`)
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Today's Attendance
      </h1>

      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Roll</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {data.map((s) => (

              <tr key={s.id} className="border-b">

                <td className="p-3">{s.roll}</td>
                <td className="p-3">{s.name}</td>

                <td className="p-3">
                  <span className={`px-3 py-1 rounded text-white text-sm
                    ${s.status === "present" ? "bg-green-500" : "bg-red-500"}
                  `}>
                    {s.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default TeacherTodayAttendance