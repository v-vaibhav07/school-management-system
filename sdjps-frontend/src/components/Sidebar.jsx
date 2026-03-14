// import { Link } from "react-router-dom"

// function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-blue-900 text-white p-5">

//       <h2 className="text-2xl font-bold mb-10">
//         SDJPS ERP
//       </h2>

//       <ul className="space-y-4">

//         <li>
//           <Link to="/" className="hover:text-gray-300">
//             Dashboard
//           </Link>
//         </li>

//         <li>
//           <Link to="/students" className="hover:text-gray-300">
//             Students
//           </Link>
//         </li>

//         <li className="hover:text-gray-300 cursor-pointer">
//           Teachers
//         </li>

//         <li>
//           <Link to="/classes">Classes</Link>
//         </li>

//         <li className="hover:text-gray-300 cursor-pointer">
//           Fees
//         </li>

//         <li className="hover:text-gray-300 cursor-pointer">
//           Transport
//         </li>

//       </ul>

//     </div>
//   )
// }

// export default Sidebar


// import { Link } from "react-router-dom"

// function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-blue-900 text-white p-5">

//       <h2 className="text-2xl font-bold mb-10">
//         SDJPS ERP
//       </h2>

//       <ul className="space-y-4">

//         <li>
//           <Link to="/dashboard" className="hover:text-gray-300">
//             Dashboard
//           </Link>
//         </li>

//         <li>
//           <Link to="/students" className="hover:text-gray-300">
//            Manage Students
//           </Link>
//         </li>

//         <li>
//           <Link to="/teachers" className="hover:text-gray-300">
//             Teachers
//           </Link>
//         </li>

//         <li>
//           <Link to="/classes" className="hover:text-gray-300">
//             Classes
//           </Link>
//         </li>

//         <li>
//           <Link to="/fees" className="hover:text-gray-300">
//             Fees
//           </Link>
//         </li>

//         <li>
//           <Link to="/transport" className="hover:text-gray-300">
//             Transport
//           </Link>
//         </li>

//       </ul>

//     </div>
//   )
// }

// export default Sidebar

// import { Link, useLocation } from "react-router-dom"
// import {
//   LayoutDashboard,
//   Users,
//   GraduationCap,
//   School,
//   ClipboardCheck,
//   FileText,
//   Bell,
//   Trophy,
//   CreditCard,
//   Bus,
//   BarChart3,
//   Settings
// } from "lucide-react"

// function Sidebar() {

//   const location = useLocation()

//   const menu = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//     { name: "Students", icon: Users, path: "/students" },
//     { name: "Teachers", icon: GraduationCap, path: "/teachers" },
//     { name: "Classes", icon: School, path: "/classes" },
//     { name: "Attendance", icon: ClipboardCheck, path: "/attendance" },
//     { name: "Exams", icon: FileText, path: "/exams" },
//     { name: "Announcements", icon: Bell, path: "/announcements" },
//     { name: "Leaderboard", icon: Trophy, path: "/leaderboard" },
//     { name: "Fees", icon: CreditCard, path: "/fees" },
//     { name: "Transport", icon: Bus, path: "/transport" },
//     { name: "Reports", icon: BarChart3, path: "/reports" },
//     { name: "Settings", icon: Settings, path: "/settings" }
//   ]

//   return (

//     <div className="w-64 min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col">

//       {/* Logo */}

//       <div className="p-6 border-b border-blue-800">

//         <h2 className="text-xl font-bold">
//           SDJPS
//         </h2>

//         <p className="text-sm text-blue-300">
//           School Management
//         </p>

//       </div>

//       {/* Profile */}

//       <div className="flex items-center gap-3 p-4 border-b border-blue-800">

//         <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">
//           DR
//         </div>

//         <div>
//           <p className="text-sm font-semibold">
//             Dr. Rajesh Kumar
//           </p>
//           <p className="text-xs text-blue-300">
//             Admin
//           </p>
//         </div>

//       </div>

//       {/* Menu */}

//       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

//         {menu.map((item) => {

//           const Icon = item.icon

//           return (

//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
//               ${
//                 location.pathname === item.path
//                   ? "bg-indigo-600"
//                   : "hover:bg-blue-800"
//               }`}
//             >

//               <Icon size={18} />

//               {item.name}

//             </Link>

//           )

//         })}

//       </nav>

//       {/* Footer */}

//       <div className="p-4 border-t border-blue-800">

//         <button className="flex items-center gap-2 text-sm hover:text-gray-300">

//           🌙 Dark Mode

//         </button>

//       </div>

//     </div>

//   )

// }

// export default Sidebar
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  ClipboardCheck,
  FileText,
  Bell,
  Trophy,
  CreditCard,
  Bus,
  BarChart3,
  Settings,
  MessageCircle
} from "lucide-react"

function Sidebar({ open }) {

  const location = useLocation()

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" }, // FIX
    { name: "Students", icon: Users, path: "/students" },
    { name: "Teachers", icon: GraduationCap, path: "/teachers" },
    { name: "Classes", icon: School, path: "/classes" },
    { name: "Attendance", icon: ClipboardCheck, path: "/admin/attendance" },
    { name: "Exams", icon: FileText, path: "/exams" },

    // 🔔 FIXED ANNOUNCEMENT PATH
    { name: "Announcements", icon: Bell, path: "/admin/announcements" },

    { name: "Leaderboard", icon: Trophy, path: "/leaderboard" },
    { name: "Fees", icon: CreditCard, path: "/fees" },
    { name: "Transport", icon: Bus, path: "/transport" },
    { name: "Reports", icon: BarChart3, path: "/reports" },
    { name: "Chats", icon: MessageCircle, path: "/chats" },
    { name: "Settings", icon: Settings, path: "/settings" }
  ]

  return (

    <div
      className={`fixed md:static top-0 left-0 h-screen w-64 bg-blue-900 text-white transform transition-transform duration-300 z-50
      ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >

      {/* Logo */}

      <div className="p-6 border-b border-blue-800">

        <h2 className="text-xl font-bold">
          SDJPS
        </h2>

        <p className="text-sm text-blue-300">
          School Management
        </p>

      </div>

      {/* Menu */}

      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-120px)]">

        {menu.map((item) => {

          const Icon = item.icon

          return (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
              ${
                location.pathname === item.path
                  ? "bg-indigo-600"
                  : "hover:bg-blue-800"
              }`}
            >

              <Icon size={18} />

              {item.name}

            </Link>

          )

        })}

      </nav>

    </div>

  )

}

export default Sidebar