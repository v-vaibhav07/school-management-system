import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function TeacherMessages() {

  const [classes, setClasses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const fetchClasses = async () => {
      try {
        const res = await API.get("/teacher/my-classes")
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
        Class Messages
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {classes.map((cls, index) => (

          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >

            <h2 className="text-lg font-bold text-indigo-600">
              {cls.class}
            </h2>

            <p className="text-gray-500 mt-1">
              Subject: {cls.subject}
            </p>

            <button
              onClick={() => navigate(`/teacher/chat/${cls.id}`)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Open Chat 💬
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default TeacherMessages