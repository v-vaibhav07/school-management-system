import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function ClassDetails() {

  const { id } = useParams()

  const [classInfo, setClassInfo] = useState(null)
  const [timetable, setTimetable] = useState([])
  const [teachers, setTeachers] = useState([])

  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    subject: "",
    teacher_id: "",
    day: "",
    start_time: "",
    end_time: ""
  })


  // ========================
  // Fetch class timetable
  // ========================
  const fetchTimetable = async () => {

    try {

      const res = await API.get(`/timetable/${id}`)

      setClassInfo(res.data.class)
      setTimetable(res.data.timetable)

    } catch (err) {

      console.log(err)

    }

  }


  // ========================
  // Fetch teachers
  // ========================
  const fetchTeachers = async () => {

    const res = await API.get("/teacher")

    setTeachers(res.data)

  }


  useEffect(() => {

    fetchTimetable()
    fetchTeachers()

  }, [])



  // ========================
  // Add subject
  // ========================
  const addSubject = async () => {

    try {

      await API.post("/timetable", {
        class_id: id,
        ...form
      })

      setShowModal(false)

      setForm({
        subject: "",
        teacher_id: "",
        day: "",
        start_time: "",
        end_time: ""
      })

      fetchTimetable()

    } catch (err) {

      console.log(err)

    }

  }



  return (

    <div className="p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">

            Class {classInfo?.class_name}-{classInfo?.section}

          </h1>

          <p className="text-gray-500">
            Academic Year {classInfo?.academic_year}
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Subject
        </button>

      </div>



      {/* TIMETABLE */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Class Timetable
        </h2>

        <table className="w-full">

          <thead className="border-b">

            <tr>

              <th className="text-left p-3">Day</th>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Teacher</th>
              <th className="text-left p-3">Time</th>

            </tr>

          </thead>

          <tbody>

            {timetable.map((row) => (

              <tr key={row.id} className="border-b">

                <td className="p-3">{row.day}</td>

                <td className="p-3">{row.subject}</td>

                <td className="p-3">{row.teacher_name}</td>

                <td className="p-3">
                  {row.start_time} - {row.end_time}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>



      {/* ADD SUBJECT MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">
              Add Subject
            </h2>


            <input
              placeholder="Subject"
              className="border p-2 w-full mb-3"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
            />



            <select
              className="border p-2 w-full mb-3"
              value={form.teacher_id}
              onChange={(e) =>
                setForm({ ...form, teacher_id: e.target.value })
              }
            >

              <option>Select Teacher</option>

              {teachers.map((t) => (

                <option key={t.id} value={t.id}>
                  {t.full_name}
                </option>

              ))}

            </select>



            <input
              placeholder="Day"
              className="border p-2 w-full mb-3"
              value={form.day}
              onChange={(e) =>
                setForm({ ...form, day: e.target.value })
              }
            />



            <input
              type="time"
              className="border p-2 w-full mb-3"
              value={form.start_time}
              onChange={(e) =>
                setForm({ ...form, start_time: e.target.value })
              }
            />


            <input
              type="time"
              className="border p-2 w-full mb-4"
              value={form.end_time}
              onChange={(e) =>
                setForm({ ...form, end_time: e.target.value })
              }
            />



            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={addSubject}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
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

export default ClassDetails










// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

// function ClassDetails() {

//   const { id } = useParams()

//   const [classInfo, setClassInfo] = useState(null)
//   const [timetable, setTimetable] = useState([])
//   const [teachers, setTeachers] = useState([])

//   const [showModal, setShowModal] = useState(false)

//   const [form, setForm] = useState({
//     subject: "",
//     teacher_id: "",
//     day: "Monday",
//     start_time: "",
//     end_time: ""
//   })


//   // ======================
//   // Fetch Timetable
//   // ======================

//   const fetchTimetable = async () => {

//     try {

//       const res = await API.get(`/timetable/${id}`)

//       setClassInfo(res.data.class)
//       setTimetable(res.data.timetable)

//     } catch (err) {

//       console.log(err)

//     }

//   }


//   // ======================
//   // Fetch Teachers
//   // ======================

//   const fetchTeachers = async () => {

//     const res = await API.get("/teacher")

//     setTeachers(res.data)

//   }


//   useEffect(() => {

//     fetchTimetable()
//     fetchTeachers()

//   }, [])


//   // ======================
//   // Add Subject
//   // ======================

//   const addSubject = async () => {

//     try {

//       await API.post("/timetable", {
//         class_id: id,
//         ...form
//       })

//       setShowModal(false)

//       fetchTimetable()

//     } catch (err) {

//       console.log(err)

//     }

//   }


//   // ======================
//   // Build timetable map
//   // ======================

//   const timetableMap = {}

//   timetable.forEach((row) => {

//     if (!timetableMap[row.start_time]) {
//       timetableMap[row.start_time] = {}
//     }

//     timetableMap[row.start_time][row.day] = row

//   })


//   return (

//     <div className="p-6">

//       {/* HEADER */}

//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">

//         <div>

//           <h1 className="text-3xl font-bold">

//             Class {classInfo?.class_name}-{classInfo?.section}

//           </h1>

//           <p className="text-gray-500">

//             Academic Year {classInfo?.academic_year}

//           </p>

//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//         >
//           + Add Subject
//         </button>

//       </div>


//       {/* TIMETABLE GRID */}

//       <div className="overflow-x-auto">

//         <table className="min-w-[700px] w-full border rounded-xl overflow-hidden">

//           <thead className="bg-gray-100">

//             <tr>

//               <th className="p-3 text-left">Time</th>

//               {days.map(day => (

//                 <th key={day} className="p-3 text-left">

//                   {day}

//                 </th>

//               ))}

//             </tr>

//           </thead>

//           <tbody>

//             {Object.keys(timetableMap).map(time => (

//               <tr key={time} className="border-t">

//                 <td className="p-3 font-medium">

//                   {time}

//                 </td>

//                 {days.map(day => {

//                   const slot = timetableMap[time][day]

//                   return (

//                     <td key={day} className="p-3">

//                       {slot ? (

//                         <div className="bg-indigo-50 p-3 rounded-lg">

//                           <div className="font-semibold">

//                             {slot.subject}

//                           </div>

//                           <div className="text-sm text-gray-500">

//                             {slot.teacher_name}

//                           </div>

//                           <div className="text-xs text-gray-400">

//                             {slot.start_time} - {slot.end_time}

//                           </div>

//                         </div>

//                       ) : (

//                         <span className="text-gray-300">

//                           Empty

//                         </span>

//                       )}

//                     </td>

//                   )

//                 })}

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>



//       {/* ADD SUBJECT MODAL */}

//       {showModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-xl w-[90%] md:w-[400px]">

//             <h2 className="text-xl font-bold mb-4">

//               Add Subject

//             </h2>


//             <input
//               placeholder="Subject"
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, subject: e.target.value })
//               }
//             />


//             <select
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, teacher_id: e.target.value })
//               }
//             >

//               <option>Select Teacher</option>

//               {teachers.map((t) => (

//                 <option key={t.id} value={t.id}>

//                   {t.full_name}

//                 </option>

//               ))}

//             </select>


//             <select
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, day: e.target.value })
//               }
//             >

//               {days.map(day => (

//                 <option key={day} value={day}>

//                   {day}

//                 </option>

//               ))}

//             </select>


//             <input
//               type="time"
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, start_time: e.target.value })
//               }
//             />


//             <input
//               type="time"
//               className="border p-2 w-full mb-4 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, end_time: e.target.value })
//               }
//             />


//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="border px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={addSubject}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   )

// }

// export default ClassDetails