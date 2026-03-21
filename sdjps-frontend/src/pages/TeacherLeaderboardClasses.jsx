import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import ClassLeaderboardCard from "../components/ClassLeaderboardCard"

function TeacherLeaderboardClasses() {

  const [classes, setClasses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const res = await API.get("/teacher/my-classes")
      console.log("CLASSES:", res.data)

      // 🔥 अगर nested आया तो flatten कर देंगे
      const formatted = res.data.map(c => c.classes || c)

      setClasses(formatted)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Leaderboard
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">

        {classes.map(c => (

          <ClassLeaderboardCard
            key={c.id}
            data={c}
            onClick={() => navigate(`/teacher/leaderboard/${c.id}`)}
            isTeacher={true}
          />

        ))}

      </div>

    </div>
  )
}

export default TeacherLeaderboardClasses