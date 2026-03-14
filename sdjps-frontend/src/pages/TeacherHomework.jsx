import { useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function TeacherHomework() {

  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")

  const postHomework = async () => {

    try {

      await API.post("/homework", {
        class_id: id,
        title,
        description,
        due_date: dueDate
      })

      alert("Homework posted successfully")

      setTitle("")
      setDescription("")
      setDueDate("")

    } catch (error) {

      console.log("Homework error", error)

    }

  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Post Homework
      </h1>

      <div className="bg-white shadow rounded p-6 w-[500px]">

        <input
          className="border p-2 w-full mb-4"
          placeholder="Homework Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Homework Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 w-full mb-4"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          onClick={postHomework}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post Homework
        </button>

      </div>

    </div>

  )

}

export default TeacherHomework