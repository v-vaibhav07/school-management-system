import { useEffect, useState } from "react"
import API from "../services/api"

function StudentDashboard() {

  const [profile, setProfile] = useState(null)

  const fetchProfile = async () => {

    const res = await API.get("/student/profile")

    setProfile(res.data)

  }

  useEffect(() => {

    fetchProfile()

  }, [])

  if (!profile) return <p>Loading...</p>

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Welcome {profile.full_name}
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 shadow rounded">
          <p className="text-gray-500">Class</p>
          <h2 className="text-xl font-bold">
            {profile.class_name}
          </h2>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <p className="text-gray-500">Section</p>
          <h2 className="text-xl font-bold">
            {profile.section}
          </h2>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <p className="text-gray-500">Roll Number</p>
          <h2 className="text-xl font-bold">
            {profile.roll_number}
          </h2>
        </div>

      </div>

    </div>

  )

}

export default StudentDashboard