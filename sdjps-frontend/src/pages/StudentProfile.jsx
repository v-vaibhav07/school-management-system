// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api";

// function StudentProfile() {

//     const { id } = useParams()

//     const [student, setStudent] = useState(null)

//     useEffect(() => {

//         const fetchStudent = async () => {

//             const res = await API.get(`/student/${id}`)
//             setStudent(res.data)

//         }

//         fetchStudent()

//     }, [])

//     if (!student) return <p>Loading...</p>

//     return (

//         <div className="p-6">

//             <div className="bg-white shadow rounded-xl p-6">

//                 <div className="flex gap-6 items-center">

//                     <img
//                         src={student.photo || "/avatar.png"}
//                         className="w-24 h-24 rounded-full"
//                     />

//                     <div>

//                         <h2 className="text-2xl font-bold">
//                             {student.users?.full_name}
//                         </h2>

//                         <p>
//                             Class: {student.classes?.class_name}
//                         </p>

//                         <p>
//                             Roll: {student.roll_number}
//                         </p>

//                     </div>

//                 </div>

//             </div>

//             {/* Parent Info */}

//             <div className="bg-white shadow rounded-xl p-6 mt-6">

//                 <h3 className="text-xl font-bold mb-3">
//                     Parent Info
//                 </h3>

//                 <p>
//                     Father: {student.parent?.father_name}
//                 </p>

//                 <p>
//                     Phone: {student.parent?.phone}
//                 </p>

//             </div>

//             {/* Attendance */}

//             <div className="bg-white shadow rounded-xl p-6 mt-6">

//                 <h3 className="text-xl font-bold mb-3">
//                     Attendance
//                 </h3>

//                 <p>
//                     Present Days: {student.attendance?.present}
//                 </p>

//             </div>

//             {/* Marks */}

//             <div className="bg-white shadow rounded-xl p-6 mt-6">

//                 <h3 className="text-xl font-bold mb-3">
//                     Marks
//                 </h3>

//                 <p>
//                     Maths: {student.marks?.math}
//                 </p>

//             </div>

//             {/* Fee */}

//             <div className="bg-white shadow rounded-xl p-6 mt-6">

//                 <h3 className="text-xl font-bold mb-3">
//                     Fee Status
//                 </h3>

//                 <p>
//                     {student.fee?.paid ? "Paid" : "Pending"}
//                 </p>

//             </div>

//         </div>

//     )

// }

// export default StudentProfile








// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import API from "../services/api"

// function StudentProfile() {

//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [student, setStudent] = useState(null)

//   useEffect(() => {

//     const fetchStudent = async () => {

//       try {

//         const res = await API.get(`/student/${id}`)
//         setStudent(res.data)

//       } catch (err) {

//         console.log(err)

//       }

//     }

//     fetchStudent()

//   }, [id])

//   if (!student) return <p className="p-6">Loading...</p>

//   return (

//     <div className="p-4 md:p-6 max-w-6xl mx-auto">

//       {/* Back Button */}

//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline"
//       >
//         ← Back
//       </button>


//       {/* Profile Card */}

//       <div className="bg-white shadow rounded-xl p-6">

//         <div className="flex flex-col md:flex-row items-center gap-6">

//           <img
//             src={student.photo || "/avatar.png"}
//             alt="student"
//             className="w-24 h-24 rounded-full object-cover border"
//           />

//           <div className="text-center md:text-left">

//             <h2 className="text-2xl font-bold">
//               {student.full_name || "Student Name"}
//             </h2>

//             <p className="text-gray-600">
//               Class: {student.class_name || "-"} {student.section || ""}
//             </p>

//             <p className="text-gray-600">
//               Roll Number: {student.roll_number || "-"}
//             </p>

//           </div>

//         </div>

//       </div>


//       {/* Info Grid */}

//       <div className="grid md:grid-cols-2 gap-6 mt-6">


//         {/* Parent Info */}

//         <div className="bg-white shadow rounded-xl p-6">

//           <h3 className="text-xl font-bold mb-4">
//             Parent Info
//           </h3>

//           <p>
//             Father: {student.parent?.father_name || "-"}
//           </p>

//           <p>
//             Phone: {student.parent?.phone || "-"}
//           </p>

//         </div>


//         {/* Attendance */}

//         <div className="bg-white shadow rounded-xl p-6">

//           <h3 className="text-xl font-bold mb-4">
//             Attendance
//           </h3>

//           <p>
//             Present Days: {student.attendance?.present || 0}
//           </p>

//         </div>


//         {/* Marks */}

//         <div className="bg-white shadow rounded-xl p-6">

//           <h3 className="text-xl font-bold mb-4">
//             Marks
//           </h3>

//           <p>
//             Maths: {student.marks?.math || "-"}
//           </p>

//         </div>


//         {/* Fee Status */}

//         <div className="bg-white shadow rounded-xl p-6">

//           <h3 className="text-xl font-bold mb-4">
//             Fee Status
//           </h3>

//           <span
//             className={`px-3 py-1 rounded text-white text-sm ${
//               student.fee?.paid
//                 ? "bg-green-500"
//                 : "bg-red-500"
//             }`}
//           >
//             {student.fee?.paid ? "Paid" : "Pending"}
//           </span>

//         </div>

//       </div>

//     </div>

//   )

// }

// export default StudentProfile


























import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"

function StudentProfile() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API.get(`/student/${id}`)
        setStudent(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchStudent()
  }, [id])

  if (!student) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading student profile...
      </div>
    )
  }

  return (

    <div className="p-4 md:p-6 max-w-6xl mx-auto">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-indigo-600 hover:underline"
      >
        ← Back
      </button>

      {/* ================= PROFILE HEADER ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">

        <img
          src={student.photo || "/avatar.png"}
          alt="student"
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200"
        />

        <div className="text-center md:text-left">

          <h2 className="text-2xl font-bold text-gray-800">
            {student.full_name || "Student Name"}
          </h2>

          <p className="text-gray-500 mt-1">
            Class: {student.class_name || "-"} {student.section || ""}
          </p>

          <p className="text-gray-500">
            Roll No: {student.roll_number || "-"}
          </p>

        </div>

      </div>

      {/* ================= INFO CARDS ================= */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">

        {/* 👨‍👩‍👦 Parent Info */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">

          <h3 className="text-lg font-semibold mb-4 text-indigo-600">
            👨‍👩‍👦 Parent Info
          </h3>

          <p className="text-gray-700">
            Father: {student.parent?.father_name || "-"}
          </p>

          <p className="text-gray-700 mt-2">
            Phone: {student.parent?.phone || "-"}
          </p>

        </div>

        {/* 📊 Attendance */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">

          <h3 className="text-lg font-semibold mb-4 text-green-600">
            📊 Attendance
          </h3>

          <p className="text-gray-700">
            Present Days: {student.attendance?.present || 0}
          </p>

        </div>

        {/* 📝 Marks */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">

          <h3 className="text-lg font-semibold mb-4 text-blue-600">
            📝 Marks
          </h3>

          <p className="text-gray-700">
            Maths: {student.marks?.math || "-"}
          </p>

        </div>

        {/* 💰 Fee */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">

          <h3 className="text-lg font-semibold mb-4 text-red-600">
            💰 Fee Status
          </h3>

          <span
            className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
              student.fee?.paid
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {student.fee?.paid ? "Paid" : "Pending"}
          </span>

        </div>

      </div>

    </div>
  )
}

export default StudentProfile