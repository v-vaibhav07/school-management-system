import { useEffect, useState } from "react"
import API from "../services/api"

function TeacherMyClasses() {

  const [todayClasses, setTodayClasses] = useState([])
  const [myClasses, setMyClasses] = useState([])

  useEffect(() => {

    const fetchData = async () => {

      try {
        const todayRes = await API.get("/teacher/today-classes")
        const classRes = await API.get("/teacher/my-classes")

        setTodayClasses(todayRes.data)
        setMyClasses(classRes.data)

      } catch (err) {
        console.log(err)
      }

    }

    fetchData()

  }, [])

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">My Classes</h1>

      {/* TODAY */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Today's Schedule</h2>

        {todayClasses.length === 0 ? (
          <p className="text-gray-500">No classes today 🎉</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {todayClasses.map((cls, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow border">
                <h3 className="text-lg font-semibold text-purple-600">
                  {cls.subject}
                </h3>

                <p className="text-sm text-gray-600">{cls.class}</p>
                <p className="text-sm mt-2">🕒 {cls.time}</p>
                <p className="text-sm">📍 Room: {cls.room}</p>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* ALL CLASSES */}
      <div>
        <h2 className="text-lg font-semibold mb-3">All My Classes</h2>

        {myClasses.length === 0 ? (
          <p className="text-gray-500">No classes assigned</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {myClasses.map((cls, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow border">
                <h3 className="text-lg font-semibold text-indigo-600">
                  {cls.class}
                </h3>

                <p className="text-sm text-gray-600">
                  Subject: {cls.subject}
                </p>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  )
}

export default TeacherMyClasses