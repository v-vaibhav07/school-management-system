// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassChat() {

//   const { id } = useParams()

//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState("")

//   const fetchMessages = async () => {

//     try {

//       const res = await API.get(`/chat/class/${id}`)
//       setMessages(res.data)

//     } catch (error) {

//       console.log("Error fetching chat", error)

//     }

//   }

//   useEffect(() => {

//     fetchMessages()

//     const interval = setInterval(() => {
//       fetchMessages()
//     }, 3000)

//     return () => clearInterval(interval)

//   }, [])

//   const sendMessage = async () => {

//     if (!message) return

//     try {

//       await API.post("/chat/send", {
//         class_id: id,
//         message: message
//       })

//       setMessage("")
//       fetchMessages()

//     } catch (error) {

//       console.log("Error sending message", error)

//     }

//   }

//   return (

//     <div>

//       <h1 className="text-3xl font-bold mb-6">
//         Class Chat
//       </h1>

//       {/* CHAT BOX */}

//       <div className="bg-white rounded shadow p-4 h-[400px] overflow-y-auto mb-4">

//         {messages.map((msg, index) => (

//           <div key={index} className="mb-3">

//             <p className="font-semibold">
//               {msg.users?.full_name} ({msg.sender_role})
//             </p>

//             <p>
//               {msg.message}
//             </p>

//             <p className="text-xs text-gray-500">
//               {new Date(msg.created_at).toLocaleTimeString()}
//             </p>

//           </div>

//         ))}

//       </div>


//       {/* SEND MESSAGE */}

//       <div className="flex gap-2">

//         <input
//           className="border p-2 w-full rounded"
//           placeholder="Type message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>

//       </div>

//     </div>

//   )

// }

// export default ClassChat


//ye pure niche wale se replace ho raha h
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function ClassChat() {

  const { id } = useParams()

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  const fetchMessages = async () => {

    const res = await API.get(`/chat/class/${id}`)
    setMessages(res.data)

  }

  useEffect(() => {

    fetchMessages()

    const interval = setInterval(() => {
      fetchMessages()
    }, 2000)

    return () => clearInterval(interval)

  }, [])

  const sendMessage = async () => {

    if (!message) return

    await API.post("/chat/send", {
      class_id: id,
      message
    })

    setMessage("")
    fetchMessages()

  }

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Class Chat
      </h1>

      <div className="bg-gray-100 rounded p-4 h-[450px] overflow-y-auto mb-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className="mb-3 bg-white p-3 rounded shadow"
          >

            <p className="font-semibold text-blue-600">
              {msg.users?.full_name}
            </p>

            <p>{msg.message}</p>

            <p className="text-xs text-gray-500">
              {new Date(msg.created_at).toLocaleTimeString()}
            </p>

          </div>

        ))}

      </div>

      <div className="flex gap-2">

        <input
          className="border p-2 w-full rounded"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>

      </div>

    </div>

  )

}

export default ClassChat