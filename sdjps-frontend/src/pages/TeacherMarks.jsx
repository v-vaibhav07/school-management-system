import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function TeacherMarks() {

  const { id } = useParams()

  const [students, setStudents] = useState([])
  const [marks, setMarks] = useState({})

  const fetchStudents = async () => {

    const res = await API.get(`/teacher/class/${id}/students`)
    setStudents(res.data)

  }

  useEffect(() => {

    fetchStudents()

  }, [])

  const submitMarks = async () => {

    const data = students.map(s => ({
      student_id: s.id,
      class_id: id,
      marks: marks[s.id] || 0
    }))

    await API.post("/teacher/marks", { data })

    alert("Marks uploaded")

  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Upload Marks
      </h1>

      <table className="w-full bg-white shadow">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Marks</th>
          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td className="p-3">
                {student.full_name}
              </td>

              <td className="p-3">

                <input
                  type="number"
                  className="border p-1"
                  onChange={(e) =>
                    setMarks({
                      ...marks,
                      [student.id]: e.target.value
                    })
                  }
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <button
        onClick={submitMarks}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Marks
      </button>

    </div>

  )

}

export default TeacherMarks