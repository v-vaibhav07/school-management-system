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

  if (!student) return <p className="p-6">Loading...</p>

  return (

    <div className="p-4 md:p-6 max-w-6xl mx-auto">

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>


      {/* Profile Card */}

      <div className="bg-white shadow rounded-xl p-6">

        <div className="flex flex-col md:flex-row items-center gap-6">

          <img
            src={student.photo || "/avatar.png"}
            alt="student"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div className="text-center md:text-left">

            <h2 className="text-2xl font-bold">
              {student.full_name || "Student Name"}
            </h2>

            <p className="text-gray-600">
              Class: {student.class_name || "-"} {student.section || ""}
            </p>

            <p className="text-gray-600">
              Roll Number: {student.roll_number || "-"}
            </p>

          </div>

        </div>

      </div>


      {/* Info Grid */}

      <div className="grid md:grid-cols-2 gap-6 mt-6">


        {/* Parent Info */}

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-xl font-bold mb-4">
            Parent Info
          </h3>

          <p>
            Father: {student.parent?.father_name || "-"}
          </p>

          <p>
            Phone: {student.parent?.phone || "-"}
          </p>

        </div>


        {/* Attendance */}

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-xl font-bold mb-4">
            Attendance
          </h3>

          <p>
            Present Days: {student.attendance?.present || 0}
          </p>

        </div>


        {/* Marks */}

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-xl font-bold mb-4">
            Marks
          </h3>

          <p>
            Maths: {student.marks?.math || "-"}
          </p>

        </div>


        {/* Fee Status */}

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-xl font-bold mb-4">
            Fee Status
          </h3>

          <span
            className={`px-3 py-1 rounded text-white text-sm ${
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