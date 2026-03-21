// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function TeacherAttendance() {

//   const { id } = useParams()

//   const [students, setStudents] = useState([])
//   const [attendance, setAttendance] = useState({})

//   const fetchStudents = async () => {

//     try {

//       const res = await API.get(`/teacher/class/${id}/students`)
//       setStudents(res.data)

//     } catch (error) {

//       console.log("Error fetching students", error)

//     }

//   }

//   useEffect(() => {

//     fetchStudents()

//   }, [])

//   const markAttendance = async () => {

//     try {

//       const records = students.map(s => ({
//         student_id: s.id,
//         class_id: id,
//         status: attendance[s.id] || "present"
//       }))

//       await API.post("/teacher/attendance", { records })

//       alert("Attendance Saved")

//     } catch (error) {

//       console.log("Attendance error", error)

//     }

//   }

//   return (

//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Mark Attendance
//       </h1>

//       <table className="w-full bg-white shadow">

//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-3">Name</th>
//             <th className="p-3">Status</th>
//           </tr>
//         </thead>

//         <tbody>

//           {students.map((student) => (

//             <tr key={student.id}>

//               <td className="p-3">
//                 {student.full_name}
//               </td>

//               <td className="p-3">

//                 <select
//                   onChange={(e) =>
//                     setAttendance({
//                       ...attendance,
//                       [student.id]: e.target.value
//                     })
//                   }
//                 >

//                   <option value="present">
//                     Present
//                   </option>

//                   <option value="absent">
//                     Absent
//                   </option>

//                 </select>

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//       <button
//         onClick={markAttendance}
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Save Attendance
//       </button>

//     </div>

//   )

// }

// export default TeacherAttendance











// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function TeacherAttendance() {

//   const { id } = useParams()

//   const [students, setStudents] = useState([])
//   const [attendance, setAttendance] = useState({})

//   const fetchStudents = async () => {
//     try {
//       const res = await API.get(`/teacher/class/${id}/students`)
//       setStudents(res.data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     fetchStudents()
//   }, [])

//   const handleChange = (studentId, status) => {
//     setAttendance(prev => ({
//       ...prev,
//       [studentId]: status
//     }))
//   }

//   const submitAttendance = async () => {

//     const records = students.map(s => ({
//       student_id: s.id,
//       class_id: id,
//       status: attendance[s.id] || "absent"
//     }))

//     try {
//       await API.post("/teacher/attendance", { records })
//       alert("Attendance Saved ✅")
//     } catch (err) {
//       console.log(err)
//     }

//   }

//   return (

//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Mark Attendance
//       </h1>

//       <div className="bg-white shadow rounded-lg p-4">

//         {students.map((s) => (

//           <div
//             key={s.id}
//             className="flex justify-between items-center border-b py-3"
//           >

//             <div>
//               <p className="font-medium">
//                 {s.roll_number}. {s.full_name}
//               </p>
//             </div>

//             <div className="flex gap-3">

//               <button
//                 onClick={() => handleChange(s.id, "present")}
//                 className={`px-3 py-1 rounded 
//                   ${attendance[s.id] === "present"
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-200"
//                   }`}
//               >
//                 Present
//               </button>

//               <button
//                 onClick={() => handleChange(s.id, "absent")}
//                 className={`px-3 py-1 rounded 
//                   ${attendance[s.id] === "absent"
//                     ? "bg-red-600 text-white"
//                     : "bg-gray-200"
//                   }`}
//               >
//                 Absent
//               </button>

//             </div>

//           </div>

//         ))}

//         <button
//           onClick={submitAttendance}
//           className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg"
//         >
//           Submit Attendance
//         </button>

//       </div>

//     </div>
//   )
// }

// export default TeacherAttendance









import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function TeacherAttendance() {

  const { id } = useParams()

  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const isPastDate = date !== new Date().toISOString().split("T")[0]
  // fetch students
  const fetchStudents = async () => {
    try {
      const res = await API.get(`/teacher/class/${id}/students`)
      setStudents(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAttendance = async () => {

  try {

    const today = new Date().toISOString().split("T")[0]

    // agar today hai → reset
    if (date === today) {
      setAttendance({})
      return
    }

    // old date → fetch karo
    const res = await API.get(`/teacher/attendance/${id}?date=${date}`)

    const map = {}

    res.data.forEach(a => {
      map[a.student_id] = a.status
    })

    setAttendance(map)

  } catch (err) {
    console.log(err)
  }

}

  // useEffect(() => {
  //   fetchStudents()
  // }, [])

// only once
useEffect(() => {
  fetchStudents()
}, [])

// date change pe
useEffect(() => {
  fetchAttendance()
}, [date])

  // handle toggle
  const handleChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  // counts
  const presentCount = Object.values(attendance).filter(s => s === "present").length
  const absentCount = students.length - presentCount

  // submit
  const submitAttendance = async () => {

    const records = students.map(s => ({
      student_id: s.id,
      class_id: id,
      status: attendance[s.id] || "absent",
      date
    }))

    try {
      await API.post("/teacher/attendance", { records })
      alert("Attendance Saved ✅")
    } catch (err) {
      console.log(err)
    }
  }

  return (

    <div className="p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">

        <h1 className="text-2xl font-bold">
          Mark Attendance
        </h1>

        {/* DATE PICKER */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-green-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Present</p>
          <h2 className="text-xl font-bold text-green-700">
            {presentCount}
          </h2>
        </div>

        <div className="bg-red-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Absent</p>
          <h2 className="text-xl font-bold text-red-700">
            {absentCount}
          </h2>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Total</p>
          <h2 className="text-xl font-bold text-blue-700">
            {students.length}
          </h2>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Attendance %</p>
          <h2 className="text-xl font-bold text-purple-700">
            {students.length ? Math.round((presentCount / students.length) * 100) : 0}%
          </h2>
        </div>

      </div>

      {/* STUDENT LIST */}
      <div className="bg-white shadow rounded-xl p-4">

        {students.map((s) => (

          <div
            key={s.id}
            className="flex flex-col md:flex-row md:justify-between md:items-center border-b py-3 gap-3"
          >

            {/* NAME */}
            <div>
              <p className="font-medium">
                {s.roll_number}. {s.full_name}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2">

<button
  disabled={isPastDate}
  onClick={() => handleChange(s.id, "present")}
  className={`px-4 py-1 rounded-lg text-sm
    ${attendance[s.id] === "present"
      ? "bg-green-600 text-white"
      : "bg-gray-200"
    }`}
>
  Present
</button>

<button
  disabled={isPastDate}
  onClick={() => handleChange(s.id, "absent")}
  className={`px-4 py-1 rounded-lg text-sm
    ${attendance[s.id] === "absent"
      ? "bg-red-600 text-white"
      : "bg-gray-200"
    }`}
>
  Absent
</button>

            </div>

          </div>

        ))}

        {/* SUBMIT */}
        <button
          onClick={submitAttendance}
          className="mt-6 w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Submit Attendance
        </button>


        {/* <button
  disabled={isPastDate}
  onClick={submitAttendance}
  className="mt-6 w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
>
  Submit Attendance
</button> */}


      </div>

    </div>
  )
}

export default TeacherAttendance