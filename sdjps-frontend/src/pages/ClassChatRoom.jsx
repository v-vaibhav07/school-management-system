// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function ClassChatRoom() {

//     const { class_id } = useParams()

//     const [messages, setMessages] = useState([])
//     const [text, setText] = useState("")

//     useEffect(() => {

//         loadMessages()

//     }, [class_id])

//     const loadMessages = async () => {

//         const res = await API.get(`/chat/class/${class_id}`)
//         setMessages(res.data)

//     }

//     const sendMessage = async () => {

//         if (!text) return

//         await API.post("/chat/send", {
//             class_id,
//             message: text
//         })

//         setText("")
//         loadMessages()

//     }

//     return (

//         <AdminLayout>

//             <h1 className="text-2xl font-bold mb-6">
//                 Class Chat
//             </h1>

//             <div className="bg-white rounded-xl shadow p-5 h-[500px] flex flex-col">

//                 {/* messages */}

//                 <div className="flex-1 overflow-y-auto space-y-3 mb-4">

//                     {messages.map((m, i) => (

//                         <div key={i} className="bg-gray-100 p-3 rounded">

//                             <b>{m.users?.full_name}</b>

//                             <p>{m.message}</p>

//                             <span className="text-xs text-gray-500">

//                                 {m.sender_role}

//                             </span>

//                         </div>

//                     ))}

//                 </div>

//                 {/* input */}

//                 <div className="flex gap-2">

//                     <input
//                         value={text}
//                         onChange={(e) => setText(e.target.value)}
//                         className="flex-1 border p-2 rounded"
//                         placeholder="Type message..."
//                     />

//                     <button
//                         onClick={sendMessage}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
//                     >

//                         Send

//                     </button>

//                 </div>

//             </div>

//         </AdminLayout>

//     )

// }

// export default ClassChatRoom

























import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

const socket = io("http://localhost:5000")

function ClassChatRoom(){

const { class_id } = useParams()

const [messages,setMessages] = useState([])
const [text,setText] = useState("")
const [typingUser,setTypingUser] = useState("")

useEffect(()=>{

  loadMessages()

  socket.emit("join_class", class_id)

  socket.on("receive_message",(data)=>{
    if(data.class_id === class_id){
      setMessages(prev=>[...prev,data])
    }
  })

  socket.on("user_typing",(data)=>{
    setTypingUser(data.user + " is typing...")
  })

  socket.on("user_stop_typing",()=>{
    setTypingUser("")
  })

  return () => {
    socket.off("receive_message")
    socket.off("user_typing")
    socket.off("user_stop_typing")
  }

},[class_id])
const loadMessages = async()=>{

const res = await API.get(`/chat/class/${class_id}`)
setMessages(res.data)

}

const sendMessage = async()=>{

if(!text) return

const res = await API.post("/chat/send",{
class_id,
message:text
})

socket.emit("send_message",res.data.data)

setText("")

}

return(

<AdminLayout>

<h1 className="text-2xl font-bold mb-6">
Class Chat
</h1>

<div className="bg-white rounded-xl shadow p-5 h-[500px] flex flex-col">

<div className="flex-1 overflow-y-auto space-y-3 mb-4">

{messages.map((m,i)=>(

<div key={i} className="bg-gray-100 p-3 rounded">

<b>{m.users?.full_name || "User"}</b>

<p>{m.message}</p>

<span className="text-xs text-gray-500">

{m.sender_role}

</span>

</div>

))}

</div>

{typingUser && (
<p className="text-sm text-gray-500 italic mb-2">
{typingUser}
</p>
)}

<div className="flex gap-2">

<input
value={text}
onChange={(e)=>{

setText(e.target.value)

socket.emit("typing",{
class_id,
user:localStorage.getItem("user_name")
})

setTimeout(()=>{
socket.emit("stop_typing",{class_id})
},1000)

}}
className="flex-1 border p-2 rounded"
placeholder="Type message..."
/>

<button
onClick={sendMessage}
className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
>

Send

</button>

</div>

</div>

</AdminLayout>

)

}

export default ClassChatRoom