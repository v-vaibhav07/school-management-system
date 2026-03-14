// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Link } from "react-router-dom"
// function Classes() {

//     const [classes, setClasses] = useState([])
    

//     // Fetch classes from backend
//     const fetchClasses = async () => {

//         try {

//             const res = await API.get("/classes")
//             setClasses(res.data)

//         } catch (error) {

//             console.log("Error fetching classes", error)

//         }

//     }

//     useEffect(() => {
//         fetchClasses()
//     }, [])

//     return (
//         <div>

//             <h1 className="text-3xl font-bold mb-6">
//                 Classes
//             </h1>

//             <div className="bg-white rounded shadow">

//                 <table className="w-full">

//                     <thead className="bg-gray-200">

//                         <tr>
//                             <th className="p-3 text-left">Class</th>
//                             <th className="p-3 text-left">Section</th>
//                             <th className="p-3 text-left">Academic Year</th>
//                             <th className="p-3 text-left">Students</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {classes.map((cls) => (

//                             <tr key={cls.id} className="border-b">

//                                 <td className="p-3">

//                                     <Link
//                                         to={`/classes/${cls.id}`}
//                                         className="text-blue-600 hover:underline"
//                                     >
//                                         {cls.class_name}
//                                     </Link>

//                                 </td>

//                                 <td className="p-3">
//                                     {cls.section}
//                                 </td>

//                                 <td className="p-3">
//                                     {cls.academic_year}
//                                 </td>

//                                 <td className="p-3">
//                                     {cls.students?.[0]?.count || 0}
//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     )
// }

// export default Classes

// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Link } from "react-router-dom"

// function Classes() {

//   const [classes, setClasses] = useState([])
//   const [teachers, setTeachers] = useState([])

//   const [selectedClass, setSelectedClass] = useState(null)
//   const [teacherModal, setTeacherModal] = useState(false)
//   const [selectedTeacher, setSelectedTeacher] = useState("")

//   const [createModal, setCreateModal] = useState(false)

//   const [form, setForm] = useState({
//     class_name: "",
//     section: "",
//     academic_year: ""
//   })

//   // =========================
//   // Fetch classes
//   // =========================
//   const fetchClasses = async () => {

//     try {

//       const res = await API.get("/classes")
//       setClasses(res.data)

//     } catch (error) {

//       console.log("Error fetching classes", error)

//     }

//   }

//   // =========================
//   // Fetch teachers
//   // =========================
//   const fetchTeachers = async () => {

//     try {

//       const res = await API.get("/teacher")
//       setTeachers(res.data)

//     } catch (error) {

//       console.log("Error fetching teachers", error)

//     }

//   }

//   useEffect(() => {

//     fetchClasses()
//     fetchTeachers()

//   }, [])

//   // =========================
//   // Assign teacher
//   // =========================
//   const assignTeacher = async () => {

//     try {

//       await API.put(`/classes/${selectedClass}/assign-teacher`, {
//         teacher_id: selectedTeacher
//       })

//       setTeacherModal(false)
//       setSelectedTeacher("")

//       fetchClasses()

//     } catch (error) {

//       console.log("Error assigning teacher", error)

//     }

//   }

//   // =========================
//   // Create class
//   // =========================
//   const createClass = async () => {

//     try {

//       await API.post("/classes", form)

//       setCreateModal(false)

//       setForm({
//         class_name: "",
//         section: "",
//         academic_year: ""
//       })

//       fetchClasses()

//     } catch (error) {

//       console.log("Error creating class", error)

//     }

//   }

//   return (

//     <div>

//       {/* HEADER */}

//       <div className="flex justify-between items-center mb-6">

//         <h1 className="text-3xl font-bold">
//           Classes
//         </h1>

//         <button
//           onClick={() => setCreateModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           + Create Class
//         </button>

//       </div>


//       {/* TABLE */}

//       <div className="bg-white rounded shadow">

//         <table className="w-full">

//           <thead className="bg-gray-200">

//             <tr>
//               <th className="p-3 text-left">Class</th>
//               <th className="p-3 text-left">Section</th>
//               <th className="p-3 text-left">Academic Year</th>
//               <th className="p-3 text-left">Students</th>
//               <th className="p-3 text-left">Teacher</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>

//           </thead>

//           <tbody>

//             {classes.map((cls) => (

//               <tr key={cls.id} className="border-b">

//                 <td className="p-3">

//                   <Link
//                     to={`/classes/${cls.id}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     {cls.class_name}
//                   </Link>

//                 </td>

//                 <td className="p-3">
//                   {cls.section}
//                 </td>

//                 <td className="p-3">
//                   {cls.academic_year}
//                 </td>

//                 <td className="p-3">
//                   {cls.students?.[0]?.count || 0}
//                 </td>

//                 <td className="p-3">
//                   {cls.teacher_name || "Not Assigned"}
//                 </td>

//                 <td className="p-3">

//                   <button
//                     onClick={() => {
//                       setSelectedClass(cls.id)
//                       setTeacherModal(true)
//                     }}
//                     className="text-blue-600"
//                   >
//                     Change
//                   </button>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>


//       {/* =========================
//          CREATE CLASS MODAL
//       ========================= */}

//       {createModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded w-96">

//             <h2 className="text-xl font-bold mb-4">
//               Create Class
//             </h2>

//             <input
//               type="text"
//               placeholder="Class Name"
//               className="border p-2 w-full mb-3"
//               value={form.class_name}
//               onChange={(e) =>
//                 setForm({ ...form, class_name: e.target.value })
//               }
//             />

//             <input
//               type="text"
//               placeholder="Section"
//               className="border p-2 w-full mb-3"
//               value={form.section}
//               onChange={(e) =>
//                 setForm({ ...form, section: e.target.value })
//               }
//             />

//             <input
//               type="text"
//               placeholder="Academic Year"
//               className="border p-2 w-full mb-4"
//               value={form.academic_year}
//               onChange={(e) =>
//                 setForm({ ...form, academic_year: e.target.value })
//               }
//             />

//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setCreateModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={createClass}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Create
//               </button>

//             </div>

//           </div>

//         </div>

//       )}


//       {/* =========================
//          ASSIGN TEACHER MODAL
//       ========================= */}

//       {teacherModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded w-96">

//             <h2 className="text-xl font-bold mb-4">
//               Assign Teacher
//             </h2>

//             <select
//               className="border p-2 w-full mb-4"
//               value={selectedTeacher}
//               onChange={(e) => setSelectedTeacher(e.target.value)}
//             >

//               <option value="">
//                 Select Teacher
//               </option>

//               {teachers.map((teacher) => (

//                 <option key={teacher.id} value={teacher.id}>
//                   {teacher.full_name}
//                 </option>

//               ))}

//             </select>

//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setTeacherModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={assignTeacher}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Assign
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   )
// }

// export default Classes

import { useEffect, useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

function Classes() {

  const [classes, setClasses] = useState([])
  const [teachers, setTeachers] = useState([])

  const [selectedClass, setSelectedClass] = useState(null)
  const [teacherModal, setTeacherModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState("")

  const [createModal, setCreateModal] = useState(false)

  const [form, setForm] = useState({
    class_name: "",
    section: "",
    academic_year: ""
  })


  // =========================
  // FETCH CLASSES
  // =========================
  const fetchClasses = async () => {

    try {

      const res = await API.get("/classes")

      setClasses(res.data)

    } catch (error) {

      console.log("Error fetching classes", error)

    }

  }


  // =========================
  // FETCH TEACHERS
  // =========================
  const fetchTeachers = async () => {

    try {

      const res = await API.get("/teacher")

      setTeachers(res.data)

    } catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {

    fetchClasses()
    fetchTeachers()

  }, [])


  // =========================
  // ASSIGN TEACHER
  // =========================
  const assignTeacher = async () => {

    try {

      await API.put(`/classes/${selectedClass}/assign-teacher`, {
        teacher_id: selectedTeacher
      })

      setTeacherModal(false)
      setSelectedTeacher("")

      fetchClasses()

    } catch (error) {

      console.log(error)

    }

  }


  // =========================
  // CREATE CLASS
  // =========================
  const createClass = async () => {

    try {

      await API.post("/classes", form)

      setCreateModal(false)

      setForm({
        class_name: "",
        section: "",
        academic_year: ""
      })

      fetchClasses()

    } catch (error) {

      console.log(error)

    }

  }


  return (

    <div className="p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <h1 className="text-3xl font-bold">
          Classes
        </h1>

        <button
          onClick={() => setCreateModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Create Class
        </button>

      </div>


      {/* CLASSES GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {classes.map((cls) => (

          <div
            key={cls.id}
            className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
          >

            {/* CLASS TITLE */}

            <div>

              <h2 className="text-xl font-semibold mb-1">
                Class {cls.class_name}-{cls.section}
              </h2>

              <p className="text-gray-500 text-sm mb-5">
                Academic Year: {cls.academic_year || "—"}
              </p>


              {/* CLASS INFO */}

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-600">👨‍🏫 Teacher</span>
                  <span className="font-medium">
                    {cls.teacher_name || "Not Assigned"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">👨‍🎓 Students</span>
                  <span className="font-medium">
                    {cls.students?.[0]?.count || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">⭐ Class Monitor</span>
                  <span className="font-medium text-gray-400">
                    Not Assigned
                  </span>
                </div>

              </div>

            </div>


            {/* ACTION BUTTONS */}

            <div className="flex gap-3 mt-6">

              <Link
                to={`/classes/${cls.id}`}
                className="flex-1 text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Open Class
              </Link>

              <button
                onClick={() => {

                  setSelectedClass(cls.id)
                  setTeacherModal(true)

                }}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Assign Teacher
              </button>

            </div>

          </div>

        ))}

      </div>



      {/* =========================
          CREATE CLASS MODAL
      ========================= */}

      {createModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px]">

            <h2 className="text-xl font-semibold mb-4">
              Create Class
            </h2>

            <input
              type="text"
              placeholder="Class Name"
              className="border p-2 rounded w-full mb-3"
              value={form.class_name}
              onChange={(e) =>
                setForm({ ...form, class_name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Section"
              className="border p-2 rounded w-full mb-3"
              value={form.section}
              onChange={(e) =>
                setForm({ ...form, section: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Academic Year"
              className="border p-2 rounded w-full mb-4"
              value={form.academic_year}
              onChange={(e) =>
                setForm({ ...form, academic_year: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setCreateModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={createClass}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>

            </div>

          </div>

        </div>

      )}



      {/* =========================
          ASSIGN TEACHER MODAL
      ========================= */}

      {teacherModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px]">

            <h2 className="text-xl font-semibold mb-4">
              Assign Teacher
            </h2>

            <select
              className="border p-2 rounded w-full mb-4"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >

              <option value="">
                Select Teacher
              </option>

              {teachers.map((teacher) => (

                <option key={teacher.id} value={teacher.id}>
                  {teacher.full_name}
                </option>

              ))}

            </select>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setTeacherModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={assignTeacher}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Assign
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

export default Classes