import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"

function TeacherClassStudents() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [students, setStudents] = useState([])

  const fetchStudents = async () => {
    try {
      const res = await API.get(`/teacher/class/${id}/students`)

      // ✅ sort by roll number
      const sorted = res.data.sort((a, b) => a.roll_number - b.roll_number)

      setStudents(sorted)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Students List
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Roll No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Parent</th>
              <th className="p-3">Parent Phone</th>
              <th className="p-3">Address</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => navigate(`/students/profile/${s.id}`)}
                  className="border-t cursor-pointer hover:bg-gray-50 transition"
                >

                  <td className="p-3">{s.roll_number}</td>
                  <td className="p-3">{s.full_name}</td>
                  <td className="p-3">{s.phone || "-"}</td>
                  <td className="p-3">{s.parent_name || "-"}</td>
                  <td className="p-3">{s.parent_phone || "-"}</td>
                  <td className="p-3">{s.address || "-"}</td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default TeacherClassStudents