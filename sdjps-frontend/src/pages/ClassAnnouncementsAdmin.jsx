// import { useEffect, useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function ClassAnnouncementsAdmin() {

//   const [classes,setClasses] = useState([])
//   const [classId,setClassId] = useState("")
//   const [message,setMessage] = useState("")

//   const fetchClasses = async ()=>{

//     try{

//       const res = await API.get("/classes")
//       setClasses(res.data)

//     }catch(err){
//       console.log(err)
//     }

//   }

//   const sendAnnouncement = async ()=>{

//     try{

//       await API.post("/announcements",{
//         class_id: classId,
//         message,
//         target_type:"class"
//       })

//       alert("Announcement Sent")

//       setMessage("")

//     }catch(err){

//       console.log(err)

//     }

//   }

//   useEffect(()=>{
//     fetchClasses()
//   },[])

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-4">

//         <h1 className="text-2xl font-bold">
//           Class Announcement
//         </h1>

//         <select
//           className="border p-2 rounded w-full"
//           value={classId}
//           onChange={(e)=>setClassId(e.target.value)}
//         >

//           <option>Select Class</option>

//           {classes.map(c=>(
//             <option key={c.id} value={c.id}>
//               {c.class_name}-{c.section}
//             </option>
//           ))}

//         </select>

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

// export default ClassAnnouncementsAdmin




























// import { useState, useEffect } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function ClassAnnouncementsAdmin(){

//   const [classes,setClasses] = useState([])
//   const [classId,setClassId] = useState("")
//   const [message,setMessage] = useState("")
//   const [announcements,setAnnouncements] = useState([])

// const fetchClasses = async () => {

//   try{

//     const res = await API.get("/classes")

//     console.log(res.data)   // 👈 add this

//     setClasses(res.data)

//   }catch(err){

//     console.log(err)

//   }

// }

//   const fetchAnnouncements = async (id) => {

//     try{

//       const res = await API.get(`/announcements?class_id=${id}`)
//       setAnnouncements(res.data)

//     }catch(err){

//       console.log(err)

//     }

//   }

// // const sendAnnouncement = async () => {

// //   if(!message.trim()){
// //     alert("Please write an announcement first")
// //     return
// //   }

// //   try{

// //     await API.post("/announcements",{
// //       message,
// //       target_type:"students"
// //     })

// //     setMessage("")
// //     fetchAnnouncements()

// //   }catch(err){

// //     console.log(err)

// //   }

// // }

// const sendAnnouncement = async () => {

//   if(!selectedClass){
//     alert("Please select a class first")
//     return
//   }

//   if(!message.trim()){
//     alert("Please write announcement")
//     return
//   }

//   try{

//     await API.post("/announcements",{
//       class_id:selectedClass,
//       message
//     })

//     setMessage("")
//     fetchAnnouncements()

//   }catch(err){
//     console.log(err)
//   }

// }

//   useEffect(()=>{
//     fetchClasses()
//   },[])

//   useEffect(()=>{
//     if(classId){
//       fetchAnnouncements(classId)
//     }
//   },[classId])



//     const deleteAnnouncement = async (id) => {

//   const confirmDelete = window.confirm("Delete this announcement?")

//   if(!confirmDelete) return

//   try{

//     await API.delete(`/announcements/${id}`)

//     alert("Announcement deleted")

//     fetchAnnouncements()

//   }catch(err){

//     console.log(err)

//   }

// }

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-6">

//         <h1 className="text-2xl font-bold">
//           Class Announcement
//         </h1>

//         {/* SELECT CLASS */}

// <select
//   value={classId}
//   onChange={(e)=>setClassId(e.target.value)}
//   className="border p-3 rounded w-full"
// >

//   <option value="">
//     Select Class
//   </option>

//   {classes.map((c)=>(
//     <option key={c.id} value={c.id}>
//       {c.class_name}
//     </option>
//   ))}

// </select>


//         {/* MESSAGE BOX */}

//         <textarea
//           className="border w-full p-3 rounded"
//           rows="4"
//           placeholder="Write announcement..."
//           value={message}
//           onChange={(e)=>setMessage(e.target.value)}
//         />


// <button
//   onClick={sendAnnouncement}
//   disabled={!message.trim()}
//   className={`px-5 py-2 rounded text-white transition 
//   ${message.trim() 
//     ? "bg-indigo-600 hover:bg-indigo-700" 
//     : "bg-gray-400 cursor-not-allowed"}
//   `}
// >
//   Send Announcement
// </button>

// {/* <button
//   onClick={sendAnnouncement}
//   disabled={!selectedClass || !message.trim()}
//   className={`px-6 py-2 rounded-lg text-white font-medium transition-all
//   ${selectedClass && message.trim()
//     ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow"
//     : "bg-gray-400 cursor-not-allowed"}
//   `}
// >
//   Send Announcement
// </button> */}


//         {/* HISTORY */}

//         <div>

//           <h2 className="text-lg font-semibold mt-6 mb-3">
//             Announcement History
//           </h2>

//           {announcements.length === 0 && (
//             <p className="text-gray-500">
//               No announcements yet
//             </p>
//           )}

//           <div className="space-y-3">

//           {announcements.map((a)=>(
//   <div
//     key={a.id}
//     className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-start"
//   >

//     <div>

//       <p className="text-gray-800">
//         {a.message}
//       </p>

//       <p className="text-xs text-gray-400 mt-2">
//         {new Date(a.created_at).toLocaleString()}
//       </p>

//     </div>

//     <button
//       onClick={()=>deleteAnnouncement(a.id)}
//       className="text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs hover:bg-red-50 transition"
//     >
//       Delete
//     </button>

//   </div>
// ))}

//           </div>

//         </div>

//       </div>

//     </AdminLayout>

//   )

// }

// export default ClassAnnouncementsAdmin


















import { useState, useEffect } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

function ClassAnnouncementsAdmin(){

  const [classes,setClasses] = useState([])
  const [classId,setClassId] = useState("")
  const [message,setMessage] = useState("")
  const [announcements,setAnnouncements] = useState([])

  // FETCH CLASSES
  const fetchClasses = async () => {

    try{

      const res = await API.get("/classes")
      setClasses(res.data)

    }catch(err){

      console.log(err)

    }

  }

  // FETCH ANNOUNCEMENTS
  const fetchAnnouncements = async (id) => {

    try{

      const res = await API.get(`/announcements?class_id=${id}`)
      setAnnouncements(res.data)

    }catch(err){

      console.log(err)

    }

  }

  // SEND ANNOUNCEMENT
  const sendAnnouncement = async () => {

    if(!classId){
      alert("Please select a class first")
      return
    }

    if(!message.trim()){
      alert("Please write announcement")
      return
    }

    try{

      await API.post("/announcements",{
        class_id:classId,
        message
      })

      setMessage("")
      fetchAnnouncements(classId)

    }catch(err){
      console.log(err)
    }

  }

  // LOAD CLASSES
  useEffect(()=>{
    fetchClasses()
  },[])

  // LOAD ANNOUNCEMENTS WHEN CLASS CHANGES
  useEffect(()=>{
    if(classId){
      fetchAnnouncements(classId)
    }
  },[classId])


  // DELETE ANNOUNCEMENT
  const deleteAnnouncement = async (id) => {

    const confirmDelete = window.confirm("Delete this announcement?")

    if(!confirmDelete) return

    try{

      await API.delete(`/announcements/${id}`)

      alert("Announcement deleted")

      fetchAnnouncements(classId)

    }catch(err){

      console.log(err)

    }

  }


  return(

    <AdminLayout>

      <div className="p-6 max-w-xl space-y-6">

        <h1 className="text-2xl font-bold">
          Class Announcement
        </h1>

        {/* SELECT CLASS */}

        <select
          value={classId}
          onChange={(e)=>setClassId(e.target.value)}
          className="border p-3 rounded w-full"
        >

          <option value="">
            Select Class
          </option>

          {classes.map((c)=>(
            <option key={c.id} value={c.id}>
              {c.class_name}
            </option>
          ))}

        </select>


        {/* MESSAGE BOX */}

        <textarea
          className="border w-full p-3 rounded"
          rows="4"
          placeholder="Write announcement..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />


        {/* SEND BUTTON */}

        <button
          onClick={sendAnnouncement}
          disabled={!classId || !message.trim()}
          className={`px-6 py-2 rounded-lg text-white font-medium transition-all
          ${classId && message.trim()
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow"
            : "bg-gray-400 cursor-not-allowed"}
          `}
        >
          Send Announcement
        </button>


        {/* HISTORY */}

        <div>

          <h2 className="text-lg font-semibold mt-6 mb-3">
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

export default ClassAnnouncementsAdmin