import { useEffect, useState } from "react"
import API from "../services/api"

function StudentMarks() {

  const [marks, setMarks] = useState([])

  const fetchMarks = async () => {

    const res = await API.get("/student/marks")

    setMarks(res.data)

  }

  useEffect(() => {

    fetchMarks()

  }, [])

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Marks
      </h1>

      <table className="w-full bg-white shadow">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-3">Subject</th>
            <th className="p-3">Marks</th>
          </tr>

        </thead>

        <tbody>

          {marks.map((m) => (

            <tr key={m.id}>

              <td className="p-3">
                {m.subject}
              </td>

              <td className="p-3">
                {m.marks_obtained}/{m.max_marks}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default StudentMarks