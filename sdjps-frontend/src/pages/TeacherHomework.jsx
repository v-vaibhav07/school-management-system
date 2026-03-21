// import { useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function TeacherHomework() {

//   const { id } = useParams()

//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [dueDate, setDueDate] = useState("")

//   const postHomework = async () => {

//     try {

//       await API.post("/homework", {
//         class_id: id,
//         title,
//         description,
//         due_date: dueDate
//       })

//       alert("Homework posted successfully")

//       setTitle("")
//       setDescription("")
//       setDueDate("")

//     } catch (error) {

//       console.log("Homework error", error)

//     }

//   }

//   return (

//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Post Homework
//       </h1>

//       <div className="bg-white shadow rounded p-6 w-[500px]">

//         <input
//           className="border p-2 w-full mb-4"
//           placeholder="Homework Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           className="border p-2 w-full mb-4"
//           placeholder="Homework Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input
//           type="date"
//           className="border p-2 w-full mb-4"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//         />

//         <button
//           onClick={postHomework}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Post Homework
//         </button>

//       </div>

//     </div>

//   )

// }

// export default TeacherHomework




import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function TeacherHomework() {

  const [classes, setClasses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const fetchClasses = async () => {
      try {

        const res = await API.get("/teacher/homework-classes")
        setClasses(res.data)

      } catch (err) {
        console.log(err)
      }
    }

    fetchClasses()

  }, [])

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Homework
      </h1>

      {classes.length === 0 ? (
        <p className="text-gray-500">No classes assigned</p>
      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {classes.map((cls) => (

            <div
              key={cls.id}
              className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition"
            >

              <h2 className="text-xl font-bold text-indigo-600">
                Class {cls.class}
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                👑 Monitor: {cls.monitor}
              </p>

              <p className="text-sm text-gray-600">
                👨‍🎓 Students: {cls.students}
              </p>

              <button
                onClick={() => navigate(`/teacher/homework/${cls.id}`)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Give Homework
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  )
}

export default TeacherHomework