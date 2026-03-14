// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassAnnouncements() {

//   const { id } = useParams()

//   const [announcements, setAnnouncements] = useState([])
//   const [message, setMessage] = useState("")
//   const [pin, setPin] = useState(false)

//   const fetchAnnouncements = async () => {

//     try {

//       const res = await API.get(`/classes/${id}/announcements`)
//       setAnnouncements(res.data)

//     } catch (error) {

//       console.log("Error fetching announcements", error)

//     }

//   }

//   useEffect(() => {
//     fetchAnnouncements()
//   }, [])

//   const postAnnouncement = async () => {

//     try {

//       await API.post(`/classes/${id}/announcements`, {
//         message: message,
//         is_pinned: pin
//       })

//       setMessage("")
//       setPin(false)

//       fetchAnnouncements()

//     } catch (error) {

//       console.log("Error posting announcement", error)

//     }

//   }

//   return (

//     <div>

//       <h1 className="text-3xl font-bold mb-6">
//         Class Announcements
//       </h1>

//       {/* Create Announcement */}

//       <div className="bg-white p-4 rounded shadow mb-6">

//         <textarea
//           className="border w-full p-2 mb-3"
//           placeholder="Write announcement..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <div className="flex justify-between">

//           <label className="flex items-center gap-2">

//             <input
//               type="checkbox"
//               checked={pin}
//               onChange={(e) => setPin(e.target.checked)}
//             />

//             Pin announcement

//           </label>

//           <button
//             onClick={postAnnouncement}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Post
//           </button>

//         </div>

//       </div>

//       {/* Announcements List */}

//       <div className="space-y-4">

//         {announcements.map((a) => (

//           <div
//             key={a.id}
//             className={`p-4 rounded shadow ${
//               a.is_pinned ? "bg-yellow-100" : "bg-white"
//             }`}
//           >

//             {a.is_pinned && (
//               <p className="text-sm text-red-600 font-bold">
//                 📌 Pinned
//               </p>
//             )}

//             <p className="font-semibold">
//               {a.users?.full_name}
//             </p>

//             <p className="mt-2">
//               {a.message}
//             </p>

//             <p className="text-sm text-gray-500 mt-2">
//               {new Date(a.created_at).toLocaleString()}
//             </p>

//           </div>

//         ))}

//       </div>

//     </div>

//   )

// }

// export default ClassAnnouncements


import { useEffect,useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

function ClassAnnouncements(){

  const [classes,setClasses] = useState([])
  const [classId,setClassId] = useState("")
  const [message,setMessage] = useState("")

  const fetchClasses = async ()=>{

    const res = await API.get("/classes")
    setClasses(res.data)

  }

  const sendAnnouncement = async ()=>{

    await API.post("/announcements",{
      class_id:classId,
      message,
      target_type:"class"
    })

    alert("Announcement sent")
    setMessage("")
  }

  useEffect(()=>{
    fetchClasses()
  },[])

  return(

    <AdminLayout>

      <div className="p-6 max-w-xl space-y-4">

        <h1 className="text-2xl font-bold">
          Class Announcement
        </h1>

        <select
          className="border p-2 rounded w-full"
          value={classId}
          onChange={(e)=>setClassId(e.target.value)}
        >

          <option>Select Class</option>

          {classes.map(c=>(
            <option key={c.id} value={c.id}>
              {c.class_name}-{c.section}
            </option>
          ))}

        </select>

        <textarea
          className="border w-full p-3 rounded"
          rows="4"
          placeholder="Write announcement..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />

        <button
          onClick={sendAnnouncement}
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          Send Announcement
        </button>

      </div>

    </AdminLayout>

  )

}

export default ClassAnnouncements