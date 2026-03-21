// import { useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function TeacherAnnouncements(){

//   const [message,setMessage] = useState("")

//   const sendAnnouncement = async ()=>{

//     await API.post("/announcements",{
//       message,
//       target_type:"teachers"
//     })

//     alert("Announcement sent")
//     setMessage("")
//   }

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-4">

//         <h1 className="text-2xl font-bold">
//           Teacher Announcement
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

// export default TeacherAnnouncements


















import { useState, useEffect } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

function TeacherAnnouncements(){

  const [message,setMessage] = useState("")
  const [announcements,setAnnouncements] = useState([])

const sendAnnouncement = async () => {

  if(!message.trim()){
    alert("Please write an announcement first")
    return
  }

  try{

    await API.post("/announcements",{
      message,
      target: "teacher"
    })

    setMessage("")
    fetchAnnouncements()

  }catch(err){

    console.log(err)

  }

}

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



  const deleteAnnouncement = async (id) => {

  const confirmDelete = window.confirm("Delete this announcement?")

  if(!confirmDelete) return

  try{

    await API.delete(`/announcements/${id}`)

    alert("Announcement deleted")

    fetchAnnouncements()

  }catch(err){

    console.log(err)

  }

}




  return(

    <AdminLayout>

      <div className="p-6 max-w-xl space-y-6">

        <h1 className="text-2xl font-bold">
          Teacher Announcement
        </h1>

        {/* SEND BOX */}

        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">

          <textarea
            className="border w-full p-3 rounded"
            rows="4"
            placeholder="Write announcement..."
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          />

<button
  onClick={sendAnnouncement}
  disabled={!message.trim()}
  className={`px-5 py-2 rounded text-white transition 
  ${message.trim() 
    ? "bg-indigo-600 hover:bg-indigo-700" 
    : "bg-gray-400 cursor-not-allowed"}
  `}
>
  Send Announcement
</button>

        </div>


        {/* HISTORY */}

        <div>

          <h2 className="text-lg font-semibold mb-3">
            Announcement History
          </h2>

          {announcements.length === 0 && (
            <p className="text-gray-500">
              No announcements yet
            </p>
          )}

          <div className="space-y-3">

          {announcements.map((a)=>(
  <div
    key={a.id}
    className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-start"
  >

    <div>

      <p className="text-gray-800">
        {a.message}
      </p>

      <p className="text-xs text-gray-400 mt-2">
        {new Date(a.created_at).toLocaleString()}
      </p>

    </div>

    <button
      onClick={()=>deleteAnnouncement(a.id)}
      className="text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs hover:bg-red-50 transition"
    >
      Delete
    </button>

  </div>
))}

          </div>

        </div>

      </div>

    </AdminLayout>

  )

}

export default TeacherAnnouncements