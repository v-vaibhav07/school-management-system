import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import LeaderboardTable from "../components/LeaderboardTable"

function TeacherLeaderboardPage() {

  const { classId } = useParams()

  const [students, setStudents] = useState([])
  const [exams, setExams] = useState([])
  const [examId, setExamId] = useState("")

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      const res = await API.get("/exams")
      setExams(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (examId) {
      fetchLeaderboard(examId)
    }
  }, [examId])

  const fetchLeaderboard = async (examId) => {
    try {
      const res = await API.get(
        `/leaderboard?classId=${classId}&examId=${examId}`
      )
      setStudents(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Leaderboard
        </h1>

        <select
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Select Exam</option>

          {exams.map(exam => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}

        </select>

      </div>

      {examId ? (
        <LeaderboardTable students={students} />
      ) : (
        <p className="text-gray-500">Select exam</p>
      )}

    </div>
  )
}

export default TeacherLeaderboardPage