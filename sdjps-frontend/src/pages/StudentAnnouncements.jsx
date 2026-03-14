// import { useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function StudentAnnouncements(){

//   const [message,setMessage] = useState("")

//   const sendAnnouncement = async () => {

//     await API.post("/announcements",{
//       message,
//       target_type:"students"
//     })

//     alert("Announcement sent")
//     setMessage("")
//   }

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-4">

//         <h1 className="text-2xl font-bold">
//           Student Announcement
//         </h1>

//         <textarea
//           className="border w-full p-3 rounded"
//           rows="4"
//           placeholder="Write announcement..."
//           value={message}
//           onChange={(e)=>setMessage(e.target.value)}
//         />

//         <button
//           onClick={sendAnnouncement}
//           className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
//         >
//           Send Announcement
//         </button>

//       </div>

//     </AdminLayout>

//   )

// }

// export default StudentAnnouncements


















// import { useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function StudentAnnouncements(){

//   const [message,setMessage] = useState("")

//   const sendAnnouncement = async () => {

//     await API.post("/announcements",{
//       message,
//       target_type:"students"
//     })

//     alert("Announcement sent")
//     setMessage("")
//   }

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-4">

//         <h1 className="text-2xl font-bold">
//           Student Announcement
//         </h1>

//         <textarea
//           className="border w-full p-3 rounded"
//           rows="4"
//           placeholder="Write announcement..."
//           value={message}
//           onChange={(e)=>setMessage(e.target.value)}
//         />

//         <button
//           onClick={sendAnnouncement}
//           className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
//         >
//           Send Announcement
//         </button>

//       </div>

//     </AdminLayout>

//   )

// }

// export default StudentAnnouncements

















import { useState, useEffect } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

function StudentAnnouncements(){

  const [message,setMessage] = useState("")
  const [announcements,setAnnouncements] = useState([])

  // fetch history
const fetchAnnouncements = async () => {

  try{

    const res = await API.get("/announcements")
    setAnnouncements(res.data)

  }catch(err){

    console.log(err)

  }

}

  useEffect(()=>{
    fetchAnnouncements()
  },[])


  const sendAnnouncement = async () => {

    try{

      await API.post("/announcements",{
        class_id:null,
        message
      })

      setMessage("")

      fetchAnnouncements() // refresh history

    }catch(err){

      console.log(err)

    }

  }

  return(

    <AdminLayout>

      <div className="p-6 max-w-2xl space-y-6">

        <h1 className="text-2xl font-bold">
          Student Announcement
        </h1>

        {/* Send box */}

        <div className="bg-white p-5 rounded-xl border space-y-3">

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


        {/* History */}

        <div className="space-y-4">

          <h2 className="text-lg font-semibold">
            Announcement History
          </h2>

          {announcements.length === 0 && (
            <p className="text-gray-500">
              No announcements yet
            </p>
          )}

          {announcements.map((a)=>(
            <div
              key={a.id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >

              <p className="text-gray-800">
                {a.message}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(a.created_at).toLocaleString()}
              </p>

            </div>
          ))}

        </div>

      </div>

    </AdminLayout>

  )

}

export default StudentAnnouncements