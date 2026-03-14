import { Outlet } from "react-router-dom"
import TeacherSidebar from "../components/TeacherSidebar"

function TeacherLayout() {

  return (

    <div className="flex">

      <TeacherSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>

    </div>

  )

}

export default TeacherLayout