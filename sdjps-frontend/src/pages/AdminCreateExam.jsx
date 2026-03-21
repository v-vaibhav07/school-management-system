import { useState } from "react"
import API from "../services/api"

function AdminCreateExam() {

  const [name, setName] = useState("")
  const [examType, setExamType] = useState("")
  const [year, setYear] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name) {
      alert("Exam name required")
      return
    }

    try {
      await API.post("/exams", {
        name,
        exam_type: examType || null,
        academic_year: year
      })

      alert("Exam created successfully ✅")

      setName("")
      setExamType("")
      setYear("")

    } catch (err) {
      console.error(err)
      alert("Error creating exam ❌")
    }
  }

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">Create Exam</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          placeholder="Exam Name (e.g. Mid Term)"
          className="w-full p-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Type */}
        <input
          type="text"
          placeholder="Exam Type (optional)"
          className="w-full p-2 border rounded-lg"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        />

        {/* Year */}
        <input
          type="text"
          placeholder="Academic Year (e.g. 2025-26)"
          className="w-full p-2 border rounded-lg"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
        >
          Create Exam
        </button>

      </form>
    </div>
  )
}

export default AdminCreateExam