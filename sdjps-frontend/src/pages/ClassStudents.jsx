// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassStudents() {

//     const { id } = useParams()

//     const [students, setStudents] = useState([])
//     const [classInfo, setClassInfo] = useState(null)
//     const [teacher, setTeacher] = useState(null)

//     const fetchStudents = async () => {

//         try {

//             const res = await API.get(`/classes/${id}/students`)
//             setStudents(res.data.students)
//             setClassInfo(res.data.class)
//             setTeacher(res.data.teacher)
//         } catch (error) {

//             console.log("Error fetching class students", error)

//         }

//     }

//     useEffect(() => {
//         fetchStudents()
//     }, [])

//     return (
//         <div>

//             <h1 className="text-3xl font-bold">
//                 Class {classInfo?.class_name} {classInfo?.section}
//             </h1>

//             <p className="mb-6 text-gray-600">
//                 Teacher: {teacher || "Not Assigned"}
//             </p>

//             <div className="bg-white rounded shadow">

//                 <table className="w-full">

//                     <thead className="bg-gray-200">

//                         <tr>
//                             <th className="p-3 text-left">Roll</th>
//                             <th className="p-3 text-left">Name</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {students.map((student) => (

//                             <tr key={student.id} className="border-b">

//                                 <td className="p-3">
//                                     {student.roll_number}
//                                 </td>

//                                 <td className="p-3">
//                                     {student.full_name}
//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     )
// }

// export default ClassStudents

// import { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom"
// import API from "../services/api"

// function ClassStudents() {

//     const { id } = useParams()

//     const [students, setStudents] = useState([])
//     const [classInfo, setClassInfo] = useState(null)
//     const [teacher, setTeacher] = useState(null)

//     const fetchStudents = async () => {

//         try {

//             const res = await API.get(`/classes/${id}/students`)

//             setStudents(res.data.students)
//             setClassInfo(res.data.class)
//             setTeacher(res.data.teacher)

//         } catch (error) {

//             console.log("Error fetching class students", error)

//         }

//     }

//     useEffect(() => {
//         fetchStudents()
//     }, [])

//     return (
//         <div>

//             {/* HEADER */}

//             {/* <div className="flex justify-between items-center mb-6">

//                 <div>

//                     <h1 className="text-3xl font-bold">
//                         Class {classInfo?.class_name} {classInfo?.section}
//                     </h1>

//                     <p className="text-gray-600">
//                         Teacher: {teacher || "Not Assigned"}
//                     </p>

//                 </div>

//                 <Link
//                     to={`/classes/${id}/announcements`}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Announcements
//                 </Link>

//             </div> */}
//             <div className="flex justify-between items-center mb-6">

//                 <div>

//                     <h1 className="text-3xl font-bold">
//                         Class {classInfo?.class_name} {classInfo?.section}
//                     </h1>

//                     <p className="text-gray-600">
//                         Teacher: {teacher || "Not Assigned"}
//                     </p>

//                 </div>

//                 <div className="flex gap-3">

//                     <Link
//                         to={`/classes/${id}/announcements`}
//                         className="bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                         Announcements
//                     </Link>

//                     <Link
//                         to={`/classes/${id}/chat`}
//                         className="bg-green-600 text-white px-4 py-2 rounded"
//                     >
//                         Class Chat
//                     </Link>

//                 </div>

//             </div>


//             {/* STUDENTS TABLE */}

//             <div className="bg-white rounded shadow">

//                 <table className="w-full">

//                     <thead className="bg-gray-200">

//                         <tr>
//                             <th className="p-3 text-left">Roll</th>
//                             <th className="p-3 text-left">Name</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {students.map((student) => (

//                             <tr key={student.id} className="border-b">

//                                 <td className="p-3">
//                                     {student.roll_number}
//                                 </td>

//                                 <td className="p-3">
//                                     {student.full_name}
//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     )
// }

// export default ClassStudents











import { useEffect, useState } from "react"
import API from "../services/api"
import { useParams, useNavigate } from "react-router-dom"

function ClassStudents() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: "",
    roll_number: ""
  })

  const fetchStudents = async () => {

    try {

      const res = await API.get(`/classes/${id}/students`)

      if (Array.isArray(res.data)) {
        setStudents(res.data)
      } 
      else if (Array.isArray(res.data.students)) {
        setStudents(res.data.students)
      } 
      else {
        setStudents([])
      }

    } catch (err) {

      console.log(err)
      setStudents([])

    } finally {

      setLoading(false)

    }

  }

const addStudent = async () => {

  try {

    await API.post(`/classes/${id}/students`, {
      full_name: form.name,
      roll_number: form.roll_number,
      class_id: id
    })

    setShowForm(false)

    setForm({
      name: "",
      roll_number: ""
    })

    fetchStudents()

  } catch (err) {

    console.log(err)

  }

}

  useEffect(() => {

    fetchStudents()

  }, [id])

  if (loading) {
    return <div className="p-6">Loading students...</div>
  }

  return (

    <div className="p-6">

      <button
        onClick={() => navigate("/students")}
        className="mb-4 text-blue-600"
      >
        ← Back
      </button>

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold">
          Class Students
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Student
        </button>

      </div>

      <div className="bg-white rounded shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Roll</th>
              <th className="p-3 text-left">Profile</th>
            </tr>

          </thead>

          <tbody>

            {students.length === 0 ? (

              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>

            ) : (

              students.map((s) => (

                <tr key={s.id} className="border-b hover:bg-gray-50">

                  <td className="p-3">
                    <img
                      src={s.photo || "/avatar.png"}
                      alt="student"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>

                  <td className="p-3">
                    {s.users?.full_name || s.full_name || s.name || "N/A"}
                  </td>

                  <td className="p-3">
                    {s.roll_number || "-"}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() => navigate(`/students/profile/${s.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ADD STUDENT MODAL */}

      {showForm && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="text-xl font-bold mb-4">
              Add Student
            </h2>

            <input
              type="text"
              placeholder="Student Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <input
              type="number"
              placeholder="Roll Number"
              value={form.roll_number}
              onChange={(e) =>
                setForm({ ...form, roll_number: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={addStudent}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

export default ClassStudents