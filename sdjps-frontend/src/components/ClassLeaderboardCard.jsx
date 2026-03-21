// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../services/api"

// function ClassLeaderboardCard({ data }) {

//     const [exams, setExams] = useState([])
//     const [exam, setExam] = useState("")

//     const navigate = useNavigate()

//     useEffect(() => {

//         fetchExams()

//     }, [])

//     const fetchExams = async () => {

//         try {

//             const res = await API.get(`/exams?classId=${data.id}`)

//             setExams(res.data)

//         } catch (err) {

//             console.error("Exam fetch error", err)

//         }

//     }

//     const openLeaderboard = () => {

//         if (!exam) return

//         navigate(`/leaderboard/${data.id}/${exam}`)

//     }


// //     const openLeaderboard = () => {

// //   if (!exam) {
// //     alert("Please select exam")
// //     return
// //   }

// //   navigate(`/leaderboard/${data.id}/${exam}`)
// // }

//     return (

//         <div className="bg-white shadow-md rounded-xl p-6">

//             <h2 className="text-lg font-semibold">
//                 {data.class_name}
//             </h2>

//             <p className="text-gray-500 text-sm mb-4">
//                 Class Teacher
//             </p>

//             <select
//                 className="w-full border p-2 rounded mb-4"
//                 value={exam}
//                 onChange={(e) => setExam(e.target.value)}
//             >

//                 <option>Select Exam</option>

//                 {exams.map(e => (
//                     <option key={e.id} value={e.id}>
//                         {e.name}
//                     </option>
//                 ))}

//             </select>

//             <button
//                 onClick={openLeaderboard}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >

//                 View Leaderboard

//             </button>

//         </div>

//     )

// }

// export default ClassLeaderboardCard






// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../services/api"

// function ClassLeaderboardCard({ data }) {

//   const [exams, setExams] = useState([])
//   const [exam, setExam] = useState("")

//   const navigate = useNavigate()

//   useEffect(() => {
//     fetchExams()
//   }, [])

// const fetchExams = async () => {

//   console.log("Class ID:", data.id)

//   const res = await API.get(`/exams?classId=${data.id}`)

//   console.log("Exams:", res.data)

//   setExams(res.data)

// }

//   const openLeaderboard = () => {

//     if (!exam) return

//     navigate(`/leaderboard/view/${data.id}/${exam}`)

//   }

//   return (

//     <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between h-44">

//       {/* Class Name */}

//       <div>

//         <h2 className="text-lg font-semibold">
//           {data.class_name}
//         </h2>

//         <p className="text-gray-500 text-sm mb-3">
//           Class Teacher
//         </p>

// <select
//   className="w-full border border-gray-300 rounded-md p-2 text-sm"
//   value={exam}
//   onChange={(e) => setExam(e.target.value)}
// >
//   <option value="">Select Exam</option>

//   {exams.map((e) => (
//     <option key={e.id} value={e.id}>
//       {e.name}
//     </option>
//   ))}

// </select>

//       </div>

//       {/* Button Bottom Right */}

//       <div className="flex justify-end mt-4">

//         <button
//           type="button"
//           disabled={!exam}
//           onClick={openLeaderboard}
//           className={`px-4 py-1.5 text-sm rounded-md transition
//           ${exam
//             ? "bg-indigo-600 text-white hover:bg-indigo-700"
//             : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           View
//         </button>

//       </div>

//     </div>

//   )

// }

// export default ClassLeaderboardCard














// import { useNavigate } from "react-router-dom"

// function ClassLeaderboardCard({ data }) {

//   const navigate = useNavigate()

//   const openLeaderboard = () => {
//     navigate(`/leaderboard/${data.id}`)
//   }

//   return (

//     <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-lg transition">

//       {/* Top Section */}
//       <div>
//         <h2 className="text-xl font-bold text-indigo-600">
//           {data.class_name}
//         </h2>

//         <p className="text-indigo-400 text-sm font-medium">
//           {data.teacher_name}
//         </p>

//         <p className="text-gray-400 text-xs">
//           Section {data.section}
//         </p>
//       </div>

//       {/* Bottom Section */}
//       <div className="flex items-center justify-end mt-3">

//         <button
//           type="button"
//           onClick={openLeaderboard}
//           className="px-4 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
//         >
//           View Leaderboard
//         </button>

//       </div>

//     </div>

//   )
// }

// export default ClassLeaderboardCard
import { useNavigate } from "react-router-dom"

function ClassLeaderboardCard({ data, isTeacher }) {

  const navigate = useNavigate()

  const openLeaderboard = () => {
    if (isTeacher) {
      navigate(`/teacher/leaderboard/${data.id}`) // ✅ teacher route
    } else {
      navigate(`/leaderboard/${data.id}`) // admin route
    }
  }

  return (

    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-lg transition">

      {/* Top Section */}
      <div>
        <h2 className="text-xl font-bold text-indigo-600">
          {data.class_name || data.name}
        </h2>

        <p className="text-indigo-400 text-sm font-medium">
          {data.teacher_name || ""}
        </p>

        <p className="text-gray-400 text-xs">
          Section {data.section || ""}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-end mt-3">

        <button
          type="button"
          onClick={openLeaderboard}
          className="px-4 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          View Leaderboard
        </button>

      </div>

    </div>

  )
}

export default ClassLeaderboardCard