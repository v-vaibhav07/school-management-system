import { useEffect, useState } from "react"
import API from "../services/api"

function TeacherViewAnnouncements() {

  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      // ✅ FINAL FIX (correct route)
      const res = await API.get("/teacher/announcements")

      console.log("Announcements:", res.data) // optional debug

      setAnnouncements(res.data)

    } catch (err) {
      console.log("Error fetching announcements:", err)
    }
  }

  return (

    <div className="p-4 md:p-6">

      {/* TITLE */}
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        📢 Announcements
      </h1>

      {/* LIST */}
      <div className="space-y-4">

        {announcements.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            No announcements yet 👀
          </p>
        )}

        {announcements.map((a) => (

          <div
            key={a.id}
            className="bg-white p-4 md:p-5 rounded-xl shadow border-l-4 border-indigo-600 hover:shadow-md transition"
          >

            {/* MESSAGE */}
            <p className="text-gray-800 text-sm md:text-base">
              {a.message}
            </p>

            {/* DATE */}
            <p className="text-xs text-gray-400 mt-3">
              {new Date(a.created_at).toLocaleString()}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default TeacherViewAnnouncements