// import Sidebar from "../components/Sidebar"
// import Navbar from "../components/Navbar"

// function AdminLayout({ children }) {
//   return (
//     <div className="flex">

//       <Sidebar />

//       <div className="flex-1">

//         <Navbar />

//         <div className="p-6">
//           {children}
//         </div>

//       </div>

//     </div>
//   )
// }

// export default AdminLayout


import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function AdminLayout({ children }) {

  const [open, setOpen] = useState(false)

  return (

    <div className="flex">

      <Sidebar open={open} />

      <div className="flex-1">

        <Navbar toggleSidebar={() => setOpen(!open)} />

        <div className="p-6 bg-gray-50 min-h-screen">
          {children}
        </div>

      </div>

    </div>

  )

}

export default AdminLayout