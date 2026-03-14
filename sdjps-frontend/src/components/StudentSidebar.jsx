import { Link } from "react-router-dom"

function StudentSidebar() {

  return (

    <div className="w-64 h-screen bg-blue-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-10">
        Student Portal
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/student/dashboard">
            Student Portal
          </Link>
        </li>

        <li>
          <Link to="/student/attendance">
            My Attendance
          </Link>
        </li>

        <li>
          <Link to="/student/marks">
            My Marks
          </Link>
        </li>

        <li>
          <Link to="/student/rank">
            My Rank
          </Link>
        </li>

        <li>
          <Link to="/student/announcements">
            Announcements
          </Link>
        </li>

        <li>
          <Link to="/student/homework">
            Homework
          </Link>
        </li>

        <li>
          <Link to="/student/bus">
            Track Bus
          </Link>
        </li>

      </ul>

    </div>

  )

}

export default StudentSidebar