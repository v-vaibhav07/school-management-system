// import { Outlet } from "react-router-dom"
// import TeacherSidebar from "../components/TeacherSidebar"

// function TeacherLayout() {

//   return (

//     <div className="flex">

//       <TeacherSidebar />

//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <Outlet />
//       </div>

//     </div>

//   )

// }

// export default TeacherLayout











import { useState } from "react"
import { Outlet } from "react-router-dom"
import TeacherSidebar from "../components/TeacherSidebar"
import TeacherNavbar from "../components/TeacherNavbar"

function TeacherLayout() {

  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar — fixed, scroll internally */}
      <TeacherSidebar open={open} setOpen={setOpen} />

      {/* Right Side */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Navbar — fixed at top */}
        <div className="shrink-0">
          <TeacherNavbar toggleSidebar={() => setOpen(!open)} />
        </div>

        {/* Content — sirf yahi scroll hoga */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default TeacherLayout