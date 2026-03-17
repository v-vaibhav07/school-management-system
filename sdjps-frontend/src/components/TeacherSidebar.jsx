// import { Link } from "react-router-dom"

// function TeacherSidebar() {

//   return (

//     <div className="w-64 h-screen bg-green-900 text-white p-5">

//       <h2 className="text-2xl font-bold mb-10">
//         Teacher Panel
//       </h2>

//       <ul className="space-y-4">

//         <li>
//           <Link to="/teacher/dashboard">
//             Dashboard
//           </Link>
//         </li>

//         <li>
//           <Link to="/teacher/classes">
//             My Classes
//           </Link>
//         </li>

//         <li>
//           <Link to="/notifications">
//             Notifications
//           </Link>
//         </li>

//       </ul>

//     </div>

//   )

// }

// export default TeacherSidebar



import { 
  LayoutDashboard, BookOpen, Users, ClipboardCheck, 
  FileText, PenSquare, MessageCircle, Bell, BarChart3, 
  Calendar, Folder, Settings, Menu 
} from "lucide-react"
import { NavLink } from "react-router-dom"

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
  { name: "My Classes", icon: BookOpen, path: "/teacher/classes" },
  { name: "Students", icon: Users, path: "/teacher/students" },
  { name: "Attendance", icon: ClipboardCheck, path: "/teacher/attendance" },
  { name: "Homework", icon: FileText, path: "/teacher/homework" },
  { name: "Exams", icon: PenSquare, path: "/teacher/exams" },
  { name: "Messages", icon: MessageCircle, path: "/teacher/messages" },
  { name: "Announcements", icon: Bell, path: "/teacher/announcements" },
  { name: "Reports", icon: BarChart3, path: "/teacher/reports" },
  { name: "Timetable", icon: Calendar, path: "/teacher/timetable" },
  { name: "Resources", icon: Folder, path: "/teacher/resources" },
  { name: "Settings", icon: Settings, path: "/teacher/settings" },
]

function TeacherSidebar({ open, setOpen }) {
  return (
    <div className={`
      h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white 
      p-4 transition-all duration-300 relative
      ${open ? "w-64" : "w-16"}
    `}>

      {/* Toggle Button (Mobile + Collapse) */}
      <button 
        onClick={() => setOpen(!open)}
        className="mb-4 p-2 bg-indigo-700 rounded-lg hover:bg-indigo-600"
      >
        <Menu size={20} />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-white text-indigo-900 w-8 h-8 flex items-center justify-center rounded-lg font-bold">
          T
        </div>
        {open && <h1 className="text-lg font-semibold">Teacher Panel</h1>}
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon
          return (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all
                ${isActive ? "bg-indigo-600" : "hover:bg-indigo-700"}`
              }
            >
              <Icon size={20} />
              {open && <span>{item.name}</span>}
            </NavLink>
          )
        })}
      </div>

      {/* Profile */}
      <div className="absolute bottom-4 left-4 right-4 bg-indigo-700 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-indigo-900 flex items-center justify-center rounded-full">
            T
          </div>
          {open && (
            <div>
              <p className="text-sm font-semibold">Teacher Name</p>
              <p className="text-xs text-gray-300">Subject</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default TeacherSidebar