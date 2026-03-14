import { Link } from "react-router-dom"

function TeacherSidebar() {

  return (

    <div className="w-64 h-screen bg-green-900 text-white p-5">

      <h2 className="text-2xl font-bold mb-10">
        Teacher Panel
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/teacher/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/teacher/classes">
            My Classes
          </Link>
        </li>

        <li>
          <Link to="/notifications">
            Notifications
          </Link>
        </li>

      </ul>

    </div>

  )

}

export default TeacherSidebar