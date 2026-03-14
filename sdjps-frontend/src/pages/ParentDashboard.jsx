import { useEffect, useState } from "react"
import API from "../services/api"

function ParentDashboard() {

  const [student, setStudent] = useState(null)
  const [attendance, setAttendance] = useState(null)
  const [marks, setMarks] = useState([])

  const fetchData = async () => {

    try {

      const studentRes = await API.get("/parent/student")
      setStudent(studentRes.data)

      const attendanceRes = await API.get("/parent/attendance")
      setAttendance(attendanceRes.data)

      const marksRes = await API.get("/parent/marks")
      setMarks(marksRes.data)

    } catch (error) {

      console.log("Parent dashboard error", error)

    }

  }

  useEffect(() => {

    fetchData()

  }, [])

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Parent Dashboard
      </h1>

      {student && (

        <div className="bg-white shadow rounded p-6 mb-6">

          <h2 className="text-xl font-bold mb-2">
            Student Information
          </h2>

          <p>
            Name: {student.full_name}
          </p>

          <p>
            Class: {student.class_name}
          </p>

        </div>

      )}

      {attendance && (

        <div className="bg-white shadow rounded p-6 mb-6">

          <h2 className="text-xl font-bold mb-2">
            Attendance
          </h2>

          <p>
            Attendance Percentage: {attendance.percentage}%
          </p>

        </div>

      )}

      <div className="bg-white shadow rounded p-6">

        <h2 className="text-xl font-bold mb-4">
          Recent Marks
        </h2>

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2">Subject</th>
              <th className="p-2">Marks</th>
            </tr>

          </thead>

          <tbody>

            {marks.map((m) => (

              <tr key={m.id} className="border-b">

                <td className="p-2">
                  {m.subject}
                </td>

                <td className="p-2">
                  {m.marks_obtained}/{m.max_marks}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default ParentDashboard




















// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Link } from "react-router-dom"

// function ParentDashboard() {

//   const [classes, setClasses] = useState([])

//   const fetchClasses = async () => {

//     try {

//       const res = await API.get("/classes")
//       setClasses(res.data)

//     } catch (error) {

//       console.log("Error loading classes", error)

//     }

//   }

//   useEffect(() => {

//     fetchClasses()

//   }, [])

//   return (

//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         Teacher Dashboard
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         {classes.map((cls) => (

//           <div
//             key={cls.id}
//             className="bg-white shadow rounded p-5"
//           >

//             <h2 className="text-xl font-bold mb-2">
//               Class {cls.class_name} {cls.section}
//             </h2>

//             <p className="text-gray-500 mb-4">
//               Academic Year: {cls.academic_year}
//             </p>

//             <div className="flex flex-col gap-2">

//               <Link
//                 to={`/teacher/class/${cls.id}/attendance`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Mark Attendance
//               </Link>

//               <Link
//                 to={`/teacher/class/${cls.id}/marks`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Upload Marks
//               </Link>

//               <Link
//                 to={`/classes/${cls.id}/chat`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Class Chat
//               </Link>

//               <Link
//                 to={`/homework/class/${cls.id}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Post Homework
//               </Link>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>

//   )

// }

// export default ParentDashboard