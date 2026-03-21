import { Bell, Search, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

function TeacherNavbar() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return (

    <div className="flex items-center justify-between bg-white shadow px-6 py-3">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <h1 className="text-xl font-semibold">
          Teacher Dashboard
        </h1>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-lg">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
          <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full">
            T
          </div>
          <span className="hidden md:block text-sm">
            Teacher
          </span>
        </div>

        {/* Logout */}
        <button 
          onClick={logout}
          className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
        >
          <LogOut size={20} />
        </button>

      </div>

    </div>

  )

}

export default TeacherNavbar