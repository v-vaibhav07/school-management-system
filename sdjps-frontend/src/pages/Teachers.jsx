// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Link } from "react-router-dom"

// function Teachers() {

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

// export default Teachers







//************************************************************************************************************** */
  // import { useEffect, useState } from "react"
  // import API from "../services/api"

  // function Teachers() {

  //   const [teachers, setTeachers] = useState([])

  //   const fetchTeachers = async () => {
  //     try {

  //       const res = await API.get("/teacher")
  //       setTeachers(res.data)

  //     } catch (error) {

  //       console.log("Error fetching teachers", error)

  //     }
  //   }

  //   useEffect(() => {
  //     fetchTeachers()
  //   }, [])

  //   return (

  //     <div className="p-6">

  //       <h1 className="text-3xl font-bold mb-6">
  //         Teachers
  //       </h1>

  //       <div className="bg-white shadow rounded">

  //         <table className="w-full">

  //           <thead className="bg-gray-200">
  //             <tr>
  //               <th className="p-3 text-left">Name</th>
  //               <th className="p-3 text-left">Email</th>
  //             </tr>
  //           </thead>

  //           <tbody>

  //             {teachers.map((teacher) => (

  //               <tr key={teacher.id} className="border-b">

  //                 <td className="p-3">
  //                   {teacher.full_name}
  //                 </td>

  //                 <td className="p-3">
  //                   {teacher.email}
  //                 </td>

  //               </tr>

  //             ))}

  //           </tbody>

  //         </table>

  //       </div>

  //     </div>

  //   )

  // }

  // export default Teachers
 // *************************************************************************
 import { useEffect, useState } from "react"
import API from "../services/api"

function Teachers() {

  const [teachers, setTeachers] = useState([])
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    subject: "",
    phone: "",
    qualification: "",
    experience: ""
  })

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teacher")
      setTeachers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const openAddModal = () => {
    setEditingTeacher(null)
    setForm({
      full_name: "",
      email: "",
      subject: "",
      phone: "",
      qualification: "",
      experience: ""
    })
    setShowModal(true)
  }

  const openEditModal = (teacher) => {
    setEditingTeacher(teacher)
    setForm({
      full_name: teacher.full_name,
      email: teacher.email,
      subject: teacher.subject || "",
      phone: teacher.phone || "",
      qualification: teacher.qualification || "",
      experience: teacher.experience || ""
    })
    setShowModal(true)
  }

const saveTeacher = async () => {

  try {

    // basic validation
    if (!form.full_name.trim()) {
      alert("Teacher name is required")
      return
    }

    if (!form.email.trim()) {
      alert("Email is required")
      return
    }

    const payload = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      subject: form.subject || null,
      phone: form.phone || null,
      qualification: form.qualification || null,
      experience: form.experience ? Number(form.experience) : null
    }

    if (editingTeacher) {

      await API.put(`/teacher/${editingTeacher.id}`, payload)

    } else {

      await API.post("/teacher", payload)

    }

    await fetchTeachers()

    setShowModal(false)

  } catch (err) {

    console.log("FULL ERROR:", err)

    if (err.response) {
      console.log("BACKEND ERROR:", err.response.data)
      alert(err.response.data.error || "Something went wrong")
    } else {
      alert("Server error")
    }

  }

}

  const deleteTeacher = async (id) => {

    const confirmDelete = window.confirm("Delete this teacher?")

    if (!confirmDelete) return

    await API.delete(`/teacher/${id}`)

    fetchTeachers()

  }

  const filteredTeachers = teachers.filter((t) =>
    t.full_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="p-4 md:p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h1 className="text-3xl font-bold">
          Teachers
        </h1>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search teacher..."
            className="border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Teacher
          </button>

        </div>

      </div>


      {/* TEACHER GRID */}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredTeachers.map((teacher) => (

          <div
            key={teacher.id}
            className="bg-white shadow rounded-xl p-5 hover:shadow-lg transition"
          >

            <h2 className="text-xl font-bold mb-1">
              {teacher.full_name}
            </h2>

            <p className="text-gray-500 mb-3">
              {teacher.subject || "Subject not added"}
            </p>

            <div className="text-sm space-y-2 text-gray-700">

              <p>📧 {teacher.email}</p>

              <p>📱 {teacher.phone || "Not added"}</p>

              <p>🎓 {teacher.qualification || "Not added"}</p>

              <p>🧠 Experience: {teacher.experience || 0} years</p>

            </div>

            <div className="flex gap-4 mt-4">

              <button
                onClick={() => openEditModal(teacher)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTeacher(teacher.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              {editingTeacher ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <div className="space-y-3">

              <input
                name="full_name"
                placeholder="Full Name"
                className="border w-full p-2 rounded"
                value={form.full_name}
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                className="border w-full p-2 rounded"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="subject"
                placeholder="Subject"
                className="border w-full p-2 rounded"
                value={form.subject}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                className="border w-full p-2 rounded"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                name="qualification"
                placeholder="Qualification"
                className="border w-full p-2 rounded"
                value={form.qualification}
                onChange={handleChange}
              />

              <input
                name="experience"
                placeholder="Experience (years)"
                className="border w-full p-2 rounded"
                value={form.experience}
                onChange={handleChange}
              />

            </div>

            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveTeacher}
                className="bg-blue-600 text-white px-4 py-2 rounded"
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

export default Teachers