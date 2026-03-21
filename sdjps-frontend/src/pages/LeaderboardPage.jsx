import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import LeaderboardTable from "../components/LeaderboardTable"

function LeaderboardPage() {

  const { classId } = useParams() // ❗ examId yaha nahi lenge

  const [students, setStudents] = useState([])
  const [exams, setExams] = useState([])
  const [examId, setExamId] = useState("")

  // ======================
  // FETCH EXAMS
  // ======================
  const fetchExams = async () => {
    try {
      const res = await API.get("/exams")
      setExams(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // ======================
  // FETCH LEADERBOARD
  // ======================
  const fetchLeaderboard = async (selectedExamId) => {
    try {
      const res = await API.get(
        `/leaderboard?classId=${classId}&examId=${selectedExamId}`
      )
      setStudents(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // ======================
  // INITIAL LOAD
  // ======================
  useEffect(() => {
    fetchExams()
  }, [])
console.log("EXAMS:", exams)
  // ======================
  // WHEN EXAM CHANGES
  // ======================
  useEffect(() => {
    if (examId) {
      fetchLeaderboard(examId)
    }
  }, [examId])

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">Leaderboard</h1>

        {/* ✅ EXAM DROPDOWN */}
        <select
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Select Exam</option>

          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>

      </div>

      {/* TABLE */}
      {examId ? (
        <LeaderboardTable students={students} />
      ) : (
        <p className="text-gray-500">Please select an exam</p>
      )}

    </AdminLayout>
  )
}

export default LeaderboardPage