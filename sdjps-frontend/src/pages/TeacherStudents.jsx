import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
// import TeacherLayout from "../layouts/TeacherLayout"

function TeacherStudents() {

  const [classes, setClasses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const fetchClasses = async () => {
      try {
        const res = await API.get("/teacher/classes-with-count")
        setClasses(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchClasses()

  }, [])

return (
  <div className="p-6">

    <h1 className="text-2xl font-bold mb-6">
      My Classes (Students)
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

      {classes.map(cls => (
        <div
          key={cls.id}
          className="bg-white p-5 rounded-xl shadow border"
        >
          <h2 className="text-lg font-bold text-indigo-600">
            {cls.class}
          </h2>

          <p className="text-gray-600 mt-2">
            👨‍🎓 Students: {cls.students}
          </p>

          <button
            onClick={() => navigate(`/teacher/class/${cls.id}`)}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Open Class
          </button>
        </div>
      ))}

    </div>

  </div>
)
}

export default TeacherStudents