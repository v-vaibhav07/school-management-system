import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function TeacherWithAllClassRoomChat() {

  const { class_id } = useParams()

  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const bottomRef = useRef()

  // FETCH
  const fetchMessages = async () => {
    try {
      const res = await API.get(`/teacher/chat/${class_id}`)
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [class_id])

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // SEND
  const sendMessage = async () => {
    if (!text.trim()) return

    try {
      await API.post("/teacher/chat", {
        class_id,
        message: text
      })

      setText("")
      fetchMessages()
    } catch (err) {
      console.log(err)
    }
  }

  return (

    <div className="h-full flex items-center justify-center bg-gray-100 p-4">

      {/* CARD */}
      <div className="w-full max-w-4xl h-full bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-4 md:px-6 py-3 border-b bg-gray-50 flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold">
            Class Chat 💬
          </h2>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto min-h-0 px-4 md:px-6 py-4 space-y-3">

          {messages.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              No messages yet 👀
            </p>
          )}

          {messages.map((msg, index) => {

            const isMe = msg.role === "teacher"

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >

                <div
                  className={`
                    max-w-[80%] md:max-w-md
                    px-3 md:px-4 py-2
                    rounded-2xl shadow-sm
                    text-sm md:text-base
                    break-words
                    ${isMe
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }
                  `}
                >

                  <p className="text-[11px] md:text-xs opacity-70 mb-1 font-medium">
                    {msg.sender_name || "User"}
                  </p>

                  <p>{msg.message}</p>

                  <p className="text-[10px] md:text-xs text-right mt-1 opacity-70">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>

                </div>

              </div>
            )
          })}

          <div ref={bottomRef} />

        </div>

        {/* INPUT */}
        <div className="p-3 border-t flex gap-2 bg-white">

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="
              flex-1 
              border 
              rounded-full 
              px-4 py-2 
              outline-none 
              focus:ring-2 focus:ring-indigo-400
            "
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="
              bg-indigo-600 
              text-white 
              px-5 py-2 
              rounded-full 
              hover:bg-indigo-700 
              transition
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}

export default TeacherWithAllClassRoomChat