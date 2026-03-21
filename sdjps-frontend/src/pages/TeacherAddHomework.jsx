import { useState } from "react"
import API from "../services/api"
import { useParams, useNavigate } from "react-router-dom"

function TeacherAddHomework() {

  const { classId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append("title", title)
      formData.append("description", description)
      formData.append("due_date", dueDate)
      formData.append("class_id", classId)

      if (file) {
        formData.append("file", file)
      }

      await API.post("/teacher/homework", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      alert("Homework added ✅")
      navigate("/teacher/homework")

    } catch (err) {
      console.log(err)
      alert("Error adding homework")
    }
  }

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Add Homework
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Submit Homework
        </button>

      </form>

    </div>
  )
}

export default TeacherAddHomework