// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { useNavigate } from "react-router-dom"

// function TeacherMarksDashboard() {

//   const [data, setData] = useState([])
//   const [exams, setExams] = useState([])
//   const navigate = useNavigate()

// useEffect(() => {
//   fetchData()
//   fetchExams()
// }, [])

//   const fetchData = async () => {
//     try {
//       const res = await API.get("/teacher/timetable-classes")
//       setData(res.data)
//     } catch (err) {
//       console.error(err)
//     }
//   }
// const fetchExams = async () => {
//   try {
//     const res = await API.get("/exams")
//     setExams(res.data)
//   } catch (err) {
//     console.error(err)
//   }
// }

//   const handleSelect = (key, value) => {
//     setExam(prev => ({ ...prev, [key]: value }))
//   }

//   const handleGo = (item) => {
//     const key = item.class_id + item.subject
//     const selectedExam = exam[key]

//     if (!selectedExam) {
//       alert("Select exam first")
//       return
//     }

//     navigate(
//       `/teacher/marks-entry?classId=${item.class_id}&subject=${item.subject}&exam=${selectedExam}`
//     )
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Marks Entry</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data.map((item, i) => {
//           const key = item.class_id + item.subject

//           return (
//             <div key={i} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">

//               {/* ✅ FIXED HERE */}
//               <h2 className="text-lg font-semibold">
//                 Class {item.classes?.class_name}-{item.classes?.section}
//               </h2>

//               <p className="text-indigo-600 font-medium mt-1">
//                 {item.subject}
//               </p>

//               {/* Exam Dropdown */}
// <select
//   className="mt-4 w-full p-2 border rounded-lg"
//   onChange={(e) => handleSelect(key, e.target.value)}
// >
//   <option value="">Select Exam</option>

//   {exams.map((exam) => (
//     <option key={exam.id} value={exam.id}>
//       {exam.name}   {/* 👈 user ko text dikhega */}
//     </option>
//   ))}

// </select>

//               {/* Button */}
//               <button
//                 onClick={() => handleGo(item)}
//                 className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
//               >
//                 Enter Marks
//               </button>

//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default TeacherMarksDashboard    


























import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function TeacherMarksDashboard() {

  const [data, setData] = useState([])
  const [exams, setExams] = useState([])
  const [exam, setExam] = useState({}) // ✅ IMPORTANT
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
    fetchExams()
  }, [])

  // ======================
  // FETCH CLASSES
  // ======================
  const fetchData = async () => {
    try {
      const res = await API.get("/teacher/timetable-classes")
      setData(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // ======================
  // FETCH EXAMS
  // ======================
  const fetchExams = async () => {
    try {
      const res = await API.get("/exams")
      setExams(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // ======================
  // SELECT EXAM
  // ======================
  const handleSelect = (key, value) => {
    setExam(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // ======================
  // NAVIGATE
  // ======================
  const handleGo = (item) => {
    const key = item.class_id + item.subject
    const selectedExam = exam[key]

    console.log("SELECTED:", selectedExam) // ✅ debug

    if (!selectedExam) {
      alert("Select exam first")
      return
    }

    navigate(
      `/teacher/marks-entry?classId=${item.class_id}&subject=${item.subject}&examId=${selectedExam}`
    )
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Marks Entry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.map((item, i) => {

          const key = item.class_id + item.subject

          return (
            <div key={i} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">

              <h2 className="text-lg font-semibold">
                Class {item.classes?.class_name}-{item.classes?.section}
              </h2>

              <p className="text-indigo-600 font-medium mt-1">
                {item.subject}
              </p>

              {/* ✅ EXAM DROPDOWN */}
              <select
                className="mt-4 w-full p-2 border rounded-lg"
                onChange={(e) => handleSelect(key, e.target.value)}
              >
                <option value="">Select Exam</option>

                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name}   {/* 👈 UI me text */}
                  </option>
                ))}

              </select>

              {/* BUTTON */}
              <button
                onClick={() => handleGo(item)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
              >
                Enter Marks
              </button>

            </div>
          )
        })}

      </div>
    </div>
  )
}

export default TeacherMarksDashboard