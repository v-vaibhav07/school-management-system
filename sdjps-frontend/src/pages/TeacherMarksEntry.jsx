// import { useEffect, useState } from "react"
// import { useSearchParams } from "react-router-dom"
// import API from "../services/api"

// function TeacherMarksEntry() {

//   const [students, setStudents] = useState([])
//   const [marks, setMarks] = useState({})
//   const [loading, setLoading] = useState(true)

//   const [searchParams] = useSearchParams()

//   const classId = searchParams.get("classId")
//   const subject = searchParams.get("subject")
// //   const exam = searchParams.get("exam")  vaibhav
// const examId = searchParams.get("examId")


//   // 🔥 BOTH CALL
//   useEffect(() => {
//     fetchStudents()
//     fetchMarks()
//   }, [])

//   // ======================
//   // FETCH STUDENTS
//   // ======================
//   const fetchStudents = async () => {
//     try {
//       const res = await API.get(`/teacher/class/${classId}/students`)
//       setStudents(res.data)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ======================
//   // 🔥 FETCH EXISTING MARKS
//   // ======================
//   const fetchMarks = async () => {
//     try {
//       const res = await API.get(
//         `/teacher/marks/${classId}?subject=${subject}&exam=${exam}`
//       )

//       const existing = {}

//       res.data.forEach(m => {
//         existing[m.student_id] = m.marks_obtained
//       })

//       setMarks(existing)

//     } catch (err) {
//       console.error(err)
//     }
//   }

//   // ======================
//   // HANDLE INPUT
//   // ======================
//   const handleChange = (studentId, value) => {

//     if (value > 100) return  // 🔥 validation

//     setMarks(prev => ({
//       ...prev,
//       [studentId]: value
//     }))
//   }

//   // ======================
//   // SAVE MARKS
//   // ======================
//   const handleSave = async () => {
//     try {
//       const payload = students.map(s => ({
//         student_id: s.id,
//         subject,
//         // exam, vaibhav
//          exam_id: examId, 
//         marks_obtained: marks[s.id] || 0,
//         max_marks: 100
//       }))

//       await API.post("/teacher/save-marks", payload)

//       alert("Marks saved successfully ✅")

//     } catch (err) {
//       console.error(err)
//       alert("Error saving marks ❌")
//     }
//   }

//   return (
//     <div className="p-6">

//       {/* Header */}
//       <div className="mb-6 bg-white p-5 rounded-2xl shadow">
//         <h1 className="text-2xl font-bold">Marks Entry</h1>
//         <p className="text-gray-600 mt-1">
//           Subject: <span className="font-semibold text-indigo-600">{subject}</span> | 
//           Exam: <span className="font-semibold text-indigo-600"> {exam}</span>
//         </p>
//       </div>

//       {/* Loading */}
//       {loading ? (
//         <p className="text-center text-gray-500">Loading students...</p>
//       ) : students.length === 0 ? (
//         <p className="text-center text-red-500">No students found ❌</p>
//       ) : (

//         <div className="bg-white rounded-2xl shadow overflow-hidden">

//           <table className="w-full">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Roll No</th>
//                 <th className="p-3 text-left">Student Name</th>
//                 <th className="p-3 text-left">Marks</th>
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((s) => (
//                 <tr key={s.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3 font-medium">{s.roll_number}</td>
//                   <td className="p-3">{s.full_name}</td>

//                   <td className="p-3">
//                     <input
//                       type="number"
//                       min="0"
//                       max="100"
//                       className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                       placeholder="0"
//                       value={marks[s.id] ?? ""}   // 🔥 important fix
//                       onChange={(e) => handleChange(s.id, e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//         </div>
//       )}

//       {/* Save Button */}
//       {students.length > 0 && (
//         <div className="mt-6 text-right">
//           <button
//             onClick={handleSave}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
//           >
//             Save Marks
//           </button>
//         </div>
//       )}

//     </div>
//   )
// }

// export default TeacherMarksEntry














import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import API from "../services/api"

function TeacherMarksEntry() {

  const [students, setStudents] = useState([])
  const [marks, setMarks] = useState({})
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()

  const classId = searchParams.get("classId")
  const subject = searchParams.get("subject")
  const examId = searchParams.get("examId") // ✅ FINAL

  // 🔥 LOAD DATA
  useEffect(() => {
    fetchStudents()
    fetchMarks()
  }, [])

  // ======================
  // FETCH STUDENTS
  // ======================
  const fetchStudents = async () => {
    try {
      const res = await API.get(`/teacher/class/${classId}/students`)
      setStudents(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // FETCH EXISTING MARKS
  // ======================
  const fetchMarks = async () => {
    try {
      const res = await API.get(
        `/teacher/marks/${classId}?subject=${subject}&examId=${examId}` // ✅ FIXED
      )

      const existing = {}

      res.data.forEach(m => {
        existing[m.student_id] = m.marks_obtained
      })

      setMarks(existing)

    } catch (err) {
      console.error(err)
    }
  }

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (studentId, value) => {

    if (value > 100) return

    setMarks(prev => ({
      ...prev,
      [studentId]: value
    }))
  }

  // ======================
  // SAVE MARKS
  // ======================
  const handleSave = async () => {
    try {

      const payload = students.map(s => ({
        student_id: s.id,
        subject,
        exam_id: examId, // ✅ FINAL FIX
        marks_obtained: marks[s.id] || 0,
        max_marks: 100
      }))

      await API.post("/teacher/save-marks", payload)

      alert("Marks saved successfully ✅")

    } catch (err) {
      console.error(err)
      alert("Error saving marks ❌")
    }
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6 bg-white p-5 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">Marks Entry</h1>

        <p className="text-gray-600 mt-1">
          Subject: <span className="font-semibold text-indigo-600">{subject}</span> | 
          Exam ID: <span className="font-semibold text-indigo-600">{examId}</span>
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-center text-red-500">No students found ❌</p>
      ) : (

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Student Name</th>
                <th className="p-3 text-left">Marks</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-medium">{s.roll_number}</td>
                  <td className="p-3">{s.full_name}</td>

                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="0"
                      value={marks[s.id] ?? ""}
                      onChange={(e) => handleChange(s.id, e.target.value)}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

      {/* Save Button */}
      {students.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Save Marks
          </button>
        </div>
      )}

    </div>
  )
}

export default TeacherMarksEntry