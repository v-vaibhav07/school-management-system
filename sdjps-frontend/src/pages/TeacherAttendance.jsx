import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function TeacherAttendance() {

  const { id } = useParams()

  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})

  const fetchStudents = async () => {

    try {

      const res = await API.get(`/teacher/class/${id}/students`)
      setStudents(res.data)

    } catch (error) {

      console.log("Error fetching students", error)

    }

  }

  useEffect(() => {

    fetchStudents()

  }, [])

  const markAttendance = async () => {

    try {

      const records = students.map(s => ({
        student_id: s.id,
        class_id: id,
        status: attendance[s.id] || "present"
      }))

      await API.post("/teacher/attendance", { records })

      alert("Attendance Saved")

    } catch (error) {

      console.log("Attendance error", error)

    }

  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Mark Attendance
      </h1>

      <table className="w-full bg-white shadow">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td className="p-3">
                {student.full_name}
              </td>

              <td className="p-3">

                <select
                  onChange={(e) =>
                    setAttendance({
                      ...attendance,
                      [student.id]: e.target.value
                    })
                  }
                >

                  <option value="present">
                    Present
                  </option>

                  <option value="absent">
                    Absent
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <button
        onClick={markAttendance}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Attendance
      </button>

    </div>

  )

}

export default TeacherAttendance